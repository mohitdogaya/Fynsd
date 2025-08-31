// src/lib/api.js
import axios from "axios";

// 1. API instance banaya base URL ke sath
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // env file me set hoga
});

// 2. Request ke time agar token mila toh headers me chipka diya
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Export ready-to-use instance
export default api;
