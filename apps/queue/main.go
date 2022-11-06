package main

import (
	"fmt"
	"os"

	server "github.com/Ru-kko/queue-request/src"
	"github.com/joho/godotenv"
)

func main() {
	loadCredentials()
	server.New()
}

func loadCredentials() error {
	godotenv.Load()

	if len([]rune(os.Getenv("PORT"))) <= 0 || len([]rune(os.Getenv("DC_SECRET"))) <= 0 || len([]rune(os.Getenv("DC_CLIENT_ID"))) <= 0 || len([]rune(os.Getenv("CLIENT_URL"))) <= 0 || len([]rune(os.Getenv("DC_TOKEN"))) <= 0 {
		return fmt.Errorf("make sure to set the environment variables")
	}

	return nil
}
