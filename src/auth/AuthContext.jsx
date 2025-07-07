// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      if (response.success) {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      if (response.success) {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    register,
    login,
    logout,
    isAuthenticated: AuthService.isAuthenticated(),
    initiateGoogleAuth: AuthService.initiateGoogleAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};