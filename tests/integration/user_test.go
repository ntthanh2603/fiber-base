package integration

import (
	"bytes"
	"encoding/json"
	"fiber-base/api/dto"
	"fiber-base/internal/config"
	"fiber-base/internal/initialize"
	"fiber-base/internal/models"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

var (
	testApp *fiber.App
	testDB  *gorm.DB
)

func setupTestApp() {
	cfg := &config.Config{
		ServerPort: "3000",
		DBHost:     "localhost",
		DBPort:     "5432",
		DBUser:     "fiber-base",
		DBPass:     "123456",
		DBName:     "fiber-base-test",
		LogLevel:   "info",
	}

	var err error
	testDB, err = initialize.InitDB(cfg)
	if err != nil {
		panic("Failed to connect to test database: " + err.Error())
	}

	// Auto migrate
	err = testDB.AutoMigrate(&models.User{})
	if err != nil {
		panic("Failed to migrate test database: " + err.Error())
	}

	testApp = initialize.InitRouter(testDB, cfg.LogLevel)
}

func teardownTestApp() {
	// Clean up test data
	testDB.Exec("TRUNCATE TABLE users RESTART IDENTITY CASCADE")
}

func TestMain(m *testing.M) {
	setupTestApp()
	defer teardownTestApp()
	m.Run()
}

func TestCreateUser_Integration(t *testing.T) {
	teardownTestApp() // Clean before test

	req := dto.CreateUserRequest{
		Username:  "testuser",
		Email:     "test@example.com",
		Password:  "password123",
		FirstName: "Test",
		LastName:  "User",
	}

	body, _ := json.Marshal(req)
	request := httptest.NewRequest("POST", "/api/v1/users", bytes.NewReader(body))
	request.Header.Set("Content-Type", "application/json")

	response, _ := testApp.Test(request)

	if response.StatusCode != http.StatusCreated {
		t.Errorf("Expected status %d, got %d", http.StatusCreated, response.StatusCode)
	}

	var result map[string]interface{}
	json.NewDecoder(response.Body).Decode(&result)

	if !result["success"].(bool) {
		t.Error("Expected success to be true")
	}

	data := result["data"].(map[string]interface{})
	if data["username"] != req.Username {
		t.Errorf("Expected username %s, got %s", req.Username, data["username"])
	}
}

func TestCreateUser_DuplicateEmail_Integration(t *testing.T) {
	teardownTestApp() // Clean before test

	req := dto.CreateUserRequest{
		Username: "testuser1",
		Email:    "test@example.com",
		Password: "password123",
	}

	// Create first user
	body, _ := json.Marshal(req)
	request := httptest.NewRequest("POST", "/api/v1/users", bytes.NewReader(body))
	request.Header.Set("Content-Type", "application/json")
	testApp.Test(request)

	// Try to create second user with same email
	req.Username = "testuser2"
	body, _ = json.Marshal(req)
	request = httptest.NewRequest("POST", "/api/v1/users", bytes.NewReader(body))
	request.Header.Set("Content-Type", "application/json")

	response, _ := testApp.Test(request)

	if response.StatusCode != http.StatusConflict {
		t.Errorf("Expected status %d, got %d", http.StatusConflict, response.StatusCode)
	}
}

func TestGetUser_Integration(t *testing.T) {
	teardownTestApp() // Clean before test

	// Create a user first
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}

	body, _ := json.Marshal(req)
	request := httptest.NewRequest("POST", "/api/v1/users", bytes.NewReader(body))
	request.Header.Set("Content-Type", "application/json")

	createResponse, _ := testApp.Test(request)
	var createResult map[string]interface{}
	json.NewDecoder(createResponse.Body).Decode(&createResult)

	data := createResult["data"].(map[string]interface{})
	userID := data["id"].(string)

	// Get the user
	getRequest := httptest.NewRequest("GET", fmt.Sprintf("/api/v1/users/%s", userID), nil)
	getResponse, _ := testApp.Test(getRequest)

	if getResponse.StatusCode != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, getResponse.StatusCode)
	}

	var getResult map[string]interface{}
	json.NewDecoder(getResponse.Body).Decode(&getResult)

	if !getResult["success"].(bool) {
		t.Error("Expected success to be true")
	}

	getData := getResult["data"].(map[string]interface{})
	if getData["username"] != req.Username {
		t.Errorf("Expected username %s, got %s", req.Username, getData["username"])
	}
}

