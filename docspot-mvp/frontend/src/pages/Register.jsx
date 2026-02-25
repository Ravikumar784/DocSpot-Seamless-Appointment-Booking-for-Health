import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    specialty: '',
    location: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token); // save JWT
      alert('Registration successful!');
      navigate('/doctors'); // redirect to doctors page
    } catch (err) {
      console.error('Register failed:', err);
      alert('Error registering user');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
      <form onSubmit={handleRegister} style={{ width: '350px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Register for DocSpot</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }}>
            <option value="customer">Customer</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {formData.role === 'doctor' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>Specialty:</label>
              <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Location:</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
          </>
        )}

        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;