// =====================================================
// VISTA DE LOGIN / REGISTRO
// =====================================================
// Pantalla de autenticación con glassmorphism y tonos violeta.
// TODO: Conectar aquí la API de autenticación con Token.
// TODO: Reemplazar las funciones simuladas con fetch al backend.

import { useState, useEffect } from 'react';
import {
  Eye, EyeOff, Mail, Lock, User as UserIcon,
  Sparkles, ArrowRight, CheckCircle2, AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AuthView() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Validación visual en tiempo real
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6;
  const nameValid = name.length >= 2;

  const canSubmit =
    mode === 'login'
      ? emailValid && passwordValid
      : emailValid && passwordValid && nameValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!canSubmit) return;

    setLoading(true);

    // TODO: Conectar aquí la API de autenticación con Token
    // Ejemplo:
    // const res = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await res.json();
    // if (!res.ok) { setError(data.message); setLoading(false); return; }
    // login(data.token, data.user);

    // SIMULACIÓN de llamada al backend
    await new Promise((r) => setTimeout(r, 900));

    const result =
      mode === 'login'
        ? await login(email, password)
        : await register(name, email, password);

    if (!result.success) {
      setError(result.error || 'Ocurrió un error');
    }
    setLoading(false);
  };

  // Limpiar mensajes al cambiar de modo
  useEffect(() => {
    setError('');
    setSuccessMsg('');
  }, [mode]);

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Orbes decorativos de fondo */}
      <div className="orb w-[500px] h-[500px] bg-violet-600 -top-32 -left-32 animate-float" />
      <div className="orb w-[400px] h-[400px] bg-neon-purple top-1/2 -right-32 animate-float" style={{ animationDelay: '2s' }} />
      <div className="orb w-[300px] h-[300px] bg-lavender-400 bottom-0 left-1/3 animate-float" style={{ animationDelay: '4s' }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(196, 181, 253, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 181, 253, 1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md animate-scale-in">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass-strong neon-border mb-4 animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-lavender-300" />
          </div>
          <h1 className="text-4xl font-bold gradient-text font-display tracking-tight">
            LifeSync Pro
          </h1>
          <p className="text-violet-200/60 mt-2 text-sm">
            Tu centro de control personal para trabajo, vida y salud
          </p>
        </div>

        {/* Card glassmorphism */}
        <div className="glass-strong rounded-3xl p-8 neon-border">
          {/* Toggle Login / Register */}
          <div className="flex gap-2 p-1 rounded-xl bg-ink-900/50 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-lavender-100 shadow-lg'
                  : 'text-violet-200/50 hover:text-violet-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-lavender-100 shadow-lg'
                  : 'text-violet-200/50 hover:text-violet-200'
              }`}
            >
              Crear Cuenta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nombre (solo registro) */}
            {mode === 'register' && (
              <div className="animate-fade-in-down">
                <label className="block text-xs font-medium text-violet-200/70 mb-1.5">
                  Nombre completo
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-300/50" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Mauro Restrepo"
                    className="input-violet w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                  />
                  {nameValid && name.length > 0 && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
            )}

            {/* Campo Email */}
            <div>
              <label className="block text-xs font-medium text-violet-200/70 mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-300/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mauro@ejemplo.com"
                  className="input-violet w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                />
                {emailValid && email.length > 0 && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                )}
              </div>
            </div>

            {/* Campo Password */}
            <div>
              <label className="block text-xs font-medium text-violet-200/70 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-300/50" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-violet w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-300/50 hover:text-violet-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Indicador de fortaleza de contraseña */}
              {password.length > 0 && (
                <div className="mt-2 flex gap-1">
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 1 ? 'bg-red-400' : 'bg-violet-900/50'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 4 ? 'bg-yellow-400' : 'bg-violet-900/50'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 6 ? 'bg-green-400' : 'bg-violet-900/50'}`} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 10 ? 'bg-green-400' : 'bg-violet-900/50'}`} />
                </div>
              )}
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 animate-fade-in-down">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300">{error}</span>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                canSubmit && !loading
                  ? 'btn-primary'
                  : 'bg-violet-900/30 text-violet-300/30 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-lavender-200 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Conectando...</span>
                </>
              ) : (
                <>
                  <span className="text-sm">
                    {mode === 'login' ? 'Entrar a LifeSync' : 'Crear mi cuenta'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-violet-500/20" />
            <span className="text-xs text-violet-200/40">o continúa con</span>
            <div className="flex-1 h-px bg-violet-500/20" />
          </div>

          {/* Botones sociales (decorativos — TODO: conectar OAuth) */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-ghost py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" opacity=".8" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" opacity=".6" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" opacity=".9" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="btn-ghost py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Apple
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-violet-200/30 mt-6">
          Al continuar, aceptas los Términos de Servicio y la Política de Privacidad
        </p>
      </div>
    </div>
  );
}
