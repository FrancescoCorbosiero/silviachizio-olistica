# Decisioni

Le scelte che non si capiscono dal codice, con il perché. Una per paragrafo, le
più recenti in fondo. Sono proposte dello studio: se cambiano, si aggiorna prima
qui e poi il codice.

## Un repository per sito e gestionale

Il sito di oggi e il gestionale di domani (prenotazioni, clienti, newsletter)
vivono nello stesso progetto, come in andrea-bellettati. Il ponte sono le
richieste: oggi mandano un'email, domani creano una prenotazione. Con due
repository catalogo, flussi e Brand System andrebbero scritti due volte e chi
prenota passerebbe da un sito all'altro. Le aree future: `/gestione` per Silvia,
eventualmente `/area-clienti` (vedi [`web-app.md`](web-app.md)).

## Next.js e Konsta, non Astro

ireandlunaslife è Astro statico: perfetto per una vetrina, ma la strada del
gestionale vuole server, database, accesso e invii programmati, e Konsta UI
esiste per React, non per Astro. andrea-bellettati ha già lo stesso stack in
produzione (Next.js 16, React 19, Tailwind 4, Konsta UI 5, SES, Docker + Caddy)
con flussi a passi e fogli dal basso: si parte da lì, con le stesse versioni.

## Il movimento: il motore di andrea-bellettati, gli effetti di ireandlunaslife

Il motore di andrea-bellettati è quello di ireandlunaslife reso leggero: arriva
dopo la pagina, arma le rivelazioni con un IntersectionObserver, usa `sticky` al
posto dei pin, nasce a tappe. ireandlunaslife ha più effetti (nastro, anello che
gira, petali dietro al puntatore, lente, chat, magnete…). Si parte dal motore
leggero e gli effetti si aggiungono uno alla volta, ritemati e misurati (elenco
in [`brand.md`](brand.md), "Movimento").

## Leggerezza: si misura

Il pubblico arriva da Instagram, quindi da telefono. Come in andrea-bellettati
si misura il tempo in cui il thread principale resta bloccato (TBT, come
Lighthouse): telefono medio simulato (412×823, CPU 4 volte più lenta), build di
produzione, mediana di 3 caricamenti. I numeri valgono come confronto dentro la
stessa sessione di misura. Ogni effetto nuovo si misura prima e dopo; i risultati
vanno in una tabella qui sotto, come in andrea-bellettati.

## Fase 1: richieste via email, pensate come prenotazioni

La scelta tra la strada A (richieste via email) e la strada B (gestionale) non
blocca il sito. Si parte con la A, ma ogni richiesta ha già la forma di una
prenotazione: trattamento dal catalogo, durata, preferenze, contatti, stato. Il
catalogo conosce le durate e i 15 minuti di relax, cioè quello che servirà per
calcolare gli spazi in agenda. Passare alla B vuol dire salvare la richiesta
invece di spedirla soltanto.

## Il Google Form va in pensione

Il link in bio porta a `/bio`: una pagina veloce, senza menu, con le due
richieste a un tocco. Il form oggi chiede tutto in una volta e non dice cosa
succede dopo; il sito chiede un passo alla volta, mostra il riepilogo, conferma
via email e fa sapere a Silvia da dove arriva la richiesta. Il form si spegne
quando il sito è online e il link in bio è cambiato.

## Le prenotazioni si possono sospendere

La bio dice «sospeso al momento»: succederà di nuovo (ferie, periodi pieni). Un
interruttore per ciascuna delle due richieste in `src/lib/site.ts` trasforma i
bottoni in "Avvisami quando riapro" senza toccare il resto. Chi arriva in quei
giorni lascia l'email invece di andarsene, con un consenso per quel solo scopo.

## Il listino è testo, non un'immagine

L'immagine del listino è bella sui social ma sul sito sarebbe invisibile ai
motori e agli screen reader, illeggibile se ingrandita e porta con sé i segni
della generazione automatica (sottolineature del correttore, testo poco nitido).
Il listino si ricompone in HTML con il componente "riga del listino", che ne
riprende l'aspetto.

