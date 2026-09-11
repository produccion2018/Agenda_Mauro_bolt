// =====================================================
// VISTA DE LOGIN / REGISTRO
// =====================================================
// Pantalla de autenticación con glassmorphism y tonos violeta.
// TODO: Conectar aquí la API de autenticación con Token.
// TODO: Reemplazar las funciones simuladas con fetch al backend.

import { useState, useEffect } from 'react';
import {
  Eye, EyeOff, Mail, Lock, User as UserIcon,
  ArrowRight, CheckCircle2, AlertCircle, KeyRound, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ForgotPasswordView from '@/views/ForgotPasswordView';

export default function AuthView() {
  const { login, register } = useAuth();
  const [screen, setScreen] = useState<'auth' | 'forgot'>('auth');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [shake, setShake] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordValid = password.length >= 6;
  const nameValid = name.length >= 2;

  const canSubmit =
    mode === 'login'
      ? emailValid && passwordValid
      : emailValid && passwordValid && nameValid;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!canSubmit) return;

    setLoading(true);

    // TODO: Conectar aquí la API de autenticación con Token

    await new Promise((r) => setTimeout(r, 900));

    const result =
      mode === 'login'
        ? await login(email, password)
        : await register(name, email, password);

    if (!result.success) {
      setError(result.error || 'Ocurrió un error');
      triggerShake();
    }
    setLoading(false);
  };

  useEffect(() => {
    setError('');
    setSuccessMsg('');
  }, [mode]);

  if (screen === 'forgot') {
    return <ForgotPasswordView onBack={() => setScreen('auth')} />;
  }

  return (
    <main className="relative min-h-screen grid place-items-center overflow-hidden px-4 py-12">
      <div
        className="orb w-[500px] h-[500px] -top-32 -left-32 animate-float"
        style={{ backgroundColor: 'oklch(0.55 0.25 305)' }}
      />
      <div
        className="orb w-[400px] h-[400px] top-1/2 -right-32 animate-float"
        style={{ backgroundColor: 'oklch(0.5 0.2 275)', animationDelay: '2s' }}
      />
      <div
        className="orb w-[300px] h-[300px] bottom-0 left-1/3 animate-float"
        style={{ backgroundColor: 'oklch(0.6 0.22 330)', animationDelay: '4s' }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.85 0.13 300) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.13 300) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Columna izquierda: texto */}
        <div className="hidden lg:block">
          <p
            className="text-xs uppercase tracking-[0.4em]"
            style={{ color: 'oklch(0.78 0.16 305)' }}
          >
            LifeSync Pro
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-tight gradient-text">
            Tu vida entera, sincronizada.
          </h1>
          <p className="mt-5 max-w-md text-sm" style={{ color: 'oklch(0.72 0.045 300)' }}>
            Entregas de trabajo, pastillas, gimnasio, la misa del domingo y el cine del sábado.
            Un solo panel que te avisa a tiempo, con alarmas que no puedes ignorar.
          </p>
          <ul className="mt-8 space-y-3 text-sm" style={{ color: 'oklch(0.72 0.045 300)' }}>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" style={{ color: 'oklch(0.78 0.16 305)' }} />
              Sesión guardada en tu dispositivo
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" style={{ color: 'oklch(0.78 0.16 305)' }} />
              Hábitos, rachas y energía diaria
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 flex-shrink-0" style={{ color: 'oklch(0.78 0.16 305)' }} />
              Despertador visual a pantalla completa
            </li>
          </ul>
        </div>

        {/* Columna derecha: tarjeta de login */}
        <div
          className={`glass-strong rounded-3xl p-8 animate-card-in transition-transform ${
            shake ? 'animate-shake' : ''
          }`}
        >
          {/* En mobile, mostramos el título arriba de la tarjeta */}
          <div className="mb-6 text-center lg:hidden">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'oklch(0.78 0.16 305)' }}>
              LifeSync Pro
            </p>
            <h1 className="mt-2 text-2xl font-bold gradient-text">Tu vida entera, sincronizada.</h1>
          </div>

          <div className="flex gap-2 p-1 rounded-xl mb-6" style={{ background: 'oklch(0.16 0.055 300 / 50%)' }}>
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'login' ? 'btn-primary' : ''
              }`}
              style={mode !== 'login' ? { color: 'oklch(0.72 0.045 300)' } : undefined}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'register' ? 'btn-primary' : ''
              }`}
              style={mode !== 'register' ? { color: 'oklch(0.72 0.045 300)' } : undefined}
            >
              Crear Cuenta
            </button>
          </div>

          <div key={mode} className="animate-fade-slide">
            <h2 className="text-lg font-semibold" style={{ color: 'oklch(0.96 0.012 300)' }}>
              {mode === 'login' ? 'Hola de nuevo' : 'Empieza a sincronizar tu vida'}
            </h2>
            <p className="mt-1 text-sm mb-4" style={{ color: 'oklch(0.72 0.045 300)' }}>
              {mode === 'login'
                ? 'Entra para ver tus entregas y hábitos de hoy.'
                : 'Crea tu cuenta en menos de un minuto.'}
            </p>
          </div>

          <form key={mode} onSubmit={handleSubmit} className="animate-fade-slide space-y-4">
            {mode === 'register' && (
              <div className="animate-fade-in-down">
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'oklch(0.72 0.045 300)' }}>
                  Nombre completo
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.72 0.045 300 / 70%)' }} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Mauro Restrepo"
                    className="input-violet w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                  />
                  {nameValid && name.length > 0 && (
                    <CheckCircle2 className="animate-success-pop absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'oklch(0.72 0.045 300)' }}>
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.72 0.045 300 / 70%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mauro@ejemplo.com"
                  className="input-violet w-full pl-10 pr-10 py-3 rounded-xl text-sm"
                />
                {emailValid && email.length > 0 && (
                  <CheckCircle2 className="animate-success-pop absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'oklch(0.72 0.045 300)' }}>
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'oklch(0.72 0.045 300 / 70%)' }} />
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'oklch(0.72 0.045 300 / 70%)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="mt-2 flex gap-1">
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 1 ? 'bg-red-400' : ''}`} style={password.length < 1 ? { background: 'oklch(0.3 0.07 300 / 60%)' } : undefined} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 4 ? 'bg-yellow-400' : ''}`} style={password.length < 4 ? { background: 'oklch(0.3 0.07 300 / 60%)' } : undefined} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 6 ? 'bg-green-400' : ''}`} style={password.length < 6 ? { background: 'oklch(0.3 0.07 300 / 60%)' } : undefined} />
                  <div className={`h-1 flex-1 rounded-full transition-all ${password.length >= 10 ? 'bg-green-400' : ''}`} style={password.length < 10 ? { background: 'oklch(0.3 0.07 300 / 60%)' } : undefined} />
                </div>
              )}

              {mode === 'login' && (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setScreen('forgot')}
                    className="inline-flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: 'oklch(0.72 0.045 300)' }}
                  >
                    <KeyRound className="h-3 w-3" />
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="animate-fade-in-down flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                canSubmit && !loading ? 'btn-primary hover:scale-[1.01]' : 'cursor-not-allowed'
              }`}
              style={!canSubmit || loading ? { background: 'oklch(0.3 0.07 300 / 40%)', color: 'oklch(0.72 0.045 300 / 40%)' } : undefined}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
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

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'oklch(0.42 0.08 300 / 40%)' }} />
            <span className="text-xs" style={{ color: 'oklch(0.72 0.045 300 / 60%)' }}>o continúa con</span>
            <div className="flex-1 h-px" style={{ background: 'oklch(0.42 0.08 300 / 40%)' }} />
          </div>

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

          <p className="text-center text-xs mt-6" style={{ color: 'oklch(0.72 0.045 300 / 40%)' }}>
            Al continuar, aceptas los Términos de Servicio y la Política de Privacidad
          </p>
        </div>
      </div>
    </main>
  );
}