import React, { useEffect, useState, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Flame,
  Timer,
  Lightbulb,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { sound } from '../utils/sound';

const QUESTION_TIME_LIMIT = 20;

export default function QuizView({
  sessionTitle,
  questions,
  isTimedMode,
  onCancel,
  onCompleteSession,
  bestStreakRecord,
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [streak, setStreak] = useState(0);
  const [maxSessionStreak, setMaxSessionStreak] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [lastEarnedXP, setLastEarnedXP] = useState(0);
  const [history, setHistory] = useState([]);
  const [questionStartMs, setQuestionStartMs] = useState(Date.now());

  const currentQ = questions[currentIdx];
  const isAnswered = selectedIdx !== null || timedOut;

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);
    setQuestionStartMs(Date.now());
  }, [currentIdx]);

  // Countdown logic in Timed Mode
  useEffect(() => {
    if (!isTimedMode || isAnswered) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        if (prev <= 5) {
          sound.tick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimedMode, isAnswered, currentIdx]);

  const handleTimeout = () => {
    setTimedOut(true);
    setStreak(0);
    setLastEarnedXP(0);
    sound.timeout();

    const elapsedSec = QUESTION_TIME_LIMIT;
    setHistory((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        tag: currentQ.tag,
        question: currentQ.question,
        options: currentQ.options,
        correctIndex: currentQ.correct,
        selectedIndex: null,
        timedOut: true,
        isCorrect: false,
        explanation: currentQ.explanation,
        timeSpentSec: elapsedSec,
      },
    ]);
  };

  const handleSelectOption = useCallback(
    (idx) => {
      if (isAnswered) return;

      const elapsedSec = Math.max(
        1,
        Math.round((Date.now() - questionStartMs) / 1000)
      );
      const isCorrect = idx === currentQ.correct;
      setSelectedIdx(idx);

      let earned = 0;
      let nextStreak = 0;

      if (isCorrect) {
        nextStreak = streak + 1;
        const baseXP = 100;
        const streakBonus = Math.min(nextStreak - 1, 5) * 20;
        const speedBonus = isTimedMode ? Math.max(10, timeLeft * 3) : 0;
        const modeMultiplier = isTimedMode ? 1.5 : 1;
        earned = Math.round((baseXP + streakBonus + speedBonus) * modeMultiplier);

        setStreak(nextStreak);
        setMaxSessionStreak((prevMax) => Math.max(prevMax, nextStreak));
        setSessionXP((prevXP) => prevXP + earned);
        setLastEarnedXP(earned);
        sound.correct(nextStreak);
      } else {
        setStreak(0);
        setLastEarnedXP(0);
        sound.wrong();
      }

      setHistory((prev) => [
        ...prev,
        {
          questionId: currentQ.id,
          tag: currentQ.tag,
          question: currentQ.question,
          options: currentQ.options,
          correctIndex: currentQ.correct,
          selectedIndex: idx,
          timedOut: false,
          isCorrect,
          explanation: currentQ.explanation,
          timeSpentSec: elapsedSec,
        },
      ]);
    },
    [currentQ, isAnswered, isTimedMode, questionStartMs, streak, timeLeft]
  );

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    sound.click();

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedIdx(null);
      setTimedOut(false);
    } else {
      onCompleteSession({
        history,
        sessionXP,
        maxSessionStreak: Math.max(maxSessionStreak, streak),
        bestStreakBefore: bestStreakRecord,
      });
    }
  }, [
    bestStreakRecord,
    currentIdx,
    history,
    isAnswered,
    maxSessionStreak,
    onCompleteSession,
    questions.length,
    sessionXP,
    streak,
  ]);

  // Keyboard shortcuts: 1-4 to pick option, Enter/Space for Next
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key) && !isAnswered) {
        const idx = Number(e.key) - 1;
        if (idx < currentQ.options.length) {
          e.preventDefault();
          handleSelectOption(idx);
        }
      } else if ((e.key === 'Enter' || e.key === ' ') && isAnswered) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentQ.options.length, handleNext, handleSelectOption, isAnswered]);

  const progressPct = Math.round(
    ((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100
  );

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-up">
      {/* Top HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Mapa de Niveles
        </button>

        <div className="flex items-center gap-2.5 ml-auto">
          {/* Streak Indicator */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono-tech font-bold transition-all ${
              streak >= 2
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                : 'bg-slate-900/80 border-white/10 text-slate-400'
            }`}
          >
            <Flame
              className={`w-3.5 h-3.5 ${
                streak >= 2 ? 'text-amber-400 fill-amber-400' : 'text-slate-500'
              }`}
            />
            <span>Racha x{streak}</span>
          </div>

          {/* Session XP */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>+{sessionXP} XP</span>
          </div>

          {/* Countdown Timer */}
          {isTimedMode && (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono-tech font-bold transition ${
                timeLeft <= 5
                  ? 'bg-rose-500/25 border-rose-400 text-rose-200 animate-pulse'
                  : timeLeft <= 10
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                  : 'bg-slate-900/85 border-white/15 text-slate-200'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Quiz Glass Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Progress Header */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
          <span className="font-semibold text-cyan-300 truncate">{sessionTitle}</span>
          <span className="font-mono-tech shrink-0">
            Pregunta <strong className="text-white">{currentIdx + 1}</strong> de{' '}
            {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800/90 overflow-hidden mb-6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Topic Tag */}
        <div className="mb-3">
          <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-mono-tech font-semibold bg-violet-500/15 text-violet-300 border border-violet-400/25">
            # {currentQ.tag}
          </span>
        </div>

        {/* Question Text */}
        <h2
          key={currentQ.id}
          className="text-lg sm:text-2xl font-display font-bold text-white leading-snug mb-6 animate-fade-up"
        >
          {currentQ.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((optText, idx) => {
            const isCorrectOption = idx === currentQ.correct;
            const isSelected = idx === selectedIdx;

            let btnStyle =
              'bg-slate-900/70 border-white/10 hover:border-cyan-400/50 hover:bg-slate-800/80 text-slate-100';

            if (isAnswered) {
              if (isCorrectOption) {
                btnStyle =
                  'bg-emerald-500/15 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
              } else if (isSelected && !isCorrectOption) {
                btnStyle =
                  'bg-rose-500/15 border-rose-400 text-rose-100 animate-shake';
              } else {
                btnStyle =
                  'bg-slate-950/40 border-white/5 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 sm:px-5 sm:py-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3.5 ${btnStyle} ${
                  !isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-lg font-mono-tech text-xs font-bold flex items-center justify-center shrink-0 border ${
                      isAnswered && isCorrectOption
                        ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                        : isAnswered && isSelected && !isCorrectOption
                        ? 'bg-rose-400 text-slate-950 border-rose-300'
                        : 'bg-slate-800/90 text-slate-300 border-white/10'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-relaxed">
                    {optText}
                  </span>
                </div>

                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Technical Explanation Box */}
        {isAnswered && (
          <div
            className={`mt-6 p-4 sm:p-5 rounded-2xl border animate-pop-in ${
              timedOut
                ? 'bg-amber-500/10 border-amber-400/35'
                : selectedIdx === currentQ.correct
                ? 'bg-emerald-500/10 border-emerald-400/30'
                : 'bg-rose-500/10 border-rose-400/30'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                {timedOut ? (
                  <span className="text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    ¡Tiempo agotado! Revisa el concepto clave:
                  </span>
                ) : selectedIdx === currentQ.correct ? (
                  <span className="text-emerald-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    ¡Respuesta Correcta! Explicación técnica:
                  </span>
                ) : (
                  <span className="text-rose-300 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    Respuesta incorrecta — Así funciona realmente:
                  </span>
                )}
              </div>

              {lastEarnedXP > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-tech font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  +{lastEarnedXP} XP
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-200/95 leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Footer Action Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono-tech hidden sm:inline">
            {!isAnswered
              ? 'Atajo: teclas [1-4] para elegir opción'
              : 'Atajo: presiona [Enter] para continuar'}
          </span>

          <button
            type="button"
            disabled={!isAnswered}
            onClick={handleNext}
            className={`ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition ${
              isAnswered
                ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950 hover:opacity-95 shadow-[0_0_24px_rgba(34,211,238,0.35)] cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>
              {currentIdx + 1 < questions.length
                ? 'Siguiente Pregunta'
                : 'Ver Resultados y Repaso'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
