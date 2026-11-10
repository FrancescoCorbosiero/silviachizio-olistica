# Testi da validare

I testi scritti dallo studio, non da Silvia: sono **bozze**. Nel codice hanno
accanto un commento `BOZZA`; qui c'è l'elenco da mandare a Silvia, pagina per
pagina. Le parole del listino e del Google Form sono già sue e non compaiono
qui. Quando un testo è approvato (o riscritto da lei) si toglie il commento
`BOZZA` e la riga da questo elenco.

## Tutto il sito

| Dove | Testo | Nota |
|---|---|---|
| Titolo per i motori di ricerca (`src/lib/site.ts`, `SITE_TITLE`) | «Lily Trattamenti Benessere · Massaggi e rituali olistici a Montebelluna (TV)» | compare nella scheda del browser e nei risultati di Google |
| Descrizione per i motori di ricerca (`src/lib/site.ts`, `SITE_DESCRIPTION`) | «Massaggi e rituali olistici a Montebelluna (TV), con un momento relax dopo ogni trattamento. E letture intuitive personalizzate, a distanza.» | le due righe sotto il titolo, nei risultati di Google |

## Guscio (header, menu, piè di pagina, 404)

| Dove | Testo | Nota |
|---|---|---|
| Menu del telefono, sotto "Prenota un trattamento" | «Ti scrivo io per fissare giorno e ora» | |
| Menu, sotto "Richiedi una lettura" | «Foto della stesa e interpretazione, via email» | dalle parole del form |
| Menu, sotto le pagine | «Lily, in breve» · «Il listino: quattro esperienze di benessere» · «Letture intuitive personalizzate, a distanza» · «Silvia, da Montebelluna» · «Dove sono e come scrivermi» | |
| Piè di pagina, sotto il logo | «Trattamenti benessere in studio a Montebelluna (TV) e letture intuitive a distanza.» | |
| Pagina non trovata (404) | «Questa pagina è volata via» · «Forse il link è cambiato, o la pagina non c'è più. Ripartiamo da qui.» | |
| Prenotazioni sospese (`src/lib/richieste.ts`) | «Le prenotazioni dei trattamenti sono sospese per qualche tempo. Lasciami la tua email: ti scrivo io quando riapro.» (per le letture: «Le richieste di lettura…») | si aggiunge la nota di Silvia, se c'è (es. «Riapro a gennaio») |

## Home

| Dove | Testo | Nota |
|---|---|---|
| Hero, titolo | «Un'ora per te» | |
| Hero, le due righe | «Sono Silvia. Nel mio studio a Montebelluna ti aspetto per un massaggio o un rituale olistico; e, a distanza, preparo letture intuitive personalizzate.» | |
| Le due porte | «Quattro trattamenti, da 60 a 75 minuti, e dopo ognuno un momento relax di circa quindici minuti.» · «Una lettura simbolica e intuitiva personalizzata: la foto della stesa e la mia interpretazione, scritta o video.» | |
| Il listino | «Scegli quella che ti somiglia di più. Se non sai quale, nella richiesta puoi lasciar scegliere a me.» | |
| Il momento relax | «Dopo il trattamento non scappi via: ci sono quindici minuti solo per te, per tornare alla giornata con calma.» | |
| Come funziona | titolo «Quattro passi, nessuna fretta»; «Nessun appuntamento automatico: mi scrivi, ti rispondo io e scegliamo insieme. Scorri, te lo racconto come una storia.»; i quattro passi: «Mi scrivi dal sito – Scegli il trattamento e quando ti va: due minuti, un passo alla volta.» · «Ti scrivo io – Per fissare insieme giorno e ora, come preferisci tu.» · «Il trattamento – Un'ora (o un'ora e un quarto) solo per te.» · «Il tuo momento relax – Circa quindici minuti, prima di tornare alla giornata.» | |
| Chi sono | «È la prima riga della mia bio, ed è così che lavoro. Mi trovi su una parete di roccia, in viaggio o con una matita in mano; nello studio porto la stessa energia, e un po' di magia.» | da sostituire con le due righe di Silvia |
| Le letture | la chat: «Ciao Silvia, vorrei una lettura.» · «Ciao! Scegli il tema, io preparo la stesa.» · «Amore / Relazioni» · «Ti mando la foto della stesa e la mia interpretazione, scritta o in video, via email.» | |
| Instagram | «Ogni giorno, un pezzetto della mia vita» · «Trattamenti, viaggi, arrampicate e un po' di magia: è lì che racconto Lily, ed è lì che puoi scrivermi.» | |
| Domande frequenti | titolo «Quello che mi chiedete spesso» e le cinque risposte (durata, dove, come prenoto, consigliami tu, letture a distanza) | risposte vere, parole da approvare |
| Chiusura | «Il resto può aspettare» · «Scegli un trattamento in studio o una lettura a distanza: ti rispondo io, di persona.» | |

