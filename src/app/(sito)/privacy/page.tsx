import { BottoneRichiesta } from '@/components/ui/Bottone';
import { DAL_MODULO } from '@/lib/richieste';
import { pageMetadata } from '@/lib/seo';
import { EMAIL, HAS_EMAIL, IG_DM_URL, IG_HANDLE, LEGAL } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Privacy e cookie',
  description: 'Quali dati tratta il sito di Lily Trattamenti Benessere, perché, per quanto tempo e come chiederne la cancellazione. Niente cookie.',
  path: '/privacy',
});

/* Informativa ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR)
   e delle linee guida del Garante sui cookie (2021), sul modello di
   andrea-bellettati. Scritta su come funziona davvero il sito, nei due modi
   delle richieste (RICHIESTE_DAL in src/lib/site.ts): con il modulo Google
   (oggi) il sito non raccoglie dati; con le richieste dal sito tornano le
   parti sui flussi (src/lib/forms.ts), l'invio (api/richiesta, SES), la
   provenienza (src/lib/source.ts) e le bozze. Se cambia uno di questi, o si
   aggiunge Cloudflare, va aggiornata qui, con la data in LEGAL.aggiornata.
   BOZZA: da rileggere con Silvia (e, per i tempi di conservazione e i dati
   fiscali, con il suo commercialista). */
