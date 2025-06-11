import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import '../css/App.css';
import { SetWindowTitle } from '../../wailsjs/go/window/API';


function LoginView({ onLogin }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        SetWindowTitle("Login - Z3r0PPID");
    }, []);


    async function handleLogin() {
        const success = await onLogin(username, password);
        setError(!success);
    }

    return (
        <div>
            <div>
                <div>
                <img
                    src={logo}
                    alt="Logo"
                    className="logo-small"
                />
                </div>

                {/* FORM */}
                <div>
                <label>
                    Username:
                </label>
                <br />
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="custom-input"
                    type="text"
                    placeholder="Username..."
                />
                </div>

                <div>
                <label>
                    Password:
                </label>
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="custom-input"
                    type="password"
                    placeholder="Password..."
                />
                </div>

                <br />

                <div>
                <button
                    onClick={handleLogin}
                    className='light-gray-button'
                >
                    LOGIN
                </button>
                </div>

                {error && (
                <p>Invalid credentials</p>
                )}
            </div>
        </div>
    );
}

export default LoginView;
