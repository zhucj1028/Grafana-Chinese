package api

import (
	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/setting"
	"github.com/grafana/grafana/pkg/util"
)

func SendResetPasswordEmail(c *models.ReqContext, form dtos.SendResetPasswordEmailForm) Response {
	if setting.LDAPEnabled || setting.AuthProxyEnabled {
		return Error(401, "启用LDAP或身份验证代理后，不允许重设密码", nil)
	}
	if setting.DisableLoginForm {
		return Error(401, "禁用登录表单后，不允许重设密码", nil)
	}

	userQuery := models.GetUserByLoginQuery{LoginOrEmail: form.UserOrEmail}

	if err := bus.Dispatch(&userQuery); err != nil {
		c.Logger.Info("Requested password reset for user that was not found", "user", userQuery.LoginOrEmail)
		return Error(200, "邮件已发送", err)
	}

	emailCmd := models.SendResetPasswordEmailCommand{User: userQuery.Result}
	if err := bus.Dispatch(&emailCmd); err != nil {
		return Error(500, "无法发送电子邮件", err)
	}

	return Success("邮件已发送")
}

func ResetPassword(c *models.ReqContext, form dtos.ResetUserPasswordForm) Response {
	query := models.ValidateResetPasswordCodeQuery{Code: form.Code}

	if err := bus.Dispatch(&query); err != nil {
		if err == models.ErrInvalidEmailCode {
			return Error(400, "无效或过期的重置密码代码", nil)
		}
		return Error(500, "验证电子邮件代码时发生未知错误", err)
	}

	if form.NewPassword != form.ConfirmPassword {
		return Error(400, "密码不匹配", nil)
	}

	cmd := models.ChangeUserPasswordCommand{}
	cmd.UserId = query.Result.Id
	var err error
	cmd.NewPassword, err = util.EncodePassword(form.NewPassword, query.Result.Salt)
	if err != nil {
		return Error(500, "密码编码失败", err)
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "修改用户密码失败", err)
	}

	return Success("用户密码已更改")
}
