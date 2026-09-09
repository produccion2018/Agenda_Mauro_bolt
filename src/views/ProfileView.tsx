// =====================================================
// VISTA DE PERFIL
// =====================================================
// Información del usuario, estadísticas y logros.
// TODO: Conectar aquí la edición de perfil con el Backend.

import {
  User as UserIcon, Mail, Calendar, Award,
  Flame, CheckCircle2, Target, TrendingUp, Edit3,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';

export default function ProfileView() {
  const { user } = useAuth();
  const { tasks, habits, notes } = useData();

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const taskRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const totalNotes = notes.length;

  const achievements = [
    { icon: Flame, label: 'Racha de 25 días', desc: 'Pastilla diaria', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { icon: CheckCircle2, label: '10 tareas completadas', desc: 'Productividad alta', color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: Target, label: '4 hábitos activos', desc: 'Constancia', color: 'text-lavender-300', bg: 'bg-lavender-400/10' },
    { icon: TrendingUp, label: '80% de cumplimiento', desc: 'Esta semana', color: 'text-cyan-300', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold gradient-text font-display">Mi Perfil</h1>
        <p className="text-sm text-violet-200/50 mt-1">Tu información y estadísticas en LifeSync Pro</p>
      </div>

      {/* Tarjeta de perfil */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-400 via-neon-purple to-violet-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-violet-500/30">
            {user?.name?.charAt(0).toUpperCase() || 'M'}
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-400 border-2 border-ink-900 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <h2 className="text-xl font-bold text-lavender-100">{user?.name || 'Mauro Restrepo'}</h2>
            <button className="p-1.5 rounded-lg btn-ghost">
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1 mt-2">
            <p className="text-sm text-violet-200/50 flex items-center gap-1.5 justify-center sm:justify-start">
              <Mail className="w-3.5 h-3.5" /> {user?.email || 'mauro@ejemplo.com'}
            </p>
            <p className="text-sm text-violet-200/50 flex items-center gap-1.5 justify-center sm:justify-start">
              <Calendar className="w-3.5 h-3.5" />
              Miembro desde {user?.joinedAt
                ? new Date(user.joinedAt).toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
                : 'Septiembre 2025'}
            </p>
          </div>
        </div>

        {/* Nivel */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl glass flex flex-col items-center justify-center">
            <span className="text-2xl font-bold gradient-text">42</span>
            <span className="text-[9px] text-violet-200/40 uppercase">Nivel</span>
          </div>
          <p className="text-[10px] text-violet-200/40 mt-1">1.240 XP</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-5 h-5 text-lavender-200" />
          </div>
          <p className="text-2xl font-bold text-lavender-100">{taskRate}%</p>
          <p className="text-xs text-violet-200/40">Tareas completadas</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center mx-auto mb-2">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-lavender-100">{bestStreak}</p>
          <p className="text-xs text-violet-200/40">Mejor racha</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-cyan-300" />
          </div>
          <p className="text-2xl font-bold text-lavender-100">{habits.length}</p>
          <p className="text-xs text-violet-200/40">Hábitos activos</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center mx-auto mb-2">
            <UserIcon className="w-5 h-5 text-pink-300" />
          </div>
          <p className="text-2xl font-bold text-lavender-100">{totalNotes}</p>
          <p className="text-xs text-violet-200/40">Notas creadas</p>
        </div>
      </div>

      {/* Logros */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-300" /> Logros Desbloqueados
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            return (
              <div key={idx} className="glass-card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ach.bg}`}>
                  <Icon className={`w-5 h-5 ${ach.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-lavender-100">{ach.label}</p>
                  <p className="text-xs text-violet-200/40">{ach.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
