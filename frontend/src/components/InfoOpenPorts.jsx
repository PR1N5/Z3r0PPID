import React, { useState, useEffect } from 'react';
import '../css/InfoOpenPorts.css';
import { ShowPopup } from '../../wailsjs/go/window/API';
import { ListListeners, CloseListener } from '../../wailsjs/go/listener/Service';

export default function InfoOpenPorts({ onClose }) {
  const [openPorts, setOpenPorts] = useState([]);

  async function fetchListeners() {
    try {
      const listeners = await ListListeners();
      const ports = listeners.map(item => {
        const [iface, port] = item.split(':');
        return { iface, port };
      });
      setOpenPorts(ports);
    } catch (err) {
      ShowPopup("Error", "Failed to fetch listeners: " + err.message);
    }
  }

  useEffect(() => {
    fetchListeners();
  }, []);

  const handleClosePort = async (iface, port) => {
    try {
      await CloseListener(iface, port);
      await fetchListeners();
    } catch (err) {
      ShowPopup("Error", `Failed to close listener on ${iface}:${port} - ${err.message}`);
    }
  };

  return (
    <div className="info-modal-overlay">
      <div className="info-modal">
        <h3>Open ports:</h3>

        <div className="info-table-container">
          <table className="info-open-ports-table">
            <thead>
              <tr>
                <th>Interface</th>
                <th>Port</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {openPorts.map((port, index) => (
                <tr key={index}>
                  <td>{port.iface}</td>
                  <td>{port.port}</td>
                  <td>
                    <button
                      className="info-button-port"
                      onClick={() => handleClosePort(port.iface, port.port)}
                    >
                      Close
                    </button>
                  </td>
                </tr>
              ))}
              {openPorts.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No open ports</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="info-modal-buttons">
          <button className="info-button-port" onClick={onClose}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
