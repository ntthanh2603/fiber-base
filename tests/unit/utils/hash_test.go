package utils

import (
	"fiber-base/internal/utils"
	"testing"
)

func TestHashPassword(t *testing.T) {
	password := "testpassword123"
	hashedPassword, err := utils.HashPassword(password)

	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if hashedPassword == "" {
		t.Error("Expected hashed password, got empty string")
	}

	if hashedPassword == password {
		t.Error("Expected hashed password to be different from original password")
	}
}

func TestCheckPasswordHash(t *testing.T) {
	password := "testpassword123"
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		t.Fatalf("Failed to hash password: %v", err)
	}

	// Test correct password
	isValid := utils.CheckPasswordHash(password, hashedPassword)
	if !isValid {
		t.Error("Expected password to be valid, got false")
	}

	// Test incorrect password
	isInvalid := utils.CheckPasswordHash("wrongpassword", hashedPassword)
	if isInvalid {
		t.Error("Expected password to be invalid, got true")
	}
}

func TestCheckPasswordHashWithEmptyPassword(t *testing.T) {
	hashedPassword, err := utils.HashPassword("testpassword")
	if err != nil {
		t.Fatalf("Failed to hash password: %v", err)
	}

	isValid := utils.CheckPasswordHash("", hashedPassword)
	if isValid {
		t.Error("Expected empty password to be invalid, got true")
	}
}

func TestCheckPasswordHashWithEmptyHash(t *testing.T) {
	isValid := utils.CheckPasswordHash("testpassword", "")
	if isValid {
		t.Error("Expected empty hash to be invalid, got true")
	}
}
