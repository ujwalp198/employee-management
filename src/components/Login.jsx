import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className='login-wrapper'>
      <div className='login-container'>
        <h1 className='login-title'>Welcome Back</h1>
        <form onSubmit={submitHandler} className='login-form'>
          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className='login-input' 
            type="email" 
            placeholder='Enter your email' 
          />
          <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className='login-input' 
            type="password" 
            placeholder='Enter password' 
          />
          <button className='login-button'>
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
