import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Keep user logged in on page refresh
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) setAuthenticated(true);
    setLoading(false);
  }, []);

  const generateOtp = async (email) => {
    try {
      setLoading(true);
      setError(null);
      await api.generateOtp(email);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to generate OTP');
      throw err;
    } finally {
      setLoading(false);
    }
  };

 const [authKey, setAuthKey] = useState(0);

  const login = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.login(email, otp);
      const token = response.token;
      if (!token) throw new Error('Token missing in response');

      localStorage.setItem('token', token);
      setAuthenticated(true);
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    window.location.reload();
  };

  const register = async (username, name, email) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.register({ username, name, email });

      if (response.message?.includes('success')) {
        // Registration succeeded, optionally show a toast or redirect
        return;
      }

      throw new Error(response.message || 'Registration failed');
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, generateOtp, login, register, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
