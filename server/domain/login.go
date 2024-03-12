package domain

import (
	"context"
)

type LoginUsecase interface {
	Create(c context.Context, user *User) error
	GetUserByEmail(c context.Context, email string) (User, error)
	CreateAccessToken(user *User, secret string, expiry int) (accessToken string, err error)
	CreateRefreshToken(user *User, secret string, expiry int) (refreshToken string, err error)
	UpdateUser(c context.Context, dbUser *User, name string, avatarURL string)
}
