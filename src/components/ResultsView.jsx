import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Star,
  RotateCcw,
  ArrowRight,
  LayoutGrid,
  Share2,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Zap,
  BookOpen,
  Unlock,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ResultsView({
  result,
  onRetry,
  onNextLevel,
  hasNextLevel,
  onReturnHome,
  onOpenCertificate,
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'mistakes'

  const {
    sessionTitle,
    history,
    correctCount,
    totalCount,
    pct,
    stars,
    passed,
    totalEarnedXP,
    maxSessionStreak,
    avgTimeSec,
    sessionFocusLosses = 0,
    newlyUnlockedLevelNumber,
    newlyUnlockedMedals,
  } = result;

  useEffect(() => {
    sound.levelComplete(passed);

    if (passed) {
      confetti({
        particleCount: pct === 100 ? 120 : 70,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#8b5cf6', '#ec4899', '#34d399', '#fbbf24'],
      });
    }
  }, [passed, pct]);

  const mistakesCount = history.filter((h) => !h.isCorrect).length;
  const filteredHistory =
    filter === 'mistakes' ? history.filter((h) => !h.isCorrect) : history;

  // SVG Ring calculation
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-up">
      {/* Main Score Summary Card */}
      <section className="glass-panel rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-tech font-semibold bg-slate-900/80 border border-white/10 text-cyan-300">
              {sessionTitle}
            </span>

            {sessionFocusLosses === 0 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tech font-semibold bg-emerald-500/15 border border-emerald-400/35 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                Integridad Verificada (0 salidas)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tech font-semibold bg-amber-500/15 border border-amber-400/35 text-amber-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                {sessionFocusLosses} salida{sessionFocusLosses > 1 ? 's' : ''} de pestaña
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-2">
            {pct === 100
              ? '¡Dominio Perfecto! Precisión del 100%'
              : passed
              ? '¡Misión Superada con Éxito!'
              : '¡Buen intento! Repasa y vuelve más fuerte'}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-6">
            {pct === 100
              ? 'Impecable. Dominas cada concepto técnico de este módulo bajo presión de tiempo.'
              : passed
              ? 'Has demostrado una base sólida. Revisa las explicaciones abajo para alcanzar el 100%.'
              : 'Necesitas al menos 60% de aciertos para aprobar el nivel. Revisa el desglose técnico inferior.'}
          </p>

          {/* Circular Score + Stars */}
          <div className="flex flex-col items-center justify-center my-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 136 136">
                <circle
                  cx="68"
                  cy="68"
                  r={radius}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="68"
                  cy="68"
                  r={radius}
                  stroke={passed ? '#22d3ee' : '#f43f5e'}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-bold text-3xl text-white">
                  {pct}%
                </span>
                <span className="font-mono-tech text-xs text-slate-400">
                  {correctCount}/{totalCount}
                </span>
              </div>
            </div>

            {/* Stars Row */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-8 h-8 transition-transform duration-500 ${
                    s <= stars
                      ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Unlocked Next Level Banner */}
          {newlyUnlockedLevelNumber && (
            <div className="max-w-md mx-auto mb-6 px-4 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-sm font-semibold flex items-center justify-center gap-2 animate-pop-in">
              <Unlock className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>¡Nivel {newlyUnlockedLevelNumber} desbloqueado en tu mapa!</span>
            </div>
          )}

          {/* Newly Unlocked Medals */}
          {newlyUnlockedMedals && newlyUnlockedMedals.length > 0 && (
            <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/35">
              <p className="text-xs font-mono-tech uppercase tracking-wider text-amber-300 font-bold mb-2">
                🏅 Nuevas Medallas Obtenidas
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {newlyUnlockedMedals.map((m) => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-400/30 text-xs font-bold text-white"
                  >
                    <span>{m.icon}</span>
                    <span>{m.title}</span>
                    <span className="text-amber-300 font-mono-tech">+{m.xpBonus} XP</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 4 Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
            <div className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> XP Ganado
              </div>
              <p className="font-mono-tech font-bold text-lg text-cyan-300">
                +{totalEarnedXP}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Aciertos
              </div>
              <p className="font-mono-tech font-bold text-lg text-emerald-300">
                {correctCount} de {totalCount}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Racha Máx.
              </div>
              <p className="font-mono-tech font-bold text-lg text-amber-300">
                x{maxSessionStreak}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
              <div className="text-xs text-slate-400 flex items-center justify-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-violet-400" /> Tiempo Prom.
              </div>
              <p className="font-mono-tech font-bold text-lg text-violet-300">
                {avgTimeSec}s
              </p>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 transition cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
              Mapa de Niveles
            </button>

            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-400/30 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Jugar Otra Ronda
            </button>

            <button
              type="button"
              onClick={onOpenCertificate}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 border border-violet-400/35 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Compartir Credencial
            </button>

            {passed && hasNextLevel && (
              <button
                type="button"
                onClick={onNextLevel}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 hover:opacity-95 shadow-[0_0_24px_rgba(34,211,238,0.35)] transition cursor-pointer"
              >
                <span>Siguiente Nivel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Detailed Question-by-Question Technical Review */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg sm:text-xl font-display font-bold text-white">
              Repaso Técnico de la Partida
            </h3>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-950/90 border border-white/10 self-start">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filter === 'all'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas ({history.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('mistakes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filter === 'mistakes'
                  ? 'bg-rose-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Errores ({mistakesCount})
            </button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            🎉 ¡No tuviste ningún error en esta partida!
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, idx) => (
              <div
                key={`${item.questionId}-${idx}`}
                className={`p-5 rounded-2xl border ${
                  item.isCorrect
                    ? 'bg-slate-900/55 border-emerald-500/25'
                    : 'bg-rose-950/20 border-rose-500/35'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono-tech font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300">
                    # {item.tag}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      item.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Correcta ({item.timeSpentSec}s)
                      </>
                    ) : item.focusDisqualified ? (
                      <>
                        <ShieldAlert className="w-4 h-4" /> Anulada (salida de pestaña)
                      </>
                    ) : item.timedOut ? (
                      <>
                        <XCircle className="w-4 h-4" /> Tiempo agotado (30s)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" /> Incorrecta
                      </>
                    )}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm sm:text-base mb-3">
                  {item.question}
                </h4>

                <div className="space-y-1.5 text-xs sm:text-sm mb-3">
                  {!item.isCorrect && item.selectedIndex !== null && (
                    <div className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-200">
                      <strong className="font-semibold">Tu respuesta:</strong>{' '}
                      {item.options[item.selectedIndex]}
                    </div>
                  )}
                  <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-200">
                    <strong className="font-semibold">Respuesta correcta:</strong>{' '}
                    {item.options[item.correctIndex]}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                  💡 <strong className="text-cyan-300">Explicación:</strong> {item.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
