// =====================================================
// VISTA DEL DASHBOARD PRINCIPAL
// =====================================================
// Panel central que reúne tareas, hábitos, recordatorios,
// bandeja de entrada, notas rápidas, energía y alarma.
// TODO: Sincronizar todos los datos con el Backend.

import { useState } from 'react';
import {
  CheckSquare, Repeat, Bell, Inbox,
  StickyNote, Zap, AlarmClock, TrendingUp,
  Calendar as CalendarIcon, ArrowRight,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { seedAlarm } from '@/data/seedData';
import TaskCard from '@/components/TaskCard';
import HabitCard from '@/components/HabitCard';
import ReminderCard from '@/components/ReminderCard';
import EnergyIndicator from '@/components/EnergyIndicator';
import InboxPanel from '@/components/InboxPanel';
import QuickNotesPanel from '@/components/QuickNotesPanel';
import type { AppView } from '@/types';

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { tasks, habits, reminders } = useData();
  const { triggerAlarm } = useData();
  const { user } = useAuth();
  const [showAllTasks, setShowAllTasks] = useState(false);

  // Filtrar tareas pendientes y ordenar por fecha
  const pendingTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const displayTasks = showAllTasks ? pendingTasks : pendingTasks.slice(0, 4);

  // Hábitos (mostrar 4 en el dashboard)
  const displayHabits = habits.slice(0, 4);

  // Recordatorios próximos
  const upcomingReminders = reminders
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Stats rápidas
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completedHabits = habits.filter((h) => h.completedToday >= h.target).length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header del dashboard */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text font-display">
            Centro de Control
          </h1>
          <p className="text-sm text-violet-200/50 mt-1">
            Bienvenido de vuelta, {user?.name || 'Mauro'}. Esto es lo que tienes hoy.
          </p>
        </div>

        {/* Botón de alarma de prueba */}
        <button
          onClick={() => triggerAlarm(seedAlarm)}
          className="btn-ghost px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
        >
          <AlarmClock className="w-4 h-4 text-neon-purple" />
          Probar Alarma
        </button>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-lavender-200" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">{completedTasks}/{totalTasks}</p>
            <p className="text-xs text-violet-200/40">Tareas completadas</p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
            <Repeat className="w-5 h-5 text-green-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">{completedHabits}/{habits.length}</p>
            <p className="text-xs text-violet-200/40">Hábitos hoy</p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
            <Bell className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">{reminders.length}</p>
            <p className="text-xs text-violet-200/40">Recordatorios</p>
          </div>
        </div>

        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-lavender-100">
              {habits.reduce((max, h) => Math.max(max, h.streak), 0)}
            </p>
            <p className="text-xs text-violet-200/40">Mejor racha</p>
          </div>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Tareas + Energía */}
        <div className="space-y-6">
          {/* Energía */}
          <EnergyIndicator />

          {/* Tareas */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-lavender-200" />
                </div>
                <h3 className="text-sm font-semibold text-lavender-100">Tareas y Entregas</h3>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs text-violet-300 hover:text-lavender-200 transition-colors flex items-center gap-1"
              >
                Ver todas <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {displayTasks.length === 0 ? (
                <p className="text-sm text-violet-200/40 text-center py-4">
                  No tienes tareas pendientes. ¡Todo al día!
                </p>
              ) : (
                displayTasks.map((task) => <TaskCard key={task.id} task={task} />)
              )}
            </div>
            {pendingTasks.length > 4 && (
              <button
                onClick={() => setShowAllTasks(!showAllTasks)}
                className="w-full mt-3 py-2 text-xs text-violet-300 hover:text-lavender-200 transition-colors"
              >
                {showAllTasks ? 'Ver menos' : `Ver ${pendingTasks.length - 4} más`}
              </button>
            )}
          </div>
        </div>

        {/* Columna central: Hábitos + Recordatorios */}
        <div className="space-y-6">
          {/* Hábitos */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                  <Repeat className="w-4 h-4 text-lavender-200" />
                </div>
                <h3 className="text-sm font-semibold text-lavender-100">Hábitos y Salud</h3>
              </div>
              <button
                onClick={() => onNavigate('habits')}
                className="text-xs text-violet-300 hover:text-lavender-200 transition-colors flex items-center gap-1"
              >
                Ver todos <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayHabits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </div>

          {/* Recordatorios */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-lavender-200" />
                </div>
                <h3 className="text-sm font-semibold text-lavender-100">Recordatorios de Vida</h3>
              </div>
              <button
                onClick={() => onNavigate('calendar')}
                className="text-xs text-violet-300 hover:text-lavender-200 transition-colors flex items-center gap-1"
              >
                Calendario <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {upcomingReminders.map((reminder) => (
                <ReminderCard key={reminder.id} reminder={reminder} />
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Bandeja + Notas */}
        <div className="space-y-6">
          <InboxPanel />
          <QuickNotesPanel />
        </div>
      </div>
    </div>
  );
}
