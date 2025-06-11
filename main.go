package main

import (
	"embed"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

type Auth struct {
	Username string
	Password string
}

func NewAuth() *Auth {
	err := godotenv.Load()

	if err != nil {
		fmt.Println("Error loading .env:", err)
	}
	fmt.Printf("DEBUG: USERNAME=%q PASSWORD=%q\n", os.Getenv("USERNAME_C2"), os.Getenv("PASSWORD_C2"))
	return &Auth{
		Username: os.Getenv("USERNAME_C2"),
		Password: os.Getenv("PASSWORD_C2"),
	}
}

func (a *Auth) Login(user, pass string) bool {
	return user == a.Username && pass == a.Password
}

func main() {
	auth := NewAuth()

	err := wails.Run(&options.App{
		Title:  "Z3r0PPID",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Bind: []interface{}{
			auth,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
