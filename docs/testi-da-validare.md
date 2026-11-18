# Testi da validare

I testi scritti dallo studio, non da Silvia: sono **bozze**. Nel codice hanno
accanto un commento `BOZZA`; qui c'è l'elenco da mandare a Silvia, nell'ordine
della landing. Le parole del listino e del modulo Google sono già sue e non
compaiono qui. Quando un testo è approvato (o riscritto da lei) si toglie il
commento `BOZZA` e la riga da questo elenco.

## Tutto il sito

| Dove | Testo | Nota |
|---|---|---|
| Titolo per i motori di ricerca (`src/lib/site.ts`, `SITE_TITLE`) | «Lily Trattamenti Benessere · Massaggi e rituali olistici a Montebelluna (TV)» | compare nella scheda del browser e nei risultati di Google |
| Descrizione per i motori di ricerca (`SITE_DESCRIPTION`) | «Massaggi e rituali olistici a Montebelluna (TV), con un momento relax dopo ogni trattamento. E letture intuitive personalizzate, a distanza.» | |
| Piè di pagina, sotto il logo | «Trattamenti benessere in studio a Montebelluna (TV), e letture intuitive a distanza.» | |
| Pagina non trovata (404) | «Questa pagina è volata via» · «Forse il link è cambiato, o la pagina non c'è più. Ripartiamo da qui.» | |
| Prenotazioni sospese (`src/lib/richieste.ts`) | con il modulo: «Le prenotazioni dei trattamenti sono sospese per qualche tempo. Per qualsiasi cosa, scrivimi su Instagram.» (per le letture: «Le richieste di lettura…») | si aggiunge la nota di Silvia, se c'è (es. «Riapro a gennaio») |

## La landing

| Dove | Testo | Nota |
|---|---|---|
| Hero, titolo | «Massaggi e rituali olistici» | descrittivo, al posto di «Uno spazio per rallentare» |
| Hero, in fondo alla finestra aperta | «Sono Silvia: ti aspetto nel mio studio a Montebelluna per un massaggio o un rituale. E, a distanza, preparo letture intuitive.» | |
| Il listino | «Massaggi e rituali olistici, nel mio studio a Montebelluna. Scegli quello che ti somiglia; se non sai quale, lo scegliamo insieme.» | titolo e righe sono le parole del listino |
| Il listino, per ogni trattamento, "Cosa aspettarti" e "Per chi è" (`src/lib/trattamenti.ts`) | Lily Holistic: «Un massaggio lento e avvolgente sul lettino, con movimenti morbidi e un ritmo che ti lascia il tempo di rallentare.» / «Per chi ha voglia di staccare e concedersi un'ora di calma.» · Lily Holistic Ritual: «Un rituale più lungo, sul futon: settantacinque minuti per lasciarti andare, senza fretta.» / «Per chi desidera un momento più ampio e raccolto, tutto per sé.» · Lily Sportive: «Un massaggio più deciso, dedicato ai muscoli che lavorano tanto: un tocco più profondo, sempre attento a come stai.» / «Per chi fa sport, cammina in montagna o passa molte ore nella stessa posizione.» · Lily Magic: «Il rituale più magico: la luce della candela, le pietre, il biotensor e un momento di meditazione, in un'atmosfera raccolta.» / «Per chi ama i rituali e ha voglia di lasciarsi sorprendere.» | vanno riscritti con le parole di Silvia: sono la parte più importante da validare |
| Il momento relax | «15 minuti per te» · «Dopo il trattamento non scappi via: ci sono quindici minuti solo per te, per tornare alla giornata con calma.» | |
| Silvia | «Silvia Chizio · la prima riga della mia bio» · «Ed è così che lavoro. Mi trovi su una parete di roccia, in viaggio o con una matita in mano; nello studio porto la stessa energia, e un po' di magia.» | da sostituire con le sue parole (`SILVIA.storia` in `src/lib/site.ts`); le passioni vengono dalle emoji della bio |
| Recensioni | titolo «Dicono di Lily» | il blocco compare solo con recensioni vere (in anteprima, segnaposto dichiarati) |
| Le letture | «Per chi mi segue da lontano: una lettura simbolica e intuitiva personalizzata, che ti arriva via email.» | «Riceverai», i tre punti, i temi e il disclaimer sono le parole del modulo |
| Bottoni dei trattamenti, finché non c'è il loro modulo | «Prenota su Instagram» · passo 1: «Un messaggio su Instagram: il trattamento che ti interessa e quando ti va. Per le letture c'è il mio modulo.» · domanda «Come prenoto?»: «Scrivimi un messaggio su Instagram: dimmi il trattamento che ti interessa e quando ti va, e fissiamo insieme giorno e ora. Per una lettura c'è il mio modulo, con «Richiedi una lettura».» | cambiano da soli quando il link arriva in `MODULI.trattamenti` |
| Come prenotare | «Nessun appuntamento automatico: mi scrivi, ti rispondo io e scegliamo insieme.» · i tre passi: «Mi mandi la richiesta – Dal mio modulo: il trattamento che ti interessa e come ricontattarti. Bastano due minuti.» · «Ti scrivo io – Per fissare insieme giorno e ora. Per le letture ti rispondo via email.» · «Ti aspetto in studio – A Montebelluna (TV). Dopo il trattamento, circa 15 minuti di relax solo per te.» · «Su appuntamento: giorno e ora li fissiamo insieme» (finché non ci sono gli orari) · «Rispondo io, di persona.» | i «due minuti» vengono dal modulo delle letture: da confermare per i trattamenti |
| Domande frequenti (`src/lib/domande.ts`) | le cinque domande e risposte (durata, dove, come prenoto, consigliami tu, letture a distanza) | risposte vere, parole da approvare |
| Come funziona (le storie) | «Come funziona» · «Nessun appuntamento automatico: mi scrivi, ti rispondo io e scegliamo insieme. Scorri, te lo racconto come una storia.» · le quattro storie: «Mi scrivi su Instagram – Il trattamento che ti interessa e quando ti va.» (con il modulo: «Mi mandi la richiesta – … due minuti.») · «Ti scrivo io – Per fissare insieme giorno e ora, come preferisci tu.» · «Il trattamento – Un'ora (o un'ora e un quarto) solo per te, a Montebelluna.» · «Il tuo momento relax – Circa 15 minuti, prima di tornare alla giornata.» | durate e relax vengono dal listino |
| La chat delle letture (`src/components/ui/Chat.tsx`) | «Ciao Silvia, vorrei una lettura.» · «Ciao! Scegli il tema, io preparo la stesa.» · «Amore / Relazioni» · «Ti mando la foto della stesa e la mia interpretazione, scritta o in video, via email.» | |
| Prenota e trovami | «Per un trattamento scrivimi su Instagram, per una lettura c'è il mio modulo: ti rispondo io.» | |
| Invito | «Ti aspetto» · «In studio a Montebelluna, o a distanza con una lettura.» | |
| Immagini per i social (`scripts/immagini.cjs`) | i titoli e i sottotitoli di ogni pagina | si rigenerano con lo script |

