package network

import (
	"fmt"
	"net"
)

type Service struct{}

func NewService() *Service {
	return &Service{}
}

func (s *Service) NetworkInterfaces() ([]string, error) {
	var result []string

	ifaces, err := net.Interfaces()
	if err != nil {
		return nil, err
	}

	for _, iface := range ifaces {
		if iface.Flags&net.FlagUp == 0 {
			continue
		}

		addrs, err := iface.Addrs()
		if err != nil {
			continue
		}

		for _, addr := range addrs {
			var ip net.IP

			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}

			if ip == nil || ip.To4() == nil {
				continue
			}

			entry := fmt.Sprintf("%s (%s)", ip.String(), iface.Name)
			result = append(result, entry)
		}
	}

	return result, nil
}
