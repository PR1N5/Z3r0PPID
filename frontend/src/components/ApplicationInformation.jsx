import React from 'react';
import '../css/ApplicationInformation.css';

export default function ApplicationInformation({ onClose }) {
  return (
    <div className="about-modal-overlay">
      <div className="about-modal">
        <h3>About This Application</h3>
        <div className="about-content">
          <p>
            This application serves as a lightweight Command & Control (C2) interface built with React and Wails.
            It enables operators to manage multiple remote agents, monitor active connections, and interact with victims through a secure and organized control panel.
            Core functionalities include open port inspection, interface selection, and command dispatching.
            The system is designed for flexibility and modularity, supporting advanced operations such as custom payload execution and port-level control.
          </p>
          <p>
            Version: <strong>v1.0.0</strong>
          </p>
        </div>

        <div className="about-modal-buttons">
          <button className="about-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}