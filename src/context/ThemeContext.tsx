// =====================================================
// CONTEXTO DE TEMA
// =====================================================
// Maneja el modo de color (oscuro/claro) y el color del sidebar,
// elegido por el cliente.
// TODO: Cuando haya backend, sincronizar estas preferencias con el
// perfil del usuario (ej. GET/PUT /api/users/:id/preferences).

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export type ThemeMode = 'dark' | 'light';
export type SidebarColor = 'violet' | 'white' | 'blue' | 'black';

interface ThemeContextValue {
  mode: ThemeMode;
  sidebarColor: SidebarColor;
  setMode: (mode: ThemeMode) => void;
  setSidebarColor: (color: SidebarColor) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MODE_KEY = 'lifesync_theme_mode';
const SIDEBAR_COLOR_KEY = 'lifesync_sidebar_color';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [sidebarColor, setSidebarColorState] = useState<SidebarColor>('violet');

  // Al montar, recuperar preferencias guardadas (o usar defaults: dark + violet)
  useEffect(() => {
    const savedMode = localStorage.getItem(MODE_KEY) as ThemeMode | null;
    const savedColor = localStorage.getItem(SIDEBAR_COLOR_KEY) as SidebarColor | null;

    if (savedMode) setModeState(savedMode);
    if (savedColor) setSidebarColorState(savedColor);
  }, []);

  // Reflejar el estado actual en atributos del <html>, para que el CSS
  // pueda targetear [data-theme="light"] y [data-sidebar-color="blue"], etc.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-sidebar-color', sidebarColor);
  }, [sidebarColor]);

  const setMode = useCallback((newMode: ThemeMode) => {
    localStorage.setItem(MODE_KEY, newMode);
    setModeState(newMode);
  }, []);

  const setSidebarColor = useCallback((color: SidebarColor) => {
    localStorage.setItem(SIDEBAR_COLOR_KEY, color);
    setSidebarColorState(color);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  return (
    <ThemeContext.Provider
      value={{ mode, sidebarColor, setMode, setSidebarColor, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
}