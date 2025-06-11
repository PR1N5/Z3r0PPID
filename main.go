package main

import (
	"embed"

	"c2-malware/internal/auth"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	auth := auth.NewAuth()

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
