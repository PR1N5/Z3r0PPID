package main

import (
	"context"
	"embed"

	"c2-malware/internal/auth"
	"c2-malware/internal/connections"
	"c2-malware/internal/listener"
	"c2-malware/internal/network"
	"c2-malware/internal/window"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	auth := auth.NewAuth()
	windowAPI := window.NewAPI()
	connectionService := connections.NewManager()
	listenerService := listener.NewService(connectionService)
	networkService := network.NewService()

	err := wails.Run(&options.App{
		Title:  "",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: func(ctx context.Context) {
			windowAPI.Startup(ctx)
		},
		Bind: []interface{}{
			auth,
			windowAPI,
			connectionService,
			listenerService,
			networkService,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
