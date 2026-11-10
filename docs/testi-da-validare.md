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
