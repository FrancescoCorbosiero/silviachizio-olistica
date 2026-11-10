# Riferimenti

Due progetti dello studio, pubblici, con la stessa famiglia di codice (il motore
delle animazioni nasce da `comunicazionecinofila`). Si usano come fonte da cui
**copiare e adattare**, mai come dipendenze.

```bash
git clone --depth 1 https://github.com/FrancescoCorbosiero/andrea-bellettati ../riferimenti/andrea-bellettati
git clone --depth 1 https://github.com/FrancescoCorbosiero/ireandlunaslife ../riferimenti/ireandlunaslife
```

- Si porta un pezzo alla volta e lo si adatta a Lily: nomi, testi, colori,
  metafore. In testa a ogni file portato, una riga che dice da dove viene.
- I percorsi qui sotto sono relativi alla radice di ciascun repository.

## andrea-bellettati: la base tecnica

Next.js 16 + React 19 + Tailwind 4 + Konsta UI 5, flussi a passi, invio con SES,
motore GSAP + Lenis già alleggerito e misurato, deploy Docker + Caddy. Da leggere
per primi: `README.md`, `AGENTS.md`, `docs/decisioni.md`.

| Cosa | File | Come |
|---|---|---|
| Configurazione | `package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `.nvmrc` | copia; togli le dipendenze che non servono (Markdown, se non c'è) |
| Deploy | `Dockerfile`, `docker-compose.yml`, `.env.example`, `deploy/cloudflare/`, `docs/cloudflare.md` | uguali, con nomi, dominio e caselle di Lily (`SES_TO_TRATTAMENTI`, `SES_TO_LETTURE`) |
| Configurazione centrale | `src/lib/site.ts` | stesso schema (contatti, `LEGAL`, `NAV`, link) con i dati di Silvia, più `PRENOTAZIONI` |
| Guscio e Konsta | `src/app/layout.tsx`, `src/app/template.tsx`, `src/app/fonts.ts`, `src/app/(sito)/layout.tsx`, `src/lib/konsta.ts`, `src/components/app/AppProvider.tsx`, `src/components/app/MenuSheet.tsx` | stessa architettura: fogli con la cronologia, menu a foglio, link di Next dentro Konsta |
| Header, barra, footer | `src/components/layout/SiteHeader.tsx`, `MobileTabbar.tsx`, `SiteFooter.tsx`, `Logo.tsx`, `NotFoundContent.tsx`, `AlpacodeBadge.tsx` | struttura e comportamento; voci e stile di Lily |
| Flussi a passi | `src/components/flows/useFlow.ts`, `fields.tsx`, `ConsultFlow.tsx`, `ConsultOverlay.tsx`, `ConsultInline.tsx` | `ConsultFlow` è il modello di `PrenotaFlow` e `LetturaFlow`; foglio su telefono, pannello su desktop, in pagina nella sua pagina |
| Regole dei moduli | `src/lib/forms.ts`, `src/lib/send.ts`, `src/lib/source.ts`, `src/lib/hooks.ts` | stesso schema: opzioni, bozze, zod condiviso, provenienza `utm_*` |
| Server ed email | `src/app/api/richiesta/route.ts`, `src/lib/mail.ts`, `src/lib/emails.ts`, `src/lib/rateLimit.ts` | stesse protezioni e stesso `SES_DRY_RUN`; email con la veste di Lily |
| Movimento | `src/lib/motion/engine.ts`, `src/lib/motion/fx.ts`, `src/lib/motion/scroll.ts`, `src/components/motion/MotionPage.tsx`, `src/components/motion/SmoothScroll.tsx` | il motore di partenza: si porta così com'è, poi si aggiungono gli effetti di ireandlunaslife |
| Brand System | `src/app/globals.css` | la **struttura** (token in `@theme`, componenti, vetro, tema Konsta, stati delle animazioni), con i valori di `brand.md` |
| Link in bio | `src/app/(campagne)/layout.tsx`, `src/components/campaign/CampaignHero.tsx`, `src/components/campaign/StickyCta.tsx` | modello per `/bio` |
| Componenti | `src/components/ui/FaqList.tsx`, `CtaBand.tsx`, `SectionHead.tsx`, `Polaroid.tsx`, `src/components/home/HowRail.tsx` | da ritemare |
| SEO e app | `src/lib/seo.ts`, `src/components/seo/JsonLd.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` | stesso schema; `HealthAndBeautyBusiness` al posto di `ProfessionalService` |
| Privacy | `src/app/(sito)/privacy/page.tsx` | struttura e tono; contenuto riscritto su come funziona il sito di Lily |
| Documentazione | `README.md`, `docs/spec.md`, `docs/decisioni.md` | stesso stile: italiano semplice, una decisione per paragrafo con il perché |

## ireandlunaslife: il movimento e la cura visiva

Sito Astro statico con il motore "esteso": più effetti, più sezioni raccontate
dallo scroll, più cose da toccare. Da qui si prendono le **idee e il codice
degli effetti**, da riscrivere dentro il motore di andrea-bellettati.

| Cosa | Dove | Note |
|---|---|---|
| Elenco degli effetti | `src/scripts/motion.ts`, commento in testa | l'API ad attributi completa |
| Nastro | `marquees()` in `src/scripts/motion.ts`, `src/components/Ticker.astro` | segue velocità e verso dello scroll, si ferma al passaggio |
| Anello che gira, badge | `spins()`; `hm-disc-ring` e `spin-badge` in `src/pages/index.astro` e `src/styles/sections.css` | testo su `textPath` intorno alla foto |
| Galleggiare, spuntare | `floaters()`, `peeks()` | per petali e giglio |
| Magnete | `magnets()` | badge "Prenota" |
| Scia dietro al puntatore | `pawTrails()` | diventa `data-petal-trail`: petali che cadono invece di impronte |
| Lente | `lenses()` | la foto della stesa |
| Chat | `chats()` | "come funziona" delle letture |
| Indice con la foto che segue | `pathRows()` | l'indice dei trattamenti |
| Pop delle icone | `pops()` | le icone nei cerchi cipria |
| Titoli lettera per lettera | `headingVariant()` e `headingTween()` (variante `chars`) | da aggiungere alle varianti di andrea-bellettati |
| Hero che si allarga | `heroZoom()` | facoltativo; con `sticky` al posto del pin |
| Galleria orizzontale | `hscroll()` | facoltativa; con `sticky` al posto del pin |
| Coriandoli | `celebrate()` | in andrea-bellettati è in `fx.ts`; forme nuove: petali, cuori, scintille |
| Hero a strati | `src/pages/index.astro` (sezione `hm-hero`) | foto nel disco, livelli con `data-speed`, sottolineatura e freccia a mano in SVG |
| Ventaglio e sentiero | `src/pages/chi-sono.astro` | `data-fan` e `data-trail` in una pagina vera |
| Intro del primo schermo | `src/styles/motion.css` (sezione "Intro"), `src/layouts/Base.astro` | titoli che salgono in CSS prima del motore |
| Parallax delle copertine | `src/styles/effects.css` | `parallax-cover` pre-scalata |

## Cosa non prendere

- **Da ireandlunaslife**: Astro, Netlify, il modulo "Scrivimi" di
  `src/scripts/site.ts` (i flussi sono in Konsta), sticker (`Sticker.astro`,
  `scripts/make-stickers.py`), lo stile "bacheca" (rotazioni, timbri, ombre
  piene), palette teal e corallo, Lilita One, Nunito, Pacifico, `legacy/`.
- **Da andrea-bellettati**: articoli ed eventi in Markdown (`src/content/`,
  `src/lib/content*.ts`, RSS, `calendario.ics`), il flusso del Team, i widget per
  cani e gatti, testi, foto, palette, Anton, Bricolage Grotesque, Caveat.
- **Da entrambi**: zampe, ossa, medagliette e ogni metafora animale.
