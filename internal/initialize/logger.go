package initialize

import (
	"fiber-base/global"
	"fiber-base/pkg/logger"
)

func InitLogger() {
	global.Logger = logger.NewLogger(global.Config.Logger)
}
