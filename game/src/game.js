// The Old Library — Spot the Difference
// game.js — one job: the game's state and rules. It knows nothing about
// pixels; render.js draws whatever this state says, input.js feeds it
// clicks and keys, and audio.js plays its sounds.

import {
  SCENES,
  SCENE_TIME,
  CLEAR_BONUS_TIME,
  HINTS_PER_SCENE,
  FIND_POINTS,
  STREAK_STEP,
  WRONG_POINTS,
  WRONG_TIME,
  HINT_POINTS,
  CLICK_RADIUS,
} from './config.js';
import { SCENE_SETS } from './scenes.js';

export function createGame() {
  return {
    screen: 'title', // title | play | clear | win | over
    sceneIndex: 0,
    found: new Set(), // difference ids found in the current scene
    foundAt: {}, // id -> performance.now() of the find, for the ring pulse
    hinted: null, // { id, until } while a hint is showing
    score: 0,
    streak: 0,
    bestStreak: 0,
    totalFound: 0,
    wrongClicks: 0,
    hintsUsed: 0,
    timeLeft: SCENE_TIME,
    hintsLeft: HINTS_PER_SCENE,
    sceneBonus: 0, // points earned for clearing the current scene
    message: '', // short toast line under the panels
    messageUntil: 0,
    clearUntil: 0, // performance.now() when the clear screen ends
    finalStats: null, // filled on win / game over
    cursor: { x: 300, y: 225, visible: false }, // keyboard crosshair, scene space
    magnifier: false,
    sound: true,
    mouse: { x: -1, y: -1, panel: null }, // panel: 'left' | 'right' | null
  };
}

export function currentScene(game) {
  return SCENES[game.sceneIndex];
}

export function currentDiffs(game) {
  return SCENE_SETS[currentScene(game).painter].diffs;
}

export function remainingCount(game) {
  return currentDiffs(game).length - game.found.size;
}

export function startGame(game, now) {
  game.screen = 'play';
  game.sceneIndex = 0;
  game.found = new Set();
  game.foundAt = {};
  game.hinted = null;
  game.score = 0;
  game.streak = 0;
  game.bestStreak = 0;
  game.totalFound = 0;
  game.wrongClicks = 0;
  game.hintsUsed = 0;
  game.timeLeft = SCENE_TIME;
  game.hintsLeft = HINTS_PER_SCENE;
  game.finalStats = null;
  showMessage(game, 'Find 8 differences in each room. Good hunting!', now);
}

export function showMessage(game, text, now) {
  game.message = text;
  game.messageUntil = now + 2600;
}

function finishRun(game, won, now) {
  game.screen = won ? 'win' : 'over';
  game.finalStats = {
    score: game.score,
    totalFound: game.totalFound,
    scenesCleared: won ? SCENES.length : game.sceneIndex,
    wrongClicks: game.wrongClicks,
    hintsUsed: game.hintsUsed,
    bestStreak: game.bestStreak,
    timeLeft: Math.max(0, Math.ceil(game.timeLeft)),
  };
}

export function nextScene(game, now) {
  if (game.sceneIndex + 1 >= SCENES.length) {
    finishRun(game, true, now);
    return;
  }
  game.sceneIndex += 1;
  game.found = new Set();
  game.foundAt = {};
  game.hinted = null;
  game.timeLeft += CLEAR_BONUS_TIME;
  game.hintsLeft = HINTS_PER_SCENE;
  game.screen = 'play';
  showMessage(game, `Room ${game.sceneIndex + 1}: ${currentScene(game).name}`, now);
}

// A click at scene-space (x, y) on either panel. Returns 'found' | 'wrong' | 'none'.
export function checkSpot(game, x, y, now) {
  if (game.screen !== 'play') return 'none';
  for (const d of currentDiffs(game)) {
    if (game.found.has(d.id)) continue;
    const dx = x - d.x;
    const dy = y - d.y;
    if (dx * dx + dy * dy <= CLICK_RADIUS * CLICK_RADIUS) {
      game.found.add(d.id);
      game.foundAt[d.id] = now;
      game.totalFound += 1;
      game.streak += 1;
      game.bestStreak = Math.max(game.bestStreak, game.streak);
      const gained = FIND_POINTS + (game.streak - 1) * STREAK_STEP;
      game.score += gained;
      showMessage(game, `Found it — ${d.name}! +${gained}`, now);
      if (game.found.size === currentDiffs(game).length) {
        game.sceneBonus = 200 + Math.ceil(game.timeLeft) * 2;
        game.score += game.sceneBonus;
        game.screen = 'clear';
        game.clearUntil = now + 2600;
        showMessage(game, `Room cleared! Time bonus +${game.sceneBonus}`, now);
      }
      return 'found';
    }
  }
  // A wrong click breaks the streak and costs points and time.
  game.wrongClicks += 1;
  game.streak = 0;
  game.score = Math.max(0, game.score + WRONG_POINTS);
  game.timeLeft = Math.max(0, game.timeLeft + WRONG_TIME);
  showMessage(game, 'Not there — minus 3 seconds.', now);
  return 'wrong';
}

export function useHint(game, now) {
  if (game.screen !== 'play') return null;
  if (game.hinted && now < game.hinted.until) return game.hinted;
  const left = currentDiffs(game).filter((d) => !game.found.has(d.id));
  if (left.length === 0) return null;
  if (game.hintsLeft <= 0) {
    showMessage(game, 'No hints left in this room.', now);
    return null;
  }
  const pick = left[Math.floor(Math.random() * left.length)];
  game.hintsUsed += 1;
  game.hintsLeft -= 1;
  game.score = Math.max(0, game.score + HINT_POINTS);
  game.hinted = { id: pick.id, until: now + 2600 };
  showMessage(game, `Hint: look for ${pick.name.toLowerCase()} (−25)`, now);
  return game.hinted;
}

export function tick(game, dtSeconds, now) {
  if (game.screen === 'play') {
    game.timeLeft -= dtSeconds;
    if (game.timeLeft <= 0) {
      game.timeLeft = 0;
      finishRun(game, false, now);
    }
  } else if (game.screen === 'clear' && now >= game.clearUntil) {
    nextScene(game, now);
  }
  if (game.hinted && now >= game.hinted.until) game.hinted = null;
}
