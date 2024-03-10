// src/LoggedIn.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const LoggedIn = ({ onLogout }) => {
  return (
    <div>
      <h2>Welcome! You are logged in.</h2>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default LoggedIn;
