import axios from 'axios';

// Base URL for your Flask backend
const BASE_URL = 'http://127.0.0.1:5000'; 

// Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
