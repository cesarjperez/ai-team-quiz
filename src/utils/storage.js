import { ACHIEVEMENTS, QUIZ_LEVELS, RANKS } from '../data/quizData';

const STORAGE_KEY = 'ai_nexus_team_quiz_v2';

export function getDefaultState() {
  return {
    profile: {
      name: '',
      role: 'Software Engineer',
      avatarId: 'cyber-bot',
      onboarded: false,
    },
    xp: 0,
    bestStreak: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    totalFocusLosses: 0,
    soundEnabled: true,
    unlockedLevels: 1,
    hasLevelZeroMigrated: true,
    levelsProgress: {},
    arenaProgress: {
      completed: false,
      bestPct: 0,
      stars: 0,
      attempts: 0,
    },
    unlockedAchievements: [],
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    const defaults = getDefaultState();
    let migratedUnlocked = parsed.unlockedLevels || 1;
    if (!parsed.hasLevelZeroMigrated && parsed.levelsProgress?.['level-1']) {
      migratedUnlocked = Math.min(QUIZ_LEVELS.length, migratedUnlocked + 1);
    }

    return {
      ...defaults,
      ...parsed,
      unlockedLevels: migratedUnlocked,
      hasLevelZeroMigrated: true,
      profile: { ...defaults.profile, ...(parsed.profile || {}) },
      levelsProgress: { ...(parsed.levelsProgress || {}) },
      arenaProgress: { ...defaults.arenaProgress, ...(parsed.arenaProgress || {}) },
      unlockedAchievements: Array.isArray(parsed.unlockedAchievements)
        ? parsed.unlockedAchievements
        : [],
    };
  } catch {
    return getDefaultState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignorar cuota llena o modo privado estricto
  }
}

export function clearStoredState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignorar
  }
}

export function getRankInfo(xp) {
  let currentIdx = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].minXP) {
      currentIdx = i;
    }
  }
  const current = RANKS[currentIdx];
  const next = RANKS[currentIdx + 1] || null;

  if (!next) {
    return {
      current,
      next: null,
      progressPct: 100,
      xpToNext: 0,
    };
  }

  const span = next.minXP - current.minXP;
  const gainedInTier = xp - current.minXP;
  const progressPct = Math.min(100, Math.max(0, Math.round((gainedInTier / span) * 100)));

  return {
    current,
    next,
    progressPct,
    xpToNext: Math.max(0, next.minXP - xp),
  };
}

export function calculateStars(pct) {
  if (pct === 100) return 3;
  if (pct >= 80) return 2;
  if (pct >= 60) return 1;
  return 0;
}

export function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildQuizQuestions(sourceQuestions, count) {
  const shuffledQuestions = shuffleArray(sourceQuestions);
  const selected = count ? shuffledQuestions.slice(0, Math.min(count, shuffledQuestions.length)) : shuffledQuestions;

  return selected.map((q) => {
    const indexedOptions = q.options.map((text, originalIdx) => ({
      text,
      isCorrect: originalIdx === q.correct,
    }));
    const mixed = shuffleArray(indexedOptions);
    const newCorrectIndex = mixed.findIndex((item) => item.isCorrect);

    return {
      ...q,
      options: mixed.map((item) => item.text),
      correct: newCorrectIndex,
    };
  });
}

export function evaluateAchievements(nextState, sessionSummary) {
  const already = new Set(nextState.unlockedAchievements);
  const newlyUnlocked = [];

  const unlock = (id) => {
    if (!already.has(id)) {
      const meta = ACHIEVEMENTS.find((a) => a.id === id);
      if (meta) {
        already.add(id);
        newlyUnlocked.push(meta);
      }
    }
  };

  const { passed, pct, maxSessionStreak, avgTimeSec, sessionFocusLosses, levelId, isArena } = sessionSummary;

  if (passed && !isArena) {
    unlock('first_win');
  }

  if (pct === 100 && sessionFocusLosses === 0) {
    unlock('perfect_score');
  }

  if (maxSessionStreak >= 5 || nextState.bestStreak >= 5) {
    unlock('streak_5');
  }

  if (maxSessionStreak >= 8 || nextState.bestStreak >= 8) {
    unlock('streak_8');
  }

  if (passed && avgTimeSec <= 10 && sessionFocusLosses === 0) {
    unlock('speed_runner');
  }

  if (levelId === 'level-2' && pct >= 80) {
    unlock('mcp_specialist');
  }

  if (levelId === 'level-4' && pct >= 80) {
    unlock('rag_sage');
  }

  if (levelId === 'level-5' && passed) {
    unlock('agent_commander');
  }

  const allFiveCleared = QUIZ_LEVELS.every(
    (lvl) => nextState.levelsProgress[lvl.id]?.completed
  );
  if (allFiveCleared) {
    unlock('all_levels');
  }

  if (isArena && pct >= 80) {
    unlock('arena_champion');
  }

  const bonusXP = newlyUnlocked.reduce((acc, item) => acc + item.xpBonus, 0);

  return {
    updatedIds: Array.from(already),
    newlyUnlocked,
    bonusXP,
  };
}
