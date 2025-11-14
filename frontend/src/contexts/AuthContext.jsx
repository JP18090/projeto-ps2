import React, { createContext, useContext, useState } from 'react';
import { apiLogin } from '../api/simulatedApi'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, senha, tipo) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await apiLogin(email, senha, tipo);
      setUser(userData);
      // TODO: Salvar token no localStorage
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // TODO: Remover token do localStorage
  };

  const authData = {
    isAuthenticated: !!user,
    user,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};