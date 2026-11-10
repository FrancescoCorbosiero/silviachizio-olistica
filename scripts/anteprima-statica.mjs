/* =====================================================================
   Anteprima statica del sito, per un hosting senza server (Netlify Drop:
   app.netlify.com/drop). Il deploy vero resta Docker + Caddy (README).
   In Node, così gira uguale su Windows, macOS e Linux.

     npm run anteprima
     npm run anteprima -- https://lily-olistica.netlify.app

   L'indirizzo (facoltativo) va in canonical, sitemap e immagini per i
   social. Costruisce senza src/app/api (un sito statico non ha server): le
   richieste non partono e mostrano il ripiego (testo da copiare e
   Instagram). Su Netlify si trascina la cartella anteprima-netlify
   (contiene index.html), non public/.
   È un'anteprima anche nei contenuti: NEXT_PUBLIC_ANTEPRIMA=1 mostra ogni
   blocco, anche quelli che aspettano un dato di Silvia, con un esempio
   segnato «Esempio» (src/lib/anteprima.ts). Per un'anteprima solo con i
   dati veri: NEXT_PUBLIC_ANTEPRIMA=0 npm run anteprima.
   ===================================================================== */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API = join(ROOT, 'src', 'app', 'api');
const PARK = join(ROOT, '.api-in-pausa');
const OUT = join(ROOT, 'out');
const DEST = join(ROOT, 'anteprima-netlify');

const url = process.argv.slice(2).find((a) => /^https?:\/\//.test(a)) ?? process.env.NEXT_PUBLIC_SITE_URL ?? '';

// Un giro precedente interrotto a metà: l'API torna al suo posto.
if (existsSync(PARK) && !existsSync(API)) renameSync(PARK, API);

// L'API non c'è in un sito statico: si sposta fuori da src/app per la build
// e si rimette al suo posto alla fine, anche se la build fallisce.
renameSync(API, PARK);
let ok = false;
try {
  // I tipi generati da next dev citano ancora l'API: si rigenerano da soli.
  rmSync(join(ROOT, '.next', 'dev', 'types'), { recursive: true, force: true });
  const r = spawnSync('npx', ['next', 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      ANTEPRIMA_STATICA: '1',
      NEXT_PUBLIC_ANTEPRIMA: process.env.NEXT_PUBLIC_ANTEPRIMA ?? '1',
      NEXT_TELEMETRY_DISABLED: '1',
      ...(url ? { NEXT_PUBLIC_SITE_URL: url } : {}),
    },
  });
  ok = r.status === 0;
} finally {
  renameSync(PARK, API);
}
if (!ok) {
  console.error('La build dell\'anteprima non è riuscita: vedi gli errori qui sopra.');
  process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });
renameSync(OUT, DEST);

// Netlify: /bio → bio.html anche se accanto c'è la cartella bio/ (dati RSC).
const pagine = readdirSync(DEST)
  .filter((f) => f.endsWith('.html'))
  .map((f) => f.slice(0, -5))
  .filter((n) => !['index', '404', '_not-found'].includes(n));
writeFileSync(join(DEST, '_redirects'), pagine.map((n) => `/${n}  /${n}.html  200`).join('\n') + '\n');

console.log(`\nPronta: anteprima-netlify/ — trascinala su https://app.netlify.com/drop${url ? ` (indirizzo: ${url})` : ''}`);
console.log('Dopo l\'anteprima, npm run build rifà la build normale (standalone).');
