# Lily Trattamenti Benessere

Sito di **Silvia Chizio** — Lily Trattamenti Benessere, Montebelluna (TV):
quattro trattamenti in studio e letture intuitive a distanza. Sostituisce il
Google Form del link in bio di Instagram ed è la base del futuro gestionale delle
prenotazioni.

**Stato**: fase 1 completa fino al passo 9 della roadmap
([`docs/roadmap.md`](docs/roadmap.md)); manca il passo 10 (online), che aspetta
dominio, email e credenziali SES. Testi in bozza da far approvare a Silvia:
[`docs/testi-da-validare.md`](docs/testi-da-validare.md); dati che mancano:
[`docs/domande-aperte.md`](docs/domande-aperte.md). Per chi lavora al progetto (e
per Claude Code): [`AGENTS.md`](AGENTS.md), poi la cartella [`docs/`](docs/).

| Documento | Cosa contiene |
|---|---|
| [`docs/brief.md`](docs/brief.md) | chi è Silvia, cosa offre, a chi parla |
| [`docs/spec.md`](docs/spec.md) | pagine, richieste, regole dei testi |
| [`docs/brand.md`](docs/brand.md) | Brand System «Lily» e movimento |
| [`docs/riferimenti.md`](docs/riferimenti.md) | cosa prendere da andrea-bellettati e ireandlunaslife |
| [`docs/decisioni.md`](docs/decisioni.md) | le scelte e il perché, con le misure di leggerezza |
| [`docs/roadmap.md`](docs/roadmap.md) | i passi della fase 1 |
| [`docs/web-app.md`](docs/web-app.md) | gestionale e newsletter (fasi 2–3) |
| [`docs/domande-aperte.md`](docs/domande-aperte.md) | cosa chiedere a Silvia |
| [`docs/testi-da-validare.md`](docs/testi-da-validare.md) | i testi in bozza, pagina per pagina |

## Comandi

> **Node ≥ 22.12** (`.nvmrc`).

```bash
npm install          # dipendenze
npm run dev          # sviluppo su http://localhost:3000
npm run build        # build di produzione (.next/standalone)
npm run start        # avvia la build
npm run check        # tipi (next typegen + tsc) + ESLint
npm run anteprima    # sito statico in anteprima-netlify/ (Netlify Drop, senza invio richieste)
```

Per provare le richieste senza mandare email vere (le caselle possono essere
finte):

```bash
SES_DRY_RUN=true SES_TO_TRATTAMENTI=prova@esempio.it SES_TO_LETTURE=prova@esempio.it npm run dev
```

Animazioni e velocità si giudicano sulla build (`npm run build && npm run
start`): in sviluppo il motore arriva tardi, come in andrea-bellettati.

## Stack

