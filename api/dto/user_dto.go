package dto

import "github.com/google/uuid"

type CreateUserRequest struct {
	Username  string `json:"username" validate:"required,min=3,max=50" example:"john_doe"`
	Email     string `json:"email" validate:"required,email" example:"john.doe@example.com"`
	Password  string `json:"password" validate:"required,min=6" example:"password123"`
	FirstName string `json:"first_name" validate:"max=50" example:"John"`
	LastName  string `json:"last_name" validate:"max=50" example:"Doe"`
	Phone     string `json:"phone" validate:"max=20" example:"+1234567890"`
	Avatar    string `json:"avatar" validate:"omitempty,url" example:"https://example.com/avatar.jpg"`
}

type UpdateUserRequest struct {
	Username  string `json:"username" validate:"omitempty,min=3,max=50" example:"john_doe_updated"`
	Email     string `json:"email" validate:"omitempty,email" example:"john.updated@example.com"`
	FirstName string `json:"first_name" validate:"max=50" example:"John"`
	LastName  string `json:"last_name" validate:"max=50" example:"Doe"`
	Phone     string `json:"phone" validate:"max=20" example:"+1234567890"`
	Avatar    string `json:"avatar" validate:"omitempty,url" example:"https://example.com/new-avatar.jpg"`
	IsActive  *bool  `json:"is_active" example:"true"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id" example:"123e4567-e89b-12d3-a456-426614174000"`
	Username  string    `json:"username" example:"john_doe"`
	Email     string    `json:"email" example:"john.doe@example.com"`
	FirstName string    `json:"first_name" example:"John"`
	LastName  string    `json:"last_name" example:"Doe"`
	Phone     string    `json:"phone" example:"+1234567890"`
	Avatar    string    `json:"avatar" example:"https://example.com/avatar.jpg"`
	IsActive  bool      `json:"is_active" example:"true"`
	CreatedAt string    `json:"created_at" example:"2023-01-01T00:00:00Z"`
	UpdatedAt string    `json:"updated_at" example:"2023-01-01T00:00:00Z"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password" validate:"required" example:"currentpassword123"`
	NewPassword     string `json:"new_password" validate:"required,min=6" example:"newpassword123"`
}

type PaginationQuery struct {
	Page     int    `query:"page" validate:"min=1" example:"1"`
	PageSize int    `query:"page_size" validate:"min=1,max=100" example:"10"`
	Search   string `query:"search" example:"john"`
	SortBy   string `query:"sort_by" example:"created_at"`
	SortDir  string `query:"sort_dir" validate:"oneof=asc desc" example:"desc"`
}

type PaginatedResponse struct {
	Data       interface{} `json:"data"`
	Page       int         `json:"page" example:"1"`
	PageSize   int         `json:"page_size" example:"10"`
	Total      int64       `json:"total" example:"100"`
	TotalPages int         `json:"total_pages" example:"10"`
}
