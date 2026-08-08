import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    window.location.href = 'https://trade-karo-nine.vercel.app/login';
    return null;
  }

  return children;
};

export default ProtectedRoute;
