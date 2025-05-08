import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  // Get the redirect path from router state (where user tried to visit before being redirected to login)
  // If no saved location exists, default to "/dashboard"
  const from = location.state?.from?.pathname || "/dashboard"

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/v1/login', { email, password })
      .then((response) => {
        // Destructure assuming Rails sends { jwt: '...', user: {...} }
        const { jwt: token, user } = response.data;
        if (token && user) {
          login(user, token);
          navigate(from, { replace: true });
        } else {
          console.error('Login response issue', response.data);
          alert("Login failed, check the console");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Login failed: Invalid email or password")
      });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Email: <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label></div>
        <div><label>Password: <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label></div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm;