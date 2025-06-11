import '../css/Dashboard.css';
import { SetWindowTitle } from '../../wailsjs/go/window/API';
import { useState, useEffect } from 'react';


function DashboardView({ setLoggedIn }) {

    useEffect(() => {
        SetWindowTitle("Dashboard - Z3r0PPID");
    }, []);

    return (
        <div>
            <div>
                <button
                    onClick={(e) => setLoggedIn(false)}
                    className='right-aligned-button'
                >
                    Sign out
                </button>
            </div>
        </div>
        
    );
}


export default DashboardView;