## Trattamenti

| Dove | Testo | Nota |
|---|---|---|
| Titolo e descrizione per i motori | «Listino trattamenti · Massaggi e rituali olistici a Montebelluna (TV)» e la descrizione con le parole del listino | |
| Per ogni trattamento, "Cosa aspettarti" e "Per chi è" (`src/lib/trattamenti.ts`) | Lily Holistic: «Un massaggio lento e avvolgente sul lettino, con movimenti morbidi e un ritmo che ti lascia il tempo di rallentare.» / «Per chi ha voglia di staccare e concedersi un'ora di calma.» · Lily Holistic Ritual: «Un rituale più lungo, sul futon: settantacinque minuti per lasciarti andare, senza fretta.» / «Per chi desidera un momento più ampio e raccolto, tutto per sé.» · Lily Sportive: «Un massaggio più deciso, dedicato ai muscoli che lavorano tanto: un tocco più profondo, sempre attento a come stai.» / «Per chi fa sport, cammina in montagna o passa molte ore nella stessa posizione.» · Lily Magic: «Il rituale più magico: la luce della candela, le pietre, il biotensor e un momento di meditazione, in un'atmosfera raccolta.» / «Per chi ama i rituali e ha voglia di lasciarsi sorprendere.» | vanno riscritti con le parole di Silvia: sono la parte più importante da validare |
| Il momento relax (versione distesa) | «Il tempo di riaprire gli occhi, senza fretta. È compreso in ogni trattamento.» | |
| Domande frequenti | titolo «Prima di scegliere» e le quattro risposte (relax, Holistic e Holistic Ritual, consiglio, dove) | |
| Chiusura | «Scegli il tuo momento» · «Mandami la richiesta: ti scrivo io per fissare giorno e ora.» | |

## Chi sono, Contatti, Link in bio

| Dove | Testo | Nota |
|---|---|---|
| Chi sono, la storia (finché Silvia non scrive la sua) | titolo «Un tocco di magia»; «Arrampico, viaggio, scrivo e fotografo: le mie giornate le racconto su Instagram, nelle storie in evidenza. Con Lily porto un po' di quella energia nello studio di Montebelluna.» | da sostituire con le parole di Silvia (`SILVIA.storia` in `src/lib/site.ts`) |
| Chi sono, Instagram e chiusura | «Mi trovi qui» · «Il mio profilo è il posto dove racconto Lily e la mia vita: scrivimi un messaggio quando vuoi.» · «Ci vediamo presto» · «In studio a Montebelluna, o a distanza con una lettura.» | |
| Chi sono, descrizione per i motori | «Sono Silvia Chizio: vivo e sorrido. A Montebelluna (TV) ti aspetto con Lily Trattamenti Benessere; a distanza, preparo letture intuitive personalizzate.» | |
| Contatti | titolo «Dove trovarmi»; «Lo studio è a Montebelluna (TV). Per un trattamento o una lettura mandami una richiesta dal sito; per tutto il resto scrivimi su Instagram.»; chiusura «Scrivimi, ti rispondo io» · «Un trattamento in studio o una lettura a distanza: un passo alla volta, poi ci pensiamo insieme.» | |
| Link in bio | «Sono Silvia: trattamenti benessere in studio a Montebelluna (TV) e letture intuitive a distanza.» | |
| Immagini per i social (`scripts/immagini.cjs`) | i titoli e i sottotitoli di ogni pagina | si rigenerano con lo script |

## Le richieste

I flussi in `src/components/flows/`, le email in `src/lib/emails.ts`, la pagina `/prenota`.

