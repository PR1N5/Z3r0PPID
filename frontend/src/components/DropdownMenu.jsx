import React, { useState, useRef, useEffect } from "react";
import "../css/DropdownMenu.css";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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
          <div className="dropdown-item">About the c2...</div>
          <div className="dropdown-item">Open ports...</div>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item">Close all...</div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
