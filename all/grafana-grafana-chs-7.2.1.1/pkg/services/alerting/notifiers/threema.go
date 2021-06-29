package notifiers

import (
	"fmt"
	"net/url"
	"strings"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/alerting"
)

var (
	threemaGwBaseURL = "https://msgapi.threema.ch/%s"
)

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "threema",
		Name:        "Threema Gateway",
		Description: "使用Threema Gateway将通知发送到Threema",
		Heading:     "Threema Gateway设置",
		Info: "可以为任何类型为“基本”的Threema GatewayID配置通知。当前不支持端到端ID。“ +”可以在https://gateway.threema.ch/上设置Threema Gateway ID。",
		Factory: NewThreemaNotifier,
		Options: []alerting.NotifierOption{
			{
				Label:          "网关ID",
				Element:        alerting.ElementTypeInput,
				InputType:      alerting.InputTypeText,
				Placeholder:    "*3MAGWID",
				Description:    "您的8个字符的Threema Gateway ID（以*开头）。",
				PropertyName:   "gateway_id",
				Required:       true,
				ValidationRule: "\\*[0-9A-Z]{7}",
			},
			{
				Label:          "收件人ID",
				Element:        alerting.ElementTypeInput,
				InputType:      alerting.InputTypeText,
				Placeholder:    "YOUR3MID",
				Description:    "应接收警报的8个字符的Threema ID。",
				PropertyName:   "recipient_id",
				Required:       true,
				ValidationRule: "[0-9A-Z]{8}",
			},
			{
				Label:        "API秘密",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "您的Threema Gateway API秘密。",
				PropertyName: "api_secret",
				Required:     true,
				Secure:       true,
			},
		},
	})
}

// ThreemaNotifier is responsible for sending
// alert notifications to Threema.
type ThreemaNotifier struct {
	NotifierBase
	GatewayID   string
	RecipientID string
	APISecret   string
	log         log.Logger
}

// NewThreemaNotifier is the constructor for the Threema notifier
func NewThreemaNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	if model.Settings == nil {
		return nil, alerting.ValidationError{Reason: "未提供设置"}
	}

	gatewayID := model.Settings.Get("gateway_id").MustString()
	recipientID := model.Settings.Get("recipient_id").MustString()
	apiSecret := model.DecryptedValue("api_secret", model.Settings.Get("api_secret").MustString())

	// Validation
	if gatewayID == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到Threema Gateway ID"}
	}
	if !strings.HasPrefix(gatewayID, "*") {
		return nil, alerting.ValidationError{Reason: "无效的Threema Gateway ID：必须以*开头"}
	}
	if len(gatewayID) != 8 {
		return nil, alerting.ValidationError{Reason: "无效的Threema GatewayID：必须为8个字符长"}
	}
	if recipientID == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到Threema收件人ID"}
	}
	if len(recipientID) != 8 {
		return nil, alerting.ValidationError{Reason: "无效的Threema收件人ID：必须为8个字符长"}
	}
	if apiSecret == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到Threema API机密"}
	}

	return &ThreemaNotifier{
		NotifierBase: NewNotifierBase(model),
		GatewayID:    gatewayID,
		RecipientID:  recipientID,
		APISecret:    apiSecret,
		log:          log.New("alerting.notifier.threema"),
	}, nil
}

// Notify send an alert notification to Threema
func (notifier *ThreemaNotifier) Notify(evalContext *alerting.EvalContext) error {
	notifier.log.Info("从发送警报通知", "threema_id", notifier.GatewayID)
	notifier.log.Info("发送警报通知到", "threema_id", notifier.RecipientID)

	// Set up basic API request data
	data := url.Values{}
	data.Set("from", notifier.GatewayID)
	data.Set("to", notifier.RecipientID)
	data.Set("secret", notifier.APISecret)

	// Determine emoji
	stateEmoji := ""
	switch evalContext.Rule.State {
	case models.AlertStateOK:
		stateEmoji = "\u2705 " // Check Mark Button
	case models.AlertStateNoData:
		stateEmoji = "\u2753\uFE0F " // Question Mark
	case models.AlertStateAlerting:
		stateEmoji = "\u26A0\uFE0F " // Warning sign
	}

	// Build message
	message := fmt.Sprintf("%s%s\n\n*State:* %s\n*Message:* %s\n",
		stateEmoji, evalContext.GetNotificationTitle(),
		evalContext.Rule.Name, evalContext.Rule.Message)
	ruleURL, err := evalContext.GetRuleURL()
	if err == nil {
		message += fmt.Sprintf("*URL:* %s\n", ruleURL)
	}
	if notifier.NeedsImage() && evalContext.ImagePublicURL != "" {
		message += fmt.Sprintf("*Image:* %s\n", evalContext.ImagePublicURL)
	}
	data.Set("text", message)

	// Prepare and send request
	url := fmt.Sprintf(threemaGwBaseURL, "send_simple")
	body := data.Encode()
	headers := map[string]string{
		"Content-Type": "application/x-www-form-urlencoded",
	}
	cmd := &models.SendWebhookSync{
		Url:        url,
		Body:       body,
		HttpMethod: "POST",
		HttpHeader: headers,
	}
	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		notifier.log.Error("无法发送Webhook", "error", err, "webhook", notifier.Name)
		return err
	}

	return nil
}
