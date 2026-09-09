// =====================================================
// APP PRINCIPAL — LifeSync Pro
// =====================================================
// Punto de entrada de la aplicación. Gestiona autenticación,
// navegación entre vistas y el layout principal.

import { useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';
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

function MainApp() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
      <AlarmModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainApp />
      </DataProvider>
    </AuthProvider>
  );
}
