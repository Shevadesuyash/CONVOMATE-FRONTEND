import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const generateOtp = async (email) => {
    try {
      setLoading(true);
      setError(null);
      await api.generateOtp(email);
      return true; // Indicate success
    } catch (err) {
      setError(err.message || 'Failed to generate OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.login(email, otp); // Backend expects username=email
      const token = response.data.token; // Adjust based on actual response structure
      localStorage.setItem('token', token);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, name, email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.register({ username, name, email });
      const token = response.data.token; // Adjust based on actual response structure
      localStorage.setItem('token', token);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    setError(null);
    // No need to call api.logout() since JWT is stateless
  };

  return (
    <AuthContext.Provider value={{ authenticated, generateOtp, login, register, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };