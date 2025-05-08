import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(token); // new calls the JWT
    setAuth(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAuth(null);
    setToken(null); // new calls the JWT
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`http://localhost:3000/me`)
        .then(response => {
          setAuth(response.data);
        })
        .catch(() => {
          console.error("token validation failed");
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;