## Prezzi solo quando ci sono

Il listino di Silvia non ha prezzi. Il catalogo ha il campo `prezzo`, vuoto: il
sito mostra un prezzo solo quando Silvia lo dà. Niente "a partire da" inventati.

## Dati minimi

Nessun dato sulla salute nei moduli: se c'è qualcosa da sapere prima di un
trattamento, Silvia lo chiede di persona. Il form delle letture oggi chiede il
codice fiscale: sul sito non si chiede finché non è chiaro a cosa serve. Se serve
per la ricevuta o la fattura, si chiede quando serve davvero (al pagamento), con
il motivo scritto accanto. Il telefono è obbligatorio solo per i trattamenti,
l'email solo per le letture e per l'avviso di riapertura.

## Niente embed e niente banner

Niente feed di Instagram incorporato né mappa di Google: pesano, portano cookie
di terze parti e chiederebbero un banner. Al loro posto una scheda statica del
profilo e il link "Apri in Maps". Senza cookie di profilazione o di statistica il
sito non ha bisogno del banner, come andrea-bellettati.

## WhatsApp e telefono solo se ci sono

Silvia oggi non pubblica un numero. Come in ireandlunaslife (`HAS_WA` in
`src/config.ts`), con `WA_NUMBER` vuoto bottoni WhatsApp e link `tel:` non
compaiono; quando arriva il numero, si riaccendono ovunque. Il messaggio
diretto su Instagram (`https://ig.me/m/silvia_chizio`) c'è sempre: è il canale
che il suo pubblico usa già.

## Font: Playfair Display, Figtree, Damion

Playfair Display è il serif più vicino ai titoli del listino, in tondo e in
corsivo; Damion il corsivo più vicino al wordmark «Lily»; Figtree tiene il testo
leggibile sul telefono e veste Konsta (confronti in `immagini/`). Tutti
self-hosted: nessuna richiesta a Google, nessun dato che esce dal sito.

## Un brand morbido, non una bacheca

Da ireandlunaslife si prendono il movimento e la cura dei dettagli, non lo stile
"bacheca" (sticker, rotazioni, ombre piene): Lily è elegante e calda, come il
listino. Il vetro di andrea-bellettati resta dove serve all'interfaccia (header,
barra in basso, fogli), velato di rosa.

## Una pagina per tutti i trattamenti, per ora

Quattro trattamenti con una riga di descrizione ciascuno non riempiono quattro
pagine: sarebbero pagine sottili, peggiori anche per i motori. Per ora una
pagina `/trattamenti` con un'ancora per trattamento; quando Silvia avrà descritto
bene ogni trattamento, ognuno potrà avere la sua pagina (`/trattamenti/[slug]`).

## Credito Alpacode

Come negli altri siti dello studio, in fondo al footer il badge «Realizzato da
Alpacode» (`AlpacodeBadge` di andrea-bellettati): il link sta nell'HTML, lo
script si carica a pagina ferma.

## Il logo provvisorio è un SVG con le lettere in tracciati

Il logo originale non c'è ancora (domande aperte ★) e il ritaglio dal listino è
troppo piccolo. Per non bloccare il sito, il logo è ricostruito in SVG: il
giglio a linea è ridisegnato, «Lily» (Damion) e «Trattamenti Benessere» (Great
Vibes) sono convertiti in tracciati. Così Great Vibes non si scarica mai (serve
solo qui) e lo stesso file vale per il sito, le icone e le immagini per i
social. File in `public/brand/` e, per il giglio da disegnare e animare,
`src/components/brand/Giglio.tsx`. Quando arriva l'originale si sostituiscono
questi file e basta.

## Font: solo i pesi che servono, solo l'alfabeto latino

