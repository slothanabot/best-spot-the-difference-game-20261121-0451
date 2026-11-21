// The Old Library — Spot the Difference
// scenes.js — one job: paint the four scenes and name their differences.
// Every scene is drawn twice: once as the left picture (variant = false)
// and once as the right picture (variant = true). The eight differences of
// a scene are the places where the two drawings disagree. All art is drawn
// in code with canvas primitives; no image is loaded from anywhere.
//
// A difference entry: { id, name, x, y, r } in the scene's 600 x 450 space.
// The painter branches on `variant` at exactly those spots, so a click at
// (x, y) on either panel always means the same difference.

export const READING_ROOM_DIFFS = [
  { id: 'clock-hands', name: 'The clock shows a different time', x: 300, y: 66, r: 30 },
  { id: 'cat', name: 'The cat on the rug', x: 296, y: 392, r: 34 },
  { id: 'teapot', name: 'The teapot on the desk', x: 468, y: 296, r: 26 },
  { id: 'red-book', name: 'One book spine changed colour', x: 92, y: 176, r: 22 },
  { id: 'moon', name: 'The moon behind the curtain', x: 522, y: 92, r: 26 },
  { id: 'lamp-glow', name: 'The desk lamp is lit', x: 428, y: 226, r: 30 },
  { id: 'portrait', name: 'The picture on the wall', x: 150, y: 92, r: 30 },
  { id: 'rug-stripe', name: 'An extra stripe on the rug', x: 300, y: 424, r: 24 },
];

function woodFloor(ctx) {
  ctx.fillStyle = '#8a5a33';
  ctx.fillRect(0, 330, 600, 120);
  ctx.fillStyle = '#7a4e2b';
  for (let i = 0; i < 6; i++) ctx.fillRect(0, 330 + i * 20, 600, 3);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  for (let i = 0; i < 8; i++) ctx.fillRect((i * 97) % 600, 330, 2, 120);
}

function bookshelf(ctx, x, y, w, h, palette) {
  ctx.fillStyle = '#5d3a1e';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#6d4524';
  ctx.fillRect(x + 6, y + 6, w - 12, h - 12);
  const rows = 3;
  for (let r = 0; r < rows; r++) {
    const ry = y + 14 + r * ((h - 28) / rows);
    const rh = (h - 28) / rows - 10;
    ctx.fillStyle = '#4a2d16';
    ctx.fillRect(x + 8, ry + rh, w - 16, 6);
    let bx = x + 12;
    let i = 0;
    while (bx < x + w - 22) {
      const bw = 12 + ((i * 7 + r * 5) % 10);
      ctx.fillStyle = palette[(i + r * 3) % palette.length];
      ctx.fillRect(bx, ry, bw, rh);
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      ctx.fillRect(bx, ry, bw, 3);
      bx += bw + 2;
      i++;
    }
  }
}

