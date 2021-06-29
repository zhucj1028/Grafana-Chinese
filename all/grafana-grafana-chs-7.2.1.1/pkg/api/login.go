package api

import (
	"encoding/hex"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/infra/metrics"
	"github.com/grafana/grafana/pkg/login"
	"github.com/grafana/grafana/pkg/middleware"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/setting"
	"github.com/grafana/grafana/pkg/util"
	"github.com/grafana/grafana/pkg/util/errutil"
)

const (
	ViewIndex            = "index"
	LoginErrorCookieName = "login_error"
)

var setIndexViewData = (*HTTPServer).setIndexViewData

var getViewIndex = func() string {
	return ViewIndex
}

func (hs *HTTPServer) ValidateRedirectTo(redirectTo string) error {
	to, err := url.Parse(redirectTo)
	if err != nil {
		return login.ErrInvalidRedirectTo
	}
	if to.IsAbs() {
		return login.ErrAbsoluteRedirectTo
	}

	if to.Host != "" {
		return login.ErrForbiddenRedirectTo
	}

	// path should have exactly one leading slash
	if !strings.HasPrefix(to.Path, "/") {
		return login.ErrForbiddenRedirectTo
	}
	if strings.HasPrefix(to.Path, "//") {
		return login.ErrForbiddenRedirectTo
	}

	// when using a subUrl, the redirect_to should start with the subUrl (which contains the leading slash), otherwise the redirect
	// will send the user to the wrong location
	if hs.Cfg.AppSubUrl != "" && !strings.HasPrefix(to.Path, hs.Cfg.AppSubUrl+"/") {
		return login.ErrInvalidRedirectTo
	}

	return nil
}

func (hs *HTTPServer) CookieOptionsFromCfg() middleware.CookieOptions {
	path := "/"
	if len(hs.Cfg.AppSubUrl) > 0 {
		path = hs.Cfg.AppSubUrl
	}
	return middleware.CookieOptions{
		Path:             path,
		Secure:           hs.Cfg.CookieSecure,
		SameSiteDisabled: hs.Cfg.CookieSameSiteDisabled,
		SameSiteMode:     hs.Cfg.CookieSameSiteMode,
	}
}

func (hs *HTTPServer) LoginView(c *models.ReqContext) {
	viewData, err := setIndexViewData(hs, c)
	if err != nil {
		c.Handle(500, "Failed to get settings", err)
		return
	}

	enabledOAuths := make(map[string]interface{})
	for key, oauth := range setting.OAuthService.OAuthInfos {
		enabledOAuths[key] = map[string]string{"name": oauth.Name}
	}

	viewData.Settings["oauth"] = enabledOAuths
	viewData.Settings["samlEnabled"] = hs.License.HasValidLicense() && hs.Cfg.SAMLEnabled

	if loginError, ok := tryGetEncryptedCookie(c, LoginErrorCookieName); ok {
		//this cookie is only set whenever an OAuth login fails
		//therefore the loginError should be passed to the view data
		//and the view should return immediately before attempting
		//to login again via OAuth and enter to a redirect loop
		middleware.DeleteCookie(c.Resp, LoginErrorCookieName, hs.CookieOptionsFromCfg)
		viewData.Settings["loginError"] = loginError
		c.HTML(200, getViewIndex(), viewData)
		return
	}

	if tryOAuthAutoLogin(c) {
		return
	}

	if c.IsSignedIn {
		// Assign login token to auth proxy users if enable_login_token = true
		if setting.AuthProxyEnabled && setting.AuthProxyEnableLoginToken {
			user := &models.User{Id: c.SignedInUser.UserId, Email: c.SignedInUser.Email, Login: c.SignedInUser.Login}
			err := hs.loginUserWithUser(user, c)
			if err != nil {
				c.Handle(500, "Failed to sign in user", err)
				return
			}
		}

		if redirectTo, _ := url.QueryUnescape(c.GetCookie("redirect_to")); len(redirectTo) > 0 {
			if err := hs.ValidateRedirectTo(redirectTo); err != nil {
				// the user is already logged so instead of rendering the login page with error
				// it should be redirected to the home page.
				log.Debugf("Ignored invalid redirect_to cookie value: %v", redirectTo)
				redirectTo = hs.Cfg.AppSubUrl + "/"
			}
			middleware.DeleteCookie(c.Resp, "redirect_to", hs.CookieOptionsFromCfg)
			c.Redirect(redirectTo)
			return
		}

		c.Redirect(setting.AppSubUrl + "/")
		return
	}

	c.HTML(200, getViewIndex(), viewData)
}

func tryOAuthAutoLogin(c *models.ReqContext) bool {
	if !setting.OAuthAutoLogin {
		return false
	}
	oauthInfos := setting.OAuthService.OAuthInfos
	if len(oauthInfos) != 1 {
		log.Warnf("跳过OAuth自动登录，因为配置了多个OAuth提供程序")
		return false
	}
	for key := range setting.OAuthService.OAuthInfos {
		redirectUrl := setting.AppSubUrl + "/login/" + key
		log.Infof("启用了OAuth自动登录。重定向到 " + redirectUrl)
		c.Redirect(redirectUrl, 307)
		return true
	}
	return false
}

func (hs *HTTPServer) LoginAPIPing(c *models.ReqContext) Response {
	if c.IsSignedIn || c.IsAnonymous {
		return JSON(200, "已登陆")
	}

	return Error(401, "未经授权", nil)
}

