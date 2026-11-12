import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import QuizView from './components/QuizView';
import ResultsView from './components/ResultsView';
import ProfileModal from './components/ProfileModal';
import AchievementsModal from './components/AchievementsModal';
import CertificateModal from './components/CertificateModal';
import ToastContainer from './components/ToastContainer';
import { QUIZ_LEVELS } from './data/quizData';
import {
  buildQuizQuestions,
  calculateStars,
  clearStoredState,
  evaluateAchievements,
  getDefaultState,
  loadState,
  saveState,
} from './utils/storage';
import { sound } from './utils/sound';

export default function App() {
  const [state, setState] = useState(() => loadState());
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'quiz' | 'results'
  const [gameMode, setGameMode] = useState('standard'); // 'standard' | 'timed'
  const [questionCount, setQuestionCount] = useState(5); // 5 | 8

  // Active session
  const [activeSession, setActiveSession] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  // Modals & Toasts
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Sync persistence and sound state
  useEffect(() => {
    saveState(state);
    sound.setEnabled(state.soundEnabled);
  }, [state]);

  const pushAchievementToasts = (unlockedList) => {
    if (!unlockedList || unlockedList.length === 0) return;
    setTimeout(() => sound.achievement(), 350);

    const items = unlockedList.map((u) => ({
      ...u,
      toastKey: `${u.id}-${Date.now()}`,
    }));

    setToasts((prev) => [...prev, ...items]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((p) => !items.some((i) => i.toastKey === p.toastKey)));
    }, 5000);
  };

  const handleToggleSound = () => {
    setState((prev) => {
      const nextVal = !prev.soundEnabled;
      sound.setEnabled(nextVal);
      if (nextVal) sound.click();
      return { ...prev, soundEnabled: nextVal };
    });
  };

  const handleSaveProfile = (profileUpdates) => {
    sound.click();
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileUpdates,
      },
    }));
  };

  const handleResetProgress = () => {
    clearStoredState();
    const fresh = getDefaultState();
    setState(fresh);
    setView('dashboard');
    setActiveSession(null);
    setLastResult(null);
  };

  const startLevel = (levelIndex) => {
    const levelObj = QUIZ_LEVELS[levelIndex];
    if (!levelObj) return;
    sound.click();

    const preparedQuestions = buildQuizQuestions(levelObj.questions, questionCount);
    setActiveSession({
      isArena: false,
      levelIndex,
      levelId: levelObj.id,
      title: levelObj.title,
      isTimedMode: gameMode === 'timed',
      questions: preparedQuestions,
    });
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startArena = () => {
    sound.click();
    const allPool = QUIZ_LEVELS.flatMap((lvl) => lvl.questions);
    const preparedQuestions = buildQuizQuestions(allPool, 10);

    setActiveSession({
      isArena: true,
      levelIndex: null,
      levelId: 'arena-global',
      title: 'Arena Global Mixta • 5 Dominios IA',
      isTimedMode: gameMode === 'timed',
      questions: preparedQuestions,
    });
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteSession = ({ history, sessionXP, maxSessionStreak }) => {
    if (!activeSession) return;

    const totalCount = history.length;
    const correctCount = history.filter((h) => h.isCorrect).length;
    const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const passed = pct >= 60;
    const stars = calculateStars(pct);
    const totalTimeSec = history.reduce((sum, h) => sum + (h.timeSpentSec || 0), 0);
    const avgTimeSec = totalCount > 0 ? Math.round(totalTimeSec / totalCount) : 0;

    // Bonus XP por superar la ronda o arena
    const completionBonus = passed ? (activeSession.isArena ? 150 : 80) : 20;

    let newlyUnlockedLevelNumber = null;

    setState((prev) => {
      let nextUnlockedLevels = prev.unlockedLevels;

      if (
        !activeSession.isArena &&
        passed &&
        activeSession.levelIndex + 1 >= prev.unlockedLevels &&
        activeSession.levelIndex + 1 < QUIZ_LEVELS.length
      ) {
        nextUnlockedLevels = activeSession.levelIndex + 2;
        newlyUnlockedLevelNumber = nextUnlockedLevels;
      }

      const prevLevelProg = prev.levelsProgress[activeSession.levelId] || {
        completed: false,
        bestPct: 0,
        stars: 0,
        attempts: 0,
        timedCleared: false,
      };

      const nextLevelsProgress = activeSession.isArena
        ? prev.levelsProgress
        : {
            ...prev.levelsProgress,
            [activeSession.levelId]: {
              completed: prevLevelProg.completed || passed,
              bestPct: Math.max(prevLevelProg.bestPct, pct),
              stars: Math.max(prevLevelProg.stars, stars),
              attempts: prevLevelProg.attempts + 1,
              timedCleared:
                prevLevelProg.timedCleared || (passed && activeSession.isTimedMode),
            },
          };

      const nextArenaProgress = activeSession.isArena
        ? {
            completed: prev.arenaProgress.completed || passed,
            bestPct: Math.max(prev.arenaProgress.bestPct || 0, pct),
            stars: Math.max(prev.arenaProgress.stars || 0, stars),
            attempts: (prev.arenaProgress.attempts || 0) + 1,
          }
        : prev.arenaProgress;

      const draftNextState = {
        ...prev,
        xp: prev.xp + sessionXP + completionBonus,
        bestStreak: Math.max(prev.bestStreak, maxSessionStreak),
        totalAnswered: prev.totalAnswered + totalCount,
        totalCorrect: prev.totalCorrect + correctCount,
        unlockedLevels: nextUnlockedLevels,
        levelsProgress: nextLevelsProgress,
        arenaProgress: nextArenaProgress,
      };

      const { updatedIds, newlyUnlocked, bonusXP } = evaluateAchievements(
        draftNextState,
        {
          passed,
          pct,
          maxSessionStreak,
          isTimedMode: activeSession.isTimedMode,
          levelId: activeSession.levelId,
          isArena: activeSession.isArena,
        }
      );

      const finalEarnedXP = sessionXP + completionBonus + bonusXP;

      setLastResult({
        sessionTitle: activeSession.title,
        isArena: activeSession.isArena,
        levelIndex: activeSession.levelIndex,
        history,
        correctCount,
        totalCount,
        pct,
        stars,
        passed,
        totalEarnedXP: finalEarnedXP,
        maxSessionStreak,
        avgTimeSec,
        newlyUnlockedLevelNumber,
        newlyUnlockedMedals: newlyUnlocked,
      });

      if (newlyUnlocked.length > 0) {
        pushAchievementToasts(newlyUnlocked);
      }

      return {
        ...draftNextState,
        xp: draftNextState.xp + bonusXP,
        unlockedAchievements: updatedIds,
      };
    });

    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#050816] text-slate-100 bg-cyber-grid flex flex-col">
      {/* Ambient Futuristic Aurora Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="animate-float-slow absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-500/12 blur-[110px]" />
        <div className="animate-float-reverse absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full bg-violet-600/14 blur-[120px]" />
        <div className="animate-float-slow absolute -bottom-40 left-1/3 w-[380px] h-[380px] rounded-full bg-fuchsia-600/10 blur-[110px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 w-full px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        <Navbar
          state={state}
          onOpenProfile={() => setShowProfileModal(true)}
          onOpenAchievements={() => setShowAchievementsModal(true)}
          onOpenCertificate={() => setShowCertificateModal(true)}
          onToggleSound={handleToggleSound}
          onGoHome={() => {
            sound.click();
            setView('dashboard');
          }}
        />

        <main className="flex-1">
          {view === 'dashboard' && (
            <DashboardView
              state={state}
              gameMode={gameMode}
              setGameMode={(m) => {
                sound.click();
                setGameMode(m);
              }}
              questionCount={questionCount}
              setQuestionCount={(c) => {
                sound.click();
                setQuestionCount(c);
              }}
              onStartLevel={startLevel}
              onStartArena={startArena}
              onOpenProfile={() => setShowProfileModal(true)}
              onOpenCertificate={() => setShowCertificateModal(true)}
            />
          )}

          {view === 'quiz' && activeSession && (
            <QuizView
              key={`${activeSession.levelId}-${activeSession.questions[0]?.id}`}
              sessionTitle={activeSession.title}
              questions={activeSession.questions}
              isTimedMode={activeSession.isTimedMode}
              bestStreakRecord={state.bestStreak}
              onCancel={() => {
                sound.click();
                setView('dashboard');
              }}
              onCompleteSession={handleCompleteSession}
            />
          )}

          {view === 'results' && lastResult && (
            <ResultsView
              result={lastResult}
              onRetry={() => {
                if (lastResult.isArena) {
                  startArena();
                } else {
                  startLevel(lastResult.levelIndex);
                }
              }}
              hasNextLevel={
                !lastResult.isArena &&
                lastResult.levelIndex !== null &&
                lastResult.levelIndex + 1 < QUIZ_LEVELS.length
              }
              onNextLevel={() => startLevel(lastResult.levelIndex + 1)}
              onReturnHome={() => {
                sound.click();
                setView('dashboard');
              }}
              onOpenCertificate={() => setShowCertificateModal(true)}
            />
          )}
        </main>

        <footer className="mt-12 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          <p>
            AI Nexus Quiz • Entrenamiento Técnico para Equipos •{' '}
            <span className="font-mono-tech text-slate-400">
              LLMs · MCP · Skills · RAG · Agentes
            </span>
          </p>
        </footer>
      </div>

      {/* Modals & Floating Notifications */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        profile={state.profile}
        onSave={handleSaveProfile}
        onResetProgress={handleResetProgress}
      />

      <AchievementsModal
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
        unlockedIds={state.unlockedAchievements}
      />

      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        state={state}
        onEditProfile={() => setShowProfileModal(true)}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}
