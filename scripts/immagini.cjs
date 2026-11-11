/* =====================================================================
   Genera le immagini statiche del sito dal logo provvisorio e dal giglio:
   icone (favicon, Apple, manifest), immagini Open Graph (1200×630) e il
   logo PNG per le email. Si rilancia quando arriva il logo originale di
   Silvia o quando cambia un titolo.

     node scripts/immagini.cjs

   Usa Playwright (Chromium), che non è una dipendenza del progetto: serve
   averlo installato a parte (npx playwright install chromium) oppure in un
   ambiente dove `require('playwright')` funziona già. Le immagini prodotte
   si committano: il sito non dipende da questo script.
   ===================================================================== */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const FONTS = path.join(ROOT, 'src', 'fonts');

const LILY = '#e00b57';

/** Il giglio in piccolo (IconaGiglio di src/components/icons.tsx). */
const GIGLIO_ICONA = `
  <path d="M12 2.6c2 2.5 2.3 6.4 0 10-2.3-3.6-2-7.5 0-10Z" />
  <path d="M11.5 12.7c-3.4.3-6.9-1.5-9.3-4.6 1.5-.5 3-.3 4.4.3 2.3 1 4 2.5 4.9 4.3Z" />
  <path d="M12.5 12.7c3.4.3 6.9-1.5 9.3-4.6-1.5-.5-3-.3-4.4.3-2.3 1-4 2.5-4.9 4.3Z" />
  <path d="M11.6 13.4c-2.7 1.4-4.8 3.8-5.5 6.9 3-.7 5.1-3 5.5-6.9Z" />
  <path d="M12.4 13.4c2.7 1.4 4.8 3.8 5.5 6.9-3-.7-5.1-3-5.5-6.9Z" />
  <path d="M12 12.8v8.4" />`;

/** Icona: giglio bianco su fondo rosa. `forma`: cerchio (favicon) o pieno (app). */
function iconaSvg({ forma = 'pieno', margine = 0.2, tratto = 1.6 } = {}) {
  const k = 1 - margine * 2;
  const t = (24 * margine) / k;
  const fondo = forma === 'cerchio' ? `<circle cx="12" cy="12" r="12" fill="${LILY}"/>` : `<rect width="24" height="24" fill="${LILY}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${fondo}<g transform="scale(${k}) translate(${t} ${t})" fill="none" stroke="#fff" stroke-width="${tratto}" stroke-linecap="round" stroke-linejoin="round">${GIGLIO_ICONA}</g></svg>`;
}

// I font entrano come data URI: una pagina aperta con setContent non può leggere file://.
const font = (file, family, weight, style = 'normal') =>
  `@font-face{font-family:'${family}';src:url('data:font/woff2;base64,${fs.readFileSync(path.join(FONTS, file)).toString('base64')}') format('woff2');font-weight:${weight};font-style:${style};}`;

const FONT_CSS = [
  font('playfair-display-latin-wght-normal.woff2', 'Playfair Display', '400 900'),
  font('cormorant-garamond-latin-500-italic.woff2', 'Cormorant Garamond', '500', 'italic'),
  font('cormorant-garamond-latin-600-italic.woff2', 'Cormorant Garamond', '600', 'italic'),
  font('figtree-latin-wght-normal.woff2', 'Figtree', '300 900'),
  font('damion-latin-400-normal.woff2', 'Damion', '400'),
].join('\n');

/** Le immagini Open Graph: una per pagina (testi come i titoli delle pagine). */
const OG = [
  { file: 'home', titolo: 'Uno spazio per <i>rallentare</i>', sotto: 'Massaggi e rituali olistici a Montebelluna (TV) · Letture intuitive a distanza' },
  { file: 'trattamenti', manifesto: true, titolo: 'Listino<br><b>Trattamenti</b>', sotto: 'Quattro esperienze di benessere' },
  { file: 'letture', titolo: 'Letture <i>intuitive</i>', sotto: 'Una lettura simbolica e intuitiva personalizzata, via email' },
  { file: 'prenota', titolo: 'Prenota un <i>trattamento</i>', sotto: 'Ti scrivo io per fissare giorno e ora' },
  { file: 'chi-sono', titolo: 'Silvia Chizio', script: 'Vivo e sorrido', sotto: 'Lily Trattamenti Benessere · Montebelluna (TV)' },
  { file: 'contatti', titolo: 'Dove <i>trovarmi</i>', sotto: 'Lo studio a Montebelluna (TV) e i miei canali' },
  { file: 'privacy', titolo: 'Privacy e cookie', sotto: 'I tuoi dati, detti semplici' },
  { file: 'bio', titolo: 'Prenota o richiedi una <i>lettura</i>', sotto: 'Lily Trattamenti Benessere · Montebelluna (TV)' },
];

