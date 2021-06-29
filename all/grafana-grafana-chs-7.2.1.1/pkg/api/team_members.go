package api

import (
	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/teamguardian"
	"github.com/grafana/grafana/pkg/util"
)

// GET /api/teams/:teamId/members
func (hs *HTTPServer) GetTeamMembers(c *models.ReqContext) Response {
	query := models.GetTeamMembersQuery{OrgId: c.OrgId, TeamId: c.ParamsInt64(":teamId")}

	if err := bus.Dispatch(&query); err != nil {
		return Error(500, "无法获得团队成员", err)
	}

	for _, member := range query.Result {
		member.AvatarUrl = dtos.GetGravatarUrl(member.Email)
		member.Labels = []string{}

		if hs.License.HasValidLicense() && member.External {
			authProvider := GetAuthProviderLabel(member.AuthModule)
			member.Labels = append(member.Labels, authProvider)
		}
	}

	return JSON(200, query.Result)
}

// POST /api/teams/:teamId/members
func (hs *HTTPServer) AddTeamMember(c *models.ReqContext, cmd models.AddTeamMemberCommand) Response {
	cmd.OrgId = c.OrgId
	cmd.TeamId = c.ParamsInt64(":teamId")

	if err := teamguardian.CanAdmin(hs.Bus, cmd.OrgId, cmd.TeamId, c.SignedInUser); err != nil {
		return Error(403, "不允许添加团队成员", err)
	}

	if err := hs.Bus.Dispatch(&cmd); err != nil {
		if err == models.ErrTeamNotFound {
			return Error(404, "找不到团队", nil)
		}

		if err == models.ErrTeamMemberAlreadyAdded {
			return Error(400, "用户已添加到该团队", nil)
		}

		return Error(500, "无法将成员添加到团队", err)
	}

	return JSON(200, &util.DynMap{
		"message": "成员已添加到团队",
	})
}

// PUT /:teamId/members/:userId
func (hs *HTTPServer) UpdateTeamMember(c *models.ReqContext, cmd models.UpdateTeamMemberCommand) Response {
	teamId := c.ParamsInt64(":teamId")
	orgId := c.OrgId

	if err := teamguardian.CanAdmin(hs.Bus, orgId, teamId, c.SignedInUser); err != nil {
		return Error(403, "不允许更新团队成员", err)
	}

	if c.OrgRole != models.ROLE_ADMIN {
		cmd.ProtectLastAdmin = true
	}

	cmd.TeamId = teamId
	cmd.UserId = c.ParamsInt64(":userId")
	cmd.OrgId = orgId

	if err := hs.Bus.Dispatch(&cmd); err != nil {
		if err == models.ErrTeamMemberNotFound {
			return Error(404, "找不到团队成员。", nil)
		}
		return Error(500, "无法更新团队成员。", err)
	}
	return Success("团队成员已更新")
}

// DELETE /api/teams/:teamId/members/:userId
func (hs *HTTPServer) RemoveTeamMember(c *models.ReqContext) Response {
	orgId := c.OrgId
	teamId := c.ParamsInt64(":teamId")
	userId := c.ParamsInt64(":userId")

	if err := teamguardian.CanAdmin(hs.Bus, orgId, teamId, c.SignedInUser); err != nil {
		return Error(403, "不允许删除团队成员", err)
	}

	protectLastAdmin := false
	if c.OrgRole != models.ROLE_ADMIN {
		protectLastAdmin = true
	}

	if err := hs.Bus.Dispatch(&models.RemoveTeamMemberCommand{OrgId: orgId, TeamId: teamId, UserId: userId, ProtectLastAdmin: protectLastAdmin}); err != nil {
		if err == models.ErrTeamNotFound {
			return Error(404, "找不到团队", nil)
		}

		if err == models.ErrTeamMemberNotFound {
			return Error(404, "找不到团队成员", nil)
		}

		return Error(500, "无法从团队中删除成员", err)
	}
	return Success("团队成员已删除")
}
