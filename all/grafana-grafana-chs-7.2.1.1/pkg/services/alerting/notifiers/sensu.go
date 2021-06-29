package notifiers

import (
	"strconv"
	"strings"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/components/simplejson"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/alerting"
)

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "sensu",
		Name:        "Sensu",
		Description: "将HTTP POST请求发送到Sensu API",
		Heading:     "Sensu设置",
		Factory:     NewSensuNotifier,
		Options: []alerting.NotifierOption{
			{
				Label:        "地址",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "http://sensu-api.local:4567/results",
				PropertyName: "url",
				Required:     true,
			},
			{
				Label:        "源",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Description:  "如果空将使用空规则ID",
				PropertyName: "source",
			},
			{
				Label:        "处理器",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "default",
				PropertyName: "handler",
			},
			{
				Label:        "用户名",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				PropertyName: "username",
			},
			{
				Label:        "密码",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypePassword,
				PropertyName: "passsword ",
				Secure:       true,
			},
		},
	})
}

// NewSensuNotifier is the constructor for the Sensu Notifier.
func NewSensuNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	url := model.Settings.Get("url").MustString()
	if url == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到url属性"}
	}

	return &SensuNotifier{
		NotifierBase: NewNotifierBase(model),
		URL:          url,
		User:         model.Settings.Get("username").MustString(),
		Source:       model.Settings.Get("source").MustString(),
		Password:     model.DecryptedValue("password", model.Settings.Get("password").MustString()),
		Handler:      model.Settings.Get("handler").MustString(),
		log:          log.New("alerting.notifier.sensu"),
	}, nil
}

// SensuNotifier is responsible for sending
// alert notifications to Sensu.
type SensuNotifier struct {
	NotifierBase
	URL      string
	Source   string
	User     string
	Password string
	Handler  string
	log      log.Logger
}

// Notify send alert notification to Sensu
func (sn *SensuNotifier) Notify(evalContext *alerting.EvalContext) error {
	sn.log.Info("Sending sensu result")

	bodyJSON := simplejson.New()
	bodyJSON.Set("ruleId", evalContext.Rule.ID)
	// Sensu alerts cannot have spaces in them
	bodyJSON.Set("name", strings.Replace(evalContext.Rule.Name, " ", "_", -1))
	// Sensu alerts require a source. We set it to the user-specified value (optional),
	// else we fallback and use the grafana ruleID.
	if sn.Source != "" {
		bodyJSON.Set("source", sn.Source)
	} else {
		bodyJSON.Set("source", "grafana_rule_"+strconv.FormatInt(evalContext.Rule.ID, 10))
	}
	// Finally, sensu expects an output
	// We set it to a default output
	bodyJSON.Set("output", "Grafana Metric Condition Met")
	bodyJSON.Set("evalMatches", evalContext.EvalMatches)

	switch evalContext.Rule.State {
	case "alerting":
		bodyJSON.Set("status", 2)
	case "no_data":
		bodyJSON.Set("status", 1)
	default:
		bodyJSON.Set("status", 0)
	}

	if sn.Handler != "" {
		bodyJSON.Set("handler", sn.Handler)
	}

	ruleURL, err := evalContext.GetRuleURL()
	if err == nil {
		bodyJSON.Set("ruleUrl", ruleURL)
	}

	if sn.NeedsImage() && evalContext.ImagePublicURL != "" {
		bodyJSON.Set("imageUrl", evalContext.ImagePublicURL)
	}

	if evalContext.Rule.Message != "" {
		bodyJSON.Set("output", evalContext.Rule.Message)
	}

	body, _ := bodyJSON.MarshalJSON()

	cmd := &models.SendWebhookSync{
		Url:        sn.URL,
		User:       sn.User,
		Password:   sn.Password,
		Body:       string(body),
		HttpMethod: "POST",
	}

	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		sn.log.Error("无法发送sensu事件", "error", err, "sensu", sn.Name)
		return err
	}

	return nil
}