function ogHtml(o) {
  const logo = fs.readFileSync(path.join(PUBLIC, 'brand', 'logo.svg'), 'utf8');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${FONT_CSS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1200px;height:630px}
body{position:relative;overflow:hidden;font-family:Figtree,sans-serif;color:#2a1b17;background:#f2e4dd}
.bordino{position:absolute;left:0;right:0;bottom:0;height:10px;background:#221814;border-top:3px solid #f24f80}
.testo{position:absolute;left:84px;top:0;bottom:10px;width:640px;display:flex;flex-direction:column;justify-content:center;gap:22px}
.eyebrow{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:600;font-size:32px;color:#c40a4c}
h1{font-family:'Playfair Display',serif;font-weight:800;font-size:76px;line-height:1.04;letter-spacing:-.012em}
h1 i{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;color:#c40a4c;font-size:1.1em}
h1.manifesto{text-transform:uppercase;font-weight:900;font-size:86px;line-height:.98}
h1.manifesto b{color:${LILY};font-weight:900}
.script{font-family:Damion,cursive;color:${LILY};font-size:58px;line-height:1}
.sotto{text-wrap:balance;font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:600;font-size:36px;line-height:1.25;color:#2a1b17;max-width:600px}
.logo{position:absolute;right:70px;top:50%;transform:translateY(-52%);width:360px}
.logo svg{width:100%;height:auto;display:block}
.alone{display:none}
</style></head><body>
<div class="alone"></div>
<div class="testo">
  <p class="eyebrow">Lily Trattamenti Benessere</p>
  <h1 class="${o.manifesto ? 'manifesto' : ''}">${o.titolo}</h1>
  ${o.script ? `<p class="script">${o.script}</p>` : ''}
  <p class="sotto">${o.sotto}</p>
</div>
<div class="logo">${logo}</div>
<div class="bordino"></div>
</body></html>`;
}

async function main() {
  const browser = await chromium.launch();
  const shot = async (html, file, w, h, { transparent = false, type = 'png' } = {}) => {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: file, type, omitBackground: transparent, ...(type === 'jpeg' ? { quality: 86 } : {}) });
    await page.close();
  };
  const svgPage = (svg, w, h) =>
    `<!doctype html><html><head><style>*{margin:0}html,body{width:${w}px;height:${h}px;background:transparent}svg{display:block;width:${w}px;height:${h}px}</style></head><body>${svg}</body></html>`;

  // Icone
  const icons = path.join(PUBLIC, 'icons');
  fs.mkdirSync(icons, { recursive: true });
  await shot(svgPage(iconaSvg({ forma: 'pieno', margine: 0.2 }), 512, 512), path.join(icons, 'icon-512.png'), 512, 512);
  await shot(svgPage(iconaSvg({ forma: 'pieno', margine: 0.2 }), 192, 192), path.join(icons, 'icon-192.png'), 192, 192);
  // Maskable: il giglio dentro la zona sicura (80% centrale).
  await shot(svgPage(iconaSvg({ forma: 'pieno', margine: 0.28 }), 512, 512), path.join(icons, 'icon-maskable-512.png'), 512, 512);
  await shot(svgPage(iconaSvg({ forma: 'pieno', margine: 0.18 }), 180, 180), path.join(ROOT, 'src', 'app', 'apple-icon.png'), 180, 180);
  await shot(svgPage(iconaSvg({ forma: 'cerchio', margine: 0.17, tratto: 2 }), 32, 32), path.join(icons, 'favicon-32.png'), 32, 32, { transparent: true });
  await shot(svgPage(iconaSvg({ forma: 'cerchio', margine: 0.17, tratto: 2.2 }), 16, 16), path.join(icons, 'favicon-16.png'), 16, 16, { transparent: true });
  fs.writeFileSync(path.join(ROOT, 'src', 'app', 'icon.svg'), iconaSvg({ forma: 'cerchio', margine: 0.17, tratto: 1.8 }) + '\n');

  // Il logo per le email (molti programmi di posta non mostrano gli SVG):
  // 224×232, il doppio della misura con cui lo mostra src/lib/emails.ts.
  const logoSvg = fs.readFileSync(path.join(PUBLIC, 'brand', 'logo.svg'), 'utf8');
  await shot(svgPage(logoSvg, 224, 232), path.join(PUBLIC, 'brand', 'logo-email.png'), 224, 232, { transparent: true });

  // Open Graph
  const og = path.join(PUBLIC, 'og');
  fs.mkdirSync(og, { recursive: true });
  for (const o of OG) await shot(ogHtml(o), path.join(og, `${o.file}.jpg`), 1200, 630, { type: 'jpeg' });

  await browser.close();
  console.log('Immagini generate: public/icons, src/app/icon.svg e apple-icon.png, public/brand/logo-email.png, public/og');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
