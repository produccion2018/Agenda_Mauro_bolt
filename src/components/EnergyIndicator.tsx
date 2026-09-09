// =====================================================
// INDICADOR DE NIVEL DE ENERGÍA
// =====================================================
// Muestra el porcentaje de cumplimiento de hábitos del día
// con un anillo circular animado y etiqueta descriptiva.

import { Zap, Battery, BatteryLow, BatteryMedium, BatteryFull } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function EnergyIndicator() {
  const { energy } = useData();
  const { level, label, completedHabits, totalHabits } = energy;

  // Color según nivel
  const color = level >= 80 ? '#22d3ee' : level >= 60 ? '#a78bfa' : level >= 40 ? '#c084fc' : level >= 20 ? '#f472b6' : '#ef4444';
  const BatteryIcon = level >= 80 ? BatteryFull : level >= 50 ? BatteryMedium : BatteryLow;

  // Cálculo del círculo SVG
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="glass-card p-5 flex items-center gap-5">
      {/* Anillo circular */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Círculo de fondo */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="rgba(76, 29, 149, 0.3)"
            strokeWidth="8"
          />
          {/* Círculo de progreso */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.8s ease, stroke 0.5s ease',
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
        </svg>
        {/* Texto central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-display" style={{ color }}>
            {level}%
          </span>
          <span className="text-[10px] text-violet-200/40 mt-0.5">energía</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4" style={{ color }} />
          <h3 className="text-sm font-semibold text-lavender-100">{label}</h3>
        </div>
        <p className="text-xs text-violet-200/50 mb-3">
          Has completado <span className="font-medium" style={{ color }}>{completedHabits}</span> de{' '}
          <span className="font-medium text-lavender-200">{totalHabits}</span> hábitos hoy.
        </p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-all duration-500"
              style={{
                background: i < Math.round(level / 20) ? color : 'rgba(76, 29, 149, 0.3)',
                boxShadow: i < Math.round(level / 20) ? `0 0 6px ${color}80` : 'none',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-violet-200/40">
          <BatteryIcon className="w-3 h-3" />
          <span>
            {level >= 80 ? '¡Vas excelente hoy!' : level >= 50 ? 'Vas por buen camino' : 'Aún puedes completar más hábitos'}
          </span>
        </div>
      </div>
    </div>
  );
}