Playfair Display variabile (titoli, 400–900) più il solo corsivo 400 (le
descrizioni del listino), Figtree variabile, Damion: circa 108 KB in tutto,
tutti in `src/fonts/` con le loro licenze OFL. L'alfabeto latino basta per
l'italiano (accenti, virgolette, €). Le scintille e i cuori sono SVG, non
caratteri.

## Senza SES la richiesta non si perde: testo pronto e Instagram

Se l'invio non parte (SES non configurato, caselle vuote, rete), il flusso non
butta via niente: mostra il testo della richiesta già scritto, con "Copia il
testo" e "Apri Instagram" (il messaggio diretto, `ig.me`, non accetta testo
precompilato: si copia e si incolla), e l'email precompilata solo quando Silvia
avrà un indirizzo pubblico. Le caselle `SES_TO_TRATTAMENTI` e `SES_TO_LETTURE`
non hanno un valore di base: il dominio e l'email di Silvia sono ancora domande
aperte, e un indirizzo inventato perderebbe le richieste in silenzio.

## Le richieste chiedono solo quello che serve

"Prenota un trattamento" offre tutti e sette i giorni (gli orari di Silvia non
si sanno) e chiede il telefono perché Silvia ricontatta da lì; l'email è
facoltativa, a meno che si scelga di essere ricontattati via email. La lettura
non chiede il codice fiscale; la domanda in due righe è facoltativa e il form
di oggi non la chiede (da confermare). Il formato della risposta (scritta o
video) compare solo se `LETTURA.formatoAScelta` in `src/lib/trattamenti.ts`
diventa `true`: oggi non si sa chi lo sceglie. "Avvisami quando riapro" ha un
consenso per un solo scopo, una casella da spuntare apposta: non è una
newsletter e non diventa una lista finché non c'è il gestionale con il doppio
opt-in.

## Il logo nelle email è un PNG

Molti programmi di posta non mostrano gli SVG: le email usano
`public/brand/logo-email.png`, ricavato dal logo provvisorio (al doppio della
misura, per gli schermi densi). Quando arriva il logo originale si rifà anche
questo file.


## Senza foto, il giglio

Le foto di Silvia e dello studio non ci sono ancora (domande aperte ★). Dove la
spec mette una foto (l'hero, Chi sono, la scheda Instagram) c'è un cerchio
cipria con il giglio del logo: niente foto stock, niente segnaposto grigi. Il
giglio dell'hero si disegna da solo, quello di Chi sono risponde al tocco con
un cuore. Quando arrivano le foto vere prendono il posto del giglio negli
stessi cerchi (`data-clip` le apre dal cerchio); gli effetti che hanno senso
solo con le foto (la lente sulla stesa, la foto che segue il puntatore
nell'indice dei trattamenti, l'hero che si allarga, la galleria dello studio)
sono nel motore ma restano spenti finché le foto mancano.

## Le immagini per i social si generano prima, non a ogni visita

Ogni pagina ha la sua immagine Open Graph 1200×630 in `public/og`, fatta con
gli stessi font e lo stesso logo del sito da `scripts/immagini.cjs`
(Playwright). Non si generano al volo con `next/og`: il generatore di Next non
legge i woff2 e disegna un sottoinsieme del CSS, mentre così l'immagine è
uguale al sito e non costa niente al server. Lo script si rilancia quando
cambia un titolo o arriva il logo originale; fa anche le icone (favicon, Apple,
manifest) dal giglio in piccolo.

## Le richieste in parallelo, con gli stessi contratti

I flussi di richiesta (passo 6) sono stati costruiti in un worktree separato
mentre nascevano motore e pagine, con contratti fissati prima: i link
`/prenota#richiesta` e `/letture#richiesta` aprono il foglio,
`/prenota?trattamento=<slug>#richiesta` arriva con il trattamento scelto,
`PrenotaInline` e `LetturaInline` portano con sé `id="richiesta"`. Le pagine
non conoscono i flussi: usano solo i link e i due componenti.
