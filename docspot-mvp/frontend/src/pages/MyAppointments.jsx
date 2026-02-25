import React, { useEffect, useState } from 'react';
import API from '../services/api';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to view appointments.');
      return;
    }

    API.get('/appointments', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log('Appointments:', res.data);
        setAppointments(res.data);
      })
      .catch(err => console.error('Error fetching appointments:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map(app => (
            <li key={app._id}>
              <strong>Doctor:</strong> {app.doctor?.specialty || 'N/A'} <br />
              <strong>Location:</strong> {app.doctor?.location || 'N/A'} <br />
              <strong>Date:</strong> {new Date(app.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;