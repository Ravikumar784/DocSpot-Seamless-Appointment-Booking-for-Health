import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });

      const token = res.data.token;
      localStorage.setItem('token', token);

      const decoded = jwt_decode(token);
      const role = decoded.role;

      if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Invalid credentials!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;