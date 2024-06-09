import React, { useState } from 'react';
import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [deskNumber, setDeskNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedDeskNumber = parseInt(deskNumber);
    if (!isNaN(parsedDeskNumber) && parsedDeskNumber >= 1 && parsedDeskNumber <= 10) {
      // Save to localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('deskNumber', parsedDeskNumber);

      // Redirect to index
      window.location.href = 'index';
    } else {
      alert('Hatalı kullanıcı adı veya masa numarası');
    }
  };

  return (
    <div className="login-wrapper">
      <div className='lower-wrapper'>
        <form id="loginForm" onSubmit={handleSubmit}>
          <h1>HOŞGELDİNİZ</h1>
          <div className="input-box">
            <input
              type="text"
              id="username"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              id="password"
              placeholder="Masa Numarası"
              value={deskNumber}
              onChange={(e) => setDeskNumber(e.target.value)}
              min="1"
              max="10"
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="register-link">
            <p>Lütfen Masa Numaranızı Giriniz<a href="#"></a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;