package notifiers

import (
	"os"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/util"

	"github.com/grafana/grafana/pkg/services/alerting"
	"github.com/grafana/grafana/pkg/setting"
)

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "email",
		Name:        "Email",
		Description: "使用Grafana服务器配置的SMTP设置发送通知",
		Factory:     NewEmailNotifier,
		Heading:     "Email设置",
		Options: []alerting.NotifierOption{
			{
				Label:        "单封邮件",
				Description:  "向所有收件人发送一封电子邮件",
				Element:      alerting.ElementTypeCheckbox,
				PropertyName: "singleEmail",
			},
			{
				Label:        "地址",
				Description:  "您可以使用 \";\" 分隔符输入多个电子邮件地址",
				Element:      alerting.ElementTypeTextArea,
				PropertyName: "addresses",
				Required:     true,
			},
		},
	})
}

// EmailNotifier is responsible for sending
// alert notifications over email.
type EmailNotifier struct {
	NotifierBase
	Addresses   []string
	SingleEmail bool
	log         log.Logger
}

// NewEmailNotifier is the constructor function
// for the EmailNotifier.
func NewEmailNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	addressesString := model.Settings.Get("addresses").MustString()
	singleEmail := model.Settings.Get("singleEmail").MustBool(false)

	if addressesString == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到地址"}
	}

	// split addresses with a few different ways
	addresses := util.SplitEmails(addressesString)

	return &EmailNotifier{
		NotifierBase: NewNotifierBase(model),
		Addresses:    addresses,
		SingleEmail:  singleEmail,
		log:          log.New("alerting.notifier.email"),
	}, nil
}

// Notify sends the alert notification.
func (en *EmailNotifier) Notify(evalContext *alerting.EvalContext) error {
	en.log.Info("发送警报通知到", "addresses", en.Addresses, "singleEmail", en.SingleEmail)

	ruleURL, err := evalContext.GetRuleURL()
	if err != nil {
		en.log.Error("获取规则链接失败", "error", err)
		return err
	}

	error := ""
	if evalContext.Error != nil {
		error = evalContext.Error.Error()
	}

	cmd := &models.SendEmailCommandSync{
		SendEmailCommand: models.SendEmailCommand{
			Subject: evalContext.GetNotificationTitle(),
			Data: map[string]interface{}{
				"Title":         evalContext.GetNotificationTitle(),
				"State":         evalContext.Rule.State,
				"Name":          evalContext.Rule.Name,
				"StateModel":    evalContext.GetStateModel(),
				"Message":       evalContext.Rule.Message,
				"Error":         error,
				"RuleUrl":       ruleURL,
				"ImageLink":     "",
				"EmbeddedImage": "",
				"AlertPageUrl":  setting.AppUrl + "alerting",
				"EvalMatches":   evalContext.EvalMatches,
			},
			To:            en.Addresses,
			SingleEmail:   en.SingleEmail,
			Template:      "alert_notification.html",
			EmbeddedFiles: []string{},
		},
	}

	if en.NeedsImage() {
		if evalContext.ImagePublicURL != "" {
			cmd.Data["ImageLink"] = evalContext.ImagePublicURL
		} else {
			file, err := os.Stat(evalContext.ImageOnDiskPath)
			if err == nil {
				cmd.EmbeddedFiles = []string{evalContext.ImageOnDiskPath}
				cmd.Data["EmbeddedImage"] = file.Name()
			}
		}
	}

	err = bus.DispatchCtx(evalContext.Ctx, cmd)

	if err != nil {
		en.log.Error("无法发送警报通知电子邮件", "error", err)
		return err
	}

	return nil
}
