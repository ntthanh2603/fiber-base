package repositories

import (
	"fiber-base/api/dto"
	"fiber-base/internal/models"

	"github.com/google/uuid"
)

type UserRepositoryInterface interface {
	Create(user *models.User) error
	GetByID(id uuid.UUID) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	GetByUsername(username string) (*models.User, error)
	Update(user *models.User) error
	Delete(id uuid.UUID) error
	GetAll(pagination dto.PaginationQuery) ([]models.User, int64, error)
	ExistsByEmail(email string) (bool, error)
	ExistsByUsername(username string) (bool, error)
}
