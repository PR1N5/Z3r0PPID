package connections

import (
	"fmt"
	"net"
	"sync"
	"time"
)

type Manager struct {
	mu          sync.Mutex
	connections []Connection
	nextID      uint64
}

func NewManager() *Manager {
	return &Manager{
		connections: make([]Connection, 0),
		nextID:      1,
	}
}

func (m *Manager) AddConnection(conn net.Conn, ip, username, hostname, distro string) uint64 {
	m.mu.Lock()
	defer m.mu.Unlock()

	newConn := Connection{
		ID:           m.nextID,
		IP:           ip,
		Username:     username,
		Hostname:     hostname,
		Distribution: distro,
		ConnectedAt:  time.Now(),
		State:        "connected",
		Conn:         conn,
	}

	m.connections = append(m.connections, newConn)
	m.nextID++

	return newConn.ID
}

func (m *Manager) GetConnections() []Connection {
	m.mu.Lock()
	defer m.mu.Unlock()

	connsCopy := make([]Connection, len(m.connections))
	copy(connsCopy, m.connections)
	return connsCopy
}

func (m *Manager) SetConnectionState(id uint64, state string) {
	m.mu.Lock()
	defer m.mu.Unlock()

	for i := range m.connections {
		if m.connections[i].ID == id {
			m.connections[i].State = state
			break
		}
	}
}

func (m *Manager) SendCommandToConnection(id uint64, cmd string) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	for i := range m.connections {
		if m.connections[i].ID == id {
			if m.connections[i].Conn != nil {
				_, err := m.connections[i].Conn.Write([]byte(cmd + "\n"))
				return err
			}
			return fmt.Errorf("connection not available")
		}
	}
	return fmt.Errorf("connection with id %d not found", id)
}

func (m *Manager) RemoveConnection(id uint64) {
	m.mu.Lock()
	defer m.mu.Unlock()

	for i, c := range m.connections {
		if c.ID == id {
			if c.Conn != nil {
				c.Conn.Close()
			}
			m.connections = append(m.connections[:i], m.connections[i+1:]...)
			return
		}
	}
}
