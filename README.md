# Lily Trattamenti Benessere

Sito di **Silvia Chizio** — Lily Trattamenti Benessere, Montebelluna (TV):
quattro trattamenti in studio e letture intuitive a distanza. Sostituisce il
Google Form del link in bio di Instagram ed è la base del futuro gestionale delle
prenotazioni.

**Stato**: fase 1 in corso (vedi [`docs/roadmap.md`](docs/roadmap.md)). Per chi
lavora al progetto (e per Claude Code): [`AGENTS.md`](AGENTS.md), poi la cartella
[`docs/`](docs/).

| Documento | Cosa contiene |
|---|---|
| [`docs/brief.md`](docs/brief.md) | chi è Silvia, cosa offre, a chi parla |
| [`docs/spec.md`](docs/spec.md) | pagine, richieste, regole dei testi |
| [`docs/brand.md`](docs/brand.md) | Brand System «Lily» e movimento |
| [`docs/riferimenti.md`](docs/riferimenti.md) | cosa prendere da andrea-bellettati e ireandlunaslife |
| [`docs/decisioni.md`](docs/decisioni.md) | le scelte e il perché |
| [`docs/roadmap.md`](docs/roadmap.md) | i passi della fase 1 |
| [`docs/web-app.md`](docs/web-app.md) | gestionale e newsletter (fasi 2–3) |
| [`docs/domande-aperte.md`](docs/domande-aperte.md) | cosa chiedere a Silvia |

## Comandi

> **Node ≥ 22.12** (`.nvmrc`).

```bash
npm install          # dipendenze
npm run dev          # sviluppo su http://localhost:3000
npm run build        # build di produzione (.next/standalone)
npm run start        # avvia la build
npm run check        # tipi (next typegen + tsc) + ESLint
```

## Stack

Lo stesso di [andrea-bellettati](https://github.com/FrancescoCorbosiero/andrea-bellettati),
con le stesse versioni (perché: [`docs/decisioni.md`](docs/decisioni.md)).

| | |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript |
| Stile | **Tailwind 4** con il Brand System «Lily» in `src/app/globals.css` |
| Parti "app" | **Konsta UI 5** (tema iOS) · `react-modal-sheet` per i fogli · `sonner` per gli avvisi |
| Movimento | **GSAP** + **Lenis**, caricati dopo la pagina (`src/lib/motion`) |
| Email | AWS SES v2 da `/api/richiesta` |
| Deploy | Docker (Next standalone) dietro **Caddy** (caddy-docker-proxy) |

## Struttura

```
src/
  app/
    layout.tsx       # html, metadati del sito
    globals.css      # ⭐ Brand System «Lily»
    (sito)/          # le pagine del sito
    robots.ts
  lib/
    site.ts          # ⭐ contatti, link, stato delle prenotazioni (PRENOTAZIONI)
    trattamenti.ts   # ⭐ il catalogo: i quattro trattamenti e le letture
docs/                # contesto, decisioni, roadmap, domande per Silvia
```

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
con un messaggio.
