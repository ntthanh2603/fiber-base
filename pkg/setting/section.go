package setting

type Config struct {
	Server     ServerSetting     `mapstructure:"server"`
	PostgreSQL POSTGRESQLSetting `mapstructure:"postgresql"`
	Logger     LoggerSetting     `mapstructure:"logger"`
}

type ServerSetting struct {
	Port int `mapstructure:"port"`
}

type POSTGRESQLSetting struct {
	Host     string `mapstructure:"host"`
	Port     string `mapstructure:"port"`
	User     string `mapstructure:"username"`
	Password string `mapstructure:"password"`
	DBName   string `mapstructure:"dbname"`
}

type LoggerSetting struct {
	Log_level     string `mapstructure:"log_level"`
	File_log_name string `mapstructure:"file_log_name"`
	Max_size      int    `mapstructure:"max_size"`
	Max_backups   int    `mapstructure:"max_backups"`
	Max_age       int    `mapstructure:"max_age"`
	Compress      bool   `mapstructure:"compress"`
}
