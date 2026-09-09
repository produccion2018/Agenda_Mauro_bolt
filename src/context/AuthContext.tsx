// =====================================================
// CONTEXTO DE AUTENTICACIÓN
// =====================================================
// Este contexto SIMULA la autenticación en el cliente.
// TODO: Conectar aquí la API de autenticación con Token.
// TODO: Reemplazar el localStorage con llamadas reales al backend
// (ej. POST /api/auth/login, POST /api/auth/register).
// TODO: El token debe venir del backend y guardarse de forma segura.

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { User } from '@/types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'lifesync_token';
const USER_KEY = 'lifesync_user';

// TODO: Reemplazar con la URL real del backend
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar, verificar si hay un token guardado en localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // TODO: Conectar aquí la API de autenticación con Token
  // Simulación de login — reemplazar con:
  // const response = await fetch(`${API_URL}/auth/login`, { ... })
  const login = useCallback(async (email: string, password: string) => {
    // Validación básica en el cliente
    if (!email || !password) {
      return { success: false, error: 'Email y contraseña son obligatorios' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'El email no tiene un formato válido' };
    }
    if (password.length < 6) {
      return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    }

    // SIMULACIÓN: Generar un token ficticio
    // TODO: Reemplazar con el token real que devuelva el backend
    const fakeToken = `lsync_${btoa(email)}_${Date.now()}`;
    const fakeUser: User = {
      id: 'u1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem(TOKEN_KEY, fakeToken);
    localStorage.setItem(USER_KEY, JSON.stringify(fakeUser));
    setToken(fakeToken);
    setUser(fakeUser);

    return { success: true };
  }, []);

  // TODO: Conectar aquí la API de registro
  // Simulación de registro — reemplazar con:
  // const response = await fetch(`${API_URL}/auth/register`, { ... })
  const register = useCallback(async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }
    if (name.length < 2) {
      return { success: false, error: 'El nombre debe tener al menos 2 caracteres' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'El email no tiene un formato válido' };
    }
    if (password.length < 6) {
      return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
    }

    // SIMULACIÓN: Generar un token ficticio
    // TODO: Reemplazar con el token real que devuelva el backend
    const fakeToken = `lsync_${btoa(email)}_${Date.now()}`;
    const fakeUser: User = {
      id: 'u1',
      name,
      email,
      joinedAt: new Date().toISOString(),
    };

    localStorage.setItem(TOKEN_KEY, fakeToken);
    localStorage.setItem(USER_KEY, JSON.stringify(fakeUser));
    setToken(fakeToken);
    setUser(fakeUser);

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
