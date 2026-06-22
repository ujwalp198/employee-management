import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>EMS.</div>
      <div className='navbar-links'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/employee-login" className='nav-link'>Employee Portal</Link>
        <Link to="/admin-login" className='nav-link'>Admin Portal</Link>
      </div>
    </nav>
  )
}

export default NavigationBar;
