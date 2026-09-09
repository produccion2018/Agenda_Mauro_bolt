// =====================================================
// VISTA DE CALENDARIO
// =====================================================
// Calendario mensual interactivo con eventos y recordatorios.
// TODO: Sincronizar eventos del calendario con el Backend.

import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Clock, MapPin, Plus,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { Reminder } from '@/types';

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const reminderTypeColors: Record<string, string> = {
  social: 'bg-yellow-400',
  pago: 'bg-green-400',
  cita: 'bg-cyan-400',
  evento: 'bg-lavender-400',
  personal: 'bg-pink-400',
};

export default function CalendarView() {
  const { reminders, tasks } = useData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Construir grid del calendario
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // Eventos de un día específico
  const getEventsForDay = (day: number): { type: string; title: string; time: string; location?: string }[] => {
    const dateStr = new Date(year, month, day).toDateString();
    const events: { type: string; title: string; time: string; location?: string }[] = [];

    reminders.forEach((r: Reminder) => {
      if (new Date(r.date).toDateString() === dateStr) {
        events.push({ type: r.type, title: r.title, time: r.time, location: r.location });
      }
    });

    tasks.forEach((t) => {
      if (new Date(t.dueDate).toDateString() === dateStr) {
        events.push({ type: 'evento', title: t.title, time: '23:59' });
      }
    });

    return events;
  };

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate.getDate()) : [];
  const today = new Date();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text font-display">Calendario</h1>
          <p className="text-sm text-violet-200/50 mt-1">Tus eventos, citas y recordatorios del mes</p>
        </div>
        <button className="btn-primary px-4 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <div className="lg:col-span-2 glass-card p-6">
          {/* Navegación del mes */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-lavender-100">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="w-8 h-8 rounded-lg btn-ghost flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setCurrentDate(new Date()); setSelectedDate(new Date()); }}
                className="px-3 py-1.5 rounded-lg btn-ghost text-xs"
              >
                Hoy
              </button>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="w-8 h-8 rounded-lg btn-ghost flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-[10px] font-medium text-violet-200/40 uppercase py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Grid de días */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const events = getEventsForDay(day);
              const isToday =
                day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected =
                selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(new Date(year, month, day))}
                  className={`relative aspect-square rounded-xl p-1.5 flex flex-col items-center justify-start transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-violet-600/40 to-violet-500/20 border border-violet-400/40'
                      : isToday
                      ? 'bg-violet-500/15 border border-violet-400/30'
                      : 'hover:bg-violet-500/10'
                  }`}
                >
                  <span className={`text-sm ${isToday ? 'font-bold text-lavender-100' : 'text-violet-200/70'}`}>
                    {day}
                  </span>
                  {events.length > 0 && (
                    <div className="flex gap-0.5 mt-auto mb-1">
                      {events.slice(0, 3).map((e, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${reminderTypeColors[e.type] || 'bg-violet-400'}`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel de eventos del día seleccionado */}
        <div className="glass-card p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-lavender-200" />
            </div>
            <h3 className="text-sm font-semibold text-lavender-100">
              {selectedDate
                ? selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })
                : 'Selecciona un día'}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
            {!selectedDate ? (
              <p className="text-sm text-violet-200/40 text-center py-8">
                Haz clic en un día para ver sus eventos
              </p>
            ) : selectedEvents.length === 0 ? (
              <p className="text-sm text-violet-200/40 text-center py-8">
                No hay eventos este día
              </p>
            ) : (
              selectedEvents.map((event, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/10">
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${reminderTypeColors[event.type] || 'bg-violet-400'}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-lavender-100">{event.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="inline-flex items-center gap-1 text-[10px] text-violet-200/50">
                          <Clock className="w-3 h-3" /> {event.time}
                        </span>
                        {event.location && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-violet-200/50">
                            <MapPin className="w-3 h-3" /> {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Leyenda */}
          <div className="mt-4 pt-4 border-t border-violet-500/10 flex flex-wrap gap-3">
            {Object.entries(reminderTypeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-[10px] text-violet-200/40 capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
