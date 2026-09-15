import { createContext, useContext, useEffect, useState } from 'react';
import { setToken } from '../api/client';
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  verifyEmail as verifyEmailApi,
  googleLogin as googleLoginApi,
} from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingToken = localStorage.getItem('hfm_token');
    if (!existingToken) {
      setLoading(false);
      return;
    }
    fetchCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  async function register({ name, email, password, role }) {
    return registerUser({ name, email, password, role });
  }

  async function verifyEmail({ email, code }) {
    const data = await verifyEmailApi({ email, code });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function login({ email, password }) {
    const data = await loginUser({ email, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  async function googleLogin(credential, role) {
    const data = await googleLoginApi({ credential, role });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, verifyEmail, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}