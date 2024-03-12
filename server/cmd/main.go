package main

import (
	"time"

	"github.com/gin-gonic/gin"
	route "stontactics/api/route"
	"stontactics/bootstrap"
)

func main() {

	app := bootstrap.App()

	env := app.Env

	db := app.Mongo.Database(env.DBName)
	defer app.CloseDBConnection()

	timeout := time.Duration(env.ContextTimeout) * time.Second

	bootstrap.NewAuth(env)
	server := gin.Default()

	route.Setup(env, timeout, db, server)

	server.Run(":" + env.Port)
}
