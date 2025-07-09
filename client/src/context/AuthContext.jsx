import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

// Custom hook for accessing auth context with error boundary
// More HMR-friendly pattern by avoiding inline function definitions
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function AuthProvider({ children }) {
  // Core auth state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Verify stored token and fetch user profile
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      }
    } catch (error) {
      // Silent failure - just clear invalid token
      localStorage.removeItem("token");
      console.error("Auth check failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login user and store token
  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
    return response;
  };

  // Register new user and auto-login
  const register = async (name, email, password) => {
    const response = await authAPI.register(name, email, password);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
    return response;
  };

  // Clear user session and token
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Context value object - stable reference for performance
  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Named exports for better HMR support
export { useAuth, AuthProvider };
