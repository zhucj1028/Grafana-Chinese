package notifiers

import (
	"fmt"
	"strconv"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/components/simplejson"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/alerting"
)

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "opsgenie",
		Name:        "OpsGenie",
		Description: "发送通知到OpsGenie",
		Heading:     "OpsGenie设置",
		Factory:     NewOpsGenieNotifier,
		Options: []alerting.NotifierOption{
			{
				Label:        "API密钥",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "OpsGenie API密钥",
				PropertyName: "apiKey",
				Required:     true,
				Secure:       true,
			},
			{
				Label:        "警报API地址",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "https://api.opsgenie.com/v2/alerts",
				PropertyName: "apiUrl",
				Required:     true,
			},
			{
				Label:        "自动关闭事件",
				Element:      alerting.ElementTypeCheckbox,
				Description:  "警报恢复正常后，自动关闭OpsGenie中的警报。",
				PropertyName: "autoClose",
			}, {
				Label:        "优先级别",
				Element:      alerting.ElementTypeCheckbox,
				Description:  "允许使用og_priority标记设置警报优先级",
				PropertyName: "overridePriority",
			},
		},
	})
}

var (
	opsgenieAlertURL = "https://api.opsgenie.com/v2/alerts"
)

// NewOpsGenieNotifier is the constructor for OpsGenie.
func NewOpsGenieNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	autoClose := model.Settings.Get("autoClose").MustBool(true)
	overridePriority := model.Settings.Get("overridePriority").MustBool(true)
	apiKey := model.DecryptedValue("apiKey", model.Settings.Get("apiKey").MustString())
	apiURL := model.Settings.Get("apiUrl").MustString()
	if apiKey == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到api键属性"}
	}
	if apiURL == "" {
		apiURL = opsgenieAlertURL
	}

	return &OpsGenieNotifier{
		NotifierBase:     NewNotifierBase(model),
		APIKey:           apiKey,
		APIUrl:           apiURL,
		AutoClose:        autoClose,
		OverridePriority: overridePriority,
		log:              log.New("alerting.notifier.opsgenie"),
	}, nil
}

// OpsGenieNotifier is responsible for sending
// alert notifications to OpsGenie
type OpsGenieNotifier struct {
	NotifierBase
	APIKey           string
	APIUrl           string
	AutoClose        bool
	OverridePriority bool
	log              log.Logger
}

// Notify sends an alert notification to OpsGenie.
func (on *OpsGenieNotifier) Notify(evalContext *alerting.EvalContext) error {
	var err error
	switch evalContext.Rule.State {
	case models.AlertStateOK:
		if on.AutoClose {
			err = on.closeAlert(evalContext)
		}
	case models.AlertStateAlerting:
		err = on.createAlert(evalContext)
	}
	return err
}

func (on *OpsGenieNotifier) createAlert(evalContext *alerting.EvalContext) error {
	on.log.Info("创建OpsGenie警报", "ruleId", evalContext.Rule.ID, "notification", on.Name)

	ruleURL, err := evalContext.GetRuleURL()
	if err != nil {
		on.log.Error("获取规则链接失败", "error", err)
		return err
	}

	customData := triggMetrString
	for _, evt := range evalContext.EvalMatches {
		customData += fmt.Sprintf("%s: %v\n", evt.Metric, evt.Value)
	}

	bodyJSON := simplejson.New()
	bodyJSON.Set("message", evalContext.Rule.Name)
	bodyJSON.Set("source", "Grafana")
	bodyJSON.Set("alias", "alertId-"+strconv.FormatInt(evalContext.Rule.ID, 10))
	bodyJSON.Set("description", fmt.Sprintf("%s - %s\n%s\n%s", evalContext.Rule.Name, ruleURL, evalContext.Rule.Message, customData))

	details := simplejson.New()
	details.Set("url", ruleURL)
	if on.NeedsImage() && evalContext.ImagePublicURL != "" {
		details.Set("image", evalContext.ImagePublicURL)
	}

	bodyJSON.Set("details", details)

	tags := make([]string, 0)
	for _, tag := range evalContext.Rule.AlertRuleTags {
		if len(tag.Value) > 0 {
			tags = append(tags, fmt.Sprintf("%s:%s", tag.Key, tag.Value))
		} else {
			tags = append(tags, tag.Key)
		}
		if tag.Key == "og_priority" {
			if on.OverridePriority {
				validPriorities := map[string]bool{"P1": true, "P2": true, "P3": true, "P4": true, "P5": true}
				if validPriorities[tag.Value] {
					bodyJSON.Set("priority", tag.Value)
				}
			}
		}
	}
	bodyJSON.Set("tags", tags)

	body, _ := bodyJSON.MarshalJSON()

	cmd := &models.SendWebhookSync{
		Url:        on.APIUrl,
		Body:       string(body),
		HttpMethod: "POST",
		HttpHeader: map[string]string{
			"Content-Type":  "application/json",
			"Authorization": fmt.Sprintf("GenieKey %s", on.APIKey),
		},
	}

	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		on.log.Error("无法发送通知到OpsGenie", "error", err, "body", string(body))
	}

	return nil
}

func (on *OpsGenieNotifier) closeAlert(evalContext *alerting.EvalContext) error {
	on.log.Info("Closing OpsGenie alert", "ruleId", evalContext.Rule.ID, "notification", on.Name)

	bodyJSON := simplejson.New()
	bodyJSON.Set("source", "Grafana")
	body, _ := bodyJSON.MarshalJSON()

	cmd := &models.SendWebhookSync{
		Url:        fmt.Sprintf("%s/alertId-%d/close?identifierType=alias", on.APIUrl, evalContext.Rule.ID),
		Body:       string(body),
		HttpMethod: "POST",
		HttpHeader: map[string]string{
			"Content-Type":  "application/json",
			"Authorization": fmt.Sprintf("GenieKey %s", on.APIKey),
		},
	}

	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		on.log.Error("无法发送通知到OpsGenie", "error", err, "body", string(body))
		return err
	}

	return nil
}
