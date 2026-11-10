# Lily Trattamenti Benessere — sito di Silvia Chizio

Sito (fase 1) e base del futuro gestionale (fasi 2–3) di **Lily Trattamenti
Benessere**, l'attività di Silvia Chizio a Montebelluna (TV): quattro trattamenti
in studio e letture intuitive a distanza. Oggi Silvia lavora solo da Instagram
(@silvia_chizio) e raccoglie le richieste con un Google Form: il sito lo sostituisce.

**Stato del repository**: solo contesto, nessun codice. Si parte dal passo 1 di
`docs/roadmap.md` (scaffolding).

## Leggi prima

1. `docs/brief.md` — chi è Silvia, cosa offre, a chi parla, come lavora oggi.
2. `docs/spec.md` — pagine, flussi di richiesta, regole dei testi.
3. `docs/brand.md` — il Brand System «Lily» e il carattere del movimento.
4. `docs/riferimenti.md` — cosa prendere dai due progetti di riferimento, e cosa no.
5. `docs/decisioni.md` — le scelte già fatte e il perché.
6. `docs/roadmap.md` — i passi, in ordine, con il criterio di "fatto".

Per dopo: `docs/web-app.md` (gestionale prenotazioni e newsletter). Quello che
ancora non sappiamo: `docs/domande-aperte.md`. Immagini di partenza (listino,
profilo Instagram, form attuale, palette, confronti dei font): `docs/immagini/`.

## Progetti di riferimento

Due repository pubblici dello studio. Clonali in sola lettura **fuori** da
questo progetto:

```bash
git clone --depth 1 https://github.com/FrancescoCorbosiero/andrea-bellettati ../riferimenti/andrea-bellettati
git clone --depth 1 https://github.com/FrancescoCorbosiero/ireandlunaslife ../riferimenti/ireandlunaslife
```

- **andrea-bellettati** è la base tecnica: stack, Konsta UI, flussi a passi,
  invio con SES, motore delle animazioni, deploy. Si copia e si adatta.
- **ireandlunaslife** è il riferimento per la cura visiva e il movimento: gli
  effetti GSAP su misura da portare, ritemati, nel motore di andrea-bellettati.
- Da nessuno dei due si prendono testi, colori, font, foto o metafore (cani,
  zampe, "Branco", "bacheca"). La mappa file per file è in `docs/riferimenti.md`.

## Regole della casa

- **Lingua**: testi del sito, commenti e messaggi di commit in italiano.
- **Voce**: prima persona (parla Silvia), il "tu", frasi semplici e calde, niente
  slogan. Linguaggio del benessere, mai sanitario: niente "cura", "terapia",
  "guarire", né promesse di risultati. Non dare per scontato il genere di chi legge.
  Le letture hanno valore orientativo e riflessivo (testo in `docs/spec.md`).
- **Fatti, mai inventati**: prezzi, indirizzo, orari, numeri, formazione,
  recensioni e testimonianze arrivano solo da Silvia. Finché mancano, il valore in
  `src/lib/site.ts` resta vuoto e il blocco che lo usa non compare; la domanda sta
  in `docs/domande-aperte.md`.
- **Bozze dichiarate**: i testi scritti da te sono bozze. Segnale con un commento
  `BOZZA` accanto al testo e tieni l'elenco in `docs/testi-da-validare.md`.
- **Una fonte per ogni dato**: contatti, link e stato delle prenotazioni in
  `src/lib/site.ts`; i trattamenti (nome, descrizione, durata, prezzo facoltativo,
  icona) in `src/lib/trattamenti.ts`. Pagine, flussi, email e dati strutturati
  leggono da lì.
- **Stile**: usa token e componenti del Brand System in `src/app/globals.css`
  prima di inventare classi nuove. Niente sticker, rotazioni, ombre "a timbro".
- **Konsta** solo nelle parti "app" (flussi di richiesta, barra in basso, fogli);
  i componenti Konsta vanno in file `'use client'`.
- **Animazioni**: motore GSAP + Lenis in `src/lib/motion`, API ad attributi, con
  le regole di andrea-bellettati: si carica con un import dinamico dopo
  l'idratazione, rivelazioni con IntersectionObserver, `position: sticky` al posto
  dei pin, cambi di struttura (SplitText) solo nei Server Component. Senza JS o
  con "riduci movimento" la pagina è completa e ferma.
- **Leggerezza**: arriva quasi tutto da Instagram, quindi da telefono. Prima di
  aggiungere JavaScript a tutte le pagine, misura (metodo in `docs/decisioni.md`).
- **Privacy**: dati minimi nei moduli, niente dati sulla salute, codice fiscale
  solo se e quando serve; niente embed di terze parti (Instagram, Maps) e niente
  cookie di profilazione.
- **Segreti**: mai `.env` o chiavi nel repository.
- **Prima di consegnare**: `npm run check` e `npm run build` puliti, prova a
  390×844 con e senza "riduci movimento".

## Quando arriva Next.js

`next dev` scrive in `AGENTS.md` le sue regole per gli agenti: tienile. A quel
punto sposta il contenuto di questo file in `AGENTS.md` e lascia qui solo
`@AGENTS.md`, come in andrea-bellettati. Aggiungi qui i comandi (`dev`, `build`,
`check`) appena esistono.
