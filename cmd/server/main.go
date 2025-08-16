// Package main
// @title Fiber Base API
// @version 1.0
// @description This is a sample server for Fiber Base API
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:3000
// @BasePath /api/v1
// @schemes http https
package main

import (
	"fiber-base/internal/initialize"
	"fmt"
	"log"
)

func main() {
	app, port := initialize.Run()

	app.Static("/", "./web/static")

	log.Printf("Server starting on port %s", port)
	log.Fatal(app.Listen(fmt.Sprintf(":%s", port)))
}
