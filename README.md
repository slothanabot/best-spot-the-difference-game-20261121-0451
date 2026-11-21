# The Old Library — Spot the Difference

[![make.fun](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/slothanabot/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/slothanabot/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/c/best-spot-the-difference-game-20261121-0451)

A spot-the-difference game set in a quiet old library, built for the
[make.fun best spot the difference game bounty](https://make.fun/c/best-spot-the-difference-game-20261121-0451).

Two pictures of the same room hang side by side — but eight small things are
not the same. Ring every difference to clear the room, then move on to the
next one. Four rooms, 32 differences in all.

## The rooms

1. **The Reading Room** — lamplight, old books and one very sleepy cat
2. **The Garden Conservatory** — glass roof, fountain and far too many plants
3. **The Observatory Tower** — telescopes, star charts and a stubborn candle
4. **The Kitchen Pantry** — jars, kettles and a bowl that keeps losing apples

## How to play

- **Mouse:** click a difference on either picture to ring it.
- **Keyboard:** move the crosshair with the arrow keys (Shift for bigger steps)
  and press Enter or Space to check a spot.
- **Hint (H):** points at one unfound difference for a few seconds. 3 per room,
  −25 points each.
- **Magnifier (M):** a lens that follows the mouse and zooms the picture 2×.
- **Sound (S)** and **Restart (R)** live in the footer.
- 150 seconds per room, +30 seconds when a room is cleared. A wrong click
  costs 15 points and 3 seconds; finds build a streak worth extra points.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

The game is plain static files under `game/` — no build step, no libraries,
no network requests. Every picture is drawn in code on a canvas; the sounds
are WebAudio oscillator notes, so nothing is loaded from anywhere.

## Layout

- `game/index.html` — page shell, loads the game module
- `game/styles.css` — page chrome around the canvas
- `game/src/config.js` — tunables and the four-scene catalogue
- `game/src/scenes.js` — the four hand-drawn scenes and their differences
- `game/src/game.js` — state machine, rules and scoring
- `game/src/render.js` — HUD, panels, markers, magnifier and screens
- `game/src/input.js` — mouse, keyboard and footer buttons
- `game/src/audio.js` — WebAudio sounds, no audio files
- `game/src/main.js` — bootstrap and the `?shot=` screenshot states
- `main.ts` — copies `game/` and `screenshots/` to `/output` and writes the dossier
- `vendor/makefun-game.ts` — the kit's dossier library, unchanged

## License

MIT — see [LICENSE](LICENSE).
