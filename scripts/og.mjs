import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontDir = join(root, 'node_modules/@fontsource/ibm-plex-mono/files');
const photo = join(root, 'public/images/plate-dalian.webp');
const out = join(root, 'public/og.png');
const htmlPath = '/tmp/achux-og.html';

const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'IBM Plex Mono';
    font-weight: 400;
    src: url('file://${fontDir}/ibm-plex-mono-latin-400-normal.woff2') format('woff2');
  }
  @font-face {
    font-family: 'IBM Plex Mono';
    font-weight: 700;
    src: url('file://${fontDir}/ibm-plex-mono-latin-700-normal.woff2') format('woff2');
  }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #100e13; }
  .card { position: relative; width: 1200px; height: 630px; }
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
  .shade {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgb(16 14 19 / 0.9) 0%, rgb(16 14 19 / 0) 48%, rgb(16 14 19 / 0.2) 100%);
  }
  .text { position: absolute; left: 72px; right: 72px; bottom: 56px; font-family: 'IBM Plex Mono', monospace; }
  .meta { margin: 0 0 14px; color: #cfc9d4; font-weight: 400; font-size: 20px; letter-spacing: 0.02em; }
  .name { margin: 0; color: #f3efe6; font-weight: 700; font-size: 46px; letter-spacing: -0.04em; line-height: 1.15; }
  .mail { margin: 14px 0 0; color: #d4c6f2; font-weight: 400; font-size: 22px; }
</style>
<div class="card">
  <img src="file://${photo}" alt="">
  <div class="shade"></div>
  <div class="text">
    <p class="meta">plate 01 · dalian · 18:40</p>
    <p class="name">Achraf Ouazzani Chahidi</p>
    <p class="mail">21@achux.xyz</p>
  </div>
</div>
`;
writeFileSync(htmlPath, html);

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  `--window-size=1200,630`,
  `--screenshot=${out}`,
  `file://${htmlPath}`,
], { stdio: 'inherit' });

const code = await new Promise((resolve) => chrome.on('exit', resolve));
if (code !== 0) process.exit(code ?? 1);
console.log('wrote', out);
