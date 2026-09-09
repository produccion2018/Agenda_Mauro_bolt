// =====================================================
// CONTEXTO DE DATOS DE LA APLICACIÓN
// =====================================================
// Gestiona tareas, hábitos, recordatorios, notificaciones,
// notas rápidas y alarmas en el estado del cliente.
// TODO: Sincronizar recordatorios con el Backend.
// TODO: Reemplazar los datos seed con fetch al backend.
// TODO: Persistir cambios (crear/editar/eliminar) vía API REST.

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  Task,
  Habit,
  Reminder,
  AppNotification,
  QuickNote,
  ActiveAlarm,
  EnergyState,
} from '@/types';
import {
  seedTasks,
  seedHabits,
  seedReminders,
  seedNotifications,
  seedNotes,
  seedAlarm,
} from '@/data/seedData';

interface DataContextValue {
  tasks: Task[];
  habits: Habit[];
  reminders: Reminder[];
  notifications: AppNotification[];
  notes: QuickNote[];
  alarm: ActiveAlarm | null;
  energy: EnergyState;

  // Tareas
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  deleteTask: (id: string) => void;

  // Hábitos
  incrementHabit: (id: string) => void;
  decrementHabit: (id: string) => void;
  resetHabits: () => void;

  // Recordatorios
  dismissReminder: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id' | 'notified'>) => void;

  // Notificaciones
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;

  // Notas rápidas
  addNote: (content: string, type: 'texto' | 'voz', duration?: number) => void;
  deleteNote: (id: string) => void;
  togglePinNote: (id: string) => void;

  // Alarma
  triggerAlarm: (alarm: ActiveAlarm) => void;
  dismissAlarm: () => void;
  snoozeAlarm: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [habits, setHabits] = useState<Habit[]>(seedHabits);
  const [reminders, setReminders] = useState<Reminder[]>(seedReminders);
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);
  const [notes, setNotes] = useState<QuickNote[]>(seedNotes);
  const [alarm, setAlarm] = useState<ActiveAlarm | null>(null);

  // --- Cálculo del nivel de energía ---
  const completedHabits = habits.filter((h) => h.completedToday >= h.target).length;
  const totalHabits = habits.length;
  const level = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  const energyLabel =
    level >= 80 ? 'Energía Máxima' :
    level >= 60 ? 'Alta Energía' :
    level >= 40 ? 'Energía Media' :
    level >= 20 ? 'Baja Energía' : 'Sin Energía';

  const energy: EnergyState = {
    level,
    label: energyLabel,
    completedHabits,
    totalHabits,
  };

  // --- Tareas ---
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: `t${Date.now()}`,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Hábitos ---
  const incrementHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, completedToday: Math.min(h.completedToday + 1, h.target + 2) }
          : h
      )
    );
  }, []);

  const decrementHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, completedToday: Math.max(h.completedToday - 1, 0) }
          : h
      )
    );
  }, []);

  const resetHabits = useCallback(() => {
    setHabits((prev) => prev.map((h) => ({ ...h, completedToday: 0 })));
  }, []);

  // --- Recordatorios ---
  const dismissReminder = useCallback((id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addReminder = useCallback((reminder: Omit<Reminder, 'id' | 'notified'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: `r${Date.now()}`,
      notified: false,
    };
    setReminders((prev) => [...prev, newReminder]);
  }, []);

  // --- Notificaciones ---
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // --- Notas rápidas ---
  const addNote = useCallback((content: string, type: 'texto' | 'voz', duration?: number) => {
    const newNote: QuickNote = {
      id: `qn${Date.now()}`,
      type,
      content,
      duration,
      timestamp: new Date().toISOString(),
      pinned: false,
    };
    setNotes((prev) => [newNote, ...prev]);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const togglePinNote = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  }, []);

  // --- Alarma ---
  const triggerAlarm = useCallback((a: ActiveAlarm) => {
    setAlarm(a);
  }, []);

  const dismissAlarm = useCallback(() => {
    setAlarm(null);
  }, []);

  const snoozeAlarm = useCallback(() => {
    // TODO: Conectar aquí la lógica de posponer alarma con el backend
    // Por ahora, simplemente la oculta visualmente
    setAlarm(null);
  }, []);

  return (
    <DataContext.Provider
      value={{
        tasks,
        habits,
        reminders,
        notifications,
        notes,
        alarm,
        energy,
        toggleTask,
        addTask,
        deleteTask,
        incrementHabit,
        decrementHabit,
        resetHabits,
        dismissReminder,
        addReminder,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        addNote,
        deleteNote,
        togglePinNote,
        triggerAlarm,
        dismissAlarm,
        snoozeAlarm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData debe usarse dentro de DataProvider');
  return ctx;
}
