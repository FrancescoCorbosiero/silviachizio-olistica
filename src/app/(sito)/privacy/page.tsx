import BottoniRichiesta from '@/components/ui/BottoniRichiesta';
import Scena from '@/components/ui/Scena';
import { pageMetadata } from '@/lib/seo';
import { EMAIL, HAS_EMAIL, IG_DM_URL, IG_HANDLE, LEGAL } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Privacy e cookie',
  description: 'Quali dati raccoglie il sito di Lily Trattamenti Benessere, perché, per quanto tempo e come chiederne la cancellazione. Niente cookie di profilazione.',
  path: '/privacy',
});

/* Informativa ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR)
   e delle linee guida del Garante sui cookie (2021), sul modello di
   andrea-bellettati. Scritta su come funziona davvero il sito: le richieste
   (src/lib/forms.ts), l'invio (api/richiesta, SES), la provenienza
   (src/lib/source.ts), la memoria del browser (bozze). Se cambia uno di
   questi, o se si aggiunge Cloudflare (passo 10 della roadmap), va
   aggiornata anche qui, con la data in LEGAL.aggiornata.
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
  return (
    <>
      <Scena immagine="seta" altezza="bassa" velo="vino" priorita aria-labelledby="privacy-titolo">
        <div className="flex max-w-[680px] flex-col items-start gap-5">
          <span className="eyebrow intro">Privacy e cookie</span>
          <h1 id="privacy-titolo" className="display-xl intro" style={{ '--d': '0.08s' } as React.CSSProperties}>
            I tuoi dati, detti <span className="script">semplici</span>
          </h1>
          <p className="lead intro" style={{ '--d': '0.2s' } as React.CSSProperties}>
            Raccolgo solo ciò che serve per risponderti. Non vendo i tuoi dati, non li uso per la pubblicità e il sito non usa
            cookie di profilazione.
          </p>
          {LEGAL.aggiornata && <p className="testo-mute intro text-[14px]">Ultimo aggiornamento: {LEGAL.aggiornata}</p>}
        </div>
      </Scena>
      <article className="section" aria-labelledby="privacy-titolo">
        <div className="wrap-narrow flex flex-col gap-8">
          <div className="prose-lily">
            <h2>Chi tratta i tuoi dati</h2>
            <p>
              Il titolare del trattamento sono io, <strong>{LEGAL.titolare}</strong>
              {LEGAL.indirizzo ? `, ${LEGAL.indirizzo}` : ''}
              {LEGAL.partitaIva ? `, P.IVA ${LEGAL.partitaIva}` : ''}. Per qualsiasi domanda sui tuoi dati scrivimi {HAS_EMAIL ? 'a ' : ''}
              {contatto}.
            </p>

            <h2>Quali dati, e perché</h2>
            <h3>Prenota un trattamento</h3>
            <p>
              Il trattamento che scegli (o &quot;consigliami tu&quot;), le fasce e i giorni che preferisci, se è la prima volta,
              le righe che scrivi tu, il tuo nome, il telefono, l&apos;email se la lasci e come preferisci essere ricontattato
              (messaggio WhatsApp, chiamata o email).
            </p>
            <p>
              Mi servono per risponderti, fissare insieme giorno e ora e, se hai lasciato l&apos;email, mandarti il riepilogo. La
              base giuridica è la tua richiesta: sono misure precontrattuali prese su tua iniziativa (art. 6, par. 1, lett. b del
              GDPR).
            </p>
            <p>
              <strong>Niente dati sulla salute</strong>: nelle righe libere non serve scriverli. Se c&apos;è qualcosa da sapere
              prima di un trattamento, ne parliamo di persona.
            </p>

            <h3>Richiedi una lettura</h3>
            <p>
              Il tema che scegli, la domanda se la scrivi, il tuo nome e l&apos;email. Mi servono per preparare la lettura e
              mandartela via email, come mi chiedi tu (art. 6, par. 1, lett. b del GDPR). Il sito non ti chiede il codice fiscale:
              se un giorno servisse per una ricevuta, te lo chiederei al momento del pagamento, spiegandoti perché.
            </p>

            <h3>Avvisami quando riapro</h3>
            <p>
              Quando le prenotazioni sono sospese puoi lasciarmi l&apos;email (e, se vuoi, il nome) per sapere quando riapro. La
              uso per quel solo messaggio, con il tuo consenso (art. 6, par. 1, lett. a del GDPR), che puoi ritirare in qualsiasi
              momento scrivendomi. Non è l&apos;iscrizione a una newsletter.
            </p>

            <h3>Da dove arriva la richiesta</h3>
            <p>
              Insieme alla richiesta mi arrivano la pagina da cui l&apos;hai inviata e, se la visita è partita da un link di una
              campagna (per esempio il link nella mia bio di Instagram), i suoi parametri, se hai cliccato un annuncio di Google o
              di Meta e il sito di provenienza. Non contiene il tuo indirizzo IP e non serve a profilarti: mi dice solo da dove mi
              trovano le persone. Si basa sul mio legittimo interesse (art. 6, par. 1, lett. f del GDPR).
            </p>

            <h3>Se mi scrivi direttamente</h3>
            <p>
              Se mi scrivi su Instagram o in un altro modo, uso i dati che mi dai solo per risponderti (art. 6, par. 1, lett. b
              del GDPR). I messaggi su Instagram passano da Meta Platforms Ireland Limited, che li tratta come titolare autonomo,
              secondo la propria informativa.
            </p>

            <h3>Dati tecnici</h3>
            <p>
              Come ogni sito, il server riceve l&apos;indirizzo IP e i dati tecnici della connessione. Li uso solo per far
              funzionare il sito e proteggerlo da abusi: per esempio si possono inviare al massimo 6 richieste in 10 minuti dallo
              stesso indirizzo, e questo conteggio resta nella memoria del server per circa 10 minuti, poi sparisce. Base
              giuridica: il mio legittimo interesse alla sicurezza del sito (art. 6, par. 1, lett. f del GDPR). I log del sito non
              contengono il tuo indirizzo IP né il contenuto delle richieste.
            </p>

            <h3>La mappa</h3>
            <p>
              Nella pagina Contatti la mappa non si carica da sola. Se premi «Mostra la mappa», il tuo browser scarica le immagini
              della mappa dai server di OpenStreetMap (OpenStreetMap Foundation, nel Regno Unito), che ricevono il tuo indirizzo IP
              e i dati tecnici della connessione, come per qualsiasi sito, e li trattano secondo la propria informativa. Io non
              ricevo nulla. Se non premi il bottone, nessun dato parte verso OpenStreetMap. I link «Indicazioni stradali» e «Apri su
              OpenStreetMap» portano fuori dal sito, su Google Maps e su OpenStreetMap.
            </p>

            <h2>Cosa è obbligatorio</h2>
            <p>
              Per un trattamento: il trattamento (o &quot;consigliami tu&quot;), almeno una fascia, il nome e il telefono. Per una
              lettura: il tema, il nome e l&apos;email. Per l&apos;avviso: l&apos;email e il consenso. Senza, non posso
              risponderti. Tutto il resto è facoltativo.
            </p>

            <h2>Chi altro vede i dati</h2>
            <p>
              Le richieste le leggo io. Per far funzionare il sito mi appoggio ad alcuni fornitori, che trattano i dati solo per
              mio conto e secondo le mie istruzioni (responsabili del trattamento):
            </p>
            <ul>
              <li>il fornitore del server che ospita il sito;</li>
              <li>Amazon Web Services EMEA SARL (Amazon SES), che invia le email delle richieste da un centro dati nell&apos;Unione europea;</li>
              <li>il fornitore della casella email in cui arrivano le richieste.</li>
            </ul>
            <p>
              I dati possono essere comunicati alle autorità solo se la legge lo impone. Non li vendo, non li cedo e non li uso per
              la pubblicità.
            </p>

            <h2>Fuori dall&apos;Unione europea</h2>
            <p>
              Amazon appartiene a un gruppo con sede negli Stati Uniti. Le email partono da un centro dati europeo; eventuali
              trasferimenti fuori dall&apos;Unione europea sono coperti dal Data Privacy Framework UE-USA e dalle clausole
              contrattuali standard approvate dalla Commissione europea. La mappa, solo se scegli di caricarla, arriva da
              OpenStreetMap, nel Regno Unito: per il Regno Unito la Commissione europea ha riconosciuto un livello di protezione
              adeguato.
            </p>

            <h2>Per quanto tempo</h2>
            <ul>
              <li>
                <strong>Richieste</strong> (trattamenti e letture): per il tempo che serve a risponderti e seguirti, e al massimo 24
                mesi dall&apos;ultimo contatto. Poi le cancello.
              </li>
              <li>
                <strong>Avviso di riapertura</strong>: finché non ti scrivo che ho riaperto, poi cancello l&apos;email; al massimo 12
                mesi.
              </li>
              <li>
                <strong>Documenti fiscali</strong>, se ce ne sono (per esempio le ricevute): per 10 anni, come chiede la legge (art.
                6, par. 1, lett. c del GDPR).
              </li>
              <li>
                <strong>Conteggio degli invii</strong>: circa 10 minuti, nella memoria del server.
              </li>
              <li>
                <strong>Bozze delle richieste</strong>: nel tuo browser, finché non chiudi la scheda (vedi sotto).
              </li>
            </ul>

            <h2>Niente decisioni automatiche</h2>
            <p>Nessuna decisione che ti riguarda viene presa da un algoritmo e nessuno ti profila: ogni richiesta la leggo io.</p>

            <h2>I tuoi diritti</h2>
            <p>
              Puoi chiedermi in qualsiasi momento di vedere i dati che ho su di te, di correggerli, di cancellarli, di limitarne
              l&apos;uso o di riceverli in un formato leggibile (artt. 15–20 del GDPR). Puoi anche opporti ai trattamenti basati sul
              legittimo interesse (art. 21) e ritirare il consenso all&apos;avviso di riapertura. Basta scrivermi {HAS_EMAIL ? 'a ' : ''}
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
              Il sito <strong>non usa cookie di profilazione, di pubblicità o di statistica</strong>, né miei né di altri. Per
              questo non ti chiede di accettare niente.
            </p>
            <p>
              Usa solo la memoria della scheda del browser (sessionStorage), che resta sul tuo dispositivo, non arriva a nessun
              altro e si svuota da sola quando chiudi la scheda:
            </p>
            <ul>
              <li>
                <strong>le bozze delle richieste</strong> (<code>lily:prenota</code>, <code>lily:lettura</code>,{' '}
                <code>lily:avvisami-…</code>): se chiudi la richiesta e la riapri, ritrovi quello che avevi scritto;
              </li>
              <li>
                <strong>la pagina da cui sei entrato e la campagna</strong> (<code>lily:arrivo</code>): mi arriva solo se invii
                una richiesta, come descritto sopra;
              </li>
              <li>
                <strong>la scelta di vedere la mappa</strong> (<code>lily:mappa</code>): se l&apos;hai già caricata, tornando
                su Contatti la ritrovi senza premere di nuovo il bottone.
              </li>
            </ul>
            <p>
              Puoi cancellare questa memoria dalle impostazioni del browser. Se un giorno userò strumenti per misurare gli annunci
              (come il pixel di Meta o i tag di Google), ti chiederò prima il consenso e aggiornerò questa pagina.
            </p>

            <h2>Modifiche</h2>
            <p>
              Se cambia qualcosa nel modo in cui tratto i dati, aggiorno questa pagina e la data in alto. Per dubbi o richieste:{' '}
              {contatto}.
            </p>
          </div>

          {/* Ogni pagina chiude con le due richieste. */}
          <aside className="mt-6 flex flex-col items-start gap-5 border-t border-lily/25 pt-10" aria-label="Le richieste">
            <p className="display-md">
              Torniamo al <span className="script">benessere</span>
            </p>
            <BottoniRichiesta size="md" />
          </aside>
        </div>
      </article>
    </>
  );
}
