package auth

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Auth struct {
	Username string
	Password string
}

func NewAuth() *Auth {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env:", err)
	}

	return &Auth{
		Username: os.Getenv("USERNAME_C2"),
		Password: os.Getenv("PASSWORD_C2"),
	}
}

func (a *Auth) Login(user, pass string) bool {
	return user == a.Username && pass == a.Password
}
