# Lily Trattamenti Benessere

Sito di **Silvia Chizio** — Lily Trattamenti Benessere, Montebelluna (TV):
quattro trattamenti in studio e letture intuitive a distanza. Una **landing a
pagina unica**: chi arriva dal link in bio di Instagram trova tutto in una
pagina, e «Prenota» apre il modulo Google di Silvia.

**Stato**: la landing è completa con i dati veri che ci sono e le bozze
dichiarate; manca la messa online (passo 10 della roadmap,
[`docs/roadmap.md`](docs/roadmap.md)). Le richieste fatte dal sito (flussi a
passi, invio con SES) sono nel codice, spente: si riaccendono con un
interruttore (sotto, «Le richieste»). Testi in bozza da far approvare a Silvia:
[`docs/testi-da-validare.md`](docs/testi-da-validare.md); dati che mancano:
[`docs/domande-aperte.md`](docs/domande-aperte.md). Per chi lavora al progetto (e
per Claude Code): [`AGENTS.md`](AGENTS.md), poi la cartella [`docs/`](docs/).

| Documento | Cosa contiene |
|---|---|
| [`docs/brief.md`](docs/brief.md) | chi è Silvia, cosa offre, a chi parla |
| [`docs/spec.md`](docs/spec.md) | la landing, le richieste, le regole dei testi |
| [`docs/brand.md`](docs/brand.md) | Brand System «Lily», concetto «Luce», movimento |
| [`docs/riferimenti.md`](docs/riferimenti.md) | cosa prendere da andrea-bellettati e ireandlunaslife |
| [`docs/decisioni.md`](docs/decisioni.md) | le scelte e il perché, con le misure di leggerezza |
| [`docs/roadmap.md`](docs/roadmap.md) | i passi della fase 1 |
| [`docs/web-app.md`](docs/web-app.md) | gestionale e newsletter (fasi 2–3) |
| [`docs/domande-aperte.md`](docs/domande-aperte.md) | cosa chiedere a Silvia |
| [`docs/testi-da-validare.md`](docs/testi-da-validare.md) | i testi in bozza, sezione per sezione |

## Comandi

> **Node ≥ 22.12** (`.nvmrc`).

```bash
npm install          # dipendenze
npm run dev          # sviluppo su http://localhost:3000 (con l'anteprima: ogni blocco, con gli esempi)
npm run build        # build di produzione (.next/standalone)
npm run start        # avvia la build
npm run check        # tipi (next typegen + tsc) + ESLint
npm run anteprima    # sito statico in anteprima-netlify/ (Netlify Drop)
```

Animazioni e velocità si giudicano sulla build (`npm run build && npm run
start`): in sviluppo il motore arriva tardi.

## Stack

| | |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript |
| Stile | **Tailwind 4** con il Brand System «Lily» in `src/app/globals.css` (toni semantici, arco, bottoni, listino) |
| Movimento | **GSAP** (ScrollTrigger + SplitText) e **Lenis**, caricati dopo la pagina (`src/lib/motion`); la hero con un'animazione CSS legata allo scroll dove c'è |
| Richieste dal sito (spente) | **Konsta UI 5** (tema iOS) · `react-modal-sheet` · `motion` · zod · AWS SES v2 da `/api/richiesta` |
| Deploy | Docker (Next standalone) dietro **Caddy** (caddy-docker-proxy) |

## La landing

Una pagina, `/`, con un'ancora per sezione: la **hero** (la finestra ad arco che
si apre a tutto schermo scorrendo), il **listino** (`#trattamenti`, un'ancora per
trattamento), il **momento relax**, **Silvia** (`#chi-sono`), le **recensioni**
(solo vere), le **letture** (`#letture`), **come prenotare e dove**
(`#contatti`), le **domande**, l'**invito**. Più `/privacy` e la 404. Il link per
la bio di Instagram è la landing con la provenienza:
`/?utm_source=instagram&utm_medium=bio`.

## Struttura

