import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;