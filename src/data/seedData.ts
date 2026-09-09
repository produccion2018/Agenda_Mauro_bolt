// =====================================================
// DATOS INICIALES (SEED DATA)
// =====================================================
// Estos son datos de ejemplo realistas para mostrar la app.
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

const today = new Date();
const iso = (offsetDays: number): string => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString();
};

export const seedTasks: Task[] = [
  {
    id: 't1',
    title: 'Entrega de Proyecto Final — Dashboard de Ventas',
    description: 'Presentar el dashboard interactivo con métricas Q3 al cliente. Incluir documentación técnica y manual de usuario.',
    category: 'trabajo',
    priority: 'alta',
    dueDate: iso(18), // ~28 de Noviembre
    completed: false,
    createdAt: iso(-10),
    project: 'Dashboard Q3',
  },
  {
    id: 't2',
    title: 'Revisión de código — Pull Request #142',
    description: 'Revisar y aprobar el PR del equipo de backend con los nuevos endpoints de autenticación.',
    category: 'trabajo',
    priority: 'media',
    dueDate: iso(2),
    completed: false,
    createdAt: iso(-1),
    project: 'Auth Service',
  },
  {
    id: 't3',
    title: 'Comprar regalo de cumpleaños para Valentina',
    description: 'Le gustan los libros de ciencia ficción y el café de especialidad. Presupuesto: $50.',
    category: 'personal',
    priority: 'media',
    dueDate: iso(5),
    completed: false,
    createdAt: iso(-2),
  },
  {
    id: 't4',
    title: 'Renovar suscripción de Adobe Creative Cloud',
    description: 'Vence el 15 de diciembre. Usar tarjeta de crédito corporativa.',
    category: 'finanzas',
    priority: 'baja',
    dueDate: iso(12),
    completed: false,
    createdAt: iso(-3),
  },
  {
    id: 't5',
    title: 'Preparar presentación para reunión de inversión',
    description: '10 slides máximo. Enfoque en crecimiento de usuarios y proyección de ingresos Q4.',
    category: 'trabajo',
    priority: 'alta',
    dueDate: iso(3),
    completed: false,
    createdAt: iso(-1),
    project: 'Serie A',
  },
  {
    id: 't6',
    title: 'Llamar al dentista para reagendar cita',
    description: 'Postergar la cita del jueves al siguiente lunes a las 10am.',
    category: 'personal',
    priority: 'baja',
    dueDate: iso(1),
    completed: true,
    createdAt: iso(-4),
  },
  {
    id: 't7',
    title: 'Enviar reporte de gastos a contabilidad',
    description: 'Compilar recibos de noviembre y enviar a contabilidad@empresa.com antes del cierre.',
    category: 'finanzas',
    priority: 'media',
    dueDate: iso(7),
    completed: false,
    createdAt: iso(-1),
  },
];

export const seedHabits: Habit[] = [
  {
    id: 'h1',
    name: 'Tomar agua',
    icon: 'agua',
    type: 'salud',
    target: 8,
    completedToday: 3,
    streak: 12,
    history: [],
    color: '#22d3ee',
  },
  {
    id: 'h2',
    name: 'Tomar pastilla diaria',
    icon: 'pastilla',
    type: 'salud',
    target: 1,
    completedToday: 1,
    streak: 25,
    history: [],
    color: '#f472b6',
  },
  {
    id: 'h3',
    name: 'Ir al gimnasio',
    icon: 'gimnasio',
    type: 'ejercicio',
    target: 1,
    completedToday: 0,
    streak: 4,
    history: [],
    color: '#a78bfa',
  },
  {
    id: 'h4',
    name: 'Meditar 10 minutos',
    icon: 'meditar',
    type: 'bienestar',
    target: 1,
    completedToday: 1,
    streak: 8,
    history: [],
    color: '#c084fc',
  },
  {
    id: 'h5',
    name: 'Leer 20 páginas',
    icon: 'leer',
    type: 'productividad',
    target: 1,
    completedToday: 0,
    streak: 3,
    history: [],
    color: '#d8b4fe',
  },
];

