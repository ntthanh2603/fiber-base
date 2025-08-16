package global

import (
	"fiber-base/pkg/logger"
	"fiber-base/pkg/setting"

	"gorm.io/gorm"
)

var (
	Config setting.Config
	Logger *logger.LoggerZap
	Mdb    *gorm.DB
)
