import React, { useState, useRef, useEffect } from "react";
import InfoOpenPorts from "./InfoOpenPorts";
import ApplicationInformation from "./ApplicationInformation";
import "../css/DropdownMenu.css";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showInfoPorts, setShowInfoPorts] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
        Options ▾
      </button>
      {open && (
        <div className="dropdown-menu">
          <div className="dropdown-item">Configuration</div>
          <div className="dropdown-item" onClick={() => setShowInfoPorts(true)} >Open ports...</div>
          <div className="dropdown-item" onClick={() => setShowAbout(true)} >About the c2...</div>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item">Close all...</div>
        </div>
      )}
      {showInfoPorts && (
        <InfoOpenPorts
          onClose={() => setShowInfoPorts(false)}
        />
      )}
      {showAbout && (
        <ApplicationInformation
          onClose={() => setShowAbout(false)}
        />
      )}
    </div>
  );
};

export default DropdownMenu;
