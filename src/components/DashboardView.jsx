import React from 'react';
import {
  Cpu,
  Network,
  Layers,
  Database,
  Bot,
  Lock,
  Play,
  Timer,
  Star,
  Zap,
  Trophy,
  Target,
  Swords,
  UserPlus,
  CheckCircle2,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';
import { QUIZ_LEVELS } from '../data/quizData';
import { getRankInfo } from '../utils/storage';

const ICON_MAP = {
  Cpu,
  Network,
  Layers,
  Database,
  Bot,
};

export default function DashboardView({
  state,
  questionCount,
  setQuestionCount,
  onStartLevel,
  onStartArena,
  onOpenProfile,
  onOpenCertificate,
}) {
  const rankInfo = getRankInfo(state.xp);
  const accuracy =
    state.totalAnswered > 0
      ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
      : 0;
  const totalStars = QUIZ_LEVELS.reduce(
    (sum, lvl) => sum + (state.levelsProgress[lvl.id]?.stars || 0),
    0
  );
  const maxPossibleStars = QUIZ_LEVELS.length * 3;
  const completedLevels = QUIZ_LEVELS.filter(
    (lvl) => state.levelsProgress[lvl.id]?.completed
  ).length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-up">
      {/* Hero Overview Banner */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-mono-tech font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>40 RETOS TÉCNICOS • EVALUACIÓN CONTRARRELOJ PROTEGIDA</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
              {state.profile.name?.trim()
                ? `¡Hola, ${state.profile.name.trim()}! ¿Listo para subir de nivel?`
                : 'Domina la Arquitectura Moderna de IA en Equipo'}
            </h1>

            <p className="text-slate-300/90 text-sm sm:text-base mt-2.5 leading-relaxed">
              Evalúa y fortalece tus conocimientos en <strong className="text-cyan-300 font-semibold">LLMs</strong>,{' '}
              <strong className="text-violet-300 font-semibold">Protocolo MCP</strong>,{' '}
              <strong className="text-emerald-300 font-semibold">Skills Modulares</strong>,{' '}
              <strong className="text-amber-300 font-semibold">RAG Vectorial</strong> y{' '}
              <strong className="text-rose-300 font-semibold">Agentes Autónomos</strong> con retroalimentación técnica inmediata.
            </p>

            {!state.profile.onboarded && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-400/15 hover:bg-cyan-400/25 text-cyan-200 border border-cyan-400/40 transition cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  Personalizar mi nombre y rol de equipo
                </button>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 min-w-[280px] lg:min-w-[320px]">
            <div className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Nivel / Rango</span>
                <span>{rankInfo.current.badge}</span>
              </div>
              <p className="font-display font-bold text-sm text-white truncate">
                {rankInfo.current.title}
              </p>
              <p className="font-mono-tech text-xs text-cyan-300 mt-0.5">
                {state.xp.toLocaleString()} XP
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Precisión</span>
                <Target className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="font-display font-bold text-xl text-emerald-300">
                {accuracy}%
              </p>
              <p className="font-mono-tech text-[11px] text-slate-400">
                {state.totalCorrect}/{state.totalAnswered} aciertos
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/75 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Estrellas</span>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
              <p className="font-display font-bold text-xl text-amber-300">
                {totalStars} <span className="text-xs text-slate-500">/ {maxPossibleStars}</span>
              </p>
              <p className="font-mono-tech text-[11px] text-slate-400">
                {completedLevels}/5 niveles
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenCertificate}
              className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 hover:from-cyan-500/25 hover:to-violet-500/25 border border-cyan-400/30 text-left transition cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-cyan-300 mb-1">
                <span>Tarjeta Equipo</span>
                <Trophy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </div>
              <p className="font-display font-bold text-sm text-white">
                Ver Credencial
              </p>
              <p className="text-[11px] text-cyan-200/80 mt-0.5">
                Sello Integridad →
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Anti-Cheat & Session Controls */}
      <section className="glass-panel rounded-2xl p-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Escudo Antitrampa Activo
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono-tech font-semibold bg-amber-500/15 text-amber-300 border border-amber-400/30">
              <Timer className="w-3.5 h-3.5" />
              15s obligatorios / pregunta
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Bloqueo de copiado activo y monitoreo de ventana: salir de la pestaña advierte la 1ª vez y anula la pregunta si se repite.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Length Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-950/90 border border-white/10">
            <button
              type="button"
              onClick={() => setQuestionCount(5)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono-tech font-semibold transition cursor-pointer ${
                questionCount === 5
                  ? 'bg-violet-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              5 Pregs (Rápido)
            </button>
            <button
              type="button"
              onClick={() => setQuestionCount(8)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono-tech font-semibold transition cursor-pointer ${
                questionCount === 8
                  ? 'bg-violet-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              8 Pregs (Completo)
            </button>
          </div>
        </div>
      </section>

      {/* Levels Grid */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg sm:text-xl font-display font-bold text-white">
            Ruta de Aprendizaje por Niveles
          </h2>
          <span className="text-xs text-slate-400 font-mono-tech">
            60% mín. para desbloquear el siguiente
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {QUIZ_LEVELS.map((lvl, idx) => {
            const isLocked = idx >= state.unlockedLevels;
            const isFinalBossLevel = idx === QUIZ_LEVELS.length - 1;
            const prog = state.levelsProgress[lvl.id];
            const stars = prog?.stars || 0;
            const bestPct = prog?.bestPct || 0;
            const completed = Boolean(prog?.completed);
            const IconComponent = ICON_MAP[lvl.icon] || Cpu;

            return (
              <div
                key={lvl.id}
                className={`relative rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 overflow-hidden ${
                  isLocked
                    ? 'bg-slate-900/35 border-white/5 opacity-65'
                    : `glass-card ${lvl.borderGlow} hover:-translate-y-1`
                }`}
              >
                {!isLocked && (
                  <div
                    className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${lvl.gradient} pointer-events-none`}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-semibold border ${lvl.badgeBg}`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                        Nivel {lvl.level}
                      </span>

                      {isFinalBossLevel && (
                        <span
                          title="Este nivel final activa Pantalla Completa obligatoria"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-semibold bg-rose-500/20 text-rose-200 border border-rose-400/35"
                        >
                          <Maximize2 className="w-3 h-3" />
                          Pantalla Completa
                        </span>
                      )}
                    </div>

                    {isLocked ? (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium shrink-0">
                        <Lock className="w-3.5 h-3.5" /> Bloqueado
                      </span>
                    ) : (
                      <div className="flex items-center gap-1 shrink-0" title={`${stars} de 3 estrellas`}>
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= stars
                                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                    {lvl.title.replace(/^Nivel \d+:\s*/, '')}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                    {lvl.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    {completed ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Mejor: {bestPct}%
                      </span>
                    ) : isLocked ? (
                      <span className="text-slate-500">Supera el Nivel {lvl.level - 1}</span>
                    ) : (
                      <span className="text-slate-400 font-mono-tech">
                        15s/preg • {lvl.questions.length} en banco
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => onStartLevel(idx)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                      isLocked
                        ? 'bg-slate-800/60 text-slate-500 cursor-not-allowed'
                        : completed
                        ? 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-cyan-400/30 cursor-pointer'
                        : 'bg-gradient-to-r from-cyan-400 to-sky-400 hover:opacity-95 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.28)] cursor-pointer'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {completed ? 'Mejorar' : 'Jugar'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Global Mixed Team Arena */}
          <div className="relative rounded-3xl p-6 flex flex-col justify-between border border-fuchsia-400/35 bg-gradient-to-br from-fuchsia-950/40 via-slate-900/80 to-indigo-950/50 hover:border-fuchsia-400/70 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-fuchsia-500/20 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-tech font-semibold bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/40">
                  <Swords className="w-3.5 h-3.5" />
                  Modo Especial
                </span>
                {state.arenaProgress?.completed && (
                  <span className="font-mono-tech text-xs text-fuchsia-300 font-bold">
                    Récord: {state.arenaProgress.bestPct}%
                  </span>
                )}
              </div>

              <h3 className="text-lg font-display font-bold text-white mb-2">
                Arena Global Mixta (10 Pregs)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed mb-5">
                Diagnóstico integral contrarreloj (15s/preg) combinando preguntas aleatorias de los 5 niveles para medir tu dominio global.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <span className="text-xs text-fuchsia-300 font-mono-tech font-semibold">
                15s/preg • +Bono XP
              </span>
              <button
                type="button"
                onClick={onStartArena}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-fuchsia-400 to-violet-500 text-slate-950 hover:opacity-95 shadow-[0_0_22px_rgba(232,121,249,0.35)] transition cursor-pointer"
              >
                <Swords className="w-3.5 h-3.5" />
                Reto Mixto
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
