# Specifica del sito

Cosa contiene ogni pagina, come funzionano le richieste e le regole dei testi.
Struttura e blocchi sono una **proposta** costruita sul materiale che c'è (vedi
[`brief.md`](brief.md)); i dati che mancano stanno in
[`domande-aperte.md`](domande-aperte.md). Gli effetti citati tra parentesi
(`data-…`) sono descritti in [`brand.md`](brand.md), "Movimento".

## Mappa del sito

| Percorso | Cosa contiene |
|---|---|
| `/` | Home: chi è Lily, i quattro trattamenti, come funziona, Silvia, le letture, Instagram, domande, chiusura |
| `/trattamenti` | Il listino in pagina: una sezione per trattamento (`#lily-holistic`, `#lily-holistic-ritual`, `#lily-sportive`, `#lily-magic`) |
| `/letture` | Letture intuitive personalizzate, con la richiesta in pagina (`#richiesta`) |
| `/prenota` | La richiesta di un trattamento in pagina (`#richiesta`) |
| `/chi-sono` | Silvia |
| `/contatti` | Dove si trova lo studio, orari, canali |
| `/privacy` | Informativa privacy e cookie |
| `/bio` | Pagina per il link in bio di Instagram, senza menu (`noindex`) |
| `/stile` | Tutti i componenti del Brand System, per rivederli con Silvia (`noindex`, fuori dalla sitemap) |

Niente blog in fase 1 (nessun contenuto da pubblicare: Silvia scrive su Instagram).

## Elementi comuni

- **Header** (desktop): logo, Trattamenti · Letture · Chi sono · Contatti, bottone
  "Prenota". Superficie in vetro rosato; si toglie di mezzo leggendo verso il
  basso e torna risalendo.
- **Barra in basso** (telefono, Konsta Tabbar): Home · Trattamenti · **Prenota**
  (al centro, in evidenza) · Letture · Menu. Il menu è un foglio dal basso con le
  altre voci e i canali di contatto.
- **Footer** su fondo notte con il bordino rosa in alto (come la divisa): il
  wordmark "Lily" che sale lettera per lettera (`data-wordmark`), le voci del
  sito, i canali, indirizzo e orari se ci sono, partita IVA se c'è, link
  all'informativa, credito Alpacode (`AlpacodeBadge`, come in andrea-bellettati).
- **Le due richieste** sono sempre a un tocco: "Prenota un trattamento" porta a
  `/prenota#richiesta`, "Richiedi una lettura" a `/letture#richiesta`. Su
  telefono il link apre il flusso come foglio dal basso da qualsiasi pagina, su
  desktop come pannello; nella sua pagina il flusso è in pagina (stesso schema di
  `/consulenza-gratuita#questionario` in andrea-bellettati).
- Ogni pagina finisce con una chiusura che porta a una delle due richieste.

## Pagine

### Home `/`

1. **Hero.** Titolo con una parola scritta a mano, due righe in cui Silvia si
   presenta, le due richieste come bottoni, tre fatti brevi e veri (es.
   "Montebelluna (TV)", "Quattro trattamenti", "Letture a distanza"). Accanto (sotto,
   su telefono): la foto di Silvia in un cerchio con l'anello di testo che gira
   (`data-spin`: «trattamenti benessere · Montebelluna ·»), il giglio del logo che
   si disegna (`data-draw`), qualche petalo che ondeggia (`data-float`), il
   bagliore rosa che respira. Su desktop, petali dietro al puntatore
   (`data-petal-trail`).
2. **Nastro** con i nomi dei trattamenti e delle letture sulla pennellata blush
   del listino (`data-marquee`).
3. **Le due porte**: "In studio, a Montebelluna" → `/trattamenti`; "A distanza,
   via email" → `/letture`.
4. **Il listino**: le quattro righe come nell'immagine di Silvia (icona nel
   cerchio cipria che entra con un pop, nome, descrizione, durata con l'orologio),
   poi la fascia «Momento relax post-trattamento incluso • circa 15 minuti». Ogni
   riga porta alla sua sezione di `/trattamenti`.
5. **Il momento relax**: una frase sui quindici minuti dopo il trattamento che si
   accende parola per parola con lo scroll (`data-scrub`).
6. **Come funziona**, raccontato come stories di Instagram nel telefono
   (`data-stories`): richiedi → Silvia ti scrive per fissare giorno e ora → il
   trattamento → il tuo momento relax.
7. **Chi sono**: foto, «Vivo e sorrido», due righe, link a `/chi-sono`.
8. **Le letture**: un'anteprima con la chat che si scrive da sola (`data-chat`) e
   il link a `/letture`.
9. **Instagram**: scheda statica del profilo (foto, @silvia_chizio, "Seguimi").
   Niente embed.
10. **Domande frequenti** (accordion morbido), solo con risposte vere.
11. **Chiusura**: le due richieste; il giglio che spunta dal fondo della sezione
    (`data-peek`); su desktop un badge rotondo "Prenota" attirato dal puntatore
    (`data-magnetic`).

### Trattamenti `/trattamenti`

1. **Hero**: «Listino trattamenti» e, sulla pennellata, «Quattro esperienze di
   benessere». Sotto, l'indice dei quattro; su desktop la foto del trattamento
   segue il puntatore sopra la riga (`data-path-row`).
2. **Una sezione per trattamento**, con la sua ancora: icona, nome, descrizione
   del listino, durata più i 15 minuti di relax, cosa aspettarsi e per chi è
   (bozze da validare), prezzo solo se c'è, "Prenota questo" (apre la richiesta
   con il trattamento già scelto). **Lily Magic** sta su fondo notte con la luce
   della candela: è il rituale più "magico" e merita un'atmosfera sua.
3. **Il momento relax**, come in home ma più disteso.
4. **Prima di venire**: cosa portare e cosa sapere, solo con le indicazioni di
   Silvia.
5. Domande frequenti e chiusura.

### Letture `/letture`

1. **Hero**: titolo, la frase del form («una lettura simbolica e intuitiva
   personalizzata»), "Richiedi una lettura".
2. **Cosa ricevi**: i tre punti del form, così come sono: foto della stesa,
   interpretazione personalizzata scritta o video, risposta via email entro 24–48 ore.
3. **Come funziona** come una chat in messaggi diretti (`data-chat`): scegli il
   tema → Silvia prepara la stesa → ricevi foto e interpretazione.
4. **I temi**: Generale, Carriera / Lavoro, Amore / Relazioni, Crescita personale,
   Altro.
5. **La stesa**: una foto vera di una stesa con la lente che ingrandisce le carte
   al passaggio (`data-lens`), se Silvia la fornisce.
6. **Il disclaimer**, integrale e ben visibile (testo più sotto).
7. **La richiesta in pagina** (`#richiesta`).
8. Domande frequenti (strumenti usati, prezzo e pagamento, tempi) solo con
   risposte vere, e chiusura.

### Prenota `/prenota`

