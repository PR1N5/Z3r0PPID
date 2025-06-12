import '../css/Dashboard.css';
import { SetWindowTitle } from '../../wailsjs/go/window/API';
import { useState, useEffect } from 'react';
import DropdownMenu from '../components/DropdownMenu';


function DashboardView({ setLoggedIn }) {

    useEffect(() => {
        SetWindowTitle("Dashboard - Z3r0PPID");
    }, []);

    return (
        <div className="header-container">
            <div className="left">
                <DropdownMenu />
                <button
                    className='button-port'
                >
                    + Add port...
                </button>
            </div>
            <div className="center">
                <h3>Dashboard</h3>
            </div>
            <div className="right">
                <button
                    onClick={() => setLoggedIn(false)}
                    className="signout-button"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
}


export default DashboardView;