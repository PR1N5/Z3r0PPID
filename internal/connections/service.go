package connections

type Service struct {
	manager *Manager
}

func NewService() *Service {
	return &Service{
		manager: NewManager(),
	}
}

func (s *Service) GetAllConnections() []Connection {
	return s.manager.GetConnections()
}
