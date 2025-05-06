// src/components/SignupForm.jsx (Updates Marked)
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

function SignupForm() {
  const [formData, setFormData] = useState(/* ... */);
  const [errors, setErrors] = useState([]); // <<-- ADDED BACK
  const navigate = useNavigate();
  const handleChange = (e) => {/* ... */};

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]); // <<-- Clear previous errors

    axios.post(`${API_URL}/signup`, formData)
      .then(response => { /* ... */ })
      .catch(error => {
        // <<-- ENHANCED ERROR HANDLING -->>
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors); // Use backend errors
        } else {
          setErrors(['Signup failed. Please try again.']);
        }
        console.error('Signup error:', error.response || error);
        // No alert needed now, UI shows errors
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Display Errors <<-- ADDED BACK -->> */}
      {errors.length > 0 && (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '15px' }}>
          <strong>Please fix the following errors:</strong>
          <ul>
            {errors.map((error, index) => <li key={index}>{error}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* ... form inputs ... */}
      </form>
    </div>
  );
}
export default SignupForm;