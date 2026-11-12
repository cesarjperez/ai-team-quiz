import React, { useState } from 'react';
import { X, UserCheck, RotateCcw, AlertTriangle } from 'lucide-react';
import { AVATARS, TEAM_ROLES } from '../data/quizData';

export default function ProfileModal({ isOpen, onClose, profile, onSave, onResetProgress }) {
  const [name, setName] = useState(profile.name || '');
  const [role, setRole] = useState(profile.role || TEAM_ROLES[0]);
  const [avatarId, setAvatarId] = useState(profile.avatarId || AVATARS[0].id);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: name.trim() || 'Agente del Equipo',
      role,
      avatarId,
      onboarded: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-up">
      <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 relative border border-cyan-500/25">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-semibold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-2">
            Identidad de Equipo
          </span>
          <h2 className="text-2xl font-display font-bold text-white">
            Configura tu Perfil Neural
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Tu nombre y rol aparecerán en tu credencial descargable para compartir con el equipo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
              Elige tu Avatar
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {AVATARS.map((av) => {
                const selected = avatarId === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatarId(av.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition cursor-pointer ${
                      selected
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.28)] scale-105'
                        : 'bg-slate-900/60 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <span className="text-2xl mb-1">{av.emoji}</span>
                    <span className="text-[10px] text-slate-300 font-medium text-center leading-tight">
                      {av.label.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Player Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Tu Nombre o Alias
            </label>
            <input
              type="text"
              maxLength={32}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. César Pérez"
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 focus:border-cyan-400 focus:outline-none text-white placeholder-slate-500 text-sm transition"
            />
          </div>

          {/* Team Role */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Especialidad / Rol en el Equipo
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/15 focus:border-cyan-400 focus:outline-none text-white text-sm transition cursor-pointer"
            >
              {TEAM_ROLES.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-white">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar progreso guardado
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-xs text-rose-200">¿Borrar XP y niveles?</span>
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                    onClose();
                  }}
                  className="px-2 py-0.5 rounded bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 cursor-pointer"
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  No
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 hover:opacity-95 shadow-[0_0_24px_rgba(34,211,238,0.3)] transition cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              Guardar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
