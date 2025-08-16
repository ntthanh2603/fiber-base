package utils

import "github.com/gofiber/fiber/v2"

// SuccessResponseModel represents a successful API response
type SuccessResponseModel struct {
	Success bool        `json:"success" example:"true"`
	Message string      `json:"message" example:"Operation completed successfully"`
	Data    interface{} `json:"data,omitempty"`
}

// ErrorResponseModel represents an error API response
type ErrorResponseModel struct {
	Success bool   `json:"success" example:"false"`
	Message string `json:"message" example:"Error"`
	Error   string `json:"error" example:"Error description"`
}

// Response is the generic response structure (deprecated, use SuccessResponse or ErrorResponse)
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

func SuccessResponse(c *fiber.Ctx, status int, message string, data interface{}) error {
	return c.Status(status).JSON(Response{
		Success: true,
		Message: message,
		Data:    data,
	})
}

func ErrorResponse(c *fiber.Ctx, status int, message string) error {
	return c.Status(status).JSON(Response{
		Success: false,
		Message: "Error",
		Error:   message,
	})
}
