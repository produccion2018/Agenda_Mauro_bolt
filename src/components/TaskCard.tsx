// =====================================================
// TARJETA DE TAREA — Componente individual
// =====================================================
// Muestra una tarea con su prioridad, fecha límite y checkbox.

import {
  Circle, CheckCircle2, Calendar, Briefcase,
  Heart, User, Users, DollarSign, Trash2,
} from 'lucide-react';
import type { Task, TaskCategory, TaskPriority } from '@/types';
import { useData } from '@/context/DataContext';

const categoryConfig: Record<TaskCategory, { icon: typeof Briefcase; label: string; color: string; bg: string }> = {
  trabajo: { icon: Briefcase, label: 'Trabajo', color: 'text-lavender-300', bg: 'bg-lavender-400/10' },
  personal: { icon: User, label: 'Personal', color: 'text-cyan-300', bg: 'bg-cyan-500/10' },
  salud: { icon: Heart, label: 'Salud', color: 'text-pink-300', bg: 'bg-pink-500/10' },
  social: { icon: Users, label: 'Social', color: 'text-yellow-300', bg: 'bg-yellow-500/10' },
  finanzas: { icon: DollarSign, label: 'Finanzas', color: 'text-green-300', bg: 'bg-green-500/10' },
};

const priorityConfig: Record<TaskPriority, { label: string; color: string; dot: string }> = {
  alta: { label: 'Alta', color: 'text-red-300', dot: 'bg-red-400' },
  media: { label: 'Media', color: 'text-yellow-300', dot: 'bg-yellow-400' },
  baja: { label: 'Baja', color: 'text-green-300', dot: 'bg-green-400' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  if (diff < 0) return `Hace ${Math.abs(diff)} días`;
  if (diff <= 7) return `En ${diff} días`;
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' });
}

export default function TaskCard({ task }: { task: Task }) {
  const { toggleTask, deleteTask } = useData();
  const cat = categoryConfig[task.category];
  const pri = priorityConfig[task.priority];
  const CatIcon = cat.icon;

  return (
    <div
      className={`glass-card p-4 flex items-start gap-3 group transition-all ${
        task.completed ? 'opacity-50' : ''
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        className="mt-0.5 flex-shrink-0 transition-transform hover:scale-110"
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        ) : (
          <Circle className="w-5 h-5 text-violet-300/50 hover:text-lavender-200" />
        )}
      </button>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={`text-sm font-medium text-lavender-100 ${
              task.completed ? 'line-through' : ''
            }`}
          >
            {task.title}
          </h4>
          <button
            onClick={() => deleteTask(task.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-300/40 hover:text-red-300 flex-shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {task.description && (
          <p className="text-xs text-violet-200/50 mt-1 line-clamp-2">{task.description}</p>
        )}

        {/* Tags */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${cat.bg} ${cat.color}`}>
            <CatIcon className="w-3 h-3" />
            {cat.label}
          </span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/10 ${pri.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pri.dot}`} />
            {pri.label}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/10 text-violet-200/60">
            <Calendar className="w-3 h-3" />
            {formatDate(task.dueDate)}
          </span>
          {task.project && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/10 text-violet-200/60">
              {task.project}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
