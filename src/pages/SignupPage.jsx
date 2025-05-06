// src/pages/SignupPage.jsx
import React from 'react';
import SignupForm from '../components/SignupForm'; // Import the form component

function SignupPage() {
  return (
    <div>
      <h1>Create Your Account</h1>
      <SignupForm /> {/* Render the form here */}
    </div>
  );
}

export default SignupPage;