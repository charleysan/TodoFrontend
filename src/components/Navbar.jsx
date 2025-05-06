// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#eee', padding: '10px', marginBottom: '20px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {auth ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li style={{ marginLeft: 'auto' }}><span>Welcome, {auth.name || auth.email}!</span></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li style={{ marginLeft: 'auto' }}><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;