## Le pagine

| Dove | Testo | Nota |
|---|---|---|
| `/trattamenti`, testata | «Listino trattamenti» · «Quattro esperienze di benessere, da 60 a 75 minuti, nel mio studio a Montebelluna. Dopo ognuna, circa 15 minuti di relax.» | parole del listino |
| `/trattamenti` | «Lo studio» · «Prima di venire» · domande: «Quanto dura il momento relax?», «Qual è la differenza tra Lily Holistic e Lily Holistic Ritual?», «Posso farmi consigliare?», «Dove si trova lo studio?» · invito «Scegli il tuo momento» | risposte vere, parole da approvare |
| `/letture` | «Una lettura tutta per te» · «Riceverai, via email» · «Te lo racconto in quattro messaggi» e i quattro messaggi (`COME` nella pagina) · «Una stesa vera» · «Così ti arriva: la foto delle carte, come le ho disposte per te, insieme alla mia interpretazione.» · «Da sapere prima di chiedere» · invito «Scegli il tema, io preparo la stesa» · «E se sei in zona, ti aspetto anche in studio a Montebelluna.» | |
| `/chi-sono` | «Lily Trattamenti Benessere, a Montebelluna. E letture intuitive, a distanza.» · «Un tocco di magia» e la storia (la stessa bozza della home, finché manca `SILVIA.storia`) · «Passo dopo passo» · «Le cose che amo» · «Mi trovi qui» · «Il mio profilo è il posto dove racconto Lily e la mia vita: scrivimi un messaggio quando vuoi.» · invito «Ci vediamo presto» | |
| Descrizioni per i motori (`metadata` di ogni pagina) | titoli e descrizioni | |

## Privacy

| Dove | Testo | Nota |
|---|---|---|
| `/privacy`, tutta la pagina | l'informativa, scritta sul modo delle richieste | da rileggere con Silvia (e con un consulente: il modulo Google, tempi di conservazione, dati fiscali). Senza email pubblica, i diritti si esercitano con un messaggio su Instagram. Chiusura: «Torniamo al benessere» |

## Le richieste dal sito (oggi spente)

Valgono solo con `RICHIESTE_DAL = 'sito'`. I testi dei flussi
(`src/components/flows/`), delle email (`src/lib/emails.ts`) e degli errori
(`src/lib/forms.ts`) sono quelli già elencati prima della landing: si trovano
nella storia di questo file (commit precedente alla landing) e nel codice,
segnati `BOZZA`. In più:

| Dove | Testo | Nota |
|---|---|---|
| `/prenota` | «Prenota un trattamento» · «Scegli il trattamento e dimmi quando ti va: ti scrivo io per fissare giorno e ora.» · «Preferisci scrivermi? Mandami un messaggio su Instagram: ti rispondo io.» · descrizione per i motori | |
| `/prenota/lettura` | «Richiedi una lettura» · «Scegli il tema, io preparo la stesa: ti arriva via email.» | |
| Prenotazioni sospese, dal sito | «… sono sospese per qualche tempo. Lasciami la tua email: ti scrivo io quando riapro.» | |
