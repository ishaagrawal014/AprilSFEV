// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // check if token exists

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  // Logged in, show the protected page
  return children;
}