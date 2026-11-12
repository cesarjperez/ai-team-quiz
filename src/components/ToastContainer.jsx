import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.toastKey || t.id}
          className="pointer-events-auto glass-panel rounded-2xl p-4 border border-amber-400/40 shadow-[0_0_30px_rgba(251,191,36,0.22)] flex items-center gap-3.5 animate-pop-in"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
            {t.icon || '🏅'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono-tech uppercase tracking-wider text-amber-300 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              ¡Medalla Desbloqueada!
            </div>
            <p className="text-sm font-bold text-white truncate">{t.title}</p>
            <p className="text-xs text-cyan-300 font-mono-tech">+{t.xpBonus} XP Bonus</p>
          </div>
        </div>
      ))}
    </div>
  );
}
