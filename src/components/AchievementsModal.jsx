import React from 'react';
import { X, Lock, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/quizData';

export default function AchievementsModal({ isOpen, onClose, unlockedIds }) {
  if (!isOpen) return null;

  const unlockedSet = new Set(unlockedIds);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-up">
      <div className="glass-panel w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl p-6 sm:p-8 relative border border-violet-500/30">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-semibold uppercase tracking-wider bg-violet-500/15 text-violet-300 border border-violet-500/30 mb-2">
            Salón de Medallas ({unlockedIds.length}/{ACHIEVEMENTS.length})
          </span>
          <h2 className="text-2xl font-display font-bold text-white">
            Insignias y Logros Desbloqueables
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Cada insignia otorga una bonificación directa de XP para ascender de rango.
          </p>
        </div>

        <div className="overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedSet.has(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 transition ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-violet-500/15 via-cyan-500/10 to-transparent border-cyan-400/35 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                    : 'bg-slate-900/50 border-white/5 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked
                      ? 'bg-slate-900/80 border border-cyan-400/40'
                      : 'bg-slate-950 border border-white/10 grayscale'
                  }`}
                >
                  {ach.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-white truncate">{ach.title}</h3>
                    <span className="font-mono-tech text-[11px] font-semibold text-amber-300 shrink-0">
                      +{ach.xpBonus} XP
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium">
                    {isUnlocked ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Desbloqueada
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueada
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
