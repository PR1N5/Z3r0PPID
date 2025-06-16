package connections

import (
	"net"
	"time"
)

type Connection struct {
	ID           uint64    `json:"ID"`
	IP           string    `json:"ip"`
	Username     string    `json:"username"`
	Hostname     string    `json:"hostname"`
	Distribution string    `json:"distribution"`
	ConnectedAt  time.Time `json:"connectedAt"`
	State        string    `json:"state"`
	Conn         net.Conn
}
