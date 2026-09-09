// =====================================================
// TARJETA DE RECORDATORIO — Componente individual
// =====================================================
// Muestra un recordatorio social, pago, cita o evento.

import {
  Film, Church, CreditCard, Stethoscope, Users,
  Calendar, MapPin, X, Clock,
} from 'lucide-react';
import type { Reminder, ReminderType } from '@/types';
import { useData } from '@/context/DataContext';

const reminderConfig: Record<ReminderType, { icon: typeof Film; label: string; color: string; bg: string }> = {
  social: { icon: Users, label: 'Social', color: 'text-yellow-300', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  pago: { icon: CreditCard, label: 'Pago', color: 'text-green-300', bg: 'bg-green-500/10 border-green-500/20' },
  cita: { icon: Stethoscope, label: 'Cita', color: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  evento: { icon: Calendar, label: 'Evento', color: 'text-lavender-300', bg: 'bg-lavender-400/10 border-lavender-400/20' },
  personal: { icon: Users, label: 'Personal', color: 'text-pink-300', bg: 'bg-pink-500/10 border-pink-500/20' },
};

function formatDateLabel(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  if (diff < 7) return `En ${diff} días`;
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[d.getDay()];
}

export default function ReminderCard({ reminder }: { reminder: Reminder }) {
  const { dismissReminder } = useData();
  const config = reminderConfig[reminder.type];
  const Icon = config.icon;

  return (
    <div className={`glass-card p-4 border ${config.bg} group`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg.replace('border-', 'bg-')}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium text-lavender-100">{reminder.title}</h4>
            <button
              onClick={() => dismissReminder(reminder.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-300/40 hover:text-red-300 flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {reminder.description && (
            <p className="text-xs text-violet-200/50 mt-1 line-clamp-2">{reminder.description}</p>
          )}

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] text-violet-200/60">
              <Calendar className="w-3 h-3" />
              {formatDateLabel(reminder.date)}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-violet-200/60">
              <Clock className="w-3 h-3" />
              {reminder.time}
            </span>
            {reminder.location && (
              <span className="inline-flex items-center gap-1 text-[10px] text-violet-200/60">
                <MapPin className="w-3 h-3" />
                {reminder.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