| Dove | Testo | Nota |
|---|---|---|
| Prenota, passo 1 | «Quale trattamento ti va?» · «Scegli dal listino. Se non sai quale, te lo consiglio io.» · la scelta «Non so ancora · Consigliami tu: ne parliamo insieme» | |
| Prenota, passo 2 | «Quando ti va?» · «Dimmi le tue preferenze: ti scrivo io per fissare giorno e ora.» · «Le fasce che preferisci» · «I giorni che preferisci» · «È la prima volta da Lily?» · «Due righe per me» (esempio: «Es. un giorno che ti è comodo, una domanda per me…») | l'avviso «Niente dati sulla salute qui…» è quello di `docs/spec.md` |
| Prenota, passo 3 | «Come ti ricontatto?» · «Ti scrivo io per fissare giorno e ora: lasciami il numero.» · «Se lasci l’email, ti mando il riepilogo.» · «Come preferisci che ti ricontatti?» (Messaggio · Chiamata · Email, con le note «Ti scrivo su WhatsApp, al numero che mi lasci.» · «Ti chiamo io.» · «Ti scrivo all’indirizzo email che mi lasci.») | |
| Prenota e lettura, riepilogo | «Il riepilogo» · «Controlla che sia tutto giusto, poi mandamela.» · accanto al bottone: «Inviando, i tuoi dati arrivano solo a me, per risponderti.» | |
| Prenota, dopo l'invio | «Ricevuto, Giulia!» · «Ti scrivo io su WhatsApp, al numero che mi hai lasciato, per fissare insieme giorno e ora. Intanto ti ho mandato il riepilogo via email.» (o «Ti chiamo io…», «Ti scrivo io via email…») | |
| Lettura, passi | «Su cosa vuoi la lettura?» · «Scegli il tema, io preparo la stesa.» · «La tua domanda» · «Se ti va, scrivimi in due righe cosa ti sta a cuore.» · «Dove ti mando la lettura?» · «La lettura arriva via email: lasciami il tuo nome e l’indirizzo.» | il campo della domanda va confermato con Silvia (il form di oggi non lo chiede) |
| Lettura, dopo l'invio | «Preparo la stesa per te e ti rispondo via email, a marta@…. Ti ho già mandato il riepilogo.» | nessuna promessa sui tempi: non si sa se le 24–48 ore partono dalla richiesta o dal pagamento |
| Avvisami quando riapro | «Ti scrivo io quando riapro» · «Cosa ti interessa» · «Scrivimi quando riapri» · «Uso la tua email solo per questo avviso, una volta. Non è una newsletter.» · dopo l'invio «Fatto, ti avviso io!» · «Quando riapro ti scrivo a anna@…, una volta sola.» | |
| Errori dei campi | «Scegli un trattamento, oppure “Non so ancora”.» · «Scegli almeno una fascia: mattina, pomeriggio o sera.» · «Mi serve un numero valido per ricontattarti.» · «Mi serve la tua email: la lettura arriva lì.» · «Spunta la casella: mi serve il tuo sì per scriverti.» e simili | |
| Invio non riuscito | «Da qui non riesco a mandarla. Mandamela in un altro modo, il testo è già pronto:» · «Non sono riuscita a mandarla da qui. Succede se la rete fa i capricci…» · «Su Instagram incolla il testo nel messaggio e mandalo: ti rispondo io.» | |
| Messaggi già scritti | «Ciao Silvia! 🌸 Vorrei prenotare un trattamento.» · «… Vorrei richiedere una lettura intuitiva.» · «… Mi scrivi quando riapri?» | il 🌸 è il tocco del marchio nei messaggi |
| Pagina `/prenota` | titolo «Prenota il tuo momento» · «Scegli il trattamento e dimmi quando ti va: ti scrivo io per fissare giorno e ora.» · «Cosa succede dopo»: «Mi mandi la richiesta» / «Ti scrivo io» / «Ti aspetto in studio» con le loro righe · «Preferisci scrivermi? Mandami un messaggio dove ti è più comodo: ti rispondo io.» · chiusura «Cerchi una lettura? Le letture intuitive sono a distanza: scegli il tema, io preparo la stesa.» · descrizione per i motori | |
| Email di conferma (trattamento) | oggetto «Ho ricevuto la tua richiesta per Lily Magic» · «la tua richiesta è arrivata. Ti scrivo io su WhatsApp per fissare giorno e ora.» · i tre passi «Ti scrivo io» / «Il trattamento» / «Il tuo momento relax» («Dopo il trattamento non scappi via: ci sono circa 15 minuti solo per te.») · «Vuoi aggiungere qualcosa? Rispondi a questa email…» | |
| Email di conferma (lettura) | oggetto «Ho ricevuto la tua richiesta di lettura» · «la tua richiesta di lettura è arrivata: il tema è …. Preparo la stesa per te e ti rispondo qui, via email.» · i tre passi «Ti scrivo io» / «Preparo la stesa» / «Ricevi la lettura» · il disclaimer integrale | |
| Email di conferma (avviso) | oggetto «Ti scrivo quando riapro» · «ho segnato il tuo indirizzo: quando riapro … ti scrivo, una volta sola. Non è una newsletter, è solo questo avviso. Se cambi idea, rispondi a questa email e cancello il tuo indirizzo.» | |
| Fondo delle conferme | «Ricevi questa email perché hai chiesto un trattamento dal sito di Lily Trattamenti Benessere. È un messaggio di servizio, non una newsletter: non ti scriverò per altro.» (e le varianti per lettura e avviso) | |
| Email a Silvia | «Contiene dati personali: usali solo per rispondere a questa richiesta.» · per l'avviso: «Il consenso vale solo per questo avviso: quando riapri, scrivi a questo indirizzo e non usarlo per altro.» | quanto tenerle lo dirà l'informativa |


## Privacy

| Dove | Testo | Nota |
|---|---|---|
| `/privacy`, tutta la pagina | l'informativa, scritta su come funziona il sito | da rileggere con Silvia; tempi di conservazione (24 mesi per le richieste, 12 mesi per l'avviso) e dati fiscali da confermare con il suo commercialista. Senza email pubblica, i diritti si esercitano con un messaggio su Instagram |
