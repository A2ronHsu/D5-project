import axios from 'axios';

const api = axios.create({
  // Since the backend serves the frontend, requests are relative to the current host.
  // The browser will automatically prepend the current origin.
  baseURL: '',
  withCredentials: true,
});

export default api;