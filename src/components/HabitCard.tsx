// =====================================================
// TARJETA DE HÁBITO — Componente individual
// =====================================================
// Muestra un hábito con su progreso, racha y botones de incremento.

import {
  Droplets, Pill, Dumbbell, Brain, BookOpen,
  Moon, Footprints, Apple, Plus, Minus, Flame,
} from 'lucide-react';
import type { Habit, HabitIcon as HabitIconType } from '@/types';
import { useData } from '@/context/DataContext';

const habitIconMap: Record<HabitIconType, typeof Droplets> = {
  agua: Droplets,
  pastilla: Pill,
  gimnasio: Dumbbell,
  meditar: Brain,
  leer: BookOpen,
  dormir: Moon,
  caminar: Footprints,
  vitamina: Apple,
};

export default function HabitCard({ habit }: { habit: Habit }) {
  const { incrementHabit, decrementHabit } = useData();
  const Icon = habitIconMap[habit.icon] || Droplets;
  const progress = Math.min((habit.completedToday / habit.target) * 100, 100);
  const isComplete = habit.completedToday >= habit.target;

  return (
    <div
      className="glass-card p-4 flex flex-col gap-3 transition-all"
      style={{ borderColor: isComplete ? `${habit.color}40` : undefined }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${habit.color}20`, color: habit.color }}
          >
            <Icon className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-lavender-100">{habit.name}</p>
            <p className="text-[10px] text-violet-200/40 capitalize">{habit.type}</p>
          </div>
        </div>

        {/* Racha */}
        {habit.streak > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-bold text-orange-300">{habit.streak}</span>
          </div>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-violet-200/60">
            {habit.completedToday} / {habit.target}
          </span>
          <span className="font-medium" style={{ color: isComplete ? habit.color : '#c4b5fd' }}>
            {isComplete ? 'Completado' : `${Math.round(progress)}%`}
          </span>
        </div>
        <div className="h-2 rounded-full bg-violet-900/40 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${habit.color}80, ${habit.color})`,
              boxShadow: isComplete ? `0 0 12px ${habit.color}80` : undefined,
            }}
          />
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrementHabit(habit.id)}
          className="w-8 h-8 rounded-lg btn-ghost flex items-center justify-center"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => incrementHabit(habit.id)}
          className="flex-1 h-8 rounded-lg btn-ghost flex items-center justify-center gap-1.5 text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          Registrar
        </button>
      </div>
    </div>
  );
}
