// =====================================================
// VISTA DE HÁBITOS
// =====================================================
// Gestión completa de hábitos diarios con progreso y rachas.
// TODO: Sincronizar hábitos con el Backend.

import { useState } from 'react';
import { Plus, Flame, TrendingUp, Target, RotateCcw } from 'lucide-react';
import { useData } from '@/context/DataContext';
import HabitCard from '@/components/HabitCard';
import EnergyIndicator from '@/components/EnergyIndicator';

export default function HabitsView() {
  const { habits, resetHabits, energy } = useData();
  const [showReset, setShowReset] = useState(false);

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const avgCompletion = Math.round(
    habits.reduce((sum, h) => sum + Math.min((h.completedToday / h.target) * 100, 100), 0) / habits.length
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text font-display">Hábitos y Salud</h1>
          <p className="text-sm text-violet-200/50 mt-1">Mantén tus rutinas diarias y construye rachas</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowReset(!showReset)}
            className="btn-ghost px-3 py-2.5 rounded-xl text-sm flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar día
          </button>
          {showReset && (
            <button
              onClick={() => { resetHabits(); setShowReset(false); }}
              className="btn-primary px-3 py-2.5 rounded-xl text-sm"
            >
              Confirmar
            </button>
          )}
          <button className="btn-primary px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo hábito
          </button>
        </div>
      </div>

      {/* Stats de hábitos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">{totalStreak}</p>
            <p className="text-xs text-violet-200/40">Días totales</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">{bestStreak}</p>
            <p className="text-xs text-violet-200/40">Mejor racha</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
            <Target className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">{avgCompletion}%</p>
            <p className="text-xs text-violet-200/40">Cumplimiento</p>
          </div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
            <Flame className="w-5 h-5 text-green-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">{energy.completedHabits}/{energy.totalHabits}</p>
            <p className="text-xs text-violet-200/40">Completados hoy</p>
          </div>
        </div>
      </div>

      {/* Indicador de energía */}
      <EnergyIndicator />

      {/* Grid de hábitos */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3">Tus hábitos diarios</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  );
}
