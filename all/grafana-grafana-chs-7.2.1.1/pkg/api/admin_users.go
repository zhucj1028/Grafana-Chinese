package api

import (
	"errors"
	"fmt"

	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/infra/metrics"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/util"
)

func AdminCreateUser(c *models.ReqContext, form dtos.AdminCreateUserForm) Response {
	cmd := models.CreateUserCommand{
		Login:    form.Login,
		Email:    form.Email,
		Password: form.Password,
		Name:     form.Name,
		OrgId:    form.OrgId,
	}

	if len(cmd.Login) == 0 {
		cmd.Login = cmd.Email
		if len(cmd.Login) == 0 {
			return Error(400, "验证错误，需要指定用户名或电子邮件", nil)
		}
	}

	if len(cmd.Password) < 4 {
		return Error(400, "密码丢失或太短", nil)
	}

	if err := bus.Dispatch(&cmd); err != nil {
		if errors.Is(err, models.ErrOrgNotFound) {
			return Error(400, err.Error(), nil)
		}

		if errors.Is(err, models.ErrUserAlreadyExists) {
			return Error(412, fmt.Sprintf("用户邮箱 '%s' 或用户名 '%s' 已存在", form.Email, form.Login), err)
		}

		return Error(500, "创建用户失败", err)
	}

	metrics.MApiAdminUserCreate.Inc()

	user := cmd.Result

	result := models.UserIdDTO{
		Message: "用户创建",
		Id:      user.Id,
	}

	return JSON(200, result)
}

func AdminUpdateUserPassword(c *models.ReqContext, form dtos.AdminUpdateUserPasswordForm) Response {
	userID := c.ParamsInt64(":id")

	if len(form.Password) < 4 {
		return Error(400, "新密码太短", nil)
	}

	userQuery := models.GetUserByIdQuery{Id: userID}

	if err := bus.Dispatch(&userQuery); err != nil {
		return Error(500, "无法从数据库读取用户", err)
	}

	passwordHashed, err := util.EncodePassword(form.Password, userQuery.Result.Salt)
	if err != nil {
		return Error(500, "无法编码密码", err)
	}

	cmd := models.ChangeUserPasswordCommand{
		UserId:      userID,
		NewPassword: passwordHashed,
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更新用户密码", err)
	}

	return Success("用户密码已更新")
}

// PUT /api/admin/users/:id/permissions
func AdminUpdateUserPermissions(c *models.ReqContext, form dtos.AdminUpdateUserPermissionsForm) Response {
	userID := c.ParamsInt64(":id")

	cmd := models.UpdateUserPermissionsCommand{
		UserId:         userID,
		IsGrafanaAdmin: form.IsGrafanaAdmin,
	}

	if err := bus.Dispatch(&cmd); err != nil {
		if err == models.ErrLastGrafanaAdmin {
			return Error(400, models.ErrLastGrafanaAdmin.Error(), nil)
		}

		return Error(500, "无法更新用户权限", err)
	}

	return Success("用户权限已更新")
}

func AdminDeleteUser(c *models.ReqContext) Response {
	userID := c.ParamsInt64(":id")

	cmd := models.DeleteUserCommand{UserId: userID}

	if err := bus.Dispatch(&cmd); err != nil {
		if err == models.ErrUserNotFound {
			return Error(404, models.ErrUserNotFound.Error(), nil)
		}
		return Error(500, "删除用户失败", err)
	}

	return Success("用户已删除")
}

// POST /api/admin/users/:id/disable
func (server *HTTPServer) AdminDisableUser(c *models.ReqContext) Response {
	userID := c.ParamsInt64(":id")

	// External users shouldn't be disabled from API
	authInfoQuery := &models.GetAuthInfoQuery{UserId: userID}
	if err := bus.Dispatch(authInfoQuery); err != models.ErrUserNotFound {
		return Error(500, "无法禁用外部用户", nil)
	}

	disableCmd := models.DisableUserCommand{UserId: userID, IsDisabled: true}
	if err := bus.Dispatch(&disableCmd); err != nil {
		if err == models.ErrUserNotFound {
			return Error(404, models.ErrUserNotFound.Error(), nil)
		}
		return Error(500, "无法禁用用户", err)
	}

	err := server.AuthTokenService.RevokeAllUserTokens(c.Req.Context(), userID)
	if err != nil {
		return Error(500, "无法禁用用户", err)
	}

	return Success("用户已禁用")
}

// POST /api/admin/users/:id/enable
func AdminEnableUser(c *models.ReqContext) Response {
	userID := c.ParamsInt64(":id")

	// External users shouldn't be disabled from API
	authInfoQuery := &models.GetAuthInfoQuery{UserId: userID}
	if err := bus.Dispatch(authInfoQuery); err != models.ErrUserNotFound {
		return Error(500, "无法启用外部用户", nil)
	}

	disableCmd := models.DisableUserCommand{UserId: userID, IsDisabled: false}
	if err := bus.Dispatch(&disableCmd); err != nil {
		if err == models.ErrUserNotFound {
			return Error(404, models.ErrUserNotFound.Error(), nil)
		}
		return Error(500, "无法启用用户", err)
	}

	return Success("已启用用户")
}

// POST /api/admin/users/:id/logout
func (server *HTTPServer) AdminLogoutUser(c *models.ReqContext) Response {
	userID := c.ParamsInt64(":id")

	if c.UserId == userID {
		return Error(400, "您无法登出自己", nil)
	}

	return server.logoutUserFromAllDevicesInternal(c.Req.Context(), userID)
}

// GET /api/admin/users/:id/auth-tokens
func (server *HTTPServer) AdminGetUserAuthTokens(c *models.ReqContext) Response {
	userID := c.ParamsInt64(":id")
	return server.getUserAuthTokensInternal(c, userID)
}

// POST /api/admin/users/:id/revoke-auth-token
func (server *HTTPServer) AdminRevokeUserAuthToken(c *models.ReqContext, cmd models.RevokeAuthTokenCmd) Response {
	userID := c.ParamsInt64(":id")
	return server.revokeUserAuthTokenInternal(c, userID, cmd)
}
