import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLogin = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password, 'admin');
  };

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <h2 className='login-title'>Admin Portal</h2>
        <form onSubmit={submitHandler} className='login-form'>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='login-input'
            type="email" 
            placeholder="Admin Email" 
          />
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='login-input'
            type="password" 
            placeholder="Password" 
          />
          <button className='login-button'>Log In to Console</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)'}}>
          Don't have an account? <Link to="/admin-signup" style={{color: 'var(--primary)'}}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
