// =====================================================
// VISTA DE RECUPERACIÓN DE CONTRASEÑA
// =====================================================
// Pantalla para cuando el usuario olvidó su contraseña.
// TODO: Conectar aquí la API real de recuperación de contraseña.

import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';

interface ForgotPasswordViewProps {
  onBack: () => void;
}

export default function ForgotPasswordView({ onBack }: ForgotPasswordViewProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!emailValid) {
      setError('Introduce un correo válido.');
      return;
    }
    setLoading(true);

    // TODO: Conectar aquí la API real de recuperación
    // Ejemplo:
    // await fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });

    await new Promise((r) => setTimeout(r, 900));

    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="orb w-[500px] h-[500px] -top-32 -left-32 animate-float"
        style={{ backgroundColor: 'oklch(0.55 0.25 305)' }}
      />
      <div
        className="orb w-[400px] h-[400px] top-1/2 -right-32 animate-float"
        style={{ backgroundColor: 'oklch(0.5 0.2 275)', animationDelay: '2s' }}
      />

      <div className="relative z-10 w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text tracking-tight">
            LifeSync Pro
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'oklch(0.72 0.045 300)' }}>
            Recuperar contraseña
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-8 animate-card-in">
          {!sent ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'oklch(0.62 0.24 300 / 15%)' }}
                >
                  <KeyRound className="w-5 h-5" style={{ color: 'oklch(0.78 0.16 305)' }} />
                </div>
                <h2 className="text-lg font-semibold" style={{ color: 'oklch(0.96 0.012 300)' }}>
                  ¿Olvidaste tu contraseña?
                </h2>
              </div>
              <p className="text-sm mb-6" style={{ color: 'oklch(0.72 0.045 300)' }}>
                Escribí tu correo y te vamos a enviar las instrucciones para crear una nueva contraseña.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'oklch(0.72 0.045 300)' }}>
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: 'oklch(0.72 0.045 300 / 70%)' }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mauro@ejemplo.com"
                      className="input-violet w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Enviando...</span>
                    </>
                  ) : (
                    <span className="text-sm">Enviar instrucciones</span>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 animate-fade-in-down">
              <div
                className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                style={{ background: 'oklch(0.75 0.17 160 / 15%)' }}
              >
                <CheckCircle2 className="w-7 h-7 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: 'oklch(0.96 0.012 300)' }}>
                Revisá tu correo
              </h2>
              <p className="text-sm" style={{ color: 'oklch(0.72 0.045 300)' }}>
                Te enviamos las instrucciones a <strong>{email}</strong> para restablecer tu contraseña.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onBack}
            className="mt-6 w-full flex items-center justify-center gap-1.5 text-xs transition-colors"
            style={{ color: 'oklch(0.72 0.045 300)' }}
          >
            <ArrowLeft className="h-3 w-3" />
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}