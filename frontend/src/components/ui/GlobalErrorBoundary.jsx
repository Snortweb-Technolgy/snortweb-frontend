import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-primary text-text-primary px-4">
      <div className="max-w-md w-full bg-bg-card border border-border-main p-8 rounded-2xl shadow-xl flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-sans-heading font-bold mb-2">Something went wrong</h2>
        <p className="text-text-secondary font-sans-body mb-6 text-sm">
          An unexpected error occurred. Our team has been notified.
        </p>
        {process.env.NODE_ENV !== 'production' && (
          <pre className="text-xs text-left bg-black/30 p-4 rounded mb-6 overflow-auto max-w-full text-red-400">
            {error.message}
          </pre>
        )}
        <button
          onClick={resetErrorBoundary}
          className="bg-[#C8A15A] hover:bg-[#b08c4b] text-black font-bold py-3 px-6 rounded transition-colors w-full uppercase tracking-wider text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function GlobalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
        window.location.href = "/";
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