export default function PrivacyPage() {
  const contatto = HAS_EMAIL ? (
    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
  ) : (
    <>
      con un messaggio su Instagram (
      <a href={IG_DM_URL} target="_blank" rel="noopener">
        {IG_HANDLE}
      </a>
      )
    </>
  );
  const sito = !DAL_MODULO;
  return (
    <>
      <header className="tono-sabbia pb-[clamp(56px,7vw,96px)] pt-[clamp(150px,20vw,220px)]">
        <div className="wrap grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <h1 className="display lg:col-span-7 entra">
            Privacy <em>e cookie</em>
          </h1>
          <div className="lg:col-span-4 lg:col-start-9 entra" style={{ '--d': '0.15s' } as React.CSSProperties}>
            <p className="lead">
              {sito
                ? 'Raccolgo solo ciò che serve per risponderti. Non vendo i tuoi dati, non li uso per la pubblicità e il sito non usa cookie.'
                : 'Questo sito non raccoglie i tuoi dati e non usa cookie. Le richieste passano dal mio modulo Google: qui ti spiego come.'}
            </p>
            {LEGAL.aggiornata && <p className="meta mt-5">Ultimo aggiornamento: {LEGAL.aggiornata}</p>}
          </div>
        </div>
      </header>

      <article className="tono-latte section">
        <div className="wrap">
          <div className="prosa mx-auto max-w-[68ch]">
            <h2 className="!mt-0 !border-t-0 !pt-0">Chi tratta i tuoi dati</h2>
            <p>
              Il titolare del trattamento sono io, <strong>{LEGAL.titolare}</strong>
              {LEGAL.indirizzo ? `, ${LEGAL.indirizzo}` : ''}
              {LEGAL.partitaIva ? `, P.IVA ${LEGAL.partitaIva}` : ''}. Per qualsiasi domanda sui tuoi dati scrivimi {HAS_EMAIL ? 'a ' : ''}
              {contatto}.
            </p>

            <h2>Le richieste</h2>
            {sito ? (
              <>
                <h3>Prenota un trattamento</h3>
                <p>
                  Il trattamento che scegli (o &quot;consigliami tu&quot;), le fasce e i giorni che preferisci, se è la prima volta,
                  le righe che scrivi tu, il tuo nome, il telefono, l&apos;email se la lasci e come preferisci essere ricontattato
                  (messaggio WhatsApp, chiamata o email). Mi servono per risponderti, fissare insieme giorno e ora e, se hai lasciato
                  l&apos;email, mandarti il riepilogo. La base giuridica è la tua richiesta: sono misure precontrattuali prese su tua
                  iniziativa (art. 6, par. 1, lett. b del GDPR). <strong>Niente dati sulla salute</strong>: nelle righe libere non
                  serve scriverli; se c&apos;è qualcosa da sapere prima di un trattamento, ne parliamo di persona.
                </p>
                <h3>Richiedi una lettura</h3>
                <p>
                  Il tema che scegli, la domanda se la scrivi, il tuo nome e l&apos;email. Mi servono per preparare la lettura e
                  mandartela via email, come mi chiedi tu (art. 6, par. 1, lett. b del GDPR). Il sito non ti chiede il codice
                  fiscale.
                </p>
                <h3>Avvisami quando riapro</h3>
                <p>
                  Quando le prenotazioni sono sospese puoi lasciarmi l&apos;email (e, se vuoi, il nome) per sapere quando riapro. La
                  uso per quel solo messaggio, con il tuo consenso (art. 6, par. 1, lett. a del GDPR), che puoi ritirare in
                  qualsiasi momento scrivendomi. Non è l&apos;iscrizione a una newsletter.
                </p>
                <h3>Da dove arriva la richiesta</h3>
                <p>
                  Insieme alla richiesta mi arrivano la pagina da cui l&apos;hai inviata e, se la visita è partita da un link di una
                  campagna (per esempio il link nella mia bio di Instagram), i suoi parametri e il sito di provenienza. Non contiene
                  il tuo indirizzo IP e non serve a profilarti: mi dice solo da dove mi trovano le persone (legittimo interesse, art.
                  6, par. 1, lett. f del GDPR).
                </p>
                <p>
                  Per una lettura sono obbligatori il tema, il nome e l&apos;email; per un trattamento il trattamento, almeno una
                  fascia, il nome e il telefono; per l&apos;avviso l&apos;email e il consenso. Senza, non posso risponderti.
                </p>
              </>
            ) : (
              <>
                <p>
                  Quando premi «Prenota un trattamento» o «Richiedi una lettura» si apre, in un&apos;altra scheda, il mio modulo su
                  Google Moduli. Il sito non vede e non conserva niente di quello che scrivi lì.
                </p>
                <p>
                  I dati che scrivi nel modulo (quelli che il modulo ti chiede, segnati come obbligatori o facoltativi) arrivano a
                  me: mi servono per risponderti, fissare insieme giorno e ora o preparare la lettura e mandartela. La base giuridica
                  è la tua richiesta: sono misure precontrattuali prese su tua iniziativa (art. 6, par. 1, lett. b del GDPR).{' '}
                  <strong>Niente dati sulla salute</strong>: se c&apos;è qualcosa da sapere prima di un trattamento, ne parliamo di
                  persona.
                </p>
                <p>
                  Il modulo è un servizio di Google (Google Ireland Limited): le risposte restano nel mio account, e Google tratta i
                  dati della connessione secondo la propria{' '}
                  <a href="https://policies.google.com/privacy?hl=it" target="_blank" rel="noopener">
                    informativa
                  </a>
                  .
                </p>
              </>
            )}

            <h3>Se mi scrivi direttamente</h3>
            <p>
              Se mi scrivi su Instagram o in un altro modo, uso i dati che mi dai solo per risponderti (art. 6, par. 1, lett. b del
              GDPR). I messaggi su Instagram passano da Meta Platforms Ireland Limited, che li tratta come titolare autonomo,
              secondo la propria informativa.
            </p>

            <h3>Dati tecnici</h3>
            <p>
              Come ogni sito, il server riceve l&apos;indirizzo IP e i dati tecnici della connessione. Li uso solo per far
              funzionare il sito e proteggerlo da abusi (legittimo interesse alla sicurezza del sito, art. 6, par. 1, lett. f del
              GDPR).
              {sito &&
                ' Per esempio si possono inviare al massimo 6 richieste in 10 minuti dallo stesso indirizzo: questo conteggio resta nella memoria del server per circa 10 minuti, poi sparisce. I log del sito non contengono il tuo indirizzo IP né il contenuto delle richieste.'}
            </p>

            <h2>Chi altro vede i dati</h2>
            <p>
              Le richieste le leggo io. Per far funzionare il sito mi appoggio ad alcuni fornitori, che trattano i dati solo per mio
              conto e secondo le mie istruzioni (responsabili del trattamento):
            </p>
            <ul>
              <li>il fornitore del server che ospita il sito;</li>
              {sito && (
                <>
                  <li>
                    Amazon Web Services EMEA SARL (Amazon SES), che invia le email delle richieste da un centro dati
                    nell&apos;Unione europea;
                  </li>
                  <li>il fornitore della casella email in cui arrivano le richieste.</li>
                </>
              )}
            </ul>
            {!sito && <p>Le richieste fatte con il modulo passano da Google, come descritto sopra.</p>}
            <p>
              I dati possono essere comunicati alle autorità solo se la legge lo impone. Non li vendo, non li cedo e non li uso per
              la pubblicità.
            </p>

            <h2>Fuori dall&apos;Unione europea</h2>
            <p>
              {sito ? 'Amazon' : 'Google'} e Meta appartengono a gruppi con sede negli Stati Uniti. Eventuali trasferimenti fuori
              dall&apos;Unione europea sono coperti dal Data Privacy Framework UE-USA e dalle clausole contrattuali standard
              approvate dalla Commissione europea.
            </p>

            <h2>Per quanto tempo</h2>
            <ul>
              <li>
                <strong>Richieste</strong> (trattamenti e letture): per il tempo che serve a risponderti e seguirti, e al massimo 24
                mesi dall&apos;ultimo contatto. Poi le cancello{sito ? '' : ', anche dal modulo'}.
              </li>
              {sito && (
                <li>
                  <strong>Avviso di riapertura</strong>: finché non ti scrivo che ho riaperto, poi cancello l&apos;email; al massimo
                  12 mesi.
                </li>
              )}
              <li>
                <strong>Documenti fiscali</strong>, se ce ne sono (per esempio le ricevute): per 10 anni, come chiede la legge (art.
                6, par. 1, lett. c del GDPR).
              </li>
            </ul>

            <h2>Niente decisioni automatiche</h2>
            <p>Nessuna decisione che ti riguarda viene presa da un algoritmo e nessuno ti profila: ogni richiesta la leggo io.</p>

            <h2>I tuoi diritti</h2>
            <p>
              Puoi chiedermi in qualsiasi momento di vedere i dati che ho su di te, di correggerli, di cancellarli, di limitarne
              l&apos;uso o di riceverli in un formato leggibile (artt. 15–20 del GDPR). Puoi anche opporti ai trattamenti basati sul
              legittimo interesse (art. 21){sito ? ' e ritirare il consenso all’avviso di riapertura' : ''}. Basta scrivermi{' '}
              {HAS_EMAIL ? 'a ' : ''}
              {contatto}: rispondo entro un mese, di solito molto prima.
            </p>
            <p>
              Se pensi che i tuoi dati siano trattati in modo scorretto, puoi presentare reclamo al Garante per la protezione dei
              dati personali (
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">
                garanteprivacy.it
              </a>
              ).
            </p>

            <h2 id="cookie">Cookie e memoria del browser</h2>
            <p>
              Il sito <strong>non usa cookie</strong>, né di profilazione né di statistica, né miei né di altri. Per questo non ti
              chiede di accettare niente. Font, immagini e video arrivano dal sito stesso, non da servizi esterni.
            </p>
            {sito ? (
              <>
                <p>
                  Usa solo la memoria della scheda del browser (sessionStorage), che resta sul tuo dispositivo e si svuota da sola
                  quando chiudi la scheda:
                </p>
                <ul>
                  <li>
                    <strong>le bozze delle richieste</strong> (<code>lily:prenota</code>, <code>lily:lettura</code>,{' '}
                    <code>lily:avvisami-…</code>): se chiudi la richiesta e la riapri, ritrovi quello che avevi scritto;
                  </li>
                  <li>
                    <strong>la pagina da cui sei entrato e la campagna</strong> (<code>lily:arrivo</code>): mi arriva solo se invii
                    una richiesta, come descritto sopra.
                  </li>
                </ul>
              </>
            ) : (
              <p>
                Non usa nemmeno la memoria del browser. Il modulo delle richieste si apre sul sito di Google, che ha i suoi cookie e
                la sua informativa.
              </p>
            )}
            <p>
              Se un giorno userò strumenti per misurare gli annunci (come il pixel di Meta o i tag di Google), ti chiederò prima il
              consenso e aggiornerò questa pagina.
            </p>

            <h2>Modifiche</h2>
            <p>
              Se cambia qualcosa nel modo in cui tratto i dati, aggiorno questa pagina e la data in alto. Per dubbi o richieste:{' '}
              {contatto}.
            </p>
          </div>

          <aside className="mx-auto mt-[clamp(64px,8vw,112px)] flex max-w-[68ch] flex-col items-start gap-6 border-t border-[var(--line-strong)] pt-10" aria-label="Le richieste">
            {/* BOZZA */}
            <p className="titoletto">
              Torniamo al <em>benessere</em>
            </p>
            <div className="flex flex-wrap gap-3">
              <BottoneRichiesta tipo="trattamenti" />
              <BottoneRichiesta tipo="letture" variante="linea" />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
