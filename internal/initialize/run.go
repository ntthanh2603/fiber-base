package initialize

import (
	"fiber-base/internal/config"
	"log"

	"github.com/gofiber/fiber/v2"
)

func Run() (*fiber.App, string) {
	// 1> Read config -> environment variables
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Could not load config: %v", err)
	}
	// 2> Initialize database connection
	db, err := InitDB(cfg)
	if err != nil {
		log.Fatalf("Could not initialize database: %v", err)
	}
	// 3> Initialize router
	r := InitRouter(db, cfg.LogLevel)

	// 4> Initialize other services if needed (e.g., cache, message queue, etc.)
	return r, cfg.ServerPort
}
