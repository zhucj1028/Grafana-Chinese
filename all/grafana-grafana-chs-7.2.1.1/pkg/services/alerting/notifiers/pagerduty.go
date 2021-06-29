package notifiers

import (
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/components/simplejson"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/alerting"
)

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "pagerduty",
		Name:        "PagerDuty",
		Description: "发送通知到PagerDuty",
		Heading:     "PagerDuty设置",
		Factory:     NewPagerdutyNotifier,
		Options: []alerting.NotifierOption{
			{
				Label:        "Integration Key",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "Pagerduty Integration Key",
				PropertyName: "integrationKey",
				Required:     true,
				Secure:       true,
			},
			{
				Label:   "严重程度",
				Element: alerting.ElementTypeSelect,
				SelectOptions: []alerting.SelectOption{
					{
						Value: "critical",
						Label: "Critical",
					},
					{
						Value: "error",
						Label: "Error",
					},
					{
						Value: "warning",
						Label: "Warning",
					},
					{
						Value: "info",
						Label: "Info",
					},
				},
				PropertyName: "severity",
			},
			{
				Label:        "自动解决事件",
				Element:      alerting.ElementTypeCheckbox,
				Description:  "警报恢复正常后，解决传呼事件。",
				PropertyName: "autoResolve",
			},
			{
				Label:        "包含详细信息",
				Element:      alerting.ElementTypeCheckbox,
				Description:  "将警报消息从PD摘要移到自定义详细信息中。这会更改自定义详细信息对象，并可能破坏您已配置的事件规则",
				PropertyName: "messageInDetails",
			},
		},
	})
}

var (
	pagerdutyEventAPIURL = "https://events.pagerduty.com/v2/enqueue"
)

// NewPagerdutyNotifier is the constructor for the PagerDuty notifier
func NewPagerdutyNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	severity := model.Settings.Get("severity").MustString("critical")
	autoResolve := model.Settings.Get("autoResolve").MustBool(false)
	key := model.DecryptedValue("integrationKey", model.Settings.Get("integrationKey").MustString())
	messageInDetails := model.Settings.Get("messageInDetails").MustBool(false)
	if key == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到集成密钥属性"}
	}

	return &PagerdutyNotifier{
		NotifierBase:     NewNotifierBase(model),
		Key:              key,
		Severity:         severity,
		AutoResolve:      autoResolve,
		MessageInDetails: messageInDetails,
		log:              log.New("alerting.notifier.pagerduty"),
	}, nil
}

// PagerdutyNotifier is responsible for sending
// alert notifications to pagerduty
type PagerdutyNotifier struct {
	NotifierBase
	Key              string
	Severity         string
	AutoResolve      bool
	MessageInDetails bool
	log              log.Logger
}

// buildEventPayload is responsible for building the event payload body for sending to Pagerduty v2 API
func (pn *PagerdutyNotifier) buildEventPayload(evalContext *alerting.EvalContext) ([]byte, error) {
	eventType := "trigger"
	if evalContext.Rule.State == models.AlertStateOK {
		eventType = "resolve"
	}
	customData := simplejson.New()
	if pn.MessageInDetails {
		queries := make(map[string]interface{})
		for _, evt := range evalContext.EvalMatches {
			queries[evt.Metric] = evt.Value
		}
		customData.Set("queries", queries)
		customData.Set("message", evalContext.Rule.Message)
	} else {
		for _, evt := range evalContext.EvalMatches {
			customData.Set(evt.Metric, evt.Value)
		}
	}

	pn.log.Info("通知Pagerduty", "event_type", eventType)

	payloadJSON := simplejson.New()

	// set default, override in following case switch if defined
	payloadJSON.Set("component", "Grafana")
	payloadJSON.Set("severity", pn.Severity)
	dedupKey := "alertId-" + strconv.FormatInt(evalContext.Rule.ID, 10)

	for _, tag := range evalContext.Rule.AlertRuleTags {
		// Override tags appropriately if they are in the PagerDuty v2 API
		switch strings.ToLower(tag.Key) {
		case "group":
			payloadJSON.Set("group", tag.Value)
		case "class":
			payloadJSON.Set("class", tag.Value)
		case "component":
			payloadJSON.Set("component", tag.Value)
		case "dedup_key":
			if len(tag.Value) > 254 {
				tag.Value = tag.Value[0:254]
			}
			dedupKey = tag.Value
		case "severity":
			// Only set severity if it's one of the PD supported enum values
			// Info, Warning, Error, or Critical (case insensitive)
			switch sev := strings.ToLower(tag.Value); sev {
			case "info":
				fallthrough
			case "warning":
				fallthrough
			case "error":
				fallthrough
			case "critical":
				payloadJSON.Set("severity", sev)
			default:
				pn.log.Warn("忽略无效的严重性标签", "severity", sev)
			}
		}
		customData.Set(tag.Key, tag.Value)
	}

	var summary string
	if pn.MessageInDetails {
		summary = evalContext.Rule.Name
	} else {
		summary = evalContext.Rule.Name + " - " + evalContext.Rule.Message
	}
	if len(summary) > 1024 {
		summary = summary[0:1024]
	}
	payloadJSON.Set("summary", summary)

	if hostname, err := os.Hostname(); err == nil {
		payloadJSON.Set("source", hostname)
	}
	payloadJSON.Set("timestamp", time.Now())
	payloadJSON.Set("custom_details", customData)
	bodyJSON := simplejson.New()
	bodyJSON.Set("routing_key", pn.Key)
	bodyJSON.Set("event_action", eventType)
	bodyJSON.Set("dedup_key", dedupKey)
	bodyJSON.Set("payload", payloadJSON)

	ruleURL, err := evalContext.GetRuleURL()
	if err != nil {
		pn.log.Error("获取规则链接失败", "error", err)
		return []byte{}, err
	}
	links := make([]interface{}, 1)
	linkJSON := simplejson.New()
	linkJSON.Set("href", ruleURL)
	bodyJSON.Set("client_url", ruleURL)
	bodyJSON.Set("client", "Grafana")

	links[0] = linkJSON
	bodyJSON.Set("links", links)

	if pn.NeedsImage() && evalContext.ImagePublicURL != "" {
		contexts := make([]interface{}, 1)
		imageJSON := simplejson.New()
		imageJSON.Set("src", evalContext.ImagePublicURL)
		contexts[0] = imageJSON
		bodyJSON.Set("images", contexts)
	}

	body, _ := bodyJSON.MarshalJSON()

	return body, nil
}

// Notify sends an alert notification to PagerDuty
func (pn *PagerdutyNotifier) Notify(evalContext *alerting.EvalContext) error {
	if evalContext.Rule.State == models.AlertStateOK && !pn.AutoResolve {
		pn.log.Info("不向Pagerduty发送触发器", "state", evalContext.Rule.State, "auto resolve", pn.AutoResolve)
		return nil
	}

	body, err := pn.buildEventPayload(evalContext)
	if err != nil {
		pn.log.Error("无法建立PagerDuty事件有效负载", "error", err)
		return err
	}

	cmd := &models.SendWebhookSync{
		Url:        pagerdutyEventAPIURL,
		Body:       string(body),
		HttpMethod: "POST",
		HttpHeader: map[string]string{
			"Content-Type": "application/json",
		},
	}

	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		pn.log.Error("无法将通知发送到Pagerduty", "error", err, "body", string(body))
		return err
	}
	return nil
}
