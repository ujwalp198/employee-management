import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { useNavigate, Link } from 'react-router-dom';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    addAdmin(name, email, password);
    alert('Admin Account created successfully! Please log in.');
    navigate('/admin-login');
  };

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <h2 className='login-title'>Admin Registration</h2>
        <form onSubmit={submitHandler} className='login-form'>
          <input value={name} onChange={(e) => setName(e.target.value)} required className='login-input' type="text" placeholder="Full Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} required className='login-input' type="email" placeholder="Admin Email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} required className='login-input' type="password" placeholder="Password" />
          <button className='login-button'>Create Admin Account</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)'}}>
          Already have an account? <Link to="/admin-login" style={{color: 'var(--primary)'}}>Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
