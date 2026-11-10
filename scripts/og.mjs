import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const sharp = require(join(root, 'node_modules/.pnpm/sharp@0.34.5/node_modules/sharp'));

const photo = join(root, 'public/images/plate-dalian.webp');
const out = join(root, 'public/og.png');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#100e13" stop-opacity="0.2"/>
      <stop offset="0.42" stop-color="#100e13" stop-opacity="0"/>
      <stop offset="1" stop-color="#100e13" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#s)"/>
  <text x="72" y="418" fill="#cfc9d4" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="22">plate 01 · dalian · 18:40</text>
  <text x="72" y="500" fill="#f3efe6" font-family="DejaVu Serif, Liberation Serif, serif" font-size="68" font-style="italic">Achraf Ouazzani Chahidi</text>
  <text x="72" y="558" fill="#d4c6f2" font-family="JetBrains Mono, DejaVu Sans Mono, monospace" font-size="24">21@achux.xyz</text>
</svg>`;

const base = await sharp(photo)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer();

await sharp(base)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .png()
  .toFile(out);

console.log('wrote', out);
