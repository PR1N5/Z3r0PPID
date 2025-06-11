import { useState } from 'react';
import { Login } from '../wailsjs/go/auth/Auth';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';

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
        <DashboardView />
      )}
    </>
  );
}

export default App;
