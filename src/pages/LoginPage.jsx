// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/LoginForm'; // Import the form component

function LoginPage() {
  return (
    <div>
      <h1>Please Log In</h1>
      <LoginForm /> {/* Render the form here */}
    </div>
  );
}

export default LoginPage;