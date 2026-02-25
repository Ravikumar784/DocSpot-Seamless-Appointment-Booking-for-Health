import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5001/api' });

export function setAuth(token) {
  if (token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
}

export default API;