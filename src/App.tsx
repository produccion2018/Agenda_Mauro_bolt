// =====================================================
// APP PRINCIPAL — LifeSync Pro
// =====================================================
// Punto de entrada de la aplicación. Gestiona autenticación,
// navegación entre vistas y el layout principal.

import { useEffect, useState, type CSSProperties } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
import { ThemeProvider } from '@/context/ThemeContext';
import AuthView from '@/views/AuthView';
import Dashboard from '@/views/Dashboard';
import CalendarView from '@/views/CalendarView';
import TasksView from '@/views/TasksView';
import HabitsView from '@/views/HabitsView';
import NotesView from '@/views/NotesView';
import SettingsView from '@/views/SettingsView';
import ProfileView from '@/views/ProfileView';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import AlarmModal from '@/components/AlarmModal';
import type { AppView } from '@/types';
import { isTourMode } from '@/data/seedData';

function MainApp() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Recorrido automático del portfolio (?tour=1): va mostrando las secciones solo.
  // Si el usuario hace clic o scroll se pausa y retoma tras unos segundos.
  useEffect(() => {
    if (!isTourMode || !isAuthenticated) return;
    const order: AppView[] = ['dashboard', 'tasks', 'habits', 'calendar', 'notes'];
    let i = 0;
    let paused = false;
    let idle = 0;
    const onUser = () => {
      paused = true;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => (paused = false), 9000);
    };
    const evs = ['wheel', 'touchstart', 'mousedown', 'keydown'] as const;
    evs.forEach((e) => window.addEventListener(e, onUser, { passive: true }));
    const id = window.setInterval(() => {
      if (paused) return;
      i = (i + 1) % order.length;
      setCurrentView(order[i]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 5000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(idle);
      evs.forEach((e) => window.removeEventListener(e, onUser));
    };
  }, [isAuthenticated]);

  // Pantalla de carga
  if (isLoading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-lavender-300 border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }} />
          <p className="text-sm text-violet-200/50">Cargando LifeSync Pro...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar pantalla de login/registro
  if (!isAuthenticated) {
    return <AuthView />;
  }

  // Renderizar la vista actual
  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentView} />;
      case 'calendar': return <CalendarView />;
      case 'tasks': return <TasksView />;
      case 'habits': return <HabitsView />;
      case 'notes': return <NotesView />;
      case 'settings': return <SettingsView />;
      case 'profile': return <ProfileView />;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen animated-bg flex">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-violet-700 -top-40 -left-40 animate-float" />
        <div className="orb w-[400px] h-[400px] bg-neon-purple bottom-0 right-0 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <TopBar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigate={setCurrentView}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {/* Modal de alarma flotante */}
      {isTourMode && (
        <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-violet-300/30 bg-[#13032a]/85 px-4 py-2 text-xs text-violet-100 shadow-lg backdrop-blur-xl">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-neon-purple align-middle" />
          Recorrido automático · tocá para explorar
        </div>
      )}
      <AlarmModal />
    </div>
  );
}

/** Intro de marca: solo en la primera carga de la página. */
function Intro() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('ls-ready')) return;
    const t = window.setTimeout(() => root.classList.add('ls-ready'), 2600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="ls-intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24 grid place-items-center">
          <span className="ls-ring" />
          <span className="ls-ring r2" />
          <span className="ls-ring r3" />
          <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_#bf5af2]" />
        </div>
        <p className="font-display text-3xl font-bold text-white">
          {'LifeSync'.split('').map((ch, i) => (
            <span key={i} className="ls-letter" style={{ '--i': i } as CSSProperties}>
              {ch}
            </span>
          ))}
          <span className="ls-letter ml-2 text-neon-purple" style={{ '--i': 9 } as CSSProperties}>
            Pro
          </span>
        </p>
        <p className="ls-letter text-[11px] uppercase tracking-[0.4em] text-violet-200/60" style={{ '--i': 12 } as CSSProperties}>
          Sincronizando tu día
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Intro />
      <AuthProvider>
        <DataProvider>
          <MainApp />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}