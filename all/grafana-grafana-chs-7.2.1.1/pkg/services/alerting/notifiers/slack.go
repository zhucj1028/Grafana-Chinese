package notifiers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/alerting"
	"github.com/grafana/grafana/pkg/setting"
)

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "slack",
		Name:        "Slack",
		Description: "通过Slack Webhooks向Slack发送通知",
		Heading:     "Slack设置",
		Factory:     NewSlackNotifier,
		Options: []alerting.NotifierOption{
			{
				Label:        "地址",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "Slack传入webhook url",
				PropertyName: "url",
				Required:     true,
				Secure:       true,
			},
			{
				Label:        "接受者",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "覆盖默认的通道或用户，使用#通道名，@用户名(必须是小写的，没有空格)，或用户/通道闲置ID",
				PropertyName: "recipient",
			},
			{
				Label:        "用户名",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "为机器人的消息设置用户名",
				PropertyName: "username",
			},
			{
				Label:        "图标表情符号",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "提供一个表情符号，用作机器人消息的图标。覆盖图标URL。",
				PropertyName: "iconEmoji",
			},
			{
				Label:        "图标地址",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "提供图像的URL用作机器人消息的图标",
				PropertyName: "iconUrl",
			},
			{
				Label:        "提及用户",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "在频道中通过ID通知一个或多个用户（以逗号分隔）（您可以从用户的Slack个人资料中复制该内容）",
				PropertyName: "mentionUsers",
			},
			{
				Label:        "提及组",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "在频道中进行通知时提及一个或多个组（以逗号分隔）（您可以从组的Slack个人资料网址中复制该组）",
				PropertyName: "mentionGroups",
			},
			{
				Label:   "提及频道",
				Element: alerting.ElementTypeSelect,
				SelectOptions: []alerting.SelectOption{
					{
						Value: "",
						Label: "禁用",
					},
					{
						Value: "here",
						Label: "每个活跃频道成员",
					},
					{
						Value: "channel",
						Label: "每个频道成员",
					},
				},
				Description:  "通知时提及整个频道或活跃会员",
				PropertyName: "mentionChannel",
			},
			{
				Label:        "令牌",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "提供一个机器人令牌以使用Slack file.upload API（以“xoxb”开头）。指定收件人才能使用",
				PropertyName: "token",
				Secure:       true,
			},
		},
	})
}

var reRecipient *regexp.Regexp = regexp.MustCompile("^((@[a-z0-9][a-zA-Z0-9._-]*)|(#[^ .A-Z]{1,79})|([a-zA-Z0-9]+))$")

// NewSlackNotifier is the constructor for the Slack notifier
func NewSlackNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	url := model.DecryptedValue("url", model.Settings.Get("url").MustString())
	if url == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到url属性"}
	}

	recipient := strings.TrimSpace(model.Settings.Get("recipient").MustString())
	if recipient != "" && !reRecipient.MatchString(recipient) {
		return nil, alerting.ValidationError{Reason: fmt.Sprintf("收件人格式无效: %q", recipient)}
	}
	username := model.Settings.Get("username").MustString()
	iconEmoji := model.Settings.Get("icon_emoji").MustString()
	iconURL := model.Settings.Get("icon_url").MustString()
	mentionUsersStr := model.Settings.Get("mentionUsers").MustString()
	mentionGroupsStr := model.Settings.Get("mentionGroups").MustString()
	mentionChannel := model.Settings.Get("mentionChannel").MustString()
	token := model.DecryptedValue("token", model.Settings.Get("token").MustString())

	uploadImage := model.Settings.Get("uploadImage").MustBool(true)

	if mentionChannel != "" && mentionChannel != "here" && mentionChannel != "channel" {
		return nil, alerting.ValidationError{
			Reason: fmt.Sprintf("提及频道的值无效: %q", mentionChannel),
		}
	}
	mentionUsers := []string{}
	for _, u := range strings.Split(mentionUsersStr, ",") {
		u = strings.TrimSpace(u)
		if u != "" {
			mentionUsers = append(mentionUsers, u)
		}
	}
	mentionGroups := []string{}
	for _, g := range strings.Split(mentionGroupsStr, ",") {
		g = strings.TrimSpace(g)
		if g != "" {
			mentionGroups = append(mentionGroups, g)
		}
	}

	return &SlackNotifier{
		NotifierBase:   NewNotifierBase(model),
		URL:            url,
		Recipient:      recipient,
		Username:       username,
		IconEmoji:      iconEmoji,
		IconURL:        iconURL,
		MentionUsers:   mentionUsers,
		MentionGroups:  mentionGroups,
		MentionChannel: mentionChannel,
		Token:          token,
		Upload:         uploadImage,
		log:            log.New("alerting.notifier.slack"),
	}, nil
}

// SlackNotifier is responsible for sending
// alert notification to Slack.
type SlackNotifier struct {
	NotifierBase
	URL            string
	Recipient      string
	Username       string
	IconEmoji      string
	IconURL        string
	MentionUsers   []string
	MentionGroups  []string
	MentionChannel string
	Token          string
	Upload         bool
	log            log.Logger
}

