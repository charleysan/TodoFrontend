// src/pages/DashboardPage.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext'; // Import context to access user info

function DashboardPage() {
  const { auth } = useContext(AuthContext); // Get user data from context

  return (
    <div>
      <h2>Dashboard (Protected Route)</h2>
      {/* Display a welcome message if user data is available */}
      {auth ? (
        <p>Welcome back, {auth.name || auth.email}! This content is only visible if you are logged in.</p>
      ) : (
        // This part might briefly show if auth check is slow,
        // but ProtectedRoute should handle redirection mostly.
        <p>Loading user data or user not available.</p>
      )}
      {/* Add other dashboard-specific content here later */}
    </div>
  );
}

export default DashboardPage;