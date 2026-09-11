// =====================================================
// DATOS INICIALES (SEED DATA)
// =====================================================
// Arrancan vacíos a propósito: Mauro va a cargar sus propios datos
// de prueba desde la app para entender el flujo antes de conectar el backend real.
// TODO: Reemplazar con datos reales del backend cuando esté conectado.
// TODO: Sincronizar recordatorios, tareas y hábitos con el Backend.

import type {
  Task,
  Habit,
  Reminder,
  AppNotification,
  QuickNote,
  ActiveAlarm,
} from '@/types';

export const seedTasks: Task[] = [];

export const seedHabits: Habit[] = [];

export const seedReminders: Reminder[] = [];

export const seedNotifications: AppNotification[] = [];

export const seedNotes: QuickNote[] = [];

// Alarma de ejemplo: se deja para poder seguir usando el botón "Probar Alarma"
export const seedAlarm: ActiveAlarm = {
  id: 'a1',
  title: '¡Es hora de ir al gimnasio!',
  message: 'Mauro, tienes que ir al gimnasio a las 6:00 PM. Tu rutina de hoy: piernas y core. No olvides la botella de agua.',
  time: '18:00',
  location: 'SmartFit — Sede El Poblado',
  type: 'recordatorio',
};