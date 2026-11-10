# Brief

Il contesto del progetto, ricavato da tre fonti: il listino dei trattamenti, il
profilo Instagram di Silvia e il Google Form con cui oggi raccoglie le richieste
(le immagini sono in `immagini/`). Dove una cosa non si sa, è scritto; le domande
da fare a Silvia sono in [`domande-aperte.md`](domande-aperte.md).

## In una frase

Silvia Chizio offre a Montebelluna (TV) quattro trattamenti benessere con il
marchio **Lily** e, a distanza, **letture intuitive personalizzate**. Lavora solo
da Instagram: il sito deve diventare il posto dove si scopre cosa fa e si chiede
un appuntamento, al posto del Google Form nel link in bio.

## Silvia

Dal profilo Instagram [@silvia_chizio](https://www.instagram.com/silvia_chizio/)
(dallo screenshot ricevuto a novembre 2026: 895 post, 55,2K follower, 782
seguiti):

- **Bio**: «Vivo e sorrido 😁», poi una riga di emoji che la raccontano: 🌿 natura,
  🧘 meditazione (probabile), 🌸 fiori, 🔮 sfera di cristallo (le letture), 🐈 gatti,
  🧗 arrampicata, 🏄 surf, 💃 ballo, ✈️ viaggi, 📷 fotografia, 🦄 magia e fantasia,
  ✍️ scrittura.
- **L'attività nella bio**: «Lily Trattamenti Benessere 🌸 · 📍 Montebelluna /
  Treviso · 👉🏻 Link per appuntamento (sospeso al momento)», con il link al
  Google Form. Ha anche Threads (@silvia_chizio).
- **Foto profilo**: Silvia che arrampica su una parete di roccia.
- **Storie in evidenza**: una con la fatina 🧚, «Creatività» (un albero disegnato o
  dipinto da lei), «Lily 🌸» (il logo), «Wonderful places», «Tenerife 🔐🦋»,
  «Me 💫», «Alicante».

Cosa se ne ricava: Silvia non è un centro estetico, è una persona solare,
sportiva, viaggiatrice e creativa, con un lato spirituale (meditazione,
cristalli, letture). Il profilo è personale e l'attività vive dentro di esso. Il
sito deve somigliare a lei, non a una spa qualunque: calore, energia, un tocco di
magia, mai la freddezza da catalogo.

## Cosa offre

### Trattamenti in studio

Dal listino («Listino trattamenti · Quattro esperienze di benessere»), testo
esatto:

| Trattamento | Descrizione | Durata |
|---|---|---|
| **Lily Holistic** | Massaggio olistico relax su lettino | 60 min |
| **Lily Holistic Ritual** | Rituale olistico su futon | 75 min |
| **Lily Sportive** | Massaggio decontratturante e muscolare | 60 min |
| **Lily Magic** | Rituale olistico con biotensor, pietre, candela e meditazione | 60 min |

In fondo al listino: «Momento relax post-trattamento incluso • circa 15 minuti».

Il listino **non riporta prezzi**. Non si sa ancora l'indirizzo dello studio né
se "Montebelluna / Treviso" indichi un posto solo o due.

### Letture intuitive (a distanza)

Dal Google Form «Richiesta Lettura Intuitiva Personalizzata», testo di Silvia:

> Compila questo breve modulo (tempo massimo: circa 2 minuti) per richiedere una
> lettura simbolica e intuitiva personalizzata.
>
> La lettura ha valore orientativo e riflessivo: non sostituisce pareri medici,
> legali o professionali e va interpretata come strumento di introspezione e
> consiglio.
>
> Riceverai: foto della stesa · interpretazione personalizzata scritta o video ·
> risposta via email entro 24–48 ore

Campi di oggi: **email** (obbligatoria), **dati anagrafici** (con il codice
fiscale) e **tema centrale della lettura**, a scelta tra Generale, Carriera /
Lavoro, Amore / Relazioni, Crescita personale, Altro (con testo libero).

Non si sa ancora: con cosa legge (tarocchi, oracoli…), il prezzo, come si paga,
chi sceglie tra risposta scritta e video, perché serve il codice fiscale.

## Come lavora oggi

- **Vetrina**: il profilo Instagram personale, con la storia in evidenza «Lily 🌸».
- **Richieste**: il Google Form nel link in bio
  (`https://docs.google.com/forms/d/e/1FAIpQLSfh0kLvsLHUO6UtfPCc1AvALu6X2UvHi7mZd06oeKhP_CMr6w/viewform`).
  La bio lo chiama «Link per appuntamento (sospeso al momento)» ma il form è
  quello delle letture: come si prenotano oggi i trattamenti (messaggi diretti,
  telefono, form) va chiesto a Silvia.
- **Listino**: un'immagine illustrata condivisa sui social, con una Silvia
  disegnata nella sua divisa (nera con il bordino rosa e il logo ricamato).
  L'immagine ha i segni tipici della generazione automatica (sottolineature del
  correttore sotto "olistico" e "meditazione", testo poco nitido): è un
  riferimento di atmosfera, non un materiale da pubblicare così.
- **Prenotazioni sospese**: oggi la bio dice che gli appuntamenti sono sospesi.
  Il sito deve saper mostrare questo stato senza perdere chi arriva (vedi
  `spec.md`, "Stato delle prenotazioni").

## A chi parla

1. **Chi abita in zona** (Montebelluna, Treviso e dintorni) → un trattamento in
   studio. Arriva da Instagram o dal passaparola, cerca un'ora per sé, guarda
   tutto dal telefono. Vuole capire in fretta cosa scegliere, quanto dura,
   dov'è e come chiedere.
2. **Chi segue Silvia da tutta Italia** → una lettura a distanza, via email.
   Conosce già lei e il suo modo di comunicare; vuole un modo semplice e
   affidabile per chiedere.

Entrambi arrivano soprattutto dal link in bio: il sito si progetta prima per il
telefono, e la prima pagina che vedono deve far fare la cosa giusta in pochi tocchi.

## Obiettivi del sito

1. Sostituire il Google Form con due richieste fatte bene: **Prenota un
   trattamento** e **Richiedi una lettura**, a un tocco da ogni pagina.
2. Presentare i quattro trattamenti e le letture con chiarezza: cosa sono, quanto
   durano, cosa aspettarsi.
3. Farsi trovare da chi cerca un massaggio in zona (SEO locale).
4. Non perdere nessuno quando le prenotazioni sono sospese: "Avvisami quando
   riapro".
5. Essere la base del gestionale e della newsletter, senza cambiare stack.

## Le due strade per le prenotazioni

Contesto di fondo: è una scelta da fare con Silvia, non blocca il sito.

- **Strada A — sito + richieste via email.** Il sito raccoglie la richiesta e la
  manda a Silvia; lei risponde e fissa l'appuntamento a mano. Poco diverso dal
  Google Form per lei, molto meglio per chi chiede.
- **Strada B — sito + gestionale.** Calendario e disponibilità, conferme e
  promemoria automatici, elenco clienti, newsletter. Con AWS SES già
  disponibile, l'invio delle email non è un limite.

La fase 1 (il sito) funziona subito con la strada A ed è costruita per diventare
la strada B senza riscrivere nulla: dettagli in [`web-app.md`](web-app.md) e
[`decisioni.md`](decisioni.md).
