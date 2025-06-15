import React, { useState } from 'react';
import { openPorts } from '../mockData';
import '../css/InfoOpenPorts.css';
import { ShowPopup } from '../../wailsjs/go/window/API';

export default function InfoOpenPorts({ onClose }) {

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
