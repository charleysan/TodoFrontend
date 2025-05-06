import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

// Import Layout and Page Components (Create these pages next)
import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout
    children: [
      // Public Routes
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      // Protected Routes Area
      {
        element: <ProtectedRoute />, // Wrapper for protected routes
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          // Add more protected routes here
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AuthProvider MUST wrap RouterProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
