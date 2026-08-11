import axios from 'axios';
import toast from 'react-hot-toast';

// Get API URL from env, fallback to live backend for production previews
const baseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://snortweb-backend.onrender.com/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL,
  withCredentials: true, // Important for cookies/sessions if used
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  timeout: 20000, // 20 seconds timeout to accommodate Render backend cold starts
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
  async (error) => {
    const config = error.config;

    if (axios.isCancel(error) || !config) {
      return Promise.reject(error);
    }

    // Sanitized diagnostic logger for background observability without toast noise
    const isBackgroundFetch = config.url && (config.url.includes('/settings') || config.url.includes('/projects') || config.url.includes('/reviews'));
    
    const logDiagnostic = (type, details) => {
      if (import.meta.env.DEV) {
        console.warn(`[API Diagnostic] ${type} | Endpoint: ${config.method?.toUpperCase()} ${config.url}`, {
          timestamp: new Date().toISOString(),
          status: error.response?.status || "NETWORK_FAIL",
          ...details
        });
      }
    };

    // Check if it's a network error or timeout (!error.response means no HTTP response was received)
    if (!error.response) {
      config._retryCount = config._retryCount || 0;
      const maxRetries = isBackgroundFetch ? 1 : 2;

      if (config._retryCount < maxRetries) {
        config._retryCount += 1;
        const backoff = Math.pow(2, config._retryCount - 1) * 1000;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(api(config));
          }, backoff);
        });
      } else {
        logDiagnostic("Network/Timeout Error", { isBackgroundFetch });
        if (!isBackgroundFetch && config.method !== 'get') {
          toast.error("Network error. Please check your connection.", { id: 'network-error' });
        }
      }
    } else {
      // Handle specific HTTP status codes
      const { status, data } = error.response;
      
      logDiagnostic(`HTTP ${status} Response`, { message: data?.error || error.message });

      if (status === 401) {
        console.warn("Unauthorized access");
      } else if (status === 403) {
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
