/* =====================================================================
   Il video di sfondo della hero (public/video/): l'immagine d'atmosfera
   «ombre» che prende vita, disegnata fotogramma per fotogramma in canvas
   da scripts/video-hero.html e montata con ffmpeg. Luce del pomeriggio su
   un muro rosa antico, ombre di gigli che ondeggiano piano; il ciclo si
   ripete senza salto. Segnaposto onesto finché non c'è un video vero dello
   studio: niente video stock.

     NODE_PATH=$(npm root -g) node scripts/video-hero.cjs

   Escono due tagli, orizzontale (1280×720, desktop) e verticale (720×1280,
   telefono), ognuno in MP4 (H.264, per tutti i browser) e WebM (VP9, più
   leggero dove si può), più il primo fotogramma in WebP da usare come
   poster: coincide con l'inizio del video, così quando parte non c'è salto.

   Usa Playwright (Chromium), che non è una dipendenza del progetto, e
   ffmpeg con libx264 e libvpx-vp9 (FFMPEG=/percorso/ffmpeg per un altro).
   ===================================================================== */
const { chromium } = require('playwright');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const OUT = path.join(__dirname, '..', 'public', 'video');
const FPS = 24;
const SECONDI = 12;
const N = FPS * SECONDI;
const TAGLI = [
  ['hero', 1280, 720, false],
  ['hero-v', 720, 1280, true],
];

function ffmpeg(args) {
  const r = spawnSync(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`ffmpeg non è riuscito (${args.at(-1)})`);
}

/* Un taglio: fotogrammi in JPEG in una cartella temporanea, poi ffmpeg. */
async function taglio(browser, tmp, [nome, w, h, verticale]) {
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'video-hero.html'));
  await page.evaluate(([w, h, v]) => window.prepara(w, h, v), [w, h, verticale]);
  const dir = path.join(tmp, nome);
  fs.mkdirSync(dir);
  for (let i = 0; i < N; i++) {
    const url = await page.evaluate(([i, n]) => window.fotogramma(i, n), [i, N]);
    fs.writeFileSync(path.join(dir, `f${String(i).padStart(4, '0')}.jpg`), Buffer.from(url.split(',')[1], 'base64'));
    if (i % (FPS * 2) === 0) console.log(`${nome}: ${i}/${N}`);
  }
  // il poster: lo stesso fotogramma 0
  const poster = await page.evaluate(([n]) => window.fotogramma(0, n, 'image/webp', 0.82), [N]);
  fs.writeFileSync(path.join(OUT, `${nome}.webp`), Buffer.from(poster.split(',')[1], 'base64'));
  await page.close();

  const input = ['-framerate', String(FPS), '-i', path.join(dir, 'f%04d.jpg'), '-vf', 'scale=in_range=full:out_range=tv,format=yuv420p', '-an'];
  ffmpeg([...input, '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '23', '-profile:v', 'high', '-tune', 'film',
    '-color_range', 'tv', '-movflags', '+faststart', path.join(OUT, `${nome}.mp4`)]);
  ffmpeg([...input, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '33', '-deadline', 'good', '-cpu-used', '1', '-row-mt', '1',
    '-color_range', 'tv', path.join(OUT, `${nome}.webm`)]);
  for (const ext of ['mp4', 'webm', 'webp']) {
    const f = path.join(OUT, `${nome}.${ext}`);
    console.log(`  ${path.relative(path.join(__dirname, '..'), f)}  ${Math.round(fs.statSync(f).size / 1024)} kB`);
  }
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lily-video-'));
  const browser = await chromium.launch();
  try {
    // i due tagli insieme, su due pagine (due processi)
    await Promise.all(TAGLI.map((t) => taglio(browser, tmp, t)));
  } finally {
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
})();
