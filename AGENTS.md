<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Lily Trattamenti Benessere — sito di Silvia Chizio

Sito di **Lily Trattamenti Benessere**, l'attività di Silvia Chizio a
Montebelluna (TV): quattro trattamenti in studio e letture intuitive a distanza.
Silvia lavora da Instagram (@silvia_chizio); il sito è la sua vetrina e, domani,
la base del gestionale (fasi 2–3, `docs/web-app.md`).

**Stato del repository** (novembre 2026): il sito è una **landing a pagina
unica** (`/`) più l'informativa (`/privacy`). Le richieste passano dal **modulo
Google** di Silvia: ogni «Prenota» apre il modulo in un'altra scheda. Le
richieste fatte dal sito (flussi a passi, invio con SES) sono nel codice,
**spente**, e si riaccendono con un interruttore: `RICHIESTE_DAL` in
`src/lib/site.ts` (perché: `docs/decisioni.md`, «Le richieste passano dal modulo
Google»). Manca la messa online (passo 10 di `docs/roadmap.md`). I testi in bozza
sono in `docs/testi-da-validare.md`, i dati che mancano in `docs/domande-aperte.md`.

## Leggi prima

1. `docs/brief.md` — chi è Silvia, cosa offre, a chi parla, come lavora oggi.
2. `docs/spec.md` — la landing, le richieste, le regole dei testi.
3. `docs/brand.md` — il Brand System «Lily», concetto «Luce», e il movimento.
4. `docs/riferimenti.md` — cosa prendere dai progetti di riferimento, e cosa no.
5. `docs/decisioni.md` — le scelte già fatte e il perché (le più recenti in fondo).
6. `docs/roadmap.md` — i passi, in ordine, con il criterio di "fatto".

Per dopo: `docs/web-app.md` (gestionale prenotazioni e newsletter). Quello che
ancora non sappiamo: `docs/domande-aperte.md`. Immagini di partenza (listino,
profilo Instagram, form attuale, palette, confronti dei font): `docs/immagini/`.

## Progetti di riferimento

Repository pubblici dello studio. Clonali in sola lettura **fuori** da questo
progetto:

```bash
git clone --depth 1 https://github.com/FrancescoCorbosiero/andrea-bellettati ../riferimenti/andrea-bellettati
git clone --depth 1 https://github.com/FrancescoCorbosiero/ireandlunaslife ../riferimenti/ireandlunaslife
```

- **andrea-bellettati** è la base tecnica: stack, Konsta UI, flussi a passi,
  invio con SES, motore delle animazioni, deploy.
- **ireandlunaslife** è il riferimento per la cura visiva e il movimento.
- **zirano-ditta** (Ziranu Arredi) è il riferimento per il livello di disegno e
  di codice: un concetto solo, pochi componenti fatti bene, dati in un punto,
  testi descrittivi. Lo stile resta di Lily.
- Da nessuno si prendono testi, colori, font, foto o metafore. La mappa file per
  file è in `docs/riferimenti.md`.

## Regole della casa

- **Lingua**: testi del sito, commenti e messaggi di commit in italiano.
- **Voce**: prima persona (parla Silvia), il "tu", frasi semplici e calde, niente
  slogan: titoli descrittivi. Linguaggio del benessere, mai sanitario: niente
  "cura", "terapia", "guarire", né promesse di risultati. Non dare per scontato
  il genere di chi legge. Le letture hanno valore orientativo e riflessivo
  (disclaimer integrale in `src/lib/trattamenti.ts`, accanto a ogni richiesta).
- **Fatti, mai inventati**: prezzi, indirizzo, orari, numeri, formazione,
  recensioni e testimonianze arrivano solo da Silvia. Finché mancano, il valore in
  `src/lib/site.ts` resta vuoto e il blocco che lo usa non compare; la domanda sta
  in `docs/domande-aperte.md`. Eccezione dichiarata: l'**anteprima** (sviluppo e
  `npm run anteprima`) mostra ogni blocco con un esempio segnato «Esempio»,
  passando da `src/lib/anteprima.ts`; nella build di produzione gli esempi non ci
  sono e non vanno mai in dati strutturati, email o flussi.
- **Bozze dichiarate**: i testi scritti da te sono bozze. Segnale con un commento
  `BOZZA` accanto al testo e tieni l'elenco in `docs/testi-da-validare.md`.
