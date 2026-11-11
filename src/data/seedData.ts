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

// =====================================================
// DATOS DE DEMOSTRACIÓN (solo en el recorrido automático ?tour=1)
// =====================================================
// Los usa el portfolio para mostrar la app con contenido. En el uso normal
// la app sigue arrancando vacía con los arrays de arriba.
export const isTourMode =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('tour');

const day = (offset: number, h = 10, m = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const hhmm = (h: number, m = 0) => `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

export const demoTasks: Task[] = [
  { id: 'dt1', title: 'Entregar landing de cliente', description: 'Últimos ajustes del hero y formulario de contacto', category: 'trabajo', priority: 'alta', dueDate: day(0, 18), completed: false, createdAt: day(-3), project: 'Nodo Tech' },
  { id: 'dt2', title: 'Reunión con el equipo', description: 'Revisión semanal de avances', category: 'trabajo', priority: 'media', dueDate: day(0, 11), completed: true, createdAt: day(-2), project: 'Nodo Tech' },
  { id: 'dt3', title: 'Pagar el alquiler', description: 'Transferencia antes del día 10', category: 'finanzas', priority: 'alta', dueDate: day(1, 12), completed: false, createdAt: day(-5) },
  { id: 'dt4', title: 'Turno con el dentista', description: 'Control anual', category: 'salud', priority: 'media', dueDate: day(2, 16, 30), completed: false, createdAt: day(-6) },
  { id: 'dt5', title: 'Comprar regalo de cumpleaños', description: 'Para Sofi, el sábado', category: 'social', priority: 'baja', dueDate: day(3, 19), completed: false, createdAt: day(-1) },
  { id: 'dt6', title: 'Preparar presentación', description: 'Propuesta para el nuevo cliente', category: 'trabajo', priority: 'alta', dueDate: day(1, 9), completed: false, createdAt: day(-1), project: 'Propuestas' },
  { id: 'dt7', title: 'Ordenar escritorio', description: '', category: 'personal', priority: 'baja', dueDate: day(0, 20), completed: true, createdAt: day(-1) },
];

export const demoHabits: Habit[] = [
  { id: 'dh1', name: 'Tomar agua', icon: 'agua', type: 'salud', target: 8, completedToday: 5, streak: 12, history: [], color: '#22d3ee' },
  { id: 'dh2', name: 'Pastilla de la mañana', icon: 'pastilla', type: 'salud', target: 1, completedToday: 1, streak: 30, history: [], color: '#34d399' },
  { id: 'dh3', name: 'Gimnasio', icon: 'gimnasio', type: 'ejercicio', target: 1, completedToday: 0, streak: 12, history: [], color: '#f472b6' },
  { id: 'dh4', name: 'Leer 20 minutos', icon: 'leer', type: 'productividad', target: 1, completedToday: 1, streak: 6, history: [], color: '#a78bfa' },
  { id: 'dh5', name: 'Meditar', icon: 'meditar', type: 'bienestar', target: 1, completedToday: 0, streak: 3, history: [], color: '#fbbf24' },
];

export const demoReminders: Reminder[] = [
  { id: 'dr1', title: 'Cumpleaños de Sofi', description: 'Llevar el regalo', type: 'social', date: day(3), time: hhmm(20), location: 'Palermo', notified: false },
  { id: 'dr2', title: 'Vence la tarjeta', description: 'Pagar el resumen', type: 'pago', date: day(1), time: hhmm(12), notified: false },
  { id: 'dr3', title: 'Turno médico', description: 'Control anual', type: 'cita', date: day(2), time: hhmm(16, 30), location: 'Clínica Centro', notified: false },
  { id: 'dr4', title: 'Cena con amigos', description: '', type: 'evento', date: day(5), time: hhmm(21), location: 'Centro', notified: false },
];

export const demoNotifications: AppNotification[] = [
  { id: 'dn1', type: 'mail', title: 'Nuevo pedido de presupuesto', preview: 'Hola, quiero una web para mi negocio…', sender: 'cliente@empresa.com', timestamp: day(0, 9, 15), read: false },
  { id: 'dn2', type: 'success', title: 'Pago recibido', preview: 'Se acreditó la transferencia del proyecto', sender: 'Banco', timestamp: day(0, 8, 40), read: false },
  { id: 'dn3', type: 'warning', title: 'Entrega hoy 18:00', preview: 'Landing de cliente', sender: 'LifeSync', timestamp: day(0, 8), read: true },
];

export const demoNotes: QuickNote[] = [
  { id: 'dq1', type: 'texto', content: 'Ideas para el portfolio: sumar casos de éxito y testimonios.', timestamp: day(0, 9), pinned: true },
  { id: 'dq2', type: 'texto', content: 'Comprar café y filtros.', timestamp: day(-1, 18), pinned: false },
  { id: 'dq3', type: 'voz', content: 'Nota de voz: recordatorio de la reunión', duration: 42, timestamp: day(-1, 11), pinned: false },
];

// Alarma de ejemplo: se deja para poder seguir usando el botón "Probar Alarma"
export const seedAlarm: ActiveAlarm = {
  id: 'a1',
  title: '¡Es hora de ir al gimnasio!',
  message: 'Mauro, tienes que ir al gimnasio a las 6:00 PM. Tu rutina de hoy: piernas y core. No olvides la botella de agua.',
  time: '18:00',
  location: 'SmartFit — Sede El Poblado',
  type: 'recordatorio',
};