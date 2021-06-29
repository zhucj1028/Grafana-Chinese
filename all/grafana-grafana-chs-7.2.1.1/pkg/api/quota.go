package api

import (
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/setting"
)

func GetOrgQuotas(c *models.ReqContext) Response {
	if !setting.Quota.Enabled {
		return Error(404, "配额未启用", nil)
	}
	query := models.GetOrgQuotasQuery{OrgId: c.ParamsInt64(":orgId")}

	if err := bus.Dispatch(&query); err != nil {
		return Error(500, "无法获得组织配额", err)
	}

	return JSON(200, query.Result)
}

func UpdateOrgQuota(c *models.ReqContext, cmd models.UpdateOrgQuotaCmd) Response {
	if !setting.Quota.Enabled {
		return Error(404, "配额未启用", nil)
	}
	cmd.OrgId = c.ParamsInt64(":orgId")
	cmd.Target = c.Params(":target")

	if _, ok := setting.Quota.Org.ToMap()[cmd.Target]; !ok {
		return Error(404, "无效的配额目标", nil)
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更新组织配额", err)
	}
	return Success("组织配额已更新")
}

func GetUserQuotas(c *models.ReqContext) Response {
	if !setting.Quota.Enabled {
		return Error(404, "配额未启用", nil)
	}
	query := models.GetUserQuotasQuery{UserId: c.ParamsInt64(":id")}

	if err := bus.Dispatch(&query); err != nil {
		return Error(500, "无法获得组织配额", err)
	}

	return JSON(200, query.Result)
}

func UpdateUserQuota(c *models.ReqContext, cmd models.UpdateUserQuotaCmd) Response {
	if !setting.Quota.Enabled {
		return Error(404, "配额未启用", nil)
	}
	cmd.UserId = c.ParamsInt64(":id")
	cmd.Target = c.Params(":target")

	if _, ok := setting.Quota.User.ToMap()[cmd.Target]; !ok {
		return Error(404, "无效的配额目标", nil)
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更新组织配额", err)
	}
	return Success("组织配额已更新")
}
