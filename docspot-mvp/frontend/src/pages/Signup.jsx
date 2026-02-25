import React, { useState } from 'react';
import API, { setAuth } from '../services/api';

export default function Signup({ onAuth }) {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'customer' });
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', form);
      setAuth(res.data.token);
      onAuth(res.data.token, res.data.user);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };
  return (
    <form onSubmit={submit} style={{ border:'1px solid #ddd', padding: 12, width: 320 }}>
      <h3>Signup</h3>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
      <div>
        <label><input type="radio" checked={form.role==='customer'} onChange={()=>setForm({...form, role:'customer'})} /> Customer</label>
        <label style={{ marginLeft: 8 }}><input type="radio" checked={form.role==='doctor'} onChange={()=>setForm({...form, role:'doctor'})} /> Doctor</label>
      </div>
      <button type="submit">Signup</button>
      <div style={{ color: 'red' }}>{msg}</div>
    </form>
  );
}