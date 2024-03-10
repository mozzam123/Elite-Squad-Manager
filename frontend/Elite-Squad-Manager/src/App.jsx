/* eslint-disable no-unused-vars */
// src/App.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import LoggedIn from './LoggedIn';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <LoggedIn onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
