package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Routes(app *fiber.App, db *gorm.DB) {
	api := app.Group("/api/v1")
	UserRoutes(api, db)
	AuthRoutes(api, db)
}
