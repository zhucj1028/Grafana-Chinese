package api

import (
	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/setting"
	"github.com/grafana/grafana/pkg/util"
)

// GET /api/user  (current authenticated user)
func GetSignedInUser(c *models.ReqContext) Response {
	return getUserUserProfile(c.UserId)
}

// GET /api/users/:id
func GetUserByID(c *models.ReqContext) Response {
	return getUserUserProfile(c.ParamsInt64(":id"))
}

func getUserUserProfile(userID int64) Response {
	query := models.GetUserProfileQuery{UserId: userID}

	if err := bus.Dispatch(&query); err != nil {
		if err == models.ErrUserNotFound {
			return Error(404, models.ErrUserNotFound.Error(), nil)
		}
		return Error(500, "用户未找到", err)
	}

	getAuthQuery := models.GetAuthInfoQuery{UserId: userID}
	query.Result.AuthLabels = []string{}
	if err := bus.Dispatch(&getAuthQuery); err == nil {
		authLabel := GetAuthProviderLabel(getAuthQuery.Result.AuthModule)
		query.Result.AuthLabels = append(query.Result.AuthLabels, authLabel)
		query.Result.IsExternal = true
	}

	query.Result.AvatarUrl = dtos.GetGravatarUrl(query.Result.Email)

	return JSON(200, query.Result)
}

// GET /api/users/lookup
func GetUserByLoginOrEmail(c *models.ReqContext) Response {
	query := models.GetUserByLoginQuery{LoginOrEmail: c.Query("loginOrEmail")}
	if err := bus.Dispatch(&query); err != nil {
		if err == models.ErrUserNotFound {
			return Error(404, models.ErrUserNotFound.Error(), nil)
		}
		return Error(500, "用户未找到", err)
	}
	user := query.Result
	result := models.UserProfileDTO{
		Id:             user.Id,
		Name:           user.Name,
		Email:          user.Email,
		Login:          user.Login,
		Theme:          user.Theme,
		IsGrafanaAdmin: user.IsAdmin,
		OrgId:          user.OrgId,
		UpdatedAt:      user.Updated,
		CreatedAt:      user.Created,
	}
	return JSON(200, &result)
}

// POST /api/user
func UpdateSignedInUser(c *models.ReqContext, cmd models.UpdateUserCommand) Response {
	if setting.AuthProxyEnabled {
		if setting.AuthProxyHeaderProperty == "email" && cmd.Email != c.Email {
			return Error(400, "身份验证代理使用电子邮件属性时，不允许更改电子邮件", nil)
		}
		if setting.AuthProxyHeaderProperty == "username" && cmd.Login != c.Login {
			return Error(400, "身份验证代理使用用户名属性时，不允许更改用户名", nil)
		}
	}
	cmd.UserId = c.UserId
	return handleUpdateUser(cmd)
}

// POST /api/users/:id
func UpdateUser(c *models.ReqContext, cmd models.UpdateUserCommand) Response {
	cmd.UserId = c.ParamsInt64(":id")
	return handleUpdateUser(cmd)
}

//POST /api/users/:id/using/:orgId
func UpdateUserActiveOrg(c *models.ReqContext) Response {
	userID := c.ParamsInt64(":id")
	orgID := c.ParamsInt64(":orgId")

	if !validateUsingOrg(userID, orgID) {
		return Error(401, "不是有效的组织", nil)
	}

	cmd := models.SetUsingOrgCommand{UserId: userID, OrgId: orgID}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更改活跃的组织", err)
	}

	return Success("活跃的组织已更改")
}

func handleUpdateUser(cmd models.UpdateUserCommand) Response {
	if len(cmd.Login) == 0 {
		cmd.Login = cmd.Email
		if len(cmd.Login) == 0 {
			return Error(400, "验证错误，需要指定用户名或电子邮件", nil)
		}
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更新用户", err)
	}

	return Success("用户已更新")
}

// GET /api/user/orgs
func GetSignedInUserOrgList(c *models.ReqContext) Response {
	return getUserOrgList(c.UserId)
}

// GET /api/user/teams
func GetSignedInUserTeamList(c *models.ReqContext) Response {
	return getUserTeamList(c.OrgId, c.UserId)
}

// GET /api/users/:id/teams
func GetUserTeams(c *models.ReqContext) Response {
	return getUserTeamList(c.OrgId, c.ParamsInt64(":id"))
}

func getUserTeamList(orgID int64, userID int64) Response {
	query := models.GetTeamsByUserQuery{OrgId: orgID, UserId: userID}

	if err := bus.Dispatch(&query); err != nil {
		return Error(500, "无法获得用户团队", err)
	}

	for _, team := range query.Result {
		team.AvatarUrl = dtos.GetGravatarUrlWithDefault(team.Email, team.Name)
	}
	return JSON(200, query.Result)
}

// GET /api/users/:id/orgs
func GetUserOrgList(c *models.ReqContext) Response {
	return getUserOrgList(c.ParamsInt64(":id"))
}

func getUserOrgList(userID int64) Response {
	query := models.GetUserOrgListQuery{UserId: userID}

	if err := bus.Dispatch(&query); err != nil {
		return Error(500, "无法获得用户组织", err)
	}

	return JSON(200, query.Result)
}

