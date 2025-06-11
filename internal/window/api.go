// window/api.go
package window

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type API struct {
	ctx context.Context
}

func NewAPI() *API {
	return &API{}
}

func (a *API) Startup(ctx context.Context) {
	println("[DEBUG] Startup ejecutado para window.API")
	a.ctx = ctx
}

func (a *API) SetWindowTitle(title string) {
	if a.ctx == nil {
		println("[ERROR] ctx is nil! Cannot set title")
		return
	}
	println("[DEBUG] SetWindowTitle llamado con:", title)
	runtime.WindowSetTitle(a.ctx, title)
}
