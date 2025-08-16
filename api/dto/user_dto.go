package dto

import "github.com/google/uuid"

type CreateUserRequest struct {
	Username  string `json:"username" validate:"required,min=3,max=50"`
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=6"`
	FirstName string `json:"first_name" validate:"max=50"`
	LastName  string `json:"last_name" validate:"max=50"`
	Phone     string `json:"phone" validate:"max=20"`
	Avatar    string `json:"avatar" validate:"omitempty,url"`
}

type UpdateUserRequest struct {
	Username  string `json:"username" validate:"omitempty,min=3,max=50"`
	Email     string `json:"email" validate:"omitempty,email"`
	FirstName string `json:"first_name" validate:"max=50"`
	LastName  string `json:"last_name" validate:"max=50"`
	Phone     string `json:"phone" validate:"max=20"`
	Avatar    string `json:"avatar" validate:"omitempty,url"`
	IsActive  *bool  `json:"is_active"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Phone     string    `json:"phone"`
	Avatar    string    `json:"avatar"`
	IsActive  bool      `json:"is_active"`
	CreatedAt string    `json:"created_at"`
	UpdatedAt string    `json:"updated_at"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password" validate:"required"`
	NewPassword     string `json:"new_password" validate:"required,min=6"`
}

type PaginationQuery struct {
	Page     int    `query:"page" validate:"min=1"`
	PageSize int    `query:"page_size" validate:"min=1,max=100"`
	Search   string `query:"search"`
	SortBy   string `query:"sort_by"`
	SortDir  string `query:"sort_dir" validate:"oneof=asc desc"`
}

type PaginatedResponse struct {
	Data       interface{} `json:"data"`
	Page       int         `json:"page"`
	PageSize   int         `json:"page_size"`
	Total      int64       `json:"total"`
	TotalPages int         `json:"total_pages"`
}
