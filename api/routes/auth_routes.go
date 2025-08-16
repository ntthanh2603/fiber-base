package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func AuthRoutes(routes fiber.Router, db *gorm.DB) {
	authRoutes := routes.Group("/auth")
	authRoutes.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Auth!")
	})
}
