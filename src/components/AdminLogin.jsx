import React, { useState } from 'react';
import '../css/AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://masana-gelsin-backend.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          password: password
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        window.location.href = 'admin';
      } else {
        setMessage('Hatalı kullanıcı adı veya şifre.');
      }
    } catch (error) {
      setMessage('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <h2>Admin Login</h2>
        <form id="adminLoginForm" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-username">Username:</label>
            <input
              type="text"
              id="admin-username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="admin-password">Password:</label>
            <input
              type="password"
              id="admin-password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="admin-login-button">Sign In</button>
        </form>
        {message && <div className="admin-login-message">{message}</div>}
      </div>
    </div>
  );
};

export default AdminLogin;
