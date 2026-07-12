import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './context/AppContext'
import './styles/globals.css'
import './styles/animations.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Axios globally handles true network errors (no response) with exponential backoff.
        // We disable React Query's default network retries to prevent duplicate loops and spam toasts.
        // However, we still allow React Query to retry 5xx Server Errors up to 3 times.
        if (!error.response) return false;
        if (error.response?.status >= 500) return failureCount < 3;
        return false;
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        if (!error.response) return false;
        if (error.response?.status >= 500) return failureCount < 2;
        return false;
      }
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
