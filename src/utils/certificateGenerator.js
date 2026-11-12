import { AVATARS, QUIZ_LEVELS } from '../data/quizData';
import { getRankInfo } from './storage';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function renderCredentialCanvas(canvas, state) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 1200;
  const H = 675;
  canvas.width = W;
  canvas.height = H;

  // 1. Fondo espacial profundo
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, '#050816');
  bgGrad.addColorStop(0.5, '#0b1128');
  bgGrad.addColorStop(1, '#070b19');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Resplandores aurora
  const glowCyan = ctx.createRadialGradient(200, 130, 10, 200, 130, 380);
  glowCyan.addColorStop(0, 'rgba(34, 211, 238, 0.22)');
  glowCyan.addColorStop(1, 'rgba(34, 211, 238, 0)');
  ctx.fillStyle = glowCyan;
  ctx.fillRect(0, 0, W, H);

  const glowViolet = ctx.createRadialGradient(1000, 540, 20, 1000, 540, 420);
  glowViolet.addColorStop(0, 'rgba(139, 92, 246, 0.24)');
  glowViolet.addColorStop(1, 'rgba(139, 92, 246, 0)');
  ctx.fillStyle = glowViolet;
  ctx.fillRect(0, 0, W, H);

  // Cuadrícula sutil
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Tarjeta principal con borde neón
  const pad = 42;
  roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 28);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
  ctx.fill();

  const borderGrad = ctx.createLinearGradient(pad, pad, W - pad, H - pad);
  borderGrad.addColorStop(0, 'rgba(34, 211, 238, 0.65)');
  borderGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.5)');
  borderGrad.addColorStop(1, 'rgba(236, 72, 153, 0.65)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Encabezado superior
  ctx.fillStyle = '#22d3ee';
  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillText('AI NEXUS QUIZ  //  CREDENCIAL TÉCNICA DE EQUIPO', 88, 102);

  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const hashNum = ((state.xp * 37 + state.totalCorrect * 97 + 4096) % 90000) + 10000;
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`ID #NX-${hashNum}  •  ${dateStr}`, W - 88, 102);
  ctx.textAlign = 'left';

  // Línea divisoria sutil
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(88, 126);
  ctx.lineTo(W - 88, 126);
  ctx.stroke();

  // Avatar y Perfil
  const avatar = AVATARS.find((a) => a.id === state.profile.avatarId) || AVATARS[0];
  roundRect(ctx, 88, 156, 104, 104, 24);
  const avGrad = ctx.createLinearGradient(88, 156, 192, 260);
  avGrad.addColorStop(0, 'rgba(34, 211, 238, 0.25)');
  avGrad.addColorStop(1, 'rgba(139, 92, 246, 0.28)');
  ctx.fillStyle = avGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = '54px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(avatar.emoji, 140, 226);
  ctx.textAlign = 'left';

  const displayName = state.profile.name?.trim() || 'Especialista del Equipo';
  ctx.fillStyle = '#f8fafc';
  ctx.font = '700 38px "Space Grotesk", sans-serif';
  ctx.fillText(displayName.slice(0, 28), 216, 198);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(state.profile.role || 'Software Engineer', 216, 230);

  const rankInfo = getRankInfo(state.xp);
  roundRect(ctx, 216, 244, 350, 34, 17);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#67e8f9';
  ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${rankInfo.current.badge}  RANGO: ${rankInfo.current.title.toUpperCase()}`, 232, 266);

  // Sello de Integridad Antitrampa
  const focusLosses = state.totalFocusLosses || 0;
  const hasPlayed = (state.totalAnswered || 0) > 0;
  const isClean = focusLosses === 0 && hasPlayed;

  roundRect(ctx, 580, 244, 410, 34, 17);
  ctx.fillStyle = !hasPlayed
    ? 'rgba(148, 163, 184, 0.12)'
    : isClean
    ? 'rgba(16, 185, 129, 0.16)'
    : 'rgba(245, 158, 11, 0.16)';
  ctx.fill();
  ctx.strokeStyle = !hasPlayed
    ? 'rgba(148, 163, 184, 0.3)'
    : isClean
    ? 'rgba(52, 211, 153, 0.45)'
    : 'rgba(251, 191, 36, 0.45)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = !hasPlayed ? '#cbd5e1' : isClean ? '#6ee7b7' : '#fcd34d';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  const integrityLabel = !hasPlayed
    ? '🛡️ MONITOREO ANTITRAMPA ACTIVO (30s/PREG)'
    : isClean
    ? '🛡️ INTEGRIDAD VERIFICADA • 0 SALIDAS DE PESTAÑA'
    : `⚠️ ${focusLosses} SALIDA(S) DE VENTANA DETECTADA(S)`;
  ctx.fillText(integrityLabel, 598, 266);

  // 4 Tarjetas KPI
  const accuracy =
    state.totalAnswered > 0
      ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
      : 0;
  const clearedCount = QUIZ_LEVELS.filter(
    (l) => state.levelsProgress[l.id]?.completed
  ).length;

  const kpis = [
    { label: 'EXPERIENCIA TOTAL', value: `${state.xp.toLocaleString()} XP`, color: '#38bdf8' },
    { label: 'PRECISIÓN GLOBAL', value: `${accuracy}%`, color: '#34d399' },
    { label: 'MEJOR RACHA', value: `${state.bestStreak} 🔥`, color: '#fbbf24' },
    {
      label: 'INSIGNIAS / NIVELES',
      value: `${state.unlockedAchievements.length}/10 • ${clearedCount}/${QUIZ_LEVELS.length}`,
      color: '#c084fc',
    },
  ];

  const boxW = 242;
  const gap = 20;
  kpis.forEach((kpi, idx) => {
    const bx = 88 + idx * (boxW + gap);
    const by = 310;
    roundRect(ctx, bx, by, boxW, 108, 18);
    ctx.fillStyle = 'rgba(30, 41, 59, 0.62)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText(kpi.label, bx + 20, by + 34);

    ctx.fillStyle = kpi.color;
    ctx.font = '700 28px "Space Grotesk", sans-serif';
    ctx.fillText(kpi.value, bx + 20, by + 78);
  });

  // Dominio por Nivel (6 módulos: Nivel 0 al Nivel 5)
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '700 15px "JetBrains Mono", monospace';
  ctx.fillText('DOMINIO POR MÓDULO TÉCNICO (NIVEL 0 AL 5)', 88, 462);

  const totalInnerW = W - 88 * 2;
  const modGap = 12;
  const modW = Math.floor((totalInnerW - modGap * (QUIZ_LEVELS.length - 1)) / QUIZ_LEVELS.length);

  QUIZ_LEVELS.forEach((lvl, idx) => {
    const mx = 88 + idx * (modW + modGap);
    const my = 480;
    const prog = state.levelsProgress[lvl.id];
    const completed = Boolean(prog?.completed);
    const stars = prog?.stars || 0;
    const bestPct = prog?.bestPct || 0;

    roundRect(ctx, mx, my, modW, 92, 16);
    ctx.fillStyle = completed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(30, 41, 59, 0.45)';
    ctx.fill();
    ctx.strokeStyle = completed ? 'rgba(52, 211, 153, 0.45)' : 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = completed ? '#e2e8f0' : '#94a3b8';
    ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`N${lvl.level} • ${lvl.shortTitle}`, mx + 12, my + 28);

    const starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    ctx.fillStyle = stars > 0 ? '#fbbf24' : '#475569';
    ctx.font = '17px sans-serif';
    ctx.fillText(starStr, mx + 12, my + 56);

    ctx.fillStyle = completed ? '#34d399' : '#64748b';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillText(completed ? `Mejor: ${bestPct}%` : 'Pendiente', mx + 12, my + 78);
  });

  // Pie de tarjeta
  ctx.fillStyle = '#64748b';
  ctx.font = '500 13.5px "JetBrains Mono", monospace';
  ctx.fillText('Conceptos Base  •  LLMs  •  MCP  •  Skills  •  RAG & Vectores  •  Agentes', 88, 608);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('cesarjperez.github.io/ai-team-quiz', W - 88, 608);
  ctx.textAlign = 'left';
}

export function buildShareText(state) {
  const rankInfo = getRankInfo(state.xp);
  const accuracy =
    state.totalAnswered > 0
      ? Math.round((state.totalCorrect / state.totalAnswered) * 100)
      : 0;
  const clearedCount = QUIZ_LEVELS.filter(
    (l) => state.levelsProgress[l.id]?.completed
  ).length;
  const name = state.profile.name?.trim() || 'Miembro del Equipo';

  const levelBadges = QUIZ_LEVELS.map((l) => {
    const s = state.levelsProgress[l.id]?.stars || 0;
    return s > 0 ? `N${l.level}:${'⭐'.repeat(s)}` : `N${l.level}:🔒`;
  }).join(' | ');

  const focusLosses = state.totalFocusLosses || 0;
  const integrityText =
    (state.totalAnswered || 0) === 0
      ? '🛡️ *Integridad:* Monitoreo activo (30s/preg)'
      : focusLosses === 0
      ? '🛡️ *Integridad:* Verificada (0 salidas de pestaña)'
      : `⚠️ *Integridad:* ${focusLosses} salida(s) de pestaña detectada(s)`;

  return [
    `🚀 *AI Nexus Quiz — Reporte de Dominio IA*`,
    `👤 *Jugador:* ${name} (${state.profile.role})`,
    `${rankInfo.current.badge} *Rango:* ${rankInfo.current.title} — *${state.xp.toLocaleString()} XP*`,
    `🎯 *Precisión:* ${accuracy}%  |  🔥 *Mejor Racha:* ${state.bestStreak}  |  🏅 *Medallas:* ${state.unlockedAchievements.length}/10`,
    integrityText,
    `📊 *Módulos (${clearedCount}/${QUIZ_LEVELS.length}):* ${levelBadges}`,
    `🔗 ¡Pon a prueba tus conocimientos con el equipo!`,
  ].join('\n');
}
