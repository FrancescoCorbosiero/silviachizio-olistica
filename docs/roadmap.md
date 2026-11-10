# Roadmap

Fase 1 in passi piccoli, ognuno con il suo criterio di "fatto". Prima di ogni
passo: piano breve, poi codice. Dopo ogni passo: `npm run check` e
`npm run build` puliti, un commit in italiano.

## Fase 1 — il sito

### 0. Preparazione
Clona i due riferimenti fuori dal progetto (comandi in `CLAUDE.md`), leggi i
documenti in `docs/`, proponi il piano del passo 1.
**Fatto quando** il piano elenca cosa si copia da andrea-bellettati e cosa no.

### 1. Scaffolding
Next.js 16 con la configurazione di andrea-bellettati: dipendenze, TypeScript,
ESLint, Tailwind 4, Konsta, `Dockerfile`, `docker-compose.yml`, `.env.example`
con le variabili di Lily, `.nvmrc`. `src/lib/site.ts` (dati noti, vuoti quelli
che mancano, `PRENOTAZIONI`) e `src/lib/trattamenti.ts` (catalogo di `spec.md`).
Sistema `CLAUDE.md` / `AGENTS.md` come spiegato in `CLAUDE.md`.
**Fatto quando** `npm run dev` mostra una pagina vuota e check e build passano.

### 2. Brand System
Token e componenti in `src/app/globals.css` (palette, font self-hosted, petalo,
vetro rosato, notte, bottoni, pennellata, cerchi delle icone, riga del listino,
divisore col loto), tema Konsta, le icone SVG dei trattamenti, la pagina `/stile`.
**Fatto quando** `/stile` mostra tutto, a 390 px e su desktop, e i contrasti
rispettano le coppie di `brand.md`.

### 3. Guscio
Header, barra in basso, menu a foglio, footer con il wordmark e il badge
Alpacode, logo (provvisorio se l'originale non c'è ancora), 404, layout
`(campagne)`.
**Fatto quando** si naviga tra pagine vuote da telefono e da desktop, il gesto
"indietro" chiude i fogli, la tastiera arriva dappertutto.

### 4. Movimento
Il motore di andrea-bellettati (`src/lib/motion`, `MotionPage`, `SmoothScroll`,
`fx.ts`) con il carattere «respiro»; poi gli effetti di ireandlunaslife, uno per
volta, nell'ordine in cui servono alle pagine.
**Fatto quando** ogni effetto ha la sua riga nella tabella di misura in
`decisioni.md` e con "riduci movimento" la pagina è completa e ferma.

### 5. Home e trattamenti
Home e `/trattamenti` come in `spec.md`, con testi in bozza segnati e raccolti
in `docs/testi-da-validare.md`.
**Fatto quando** le due pagine sono complete con i dati veri che ci sono e
nessun dato inventato.

### 6. Le richieste
`PrenotaFlow`, `LetturaFlow`, "Avvisami quando riapro", `src/lib/forms.ts`,
`POST /api/richiesta`, email a Silvia e conferme, provenienza, protezioni.
**Fatto quando** con `SES_DRY_RUN=true` i tre invii stampano email corrette, gli
errori si leggono e "Prenota questo" arriva con il trattamento già scelto. Prova
anche con `PRENOTAZIONI` sospese.

### 7. Le altre pagine
`/letture`, `/prenota`, `/chi-sono`, `/contatti`, `/bio`, `/privacy`.
**Fatto quando** ogni pagina della mappa di `spec.md` esiste e chiude con una
richiesta.

### 8. SEO e app
Metadati per pagina, JSON-LD, sitemap, robots, canonical, immagini Open Graph,
manifest e icone dal giglio.
**Fatto quando** i dati strutturati passano il test dei risultati multimediali di
Google e `/bio` e `/stile` sono fuori dai motori.

### 9. Verifica
Misure (TBT, LCP, CLS) sulla build, controllo di accessibilità, prova su un
telefono vero con e senza "riduci movimento", rilettura di tutti i testi in bozza.
**Fatto quando** gli obiettivi di `spec.md` sono rispettati e
`docs/testi-da-validare.md` è pronto da mandare a Silvia.

### 10. Online
Dominio, SES (dominio verificato con DKIM, SPF e DMARC, fuori dalla sandbox,
regione UE, utente IAM con il solo `ses:SendEmail`), Docker + Caddy, Cloudflare
se c'è.
**Fatto quando** una richiesta vera arriva a Silvia, il link in bio porta a
`/bio` e il Google Form è spento.

## Fuori dal codice

- Le risposte di Silvia a [`domande-aperte.md`](domande-aperte.md): logo
  originale, foto, prezzi, indirizzo e orari sono quelli che bloccano di più.
- Un servizio fotografico nello studio, anche piccolo: è il materiale che manca
  di più al sito.
- La scheda Google Business Profile dello studio (se non c'è), con lo stesso
  nome, indirizzo e link al sito: per chi cerca "massaggio Montebelluna" conta
  quanto il sito.

## Fasi 2 e 3

Gestionale delle prenotazioni, lista d'attesa e newsletter con SES, pannello di
Silvia: idee e vincoli in [`web-app.md`](web-app.md). Si decidono con Silvia
quando il sito è online e si vede quante richieste arrivano.