Lo stesso di [andrea-bellettati](https://github.com/FrancescoCorbosiero/andrea-bellettati),
con le stesse versioni (perché: [`docs/decisioni.md`](docs/decisioni.md)).

| | |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript |
| Stile | **Tailwind 4** con il Brand System «Lily» in `src/app/globals.css` (palette, font, petalo, vetro rosato, notte) |
| Parti "app" | **Konsta UI 5** (tema iOS) · `react-modal-sheet` per i fogli · `motion` per il pannello desktop · `sonner` per gli avvisi |
| Movimento | **GSAP** (ScrollTrigger + SplitText) e **Lenis**, caricati dopo la pagina (`src/lib/motion`), con gli effetti di ireandlunaslife ritemati |
| Email | AWS SES v2 da `/api/richiesta` |
| Deploy | Docker (Next standalone) dietro **Caddy** (caddy-docker-proxy) |

## Struttura

```
src/
  app/
    layout.tsx               # html, font, AppProvider, scroll morbido, JSON-LD del sito
    template.tsx             # accende le animazioni di ogni pagina (si rimonta a ogni cambio pagina)
    globals.css              # ⭐ Brand System «Lily»: token, superfici, componenti, stati delle animazioni, tema Konsta
    fonts.ts                 # Playfair Display, Figtree, Damion (self-hosted, src/fonts/)
    (sito)/                  # le pagine; layout.tsx: header, footer, barra in basso
      page.tsx               # home
      trattamenti/ letture/ prenota/ chi-sono/ contatti/ privacy/
      stile/                 # tutto il Brand System, per rivederlo con Silvia (noindex)
      not-found.tsx          # 404 dentro il sito
    (campagne)/bio/          # la pagina del link in bio di Instagram: niente menu, noindex
    api/richiesta/route.ts   # invio delle richieste (SES)
    sitemap.ts robots.ts manifest.ts icon.svg apple-icon.png favicon.ico not-found.tsx
  components/
    app/                     # AppProvider (fogli, cronologia), MenuSheet
    brand/                   # Giglio (il giglio del logo, da disegnare), Listino (riga del listino), DivisoreLoto
    flows/                   # le richieste: PrenotaFlow, LetturaFlow, AvvisamiFlow, useFlow, fields, foglio/pannello, in pagina
    home/                    # le sezioni della home
    layout/                  # SiteHeader, MobileTabbar, SiteFooter, Logo, 404, AlpacodeBadge
    motion/ seo/ ui/         # MotionPage, SmoothScroll · JsonLd · SectionHead, FaqList, Chiusura, BottoniRichiesta…
    icons.tsx                # le icone a linea dei trattamenti e del brand
  lib/
    site.ts                  # ⭐ contatti, studio, orari, PRENOTAZIONI, parole di Silvia: i dati che mancano restano vuoti
    trattamenti.ts           # ⭐ il catalogo: i quattro trattamenti, le letture, i temi
    richieste.ts             # le due richieste e le loro etichette (anche da sospese)
    forms.ts                 # campi, opzioni e regole zod delle richieste (browser e server)
    emails.ts mail.ts send.ts rateLimit.ts source.ts seo.ts orari.ts hooks.ts konsta.ts
    motion/                  # engine.ts (GSAP + Lenis, dopo la pagina), fx.ts (effetti senza librerie), scroll.ts
public/brand/                # logo e giglio provvisori in SVG (e il PNG per le email)
public/icons/ public/og/     # icone dell'app e immagini per i social, generate da scripts/immagini.cjs
scripts/                     # immagini.cjs (icone e Open Graph), misura.cjs (TBT, LCP, CLS)
docs/                        # contesto, decisioni, roadmap, domande per Silvia, testi da validare
```

## I dati che mancano

Indirizzo, orari, email, telefono/WhatsApp, prezzi, foto, logo originale,
dominio: finché Silvia non li dà restano vuoti in `src/lib/site.ts` e
`src/lib/trattamenti.ts` (`prezzo: null`) e i blocchi che li usano non
compaiono. Quando arrivano si scrive il dato lì e si rifà il build: header,
footer, contatti, richieste e dati strutturati si aggiornano da soli. Le domande
sono in [`docs/domande-aperte.md`](docs/domande-aperte.md).

**Prenotazioni sospese**: in `src/lib/site.ts`, `PRENOTAZIONI.trattamenti` o
`PRENOTAZIONI.letture` a `'sospese'` (con `NOTA_SOSPENSIONE` facoltativa, es.
"Riapro a gennaio"). I bottoni di quella richiesta diventano "Avvisami quando
riapro" e la sua pagina mostra il modulo dell'avviso.

## Le richieste ed email

- **Prenota un trattamento** (`PrenotaFlow`): il trattamento dal listino (o
  "consigliami tu") → quando ti va (fasce, giorni, prima volta, due righe senza
  dati sulla salute) → contatti (nome e telefono, email facoltativa, come
  ricontattarti) → riepilogo modificabile → invio. "Prenota questo" porta il
  trattamento già scelto (`/prenota?trattamento=<slug>#richiesta`).
- **Richiedi una lettura** (`LetturaFlow`): il tema → la domanda (facoltativa) →
  nome ed email → riepilogo con il disclaimer integrale → invio. Niente codice
  fiscale.
- **Avvisami quando riapro** (`AvvisamiFlow`): email, nome facoltativo, cosa
  interessa e un consenso per un solo scopo. Non è una newsletter.
- Ogni link a `/prenota#richiesta` o `/letture#richiesta` apre la richiesta come
  foglio dal basso su telefono e come pannello su desktop; nella sua pagina è in
  pagina. Il gesto "indietro" chiude il foglio.
- Invio: `POST /api/richiesta` (unione su `kind`: `trattamento`, `lettura`,
  `avvisami`, stesso zod del browser) → email a Silvia (riepilogo, bottoni per
  rispondere, provenienza `utm_*`, ora) e conferma a chi ha scritto, se c'è
  l'email. Caselle: `SES_TO_TRATTAMENTI` e `SES_TO_LETTURE`. Protezioni: limite
  per IP, campo trappola, tempo minimo di compilazione. `GET /api/richiesta` dice
  se l'invio è configurato.
- Senza SES (o senza caselle) la richiesta non parte e il flusso offre il testo
  già scritto con "Copia il testo" e il messaggio su Instagram.

Variabili in [`.env.example`](.env.example).

## Immagini e misure

- `node scripts/immagini.cjs` rigenera icone e immagini Open Graph dal logo e
  dal giglio (serve Playwright): da rilanciare quando arriva il logo originale.
- `node scripts/misura.cjs http://localhost:3300 / /trattamenti` misura TBT,
  LCP e CLS su un telefono medio simulato (metodo e risultati in
  [`docs/decisioni.md`](docs/decisioni.md), "Leggerezza").

## Anteprima statica (Netlify Drop)

Per mostrare il sito senza server, per esempio trascinandolo su
[app.netlify.com/drop](https://app.netlify.com/drop):

```bash
npm run anteprima
```

Crea `anteprima-netlify/`: è quella la cartella da trascinare, non
`public/` (che contiene solo immagini e icone, senza `index.html`). È solo
un'anteprima: senza server non c'è `/api/richiesta`, quindi le richieste non
partono e mostrano il ripiego (testo da copiare e Instagram). Con
`npm run anteprima -- https://<nome>.netlify.app` canonical, sitemap e immagini
per i social puntano all'indirizzo dell'anteprima. Funziona anche su Windows
(lo script è in Node).

## Deploy

Come andrea-bellettati: un container dietro Caddy, che prende i certificati da
solo.

```bash
docker network create caddy        # una volta sola, se non esiste
cp .env.example .env               # dominio + credenziali SES
docker compose up -d --build
```

`NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_PARTITA_IVA` entrano al build: cambiarli
richiede `--build`. Finché il dominio non è deciso, `docker compose` si ferma
con un messaggio. Per andare online (passo 10): dominio verificato in SES con
DKIM, SPF e DMARC, fuori dalla sandbox, regione UE, utente IAM con il solo
`ses:SendEmail`; poi il link in bio a `/bio?utm_source=instagram&utm_medium=bio`
e il Google Form spento.
