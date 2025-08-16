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
