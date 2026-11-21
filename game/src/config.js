// The Old Library — Spot the Difference
// config.js — one job: every tunable number and the catalogue of the four
// hand-drawn scenes (names, subtitles, par times). No drawing lives here.

export const VIEW_W = 1280;
export const VIEW_H = 800;

// Scene panels: two 600 x 450 pictures side by side.
export const PANEL_W = 600;
export const PANEL_H = 450;
export const LEFT_X = 20;
export const RIGHT_X = 660;
export const PANEL_Y = 90;

// Heads-up display strip and footer strip.
export const HUD_H = 70;
export const FOOTER_Y = 560;

export const SCENE_TIME = 150; // seconds allowed per scene
export const CLEAR_BONUS_TIME = 30; // seconds added when a scene is cleared
export const HINTS_PER_SCENE = 3;
export const FIND_POINTS = 100;
export const STREAK_STEP = 10; // extra points per step of the streak
export const WRONG_POINTS = -15;
export const WRONG_TIME = -3; // seconds lost on a wrong click
export const HINT_POINTS = -25;
export const CLICK_RADIUS = 26; // pixels in scene space around a difference

export const MAGNIFIER_RADIUS = 88;
export const MAGNIFIER_ZOOM = 2;

export const SCENES = [
  {
    id: 'reading-room',
    name: 'The Reading Room',
    sub: 'Lamplight, old books and one very sleepy cat',
    painter: 'drawReadingRoom',
    diffCount: 8,
  },
  {
    id: 'conservatory',
    name: 'The Garden Conservatory',
    sub: 'Glass roof, fountain and far too many plants',
    painter: 'drawConservatory',
    diffCount: 8,
  },
  {
    id: 'observatory',
    name: 'The Observatory Tower',
    sub: 'Telescopes, star charts and a stubborn candle',
    painter: 'drawObservatory',
    diffCount: 8,
  },
  {
    id: 'pantry',
    name: 'The Kitchen Pantry',
    sub: 'Jars, kettles and a bowl that keeps losing apples',
    painter: 'drawPantry',
    diffCount: 8,
  },
];

export const TOTAL_DIFFERENCES = SCENES.reduce((n, s) => n + s.diffCount, 0);
