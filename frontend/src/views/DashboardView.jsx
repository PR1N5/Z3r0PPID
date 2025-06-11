import '../css/App.css';
import { SetWindowTitle } from '../../wailsjs/go/window/API';
import { useState, useEffect } from 'react';


function DashboardView() {

    useEffect(() => {
        SetWindowTitle("Dashboard - Z3r0PPID");
    }, []);

    return (
        <div className="h-screen w-screen bg-white flex items-center justify-center">
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <div className="h-screen w-screen bg-white flex items-left">
                <button>
                    clickme
                </button>
                <button>
                    clickme2
                </button>
            </div>
        </div>
        
    );
}


export default DashboardView;