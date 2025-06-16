package listener

import (
	"c2-malware/internal/connections"
	"fmt"
	"net"
	"sync"
)

type Service struct {
	mu                 sync.Mutex
	listeners          map[string]net.Listener
	connManager        *connections.Manager
	connManagerService *connections.Service
}

func NewService(connMgr *connections.Manager, connMgrService *connections.Service) *Service {
	return &Service{
		listeners:          make(map[string]net.Listener),
		connManager:        connMgr,
		connManagerService: connMgrService,
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
				fmt.Println("Listener accept error:", err)
				return
			}

			s.handleConnection(conn)
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
	s.connManagerService.HandleConnection(conn)
}

func (s *Service) CloseListener(ip, port string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	addr := net.JoinHostPort(ip, port)

	listener, exists := s.listeners[addr]
	if !exists {
		return fmt.Errorf("no listener exists on %s", addr)
	}

	err := listener.Close()
	if err != nil {
		return fmt.Errorf("error closing listener on %s: %v", addr, err)
	}

	delete(s.listeners, addr)
	fmt.Printf("Closed listener on %s\n", addr)
	return nil
}

func (s *Service) CloseAllListeners() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	for addr, listener := range s.listeners {
		err := listener.Close()
		if err != nil {
			fmt.Printf("Error closing listener on %s: %v\n", addr, err)
			continue
		}
		fmt.Printf("Closed listener on %s\n", addr)
		delete(s.listeners, addr)
	}

	return nil
}
