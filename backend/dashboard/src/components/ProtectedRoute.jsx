import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    window.location.href = 'http://localhost:5174/login';
    return null;
  }

  return children;
};

export default ProtectedRoute;
