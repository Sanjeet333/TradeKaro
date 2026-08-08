import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');

    const verify = async () => {
      const currentToken = localStorage.getItem('token');
      if (!currentToken) {
        setAuthChecked(true);
        return;
      }
      try {
        const res = await axiosInstance.get('/verify');
        setUser(res.data.user ?? null);
        setAuthChecked(true);
      } catch (err) {
        setAuthChecked(true);
      }
    };

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      setToken(tokenFromUrl);
      window.history.replaceState({}, '', window.location.pathname);
    }

    verify();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);

    window.location.href = 'https://trade-karo-nine.vercel.app/';
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, user, logout, authChecked }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