export function drawReadingRoom(ctx, variant) {
  // Wall and wainscot.
  const wall = ctx.createLinearGradient(0, 0, 0, 330);
  wall.addColorStop(0, '#e8d9b8');
  wall.addColorStop(1, '#d9c49a');
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, 600, 330);
  ctx.fillStyle = '#7a5a34';
  ctx.fillRect(0, 322, 600, 8);
  woodFloor(ctx);

  // Bookshelf on the left wall.
  bookshelf(ctx, 24, 40, 180, 260, ['#a33b2e', '#2e5d8a', '#3d7a44', '#c9a227', '#7a4a8a']);
  // One spine changes colour in the right picture.
  ctx.fillStyle = variant ? '#2e5d8a' : '#a33b2e';
  ctx.fillRect(80, 162, 24, 34);

  // Framed picture: an owl in the left picture, a vase in the right.
  ctx.fillStyle = '#4a2d16';
  ctx.fillRect(128, 60, 64, 64);
  ctx.fillStyle = '#f3e6c8';
  ctx.fillRect(134, 66, 52, 52);
  if (!variant) {
    ctx.fillStyle = '#6b4a2f'; // owl body
    ctx.beginPath(); ctx.ellipse(160, 100, 14, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f3e6c8';
    ctx.beginPath(); ctx.arc(153, 90, 7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(167, 90, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.arc(153, 90, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(167, 90, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#d98a2b';
    ctx.beginPath(); ctx.moveTo(160, 94); ctx.lineTo(155, 100); ctx.lineTo(165, 100); ctx.fill();
  } else {
    ctx.fillStyle = '#2e5d8a'; // vase
    ctx.beginPath(); ctx.ellipse(160, 104, 13, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(155, 82, 10, 10);
    ctx.strokeStyle = '#3d7a44';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(160, 82); ctx.lineTo(150, 70); ctx.moveTo(160, 82); ctx.lineTo(170, 70); ctx.stroke();
    ctx.fillStyle = '#c65b7c';
    ctx.beginPath(); ctx.arc(150, 68, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(170, 68, 5, 0, Math.PI * 2); ctx.fill();
  }

  // Wall clock above the desk.
  ctx.fillStyle = '#4a2d16';
  ctx.beginPath(); ctx.arc(300, 66, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fdf6e0';
  ctx.beginPath(); ctx.arc(300, 66, 25, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(300, 66); ctx.lineTo(300, 48); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(300, 66);
  if (!variant) ctx.lineTo(314, 74); // ten past ten
  else ctx.lineTo(288, 80); // twenty to three
  ctx.stroke();
  ctx.fillStyle = '#222';
  ctx.beginPath(); ctx.arc(300, 66, 3, 0, Math.PI * 2); ctx.fill();

  // Window with curtains on the right wall.
  ctx.fillStyle = '#3d5a80';
  ctx.fillRect(478, 44, 100, 110);
  ctx.fillStyle = '#9fc3e8';
  ctx.fillRect(484, 50, 88, 98);
  if (!variant) {
    ctx.fillStyle = '#f5e9c8'; // moon, curtain open
    ctx.beginPath(); ctx.arc(540, 82, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#9fc3e8';
    ctx.beginPath(); ctx.arc(546, 78, 14, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.fillStyle = '#f5e9c8'; // curtain drawn, no moon
    ctx.fillRect(484, 50, 88, 98);
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(492 + i * 18, 52); ctx.lineTo(492 + i * 18, 146); ctx.stroke();
    }
  }
  ctx.fillStyle = '#7a3b2e';
  ctx.fillRect(470, 40, 14, 118);
  ctx.fillRect(572, 40, 14, 118);
  ctx.fillStyle = '#5d3a1e';
  ctx.fillRect(466, 36, 124, 8);

  // Rug.
  ctx.fillStyle = '#8a2f2f';
  ctx.beginPath(); ctx.ellipse(300, 400, 150, 32, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#c9a227';
  ctx.beginPath(); ctx.ellipse(300, 400, 118, 22, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a2f2f';
  ctx.beginPath(); ctx.ellipse(300, 400, 88, 15, 0, 0, Math.PI * 2); ctx.fill();
  if (variant) { // extra stripe
    ctx.strokeStyle = '#c9a227';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.ellipse(300, 400, 138, 28, 0, 0, Math.PI * 2); ctx.stroke();
  }

  // Sleeping cat on the rug (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#e8a34c';
    ctx.beginPath(); ctx.ellipse(296, 392, 26, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(272, 388, 10, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(266, 380); ctx.lineTo(264, 372); ctx.lineTo(270, 378); ctx.fill();
    ctx.beginPath(); ctx.moveTo(276, 379); ctx.lineTo(278, 371); ctx.lineTo(281, 378); ctx.fill();
    ctx.strokeStyle = '#e8a34c';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(320, 392); ctx.quadraticCurveTo(336, 384, 330, 372); ctx.stroke();
  }

  // Reading desk.
  ctx.fillStyle = '#5d3a1e';
  ctx.fillRect(380, 300, 190, 14);
  ctx.fillRect(392, 314, 12, 60);
  ctx.fillRect(546, 314, 12, 60);
  // Stack of books on the desk.
  ctx.fillStyle = '#2e5d8a'; ctx.fillRect(396, 282, 52, 9);
  ctx.fillStyle = '#a33b2e'; ctx.fillRect(400, 273, 46, 9);
  ctx.fillStyle = '#3d7a44'; ctx.fillRect(404, 264, 40, 9);
  // Teapot (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#7a4a8a';
    ctx.beginPath(); ctx.ellipse(468, 292, 18, 13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(462, 274, 12, 8);
    ctx.strokeStyle = '#7a4a8a';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(488, 290, 8, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(450, 288); ctx.lineTo(440, 280); ctx.stroke();
  }
  // Desk lamp: lit in the left picture, dark in the right.
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(428, 300); ctx.lineTo(428, 246); ctx.stroke();
  ctx.fillStyle = variant ? '#5a5a5a' : '#e8b64c';
  ctx.beginPath(); ctx.moveTo(414, 246); ctx.lineTo(442, 246); ctx.lineTo(436, 226); ctx.lineTo(420, 226); ctx.closePath(); ctx.fill();
  if (!variant) {
    const glow = ctx.createRadialGradient(428, 250, 6, 428, 250, 60);
    glow.addColorStop(0, 'rgba(255, 220, 120, 0.55)');
    glow.addColorStop(1, 'rgba(255, 220, 120, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(428, 250, 60, 0, Math.PI * 2); ctx.fill();
  }
  // Armchair on the left.
  ctx.fillStyle = '#6b3f2a';
  ctx.fillRect(216, 300, 90, 74);
  ctx.fillRect(216, 268, 90, 40);
  ctx.fillRect(206, 300, 16, 50);
  ctx.fillRect(300, 300, 16, 50);
}

export const CONSERVATORY_DIFFS = [
  { id: 'bird', name: 'The bird on the fountain', x: 330, y: 190, r: 26 },
  { id: 'flower', name: 'One tulip changed colour', x: 120, y: 330, r: 24 },
  { id: 'jet', name: 'The fountain jet is higher', x: 300, y: 210, r: 28 },
  { id: 'butterfly', name: 'The butterfly over the roses', x: 470, y: 150, r: 24 },
  { id: 'pot', name: 'The potted plant on the bench', x: 500, y: 300, r: 26 },
  { id: 'sun', name: 'The sun behind the glass', x: 90, y: 70, r: 28 },
  { id: 'stone', name: 'A stepping stone on the path', x: 300, y: 410, r: 24 },
  { id: 'can', name: 'The watering can by the path', x: 180, y: 400, r: 26 },
];

function tulip(ctx, x, y, colour) {
  ctx.strokeStyle = '#2f6b33';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 26); ctx.stroke();
  ctx.fillStyle = colour;
  ctx.beginPath(); ctx.moveTo(x - 9, y); ctx.quadraticCurveTo(x - 9, y - 16, x, y - 10);
  ctx.quadraticCurveTo(x + 9, y - 16, x + 9, y); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2f6b33';
  ctx.beginPath(); ctx.ellipse(x - 6, y + 14, 7, 3, -0.5, 0, Math.PI * 2); ctx.fill();
}

export function drawConservatory(ctx, variant) {
  // Sky through the glass roof.
  const sky = ctx.createLinearGradient(0, 0, 0, 300);
  sky.addColorStop(0, '#a8d4f0');
  sky.addColorStop(1, '#d8ecf7');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 600, 300);
  // Sun: whole in the left picture, half hidden by a cloud in the right.
  ctx.fillStyle = '#f5c542';
  ctx.beginPath(); ctx.arc(90, 70, 26, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#f5c542';
  ctx.lineWidth = 4;
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(90 + Math.cos(a) * 34, 70 + Math.sin(a) * 34);
    ctx.lineTo(90 + Math.cos(a) * 44, 70 + Math.sin(a) * 44);
    ctx.stroke();
  }
  if (variant) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.ellipse(96, 62, 30, 14, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(112, 70, 24, 12, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Glass roof ribs.
  ctx.strokeStyle = 'rgba(60, 90, 110, 0.55)';
  ctx.lineWidth = 5;
  for (let i = 0; i <= 4; i++) {
    ctx.beginPath(); ctx.moveTo(i * 150, 0); ctx.lineTo(i * 150, 300); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 120); ctx.lineTo(600, 120); ctx.stroke();
  // Garden floor.
  ctx.fillStyle = '#7fae62';
  ctx.fillRect(0, 300, 600, 150);
  ctx.fillStyle = '#6d9c52';
  ctx.fillRect(0, 300, 600, 10);
  // Stone path.
  ctx.fillStyle = '#cfc4ae';
  ctx.beginPath(); ctx.moveTo(270, 300); ctx.lineTo(330, 300); ctx.lineTo(350, 450); ctx.lineTo(250, 450); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#b5a888';
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath(); ctx.moveTo(272 + i * 4, 330 + i * 30); ctx.lineTo(328 - i * 4, 330 + i * 30); ctx.stroke();
  }
  if (variant) { // extra stepping stone
    ctx.fillStyle = '#b5a888';
    ctx.beginPath(); ctx.ellipse(300, 412, 26, 9, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Flower beds.
  tulip(ctx, 120, 330, variant ? '#f5c542' : '#e85d75');
  tulip(ctx, 150, 350, '#e85d75');
  tulip(ctx, 96, 352, '#b06fc0');
  tulip(ctx, 470, 330, '#e85d75');
  tulip(ctx, 496, 352, '#f5c542');
  tulip(ctx, 446, 354, '#b06fc0');
  // Roses bush on the right.
  ctx.fillStyle = '#2f6b33';
  ctx.beginPath(); ctx.ellipse(480, 260, 70, 46, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e85d75';
  for (const [rx, ry] of [[450, 240], [480, 228], [510, 244], [465, 262], [495, 262]]) {
    ctx.beginPath(); ctx.arc(rx, ry, 9, 0, Math.PI * 2); ctx.fill();
  }
  // Butterfly over the roses (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#7a5fd0';
    ctx.beginPath(); ctx.ellipse(462, 146, 9, 6, -0.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(478, 146, 9, 6, 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#222';
    ctx.fillRect(469, 142, 2, 10);
  }
  // Fountain in the middle.
  ctx.fillStyle = '#b9c4c9';
  ctx.beginPath(); ctx.ellipse(300, 268, 78, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#7fc4e8';
  ctx.beginPath(); ctx.ellipse(300, 264, 66, 15, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#b9c4c9';
  ctx.fillRect(292, 200, 16, 66);
  ctx.beginPath(); ctx.ellipse(300, 200, 22, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#7fc4e8';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(300, 200);
  ctx.quadraticCurveTo(300, variant ? 150 : 176, 300, variant ? 132 : 158);
  ctx.stroke();
  ctx.fillStyle = '#7fc4e8';
  ctx.beginPath(); ctx.arc(300, variant ? 132 : 158, 7, 0, Math.PI * 2); ctx.fill();
  // Bird on the fountain rim (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#3b6ea5';
    ctx.beginPath(); ctx.ellipse(330, 188, 13, 9, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(340, 180, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f5c542';
    ctx.beginPath(); ctx.moveTo(346, 180); ctx.lineTo(354, 183); ctx.lineTo(346, 186); ctx.fill();
    ctx.strokeStyle = '#3b6ea5';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(326, 196); ctx.lineTo(324, 206); ctx.moveTo(334, 196); ctx.lineTo(336, 206); ctx.stroke();
  }
  // Bench on the right with a potted plant (gone in the right picture).
  ctx.fillStyle = '#6d4524';
  ctx.fillRect(440, 300, 130, 12);
  ctx.fillRect(448, 312, 10, 44);
  ctx.fillRect(552, 312, 10, 44);
  if (!variant) {
    ctx.fillStyle = '#a33b2e';
    ctx.beginPath(); ctx.moveTo(492, 280); ctx.lineTo(516, 280); ctx.lineTo(511, 300); ctx.lineTo(497, 300); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#3d7a44';
    ctx.beginPath(); ctx.arc(504, 268, 14, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(494, 274, 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(514, 274, 9, 0, Math.PI * 2); ctx.fill();
  }
  // Watering can by the path (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#4a7a8a';
    ctx.fillRect(168, 388, 30, 18);
    ctx.strokeStyle = '#4a7a8a';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(168, 392); ctx.lineTo(152, 380); ctx.stroke();
    ctx.beginPath(); ctx.arc(198, 392, 8, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  }
}

export const OBSERVATORY_DIFFS = [
  { id: 'telescope', name: 'The telescope points elsewhere', x: 330, y: 130, r: 30 },
  { id: 'globe', name: 'The globe turned around', x: 120, y: 330, r: 28 },
  { id: 'star', name: 'An extra star in the dome window', x: 480, y: 90, r: 22 },
  { id: 'candle', name: 'The candle flame went out', x: 430, y: 300, r: 24 },
  { id: 'chart', name: 'The star chart on the wall', x: 90, y: 130, r: 28 },
  { id: 'books', name: 'One more book on the stack', x: 220, y: 330, r: 26 },
  { id: 'moon', name: 'The moon changed phase', x: 510, y: 200, r: 26 },
  { id: 'compass', name: 'The brass compass on the desk', x: 350, y: 350, r: 24 },
];

function star(ctx, x, y, r, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath(); ctx.fill();
}

export function drawObservatory(ctx, variant) {
  // Night wall and dome window.
  const wall = ctx.createLinearGradient(0, 0, 0, 340);
  wall.addColorStop(0, '#1d2b4a');
  wall.addColorStop(1, '#2c3f66');
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, 600, 340);
  ctx.fillStyle = '#141d33';
  ctx.beginPath(); ctx.arc(480, 130, 105, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#0e1830';
  ctx.beginPath(); ctx.arc(480, 130, 96, Math.PI, 0); ctx.fill();
  // Stars in the dome.
  star(ctx, 430, 80, 7, '#ffe9a8');
  star(ctx, 470, 60, 5, '#ffffff');
  star(ctx, 520, 74, 6, '#ffffff');
  star(ctx, 545, 100, 5, '#ffe9a8');
  star(ctx, 405, 105, 5, '#ffffff');
  if (variant) star(ctx, 486, 92, 6, '#ffe9a8'); // one extra star
  // Moon: crescent left, full right.
  ctx.fillStyle = '#f5e9c8';
  ctx.beginPath(); ctx.arc(510, 200, 22, 0, Math.PI * 2); ctx.fill();
  if (!variant) {
    ctx.fillStyle = '#0e1830';
    ctx.beginPath(); ctx.arc(518, 196, 19, 0, Math.PI * 2); ctx.fill();
  }
  // Star chart pinned on the wall (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#f3e6c8';
    ctx.fillRect(56, 96, 70, 76);
    ctx.strokeStyle = '#7a5a34';
    ctx.lineWidth = 2;
    ctx.strokeRect(56, 96, 70, 76);
    star(ctx, 78, 118, 6, '#2c3f66');
    star(ctx, 104, 136, 5, '#2c3f66');
    star(ctx, 92, 152, 6, '#a33b2e');
    ctx.beginPath(); ctx.moveTo(78, 118); ctx.lineTo(104, 136); ctx.lineTo(92, 152); ctx.stroke();
  }
  // Wooden floor.
  ctx.fillStyle = '#6d4524';
  ctx.fillRect(0, 340, 600, 110);
  ctx.fillStyle = '#5d3a1e';
  for (let i = 0; i < 5; i++) ctx.fillRect(0, 340 + i * 22, 600, 3);
  // Telescope on its tripod.
  ctx.strokeStyle = '#8a6d3b';
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(300, 260); ctx.lineTo(270, 340); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(300, 260); ctx.lineTo(330, 340); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(300, 260); ctx.lineTo(300, 340); ctx.stroke();
  ctx.save();
  ctx.translate(300, 220);
  ctx.rotate(variant ? 0.5 : -0.5); // the tube points elsewhere
  ctx.fillStyle = '#3b4a6b';
  ctx.fillRect(-14, -70, 28, 110);
  ctx.fillStyle = '#c9a227';
  ctx.fillRect(-16, 34, 32, 10);
  ctx.fillStyle = '#1d2b4a';
  ctx.fillRect(-10, -82, 20, 14);
  ctx.restore();
  // Desk with globe, books, candle and compass.
  ctx.fillStyle = '#4a2d16';
  ctx.fillRect(60, 350, 480, 14);
  ctx.fillRect(76, 364, 12, 60);
  ctx.fillRect(512, 364, 12, 60);
  // Globe on its stand.
  ctx.strokeStyle = '#c9a227';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(120, 330, 8, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(120, 338); ctx.lineTo(120, 350); ctx.stroke();
  ctx.fillStyle = '#7fc4e8';
  ctx.beginPath(); ctx.arc(120, 308, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#3d7a44';
  if (!variant) {
    ctx.beginPath(); ctx.ellipse(112, 302, 12, 8, 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(130, 316, 9, 6, -0.3, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.beginPath(); ctx.ellipse(128, 300, 11, 9, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(110, 318, 8, 6, 0.3, 0, Math.PI * 2); ctx.fill();
  }
  // Book stack: three books left, four right.
  ctx.fillStyle = '#a33b2e'; ctx.fillRect(196, 336, 56, 9);
  ctx.fillStyle = '#2e5d8a'; ctx.fillRect(200, 327, 50, 9);
  ctx.fillStyle = '#3d7a44'; ctx.fillRect(204, 318, 44, 9);
  if (variant) { ctx.fillStyle = '#7a4a8a'; ctx.fillRect(208, 309, 38, 9); }
  // Candle: lit left, snuffed right.
  ctx.fillStyle = '#f3e6c8';
  ctx.fillRect(424, 312, 12, 38);
  ctx.fillStyle = '#c9a227';
  ctx.fillRect(422, 348, 16, 4);
  if (!variant) {
    ctx.fillStyle = '#f5a623';
    ctx.beginPath(); ctx.ellipse(430, 300, 6, 11, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffe9a8';
    ctx.beginPath(); ctx.ellipse(430, 302, 3, 6, 0, 0, Math.PI * 2); ctx.fill();
    const glow = ctx.createRadialGradient(430, 300, 4, 430, 300, 44);
    glow.addColorStop(0, 'rgba(255, 200, 90, 0.4)');
    glow.addColorStop(1, 'rgba(255, 200, 90, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(430, 300, 44, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(430, 310); ctx.quadraticCurveTo(436, 300, 430, 292); ctx.stroke();
  }
  // Brass compass on the desk (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#c9a227';
    ctx.beginPath(); ctx.arc(350, 348, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f3e6c8';
    ctx.beginPath(); ctx.arc(350, 348, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a33b2e';
    ctx.beginPath(); ctx.moveTo(350, 340); ctx.lineTo(347, 350); ctx.lineTo(353, 350); ctx.fill();
  }
  // Rug under the desk.
  ctx.fillStyle = '#5d3a6b';
  ctx.beginPath(); ctx.ellipse(300, 420, 170, 18, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#c9a227';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(300, 420, 140, 13, 0, 0, Math.PI * 2); ctx.stroke();
}

export const PANTRY_DIFFS = [
  { id: 'steam', name: 'Steam over the kettle', x: 300, y: 210, r: 26 },
  { id: 'apple', name: 'An apple in the fruit bowl', x: 150, y: 330, r: 24 },
  { id: 'label', name: 'The jam jar label changed colour', x: 90, y: 120, r: 22 },
  { id: 'pan', name: 'One more pan hanging up', x: 470, y: 130, r: 26 },
  { id: 'herbs', name: 'The bunch of herbs by the window', x: 520, y: 250, r: 24 },
  { id: 'bird', name: 'The bird outside the window', x: 300, y: 100, r: 24 },
  { id: 'mug', name: 'The mug on the counter', x: 420, y: 330, r: 24 },
  { id: 'towel', name: 'The towel on its hook', x: 560, y: 330, r: 24 },
];

function jar(ctx, x, y, fill, labelColour) {
  ctx.fillStyle = 'rgba(220, 230, 235, 0.85)';
  ctx.fillRect(x, y, 34, 44);
  ctx.fillStyle = fill;
  ctx.fillRect(x + 3, y + 12, 28, 29);
  ctx.fillStyle = '#8a6d3b';
  ctx.fillRect(x - 2, y - 4, 38, 8);
  ctx.fillStyle = labelColour;
  ctx.fillRect(x + 7, y + 20, 20, 12);
}

export function drawPantry(ctx, variant) {
  // Tiled wall and wooden counter.
  ctx.fillStyle = '#e8ddc8';
  ctx.fillRect(0, 0, 600, 300);
  ctx.strokeStyle = '#c9b896';
  ctx.lineWidth = 2;
  for (let y = 0; y < 300; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(600, y); ctx.stroke(); }
  for (let x = 0; x < 600; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 300); ctx.stroke(); }
  ctx.fillStyle = '#8a5a33';
  ctx.fillRect(0, 300, 600, 150);
  ctx.fillStyle = '#7a4e2b';
  for (let i = 0; i < 5; i++) ctx.fillRect(0, 300 + i * 30, 600, 3);
  // Counter top.
  ctx.fillStyle = '#5d3a1e';
  ctx.fillRect(30, 320, 540, 16);
  ctx.fillStyle = '#4a2d16';
  ctx.fillRect(40, 336, 520, 90);
  // Shelves with jars.
  ctx.fillStyle = '#6d4524';
  ctx.fillRect(40, 150, 220, 10);
  ctx.fillRect(40, 240, 220, 10);
  jar(ctx, 60, 106, '#c65b3b', variant ? '#2e5d8a' : '#e8b64c');
  jar(ctx, 104, 106, '#7a4a8a', '#e8b64c');
  jar(ctx, 148, 106, '#3d7a44', '#f3e6c8');
  jar(ctx, 192, 106, '#c65b3b', '#2e5d8a');
  jar(ctx, 60, 196, '#e8b64c', '#a33b2e');
  jar(ctx, 104, 196, '#3d7a44', '#f3e6c8');
  jar(ctx, 148, 196, '#c65b3b', '#e8b64c');
  jar(ctx, 192, 196, '#2e5d8a', '#f3e6c8');
  // Window with a bird outside (gone in the right picture).
  ctx.fillStyle = '#5d3a1e';
  ctx.fillRect(270, 50, 120, 120);
  ctx.fillStyle = '#a8d4f0';
  ctx.fillRect(278, 58, 104, 104);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.ellipse(320, 80, 24, 10, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(340, 90, 18, 8, 0, 0, Math.PI * 2); ctx.fill();
  if (!variant) {
    ctx.fillStyle = '#3b6ea5';
    ctx.beginPath(); ctx.ellipse(300, 104, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(310, 98, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f5c542';
    ctx.beginPath(); ctx.moveTo(315, 98); ctx.lineTo(322, 100); ctx.lineTo(315, 102); ctx.fill();
  }
  ctx.strokeStyle = '#5d3a1e';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(330, 58); ctx.lineTo(330, 162); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(278, 110); ctx.lineTo(382, 110); ctx.stroke();
  // Hanging pans: two left, three right.
  ctx.fillStyle = '#8a8a8a';
  ctx.beginPath(); ctx.arc(440, 128, 20, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5a5a5a';
  ctx.beginPath(); ctx.arc(440, 128, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#8a8a8a';
  ctx.beginPath(); ctx.arc(500, 128, 20, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#5a5a5a';
  ctx.beginPath(); ctx.arc(500, 128, 14, 0, Math.PI * 2); ctx.fill();
  if (variant) {
    ctx.fillStyle = '#8a8a8a';
    ctx.beginPath(); ctx.arc(470, 148, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#5a5a5a';
    ctx.beginPath(); ctx.arc(470, 148, 11, 0, Math.PI * 2); ctx.fill();
  }
  ctx.strokeStyle = '#6d4524';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(420, 60); ctx.lineTo(540, 60); ctx.stroke();
  // Herbs hanging by the window (gone in the right picture).
  if (!variant) {
    ctx.strokeStyle = '#2f6b33';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(520, 210); ctx.lineTo(520, 250); ctx.stroke();
    ctx.fillStyle = '#3d7a44';
    ctx.beginPath(); ctx.ellipse(520, 256, 12, 20, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(512, 250, 8, 12, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(528, 250, 8, 12, 0.4, 0, Math.PI * 2); ctx.fill();
  }
  // Fruit bowl on the counter.
  ctx.fillStyle = '#2e5d8a';
  ctx.beginPath(); ctx.ellipse(150, 330, 52, 12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f5c542';
  ctx.beginPath(); ctx.arc(132, 322, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(168, 322, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#e85d75';
  ctx.beginPath(); ctx.arc(150, 316, 10, 0, Math.PI * 2); ctx.fill();
  if (!variant) { // one more apple
    ctx.fillStyle = '#a33b2e';
    ctx.beginPath(); ctx.arc(150, 332, 10, 0, Math.PI * 2); ctx.fill();
  }
  // Kettle with steam (no steam in the right picture).
  ctx.fillStyle = '#4a4a4a';
  ctx.beginPath(); ctx.ellipse(300, 300, 30, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillRect(292, 272, 16, 12);
  ctx.strokeStyle = '#4a4a4a';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(272, 296); ctx.lineTo(256, 282); ctx.stroke();
  ctx.beginPath(); ctx.arc(330, 296, 10, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  if (!variant) {
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(300, 262); ctx.quadraticCurveTo(292, 240, 300, 222); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(312, 262); ctx.quadraticCurveTo(320, 244, 312, 228); ctx.stroke();
  }
  // Mug on the counter (gone in the right picture).
  if (!variant) {
    ctx.fillStyle = '#c65b7c';
    ctx.fillRect(408, 306, 26, 22);
    ctx.strokeStyle = '#c65b7c';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(436, 316, 8, -Math.PI / 2, Math.PI / 2); ctx.stroke();
  }
  // Towel on its hook: red left, blue right.
  ctx.fillStyle = variant ? '#2e5d8a' : '#a33b2e';
  ctx.fillRect(548, 316, 26, 46);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillRect(548, 330, 26, 5);
  ctx.fillStyle = '#6d4524';
  ctx.beginPath(); ctx.arc(561, 312, 5, 0, Math.PI * 2); ctx.fill();
}

// Scene registry: painter + differences, keyed by the config's painter name.
export const SCENE_SETS = {
  drawReadingRoom: { paint: drawReadingRoom, diffs: READING_ROOM_DIFFS },
  drawConservatory: { paint: drawConservatory, diffs: CONSERVATORY_DIFFS },
  drawObservatory: { paint: drawObservatory, diffs: OBSERVATORY_DIFFS },
  drawPantry: { paint: drawPantry, diffs: PANTRY_DIFFS },
};