export const seedReminders: Reminder[] = [
  {
    id: 'r1',
    title: 'Ir al cine con Camila',
    description: 'Estreno de la nueva película de Nolan. Sala IMAX, asientos F12 y F13.',
    type: 'social',
    date: iso(5), // sábado
    time: '19:30',
    location: 'Cinemark — Mall Premium',
    notified: false,
  },
  {
    id: 'r2',
    title: 'Ir a la iglesia',
    description: 'Misa dominical. Llegar 15 min antes para conseguir asiento.',
    type: 'evento',
    date: iso(6), // domingo
    time: '10:00',
    location: 'Parroquia San José',
    notified: false,
  },
  {
    id: 'r3',
    title: 'Pagar factura de electricidad',
    description: 'Vence esta semana. Monto aproximado: $85.000. Pagar online en la web de EPM.',
    type: 'pago',
    date: iso(3),
    time: '09:00',
    notified: false,
  },
  {
    id: 'r4',
    title: 'Cita médica — Control anual',
    description: 'Chequeo general con el Dr. Restrepo. Llevar exámenes de sangre previos.',
    type: 'cita',
    date: iso(10),
    time: '08:30',
    location: 'Clínica Las Vegas — Consultorio 302',
    notified: false,
  },
  {
    id: 'r5',
    title: 'Cena con mamá',
    description: 'Mamá quiere hablar sobre las vacaciones familiares. Llevar el postre.',
    type: 'social',
    date: iso(2),
    time: '20:00',
    location: 'Casa de mamá',
    notified: false,
  },
  {
    id: 'r6',
    title: 'Pagar arriendo del apartamento',
    description: 'Transferencia a la inmobiliaria. $1.800.000. Cuenta de ahorros.',
    type: 'pago',
    date: iso(8),
    time: '12:00',
    notified: false,
  },
];

export const seedNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'mail',
    title: 'Nuevo correo de María José',
    preview: 'Hola Mauro, ¿podemos reagendar la reunión del martes? Tengo un conflicto con...',
    sender: 'maria.jose@empresa.com',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n2',
    type: 'alert',
    title: '¡Tienes una entrega en 2 días!',
    preview: 'El proyecto "Dashboard Q3" vence el 28 de noviembre. Aún faltan 3 tareas por completar.',
    sender: 'Sistema de Tareas',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n3',
    type: 'mail',
    title: 'GitHub — Pull Request aprobado',
    preview: 'Tu PR #138 "Optimizar queries del calendario" fue aprobado por Sebastián.',
    sender: 'noreply@github.com',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 'n4',
    type: 'warning',
    title: 'Pendiente: Pago de factura de electricidad',
    preview: 'La factura vence en 3 días. Evita el recargo del 5% pagando antes del viernes.',
    sender: 'Recordatorio de Pagos',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'n5',
    type: 'success',
    title: '¡Racha de 25 días con la pastilla!',
    preview: 'Has mantenido tu hábito de tomar la pastilla diaria por 25 días consecutivos. ¡Increíble!',
    sender: 'LifeSync Hábitos',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: 'n6',
    type: 'mail',
    title: 'Banco — Estado de cuenta disponible',
    preview: 'Tu estado de cuenta de noviembre está disponible. Movimiento total: $4.230.500.',
    sender: 'notificaciones@banco.com',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

export const seedNotes: QuickNote[] = [
  {
    id: 'qn1',
    type: 'texto',
    content: 'Idea para el proyecto: agregar modo oscuro automático basado en la hora del día. Usar prefers-color-scheme.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    pinned: true,
  },
  {
    id: 'qn2',
    type: 'texto',
    content: 'Comprar en el super: café, pan integral, huevos, yogurt griego, banano, espinaca, pollo.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    pinned: false,
  },
  {
    id: 'qn3',
    type: 'voz',
    content: 'Recordar llamar a mi hermano Lucas para organizar el viaje a la playa en diciembre.',
    duration: 23,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    pinned: false,
  },
  {
    id: 'qn4',
    type: 'texto',
    content: 'Libro recomendado por Valentina: "Project Hail Mary" de Andy Weir. Comprar en Kindle.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    pinned: false,
  },
];

// Alarma activa de ejemplo (se puede disparar manualmente)
export const seedAlarm: ActiveAlarm = {
  id: 'a1',
  title: '¡Es hora de ir al gimnasio!',
  message: 'Mauro, tienes que ir al gimnasio a las 6:00 PM. Tu rutina de hoy: piernas y core. No olvides la botella de agua.',
  time: '18:00',
  location: 'SmartFit — Sede El Poblado',
  type: 'recordatorio',
};
