import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:5000/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status when app loads
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/auth-check`);
      if (response.data.authenticated) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log('Not authenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/login`, { username, password });
      setUser(response.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return { 
        success: false, 
        error: err.response?.data?.error || 'Login failed',
        status: err.response?.status
      };
    }
  };

  const register = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/register`, { username, password });
      setUser(response.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return { 
        success: false, 
        error: err.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      logout, 
      register,
      isAuthenticated: !!user,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);