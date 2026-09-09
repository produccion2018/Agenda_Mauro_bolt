// =====================================================
// VISTA DE NOTAS RÁPIDAS
// =====================================================
// Página completa para gestionar todas las notas rápidas.
// TODO: Sincronizar notas con el Backend.

import { useState } from 'react';
import { StickyNote, Mic, Send, Pin, Trash2, Play } from 'lucide-react';
import { useData } from '@/context/DataContext';
import type { QuickNote } from '@/types';

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora';
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  return `hace ${Math.floor(hrs / 24)}d`;
}

export default function NotesView() {
  const { notes, addNote, deleteNote, togglePinNote } = useData();

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const textNotes = sortedNotes.filter((n) => n.type === 'texto');
  const voiceNotes = sortedNotes.filter((n) => n.type === 'voz');

  const renderNote = (note: QuickNote) => (
    <div
      key={note.id}
      className={`group glass-card p-4 ${note.pinned ? 'border-lavender-400/30' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {note.type === 'voz' ? (
            <div className="w-7 h-7 rounded-lg bg-lavender-400/10 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-lavender-300" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <StickyNote className="w-3.5 h-3.5 text-violet-300" />
            </div>
          )}
          <span className="text-[10px] text-violet-300/40 uppercase tracking-wide">
            {note.type === 'voz' ? 'Nota de voz' : 'Nota de texto'}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => togglePinNote(note.id)}
            className={`p-1 rounded transition-colors ${note.pinned ? 'text-lavender-300' : 'text-violet-300/40 hover:text-violet-200'}`}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="p-1 rounded text-violet-300/40 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {note.type === 'voz' ? (
        <div className="flex items-center gap-3 py-2">
          <button className="w-10 h-10 rounded-xl btn-ghost flex items-center justify-center flex-shrink-0">
            <Play className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-0.5 flex-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-lavender-300/40"
                style={{ height: `${4 + Math.random() * 16}px` }}
              />
            ))}
          </div>
          <span className="text-xs text-violet-200/40 flex-shrink-0">{note.duration}s</span>
        </div>
      ) : (
        <p className="text-sm text-violet-100/80 leading-relaxed">{note.content}</p>
      )}

      <p className="text-[10px] text-violet-300/30 mt-2">{timeAgo(note.timestamp)}</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-2xl font-bold gradient-text font-display">Notas Rápidas</h1>
        <p className="text-sm text-violet-200/50 mt-1">Apunta ideas al vuelo, de texto o voz</p>
      </div>

      {/* Input rápido */}
      <QuickNoteInput onAdd={addNote} />

      {/* Notas fijadas */}
      {sortedNotes.some((n) => n.pinned) && (
        <div>
          <h3 className="text-sm font-semibold text-violet-200/60 mb-3 flex items-center gap-1.5">
            <Pin className="w-3.5 h-3.5 text-lavender-300" />
            Fijadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedNotes.filter((n) => n.pinned).map(renderNote)}
          </div>
        </div>
      )}

      {/* Notas de texto */}
      {textNotes.filter((n) => !n.pinned).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-violet-200/60 mb-3">Notas de texto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {textNotes.filter((n) => !n.pinned).map(renderNote)}
          </div>
        </div>
      )}

      {/* Notas de voz */}
      {voiceNotes.filter((n) => !n.pinned).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-violet-200/60 mb-3">Notas de voz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {voiceNotes.filter((n) => !n.pinned).map(renderNote)}
          </div>
        </div>
      )}

      {notes.length === 0 && (
        <p className="text-sm text-violet-200/40 text-center py-12">
          No tienes notas aún. ¡Escribe una idea arriba!
        </p>
      )}
    </div>
  );
}

// Sub-componente para el input de notas rápidas
function QuickNoteInput({ onAdd }: { onAdd: (content: string, type: 'texto' | 'voz', duration?: number) => void }) {
  const [input, setInput] = useState('');

  return (
    <div className="glass-card p-4 flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && input.trim()) {
            onAdd(input.trim(), 'texto');
            setInput('');
          }
        }}
        placeholder="Escribe una idea, recordatorio o pensamiento rápido..."
        className="input-violet flex-1 px-4 py-2.5 rounded-xl text-sm"
      />
      <button
        onClick={() => { if (input.trim()) { onAdd(input.trim(), 'texto'); setInput(''); } }}
        disabled={!input.trim()}
        className="btn-primary px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 disabled:opacity-30"
      >
        <Send className="w-4 h-4" />
        Guardar
      </button>
    </div>
  );
}