func TestGetUser_NotFound_Integration(t *testing.T) {
	randomID := uuid.New().String()
	request := httptest.NewRequest("GET", fmt.Sprintf("/api/v1/users/%s", randomID), nil)
	response, _ := testApp.Test(request)

	if response.StatusCode != http.StatusNotFound {
		t.Errorf("Expected status %d, got %d", http.StatusNotFound, response.StatusCode)
	}
}

func TestUpdateUser_Integration(t *testing.T) {
	teardownTestApp() // Clean before test

	// Create a user first
	createReq := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}

	body, _ := json.Marshal(createReq)
	request := httptest.NewRequest("POST", "/api/v1/users", bytes.NewReader(body))
	request.Header.Set("Content-Type", "application/json")

	createResponse, _ := testApp.Test(request)
	var createResult map[string]interface{}
	json.NewDecoder(createResponse.Body).Decode(&createResult)

	data := createResult["data"].(map[string]interface{})
	userID := data["id"].(string)

	// Update the user
	updateReq := dto.UpdateUserRequest{
		FirstName: "Updated",
		LastName:  "User",
	}

	body, _ = json.Marshal(updateReq)
	updateRequest := httptest.NewRequest("PUT", fmt.Sprintf("/api/v1/users/%s", userID), bytes.NewReader(body))
	updateRequest.Header.Set("Content-Type", "application/json")

	updateResponse, _ := testApp.Test(updateRequest)

	if updateResponse.StatusCode != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, updateResponse.StatusCode)
	}

	var updateResult map[string]interface{}
	json.NewDecoder(updateResponse.Body).Decode(&updateResult)

	updateData := updateResult["data"].(map[string]interface{})
	if updateData["first_name"] != updateReq.FirstName {
		t.Errorf("Expected first name %s, got %s", updateReq.FirstName, updateData["first_name"])
	}
}

func TestDeleteUser_Integration(t *testing.T) {
	teardownTestApp() // Clean before test

	// Create a user first
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}

	body, _ := json.Marshal(req)
	request := httptest.NewRequest("POST", "/api/v1/users", bytes.NewReader(body))
	request.Header.Set("Content-Type", "application/json")

	createResponse, _ := testApp.Test(request)
	var createResult map[string]interface{}
	json.NewDecoder(createResponse.Body).Decode(&createResult)

	data := createResult["data"].(map[string]interface{})
	userID := data["id"].(string)

	// Delete the user
	deleteRequest := httptest.NewRequest("DELETE", fmt.Sprintf("/api/v1/users/%s", userID), nil)
	deleteResponse, _ := testApp.Test(deleteRequest)

	if deleteResponse.StatusCode != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, deleteResponse.StatusCode)
	}

	// Verify user is deleted
	getRequest := httptest.NewRequest("GET", fmt.Sprintf("/api/v1/users/%s", userID), nil)
	getResponse, _ := testApp.Test(getRequest)

	if getResponse.StatusCode != http.StatusNotFound {
		t.Errorf("Expected status %d for deleted user, got %d", http.StatusNotFound, getResponse.StatusCode)
	}
}

func TestGetUsers_Pagination_Integration(t *testing.T) {
	teardownTestApp() // Clean before test

	// Create multiple users
	for i := 0; i < 15; i++ {
		req := dto.CreateUserRequest{
			Username: fmt.Sprintf("user%d", i),
			Email:    fmt.Sprintf("user%d@example.com", i),
			Password: "password123",
		}

		body, _ := json.Marshal(req)
		request := httptest.NewRequest("POST", "/api/v1/users", bytes.NewReader(body))
		request.Header.Set("Content-Type", "application/json")
		testApp.Test(request)
	}

	// Test pagination
	request := httptest.NewRequest("GET", "/api/v1/users?page=1&page_size=5", nil)
	response, _ := testApp.Test(request)

	if response.StatusCode != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, response.StatusCode)
	}

	var result map[string]interface{}
	json.NewDecoder(response.Body).Decode(&result)

	data := result["data"].(map[string]interface{})
	users := data["data"].([]interface{})

	if len(users) != 5 {
		t.Errorf("Expected 5 users per page, got %d", len(users))
	}

	if int(data["page"].(float64)) != 1 {
		t.Errorf("Expected page 1, got %v", data["page"])
	}

	if int(data["page_size"].(float64)) != 5 {
		t.Errorf("Expected page size 5, got %v", data["page_size"])
	}
}
