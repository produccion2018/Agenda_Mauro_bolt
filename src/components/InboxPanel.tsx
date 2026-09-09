// =====================================================
// BANDEJA DE ENTRADA — Notificaciones y correos
// =====================================================
// Simula una bandeja de entrada con correos y notificaciones importantes.
// TODO: Conectar aquí el API de correos reales o webhooks de notificaciones.

import {
  Mail, AlertCircle, CheckCircle2, Info, AlertTriangle,
  Inbox, ArrowRight,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { NotificationType } from '@/types';

const notifConfig: Record<NotificationType, { icon: typeof Mail; color: string; bg: string }> = {
  mail: { icon: Mail, color: 'text-lavender-300', bg: 'bg-lavender-400/10' },
  alert: { icon: AlertCircle, color: 'text-red-300', bg: 'bg-red-500/10' },
  info: { icon: Info, color: 'text-cyan-300', bg: 'bg-cyan-500/10' },
  success: { icon: CheckCircle2, color: 'text-green-300', bg: 'bg-green-500/10' },
  warning: { icon: AlertTriangle, color: 'text-yellow-300', bg: 'bg-yellow-500/10' },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  return `hace ${Math.floor(hrs / 24)}d`;
}

export default function InboxPanel() {
  const { notifications, markNotificationRead, unreadCount } = useData();

  return (
    <div className="glass-card p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
            <Inbox className="w-4 h-4 text-lavender-200" />
          </div>
          <h3 className="text-sm font-semibold text-lavender-100">Bandeja de Entrada</h3>
        </div>
        {unreadCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-lavender text-[10px] font-bold">
            {unreadCount} sin leer
          </span>
        )}
      </div>

      {/* Lista de notificaciones */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 min-h-0">
        {notifications.slice(0, 6).map((n) => {
          const config = notifConfig[n.type];
          const Icon = config.icon;
          return (
            <button
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group ${
                !n.read
                  ? 'bg-violet-500/8 hover:bg-violet-500/12'
                  : 'hover:bg-violet-500/5'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-xs font-medium truncate ${!n.read ? 'text-lavender-100' : 'text-violet-200/60'}`}>
                    {n.title}
                  </p>
                  {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-neon-purple flex-shrink-0" />}
                </div>
                <p className="text-[11px] text-violet-200/40 line-clamp-2 mt-0.5">{n.preview}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-violet-300/30">{n.sender}</span>
                  <span className="text-[10px] text-violet-300/30">·</span>
                  <span className="text-[10px] text-violet-300/30">{timeAgo(n.timestamp)}</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-violet-300/0 group-hover:text-violet-300/40 transition-colors flex-shrink-0 mt-2" />
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <button className="mt-3 pt-3 border-t border-violet-500/10 text-xs text-violet-300 hover:text-lavender-200 transition-colors text-center w-full">
        Ver todos los correos
      </button>
    </div>
  );
}
