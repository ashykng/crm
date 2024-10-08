import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Hook for navigation

  // Check for authToken in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // If token exists, redirect to home
      navigate('/');
    }
  }, [navigate]);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/token/', loginData);
      const { token, username } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username); // Save username in localStorage
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      // Show alert if login fails
      alert('مشکلی در لاگین رخ داده است!');
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="form-box">
          <form onSubmit={handleLoginSubmit} className="LoginForm">
            <h2>ورود</h2>
            <div className="input-box">
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
              <label>نام کاربری</label>
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
              <label>رمز عبور</label>
              <i className="bx bx-lock"></i>
            </div>
            <button type="submit" className="btn">
              ورود
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;