func validateUsingOrg(userID int64, orgID int64) bool {
	query := models.GetUserOrgListQuery{UserId: userID}

	if err := bus.Dispatch(&query); err != nil {
		return false
	}

	// validate that the org id in the list
	valid := false
	for _, other := range query.Result {
		if other.OrgId == orgID {
			valid = true
		}
	}

	return valid
}

// POST /api/user/using/:id
func UserSetUsingOrg(c *models.ReqContext) Response {
	orgID := c.ParamsInt64(":id")

	if !validateUsingOrg(c.UserId, orgID) {
		return Error(401, "不是有效的组织", nil)
	}

	cmd := models.SetUsingOrgCommand{UserId: c.UserId, OrgId: orgID}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更改活跃的组织", err)
	}

	return Success("活跃的组织已更改")
}

// GET /profile/switch-org/:id
func (hs *HTTPServer) ChangeActiveOrgAndRedirectToHome(c *models.ReqContext) {
	orgID := c.ParamsInt64(":id")

	if !validateUsingOrg(c.UserId, orgID) {
		hs.NotFoundHandler(c)
	}

	cmd := models.SetUsingOrgCommand{UserId: c.UserId, OrgId: orgID}

	if err := bus.Dispatch(&cmd); err != nil {
		hs.NotFoundHandler(c)
	}

	c.Redirect(setting.AppSubUrl + "/")
}

func ChangeUserPassword(c *models.ReqContext, cmd models.ChangeUserPasswordCommand) Response {
	if setting.LDAPEnabled || setting.AuthProxyEnabled {
		return Error(400, "启用LDAP或身份验证代理后，不允许更改密码d", nil)
	}

	userQuery := models.GetUserByIdQuery{Id: c.UserId}

	if err := bus.Dispatch(&userQuery); err != nil {
		return Error(500, "无法从数据库读取用户", err)
	}

	passwordHashed, err := util.EncodePassword(cmd.OldPassword, userQuery.Result.Salt)
	if err != nil {
		return Error(500, "密码编码失败", err)
	}
	if passwordHashed != userQuery.Result.Password {
		return Error(401, "无效的旧密码", nil)
	}

	password := models.Password(cmd.NewPassword)
	if password.IsWeak() {
		return Error(400, "新密码太短", nil)
	}

	cmd.UserId = c.UserId
	cmd.NewPassword, err = util.EncodePassword(cmd.NewPassword, userQuery.Result.Salt)
	if err != nil {
		return Error(500, "密码编码失败", err)
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "修改用户密码失败", err)
	}

	return Success("用户密码已更改")
}

// GET /api/users
func SearchUsers(c *models.ReqContext) Response {
	query, err := searchUser(c)
	if err != nil {
		return Error(500, "无法获取用户", err)
	}

	return JSON(200, query.Result.Users)
}

// GET /api/users/search
func SearchUsersWithPaging(c *models.ReqContext) Response {
	query, err := searchUser(c)
	if err != nil {
		return Error(500, "无法获取用户", err)
	}

	return JSON(200, query.Result)
}

func searchUser(c *models.ReqContext) (*models.SearchUsersQuery, error) {
	perPage := c.QueryInt("perpage")
	if perPage <= 0 {
		perPage = 1000
	}
	page := c.QueryInt("page")

	if page < 1 {
		page = 1
	}

	searchQuery := c.Query("query")

	query := &models.SearchUsersQuery{Query: searchQuery, Page: page, Limit: perPage}
	if err := bus.Dispatch(query); err != nil {
		return nil, err
	}

	for _, user := range query.Result.Users {
		user.AvatarUrl = dtos.GetGravatarUrl(user.Email)
		user.AuthLabels = make([]string, 0)
		if user.AuthModule != nil && len(user.AuthModule) > 0 {
			for _, authModule := range user.AuthModule {
				user.AuthLabels = append(user.AuthLabels, GetAuthProviderLabel(authModule))
			}
		}
	}

	query.Result.Page = page
	query.Result.PerPage = perPage

	return query, nil
}

func SetHelpFlag(c *models.ReqContext) Response {
	flag := c.ParamsInt64(":id")

	bitmask := &c.HelpFlags1
	bitmask.AddFlag(models.HelpFlags1(flag))

	cmd := models.SetUserHelpFlagCommand{
		UserId:     c.UserId,
		HelpFlags1: *bitmask,
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更新帮助标志", err)
	}

	return JSON(200, &util.DynMap{"message": "帮助标志设置", "helpFlags1": cmd.HelpFlags1})
}

func ClearHelpFlags(c *models.ReqContext) Response {
	cmd := models.SetUserHelpFlagCommand{
		UserId:     c.UserId,
		HelpFlags1: models.HelpFlags1(0),
	}

	if err := bus.Dispatch(&cmd); err != nil {
		return Error(500, "无法更新帮助标志", err)
	}

	return JSON(200, &util.DynMap{"message": "帮助标志设置", "helpFlags1": cmd.HelpFlags1})
}

func GetAuthProviderLabel(authModule string) string {
	switch authModule {
	case "oauth_github":
		return "GitHub"
	case "oauth_google":
		return "Google"
	case "oauth_azuread":
		return "AzureAD"
	case "oauth_gitlab":
		return "GitLab"
	case "oauth_grafana_com", "oauth_grafananet":
		return "grafana.com"
	case "auth.saml":
		return "SAML"
	case "ldap", "":
		return "LDAP"
	default:
		return "OAuth"
	}
}
