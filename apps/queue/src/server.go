package server

import (
	"os"

	route "github.com/Ru-kko/queue-request/src/routes"
	"github.com/gofiber/fiber/v2"
)

var app *fiber.App

func New() {
	app = fiber.New()

	dc_router := app.Group("/dc")
	route.DiscordRouter(dc_router)

	port := os.Getenv("PORT")

	app.Listen(":" + port)

}
