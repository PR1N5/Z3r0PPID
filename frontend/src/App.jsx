import { useState } from 'react';
import { Login } from '../wailsjs/go/auth/Auth';
import logo from './assets/logo.png';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  async function handleLogin() {
    const success = await Login(username, password);
    setLoggedIn(success);
    setError(!success);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md border border-red-500">
        <div className="w-full h-24 flex items-center justify-center bg-yellow-100">
          
          <img
            src={logo}
            alt="Logo"
            className="logo-small"
          />
        </div>

        {/* FORM */}
        <div className="mb-4">
          <label className="block w-full text-center text-sm font-semibold text-gray-700 mb-1">
            Username:
          </label>
          <br></br>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username..."
          />
        </div>

        <br></br>

        <div className="mb-6">
          <label className="block w-full text-center text-sm font-semibold text-gray-700 mb-1">
            Password:
          </label>
          <br></br>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password..."
          />
        </div>
        <br />

        <div className="flex justify-end">
          <button
            onClick={handleLogin}
            className="bg-blue-100 text-blue-700 font-semibold px-6 py-2 rounded-xl border border-blue-500 hover:bg-blue-200 transition duration-200"
          >
            LOGIN
          </button>
        </div>

        {loggedIn && (
          <p className="text-green-600 mt-4 text-center">Login successful</p>
        )}
        {error && !loggedIn && (
          <p className="text-red-600 mt-4 text-center">Invalid credentials</p>
        )}
      </div>
    </div>
  );
}

export default App;