- **Una fonte per ogni dato**: contatti, link, modulo Google e interruttore delle
  richieste in `src/lib/site.ts`; dove porta ogni bottone di richiesta in
  `src/lib/richieste.ts`; i trattamenti e le letture in `src/lib/trattamenti.ts`;
  le domande frequenti in `src/lib/domande.ts`; le immagini in
  `src/lib/immagini.ts`. Pagine, flussi, email e dati strutturati leggono da lì.
- **Stile**: Brand System in `src/app/globals.css`. I componenti leggono i colori
  semantici del tono della sezione (`tono-sabbia`, `tono-latte`, `tono-vino`,
  `tono-notte` → `--bg`, `--fg`, `--fg-soft`, `--fg-mute`, `--line`,
  `--accent`): usa classi e toni esistenti (`.display`, `.titolo`, `.titoletto`,
  `.lead`, `.meta`, `.cifre`, `.corsivo`, `.btn`, `.link`, `.arco`, `.voce`,
  `.faq`…) prima di inventarne di nuove. Una forma curva sola, l'arco; niente
  sticker, rotazioni, ombre "a timbro", etichette sopra ogni titolo.
- **Tipografia**: Cormorant Garamond (tondo per i titoli, corsivo per la seconda
  voce, al massimo una parte in corsivo per titolo) e Figtree (testo, dati,
  interfaccia). Damion solo nel marchio «Lily».
- **Konsta** solo nelle parti "app" (i flussi di richiesta, oggi spenti), in file
  `'use client'`.
- **Animazioni**: motore GSAP + Lenis in `src/lib/motion/engine.ts`, API ad
  attributi (elenco in testa al file), con le regole di andrea-bellettati: si
  carica con un import dinamico dopo l'idratazione, rivelazioni con
  IntersectionObserver, `position: sticky` al posto dei pin, cambi di struttura
  (SplitText) solo nei Server Component. La hero dipende da `--e` (0 → 1):
  animazione CSS legata allo scroll dove c'è, il motore altrove; lo script di
  avvio in `app/layout.tsx` accende `html.motion` prima del primo fotogramma.
  Senza JS o con "riduci movimento" la pagina è completa e ferma.
- **Leggerezza**: arriva quasi tutto da Instagram, quindi da telefono. Prima di
  aggiungere JavaScript a tutte le pagine, misura (metodo in `docs/decisioni.md`).
- **Privacy**: con il modulo Google il sito non raccoglie dati e non usa né
  cookie né memoria del browser; niente embed di terze parti. Se si riaccendono
  le richieste dal sito: dati minimi, niente dati sulla salute, codice fiscale
  solo se e quando serve; l'informativa (`/privacy`) cambia da sola con
  l'interruttore.
- **Segreti**: mai `.env` o chiavi nel repository.
- **Prima di consegnare**: `npm run check` e `npm run build` puliti, prova a
  390×844 e su desktop, con e senza "riduci movimento".

## Comandi

> Node ≥ 22.12 (`.nvmrc`).

```bash
npm install          # dipendenze
npm run dev          # sviluppo su http://localhost:3000
npm run build        # build di produzione (.next/standalone)
npm run start        # avvia la build
npm run check        # tipi (next typegen + tsc) + ESLint
npm run anteprima    # sito statico in anteprima-netlify/ (Netlify Drop)
```

Per provare le richieste dal sito senza email vere: `RICHIESTE_DAL = 'sito'` in
`src/lib/site.ts`, poi
`SES_DRY_RUN=true SES_TO_TRATTAMENTI=prova@esempio.it SES_TO_LETTURE=prova@esempio.it npm run dev`
(le email finiscono nei log). Le misure di leggerezza: `scripts/misura.cjs`
sulla build; icone e immagini per i social: `scripts/immagini.cjs`; le immagini
d'atmosfera: `scripts/atmosfere.cjs`; il video della hero:
`scripts/video-hero.cjs` (tutti con Playwright, che non è una dipendenza del
progetto; il video anche con ffmpeg). Le foto vere (due tagli, WebP):
`scripts/foto.cjs`, con sharp, che arriva con Next.

Il blocco in cima a questo file lo scrive `next dev` (e lo riscrive se manca):
si tiene e si committa. `CLAUDE.md` contiene solo `@AGENTS.md`.
