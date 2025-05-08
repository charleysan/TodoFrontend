import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ background: '#3cb371', padding: '10px', marginBottom: '20px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        {auth ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
            <li><Link to="/budget">Budget</Link></li>
            <li><Link to="/timezone">Time Zone Converter</Link></li>
            <li style={{ marginLeft: 'auto' }}><span>Welcome, {auth.name}!</span></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
