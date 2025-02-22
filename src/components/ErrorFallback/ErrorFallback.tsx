'use client';

import React from 'react';
import './ErrorFallback.scss';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <div className="c-errorFallback">
      <h2 className="t-title -f32 -f20md">Oops! Something went wrong.</h2>
      <p className="t-text -f14 -mt64 -mb64">{error.message}</p>
      <button
        className="c-btn -primary"
        onClick={() => {
          resetErrorBoundary();
          window.location.href = '/';
        }}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorFallback;
