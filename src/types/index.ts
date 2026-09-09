// =====================================================
// TIPOS GLOBALES DE LA APLICACIÓN
// =====================================================
// Aquí se definen todos los tipos de datos que usa LifeSync Pro.
// TODO: Cuando conectes el backend, estos tipos deben coincidir
// con los modelos de tu API REST o tu base de datos.

// --- Autenticación ---
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
}

// --- Tareas de proyectos y entregas ---
export type TaskPriority = 'alta' | 'media' | 'baja';
export type TaskCategory = 'trabajo' | 'personal' | 'salud' | 'social' | 'finanzas';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string; // ISO string
  completed: boolean;
  createdAt: string;
  project?: string;
}

// --- Hábitos y salud diaria ---
export type HabitType = 'salud' | 'bienestar' | 'productividad' | 'ejercicio';
export type HabitIcon = 'agua' | 'pastilla' | 'gimnasio' | 'meditar' | 'leer' | 'dormir' | 'caminar' | 'vitamina';

export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  type: HabitType;
  target: number; // veces al día
  completedToday: number;
  streak: number; // días consecutivos
  history: string[]; // fechas ISO completadas
  color: string;
}

// --- Recordatorios de estilo de vida y sociales ---
export type ReminderType = 'social' | 'pago' | 'cita' | 'evento' | 'personal';

export interface Reminder {
  id: string;
  title: string;
  description: string;
  type: ReminderType;
  date: string; // ISO string
  time: string; // "14:30"
  location?: string;
  notified: boolean;
}

// --- Notificaciones / Bandeja de entrada ---
export type NotificationType = 'mail' | 'alert' | 'info' | 'success' | 'warning';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  preview: string;
  sender: string;
  timestamp: string;
  read: boolean;
}

// --- Notas rápidas ---
export type NoteType = 'texto' | 'voz';

export interface QuickNote {
  id: string;
  type: NoteType;
  content: string;
  duration?: number; // segundos, si es nota de voz
  timestamp: string;
  pinned: boolean;
}

// --- Alarma / Alerta activa ---
export interface ActiveAlarm {
  id: string;
  title: string;
  message: string;
  time: string;
  location?: string;
  type: 'urgente' | 'recordatorio' | 'despertador';
}

// --- Nivel de energía / Enfoque ---
export interface EnergyState {
  level: number; // 0-100
  label: string;
  completedHabits: number;
  totalHabits: number;
}

// --- Vistas de la aplicación ---
export type AppView =
  | 'dashboard'
  | 'calendar'
  | 'tasks'
  | 'habits'
  | 'notes'
  | 'settings'
  | 'profile';
