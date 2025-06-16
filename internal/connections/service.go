package connections

import (
	"bufio"
	"context"
	"fmt"
	"net"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Service struct {
	manager *Manager
	ctx     context.Context
}

func (s *Service) Startup(ctx context.Context) {
	s.ctx = ctx
}

func NewService(m *Manager) *Service {
	return &Service{
		manager: m,
	}
}

func (s *Service) GetAllConnections() []Connection {
	return s.manager.GetConnections()
}

func (s *Service) SendCommand(id uint64, cmd string) error {
	err := s.manager.SendCommandToConnection(id, cmd)
	if err != nil {
		return err
	}
	return nil
}

func (s *Service) handleConnectionLoop(ctx context.Context, id uint64, conn net.Conn) {
	reader := bufio.NewReader(conn)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			fmt.Println("Connection closed or error:", err)
			s.manager.RemoveConnection(id)
			return
		}
		output := strings.TrimSpace(line)
		fmt.Println("Received from", id, ":", output)
		fmt.Printf("RAW data from connection %d: %q\n", id, line)
		runtime.EventsEmit(ctx, "commandOutput", id, output)
	}

}

func (s *Service) HandleConnection(conn net.Conn) {
	fmt.Println("New connection from", conn.RemoteAddr())

	id := s.manager.AddConnection(
		conn,
		conn.RemoteAddr().String(),
		"unknown",
		"unknown-host",
		"unknown",
	)

	go s.handleConnectionLoop(s.ctx, id, conn)
}
