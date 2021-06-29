package notifiers

import (
	"encoding/json"
	"fmt"
	"net/url"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/alerting"
)

const defaultDingdingMsgType = "link"

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "dingding",
		Name:        "DingDing",
		Description: "发送HTTP POST请求给钉钉",
		Heading:     "钉钉设置",
		Factory:     newDingDingNotifier,
		Options: []alerting.NotifierOption{
			{
				Label:        "地址",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxx",
				PropertyName: "url",
				Required:     true,
			},
			{
				Label:        "消息类型",
				Element:      alerting.ElementTypeSelect,
				PropertyName: "msgType",
				SelectOptions: []alerting.SelectOption{
					{
						Value: "link",
						Label: "链接"},
					{
						Value: "actionCard",
						Label: "行动卡",
					},
				},
			},
		},
	})
}

func newDingDingNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	url := model.Settings.Get("url").MustString()
	if url == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到url属性"}
	}

	msgType := model.Settings.Get("msgType").MustString(defaultDingdingMsgType)

	return &DingDingNotifier{
		NotifierBase: NewNotifierBase(model),
		MsgType:      msgType,
		URL:          url,
		log:          log.New("alerting.notifier.dingding"),
	}, nil
}

// DingDingNotifier is responsible for sending alert notifications to ding ding.
type DingDingNotifier struct {
	NotifierBase
	MsgType string
	URL     string
	log     log.Logger
}

// Notify sends the alert notification to dingding.
func (dd *DingDingNotifier) Notify(evalContext *alerting.EvalContext) error {
	dd.log.Info("发送到钉钉")

	messageURL, err := evalContext.GetRuleURL()
	if err != nil {
		dd.log.Error("获取消息失败", "error", err, "dingding", dd.Name)
		messageURL = ""
	}

	body, err := dd.genBody(evalContext, messageURL)
	if err != nil {
		return err
	}

	cmd := &models.SendWebhookSync{
		Url:  dd.URL,
		Body: string(body),
	}

	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		dd.log.Error("无法发送到钉钉", "error", err, "dingding", dd.Name)
		return err
	}

	return nil
}

func (dd *DingDingNotifier) genBody(evalContext *alerting.EvalContext, messageURL string) ([]byte, error) {
	q := url.Values{
		"pc_slide": {"false"},
		"url":      {messageURL},
	}

	// Use special link to auto open the message url outside of Dingding
	// Refer: https://open-doc.dingtalk.com/docs/doc.htm?treeId=385&articleId=104972&docType=1#s9
	messageURL = "dingtalk://dingtalkclient/page/link?" + q.Encode()

	dd.log.Info("messageUrl:" + messageURL)

	message := evalContext.Rule.Message
	picURL := evalContext.ImagePublicURL
	title := evalContext.GetNotificationTitle()
	if message == "" {
		message = title
	}

	for i, match := range evalContext.EvalMatches {
		message += fmt.Sprintf("\\n%2d. %s: %s", i+1, match.Metric, match.Value)
	}

	var bodyMsg map[string]interface{}
	if dd.MsgType == "actionCard" {
		// Embed the pic into the markdown directly because actionCard doesn't have a picUrl field
		if dd.NeedsImage() && picURL != "" {
			message = "![](" + picURL + ")\\n\\n" + message
		}

		bodyMsg = map[string]interface{}{
			"msgtype": "actionCard",
			"actionCard": map[string]string{
				"text":        message,
				"title":       title,
				"singleTitle": "更多",
				"singleURL":   messageURL,
			},
		}
	} else {
		link := map[string]string{
			"text":       message,
			"title":      title,
			"messageUrl": messageURL,
		}

		if dd.NeedsImage() {
			link["picUrl"] = picURL
		}

		bodyMsg = map[string]interface{}{
			"msgtype": "link",
			"link":    link,
		}
	}
	return json.Marshal(bodyMsg)
}
