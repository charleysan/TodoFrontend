// src/components/ProtectedRoute.jsx (Updates Marked)
import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute() {
  const { auth, loading } = useContext(AuthContext); // <<-- Get loading state
  const location = useLocation();

  // 1. Handle Loading State FIRST
  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Checking authentication...</div>; // <<-- ADDED
  }

  // 2. Handle Authenticated State (if not loading)
  if (auth) {
    return <Outlet />;
  }

  // 3. Handle Unauthenticated State (if not loading)
  return <Navigate to="/login" replace state={{ from: location }} />;
}
export default ProtectedRoute;