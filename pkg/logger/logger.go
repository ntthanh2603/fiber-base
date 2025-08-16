package logger

import (
	"fiber-base/pkg/setting"
	"os"

	"github.com/natefinch/lumberjack"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type LoggerZap struct {
	*zap.Logger
}

func NewLogger(config setting.LoggerSetting) *LoggerZap {
	logLevel := "debug"
	var level zapcore.Level
	switch logLevel {
	case "debug":
		level = zap.DebugLevel
	case "info":
		level = zap.InfoLevel
	case "warn":
		level = zap.WarnLevel
	case "error":
		level = zap.ErrorLevel
	default:
		level = zap.InfoLevel
	}
	encoder := getEncoderLog()
	hook := lumberjack.Logger{
		Filename:   config.File_log_name, // path to your file
		MaxSize:    config.Max_age,       // megabytes
		MaxBackups: config.Max_backups,   // keep at most 5 old log files
		MaxAge:     config.Max_age,       // days
		Compress:   config.Compress,      // disable by default
	}
	core := zapcore.NewCore(
		encoder,
		zapcore.NewMultiWriteSyncer(zapcore.AddSync(os.Stdout), zapcore.AddSync(&hook)),
		level,
	)
	return &LoggerZap{zap.New(core, zap.AddCaller(), zap.AddStacktrace(zap.ErrorLevel))}
}

// Format log
func getEncoderLog() zapcore.Encoder {
	encodeConfig := zap.NewProductionEncoderConfig()

	// 1743239546.6298692 -> 2025-03-29T16:12:26.629+0700
	encodeConfig.EncodeTime = zapcore.ISO8601TimeEncoder

	// ts -> Time
	encodeConfig.TimeKey = "time"

	// From info INFO
	encodeConfig.EncodeLevel = zapcore.CapitalLevelEncoder

	// "caller":"cli/main.log.go:20"
	encodeConfig.EncodeCaller = zapcore.ShortCallerEncoder

	return zapcore.NewConsoleEncoder(encodeConfig)
}
