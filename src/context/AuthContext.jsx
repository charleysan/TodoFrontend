// src/context/AuthContext.jsx (Updates Marked)
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'http://localhost:3000';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); // <<-- ADDED BACK

  const login = (userData, token) => { /* ...no change */ };
  const logout = () => { /* ...no change */ };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true); // <<-- Ensure loading is true at start
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${API_URL}/me`)
        .then(response => setAuth(response.data))
        .catch(() => {
          console.error("Token validation failed.");
          logout();
        })
        .finally(() => setLoading(false)); // <<-- Set loading false when done
    } else {
      setLoading(false); // <<-- Set loading false if no token
    }
  }, []);

  // Provide 'loading' and render children conditionally
  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}> {/* <<-- added loading */}
      {!loading && children} {/* <<-- Render only when not loading */}
    </AuthContext.Provider>
  );
};

export default AuthContext;