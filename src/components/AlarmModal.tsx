// =====================================================
// MODAL DE ALARMA / ALERTA ACTIVA
// =====================================================
// Pantalla inmersiva de alarma con diseño a pantalla completa.
// TODO: Conectar aquí sonidos o alarmas reales (Web Audio API).
// TODO: Sincronizar con el backend para recibir alertas push.

import { useEffect, useState } from 'react';
import {
  AlarmClock, MapPin, X, Clock, Bell,
  Zap, Calendar,
} from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function AlarmModal() {
  const { alarm, dismissAlarm, snoozeAlarm } = useData();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Reloj en vivo dentro del modal
  useEffect(() => {
    if (!alarm) return;
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [alarm]);

  if (!alarm) return null;

  const typeConfig = {
    urgente: { color: '#ef4444', bg: 'from-red-950 to-ink-950', icon: Zap },
    recordatorio: { color: '#bf5af2', bg: 'from-violet-950 to-ink-950', icon: Bell },
    despertador: { color: '#22d3ee', bg: 'from-cyan-950 to-ink-950', icon: AlarmClock },
  };
  const config = typeConfig[alarm.type];
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in">
      {/* Fondo a pantalla completa */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} animate-gradient-shift`} style={{ backgroundSize: '400% 400%' }} />

      {/* Orbes pulsantes */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-alarm-ring"
        style={{ backgroundColor: `${config.color}30` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-alarm-ring"
        style={{ backgroundColor: `${config.color}20`, animationDelay: '0.5s' }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 max-w-lg text-center animate-scale-in">
        {/* Icono de alarma pulsante */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center animate-alarm-ring"
          style={{
            background: `linear-gradient(135deg, ${config.color}30, ${config.color}10)`,
            border: `2px solid ${config.color}50`,
          }}
        >
          <Icon className="w-12 h-12" style={{ color: config.color }} />
        </div>

        {/* Etiqueta de tipo */}
        <span
          className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ backgroundColor: `${config.color}20`, color: config.color }}
        >
          {alarm.type === 'urgente' ? 'Alerta Urgente' : alarm.type === 'despertador' ? 'Despertador' : 'Recordatorio'}
        </span>

        {/* Hora actual grande */}
        <div>
          <p className="text-6xl font-bold font-display text-white neon-text tracking-tight">
            {currentTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-sm text-violet-200/50 mt-1">
            {currentTime.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Título y mensaje */}
        <div className="glass-strong rounded-2xl p-6 w-full">
          <h2 className="text-2xl font-bold text-lavender-100 mb-2">{alarm.title}</h2>
          <p className="text-sm text-violet-200/60 leading-relaxed">{alarm.message}</p>

          {/* Info extra */}
          <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10">
              <Clock className="w-3.5 h-3.5 text-lavender-300" />
              <span className="text-xs text-violet-200/70">{alarm.time}</span>
            </div>
            {alarm.location && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10">
                <MapPin className="w-3.5 h-3.5 text-lavender-300" />
                <span className="text-xs text-violet-200/70">{alarm.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={snoozeAlarm}
            className="flex-1 py-3.5 rounded-2xl glass border border-violet-500/30 text-violet-200 font-medium text-sm hover:bg-violet-500/15 transition-all flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Posponer 10 min
          </button>
          <button
            onClick={dismissAlarm}
            className="flex-1 py-3.5 rounded-2xl btn-primary text-sm flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Descartar
          </button>
        </div>
      </div>
    </div>
  );
}
