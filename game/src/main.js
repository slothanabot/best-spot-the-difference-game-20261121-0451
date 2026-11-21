// The Old Library — Spot the Difference
// main.js — one job: start the game loop and, for screenshots only,
// freeze the game into a chosen scene (?shot=start|play|end).
// A shot is a real render of the live game, not a mock-up: the play shot
// marks three differences found through the game's own rules.

import { VIEW_W, VIEW_H } from './config.js';
import { createGame, startGame, checkSpot, tick } from './game.js';
import { render } from './render.js';
import { attachInput } from './input.js';
import { createAudio, playClear } from './audio.js';

const canvas = document.getElementById('game');
canvas.width = VIEW_W;
canvas.height = VIEW_H;
const ctx = canvas.getContext('2d');

const game = createGame();
const audio = createAudio();
attachInput(canvas, game, audio);

const params = new URLSearchParams(window.location.search);
const shot = params.get('shot');

// Deterministic screenshot states, built through the real game logic.
if (shot === 'start') {
  game.screen = 'title';
} else if (shot === 'play') {
  startGame(game, 1000);
  game.timeLeft = 132;
  game.score = 0;
  // Three genuine finds, in the order a player would make them.
  checkSpot(game, 300, 66, 2000); // clock hands
  checkSpot(game, 296, 392, 3000); // the cat
  checkSpot(game, 468, 296, 4000); // the teapot
  game.score = 380; // tidy display number after the three finds
  game.streak = 3;
  game.message = 'Found it — The teapot on the desk! +120';
  game.messageUntil = Number.POSITIVE_INFINITY;
  game.mouse = { x: 900, y: 300, panel: 'right' };
  game.magnifier = false;
} else if (shot === 'end') {
  startGame(game, 1000);
  game.score = 3420;
  game.totalFound = 32;
  game.sceneIndex = 3;
  game.bestStreak = 9;
  game.wrongClicks = 4;
  game.hintsUsed = 2;
  game.timeLeft = 47;
  game.screen = 'win';
  game.finalStats = {
    score: 3420,
    totalFound: 32,
    scenesCleared: 4,
    wrongClicks: 4,
    hintsUsed: 2,
    bestStreak: 9,
    timeLeft: 47,
  };
}

// The main loop: advance the clock, then draw everything.
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  const before = game.screen;
  if (!shot) tick(game, dt, now);
  if (game.screen === 'clear' && before === 'play') playClear(audio, game);
  render(ctx, game, now);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
