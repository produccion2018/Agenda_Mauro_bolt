// =====================================================
// SIDEBAR — Barra lateral retráctil
// =====================================================
// Navegación principal agrupada por Salud y Trabajo, con acordeón.
// TODO: Sincronizar el estado de la sidebar con preferencias del usuario en el backend.

import { useState } from 'react';
import {
  LayoutDashboard, Calendar, CheckSquare, Repeat,
  StickyNote, Settings, User as UserIcon,
  ChevronLeft, ChevronDown, LogOut,
  HeartPulse, Briefcase,
} from 'lucide-react';
import type { AppView } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

type NavItem = { view: AppView; label: string; icon: typeof LayoutDashboard };

const topItem: NavItem = { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard };

const groups: { id: string; label: string; icon: typeof HeartPulse; items: NavItem[] }[] = [
  {
    id: 'salud',
    label: 'Salud',
    icon: HeartPulse,
    items: [
      { view: 'habits', label: 'Hábitos', icon: Repeat },
      { view: 'calendar', label: 'Calendario', icon: Calendar },
    ],
  },
  {
    id: 'trabajo',
    label: 'Trabajo',
    icon: Briefcase,
    items: [
      { view: 'tasks', label: 'Tareas', icon: CheckSquare },
      { view: 'notes', label: 'Notas Rápidas', icon: StickyNote },
    ],
  },
];

const bottomItems: NavItem[] = [
  { view: 'settings', label: 'Configuración', icon: Settings },
];

export default function Sidebar({ currentView, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  const { user, logout } = useAuth();
  const { sidebarColor } = useTheme();

  // Abre por defecto el grupo que contiene la vista actual
  const groupOfCurrentView = groups.find((g) => g.items.some((i) => i.view === currentView))?.id;
  const [openGroup, setOpenGroup] = useState<string | null>(groupOfCurrentView ?? 'salud');

  const toggleGroup = (id: string) => {
    setOpenGroup((prev) => (prev === id ? null : id));
  };

  const renderNavButton = (item: NavItem) => {
    const isActive = currentView === item.view;
    const Icon = item.icon;
    return (
      <button
        key={item.view}
        onClick={() => onNavigate(item.view)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
          isActive
            ? 'bg-gradient-to-r from-violet-600/30 to-violet-500/10 text-lavender-100'
            : 'text-violet-200/50 hover:text-violet-100 hover:bg-violet-500/10'
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-lavender-300 to-violet-400" />
        )}
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-lavender-200' : ''}`} />
        {!collapsed && (
          <span className="text-sm font-medium animate-fade-in">{item.label}</span>
        )}
        {collapsed && (
          <span className="absolute left-full ml-3 px-2 py-1 rounded-lg glass-strong text-xs text-lavender-100 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            {item.label}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Overlay para móvil */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggleCollapse}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-40 transition-all duration-300 ${
          collapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-72'
        } flex-shrink-0`}
      >
        <div
          className="h-full glass-strong sidebar-surface border-r border-violet-500/15 flex flex-col"
          data-sidebar-color={sidebarColor}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 p-5 border-b border-violet-500/10">
            {!collapsed && (
              <div className="animate-fade-in">
                <h1 className="text-lg font-bold gradient-text font-display leading-none">
                  LifeSync
                </h1>
                <p className="text-[10px] text-violet-200/40 mt-0.5 tracking-widest uppercase">
                  Pro
                </p>
              </div>
            )}

            {/* Botón colapsar (desktop) */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex ml-auto w-7 h-7 rounded-lg btn-ghost items-center justify-center transition-transform"
              style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
            {renderNavButton(topItem)}

            {groups.map((group) => {
              const GroupIcon = group.icon;
              const isOpen = openGroup === group.id;
              const groupHasActive = group.items.some((i) => i.view === currentView);

              return (
                <div key={group.id} className="pt-1">
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                      groupHasActive
                        ? 'text-lavender-100'
                        : 'text-violet-200/50 hover:text-violet-100 hover:bg-violet-500/10'
                    }`}
                  >
                    <GroupIcon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="text-sm font-medium animate-fade-in flex-1 text-left">
                          {group.label}
                        </span>
                        <ChevronDown
                          className="w-4 h-4 transition-transform"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                        />
                      </>
                    )}
                    {collapsed && (
                      <span className="absolute left-full ml-3 px-2 py-1 rounded-lg glass-strong text-xs text-lavender-100 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                        {group.label}
                      </span>
                    )}
                  </button>

                  {/* Items del grupo: en modo colapsado se muestran siempre (planos); expandido, según acordeón */}
                  {(collapsed || isOpen) && (
                    <div className={collapsed ? 'space-y-1' : 'pl-4 mt-1 space-y-1 animate-fade-in'}>
                      {group.items.map(renderNavButton)}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-2 mt-2 border-t border-violet-500/10 space-y-1">
              {bottomItems.map(renderNavButton)}
            </div>
          </nav>

          {/* Perfil + Logout */}
          <div className="p-3 border-t border-violet-500/10 space-y-2">
            <button
              onClick={() => onNavigate('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-violet-500/10 ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-neon-purple flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'M'}
              </div>
              {!collapsed && (
                <div className="text-left animate-fade-in overflow-hidden">
                  <p className="text-sm font-medium text-lavender-100 truncate">{user?.name || 'Mauro'}</p>
                  <p className="text-xs text-violet-200/40 truncate">{user?.email || 'mauro@ejemplo.com'}</p>
                </div>
              )}
            </button>

            <button
              onClick={logout}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-violet-200/50 hover:text-red-300 hover:bg-red-500/10 transition-all ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}