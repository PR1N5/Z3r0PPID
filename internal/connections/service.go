package connections

type Service struct {
	manager *Manager
}

func NewService() *Service {
	return &Service{
		manager: NewManager(),
	}
}

// GetAllConnections exposes getting all connections to frontend
func (s *Service) GetAllConnections() []Connection {
	return s.manager.GetConnections()
}
