// The Old Library — Spot the Difference
// audio.js — one job: small WebAudio sounds, no audio files at all.
// Every sound is a few oscillator notes, so the game loads nothing.

export function createAudio() {
  return { ctx: null };
}

function ensureCtx(audio, game) {
  if (!game.sound) return null;
  if (!audio.ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audio.ctx = new AC();
  }
  if (audio.ctx.state === 'suspended') audio.ctx.resume();
  return audio.ctx;
}

function note(ctx, freq, start, dur, type, gain) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + dur + 0.05);
}

export function playFound(audio, game) {
  const ctx = ensureCtx(audio, game);
  if (!ctx) return;
  note(ctx, 660, 0, 0.18, 'sine', 0.18);
  note(ctx, 880, 0.09, 0.25, 'sine', 0.18);
}

export function playWrong(audio, game) {
  const ctx = ensureCtx(audio, game);
  if (!ctx) return;
  note(ctx, 160, 0, 0.22, 'square', 0.08);
}

export function playHint(audio, game) {
  const ctx = ensureCtx(audio, game);
  if (!ctx) return;
  note(ctx, 520, 0, 0.15, 'triangle', 0.14);
  note(ctx, 780, 0.1, 0.2, 'triangle', 0.14);
}

export function playClear(audio, game) {
  const ctx = ensureCtx(audio, game);
  if (!ctx) return;
  [523, 659, 784, 1047].forEach((f, i) => note(ctx, f, i * 0.11, 0.3, 'sine', 0.16));
}
