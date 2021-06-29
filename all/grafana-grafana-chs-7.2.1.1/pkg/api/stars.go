package api

import (
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/models"
)

func StarDashboard(c *models.ReqContext) Response {
	if !c.IsSignedIn {
		return Error(412, "您需要登录后访问星标仪表板", nil)
	}

	cmd := models.StarDashboardCommand{UserId: c.UserId, DashboardId: c.ParamsInt64(":id")}

	if cmd.DashboardId <= 0 {
		return Error(400, "缺少仪表板ID", nil)
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法启动仪表板", err)
	}

	return Success("仪表板已加星标！")
}

func UnstarDashboard(c *models.ReqContext) Response {
	cmd := models.UnstarDashboardCommand{UserId: c.UserId, DashboardId: c.ParamsInt64(":id")}

	if cmd.DashboardId <= 0 {
		return Error(400, "缺少仪表板ID", nil)
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "取消仪表板星标失败", err)
	}

	return Success("已取消仪表板星标")
}
