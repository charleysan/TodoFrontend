// src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function HomePage() {
  const { auth } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to MyLife Sync!</h1>
      <p>This is your all-in-one productivity suite: manage tasks, track budgets, and more.</p>

      {auth ? (
        <div>
          <p>You're logged in as {auth.name || auth.email}.</p>
          <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        </div>
      ) : (
        <div>
          <p>Please <Link to="/login">log in</Link> or <Link to="/signup">create an account</Link> to get started.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
