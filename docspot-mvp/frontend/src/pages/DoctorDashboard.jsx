import React, { useEffect, useState } from 'react';
import API, { setAuth } from '../services/api';

export default function DoctorDashboard({ token }) {
  const [appts, setAppts] = useState([]);
  useEffect(()=> { setAuth(token); fetch(); }, [token]);

  async function fetch() {
    const res = await API.get('/appointments/mine');
    setAppts(res.data);
  }

  async function changeStatus(id, status) {
    await API.patch(`/appointments/${id}/status`, { status });
    fetch();
  }

  return (
    <div>
      <h3>Doctor Dashboard</h3>
      {appts.length === 0 ? <div>No appointments</div> : appts.map(a => (
        <div key={a._id} style={{ border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
          <div><strong>Patient:</strong> {a.customer?.name}</div>
          <div><strong>Slot:</strong> {new Date(a.slotStart).toLocaleString()}</div>
          <div><strong>Status:</strong> {a.status}</div>
          <div style={{ marginTop: 8 }}>
            {a.status !== 'confirmed' && <button onClick={()=>changeStatus(a._id, 'confirmed')}>Confirm</button>}
            {a.status !== 'cancelled' && <button onClick={()=>changeStatus(a._id, 'cancelled')}>Cancel</button>}
            {a.documentPath && <a href={`http://localhost:5000${a.documentPath}`} target="_blank" rel="noreferrer">View Document</a>}
          </div>
        </div>
      ))}
    </div>
  );
}