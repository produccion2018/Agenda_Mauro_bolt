// =====================================================
// VISTA DE TAREAS
// =====================================================
// Lista completa de tareas con filtros por categoría y prioridad.
// TODO: Sincronizar tareas con el Backend (CRUD completo).

import { useState } from 'react';
import { Plus, Filter, Briefcase, User, Heart, Users, DollarSign } from 'lucide-react';
import { useData } from '@/context/DataContext';
import TaskCard from '@/components/TaskCard';
import type { TaskCategory } from '@/types';

const categories: { value: TaskCategory | 'todas'; label: string; icon: typeof Briefcase }[] = [
  { value: 'todas', label: 'Todas', icon: Filter },
  { value: 'trabajo', label: 'Trabajo', icon: Briefcase },
  { value: 'personal', label: 'Personal', icon: User },
  { value: 'salud', label: 'Salud', icon: Heart },
  { value: 'social', label: 'Social', icon: Users },
  { value: 'finanzas', label: 'Finanzas', icon: DollarSign },
];

export default function TasksView() {
  const { tasks, addTask } = useData();
  const [filter, setFilter] = useState<TaskCategory | 'todas'>('todas');
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<TaskCategory>('trabajo');
  const [newPriority, setNewPriority] = useState<'alta' | 'media' | 'baja'>('media');
  const [newDate, setNewDate] = useState('');

  const filteredTasks = filter === 'todas'
    ? tasks
    : tasks.filter((t) => t.category === filter);

  const pending = filteredTasks.filter((t) => !t.completed);
  const completed = filteredTasks.filter((t) => t.completed);

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle.trim(),
      description: newDesc.trim(),
      category: newCategory,
      priority: newPriority,
      dueDate: newDate ? new Date(newDate).toISOString() : new Date(Date.now() + 7 * 86400000).toISOString(),
    });
    setNewTitle('');
    setNewDesc('');
    setNewDate('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text font-display">Tareas y Entregas</h1>
          <p className="text-sm text-violet-200/50 mt-1">
            {pending.length} pendientes · {completed.length} completadas
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-4 py-2.5 rounded-xl text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nueva tarea
        </button>
      </div>

      {/* Formulario de nueva tarea */}
      {showForm && (
        <div className="glass-card p-5 space-y-3 animate-fade-in-down">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título de la tarea (ej: Entrega de informe trimestral)"
            className="input-violet w-full px-4 py-2.5 rounded-xl text-sm"
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Descripción (opcional)"
            rows={2}
            className="input-violet w-full px-4 py-2.5 rounded-xl text-sm resize-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
              className="input-violet px-3 py-2.5 rounded-xl text-sm"
            >
              <option value="trabajo">Trabajo</option>
              <option value="personal">Personal</option>
              <option value="salud">Salud</option>
              <option value="social">Social</option>
              <option value="finanzas">Finanzas</option>
            </select>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as 'alta' | 'media' | 'baja')}
              className="input-violet px-3 py-2.5 rounded-xl text-sm"
            >
              <option value="alta">Prioridad Alta</option>
              <option value="media">Prioridad Media</option>
              <option value="baja">Prioridad Baja</option>
            </select>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="input-violet px-3 py-2.5 rounded-xl text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddTask} className="btn-primary px-4 py-2 rounded-xl text-sm flex-1">
              Crear tarea
            </button>
            <button onClick={() => setShowForm(false)} className="btn-ghost px-4 py-2 rounded-xl text-sm">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                filter === cat.value
                  ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-lavender-100'
                  : 'btn-ghost'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Lista de tareas pendientes */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3">Pendientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pending.length === 0 ? (
            <p className="text-sm text-violet-200/40 col-span-2 text-center py-8">
              No tienes tareas pendientes en esta categoría
            </p>
          ) : (
            pending.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>

      {/* Lista de tareas completadas */}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-violet-200/60 mb-3">Completadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {completed.map((task) => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>
      )}
    </div>
  );
}
