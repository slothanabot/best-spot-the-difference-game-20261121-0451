// The Old Library — Spot the Difference
// input.js — one job: turn mouse moves, clicks and keys into game calls.
// It maps canvas pixels to scene space and owns the footer buttons.

import { LEFT_X, RIGHT_X, PANEL_Y, PANEL_W, PANEL_H } from './config.js';
import { BUTTONS } from './render.js';
import { checkSpot, useHint, startGame } from './game.js';
import { playFound, playWrong, playHint } from './audio.js';

function panelAt(game, cx, cy) {
  if (cy < PANEL_Y || cy > PANEL_Y + PANEL_H) return null;
  if (cx >= LEFT_X && cx <= LEFT_X + PANEL_W) return 'left';
  if (cx >= RIGHT_X && cx <= RIGHT_X + PANEL_W) return 'right';
  return null;
}

function scenePoint(panel, cx, cy) {
  const ox = panel === 'left' ? LEFT_X : RIGHT_X;
  return { x: cx - ox, y: cy - PANEL_Y };
}

export function attachInput(canvas, game, audio) {
  const scale = () => canvas.getBoundingClientRect().width / canvas.width;

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / scale();
    const cy = (e.clientY - rect.top) / scale();
    const panel = panelAt(game, cx, cy);
    game.mouse = { x: cx, y: cy, panel };
  });

  canvas.addEventListener('mouseleave', () => {
    game.mouse = { x: -1, y: -1, panel: null };
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / scale();
    const cy = (e.clientY - rect.top) / scale();
    const now = performance.now();

    if (game.screen === 'title') {
      startGame(game, now);
      return;
    }
    if (game.screen === 'win' || game.screen === 'over') return;

    // Footer buttons.
    for (const b of BUTTONS) {
      if (cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h) {
        handleButton(game, b.id, now, audio);
        return;
      }
    }

    const panel = panelAt(game, cx, cy);
    if (panel === null || game.screen !== 'play') return;
    const p = scenePoint(panel, cx, cy);
    const result = checkSpot(game, p.x, p.y, now);
    if (result === 'found') playFound(audio, game);
    else if (result === 'wrong') playWrong(audio, game);
  });

  window.addEventListener('keydown', (e) => {
    const now = performance.now();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      game.cursor.visible = true;
      const step = e.shiftKey ? 24 : 8;
      if (e.key === 'ArrowLeft') game.cursor.x = Math.max(0, game.cursor.x - step);
      if (e.key === 'ArrowRight') game.cursor.x = Math.min(PANEL_W, game.cursor.x + step);
      if (e.key === 'ArrowUp') game.cursor.y = Math.max(0, game.cursor.y - step);
      if (e.key === 'ArrowDown') game.cursor.y = Math.min(PANEL_H, game.cursor.y + step);
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      if (game.screen === 'title') {
        e.preventDefault();
        startGame(game, now);
        return;
      }
      if (game.screen === 'play' && game.cursor.visible) {
        e.preventDefault();
        const result = checkSpot(game, game.cursor.x, game.cursor.y, now);
        if (result === 'found') playFound(audio, game);
        else if (result === 'wrong') playWrong(audio, game);
      }
      return;
    }
    const key = e.key.toLowerCase();
    if (key === 'h') handleButton(game, 'hint', now, audio);
    if (key === 'm') handleButton(game, 'magnifier', now, audio);
    if (key === 's') handleButton(game, 'sound', now, audio);
    if (key === 'r') handleButton(game, 'restart', now, audio);
  });
}

function handleButton(game, id, now, audio) {
  if (id === 'hint') {
    const hint = useHint(game, now);
    if (hint) playHint(audio, game);
  } else if (id === 'magnifier') {
    game.magnifier = !game.magnifier;
  } else if (id === 'sound') {
    game.sound = !game.sound;
  } else if (id === 'restart') {
    startGame(game, now);
  }
}