```
src/
  app/
    layout.tsx               # html, font, script di avvio (html.motion), AppProvider, scroll morbido, JSON-LD
    template.tsx             # accende le animazioni di ogni pagina
    globals.css              # ⭐ Brand System «Lily»: toni, tipografia, bottoni, arco, hero, listino, flussi
    fonts.ts                 # Cormorant Garamond (tondo e corsivo), Figtree, Damion (self-hosted, src/fonts/)
    (sito)/
      page.tsx               # ⭐ la landing
      privacy/               # l'informativa (segue l'interruttore delle richieste)
      prenota/               # le richieste in pagina: solo con RICHIESTE_DAL = 'sito'
      layout.tsx             # testata, piè di pagina, barra in basso
    api/richiesta/route.ts   # invio delle richieste dal sito (SES): 404 con il modulo
    sitemap.ts robots.ts manifest.ts icon.svg apple-icon.png favicon.ico not-found.tsx
  components/
    home/                    # le sezioni della landing: Hero, Listino, Relax, Silvia, Recensioni, Letture, Prenota, Domande, Invito
    layout/                  # SiteHeader, MobileDock, SiteFooter, Logo, 404, AlpacodeBadge
    app/                     # AppProvider (fogli, cronologia), Menu (il menu del telefono)
    ui/                      # Bottone (e BottoneRichiesta), Esempio
    flows/                   # le richieste dal sito (spente): PrenotaFlow, LetturaFlow, AvvisamiFlow…
    brand/ seo/ motion/      # il giglio · JSON-LD · MotionPage, SmoothScroll
    icons.tsx                # icone a linea e frecce
  lib/
    site.ts                  # ⭐ contatti, studio, orari, MODULI e RICHIESTE_DAL, PRENOTAZIONI: i dati che mancano restano vuoti
    richieste.ts             # ⭐ dove porta ogni bottone di richiesta
    trattamenti.ts           # ⭐ il catalogo: i quattro trattamenti, le letture, i temi
    domande.ts immagini.ts anteprima.ts seo.ts orari.ts
    forms.ts emails.ts mail.ts send.ts rateLimit.ts source.ts hooks.ts   # le richieste dal sito
    motion/                  # engine.ts (GSAP + Lenis, dopo la pagina), fx.ts, scroll.ts
public/video/ public/atmosfere/ public/foto/   # la hero, le immagini d'atmosfera, le foto dell'anteprima
public/brand/ public/icons/ public/og/          # logo e giglio provvisori, icone, immagini per i social
scripts/                     # immagini.cjs, atmosfere.cjs, video-hero.cjs, foto.cjs, misura.cjs, anteprima-statica.mjs
docs/                        # contesto, decisioni, roadmap, domande per Silvia, testi da validare
```

## Le richieste

Un interruttore in `src/lib/site.ts`:

- **`RICHIESTE_DAL = 'modulo'`** (oggi): ogni «Prenota un trattamento» e
  «Richiedi una lettura» apre il modulo Google di Silvia (`MODULI`) in un'altra
  scheda. Il sito non raccoglie dati: niente API, niente memoria del browser,
  l'informativa lo dice.
- **`RICHIESTE_DAL = 'sito'`**: tornano le richieste fatte dal sito, come fogli
  sopra la landing (telefono) e pannelli (desktop), e in pagina su `/prenota` e
  `/prenota/lettura`. Invio con `POST /api/richiesta` → email a Silvia e conferma
  a chi ha scritto (caselle `SES_TO_TRATTAMENTI`, `SES_TO_LETTURE`, variabili in
  [`.env.example`](.env.example)). Per provarle senza email vere:

```bash
SES_DRY_RUN=true SES_TO_TRATTAMENTI=prova@esempio.it SES_TO_LETTURE=prova@esempio.it npm run dev
```

**Prenotazioni sospese**: `PRENOTAZIONI.trattamenti` o `PRENOTAZIONI.letture` a
`'sospese'` (con `NOTA_SOSPENSIONE` facoltativa, es. "Riapro a gennaio"). Con il
modulo il bottone porta al messaggio su Instagram, con una riga che spiega; dal
sito diventa "Avvisami quando riapro".

## I dati che mancano

Indirizzo, orari, telefono/WhatsApp, prezzi, foto, logo originale, dominio:
finché Silvia non li dà restano vuoti in `src/lib/site.ts` e
`src/lib/trattamenti.ts` (`prezzo: null`) e i blocchi che li usano non
compaiono. In sviluppo e nell'anteprima compaiono con un esempio segnato
«Esempio». Le domande sono in [`docs/domande-aperte.md`](docs/domande-aperte.md).

## Immagini e misure

- `node scripts/immagini.cjs` rigenera icone e immagini Open Graph (serve
  Playwright): da rilanciare quando arriva il logo originale o cambia un titolo.
- `node scripts/misura.cjs http://localhost:3300 /` misura TBT, LCP e CLS su un
  telefono medio simulato (metodo e risultati in
  [`docs/decisioni.md`](docs/decisioni.md), "Leggerezza").

## Anteprima statica (Netlify Drop)

Per mostrare il sito senza server, per esempio trascinandolo su
[app.netlify.com/drop](https://app.netlify.com/drop):

```bash
npm run anteprima
```

Crea `anteprima-netlify/`: è quella la cartella da trascinare. Con
`npm run anteprima -- https://<nome>.netlify.app` canonical, sitemap e immagini
per i social puntano all'indirizzo dell'anteprima. Funziona anche su Windows.

## Deploy

Come andrea-bellettati: un container dietro Caddy, che prende i certificati da
solo.

```bash
docker network create caddy        # una volta sola, se non esiste
cp .env.example .env               # dominio (+ credenziali SES, solo con le richieste dal sito)
docker compose up -d --build
```

`NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_PARTITA_IVA` entrano al build: cambiarli
richiede `--build`. Finché il dominio non è deciso, `docker compose` si ferma
con un messaggio. Per andare online (passo 10): il dominio, poi il link in bio a
`/?utm_source=instagram&utm_medium=bio`. SES serve solo se si riaccendono le
richieste dal sito.
