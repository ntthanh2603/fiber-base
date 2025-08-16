package initialize

import (
	"fiber-base/api/routes"
	"fiber-base/internal/middleware"
	"fiber-base/internal/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func InitRouter(db *gorm.DB, logLevel string) *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{
				"success": false,
				"message": "Error",
				"error":   err.Error(),
			})
		},
	})

	app.Use(middleware.CORS())
	app.Use(middleware.Logger(logLevel))
	app.Use(middleware.RateLimit())

	err := db.AutoMigrate(&models.User{})
	if err != nil {
		panic("Failed to migrate database: " + err.Error())
	}

	api := app.Group("/api/v1")

	routes.UserRoutes(api, db)
	routes.AuthRoutes(api, db)

	return app
}
