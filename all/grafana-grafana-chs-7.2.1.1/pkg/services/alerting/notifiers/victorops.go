package notifiers

import (
	"time"

	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/components/simplejson"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/alerting"
	"github.com/grafana/grafana/pkg/setting"
)

// AlertStateCritical - Victorops uses "CRITICAL" string to indicate "Alerting" state
const AlertStateCritical = "CRITICAL"

// AlertStateWarning - VictorOps "WARNING" message type
const AlertStateWarning = "WARNING"
const alertStateRecovery = "RECOVERY"

func init() {
	alerting.RegisterNotifier(&alerting.NotifierPlugin{
		Type:        "victorops",
		Name:        "VictorOps",
		Description: "发送通知到VictorOps",
		Heading:     "VictorOps设置",
		Factory:     NewVictoropsNotifier,
		Options: []alerting.NotifierOption{
			{
				Label:        "地址",
				Element:      alerting.ElementTypeInput,
				InputType:    alerting.InputTypeText,
				Placeholder:  "VictorOps地址",
				PropertyName: "url",
				Required:     true,
			},
			{
				Label:        "自动解决事件",
				Description:  "警报恢复正常后，解决VictorOps中的事件。",
				Element:      alerting.ElementTypeCheckbox,
				PropertyName: "autoResolve",
			},
		},
	})
}

// NewVictoropsNotifier creates an instance of VictoropsNotifier that
// handles posting notifications to Victorops REST API
func NewVictoropsNotifier(model *models.AlertNotification) (alerting.Notifier, error) {
	autoResolve := model.Settings.Get("autoResolve").MustBool(true)
	url := model.Settings.Get("url").MustString()
	if url == "" {
		return nil, alerting.ValidationError{Reason: "在设置中找不到victorops url属性"}
	}
	noDataAlertType := model.Settings.Get("noDataAlertType").MustString(AlertStateWarning)

	return &VictoropsNotifier{
		NotifierBase:    NewNotifierBase(model),
		URL:             url,
		NoDataAlertType: noDataAlertType,
		AutoResolve:     autoResolve,
		log:             log.New("alerting.notifier.victorops"),
	}, nil
}

// VictoropsNotifier defines URL property for Victorops REST API
// and handles notification process by formatting POST body according to
// Victorops specifications (http://victorops.force.com/knowledgebase/articles/Integration/Alert-Ingestion-API-Documentation/)
type VictoropsNotifier struct {
	NotifierBase
	URL             string
	NoDataAlertType string
	AutoResolve     bool
	log             log.Logger
}

// Notify sends notification to Victorops via POST to URL endpoint
func (vn *VictoropsNotifier) Notify(evalContext *alerting.EvalContext) error {
	vn.log.Info("执行victorops通知", "ruleId", evalContext.Rule.ID, "notification", vn.Name)

	ruleURL, err := evalContext.GetRuleURL()
	if err != nil {
		vn.log.Error("获取规则链接失败", "error", err)
		return err
	}

	if evalContext.Rule.State == models.AlertStateOK && !vn.AutoResolve {
		vn.log.Info("不提醒VictorOps", "state", evalContext.Rule.State, "auto resolve", vn.AutoResolve)
		return nil
	}

	messageType := AlertStateCritical // Default to alerting and change based on state checks (Ensures string type)

	if evalContext.Rule.State == models.AlertStateNoData { // translate 'NODATA' to set alert
		messageType = vn.NoDataAlertType
	}

	if evalContext.Rule.State == models.AlertStateOK {
		messageType = alertStateRecovery
	}

	fields := make(map[string]interface{})
	fieldLimitCount := 4
	for index, evt := range evalContext.EvalMatches {
		fields[evt.Metric] = evt.Value
		if index > fieldLimitCount {
			break
		}
	}

	bodyJSON := simplejson.New()
	bodyJSON.Set("message_type", messageType)
	bodyJSON.Set("entity_id", evalContext.Rule.Name)
	bodyJSON.Set("entity_display_name", evalContext.GetNotificationTitle())
	bodyJSON.Set("timestamp", time.Now().Unix())
	bodyJSON.Set("state_start_time", evalContext.StartTime.Unix())
	bodyJSON.Set("state_message", evalContext.Rule.Message)
	bodyJSON.Set("monitoring_tool", "Grafana v"+setting.BuildVersion)
	bodyJSON.Set("alert_url", ruleURL)
	bodyJSON.Set("metrics", fields)

	if evalContext.Error != nil {
		bodyJSON.Set("error_message", evalContext.Error.Error())
	}

	if vn.NeedsImage() && evalContext.ImagePublicURL != "" {
		bodyJSON.Set("image_url", evalContext.ImagePublicURL)
	}

	data, _ := bodyJSON.MarshalJSON()
	cmd := &models.SendWebhookSync{Url: vn.URL, Body: string(data)}

	if err := bus.DispatchCtx(evalContext.Ctx, cmd); err != nil {
		vn.log.Error("无法发送Victorops通知", "error", err, "webhook", vn.Name)
		return err
	}

	return nil
}
