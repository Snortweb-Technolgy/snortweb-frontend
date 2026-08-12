import axios from 'axios';
import toast from 'react-hot-toast';

// Get API URL from env, default to live backend API URL to prevent local connection refused errors
const baseURL = import.meta.env.VITE_API_URL || 'https://snortweb-backend.onrender.com/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 20000, // 20 seconds timeout to accommodate Render backend cold starts
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
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
  async (error) => {
    const config = error.config;

    if (axios.isCancel(error) || !config) {
      return Promise.reject(error);
    }

    // Identify non-critical background initial fetches
    const isBackgroundFetch = config.url && (config.url.includes('/settings') || config.url.includes('/projects') || config.url.includes('/reviews') || config.url.includes('/blogs'));

    // Network / Offline / Connection Refused handling
    if (!error.response) {
      // Do not endlessly retry background fetches if connection failed
      if (isBackgroundFetch) {
        return Promise.reject(error);
      }

      config._retryCount = config._retryCount || 0;
      const maxRetries = 2;

      if (config._retryCount < maxRetries) {
        config._retryCount += 1;
        const backoff = Math.pow(2, config._retryCount - 1) * 1000;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(api(config));
          }, backoff);
        });
      } else {
        if (config.method !== 'get') {
          toast.error("Network error. Please check your connection.", { id: 'network-error' });
        }
      }
    } else {
      // Handle specific HTTP status codes
      const { status, data } = error.response;

      if (status === 403) {
        toast.error(data?.error || "Access denied. You don't have permission.");
      } else if (status === 429) {
        toast.error(data?.error || "Too many requests. Please try again later.");
      } else if (status >= 500) {
        if (!isBackgroundFetch) {
          toast.error("Server error. We are working on it.");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
