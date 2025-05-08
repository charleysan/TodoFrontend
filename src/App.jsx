import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import Navbar from './components/Navbar'; // Navbar should stay as is
import './App.css';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <main style={{ padding: '5px' }}>
        <Outlet />  {/* This will render child routes from main.jsx */}
      </main>
      <hr />
      <footer><p>© {new Date().getFullYear()} CSG-ChamorroChips</p></footer>
    </div>
  );
};

export default App;
