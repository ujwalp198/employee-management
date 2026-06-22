import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const HomePage = () => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className='homepage-container'>
      <NavigationBar />
      <div className='hero-section'>
        <h1 className='hero-title'>Employee Task<br/>Management System</h1>
        <p className='hero-subtitle'>The most beautiful and efficient way to manage your team, assign tasks, and track daily progress in real-time.</p>
        <div className='hero-actions'>
          <Link to="/employee-login" className='hero-btn primary-btn'>Employee Portal</Link>
          <Link to="/admin-login" className='hero-btn secondary-btn'>Admin Portal</Link>
        </div>
        <button onClick={handleReset} style={{marginTop: '3rem', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer'}}>
          Reset Demo Data
        </button>
      </div>
    </div>
  )
}

export default HomePage;
