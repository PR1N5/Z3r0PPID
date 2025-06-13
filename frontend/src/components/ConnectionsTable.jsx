import React, { useEffect } from 'react';
import connections from '../mockData';
import '../css/Dashboard.css';

function ConnectionsTable({ setTotalConnections }) {

    useEffect(()=>{
        setTotalConnections(connections.length);
    },[]);

    return (
        <div className="connections-container" >
            <table className="connections-table">
                <thead>
                    <tr>
                        <th>IP</th>
                        <th>Username</th>
                        <th>Hostname</th>
                        <th>Distribution</th>
                        <th>Date of connection</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {connections.map((conn, index) => (
                        <tr key={index}>
                            <td>{conn.ip}</td>
                            <td>{conn.username}</td>
                            <td>{conn.hostname}</td>
                            <td>{conn.distribution}</td>
                            <td>{conn.connectedAt.toLocaleString()}</td>
                            <td>
                                <span className={`connection-state ${conn.state}`}>
                                    {conn.state.charAt(0).toUpperCase() + conn.state.slice(1)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ConnectionsTable;