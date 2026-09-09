// =====================================================
// VISTA DE CONFIGURACIÓN
// =====================================================
// Ajustes visuales de la aplicación: tema, notificaciones, alarmas.
// TODO: Conectar aquí las preferencias del usuario con el Backend.
// TODO: Configurar sonidos de alarma reales (Web Audio API).

import { useState } from 'react';
import {
  Bell, Volume2, Moon, Globe, Shield, Mail,
  Clock, Vibrate, Palette, ChevronRight,
} from 'lucide-react';

interface ToggleProps {
  label: string;
  description: string;
  icon: typeof Bell;
  defaultOn?: boolean;
}

function SettingToggle({ label, description, icon: Icon, defaultOn = true }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 hover:bg-violet-500/8 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
          <Icon className="w-4 h-4 text-lavender-200" />
        </div>
        <div>
          <p className="text-sm font-medium text-lavender-100">{label}</p>
          <p className="text-xs text-violet-200/40">{description}</p>
        </div>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-11 h-6 rounded-full transition-all ${
          on ? 'bg-gradient-to-r from-violet-500 to-violet-400' : 'bg-violet-900/50'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
            on ? 'left-5.5' : 'left-0.5'
          }`}
          style={{ left: on ? '22px' : '2px' }}
        />
      </button>
    </div>
  );
}

export default function SettingsView() {
  const [volume, setVolume] = useState(70);

  return (
    <div className="space-y-6 animate-fade-in-up max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold gradient-text font-display">Configuración</h1>
        <p className="text-sm text-violet-200/50 mt-1">Personaliza tu experiencia en LifeSync Pro</p>
      </div>

      {/* Notificaciones */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3 flex items-center gap-2">
          <Bell className="w-4 h-4" /> Notificaciones
        </h3>
        <div className="space-y-2">
          <SettingToggle
            label="Notificaciones push"
            description="Recibir alertas de tareas y recordatorios"
            icon={Bell}
          />
          <SettingToggle
            label="Notificaciones por correo"
            description="Recibir resúmenes diarios en tu email"
            icon={Mail}
            defaultOn={false}
          />
          <SettingToggle
            label="Vibración en móvil"
            description="Vibrar al recibir alertas urgentes"
            icon={Vibrate}
          />
        </div>
      </div>

      {/* Alarmas y sonidos */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3 flex items-center gap-2">
          <Volume2 className="w-4 h-4" /> Alarmas y Sonidos
        </h3>
        <div className="space-y-2">
          <SettingToggle
            label="Sonido de alarma"
            description="Reproducir sonido cuando suene una alarma"
            icon={Volume2}
          />
          <SettingToggle
            label="Sonido de notificaciones"
            description="Sonido al recibir nuevas notificaciones"
            icon={Bell}
            defaultOn={false}
          />
          {/* Volumen */}
          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <Volume2 className="w-4 h-4 text-lavender-200" />
              </div>
              <div>
                <p className="text-sm font-medium text-lavender-100">Volumen de alarma</p>
                <p className="text-xs text-violet-200/40">{volume}% de volumen</p>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-violet-900/50 accent-violet-400"
            />
          </div>
        </div>
      </div>

      {/* Apariencia */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4" /> Apariencia
        </h3>
        <div className="space-y-2">
          <SettingToggle
            label="Modo oscuro"
            description="Tema violeta oscuro elegante (recomendado)"
            icon={Moon}
          />
          <SettingToggle
            label="Animaciones"
            description="Activar transiciones y micro-interacciones"
            icon={ChevronRight}
          />
        </div>
      </div>

      {/* Privacidad */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4" /> Privacidad y Seguridad
        </h3>
        <div className="space-y-2">
          <SettingToggle
            label="Autenticación de dos factores"
            description="Capa extra de seguridad al iniciar sesión"
            icon={Shield}
            defaultOn={false}
          />
          <SettingToggle
            label="Sincronización automática"
            description="Sincronizar datos entre dispositivos"
            icon={Globe}
          />
        </div>
      </div>

      {/* Zona horaria */}
      <div>
        <h3 className="text-sm font-semibold text-violet-200/60 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Zona Horaria
        </h3>
        <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
              <Globe className="w-4 h-4 text-lavender-200" />
            </div>
            <div>
              <p className="text-sm font-medium text-lavender-100">Zona horaria actual</p>
              <p className="text-xs text-violet-200/40">America/Bogota (GMT-5)</p>
            </div>
          </div>
          <select className="input-violet w-full px-3 py-2.5 rounded-xl text-sm mt-2">
            <option>America/Bogota (GMT-5)</option>
            <option>America/Mexico_City (GMT-6)</option>
            <option>America/Buenos_Aires (GMT-3)</option>
            <option>Europe/Madrid (GMT+1)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
