package middleware

import (
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func CORS() fiber.Handler {
	// Get allowed origins from environment variable or use default
	allowedOrigins := os.Getenv("CORS_ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		// Default origins for development
		allowedOrigins = "http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:3001,https://localhost:3000,https://localhost:3001"
	}

	// Check if we want to allow all origins (for development only)
	allowAllOrigins := os.Getenv("CORS_ALLOW_ALL") == "true"
	
	config := cors.Config{
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept,Authorization,X-Requested-With,X-CSRF-Token",
	}

	if allowAllOrigins {
		// Allow all origins without credentials (less secure, for development)
		config.AllowOrigins = "*"
		config.AllowCredentials = false
	} else {
		// Use specific origins with credentials (more secure, for production)
		config.AllowOrigins = allowedOrigins
		config.AllowCredentials = true
		
		// Dynamic origin checking function for better flexibility
		config.AllowOriginsFunc = func(origin string) bool {
			origins := strings.Split(allowedOrigins, ",")
			for _, allowedOrigin := range origins {
				if strings.TrimSpace(allowedOrigin) == origin {
					return true
				}
			}
			return false
		}
	}

	return cors.New(config)
}
