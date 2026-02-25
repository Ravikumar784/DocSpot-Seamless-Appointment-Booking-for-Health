import React, { useEffect, useState } from 'react';
import API from '../services/api';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    API.get('/doctors')
      .then(res => {
        console.log('Doctors:', res.data);
        setDoctors(res.data);
      })
      .catch(err => console.error('Error fetching doctors:', err));
  }, []);

  // ✅ Add booking function here
 const bookAppointment = async (doctorId) => {
  const slotStart = new Date().toISOString(); // Replace with actual selected slot
  try {
    await axios.post('/api/appointments', {
      doctorId,
      slotStart,
    });
    alert('Appointment booked!');
  } catch (err) {
    console.error(err.response?.data?.message || 'Booking failed');
  }
};

  return (
    <div className="doctor-container">
      <h2>Available Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors available.</p>
      ) : (
        <div className="doctor-grid">
          {doctors.map(doc => (
            <div key={doc._id} className="doctor-card">
              <h3>{doc.specialty}</h3>
              <p><strong>Location:</strong> {doc.location}</p>
              <p><strong>Email:</strong> {doc.user?.email || 'N/A'}</p>
              {/* ✅ Wire button to booking function */}
              <button className="book-btn" onClick={() => bookAppointment(doc._id)}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;