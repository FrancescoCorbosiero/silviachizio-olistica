/* =====================================================================
   Le immagini d'atmosfera (public/atmosfere/): disegnate in canvas da
   scripts/atmosfere.html, in due tagli (orizzontale per desktop,
   verticale per telefono). Segnaposto onesti finché non arrivano le foto
   vere di Silvia e dello studio: si sostituiscono in src/lib/immagini.ts.

     node scripts/atmosfere.cjs

   Usa Playwright (Chromium), che non è una dipendenza del progetto.
   ===================================================================== */
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, '..', 'public', 'atmosfere');
const LAVORI = [
  ['ombre', ''],
  ['ombre-specchio', 'specchio', 'ombre'],
  ['seta', ''],
  ['seta-scuro', 'scuro', 'seta'],
  ['candela', ''],
  ['velo', ''],
  ['lino', ''],
];
const TAGLI = { '': [2000, 1250], '-v': [900, 1500] };

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'atmosfere.html'));
  for (const [nome, variante, fonte = nome] of LAVORI) {
    for (const [suffisso, [w, h]] of Object.entries(TAGLI)) {
      const url = await page.evaluate(([f, w, h, v]) => window.genera(f, w, h, v), [fonte, w, h, variante]);
      const file = path.join(OUT, `${nome}${suffisso}.webp`);
      fs.writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
      console.log(file, Math.round(fs.statSync(file).size / 1024) + ' kB');
    }
  }
  await browser.close();
})();
