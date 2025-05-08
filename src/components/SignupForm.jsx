import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:3000/api/v1/signup`, formData)
      .then((response) => {
        console.log("Signup Successful", response.data);
        alert("Signup successful! Please login.");
        navigate('/login');
      })
      .catch((error) => {
        console.error("Signup error", error);
        setError("Signup failed. Please try again.");
      });
  };
  
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div><label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label></div>
        <div><label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} /></label></div>
        <div><label>Password: <input type="password" name="password" value={formData.password} onChange={handleChange} /></label></div>
        <div><label>Password Confirmation: <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} /></label></div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}  {/* Display error message */}
    </div>
  );  
}

export default SignupForm;