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
