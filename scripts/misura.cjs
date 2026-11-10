/* =====================================================================
   Misura la leggerezza delle pagine (docs/decisioni.md, "Leggerezza"):
   telefono medio simulato (412×823, CPU 4 volte più lenta, rete 4G
   lenta), build di produzione, mediana di 3 caricamenti.

     npm run build && npx next start -p 3300
     node scripts/misura.cjs http://localhost:3300 / /trattamenti
     node scripts/misura.cjs http://localhost:3300 / --senza=data-marquee,data-spin
     node scripts/misura.cjs http://localhost:3300 / --fermo      (riduci movimento)

   TBT: somma della parte oltre i 50 ms dei task lunghi, dal primo disegno
   (FCP) a 5 secondi dopo il caricamento (comprende l'avvio del motore
   delle animazioni, che arriva dopo l'idratazione). LCP e CLS come li
   riporta il browser. --senza=… toglie quegli attributi prima che parta
   il motore: così si misura il costo di un effetto (prima/dopo) senza
   toccare il codice. I numeri valgono come confronto dentro la stessa
   sessione di misura.

   Usa Playwright (Chromium), che non è una dipendenza del progetto.
   ===================================================================== */
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const base = (args.find((a) => /^https?:/.test(a)) ?? 'http://localhost:3300').replace(/\/$/, '');
const paths = args.filter((a) => a.startsWith('/'));
const senza = (args.find((a) => a.startsWith('--senza=')) ?? '').replace('--senza=', '').split(',').filter(Boolean);
const giri = Number((args.find((a) => a.startsWith('--giri=')) ?? '--giri=3').split('=')[1]) || 3;
/** --fermo: "riduci movimento", il motore non si scarica nemmeno. */
const fermo = args.includes('--fermo');

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

async function una(browser, url) {
  const ctx = await browser.newContext({
    viewport: { width: 412, height: 823 },
    deviceScaleFactor: 2.625,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
    reducedMotion: fermo ? 'reduce' : 'no-preference',
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript((senza) => {
    const p = (window.__perf = { long: [], lcp: 0, cls: 0, fcp: 0 });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => p.long.push([e.startTime, e.duration]))).observe({ type: 'longtask', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (p.lcp = e.startTime))).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) p.cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.name === 'first-contentful-paint') p.fcp = e.startTime; })).observe({ type: 'paint', buffered: true });
    if (senza.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const a of senza) document.querySelectorAll(`[${a}]`).forEach((el) => el.removeAttribute(a));
      });
    }
  }, senza);
  await page.goto(url, { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(5000);
  const r = await page.evaluate(() => {
    const p = window.__perf;
    const tbt = p.long.filter(([s]) => s >= p.fcp).reduce((t, [, d]) => t + Math.max(0, d - 50), 0);
    return { tbt, lcp: p.lcp, cls: p.cls, fcp: p.fcp };
  });
  await ctx.close();
  return r;
}

(async () => {
  const browser = await chromium.launch();
  console.log(`Misura: ${base} · ${giri} giri · telefono medio, CPU ×4, 4G lento${senza.length ? ` · senza ${senza.join(', ')}` : ''}${fermo ? ' · riduci movimento' : ''}`);
  console.log('pagina'.padEnd(16), 'TBT (ms)'.padStart(9), 'LCP (s)'.padStart(8), 'CLS'.padStart(6), 'FCP (s)'.padStart(8));
  for (const p of paths.length ? paths : ['/']) {
    const runs = [];
    for (let i = 0; i < giri; i++) runs.push(await una(browser, base + p));
    const tbt = median(runs.map((r) => r.tbt));
    const lcp = median(runs.map((r) => r.lcp)) / 1000;
    const cls = median(runs.map((r) => r.cls));
    const fcp = median(runs.map((r) => r.fcp)) / 1000;
    console.log(p.padEnd(16), String(Math.round(tbt)).padStart(9), lcp.toFixed(2).padStart(8), cls.toFixed(3).padStart(6), fcp.toFixed(2).padStart(8));
  }
  await browser.close();
})();
