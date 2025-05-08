import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute() {
  const { auth, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner component
  }

  if (auth) {
    return <Outlet />
  }

  return <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute;