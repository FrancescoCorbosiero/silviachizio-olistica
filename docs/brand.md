# Brand System «Lily»

Ricavato dal logo, dal listino illustrato e dalla divisa di Silvia (immagini in
`immagini/`). I colori sono campionati dall'immagine del listino; font, componenti
e movimento sono una **proposta** coerente con quel materiale. Va in
`src/app/globals.css` come token e componenti, sul modello del Brand System di
andrea-bellettati, e si rivede con Silvia nella pagina `/stile`.

## Da dove viene

- **Il logo**: un giglio disegnato a matita, «Lily» in corsivo pennellato fucsia
  sopra il fiore, «Trattamenti Benessere» in corsivo sottile; nel listino è
  affiancato da due filetti rosa.
- **Il listino**: fondo bianco rosato con velature ad acquerello, titoli in un
  serif ad alto contrasto («LISTINO» scuro, «TRATTAMENTI» fucsia), sottotitolo in
  corsivo su una pennellata rosa, icone a linea rosa dentro cerchi cipria, filetti
  sottili tra le voci, cuori disegnati a mano, puntini e scintille, gigli rosa,
  foglie, candele, pietre, oli.
- **La divisa**: casacca nera con il bordino rosa e il logo ricamato.
- **Silvia**: «Vivo e sorrido», natura, viaggi, arrampicata, meditazione, un
  tocco di magia (vedi `brief.md`).

## Carattere

**Calda, solare, femminile, un po' magica.** Elegante come il listino, viva come
Silvia. Rispetto ai riferimenti: niente aria "tecnica" (il vetro di
andrea-bellettati resta solo su header e fogli) e niente bacheca di
ireandlunaslife. Qui le superfici sono morbide come petali e il movimento respira.

## Palette

Campioni in `immagini/palette.png`.

| Token | Hex | Da dove | Uso |
|---|---|---|---|
| `--lily` | `#E00B57` | «TRATTAMENTI», wordmark del logo | marchio, titoli in rosa, bottoni principali |
| `--lily-deep` | `#C40A4C` | nomi dei trattamenti, più scuro | testo rosa piccolo su fondi rosati, hover |
| `--lily-bright` | `#F24F80` | bordino della divisa | rosa su fondo notte, il filo dei bordi |
| `--petalo` | `#F8AAC6` | petali e cuori del listino | filetti, sottolineature a mano, decoro |
| `--cipria` | `#FCE0E9` | cerchi delle icone | cerchi, pillole, campi selezionati |
| `--blush` | `#FBE8EE` | pennellate e fascia in fondo al listino | nastri, fasce, sezioni chiare |
| `--latte` | `#FDF6F8` | fondo del listino | fondo pagina |
| `--carta` | `#FFFFFF` | — | card |
| `--inchiostro` | `#2A1B17` | «LISTINO», testi | titoli scuri e testo |
| `--ink-mute` | `#6E5A5E` | — | testo secondario |
| `--notte` | `#221814` | la divisa | sezioni scure, footer |
| `--grafite` | `#6F6664` | il giglio a matita | disegni a linea |
| `--foglia` | `#A09A5D` | le foglie | solo decoro, mai testo |
| `--candela` | `#F6C28B` | la luce delle candele | bagliori caldi, Lily Magic |
| `--cera` | `#FCE2BC` | la cera | fondi caldi, aloni |

**Coppie sicure per il testo** (WCAG AA, testo normale ≥ 4,5:1):

- `--inchiostro` su `--latte` 15,6:1 · `--ink-mute` su `--latte` 6,0:1.
- `--lily` su `--carta` 4,8:1 e su `--latte` 4,5:1 (al limite: va bene, non
  scendere sotto). Su `--cipria` `--lily` regge solo il testo grande (3,9:1):
  per il testo piccolo su fondi rosati si usa `--lily-deep` (4,9:1 su
  `--cipria`, 5,1:1 su `--blush`).
- Bianco su `--lily` 4,8:1 (bottoni), su `--lily-deep` 6,0:1 (hover).
- Su `--notte`: `--latte` 16,3:1, `--candela` 10,8:1, `--petalo` 9,6:1,
  `--lily-bright` 5,1:1. `--lily` su `--notte` solo per testo grande (3,6:1).
- `--foglia` non è mai testo (2,7:1).

## Tipografia

Confronti con il materiale di Silvia: `immagini/confronto-serif.png` e
`immagini/confronto-script.png`.

| Ruolo | Font | Perché |
|---|---|---|
| Titoli e nomi dei trattamenti | **Playfair Display** 700–900 | il serif ad alto contrasto di «LISTINO TRATTAMENTI» |
| Sottotitoli e descrizioni brevi | **Playfair Display Italic** 400 | come «Quattro esperienze di benessere» e le descrizioni del listino |
| Testo | **Figtree** 400–700 | leggibile sul telefono; è anche il font di Konsta (`--font-ios`) |
| La parola a mano | **Damion** (in alternativa Yellowtail) | i più vicini al wordmark «Lily» |

- Tutti self-hosted (woff2, `next/font/local` come in `src/app/fonts.ts` di
  andrea-bellettati), niente CDN di Google Fonts.
- Great Vibes è quasi identico a «Trattamenti Benessere» del logo: serve solo se
  bisogna ricomporre il logo in testo, mai nei contenuti.
- Il maiuscolo solo per titoli brevi da manifesto, come «LISTINO»; i nomi dei
  trattamenti in maiuscolo e minuscolo, come nel listino.
- Una sola parola a mano per titolo, in `--lily`, con la sottolineatura a mano in
  `--petalo` che si disegna per ultima.
- Titoli grandi con interlinea stretta (1–1,05); testo da 17–18 px su telefono,
  righe di 60–70 caratteri.

## Logo

- Serve il **file originale** (vettoriale o PNG grande).
  `immagini/logo-dal-listino.png` è un ritaglio a bassa risoluzione: solo
  riferimento.
- Versioni da preparare: completa su chiaro; su fondo notte (wordmark
  `--lily-bright`, giglio a linea chiara); solo giglio (favicon, icona dell'app,
  monogramma); solo wordmark (header compatto).
- Se l'originale non arriva, si ricostruisce in SVG (giglio a linea + wordmark) e
  si fa approvare a Silvia. Mai deformarlo, ricolorarlo fuori palette o
  aggiungergli effetti.

## Icone

- **Le quattro icone dei trattamenti**, a linea in `--lily` dentro cerchi
  `--cipria`, come nel listino: loto (Lily Holistic), asciugamano arrotolato con
  due scintille (Lily Holistic Ritual), schiena e spalle (Lily Sportive), candela
  con pietre, cristallo e fiore (Lily Magic). SVG su misura, tratto di circa
  1,75 px a 24 px, estremi arrotondati.
- Con la stessa mano: orologio (durate), cuore, loto, scintilla ✦, foglia, e le
  icone delle passioni di Silvia per Chi sono.
- Icone dell'interfaccia: Lucide (come andrea-bellettati), stesso spessore.

## Motivi

- **Il giglio a matita** del logo, grande e leggero ai margini, che si disegna da
  solo.
- **La pennellata**: fascia `--blush` dai bordi irregolari dietro ai
  sottotitoli, come «Quattro esperienze di benessere».
- **Il divisore col loto**: un loto al centro e due riccioli ai lati.
- **Cuori a mano** (contorno `--lily`, tratto libero), **scintille** ✦ e puntini.
- **Petali, gigli rosa, foglie**: decoro ai margini, mai sotto al testo.
- **La luce di candela**: bagliore `--candela` per Lily Magic.
- **Il bordino della divisa**: un filo `--lily-bright` di 3 px sul bordo delle
  sezioni notte e del footer.

## Superfici e componenti

- **Petalo** (card e pannelli): `--carta` o `--latte`, raggio 24–28 px, filo rosa
  appena visibile, ombra morbida tinta di rosa (mai grigia, mai piena); al
  passaggio si solleva di poco.
- **Vetro rosato** (header, barra in basso, fogli): il vetro di andrea-bellettati
  e di Konsta 5 (stile iOS 26) con una velatura latte e rosa. Trasparenza solo
  dove dietro c'è qualcosa.
- **Notte**: sezioni su `--notte` per Lily Magic, chiusure e footer; testo
  `--latte`, accenti `--lily-bright` e `--candela`.
- **Fondo**: `--latte` con macchie d'acquerello rosa leggerissime (gradienti
  radiali in CSS, non immagini).
- **Bottoni**: pillola piena `--lily` con testo bianco (principale), contorno
  rosa su chiaro (secondario), `--latte` su notte. L'etichetta rotola al
  passaggio, come nei riferimenti.
- **Riga del listino**: cerchio con l'icona · nome (Playfair 700, `--lily`) e
  descrizione (Playfair corsivo, `--inchiostro`) · filetto verticale · orologio e
  durata. È il componente simbolo: home, trattamenti, flusso di prenotazione,
  email.
- **Konsta**: colore primario `--lily`, font Figtree (`--color-brand-primary`,
  `--font-ios`, come in andrea-bellettati).

## Foto e illustrazioni

- **Foto vere** prima di tutto: Silvia al lavoro nella divisa, lo studio
  (lettino, futon, candele, pietre, cristalli, biotensor, oli, asciugamani),
  mani e dettagli, in luce calda e naturale. Per Chi sono, qualche foto della sua
  vita (arrampicata, viaggi), con il suo permesso.
- Niente foto stock di sassi e orchidee: tolgono la persona.
- Cornici: cerchi (come le storie di Instagram) e archi morbidi; le foto si
  aprono da questi ritagli (`data-clip`).
- **L'illustrazione del listino** (Silvia disegnata) è l'immagine con cui Silvia
  si presenta oggi: si può usare, se lo vuole e in alta risoluzione, in punti
  leggeri (404, `/bio`, chiusure). Mai al posto del listino in testo.

## Movimento: «respiro»

Lo stesso motore dei riferimenti, con un altro passo: più lento e morbido.
Entrate lunghe e sfumate (righe, sfocatura, lettere), curve dolci
(`power3.out`, `sine.inOut`), niente rimbalzi vistosi. Le cose leggere
galleggiano, le cose care si disegnano. Un effetto forte per sezione, il resto
calmo.

Due effetti nuovi, solo CSS:

- ~~Il bagliore che respira~~: tolto nella revisione di novembre 2026 (vedi
  sotto, «Revisione: meno galleggiante, più architettura»).
- **La candela**: in Lily Magic la luce tremola appena.

| Effetto | Da dove | Per Lily |
|---|---|---|
| `data-reveal`, `data-reveal="stagger"` | andrea-bellettati | blocchi e griglie che salgono, senza rimbalzo marcato |
| `data-split` + `.script` | andrea-bellettati, variante `chars` da ireandlunaslife | titoli a righe, sfocati o lettera per lettera; la parola a mano per ultima |
| `data-draw` | entrambi | il giglio, i cuori e il divisore col loto che si disegnano |
| `data-clip` | andrea-bellettati | foto che si aprono da un cerchio o da un arco |
| `data-scrub` | entrambi | la frase del momento relax che si accende |
| `data-stories` | andrea-bellettati | "come funziona" come stories di Instagram |
| `data-rail` | entrambi | tappe che si accendono, con un petalo al posto della zampina |
| `data-fan` | entrambi | le foto di Silvia che si aprono a ventaglio |
| `data-trail` (facoltativo) | entrambi | il percorso di Silvia su un sentiero tratteggiato con le foglie |
| `data-parallax`, `data-speed`, `data-hero-away` | entrambi | profondità leggera nell'hero |
| `details[data-accordion]` | entrambi | domande frequenti |
| `data-wordmark` | entrambi | «Lily» nel footer, lettera per lettera |
| `data-tilt` | entrambi | card dei trattamenti verso il puntatore, inclinazione minima |
| `data-marquee` | ireandlunaslife | il nastro dei trattamenti, che segue velocità e verso dello scroll |
| `data-spin` | ireandlunaslife | l'anello di testo intorno alla foto, il badge "Prenota" |
| `data-float` | ireandlunaslife | petali e gigli che ondeggiano |
| `data-peek` | ireandlunaslife | il giglio che spunta dal fondo della chiusura |
| `data-magnetic` | ireandlunaslife | il badge "Prenota" attirato dal puntatore |
| `data-pop` | ireandlunaslife | le icone nei cerchi cipria, con un pop morbido |
| `data-chat` | ireandlunaslife | la lettura raccontata come messaggi diretti |
| `data-lens` | ireandlunaslife | la lente sulla foto della stesa |
| `data-path-row` | ireandlunaslife | l'indice dei trattamenti: la foto segue il puntatore |
| `data-paw-trail` → `data-petal-trail` | ireandlunaslife | petali che cadono dietro al puntatore, un cuore al tocco |
| `data-pet` → `data-love` | entrambi | cuori al tocco sul ritratto: un battito, niente "scodinzolo" |
| `celebrate()` | entrambi (`fx.ts` in andrea-bellettati) | all'invio petali, cuori e scintille, al posto di zampe e ossa |
| `data-hero-zoom` (facoltativo) | ireandlunaslife | un cerchio, come la storia in evidenza «Lily 🌸», che si allarga fino a riempire lo schermo: si entra nello studio. Solo desktop, solo con una foto dello studio all'altezza |
| `data-hscroll` | ireandlunaslife | galleria orizzontale dello studio su desktop (Trattamenti) |
| `video[data-video]` | nuovo | il video di sfondo della hero: arriva dopo l'idratazione, sopra il suo primo fotogramma |

Non si portano: `data-sticker-wall`, `data-stamp`, `data-strike`, `data-venn`, le
rotazioni, le forme di zampe e ossa.

Regole per ogni effetto portato:

- Entra nel motore di andrea-bellettati con le sue regole: armato da un
  IntersectionObserver, nato a tappe, smontato al cambio pagina; le sezioni
  ferme (`data-hero-zoom`, `data-hscroll`, `data-stories`) usano
  `position: sticky` e `data-pin-stage`, non i pin di ScrollTrigger.
- Si misura prima e dopo (TBT, metodo in `decisioni.md`): se pesa, si semplifica
  o si toglie.
- Gli effetti col puntatore (`data-petal-trail`, `data-magnetic`, `data-lens`,
  `data-path-row`, `data-tilt`) solo con un mouse (`hover: hover` e
  `pointer: fine`).
- Con "riduci movimento" tutto fermo, `celebrate()` compreso.

## Da evitare

- Sticker scontornati, rotazioni, ombre piene "a timbro", nastri inclinati.
- Grigi freddi, nero puro, rosa più acidi di `--lily`.
- Più di una parola a mano per titolo; maiuscolo nei testi lunghi.
- Foto stock; immagini con il testo dentro (come il listino in JPG).
- Simboli esoterici pesanti: per le letture bastano carte, luce e stelle discrete.

## Revisione: meno galleggiante, più architettura (novembre 2026)

Prima revisione dopo aver visto il sito intero. Il giudizio: troppo bianco,
tutto "galleggiante" (card, cerchi, aloni sullo stesso fondo chiaro), poche
sezioni che riempiono lo schermo, e troppi segni da modello generico (etichette
con la scintilla, pillole, aloni che respirano, anello di testo che gira, nastro
con le scintille, una parola scritta a mano in ogni titolo). Cosa cambia:

- **Scene a tutto schermo.** `components/ui/Scena.tsx`: sezioni alte quanto lo
  schermo (o quasi) con un'immagine di fondo che scorre più lenta della pagina
  (`data-parallax-cover`) e un velo che tiene leggibile il testo. Le usano
  l'hero e la chiusura di ogni pagina, le testate di Trattamenti, Letture, Chi
  sono e Contatti, il momento relax e le letture in home. Le due porte della
  home sono due pannelli alti con l'immagine.
- **Le immagini** stanno in `src/lib/immagini.ts`. Oggi sono **atmosfere
  disegnate da noi** (`scripts/atmosfere.cjs`: ombre di gigli su un muro rosa
  antico, seta, candele fuori fuoco, petali fuori fuoco, lino): niente stock,
  niente persone, niente studio finto. Con le foto vere di Silvia si cambia solo
  quel file.
- **Fondo pieno, non bianco.** Il fondo pagina è `--sabbia` (#F2E4DD, il muro);
  il ritmo lo danno le fasce `fondo-blush`, `fondo-vino` (`--vino` #4A1027, il
  lily in ombra), `fondo-notte` e le scene. Via le macchie d'acquerello.
- **Forme architettoniche.** Raggi da 2–6 px (`--radius-btn`, `--radius-tile`,
  `--radius-petalo`) al posto delle pillole e dei petali da 26 px. L'unica curva
  vera è **l'arco** delle foto (`.foto-arco`), come una porta o una finestra; i
  cerchi restano solo per le icone del listino, che vengono dal listino di
  Silvia. Bottoni rettangolari, senza ombra né sollevamento.
- **Tipografia.** La parola in evidenza dei titoli (`.script`) è il corsivo di
  Playfair, non più Damion: Damion resta al logo, al wordmark del footer e alla
  firma «Silvia». Le etichette sono in maiuscoletto spaziato con un filetto, senza
  scintilla.
- **Tolti**: l'alone che respira, i petali che ondeggiano e i petali/cuori
  dietro al puntatore nell'hero (i «cuori troppo invasivi»). Anello di testo,
  badge "Prenota", nastro dei nomi e cuori sul ritratto, tolti in un primo
  momento, sono tornati nella seconda revisione (sotto).

## Seconda revisione: ogni blocco, il video, le pagine interne (novembre 2026)

Rivedendo la prima revisione: la direzione è giusta, ma alcuni blocchi belli
erano spariti, le pagine interne erano rimaste indietro e il sito, essendo
un'anteprima, deve mostrare tutto. Cosa cambia:

- **Ogni blocco, in anteprima.** In sviluppo e in `npm run anteprima` compaiono
  anche i blocchi che aspettano un dato di Silvia (prezzi, indirizzo, orari,
  canali, recensioni, percorso, «perché Lily», formazione, prima di venire, la
  stesa, la galleria dello studio, una foto per trattamento), con un valore
  d'esempio e il **segno «Esempio»** (`components/ui/Esempio.tsx`: piccolo,
  tratteggiato, dice cosa serve). Nella build di produzione non c'è nessun
  esempio: la regola dei fatti resta (`src/lib/anteprima.ts`, `decisioni.md`).
- **Il video della hero.** La luce del pomeriggio e le ombre dei gigli che si
  muovono piano sul muro (12 s in loop, disegnato da noi:
  `scripts/video-hero.cjs`). Il primo fotogramma è il poster; il video arriva
  dopo, solo se il movimento è permesso e la connessione non chiede di
  risparmiare.
- **Tornati, nello stile nuovo**: il **nastro** dei nomi su una fascia lily
  piena, con il giglio a linea al posto della scintilla; il **sigillo**
  nell'hero (il giglio che si disegna dentro l'anello di testo che gira); il
  **badge "Prenota"** magnetico e il **giglio che spunta** nella chiusura; i
  **cuori al tocco** sul ritratto di Chi sono (solo lì, mai nell'hero).
- **Le foto dell'anteprima** nelle due porte della home: Montebelluna dall'alto
  (In studio, anche nella testata di Contatti) e le carte (Letture, anche nella
  stesa con la lente e nella fascia delle letture di Prenota).
- **Pagine interne** al livello della home: testate in scena in ogni pagina;
  Trattamenti con l'indice (la foto segue il puntatore), una sezione per
  trattamento con la foto nell'arco, Lily Magic come scena con le candele, la
  galleria dello studio che scorre di lato; Letture con i tre punti numerati,
  i temi su una scena, la stesa con la lente; Chi sono con il sentiero del
  percorso e le passioni su fondo vino; Contatti a colonne con i canali in
  righe; Prenota con le tappe che si accendono (`data-rail`).
- **Nuovi componenti** in `globals.css`: `.numero` (i numeri in corsivo),
  `.righe` e `.colonne-filetto` (impaginazione a filetti), `.riga-link`,
  `.citazione`, `.galleria`, `.sentiero` e `.tappa`, `.pannello-notte`,
  `.tag-contorno`, `.sigillo`, `.esempio`.
