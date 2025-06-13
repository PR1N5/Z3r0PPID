import '../css/Dashboard.css';
import { SetWindowTitle } from '../../wailsjs/go/window/API';
import { useState, useEffect } from 'react';
import DropdownMenu from '../components/DropdownMenu';
import ConnectionsTable from '../components/ConnectionsTable';
import ConnectionDetail from '../components/ConnectionDetail';

function DashboardView({ setLoggedIn }) {
    const [totalConnections, setTotalConnections] = useState(0);
    const [selectedConnection, setSelectedConnection] = useState(null);

    useEffect(() => {
        SetWindowTitle("Dashboard - Z3r0PPID");
    }, []);

    return (
        <>
            {!selectedConnection ? (
                <>
                    <div className="header-container">
                        <div className="left">
                            <DropdownMenu />
                            <button className='button-port'>+ Add port...</button>
                        </div>
                        <div className="center">
                            <h3>Dashboard</h3>
                        </div>
                        <div className="right">
                            <label className='label-connections'>{totalConnections} connections</label>
                            <button
                                onClick={() => setLoggedIn(false)}
                                className="signout-button"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>

                    <div className="content-container">
                        <ConnectionsTable
                            setTotalConnections={setTotalConnections}
                            onConnectionClick={setSelectedConnection}
                        />
                    </div>

                    <div className="dashboard-footer">
                        Z3r0PPID v0.0.3
                    </div>
                </>
            ) : (
                <ConnectionDetail
                    connection={selectedConnection}
                    onBack={() => setSelectedConnection(null)}
                />
            )}
        </>
    );
}

export default DashboardView;
