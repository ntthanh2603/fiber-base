package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Logger(logLevel string) fiber.Handler {
	config := logger.Config{
		Format: "[${time}] ${status} - ${method} ${path} ${latency}\n",
		Output: os.Stdout,
	}

	if logLevel == "debug" {
		config.Format = "[${time}] ${status} - ${method} ${path} ${latency} | ${ip} | ${ua}\n"
	}

	return logger.New(config)
}
