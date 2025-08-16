package utils

import (
	"fiber-base/api/dto"
	"fiber-base/internal/utils"
	"testing"
)

func TestValidateStruct_ValidCreateUserRequest(t *testing.T) {
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}

	err := utils.ValidateStruct(&req)
	if err != nil {
		t.Errorf("Expected no validation error, got %v", err)
	}
}

func TestValidateStruct_InvalidEmail(t *testing.T) {
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "invalid-email",
		Password: "password123",
	}

	err := utils.ValidateStruct(&req)
	if err == nil {
		t.Error("Expected validation error for invalid email, got nil")
	}

	if err != nil && err.Error() != "email must be a valid email address" {
		t.Errorf("Expected email validation error, got %v", err)
	}
}

func TestValidateStruct_MissingRequiredFields(t *testing.T) {
	req := dto.CreateUserRequest{
		Email: "test@example.com",
	}

	err := utils.ValidateStruct(&req)
	if err == nil {
		t.Error("Expected validation error for missing required fields, got nil")
	}
}

func TestValidateStruct_ShortPassword(t *testing.T) {
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "123",
	}

	err := utils.ValidateStruct(&req)
	if err == nil {
		t.Error("Expected validation error for short password, got nil")
	}
}

func TestValidateStruct_ShortUsername(t *testing.T) {
	req := dto.CreateUserRequest{
		Username: "ab",
		Email:    "test@example.com",
		Password: "password123",
	}

	err := utils.ValidateStruct(&req)
	if err == nil {
		t.Error("Expected validation error for short username, got nil")
	}
}

func TestValidateStruct_ValidUpdateUserRequest(t *testing.T) {
	req := dto.UpdateUserRequest{
		Email:     "newemail@example.com",
		FirstName: "John",
	}

	err := utils.ValidateStruct(&req)
	if err != nil {
		t.Errorf("Expected no validation error, got %v", err)
	}
}

func TestValidateStruct_InvalidURLAvatar(t *testing.T) {
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
		Avatar:   "not-a-url",
	}

	err := utils.ValidateStruct(&req)
	if err == nil {
		t.Error("Expected validation error for invalid URL, got nil")
	}
}
