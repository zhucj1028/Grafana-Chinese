package api

import (
	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/teamguardian"
	"github.com/grafana/grafana/pkg/util"
)

// POST /api/teams
func (hs *HTTPServer) CreateTeam(c *models.ReqContext, cmd models.CreateTeamCommand) Response {
	cmd.OrgId = c.OrgId

	if c.OrgRole == models.ROLE_VIEWER {
		return Error(403, "不允许创建团队。", nil)
	}

	if err := hs.Bus.Dispatch(&cmd); err != nil {
		if err == models.ErrTeamNameTaken {
			return Error(409, "团队名字已采取", err)
		}
		return Error(500, "创建团队失败", err)
	}

	if c.OrgRole == models.ROLE_EDITOR && hs.Cfg.EditorsCanAdmin {
		// if the request is authenticated using API tokens
		// the SignedInUser is an empty struct therefore
		// an additional check whether it is an actual user is required
		if c.SignedInUser.IsRealUser() {
			addMemberCmd := models.AddTeamMemberCommand{
				UserId:     c.SignedInUser.UserId,
				OrgId:      cmd.OrgId,
				TeamId:     cmd.Result.Id,
				Permission: models.PERMISSION_ADMIN,
			}

			if err := hs.Bus.Dispatch(&addMemberCmd); err != nil {
				c.Logger.Error("无法将创建者添加到团队。", "error", err)
			}
		} else {
			c.Logger.Warn("由于不是真实用户，因此无法将创建者添加到团队中。")
		}
	}

	return JSON(200, &util.DynMap{
		"teamId":  cmd.Result.Id,
		"message": "团队已创建",
	})
}

// PUT /api/teams/:teamId
func (hs *HTTPServer) UpdateTeam(c *models.ReqContext, cmd models.UpdateTeamCommand) Response {
	cmd.OrgId = c.OrgId
	cmd.Id = c.ParamsInt64(":teamId")

	if err := teamguardian.CanAdmin(hs.Bus, cmd.OrgId, cmd.Id, c.SignedInUser); err != nil {
		return Error(403, "不允许更新团队", err)
	}

	if err := hs.Bus.Dispatch(&cmd); err != nil {
		if err == models.ErrTeamNameTaken {
			return Error(400, "团队名字已采取", err)
		}
		return Error(500, "无法更新团队", err)
	}

	return Success("团队更新")
}

// DELETE /api/teams/:teamId
func (hs *HTTPServer) DeleteTeamByID(c *models.ReqContext) Response {
	orgId := c.OrgId
	teamId := c.ParamsInt64(":teamId")
	user := c.SignedInUser

	if err := teamguardian.CanAdmin(hs.Bus, orgId, teamId, user); err != nil {
		return Error(403, "不允许删除团队", err)
	}

	if err := hs.Bus.Dispatch(&models.DeleteTeamCommand{OrgId: orgId, Id: teamId}); err != nil {
		if err == models.ErrTeamNotFound {
			return Error(404, "无法删除团队。 找不到ID", nil)
		}
		return Error(500, "无法删除团队", err)
	}
	return Success("团队已删除")
}

// GET /api/teams/search
func (hs *HTTPServer) SearchTeams(c *models.ReqContext) Response {
	perPage := c.QueryInt("perpage")
	if perPage <= 0 {
		perPage = 1000
	}
	page := c.QueryInt("page")
	if page < 1 {
		page = 1
	}

	var userIdFilter int64
	if hs.Cfg.EditorsCanAdmin && c.OrgRole != models.ROLE_ADMIN {
		userIdFilter = c.SignedInUser.UserId
	}

	query := models.SearchTeamsQuery{
		OrgId:        c.OrgId,
		Query:        c.Query("query"),
		Name:         c.Query("name"),
		UserIdFilter: userIdFilter,
		Page:         page,
		Limit:        perPage,
	}

	if err := bus.Dispatch(&query); err != nil {
		return Error(500, "未能搜索团队", err)
	}

	for _, team := range query.Result.Teams {
		team.AvatarUrl = dtos.GetGravatarUrlWithDefault(team.Email, team.Name)
	}

	query.Result.Page = page
	query.Result.PerPage = perPage

	return JSON(200, query.Result)
}

// GET /api/teams/:teamId
func GetTeamByID(c *models.ReqContext) Response {
	query := models.GetTeamByIdQuery{OrgId: c.OrgId, Id: c.ParamsInt64(":teamId")}

	if err := bus.Dispatch(&query); err != nil {
		if err == models.ErrTeamNotFound {
			return Error(404, "找不到团队", err)
		}

		return Error(500, "无法获得团队", err)
	}

	query.Result.AvatarUrl = dtos.GetGravatarUrlWithDefault(query.Result.Email, query.Result.Name)
	return JSON(200, &query.Result)
}

// GET /api/teams/:teamId/preferences
func (hs *HTTPServer) GetTeamPreferences(c *models.ReqContext) Response {
	teamId := c.ParamsInt64(":teamId")
	orgId := c.OrgId

	if err := teamguardian.CanAdmin(hs.Bus, orgId, teamId, c.SignedInUser); err != nil {
		return Error(403, "不允许查看团队首选项。", err)
	}

	return getPreferencesFor(orgId, 0, teamId)
}

// PUT /api/teams/:teamId/preferences
func (hs *HTTPServer) UpdateTeamPreferences(c *models.ReqContext, dtoCmd dtos.UpdatePrefsCmd) Response {
	teamId := c.ParamsInt64(":teamId")
	orgId := c.OrgId

	if err := teamguardian.CanAdmin(hs.Bus, orgId, teamId, c.SignedInUser); err != nil {
		return Error(403, "不允许更新团队首选项。", err)
	}

	return updatePreferencesFor(orgId, 0, teamId, &dtoCmd)
}
