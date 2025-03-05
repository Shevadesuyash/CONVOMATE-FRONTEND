import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { authenticated } = useAuth();

  // Redirect authenticated users away from public routes
  if (authenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;