Titolo, la richiesta in pagina, "cosa succede dopo" in tre passi, gli altri
canali (messaggio su Instagram, email, WhatsApp se c'è).

### Chi sono `/chi-sono`

1. **Hero da biglietto da visita**: ritratto, nome, «Vivo e sorrido», Montebelluna,
   link a Instagram.
2. **La mia storia** con le foto che si aprono a ventaglio (`data-fan`): viaggi,
   arrampicata, creatività (le sue storie in evidenza), con il suo permesso.
3. **Le cose che amo**: le emoji della bio diventano icone a linea (natura,
   meditazione, fiori, gatti, arrampicata, surf, ballo, viaggi, fotografia,
   scrittura).
4. **Perché "Lily"** e **formazione**: solo con le parole e i dati di Silvia.
5. Chiusura con la scheda Instagram.

### Contatti `/contatti`

Dove si trova lo studio (indirizzo, link "Apri in Maps", un'immagine statica
della zona se serve), giorni e orari, come arrivare. I canali: messaggio diretto
su Instagram (`https://ig.me/m/silvia_chizio`), email, WhatsApp e telefono se
Silvia li vuole pubblicare. Le due richieste.

### Link in bio `/bio`

La pagina che prende il posto del Google Form nel link in bio. Gruppo
`(campagne)` come in andrea-bellettati: niente menu, niente barra in basso,
footer minimo; `noindex`, fuori dalla sitemap.

Logo, foto di Silvia, una riga, due grandi bottoni (Prenota un trattamento,
Richiedi una lettura) che aprono i flussi come fogli; se le prenotazioni sono
sospese, "Avvisami quando riapro". Sotto: i quattro trattamenti in breve, il
link al sito, Instagram. Deve essere la pagina più veloce del sito. Il link da
mettere su Instagram: `/bio?utm_source=instagram&utm_medium=bio`.

### Privacy `/privacy`, 404, Stile `/stile`

- `/privacy` sul modello di andrea-bellettati, riscritta per Silvia (sotto,
  "Privacy e dati legali").
- 404: il giglio, una riga gentile, i link alle pagine principali.
- `/stile`: palette, tipografia, bottoni, card, righe del listino, icone, effetti.

## Il catalogo

Una sola fonte, `src/lib/trattamenti.ts`, letta da pagine, flussi, email, dati
strutturati e, domani, dal gestionale. I testi sono quelli esatti del listino:

```ts
/** «Momento relax post-trattamento incluso • circa 15 minuti» */
export const RELAX_MINUTI = 15;

export const TRATTAMENTI = [
  { slug: 'lily-holistic', nome: 'Lily Holistic', breve: 'Massaggio olistico relax su lettino', durata: 60, icona: 'loto', prezzo: null },
  { slug: 'lily-holistic-ritual', nome: 'Lily Holistic Ritual', breve: 'Rituale olistico su futon', durata: 75, icona: 'futon', prezzo: null },
  { slug: 'lily-sportive', nome: 'Lily Sportive', breve: 'Massaggio decontratturante e muscolare', durata: 60, icona: 'schiena', prezzo: null },
  { slug: 'lily-magic', nome: 'Lily Magic', breve: 'Rituale olistico con biotensor, pietre, candela e meditazione', durata: 60, icona: 'candela', prezzo: null },
] as const;

export const TEMI_LETTURA = ['Generale', 'Carriera / Lavoro', 'Amore / Relazioni', 'Crescita personale', 'Altro'] as const;
```

Con `prezzo: null` il prezzo non compare da nessuna parte.

## Le richieste

Flussi a passi in Konsta, sul modello di `ConsultFlow` / `useFlow` di
andrea-bellettati: bozza salvata nella scheda del browser, un passo alla volta,
riepilogo modificabile, stessi controlli (zod) in browser e server in
`src/lib/forms.ts`.

In fase 1 sono **richieste**, non prenotazioni confermate: i testi non promettono
mai un appuntamento fissato ("Ti scrivo io per fissare giorno e ora").

### Prenota un trattamento (`PrenotaFlow`)

1. **Il trattamento**: le quattro card del listino (icona, nome, descrizione,
   durata) più "Non so ancora: consigliami tu". Obbligatorio. Da "Prenota questo"
   arriva già scelto.
2. **Quando ti va**: fasce preferite (mattina, pomeriggio, sera; più di una),
   giorni preferiti (facoltativi), "È la prima volta da Lily?" (facoltativo), due
   righe libere facoltative con l'avviso «Niente dati sulla salute qui: se c'è
   qualcosa da sapere, ne parliamo di persona».
3. **I tuoi contatti**: nome e telefono obbligatori, email facoltativa (per il
   riepilogo), "Come ti ricontatto?" (messaggio WhatsApp, chiamata, email).
4. **Riepilogo**: la scheda, modificabile, l'avviso privacy accanto al bottone,
   "Invia a Silvia". Dopo l'invio: cosa succede adesso e il link a Instagram.

### Richiedi una lettura (`LetturaFlow`)

1. **Il tema**: le cinque scelte del form di oggi, una sola; "Altro" apre il
   testo libero. Obbligatorio.
2. **La tua domanda**: due righe facoltative (il form di oggi non le chiede:
   confermare con Silvia) e, se Silvia lascia scegliere, il formato della
   risposta (scritta o video).
3. **I tuoi dati**: nome ed email obbligatori (la lettura arriva lì). Il codice
   fiscale non si chiede finché Silvia non conferma a cosa serve (vedi
   [`decisioni.md`](decisioni.md), "Dati minimi").
4. **Riepilogo**: con il disclaimer integrale, poi "Invia a Silvia". I tempi
   (24–48 ore) si promettono solo se partono dalla richiesta e non dal pagamento.

### Avvisami quando riapro

Al posto delle richieste quando le prenotazioni sono sospese: email
(obbligatoria), nome (facoltativo), cosa interessa (trattamenti, letture),
consenso esplicito per **un solo scopo**: "Scrivimi quando riapri". Non è
l'iscrizione a una newsletter. In fase 1 diventa un'email a Silvia più la
conferma a chi si è iscritto; nel gestionale diventa una lista con doppio opt-in.

### Invio ed email

- `POST /api/richiesta` con un'unione discriminata su `kind`
  (`trattamento`, `lettura`, `avvisami`), validata con lo stesso schema del browser.
- Email a Silvia: il riepilogo, i bottoni per rispondere (email; chiamata e
  WhatsApp se c'è un telefono), da quale pagina e campagna arriva (`utm_*`, come
  `src/lib/source.ts`), l'ora di arrivo. Caselle da `SES_TO_TRATTAMENTI` e
  `SES_TO_LETTURE`.
- Conferma a chi ha scritto, se ha lasciato l'email: breve, nello stile del sito
  (logo, rosa, fondo latte), con il riepilogo e cosa succede adesso; una risposta
  torna a Silvia.
- Protezioni come in andrea-bellettati: limite per IP, campo trappola, tempo
  minimo di compilazione. `SES_DRY_RUN=true` stampa le email nei log.
- Senza SES configurato la richiesta non parte e il flusso offre il messaggio su
  Instagram e un'email già scritta.

## Stato delle prenotazioni

Oggi la bio dice «sospeso al momento»: il sito deve poterlo dire senza perdere
nessuno. In `src/lib/site.ts`:

```ts
export const PRENOTAZIONI = { trattamenti: 'aperte', letture: 'aperte' } as const; // 'aperte' | 'sospese'
export const NOTA_SOSPENSIONE = ''; // facoltativa, es. "Riapro a gennaio"
```

Con `sospese` i bottoni di quella richiesta diventano "Avvisami quando riapro",
la sua pagina spiega in una riga e mostra il modulo dell'avviso; tutto il resto
del sito resta uguale. Va provato in entrambi gli stati.

## Voce e regole dei testi

- **Silvia parla, in prima persona**, e dà del tu. Frasi corte, concrete, calde;
  un sorriso, mai una vendita. Le parole del listino e del form sono sue: si
  usano così come sono.
- **Benessere, non sanità.** Niente "cura", "terapia", "guarire", "trattare"
  disturbi, niente promesse di risultati; i trattamenti non si presentano come
  prestazioni sanitarie. "Decontratturante" resta perché è nel listino, senza
  promesse sul dolore.
- **Le letture** hanno valore orientativo e riflessivo. Il disclaimer di Silvia
  si riporta integrale accanto a ogni richiesta di lettura:
  > La lettura ha valore orientativo e riflessivo: non sostituisce pareri medici,
  > legali o professionali e va interpretata come strumento di introspezione e
  > consiglio.
- **Senza genere quando si può**: "Ti aspetto" invece di "Sei pronta?".
- **Niente emoji nei testi** del sito: ci sono le icone a linea. Il 🌸 resta un
  tocco del marchio nei messaggi precompilati.
- **Niente numeri, recensioni o testimonianze inventati.**
- Titoli: una parte in Playfair Display e, al massimo, una parola scritta a mano.

Esempi di tono (bozze, non testi definitivi):

| Sì | No |
|---|---|
| "Un'ora per te. Il resto può aspettare." | "Esperienze uniche e indimenticabili" |
| "Dopo il trattamento non scappi via: ci sono quindici minuti solo per te." | "Il massaggio che elimina il mal di schiena" |
| "Scegli il tema, io preparo la stesa." | "Scopri cosa ti riserva il futuro" |
| "Ti scrivo io per fissare giorno e ora." | "Prenotazione confermata!" (in fase 1) |

## SEO locale

- Titoli come «Lily Trattamenti Benessere · Massaggi e rituali olistici a
  Montebelluna (TV)»; descrizioni dalle parole del listino.
- Le parole che contano, dentro titoli e testi in modo naturale: massaggio
  olistico, massaggio decontratturante, massaggio rilassante, rituale olistico,
  Montebelluna, Treviso, lettura intuitiva online.
- Dati strutturati (JSON-LD, come `src/lib/seo.ts` di andrea-bellettati):
  `HealthAndBeautyBusiness` con nome, Silvia (`Person`), Instagram in `sameAs`,
  zona servita; indirizzo, coordinate e orari solo quando ci sono; un catalogo
  con i quattro trattamenti e le letture a distanza; `BreadcrumbList` nelle
  pagine interne.
- Sitemap, robots, canonical, un'immagine Open Graph per pagina (1200×630).
  `/bio` e `/stile` fuori dai motori.
- Fuori dal codice: la scheda Google Business Profile (vedi `roadmap.md`).

## Privacy e dati legali

- `/privacy` scritta su come funziona davvero il sito, in prima persona e parole
  semplici (modello: la pagina di andrea-bellettati): titolare Silvia Chizio,
  quali dati per ogni richiesta e perché, chi altro li vede (server, Cloudflare
  se c'è, Amazon SES in una regione UE, casella email), per quanto tempo, diritti.
- Accanto a ogni invio, l'avviso con il link all'informativa.
- Niente banner dei cookie finché il sito non usa cookie di profilazione o di
  statistica (solo `sessionStorage` per bozze e provenienza). Un pixel di Meta o
  un tag di Google vorrebbero banner e informativa aggiornati insieme.
- Partita IVA (se c'è) nel footer, nell'informativa e nelle email, da
  `NEXT_PUBLIC_PARTITA_IVA` come in andrea-bellettati.

## Accessibilità e prestazioni

- Contrasti AA (le coppie di colori sicure sono in `brand.md`), focus visibile,
  bersagli di almeno 44 px, `alt` in italiano, un solo `h1` per pagina, link
  "salta al contenuto", errori dei moduli scritti in parole.
- Con "riduci movimento" niente Lenis né animazioni: pagina completa e ferma.
- Obiettivi su telefono medio, build di produzione: LCP sotto 2,5 s in 4G, CLS
  sotto 0,1, tempo di blocco (TBT) nello stesso ordine di andrea-bellettati
  (home intorno ai 200 ms con il suo metodo di misura).
