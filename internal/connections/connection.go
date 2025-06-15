package connections

import "time"

type Connection struct {
	ThreadID     int       `json:"threadId"`
	IP           string    `json:"ip"`
	Username     string    `json:"username"`
	Hostname     string    `json:"hostname"`
	Distribution string    `json:"distribution"`
	ConnectedAt  time.Time `json:"connectedAt"`
	State        string    `json:"state"`
}
