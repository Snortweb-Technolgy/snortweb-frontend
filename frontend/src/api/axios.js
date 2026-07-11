import axios from 'axios';
import toast from 'react-hot-toast';

// Get API URL from env, fallback to localhost for dev if missing
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for cookies/sessions if used
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if it's a network error or timeout
    if (!error.response) {
      toast.error("Network error. Please check your connection.");
    } else {
      // Handle specific HTTP status codes
      const { status, data } = error.response;
      
      if (status === 401) {
        // Handle unauthorized access (e.g., redirect to login or clear auth state)
        console.warn("Unauthorized access");
      } else if (status === 403) {
        toast.error(data.error || "Access denied. You don't have permission.");
      } else if (status === 429) {
        toast.error(data.error || "Too many requests. Please try again later.");
      } else if (status >= 500) {
        toast.error("Server error. We are working on it.");
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
