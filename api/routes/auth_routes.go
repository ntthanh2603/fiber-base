package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func AuthRoutes(routes fiber.Router, db *gorm.DB) {
	authRoutes := routes.Group("/auth")
	
	// @Summary Health check for auth service
	// @Description Returns a simple greeting message for auth service
	// @Tags auth
	// @Accept json
	// @Produce plain
	// @Success 200 {string} string "Hello, Auth!"
	// @Router /auth [get]
	authRoutes.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Auth!")
	})
}
