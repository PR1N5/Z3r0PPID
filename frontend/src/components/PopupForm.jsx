import React, { useState } from 'react';
import { networkInterfaces } from '../mockData';
import '../css/PopupForm.css';

export default function PopupForm({ onClose, onSubmit }) {
  const [selectedInterface, setSelectedInterface] = useState(networkInterfaces[0]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    onSubmit({ iface: selectedInterface, value: inputValue });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Open a new port</h3>

        {/* TO-DO: Change this for real data */}
        <label htmlFor="iface-select">Interface:</label>
        <select
          id="iface-select"
          value={selectedInterface}
          onChange={e => setSelectedInterface(e.target.value)}
        >
          {networkInterfaces.map((iface, idx) => (
            <option key={idx} value={iface}>
              {iface}
            </option>
          ))}
        </select>

        <input
          id="input-text"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Port..."
        />

        <div className="modal-buttons">
          <button className="button-port" onClick={handleSubmit}>Accept</button>
          <button className="button-port" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
