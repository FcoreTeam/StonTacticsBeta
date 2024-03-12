package controller

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth/gothic"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"stontactics/bootstrap"
	"stontactics/domain"
)

type LoginController struct {
	LoginUsecase domain.LoginUsecase
	Env          *bootstrap.Env
}

func (sc *LoginController) BeginLogin(c *gin.Context) {
	provider := c.Param("provider")
	r := c.Request.WithContext(context.WithValue(context.Background(), "provider", provider))
	gothic.BeginAuthHandler(c.Writer, r)
}

func (sc *LoginController) Login(c *gin.Context) {
	provider := c.Param("provider")
	c.Set("provider", provider)

	user, err := gothic.CompleteUserAuth(c.Writer, c.Request)
	if err != nil {
		c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
		return
	}
	dbUser, err := sc.LoginUsecase.GetUserByEmail(c, user.Email)
	var accessToken, refreshToken string
	if err == nil {
		if dbUser.Name != user.FirstName || dbUser.AvatarURL != user.AvatarURL {
			defer sc.LoginUsecase.UpdateUser(c, &dbUser, user.FirstName, user.AvatarURL)
		}
		accessToken, err = sc.LoginUsecase.CreateAccessToken(&dbUser, sc.Env.AccessTokenSecret, sc.Env.AccessTokenExpiryHour)
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
			return
		}

		refreshToken, err = sc.LoginUsecase.CreateRefreshToken(&dbUser, sc.Env.RefreshTokenSecret, sc.Env.RefreshTokenExpiryHour)
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
			return
		}
	} else {
		dbUser = domain.User{
			ID:        primitive.NewObjectID(),
			Name:      user.FirstName,
			Email:     user.Email,
			AvatarURL: user.AvatarURL,
		}

		err = sc.LoginUsecase.Create(c, &dbUser)
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
			return
		}

		accessToken, err = sc.LoginUsecase.CreateAccessToken(&dbUser, sc.Env.AccessTokenSecret, sc.Env.AccessTokenExpiryHour)
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
			return
		}

		refreshToken, err = sc.LoginUsecase.CreateRefreshToken(&dbUser, sc.Env.RefreshTokenSecret, sc.Env.RefreshTokenExpiryHour)
		if err != nil {
			c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
			return
		}
	}
	c.Redirect(http.StatusFound, fmt.Sprintf("%s/callback?accessToken=%s&refreshToken=%s", sc.Env.FrontendAddress, accessToken, refreshToken))
}
