package connections

import (
	"sync"
	"time"
)

type Manager struct {
	mu          sync.Mutex
	connections []Connection
	nextThread  int
}

func NewManager() *Manager {
	return &Manager{
		connections: make([]Connection, 0),
		nextThread:  1,
	}
}

func (m *Manager) AddConnection(ip, username, hostname, distro string) {
	m.mu.Lock()
	defer m.mu.Unlock()

	conn := Connection{
		ThreadID:     m.nextThread,
		IP:           ip,
		Username:     username,
		Hostname:     hostname,
		Distribution: distro,
		ConnectedAt:  time.Now(),
		State:        "connected", //TO-DO: change this
	}

	m.connections = append(m.connections, conn)
	m.nextThread++
}

func (m *Manager) GetConnections() []Connection {
	m.mu.Lock()
	defer m.mu.Unlock()

	return m.connections
}
