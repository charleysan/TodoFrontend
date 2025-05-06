// src/components/LoginForm.jsx (Updates Marked)
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const API_URL = 'http://localhost:3000';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // <<-- ADDED BACK (single error message)
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // <<-- Clear previous error

    axios.post(`${API_URL}/login`, { email, password })
      .then(response => { /* ... */ })
      .catch(error => {
         // <<-- ENHANCED ERROR HANDLING -->>
        if (error.response && error.response.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError('Login failed. Please check connection or try again.');
        }
        console.error('Login error:', error.response || error);
         // No alert needed now, UI shows errors
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Display Error <<-- ADDED BACK -->> */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
         {/* ... form inputs ... */}
      </form>
    </div>
  );
}
export default LoginForm;