// Notify send alert notification to Slack.
func (sn *SlackNotifier) Notify(evalContext *alerting.EvalContext) error {
	sn.log.Info("执行slack通知", "ruleId", evalContext.Rule.ID, "notification", sn.Name)

	ruleURL, err := evalContext.GetRuleURL()
	if err != nil {
		sn.log.Error("获取规则链接失败", "error", err)
		return err
	}

	fields := make([]map[string]interface{}, 0)
	fieldLimitCount := 4
	for index, evt := range evalContext.EvalMatches {
		fields = append(fields, map[string]interface{}{
			"title": evt.Metric,
			"value": evt.Value,
			"short": true,
		})
		if index > fieldLimitCount {
			break
		}
	}

	if evalContext.Error != nil {
		fields = append(fields, map[string]interface{}{
			"title": "错误信息",
			"value": evalContext.Error.Error(),
			"short": false,
		})
	}

	mentionsBuilder := strings.Builder{}
	appendSpace := func() {
		if mentionsBuilder.Len() > 0 {
			mentionsBuilder.WriteString(" ")
		}
	}
	mentionChannel := strings.TrimSpace(sn.MentionChannel)
	if mentionChannel != "" {
		mentionsBuilder.WriteString(fmt.Sprintf("<!%s|%s>", mentionChannel, mentionChannel))
	}
	if len(sn.MentionGroups) > 0 {
		appendSpace()
		for _, g := range sn.MentionGroups {
			mentionsBuilder.WriteString(fmt.Sprintf("<!subteam^%s>", g))
		}
	}
	if len(sn.MentionUsers) > 0 {
		appendSpace()
		for _, u := range sn.MentionUsers {
			mentionsBuilder.WriteString(fmt.Sprintf("<@%s>", u))
		}
	}
	msg := ""
	if evalContext.Rule.State != models.AlertStateOK { //don't add message when going back to alert state ok.
		msg = evalContext.Rule.Message
	}
	imageURL := ""
	// default to file.upload API method if a token is provided
	if sn.Token == "" {
		imageURL = evalContext.ImagePublicURL
	}

	var blocks []map[string]interface{}
	if mentionsBuilder.Len() > 0 {
		blocks = []map[string]interface{}{
			{
				"type": "section",
				"text": map[string]interface{}{
					"type": "mrkdwn",
					"text": mentionsBuilder.String(),
				},
			},
		}
	}
	attachment := map[string]interface{}{
		"color":       evalContext.GetStateModel().Color,
		"title":       evalContext.GetNotificationTitle(),
		"title_link":  ruleURL,
		"text":        msg,
		"fallback":    evalContext.GetNotificationTitle(),
		"fields":      fields,
		"footer":      "Grafana v" + setting.BuildVersion,
		"footer_icon": "https://grafana.com/assets/img/fav32.png",
		"ts":          time.Now().Unix(),
	}
	if sn.NeedsImage() && imageURL != "" {
		attachment["image_url"] = imageURL
	}
	body := map[string]interface{}{
		"text": evalContext.GetNotificationTitle(),
		"attachments": []map[string]interface{}{
			attachment,
		},
		"parse": "full", // to linkify urls, users and channels in alert message.
	}
	if len(blocks) > 0 {
		body["blocks"] = blocks
	}

	//recipient override
	if sn.Recipient != "" {
		body["channel"] = sn.Recipient
	}
	if sn.Username != "" {
		body["username"] = sn.Username
	}
	if sn.IconEmoji != "" {
		body["icon_emoji"] = sn.IconEmoji
	}
	if sn.IconURL != "" {
		body["icon_url"] = sn.IconURL
	}
	data, err := json.Marshal(&body)
	if err != nil {
		return err
	}

	cmd := &models.SendWebhookSync{
		Url:        sn.URL,
		Body:       string(data),
		HttpMethod: http.MethodPost,
	}
	if sn.Token != "" {
		sn.log.Debug("向HTTP请求添加授权标头")
		cmd.HttpHeader = map[string]string{
			"Authorization": fmt.Sprintf("Bearer %s", sn.Token),
		}
	}
	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		sn.log.Error("无法发送slack通知", "error", err, "webhook", sn.Name)
		return err
	}
	if sn.Token != "" && sn.UploadImage {
		err = slackFileUpload(evalContext, sn.log, "https://slack.com/api/files.upload", sn.Recipient, sn.Token)
		if err != nil {
			return err
		}
	}
	return nil
}

func slackFileUpload(evalContext *alerting.EvalContext, log log.Logger, url string, recipient string, token string) error {
	if evalContext.ImageOnDiskPath == "" {
		evalContext.ImageOnDiskPath = filepath.Join(setting.HomePath, "public/img/mixed_styles.png")
	}
	log.Info("通过file.upload API上传到Slack")
	headers, uploadBody, err := generateSlackBody(evalContext.ImageOnDiskPath, token, recipient)
	if err != nil {
		return err
	}
	cmd := &models.SendWebhookSync{Url: url, Body: uploadBody.String(), HttpHeader: headers, HttpMethod: "POST"}
	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		log.Error("无法上传slack图片", "error", err, "webhook", "file.upload")
		return err
	}
	return nil
}

func generateSlackBody(file string, token string, recipient string) (map[string]string, bytes.Buffer, error) {
	// Slack requires all POSTs to files.upload to present
	// an "application/x-www-form-urlencoded" encoded querystring
	// See https://api.slack.com/methods/files.upload
	var b bytes.Buffer
	w := multipart.NewWriter(&b)
	// Add the generated image file
	f, err := os.Open(file)
	if err != nil {
		return nil, b, err
	}
	defer f.Close()
	fw, err := w.CreateFormFile("file", file)
	if err != nil {
		return nil, b, err
	}
	_, err = io.Copy(fw, f)
	if err != nil {
		return nil, b, err
	}
	// Add the authorization token
	err = w.WriteField("token", token)
	if err != nil {
		return nil, b, err
	}
	// Add the channel(s) to POST to
	err = w.WriteField("channels", recipient)
	if err != nil {
		return nil, b, err
	}
	w.Close()
	headers := map[string]string{
		"Content-Type":  w.FormDataContentType(),
		"Authorization": "auth_token=\"" + token + "\"",
	}
	return headers, b, nil
}
