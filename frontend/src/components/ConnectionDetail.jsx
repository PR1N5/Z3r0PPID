import { useState, useRef, useEffect } from 'react';
import '../css/ConnectionDetail.css';

function ConnectionDetail({ connection, onBack }) {
    const [output, setOutput] = useState([]);
    const [command, setCommand] = useState('');
    const outputRef = useRef(null);

    //TO-DO: change this later
    const handleExecute = (e) => {
        e.preventDefault();
        if (command.trim() === '') return;

        const fakeResponse = `${command}`;
        const newEntry = `${connection.username}@${connection.hostname}:~$ ${command}`;

        setOutput(prev => [...prev, newEntry, fakeResponse]);
        setCommand('');
    };


    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);


    return (
        <div className="terminal-container">
            <div className="terminal-header">
                <button onClick={onBack} className="terminal-button">← Back</button>
                <span className="terminal-title">
                    Terminal - {connection.username}@{connection.hostname}
                </span>
            </div>

            <div className="terminal-output" ref={outputRef}>
                {output.map((line, idx) => (
                    <div key={idx} className="terminal-line">{line}</div>
                ))}
            </div>

            <form onSubmit={handleExecute} className="terminal-input-form">
                <span className="terminal-prompt">{connection.username}@{connection.hostname}:~$</span>
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="terminal-input"
                    autoFocus
                />
            </form>
        </div>
    );
}

export default ConnectionDetail;
