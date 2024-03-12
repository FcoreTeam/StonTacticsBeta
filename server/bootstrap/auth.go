package bootstrap

import (
	"fmt"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

const (
	maxAge = 86400 * 30
)

func NewAuth(env *Env) {
	store := sessions.NewCookieStore([]byte(env.AccessTokenSecret))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = env.AppEnv == "production"

	gothic.Store = store

	goth.UseProviders(
		google.New(env.GoogleClientID, env.GoogleClientSecret, fmt.Sprintf("%s/auth/google/callback", env.ServerAddress), "openid profile email"),
	)
}
