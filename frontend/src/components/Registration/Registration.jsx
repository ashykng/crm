import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/token/', loginData);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      console.log('Login successful!');
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="form-box">
          <form onSubmit={handleLoginSubmit} className="LoginForm">
            <h2>Login</h2>
            <div className="input-box">
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
              <label>Username</label>
              <i className="bx bxs-phone"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <label>Password</label>
              <i className="bx bx-lock"></i>
            </div>
            <button type="submit" className="btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;