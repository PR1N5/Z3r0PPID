import React from 'react';
import '../css/CloseAllPorts.css';

export default function CloseAllPorts({ onConfirm, onCancel }) {
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h3>Are you sure you want to close all active ports?</h3>
        <div className="confirm-modal-buttons">
          <button className="info-button-port" onClick={onConfirm}>
            Yes
          </button>
          <button className="info-button-port" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}