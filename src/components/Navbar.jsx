import React from 'react';
import { Award, Share2, Sparkles, Volume2, VolumeX, Flame } from 'lucide-react';
import { AVATARS, ACHIEVEMENTS } from '../data/quizData';
import { getRankInfo } from '../utils/storage';

export default function Navbar({
  state,
  onOpenProfile,
  onOpenAchievements,
  onOpenCertificate,
  onToggleSound,
  onGoHome,
}) {
  const avatar = AVATARS.find((a) => a.id === state.profile.avatarId) || AVATARS[0];
  const rankInfo = getRankInfo(state.xp);

  return (
    <header className="w-full max-w-6xl mx-auto mb-6 sm:mb-8">
      <div className="glass-panel rounded-2xl px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)] group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                AI Nexus Quiz
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-semibold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Team Arena
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Entrenamiento interactivo de IA para equipos
            </p>
          </div>
        </button>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* XP & Rank Pill */}
          <div className="hidden lg:flex flex-col min-w-[190px] px-3.5 py-1.5 rounded-xl bg-slate-900/70 border border-white/10">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={`font-semibold ${rankInfo.current.color} flex items-center gap-1`}>
                <span>{rankInfo.current.badge}</span>
                <span className="truncate max-w-[130px]">{rankInfo.current.title}</span>
              </span>
              <span className="font-mono-tech font-bold text-cyan-300">
                {state.xp.toLocaleString()} XP
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-all duration-500"
                style={{ width: `${rankInfo.progressPct}%` }}
              />
            </div>
          </div>

          {/* Best Streak */}
          {state.bestStreak > 0 && (
            <div
              title={`Mejor racha: ${state.bestStreak} aciertos seguidos`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono-tech font-bold"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30" />
              <span>{state.bestStreak}</span>
            </div>
          )}

          {/* Medals Button */}
          <button
            type="button"
            onClick={onOpenAchievements}
            title="Ver medallas y logros"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/75 hover:bg-slate-800/90 border border-white/10 hover:border-violet-400/40 text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            <Award className="w-4 h-4 text-violet-400" />
            <span className="font-mono-tech">
              {state.unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </span>
          </button>

          {/* Share / Certificate Button */}
          <button
            type="button"
            onClick={onOpenCertificate}
            title="Generar credencial para compartir con el equipo"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/15 to-violet-500/15 hover:from-cyan-500/25 hover:to-violet-500/25 border border-cyan-400/30 text-cyan-200 text-xs font-semibold transition cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-cyan-300" />
            <span className="hidden md:inline">Credencial</span>
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            title={state.soundEnabled ? 'Silenciar efectos de sonido' : 'Activar efectos de sonido'}
            className="p-2 rounded-xl bg-slate-900/75 hover:bg-slate-800/90 border border-white/10 text-slate-300 hover:text-cyan-300 transition cursor-pointer"
          >
            {state.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Profile Trigger */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/40 transition cursor-pointer"
          >
            <span
              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${avatar.ring} flex items-center justify-center text-base shadow-inner`}
            >
              {avatar.emoji}
            </span>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-100 leading-tight max-w-[110px] truncate">
                {state.profile.name?.trim() || 'Tu Perfil'}
              </p>
              <p className="text-[10px] text-cyan-300/90 font-mono-tech lg:hidden">
                {state.xp} XP
              </p>
              <p className="text-[10px] text-slate-400 hidden lg:block truncate max-w-[110px]">
                {state.profile.role}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
