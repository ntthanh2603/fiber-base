package services

import (
	"fiber-base/api/dto"
	"fiber-base/internal/models"
	"fiber-base/internal/services"
	"testing"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// MockUserRepository is a mock implementation of UserRepositoryInterface
type MockUserRepository struct {
	users           map[uuid.UUID]*models.User
	usersByEmail    map[string]*models.User
	usersByUsername map[string]*models.User
}

func NewMockUserRepository() *MockUserRepository {
	return &MockUserRepository{
		users:           make(map[uuid.UUID]*models.User),
		usersByEmail:    make(map[string]*models.User),
		usersByUsername: make(map[string]*models.User),
	}
}

func (m *MockUserRepository) Create(user *models.User) error {
	if user.ID == uuid.Nil {
		user.ID = uuid.New()
	}
	m.users[user.ID] = user
	m.usersByEmail[user.Email] = user
	m.usersByUsername[user.Username] = user
	return nil
}

func (m *MockUserRepository) GetByID(id uuid.UUID) (*models.User, error) {
	user, exists := m.users[id]
	if !exists {
		return nil, gorm.ErrRecordNotFound
	}
	return user, nil
}

func (m *MockUserRepository) GetByEmail(email string) (*models.User, error) {
	user, exists := m.usersByEmail[email]
	if !exists {
		return nil, gorm.ErrRecordNotFound
	}
	return user, nil
}

func (m *MockUserRepository) GetByUsername(username string) (*models.User, error) {
	user, exists := m.usersByUsername[username]
	if !exists {
		return nil, gorm.ErrRecordNotFound
	}
	return user, nil
}

func (m *MockUserRepository) Update(user *models.User) error {
	if _, exists := m.users[user.ID]; !exists {
		return gorm.ErrRecordNotFound
	}
	m.users[user.ID] = user
	m.usersByEmail[user.Email] = user
	m.usersByUsername[user.Username] = user
	return nil
}

func (m *MockUserRepository) Delete(id uuid.UUID) error {
	user, exists := m.users[id]
	if !exists {
		return gorm.ErrRecordNotFound
	}
	delete(m.users, id)
	delete(m.usersByEmail, user.Email)
	delete(m.usersByUsername, user.Username)
	return nil
}

func (m *MockUserRepository) GetAll(pagination dto.PaginationQuery) ([]models.User, int64, error) {
	users := make([]models.User, 0, len(m.users))
	for _, user := range m.users {
		users = append(users, *user)
	}
	return users, int64(len(users)), nil
}

func (m *MockUserRepository) ExistsByEmail(email string) (bool, error) {
	_, exists := m.usersByEmail[email]
	return exists, nil
}

func (m *MockUserRepository) ExistsByUsername(username string) (bool, error) {
	_, exists := m.usersByUsername[username]
	return exists, nil
}

func TestCreateUser_Success(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}

	response, err := service.CreateUser(req)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if response == nil {
		t.Error("Expected user response, got nil")
	}

	if response.Username != req.Username {
		t.Errorf("Expected username %s, got %s", req.Username, response.Username)
	}

	if response.Email != req.Email {
		t.Errorf("Expected email %s, got %s", req.Email, response.Email)
	}
}

func TestCreateUser_EmailExists(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	// Create first user
	req1 := dto.CreateUserRequest{
		Username: "testuser1",
		Email:    "test@example.com",
		Password: "password123",
	}
	_, err := service.CreateUser(req1)
	if err != nil {
		t.Fatalf("Failed to create first user: %v", err)
	}

	// Try to create second user with same email
	req2 := dto.CreateUserRequest{
		Username: "testuser2",
		Email:    "test@example.com",
		Password: "password123",
	}

	_, err = service.CreateUser(req2)
	if err == nil {
		t.Error("Expected error for duplicate email, got nil")
	}

	if err.Error() != "email already exists" {
		t.Errorf("Expected 'email already exists' error, got %v", err)
	}
}

func TestCreateUser_UsernameExists(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	// Create first user
	req1 := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test1@example.com",
		Password: "password123",
	}
	_, err := service.CreateUser(req1)
	if err != nil {
		t.Fatalf("Failed to create first user: %v", err)
	}

	// Try to create second user with same username
	req2 := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test2@example.com",
		Password: "password123",
	}

	_, err = service.CreateUser(req2)
	if err == nil {
		t.Error("Expected error for duplicate username, got nil")
	}

	if err.Error() != "username already exists" {
		t.Errorf("Expected 'username already exists' error, got %v", err)
	}
}

func TestGetUserByID_Success(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	// Create a user first
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}
	createdUser, err := service.CreateUser(req)
	if err != nil {
		t.Fatalf("Failed to create user: %v", err)
	}

	// Get the user by ID
	foundUser, err := service.GetUserByID(createdUser.ID)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if foundUser.ID != createdUser.ID {
		t.Errorf("Expected user ID %s, got %s", createdUser.ID, foundUser.ID)
	}
}

func TestGetUserByID_NotFound(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	randomID := uuid.New()
	_, err := service.GetUserByID(randomID)
	if err == nil {
		t.Error("Expected error for non-existent user, got nil")
	}

	if err.Error() != "user not found" {
		t.Errorf("Expected 'user not found' error, got %v", err)
	}
}

func TestUpdateUser_Success(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	// Create a user first
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}
	createdUser, err := service.CreateUser(req)
	if err != nil {
		t.Fatalf("Failed to create user: %v", err)
	}

	// Update the user
	updateReq := dto.UpdateUserRequest{
		FirstName: "John",
		LastName:  "Doe",
	}

	updatedUser, err := service.UpdateUser(createdUser.ID, updateReq)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	if updatedUser.FirstName != updateReq.FirstName {
		t.Errorf("Expected first name %s, got %s", updateReq.FirstName, updatedUser.FirstName)
	}

	if updatedUser.LastName != updateReq.LastName {
		t.Errorf("Expected last name %s, got %s", updateReq.LastName, updatedUser.LastName)
	}
}

func TestDeleteUser_Success(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	// Create a user first
	req := dto.CreateUserRequest{
		Username: "testuser",
		Email:    "test@example.com",
		Password: "password123",
	}
	createdUser, err := service.CreateUser(req)
	if err != nil {
		t.Fatalf("Failed to create user: %v", err)
	}

	// Delete the user
	err = service.DeleteUser(createdUser.ID)
	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}

	// Verify user is deleted
	_, err = service.GetUserByID(createdUser.ID)
	if err == nil {
		t.Error("Expected error for deleted user, got nil")
	}
}

func TestDeleteUser_NotFound(t *testing.T) {
	mockRepo := NewMockUserRepository()
	service := services.NewUserService(mockRepo)

	randomID := uuid.New()
	err := service.DeleteUser(randomID)
	if err == nil {
		t.Error("Expected error for non-existent user, got nil")
	}

	if err.Error() != "user not found" {
		t.Errorf("Expected 'user not found' error, got %v", err)
	}
}
