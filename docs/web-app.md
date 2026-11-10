# Gestionale e newsletter (fasi 2 e 3)

Idee messe in forma, non ancora decise né costruite. Il sito della fase 1 è
pensato per arrivarci senza cambiare stack né repository (vedi
[`decisioni.md`](decisioni.md)).

## Perché

Per Silvia: un posto solo dove arrivano richieste, appuntamenti e iscritti,
invece di email e messaggi sparsi, e meno avanti e indietro per fissare un
orario. Per chi prenota: vedere subito quando c'è posto, ricevere conferma e
promemoria.

## Le due strade

| | Strada A — richieste via email | Strada B — gestionale |
|---|---|---|
| Chi prenota | chiede e aspetta che Silvia scriva | sceglie giorno e ora tra quelli liberi, riceve conferma e promemoria |
| Silvia | gestisce tutto dalla casella email, a mano | agenda, clienti, conferme e promemoria automatici |
| Cosa serve | il sito della fase 1 | database, accesso per Silvia, agenda, invii programmati |
| Conviene se | le richieste sono poche e l'agenda è flessibile | le richieste sono frequenti e gli orari regolari |

C'è una via di mezzo, il primo passo naturale dopo la fase 1: le richieste si
salvano in un pannello con il loro stato (nuova, confermata, svolta) e Silvia
risponde con modelli già scritti, senza ancora un'agenda pubblica.

## Strada B: cosa serve

### Agenda

- Disponibilità di Silvia: giorni, fasce, eccezioni, ferie. Le chiusure
  sospendono le prenotazioni da sole (oggi è l'interruttore `PRENOTAZIONI`).
- Lo spazio di un appuntamento è la durata del trattamento + i 15 minuti di
  relax + il tempo per riordinare (da chiedere a Silvia): per Lily Holistic
  Ritual, 75 + 15 + margine.
- Una sola operatrice: mai due appuntamenti sovrapposti.
- Conferma immediata o dopo l'ok di Silvia: da decidere con lei.
- Promemoria via email il giorno prima, con il file `.ics` per il calendario
  (come il `calendario.ics` degli eventi di andrea-bellettati).
- Disdetta con un link nella conferma, secondo le regole di Silvia.

### Letture

- Coda con lo stato: nuova → pagata (se si paga prima) → in lavorazione →
  consegnata, e il tempo che manca alle 48 ore.
- Consegna via email: foto della stesa e testo, oppure il link al video (file su
  S3 con link firmato e scadenza). Il disclaimer accompagna anche la consegna.
- Pagamento: da decidere (link di pagamento, bonifico, altro). I dati fiscali si
  chiedono solo qui, se servono.

### Lista d'attesa e newsletter

- Due consensi separati: "Avvisami quando riapro" (un solo scopo) e la
  newsletter (novità, date libere, eventuali eventi).
- Doppio opt-in: un'email con un link di conferma firmato; l'iscrizione vale solo
  dopo il clic.
- In ogni invio: disiscrizione in un clic (link e intestazioni
  `List-Unsubscribe` e `List-Unsubscribe-Post`) e preferenze per argomento.
- Rimbalzi e reclami di SES (eventi via SNS) sospendono il contatto.
- **Il limite di SES da sapere.** La gestione delle liste integrata in SES v2
  ammette **una sola contact list per account AWS**, con al massimo 20 argomenti
  (documentazione AWS, controllata a novembre 2026). Se l'account SES dello
  studio serve anche altri clienti, gli iscritti di Silvia non possono vivere lì
  accanto agli altri. Le strade: un account AWS dedicato a Lily, oppure gli
  iscritti in una tabella del gestionale e SES solo per spedire. La seconda è la
  più semplice e la più portabile.
- Invii a lotti, entro i limiti di invio dell'account, con modelli nella veste
  del sito.

### Il pannello di Silvia (`/gestione`)

- Richieste e appuntamenti, in lista e in agenda, con lo stato.
- Clienti: nome, contatti, storico, consensi. Nessun dato sulla salute.
- Letture in coda.
- Catalogo: trattamenti, durate, prezzi, visibilità, interruttore delle
  prenotazioni.
- Iscritti e invii della newsletter.
- Accesso con un link via email, senza password; fatto per il telefono (Konsta),
  perché Silvia lo userà da lì.

## Bozza dei dati

```
cliente      (id, nome, email, telefono, contatto_preferito, creato_il)
trattamento  (slug, nome, breve, durata_min, prezzo, attivo, ordine)          ← oggi src/lib/trattamenti.ts
disponibilita (giorno_settimana, dalle, alle) · chiusura (dal, al, nota)
appuntamento (id, cliente_id, trattamento_slug, inizio, fine, stato, note, provenienza, creato_il)
             stato: richiesto → confermato → svolto | disdetto | non presentato   ← oggi l'email "Prenota un trattamento"
lettura      (id, cliente_id, tema, tema_altro, domanda, formato, stato, pagata_il, consegnata_il, provenienza)
                                                                              ← oggi l'email "Richiedi una lettura"
iscrizione   (id, email, nome, scopo riapertura|newsletter, argomenti[], confermata_il, disiscritta_il)
invio        (id, oggetto, argomento, inviato_il, destinatari, rimbalzi, reclami)
```

## Stack in più (sopra quello della fase 1)

| Bisogno | Scelta proposta |
|---|---|
| Database | PostgreSQL + Drizzle, come proposto in `docs/web-app.md` di andrea-bellettati |
| Accesso | Better Auth con link via email; ruolo admin per Silvia |
| Email | AWS SES v2 per conferme, promemoria e newsletter; eventi via SNS |
| Invii programmati | promemoria e code della newsletter con un job sul server |
| File | S3 con URL firmati (stese, video) |
| Pagamenti | da decidere con Silvia |
| Test | Playwright sui flussi principali |

## Vincoli

- **Privacy**: ogni nuova finalità vuol dire informativa aggiornata, consensi
  separati, cancellazione su richiesta, tempi di conservazione.
- **Niente dati sulla salute**, neanche nel gestionale.
- **Fisco**: cosa serve per ricevute e fatture (e se serve il codice fiscale) lo
  dice il commercialista di Silvia, non il sito.

## Idee da proporre a Silvia (non decise)

- Buoni regalo: un trattamento da regalare, con un codice.
- Pacchetti di più trattamenti.
- Un promemoria gentile per chi torna volentieri, solo con il suo consenso.