func (hs *HTTPServer) LoginPost(c *models.ReqContext, cmd dtos.LoginCommand) Response {
	action := "login"
	var user *models.User
	var response *NormalResponse

	defer func() {
		err := response.err
		if err == nil && response.errMessage != "" {
			err = errors.New(response.errMessage)
		}
		hs.SendLoginLog(&models.SendLoginLogCommand{
			ReqContext: c,
			LogAction:  action,
			User:       user,
			HTTPStatus: response.status,
			Error:      err,
		})
	}()

	if setting.DisableLoginForm {
		response = Error(http.StatusUnauthorized, "登录被禁用", nil)
		return response
	}

	authQuery := &models.LoginUserQuery{
		ReqContext: c,
		Username:   cmd.User,
		Password:   cmd.Password,
		IpAddress:  c.Req.RemoteAddr,
	}

	err := bus.Dispatch(authQuery)
	if authQuery.AuthModule != "" {
		action += fmt.Sprintf("-%s", authQuery.AuthModule)
	}
	if err != nil {
		response = Error(401, "用户名或密码无效", err)
		if err == login.ErrInvalidCredentials || err == login.ErrTooManyLoginAttempts || err == models.ErrUserNotFound {
			return response
		}

		// Do not expose disabled status,
		// just show incorrect user credentials error (see #17947)
		if err == login.ErrUserDisabled {
			hs.log.Warn("用户被禁用", "user", cmd.User)
			return response
		}

		response = Error(500, "尝试验证用户时出错", err)
		return response
	}

	user = authQuery.User

	err = hs.loginUserWithUser(user, c)
	if err != nil {
		response = Error(http.StatusInternalServerError, "登录用户时出错", err)
		return response
	}

	result := map[string]interface{}{
		"message": "已登录",
	}

	if redirectTo, _ := url.QueryUnescape(c.GetCookie("redirect_to")); len(redirectTo) > 0 {
		if err := hs.ValidateRedirectTo(redirectTo); err == nil {
			result["redirectUrl"] = redirectTo
		} else {
			log.Infof("忽略无效的redirect_to cookie值: %v", redirectTo)
		}
		middleware.DeleteCookie(c.Resp, "redirect_to", hs.CookieOptionsFromCfg)
	}

	metrics.MApiLoginPost.Inc()
	response = JSON(http.StatusOK, result)
	return response
}

func (hs *HTTPServer) loginUserWithUser(user *models.User, c *models.ReqContext) error {
	if user == nil {
		return errors.New("无法登录用户")
	}

	userToken, err := hs.AuthTokenService.CreateToken(c.Req.Context(), user.Id, c.RemoteAddr(), c.Req.UserAgent())
	if err != nil {
		return errutil.Wrap("无法创建身份验证令牌", err)
	}

	hs.log.Info("成功登录", "User", user.Email)
	middleware.WriteSessionCookie(c, userToken.UnhashedToken, hs.Cfg.LoginMaxLifetime)
	return nil
}

func (hs *HTTPServer) Logout(c *models.ReqContext) {
	if err := hs.AuthTokenService.RevokeToken(c.Req.Context(), c.UserToken); err != nil && err != models.ErrUserTokenNotFound {
		hs.log.Error("无法撤消身份验证令牌", "error", err)
	}

	middleware.WriteSessionCookie(c, "", -1)

	if setting.SignoutRedirectUrl != "" {
		c.Redirect(setting.SignoutRedirectUrl)
	} else {
		hs.log.Info("Successful Logout", "User", c.Email)
		c.Redirect(setting.AppSubUrl + "/login")
	}
}

func tryGetEncryptedCookie(ctx *models.ReqContext, cookieName string) (string, bool) {
	cookie := ctx.GetCookie(cookieName)
	if cookie == "" {
		return "", false
	}

	decoded, err := hex.DecodeString(cookie)
	if err != nil {
		return "", false
	}

	decryptedError, err := util.Decrypt(decoded, setting.SecretKey)
	return string(decryptedError), err == nil
}

func (hs *HTTPServer) trySetEncryptedCookie(ctx *models.ReqContext, cookieName string, value string, maxAge int) error {
	encryptedError, err := util.Encrypt([]byte(value), setting.SecretKey)
	if err != nil {
		return err
	}

	middleware.WriteCookie(ctx.Resp, cookieName, hex.EncodeToString(encryptedError), 60, hs.CookieOptionsFromCfg)

	return nil
}

func (hs *HTTPServer) redirectWithError(ctx *models.ReqContext, err error, v ...interface{}) {
	ctx.Logger.Error(err.Error(), v...)
	if err := hs.trySetEncryptedCookie(ctx, LoginErrorCookieName, err.Error(), 60); err != nil {
		hs.log.Error("无法设置加密的cookie", "err", err)
	}

	ctx.Redirect(setting.AppSubUrl + "/login")
}

func (hs *HTTPServer) RedirectResponseWithError(ctx *models.ReqContext, err error, v ...interface{}) *RedirectResponse {
	ctx.Logger.Error(err.Error(), v...)
	if err := hs.trySetEncryptedCookie(ctx, LoginErrorCookieName, err.Error(), 60); err != nil {
		hs.log.Error("无法设置加密的cookie", "err", err)
	}

	return Redirect(setting.AppSubUrl + "/login")
}

func (hs *HTTPServer) SendLoginLog(cmd *models.SendLoginLogCommand) {
	if err := bus.Dispatch(cmd); err != nil {
		if err != bus.ErrHandlerNotFound {
			hs.log.Warn("发送登录日志时出错", "err", err)
		}
	}
}
