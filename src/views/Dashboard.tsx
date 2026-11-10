// =====================================================
// VISTA DEL DASHBOARD PRINCIPAL
// =====================================================
// Panel central que reúne tareas, hábitos, recordatorios,
// bandeja de entrada, notas rápidas, energía y alarma.
// TODO: Sincronizar todos los datos con el Backend.

import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  CheckSquare, Repeat, Bell,
  AlarmClock, TrendingUp,
  ArrowRight, Plus, CalendarDays, Sparkles,
  type LucideIcon,
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

const d = (n: number) => ({ '--d': n }) as CSSProperties;

/** Tarjeta de estadística con acento de color. */
function StatCard({ icon: Icon, value, label, color, delay }: { icon: LucideIcon; value: ReactNode; label: string; color: string; delay: number }) {
  return (
    <div className="ls-rise" style={d(delay)}>
      <div className="glass-card ls-stat p-5 h-full" style={{ '--c': color } as CSSProperties}>
        <div className="flex items-start justify-between">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color}, color-mix(in oklab, ${color} 55%, #13032a))` }}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <p className="mt-4 text-3xl font-bold font-display text-lavender-100 tabular-nums">{value}</p>
        <p className="text-xs text-violet-200/50 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

/** Estado vacío con ilustración y acción. */
function EmptyState({ icon: Icon, title, text, action, onAction }: { icon: LucideIcon; title: string; text: string; action: string; onAction: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="ls-empty-icon relative w-16 h-16 rounded-2xl border-2 border-dashed border-violet-300/30 grid place-items-center">
        <Icon className="w-7 h-7 text-lavender-200" />
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neon-purple grid place-items-center text-white">
          <Plus className="w-3 h-3" />
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-lavender-100">{title}</p>
      <p className="mt-1 text-xs text-violet-200/50 max-w-[220px]">{text}</p>
      <button onClick={onAction} className="btn-ghost mt-4 px-4 py-2 rounded-xl text-xs flex items-center gap-1.5">
        <Plus className="w-3.5 h-3.5" /> {action}
      </button>
    </div>
  );
}

interface DashboardProps {
  onNavigate: (view: AppView) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { tasks, habits, reminders, triggerAlarm } = useData();
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

  // Progreso del día (tareas + hábitos completados)
  const totalItems = totalTasks + habits.length;
  const progress = totalItems === 0 ? 0 : (completedTasks + completedHabits) / totalItems;
  const R = 50;
  const C = 2 * Math.PI * R;

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches';
  const todayRaw = now.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  const today = todayRaw.charAt(0).toUpperCase() + todayRaw.slice(1);

  return (
    <div className="space-y-6">
      {/* Banner principal */}
      <section className="ls-rise ls-hero p-6 md:p-8" style={d(0)}>
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-neon-lavender">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{today}</span>
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold font-display gradient-text">
              {greeting}, {user?.name || 'Mauro'}
            </h1>
            <p className="text-sm text-violet-200/60 mt-2 max-w-lg">
              Este es tu centro de control: entregas, hábitos y recordatorios del día en un solo lugar.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={() => onNavigate('tasks')} className="btn-primary ls-shine px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" /> Nueva tarea
              </button>
              <button onClick={() => onNavigate('habits')} className="btn-ghost px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
                <Repeat className="w-4 h-4" /> Nuevo hábito
              </button>
              <button onClick={() => onNavigate('calendar')} className="btn-ghost px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Calendario
              </button>
              <button onClick={() => triggerAlarm(seedAlarm)} className="btn-ghost px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
                <AlarmClock className="w-4 h-4 text-neon-purple" /> Probar alarma
              </button>
            </div>
          </div>

          {/* Anillo de progreso del día */}
          <div className="relative w-40 h-40 mx-auto">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <defs>
                <linearGradient id="ls-prog" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#bf5af2" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(216,180,254,0.12)" strokeWidth="9" />
              <circle
                cx="60" cy="60" r={R} fill="none" stroke="url(#ls-prog)" strokeWidth="9" strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                className="ls-ring-progress"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold font-display text-lavender-100">{Math.round(progress * 100)}%</p>
              <p className="text-[10px] uppercase tracking-widest text-violet-200/50">del día</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={CheckSquare} value={`${completedTasks}/${totalTasks}`} label="Tareas completadas" color="#8b5cf6" delay={1} />
        <StatCard icon={Repeat} value={`${completedHabits}/${habits.length}`} label="Hábitos hoy" color="#34d399" delay={2} />
        <StatCard icon={Bell} value={reminders.length} label="Recordatorios" color="#fbbf24" delay={3} />
        <StatCard
          icon={TrendingUp}
          value={habits.reduce((max, h) => Math.max(max, h.streak), 0)}
          label="Mejor racha"
          color="#22d3ee"
          delay={4}
        />
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Tareas + Energía */}
        <div className="space-y-6 ls-rise" style={d(5)}>
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
                <EmptyState
                  icon={CheckSquare}
                  title="¡Todo al día!"
                  text="No tenés tareas pendientes. Sumá una entrega o pendiente nuevo."
                  action="Crear tarea"
                  onAction={() => onNavigate('tasks')}
                />
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
        <div className="space-y-6 ls-rise" style={d(6)}>
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
            {displayHabits.length === 0 ? (
              <EmptyState
                icon={Repeat}
                title="Sin hábitos todavía"
                text="Agua, gimnasio, pastillas… armá tus rutinas y seguí tus rachas."
                action="Crear hábito"
                onAction={() => onNavigate('habits')}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayHabits.map((habit) => (
                  <HabitCard key={habit.id} habit={habit} />
                ))}
              </div>
            )}
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
            {upcomingReminders.length === 0 ? (
              <EmptyState
                icon={Bell}
                title="Nada agendado"
                text="Turnos, cumpleaños o la misa del domingo: agendalos y te avisamos a tiempo."
                action="Agendar recordatorio"
                onAction={() => onNavigate('calendar')}
              />
            ) : (
              <div className="space-y-2">
                {upcomingReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha: Bandeja + Notas */}
        <div className="space-y-6 ls-rise" style={d(7)}>
          <InboxPanel />
          <QuickNotesPanel />
        </div>
      </div>
    </div>
  );
}