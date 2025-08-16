package config

import (
	"fmt"
	"strconv"

	"github.com/spf13/viper"
)

type Config struct {
	ServerPort string
	DBHost     string
	DBPort     string
	DBUser     string
	DBPass     string
	DBName     string
	LogLevel   string
}

func LoadConfig() (*Config, error) {
	viper := viper.New()
	viper.AddConfigPath("./config")
	viper.SetConfigName("local")
	viper.SetConfigType("yaml")

	err := viper.ReadInConfig()
	if err != nil {
		return nil, fmt.Errorf("fatal error config file: %w", err)
	}

	config := &Config{
		ServerPort: strconv.Itoa(viper.GetInt("server.port")),
		DBHost:     viper.GetString("postgresql.host"),
		DBPort:     viper.GetString("postgresql.port"),
		DBUser:     viper.GetString("postgresql.username"),
		DBPass:     viper.GetString("postgresql.password"),
		DBName:     viper.GetString("postgresql.dbname"),
		LogLevel:   viper.GetString("logger.log_level"),
	}

	return config, nil
}
