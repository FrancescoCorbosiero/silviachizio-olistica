# Specifica del sito

Cosa contiene la landing, come funzionano le richieste e le regole dei testi.
Struttura e blocchi sono una **proposta** costruita sul materiale che c'è (vedi
[`brief.md`](brief.md)); i dati che mancano stanno in
[`domande-aperte.md`](domande-aperte.md). Gli effetti sono descritti in
[`brand.md`](brand.md), "Movimento".

## Mappa del sito

Da novembre 2026 il sito è una **home che fa da landing**, con tre pagine per
chi vuole approfondire (perché: [`decisioni.md`](decisioni.md), «La landing a
pagina unica» e «La home e tre pagine»).

| Percorso | Cosa contiene |
|---|---|
| `/` | La home: hero, listino (`#trattamenti`, con il link a `/trattamenti`), nastro dei nomi, momento relax, come funziona (le storie che scorrono nel telefono), Silvia (`#chi-sono`, con la scheda Instagram), recensioni (solo vere), letture (`#letture`, con la chat), prenota e trovami (`#contatti`), domande, invito |
| `/trattamenti` | Il listino in pagina: una sezione per trattamento con la sua ancora (`#lily-holistic`…; Lily Magic al buio, con la candela), foto in un arco, durata / relax / prezzo, «Cosa aspettarti» e «Per chi è», «Prenota»; la galleria dello studio (scorre di lato, solo con le foto vere), il momento relax, «Prima di venire» (solo con le indicazioni di Silvia), domande, invito |
| `/letture` | Cosa ricevi (le parole del modulo), come funziona in quattro messaggi (la chat che si scrive da sola) e i temi, la stesa con la lente (solo con una foto vera), il disclaimer integrale accanto alla richiesta, domande, invito |
| `/chi-sono` | Nome e prima riga della bio, la storia con le storie in evidenza a ventaglio, il percorso a sentiero (solo con le tappe di Silvia), le cose che ama (icone a linea dalle emoji della bio), «Perché Lily» e formazione (solo con le sue parole), la scheda Instagram, invito |
| `/privacy` | Informativa privacy e cookie, scritta sul modo delle richieste (modulo o sito) |
| `/prenota`, `/prenota/lettura` | Solo con le richieste dal sito (`RICHIESTE_DAL = 'sito'`): le richieste in pagina, per chi arriva senza JavaScript o con un link diretto |

Il link da mettere nella bio di Instagram è la landing con la provenienza:
`/?utm_source=instagram&utm_medium=bio` (`BIO_HREF`).

## Elementi comuni

- **Testata**: una pillola di vetro latte sospesa. Desktop: marchio, le sezioni
  (si accende quella che stai leggendo), Instagram, «Prenota». Telefono: marchio e
  menu (un dialogo a tutto schermo con le sezioni e le due richieste). Scendendo
  si ritira, risalendo torna.
- **Barra in basso** (telefono): il messaggio su Instagram e «Prenota un
  trattamento», sempre a portata di pollice.
- **Piè di pagina** su notte con il bordino rosa della divisa: il logo, le
  sezioni, i canali, lo studio (indirizzo e orari solo se ci sono), il wordmark
  «Lily» che sale lettera per lettera, i dati legali, il credito Alpacode.
- **Le due richieste** sono sempre a un tocco: «Prenota un trattamento» e
  «Richiedi una lettura». Con il modulo (oggi) aprono il modulo Google di Silvia
  in un'altra scheda; con le richieste dal sito aprono il flusso come foglio dal
  basso su telefono e come pannello su desktop.

## La landing, sezione per sezione

1. **Hero: la finestra ad arco.** Sul muro sabbia la firma («Silvia Chizio ·
   Montebelluna (TV)»), il titolo descrittivo («Massaggi e rituali olistici») e le
   parole del listino («Quattro esperienze di benessere · Letture a distanza»);
   sotto, una finestra ad arco con la luce e le ombre dei gigli (il video).
   Scorrendo la finestra si apre a tutto schermo, il titolo passa dall'inchiostro
   alla luce, in fondo Silvia si presenta in una riga. Senza JavaScript o con
   "riduci movimento": la finestra è già aperta.
