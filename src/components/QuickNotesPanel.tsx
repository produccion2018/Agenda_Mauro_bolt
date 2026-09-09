// =====================================================
// NOTAS RÁPIDAS — Módulo de notas de voz y texto
// =====================================================
// Permite crear notas rápidas de texto o simular notas de voz.
// TODO: Conectar aquí la grabación de audio real con MediaRecorder API.
// TODO: Sincronizar notas con el Backend.

import { useState, useRef } from 'react';
import {
  StickyNote, Mic, Send, Pin, Trash2, Play, Pause,
} from 'lucide-react';
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

export default function QuickNotesPanel() {
  const { notes, addNote, deleteNote, togglePinNote } = useData();
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const recordTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleSendText = () => {
    if (!input.trim()) return;
    addNote(input.trim(), 'texto');
    setInput('');
  };

  // TODO: Conectar aquí la grabación de audio real con MediaRecorder API
  // const mediaRecorder = new MediaRecorder(stream);
  // mediaRecorder.start();
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordTime(0);
    recordTimer.current = setInterval(() => {
      setRecordTime((t) => t + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    if (recordTimer.current) clearInterval(recordTimer.current);
    setIsRecording(false);
    // SIMULACIÓN: Guarda como nota de voz con el tiempo grabado
    // TODO: Reemplazar con el audio real grabado
    if (recordTime > 0) {
      addNote(
        `Nota de voz (${recordTime}s) — grabada el ${new Date().toLocaleString('es-CO')}`,
        'voz',
        recordTime
      );
    }
    setRecordTime(0);
  };

  // Notas ordenadas: fijadas primero
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="glass-card p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
          <StickyNote className="w-4 h-4 text-lavender-200" />
        </div>
        <h3 className="text-sm font-semibold text-lavender-100">Notas Rápidas</h3>
      </div>

      {/* Input de nota */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
          placeholder="Escribe una idea rápida..."
          className="input-violet flex-1 px-3 py-2 rounded-xl text-sm"
        />
        <button
          onClick={handleSendText}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center flex-shrink-0 disabled:opacity-30"
        >
          <Send className="w-4 h-4" />
        </button>
        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
            isRecording
              ? 'bg-red-500/20 text-red-300 animate-pulse-glow'
              : 'btn-ghost'
          }`}
          title={isRecording ? 'Detener grabación' : 'Nota de voz'}
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Indicador de grabación */}
      {isRecording && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs text-red-300">Grabando... {recordTime}s</span>
        </div>
      )}

      {/* Lista de notas */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 min-h-0">
        {sortedNotes.length === 0 ? (
          <div className="p-6 text-center text-violet-200/40 text-xs">
            No tienes notas aún. ¡Escribe una idea!
          </div>
        ) : (
          sortedNotes.map((note: QuickNote) => (
            <div
              key={note.id}
              className={`group p-3 rounded-xl transition-all ${
                note.pinned
                  ? 'bg-lavender-400/10 border border-lavender-400/20'
                  : 'bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/10'
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  {note.type === 'voz' ? (
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg btn-ghost flex items-center justify-center flex-shrink-0">
                        <Play className="w-3 h-3" />
                      </button>
                      <div className="flex items-center gap-0.5 flex-1">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-0.5 rounded-full bg-lavender-300/40"
                            style={{ height: `${4 + Math.random() * 12}px` }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-violet-200/40 flex-shrink-0">
                        {note.duration}s
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-violet-100/80">{note.content}</p>
                  )}
                  <p className="text-[10px] text-violet-300/30 mt-1">{timeAgo(note.timestamp)}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => togglePinNote(note.id)}
                    className={`p-1 rounded transition-colors ${
                      note.pinned ? 'text-lavender-300' : 'text-violet-300/40 hover:text-violet-200'
                    }`}
                  >
                    <Pin className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-1 rounded text-violet-300/40 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
