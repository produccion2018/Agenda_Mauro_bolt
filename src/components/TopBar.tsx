// =====================================================
// TOPBAR — Barra superior
// =====================================================
// Muestra saludo, reloj en vivo, notificaciones y acceso rápido.
// TODO: Conectar aquí las notificaciones push reales del backend.

import { useState, useEffect, useRef } from 'react';
import {
  Bell, Menu, Search, Zap, Plus,
  Mail, AlertCircle, CheckCircle2, Info, AlertTriangle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import type { AppView, NotificationType } from '@/types';

interface TopBarProps {
  onToggleSidebar: () => void;
  onNavigate: (view: AppView) => void;
}

const notifIcons: Record<NotificationType, typeof Bell> = {
  mail: Mail,
  alert: AlertCircle,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
};

const notifColors: Record<NotificationType, string> = {
  mail: 'text-lavender-300 bg-lavender-400/10',
  alert: 'text-red-300 bg-red-500/10',
  info: 'text-cyan-300 bg-cyan-500/10',
  success: 'text-green-300 bg-green-500/10',
  warning: 'text-yellow-300 bg-yellow-500/10',
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days}d`;
}

export default function TopBar({ onToggleSidebar, onNavigate }: TopBarProps) {
  const { user } = useAuth();
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useData();
  const [showNotifs, setShowNotifs] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const notifRef = useRef<HTMLDivElement>(null);

  // Reloj en vivo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const hour = currentTime.getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <header className="sticky top-0 z-20 glass-strong border-b border-violet-500/10 px-4 py-3 flex items-center gap-4">
      {/* Botón menú móvil */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden w-9 h-9 rounded-lg btn-ghost flex items-center justify-center"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Saludo */}
      <div className="hidden sm:block">
        <p className="text-sm text-violet-200/50">{greeting},</p>
        <p className="text-base font-semibold text-lavender-100">
          {user?.name || 'Mauro'}
        </p>
      </div>

      {/* Buscador */}
      <div className="flex-1 max-w-md mx-auto hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-300/40" />
          <input
            type="text"
            placeholder="Buscar tareas, hábitos, recordatorios..."
            className="input-violet w-full pl-10 pr-4 py-2 rounded-xl text-sm"
          />
        </div>
      </div>

      {/* Reloj */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl glass">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm font-mono text-lavender-200">
          {currentTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>

      {/* Botón añadir rápido */}
      <button
        onClick={() => onNavigate('tasks')}
        className="w-9 h-9 rounded-lg btn-primary flex items-center justify-center flex-shrink-0"
        title="Nueva tarea"
      >
        <Plus className="w-4 h-4" />
      </button>

      {/* Notificaciones */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative w-9 h-9 rounded-lg btn-ghost flex items-center justify-center flex-shrink-0"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-neon-purple to-violet-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse-glow">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown de notificaciones */}
        {showNotifs && (
          <div className="absolute right-0 top-full mt-2 w-80 glass-strong rounded-2xl border border-violet-500/20 shadow-2xl shadow-violet-900/50 overflow-hidden animate-scale-in z-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-violet-500/10">
              <h3 className="text-sm font-semibold text-lavender-100">Notificaciones</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-violet-300 hover:text-lavender-200 transition-colors"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto no-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-violet-200/40 text-sm">
                  No tienes notificaciones
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = notifIcons[n.type];
                  const colorClass = notifColors[n.type];
                  return (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`w-full flex items-start gap-3 px-4 py-3 border-b border-violet-500/5 hover:bg-violet-500/10 transition-colors text-left ${
                        !n.read ? 'bg-violet-500/5' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-lavender-100 truncate">{n.title}</p>
                        <p className="text-xs text-violet-200/50 line-clamp-2 mt-0.5">{n.preview}</p>
                        <p className="text-[10px] text-violet-300/40 mt-1">{timeAgo(n.timestamp)}</p>
                      </div>
                      {!n.read && (
                        <div className="w-2 h-2 rounded-full bg-neon-purple flex-shrink-0 mt-2" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2.5 border-t border-violet-500/10">
              <button className="w-full text-center text-xs text-violet-300 hover:text-lavender-200 transition-colors">
                Ver todas las notificaciones
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Indicador de energía rápida */}
      <button
        onClick={() => onNavigate('habits')}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl glass hover:neon-border-hover transition-all"
      >
        <Zap className="w-4 h-4 text-yellow-300" />
        <span className="text-xs font-medium text-lavender-200">Energía</span>
      </button>
    </header>
  );
}
