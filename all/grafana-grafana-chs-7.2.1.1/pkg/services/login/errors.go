package login

import "errors"

var (
	ErrInvalidCredentials = errors.New("无效的用户名或密码")
	ErrUsersQuotaReached  = errors.New("已达到用户配额")
	ErrGettingUserQuota   = errors.New("获取用户配额时出错")
)