2. **Il listino** (il foglio che sale sopra la finestra): «Quattro esperienze di
   benessere», le quattro righe (numero, nome, descrizione del listino, minuti) e
   la riga del relax. Ogni riga si apre con cosa aspettarsi, per chi è, il prezzo
   se c'è e «Prenota questo». Su desktop, con le foto dei trattamenti, l'anteprima
   ad arco segue il puntatore.
3. **Il momento relax**: il «15» in grande, pieno di luce, e la frase sui
   quindici minuti che si accende parola per parola.
4. **Silvia**: «Vivo e sorrido», le sue parole (o la bozza), le passioni della
   bio, Instagram; nell'arco la sua foto (finché manca, la luce dello studio).
5. **Recensioni**: solo vere, con il permesso (`RECENSIONI` in `site.ts`).
6. **Le letture**: la frase del modulo, «Riceverai» con i tre punti, i temi, il
   prezzo se c'è, «Richiedi una lettura», il disclaimer integrale; nell'arco la
   foto di una stesa vera (finché manca, le candele).
7. **Come prenotare e dove**: tre passi (mi mandi la richiesta, ti scrivo io, ti
   aspetto in studio), le due richieste e Instagram; lo studio, gli orari e i
   canali, solo con i dati veri.
8. **Domande frequenti**: solo con risposte vere (`src/lib/domande.ts`).
9. **Invito**: il giglio che si disegna, «Ti aspetto», le due richieste.

In anteprima ogni blocco che aspetta un dato compare con un esempio segnato
«Esempio» (prezzi, indirizzo, orari, canali, recensioni, le foto).

### Privacy `/privacy` e 404

- `/privacy` sul modello di andrea-bellettati, in prima persona: con il modulo
  racconta il modulo Google e Instagram; con le richieste dal sito, i flussi,
  l'invio con SES, la provenienza e le bozze (sotto, «Privacy e dati legali»).
- 404: una riga gentile, «Torna all'inizio» e le sezioni.

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

Oggi le richieste passano dal **modulo Google** di Silvia (`RICHIESTE_DAL =
'modulo'`, `MODULI` in `src/lib/site.ts`). Le richieste fatte dal sito, descritte
qui sotto, sono nel codice e **spente**: si riaccendono con `RICHIESTE_DAL =
'sito'` e tornano così come sono.

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

Con `sospese` e le richieste dal sito, i bottoni di quella richiesta diventano
"Avvisami quando riapro" e la sua pagina mostra il modulo dell'avviso; con il
modulo Google, il bottone porta al messaggio su Instagram e una riga spiega
(nel modulo, Silvia può anche chiudere le risposte). Tutto il resto del sito resta
uguale. Va provato in entrambi gli stati.

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
- **Titoli descrittivi**, non slogan: «Massaggi e rituali olistici», «Come
  prenotare». Al massimo una parte in corsivo; niente etichetta sopra ogni titolo.

Esempi di tono (bozze, non testi definitivi):

| Sì | No |
|---|---|
| "Massaggi e rituali olistici" | "Esperienze uniche e indimenticabili" |
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
  con i quattro trattamenti (con le loro ancore) e le letture a distanza; le
  domande frequenti (`FAQPage`).
- Sitemap, robots, canonical, un'immagine Open Graph per pagina (1200×630, con
  la finestra della hero: `scripts/immagini.cjs`).
- Fuori dal codice: la scheda Google Business Profile (vedi `roadmap.md`).

## Privacy e dati legali

- `/privacy` scritta su come funziona davvero il sito, in prima persona e parole
  semplici (modello: la pagina di andrea-bellettati): titolare Silvia Chizio,
  quali dati e perché, chi altro li vede, per quanto tempo, diritti. Cambia da
  sola con l'interruttore delle richieste: con il modulo racconta Google Moduli
  (il sito non raccoglie dati e non usa né cookie né memoria del browser); con le
  richieste dal sito, i flussi, Amazon SES in una regione UE, la casella email,
  la provenienza e le bozze (`sessionStorage`).
- Con le richieste dal sito, accanto a ogni invio l'avviso con il link
  all'informativa.
- Niente banner dei cookie finché il sito non usa cookie di profilazione o di
  statistica. Un pixel di Meta o un tag di Google vorrebbero banner e
  informativa aggiornati insieme.
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
