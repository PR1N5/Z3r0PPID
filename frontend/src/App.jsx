import { useState } from 'react';
import { Login } from '../wailsjs/go/auth/Auth';
import LoginView from './views/LoginView';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleLogin(username, password) {
    const success = await Login(username, password);
    if (success) {
      setLoggedIn(true);
    }
    return success;
  }

  return (
    <>
      {!loggedIn ? (
        <LoginView onLogin={handleLogin} />
      ) : (
        <div className="h-screen w-screen bg-white flex items-center justify-center">
          <h1 className="text-3xl font-bold text-black">Bienvenido</h1>
        </div>
      )}
    </>
  );
}

export default App;
