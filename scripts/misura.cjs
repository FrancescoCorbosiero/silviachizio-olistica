/* =====================================================================
   Misura la leggerezza delle pagine (docs/decisioni.md, "Leggerezza"):
   telefono medio simulato (412×823, CPU 4 volte più lenta, rete 4G
   lenta), build di produzione, mediana di 3 caricamenti.

     npm run build && npx next start -p 3300
     node scripts/misura.cjs http://localhost:3300 / /trattamenti
     node scripts/misura.cjs http://localhost:3300 / --senza=data-marquee,data-spin
     node scripts/misura.cjs http://localhost:3300 / --fermo      (riduci movimento)
     node scripts/misura.cjs http://localhost:3300 / --cpu=7      (macchina veloce)

   TBT: somma della parte oltre i 50 ms dei task lunghi, dal primo disegno
   (FCP) a 5 secondi dopo il caricamento (comprende l'avvio del motore
   delle animazioni, che arriva dopo l'idratazione). LCP e CLS come li
   riporta il browser. JS: il tempo di esecuzione di JavaScript sul thread
   principale in tutto il caricamento (Performance.getMetrics di Chrome,
   ScriptDuration), che conta anche il lavoro spezzato in task brevi: è la
   misura che separa il costo di un effetto quando il TBT è 0. --senza=… toglie quegli attributi prima che parta
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
/**
 * --cpu=N: quanto rallentare la CPU (di base 4, come Lighthouse). Il 4× di
 * Lighthouse è tarato su un desktop con indice di benchmark 1500–2000: su una
 * macchina più veloce serve di più per simulare lo stesso telefono medio
 * (indice ≈ 450). Lo script stampa l'indice della macchina e il moltiplicatore
 * consigliato.
 */
const cpu = Number((args.find((a) => a.startsWith('--cpu=')) ?? '--cpu=4').split('=')[1]) || 4;

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
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  await cdp.send('Performance.enable');
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
    // Una pagina che non si idrata (es. un server vecchio con i file di
    // un'altra build) dà numeri bellissimi e falsi: si controlla sempre.
    const idratata = typeof window.next === 'object';
    return { tbt, lcp: p.lcp, cls: p.cls, fcp: p.fcp, idratata };
  });
  // Il lavoro JavaScript sul thread principale (anche nei task brevi), da Chrome.
  const { metrics } = await cdp.send('Performance.getMetrics');
  const m = Object.fromEntries(metrics.map((x) => [x.name, x.value]));
  await ctx.close();
  return { ...r, js: (m.ScriptDuration ?? 0) * 1000 };
}

/** L'indice di benchmark di Lighthouse (computeBenchmarkIndex), nella pagina. */
async function benchmarkIndex(browser) {
  const page = await browser.newPage();
  const idx = await page.evaluate(() => {
    function gc() {
      const start = Date.now();
      let it = 0;
      while (Date.now() - start < 500) {
        let s = '';
        for (let j = 0; j < 10000; j++) s += 'a';
        if (s.length !== 10000) break; // il lavoro è il benchmark: la stringa non serve
        it++;
      }
      return Math.round(it / 10 / ((Date.now() - start) / 1000));
    }
    function nogc() {
      const a = [];
      const b = [];
      for (let i = 0; i < 100000; i++) a[i] = b[i] = i;
      const start = Date.now();
      let it = 0;
      while (it % 10 !== 0 || Date.now() - start < 500) {
        const src = it % 2 === 0 ? a : b;
        const tgt = it % 2 === 0 ? b : a;
        for (let j = 0; j < src.length; j++) tgt[j] = src[j];
        it++;
      }
      return Math.round(it / 10 / ((Date.now() - start) / 1000));
    }
    return (gc() + nogc()) / 2;
  });
  await page.close();
  return idx;
}

(async () => {
  const browser = await chromium.launch();
  const idx = await benchmarkIndex(browser);
  console.log(`Indice di benchmark della macchina: ${Math.round(idx)} (telefono medio ≈ 450: CPU consigliata ×${Math.max(1, Math.round(idx / 450))})`);
  console.log(`Misura: ${base} · ${giri} giri · telefono medio, CPU ×${cpu}, 4G lento${senza.length ? ` · senza ${senza.join(', ')}` : ''}${fermo ? ' · riduci movimento' : ''}`);
  console.log('pagina'.padEnd(16), 'TBT (ms)'.padStart(9), 'LCP (s)'.padStart(8), 'CLS'.padStart(6), 'FCP (s)'.padStart(8), 'JS (ms)'.padStart(8));
  for (const p of paths.length ? paths : ['/']) {
    const runs = [];
    for (let i = 0; i < giri; i++) runs.push(await una(browser, base + p));
    const tbt = median(runs.map((r) => r.tbt));
    const lcp = median(runs.map((r) => r.lcp)) / 1000;
    const cls = median(runs.map((r) => r.cls));
    const fcp = median(runs.map((r) => r.fcp)) / 1000;
    const js = median(runs.map((r) => r.js));
    const secche = runs.filter((r) => !r.idratata).length;
    if (secche) console.log(`! ${p}: la pagina non si è idratata in ${secche} giri su ${runs.length} — il server serve la build giusta?`);
    console.log(p.padEnd(16), String(Math.round(tbt)).padStart(9), lcp.toFixed(2).padStart(8), cls.toFixed(3).padStart(6), fcp.toFixed(2).padStart(8), String(Math.round(js)).padStart(8));
  }
  await browser.close();
})();
