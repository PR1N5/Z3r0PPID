import React, { useState, useEffect } from 'react';
import '../css/InfoOpenPorts.css';
import { ShowPopup } from '../../wailsjs/go/window/API';
import { ListListeners } from '../../wailsjs/go/listener/Service';

export default function InfoOpenPorts({ onClose }) {
  const [openPorts, setOpenPorts] = useState([]);

  useEffect(() => {
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
    fetchListeners();
  }, []);

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
                      onClick={() => ShowPopup("TEST", "THIS IS A TEST BUTTON " + index)}
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
