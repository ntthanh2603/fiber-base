package handlers

import (
	"fiber-base/api/dto"
	"fiber-base/internal/services"
	"fiber-base/internal/utils"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type UserHandler struct {
	userService *services.UserService
}

func NewUserHandler(userService *services.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

func (h *UserHandler) CreateUser(c *fiber.Ctx) error {
	var req dto.CreateUserRequest
	if err := c.BodyParser(&req); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Invalid request body")
	}

	if err := utils.ValidateStruct(&req); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, err.Error())
	}

	user, err := h.userService.CreateUser(req)
	if err != nil {
		if err.Error() == "email already exists" || err.Error() == "username already exists" {
			return utils.ErrorResponse(c, fiber.StatusConflict, err.Error())
		}
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to create user")
	}

	return utils.SuccessResponse(c, fiber.StatusCreated, "User created successfully", user)
}

func (h *UserHandler) GetUser(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Invalid user ID")
	}

	user, err := h.userService.GetUserByID(id)
	if err != nil {
		if err.Error() == "user not found" {
			return utils.ErrorResponse(c, fiber.StatusNotFound, "User not found")
		}
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to get user")
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "User retrieved successfully", user)
}

func (h *UserHandler) UpdateUser(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Invalid user ID")
	}

	var req dto.UpdateUserRequest
	if err := c.BodyParser(&req); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Invalid request body")
	}

	if err := utils.ValidateStruct(&req); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, err.Error())
	}

	user, err := h.userService.UpdateUser(id, req)
	if err != nil {
		if err.Error() == "user not found" {
			return utils.ErrorResponse(c, fiber.StatusNotFound, "User not found")
		}
		if err.Error() == "email already exists" || err.Error() == "username already exists" {
			return utils.ErrorResponse(c, fiber.StatusConflict, err.Error())
		}
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to update user")
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "User updated successfully", user)
}

func (h *UserHandler) DeleteUser(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Invalid user ID")
	}

	err = h.userService.DeleteUser(id)
	if err != nil {
		if err.Error() == "user not found" {
			return utils.ErrorResponse(c, fiber.StatusNotFound, "User not found")
		}
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to delete user")
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "User deleted successfully", nil)
}

func (h *UserHandler) GetUsers(c *fiber.Ctx) error {
	var pagination dto.PaginationQuery

	pagination.Page, _ = strconv.Atoi(c.Query("page", "1"))
	pagination.PageSize, _ = strconv.Atoi(c.Query("page_size", "10"))
	pagination.Search = c.Query("search", "")
	pagination.SortBy = c.Query("sort_by", "")
	pagination.SortDir = c.Query("sort_dir", "desc")

	if pagination.Page < 1 {
		pagination.Page = 1
	}
	if pagination.PageSize < 1 || pagination.PageSize > 100 {
		pagination.PageSize = 10
	}

	if err := utils.ValidateStruct(&pagination); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, err.Error())
	}

	result, err := h.userService.GetUsers(pagination)
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to get users")
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "Users retrieved successfully", result)
}

func (h *UserHandler) ChangePassword(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Invalid user ID")
	}

	var req dto.ChangePasswordRequest
	if err := c.BodyParser(&req); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, "Invalid request body")
	}

	if err := utils.ValidateStruct(&req); err != nil {
		return utils.ErrorResponse(c, fiber.StatusBadRequest, err.Error())
	}

	err = h.userService.ChangePassword(id, req)
	if err != nil {
		if err.Error() == "user not found" {
			return utils.ErrorResponse(c, fiber.StatusNotFound, "User not found")
		}
		if err.Error() == "current password is incorrect" {
			return utils.ErrorResponse(c, fiber.StatusUnauthorized, "Current password is incorrect")
		}
		return utils.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to change password")
	}

	return utils.SuccessResponse(c, fiber.StatusOK, "Password changed successfully", nil)
}
