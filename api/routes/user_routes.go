package routes

import (
	"fiber-base/internal/handlers"
	"fiber-base/internal/repositories"
	"fiber-base/internal/services"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func UserRoutes(routes fiber.Router, db *gorm.DB) {
	userRepo := repositories.NewUserRepository(db)
	userService := services.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	userRoutes := routes.Group("/users")

	userRoutes.Post("/", userHandler.CreateUser)
	userRoutes.Get("/", userHandler.GetUsers)
	userRoutes.Get("/:id", userHandler.GetUser)
	userRoutes.Put("/:id", userHandler.UpdateUser)
	userRoutes.Delete("/:id", userHandler.DeleteUser)
	userRoutes.Put("/:id/password", userHandler.ChangePassword)
}
