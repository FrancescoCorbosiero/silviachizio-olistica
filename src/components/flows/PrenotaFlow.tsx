'use client';

// Da andrea-bellettati (src/components/flows/ConsultFlow.tsx): il modello di "Prenota un trattamento".
import type { ReactNode } from 'react';
import { List, ListInput, Preloader } from 'konsta/react';
import { RotateCcw } from 'lucide-react';
import { ArrowIcon, IconaOrologio, IconaScintilla, IconaTrattamentoSvg, InstagramIcon } from '@/components/icons';
import {
  CONSIGLIAMI,
  CONTATTI,
  EMPTY_PRENOTA,
  FASCE,
  GIORNI,
  PRIMA_VOLTA,
  isEmail,
  isPhone,
  prenotaLines,
  prenotaSubject,
  prenotaText,
  type PrenotaDraft,
} from '@/lib/forms';
import { IG_URL } from '@/lib/site';
import { RELAX_MINUTI, RELAX_TESTO, trovaTrattamento } from '@/lib/trattamenti';
import {
  ChipGroup,
  FieldError,
  FieldLabel,
  FlowFooter,
  FlowHeader,
  GroupError,
  GroupTitle,
  Honeypot,
  PrivacyNote,
  SegmentedChoice,
  SendFallback,
  StepBar,
  SuccessCheck,
  TrattamentoChoice,
  inputClass,
  listClass,
  type FlowParts,
} from './fields';
import { useFlow, type Errors, type Variant } from './useFlow';

type Field = 'trattamento' | 'fasce' | 'name' | 'phone' | 'email';

/* I testi dei passi sono BOZZE (docs/testi-da-validare.md). */
const STEP_TITLES = ['Il trattamento', 'Quando ti va', 'I tuoi contatti', 'Riepilogo'] as const;

/** Dopo l'invio: come Silvia si farà sentire, secondo il canale scelto. BOZZA */
const DOPO: Record<string, string> = {
  whatsapp: 'Ti scrivo io su WhatsApp, al numero che mi hai lasciato,',
  chiamata: 'Ti chiamo io al numero che mi hai lasciato',
  email: 'Ti scrivo io via email',
  '': 'Ti ricontatto io',
};

function validate(step: number, d: PrenotaDraft): Errors<Field> {
  const e: Errors<Field> = {};
  if (step === 0 && !d.trattamento) e.trattamento = 'Scegli un trattamento, oppure “Non so ancora”.';
  if (step === 1 && d.fasce.length === 0) e.fasce = 'Scegli almeno una fascia: mattina, pomeriggio o sera.';
  if (step === 2) {
    if (d.name.trim().length < 2) e.name = 'Scrivi il tuo nome.';
    if (!isPhone(d.phone)) e.phone = 'Mi serve un numero valido per ricontattarti.';
    if (d.email.trim() && !isEmail(d.email)) e.email = 'Controlla l’indirizzo email.';
    else if (d.contatto === 'email' && !d.email.trim()) e.email = 'Per scriverti via email mi serve il tuo indirizzo.';
  }
  return e;
}

/**
 * "Prenota un trattamento": il trattamento → quando ti va → i contatti →
 * il riepilogo, poi la richiesta parte per email a Silvia. In fase 1 è una
 * richiesta, non un appuntamento fissato: "Ti scrivo io per fissare giorno
 * e ora". Non disegna niente da solo: l'ospite (foglio dal basso sul
 * telefono, pannello sul desktop, scheda nella pagina) riceve testata,
 * corpo e barra delle azioni e li impagina.
 */
export default function PrenotaFlow({
  variant,
  handoff,
  onClose,
  children,
}: {
  variant: Variant;
  handoff?: Partial<PrenotaDraft>;
  onClose?: () => void;
  children: (parts: FlowParts) => ReactNode;
}) {
  const { flow: f, bodyRef, titleRef } = useFlow<PrenotaDraft, Field>({
    storageKey: 'lily:prenota',
    empty: EMPTY_PRENOTA,
    handoff,
    steps: 4,
    variant,
    validate,
    toPayload: (d) => ({
      kind: 'trattamento',
      trattamento: d.trattamento || CONSIGLIAMI,
      fasce: d.fasce,
      giorni: d.giorni,
      primaVolta: d.primaVolta,
      note: d.note.trim(),
      name: d.name.trim(),
      phone: d.phone.trim(),
      email: d.email.trim(),
      contatto: d.contatto,
    }),
  });
  const { draft: d, step, sent } = f;
  const t = trovaTrattamento(d.trattamento);

  /* ── testata ────────────────────────────────────────────────────── */
  const header = (
    <FlowHeader
      title="Prenota un trattamento"
      status={sent ? 'Richiesta inviata' : `Passo ${step + 1} di 4 · ${STEP_TITLES[step]}`}
      canBack={step > 0 && !sent}
      onBack={f.back}
      onClose={onClose}
      closeLabel="Chiudi la richiesta"
      bar={<StepBar count={STEP_TITLES.length} step={step} done={!!sent} />}
    />
  );

  /* ── corpo: un passo alla volta ─────────────────────────────────── */
  const title = (text: ReactNode, sub?: ReactNode) => (
    <div className="mb-5 px-1">
      <h3 ref={titleRef} tabIndex={-1} className="font-serif text-[28px] font-[700] leading-[1.08] text-inchiostro outline-none">
        {text}
      </h3>
      {sub && <p className="mt-2 text-[15.5px] leading-snug text-ink-mute">{sub}</p>}
    </div>
  );

  const stepTrattamento = (
    <div className="grid gap-5">
      {title('Quale trattamento ti va?', 'Scegli dal listino. Se non sai quale, te lo consiglio io.')}
      <div>
        <h4 id={f.fid('trattamento-t')} className="sr-only">
          Il trattamento
        </h4>
        <TrattamentoChoice labelledBy={f.fid('trattamento-t')} value={d.trattamento} onChange={(v) => f.set('trattamento', v as PrenotaDraft['trattamento'])} />
        <GroupError field="trattamento-error" message={f.errors.trattamento} />
      </div>
      <p className="fascia-relax !text-[15px]">
        <span>{RELAX_TESTO}</span>
        <span className="punto" aria-hidden>
          •
        </span>
        <span>circa {RELAX_MINUTI} minuti</span>
      </p>
    </div>
  );

  const stepQuando = (
    <div className="grid gap-6">
      {title('Quando ti va?', 'Dimmi le tue preferenze: ti scrivo io per fissare giorno e ora.')}
      <div>
        <GroupTitle id={f.fid('fasce-t')} hint="anche più di una">
          Le fasce che preferisci
        </GroupTitle>
        <ChipGroup labelledBy={f.fid('fasce-t')} options={FASCE} values={d.fasce} onToggle={(v) => f.toggle('fasce', v)} field="fasce" />
        <GroupError field="fasce-error" message={f.errors.fasce} />
      </div>
      <div>
        <GroupTitle id={f.fid('giorni-t')} hint="facoltativo">
          I giorni che preferisci
        </GroupTitle>
        <ChipGroup labelledBy={f.fid('giorni-t')} options={GIORNI} values={d.giorni} onToggle={(v) => f.toggle('giorni', v)} />
      </div>
      <div>
        <GroupTitle id={f.fid('prima-t')} hint="facoltativo">
          È la prima volta da Lily?
        </GroupTitle>
        <SegmentedChoice labelledBy={f.fid('prima-t')} options={PRIMA_VOLTA} value={d.primaVolta} onChange={(v) => f.set('primaVolta', v)} />
      </div>
      <List strong inset className={listClass}>
        <ListInput
          label={
            <FieldLabel htmlFor={f.fid('note')} optional>
              Due righe per me
            </FieldLabel>
          }
          input={
            <textarea
              id={f.fid('note')}
              value={d.note}
              onChange={(e) => f.set('note', e.target.value)}
              rows={2}
              maxLength={400}
              placeholder="Es. un giorno che ti è comodo, una domanda per me…"
              className={`${inputClass} h-auto resize-none py-2`}
              aria-describedby={f.fid('note-hint')}
            />
          }
        />
      </List>
      <p id={f.fid('note-hint')} className="-mt-3 px-2 text-[14px] leading-snug text-ink-mute">
        Niente dati sulla salute qui: se c’è qualcosa da sapere, ne parliamo di persona.
      </p>
    </div>
  );

  const stepContatti = (
    <div className="grid gap-6">
      {title('Come ti ricontatto?', 'Ti scrivo io per fissare giorno e ora: lasciami il numero.')}
      <List strong inset className={listClass}>
        <ListInput
          label={<FieldLabel htmlFor={f.fid('name')}>Il tuo nome</FieldLabel>}
          error={f.errors.name ? <FieldError id={`${f.fid('name')}-error`} message={f.errors.name} /> : undefined}
          input={
            <input
              id={f.fid('name')}
              data-field="name"
              value={d.name}
              onChange={(e) => f.set('name', e.target.value)}
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
              maxLength={80}
              placeholder="Nome e cognome"
              className={inputClass}
              {...f.aria('name')}
            />
          }
        />
        <ListInput
          label={<FieldLabel htmlFor={f.fid('phone')}>Telefono</FieldLabel>}
          error={f.errors.phone ? <FieldError id={`${f.fid('phone')}-error`} message={f.errors.phone} /> : undefined}
          input={
            <input
              id={f.fid('phone')}
              data-field="phone"
              type="tel"
              inputMode="tel"
              value={d.phone}
              onChange={(e) => f.set('phone', e.target.value)}
              autoComplete="tel"
              enterKeyHint="next"
              maxLength={30}
              placeholder="+39 3xx xxx xxxx"
              className={inputClass}
              {...f.aria('phone')}
            />
          }
        />
        <ListInput
          label={
            <FieldLabel htmlFor={f.fid('email')} optional={d.contatto !== 'email'}>
              Email
            </FieldLabel>
          }
          error={f.errors.email ? <FieldError id={`${f.fid('email')}-error`} message={f.errors.email} /> : undefined}
          input={
            <input
              id={f.fid('email')}
              data-field="email"
              type="email"
              inputMode="email"
              value={d.email}
              onChange={(e) => f.set('email', e.target.value)}
              autoComplete="email"
              enterKeyHint="done"
              maxLength={120}
              placeholder="nome@esempio.it"
              className={inputClass}
              {...f.aria('email')}
            />
          }
        />
      </List>
      <p className="-mt-3 px-2 text-[14px] leading-snug text-ink-mute">Se lasci l’email, ti mando il riepilogo.</p>
      <div>
        <GroupTitle id={f.fid('contatto-t')} hint="facoltativo">
          Come preferisci che ti ricontatti?
        </GroupTitle>
        <SegmentedChoice labelledBy={f.fid('contatto-t')} options={CONTATTI} value={d.contatto} onChange={(v) => f.set('contatto', v)} />
      </div>
    </div>
  );

  const rows = prenotaLines(d).filter(([k]) => k !== 'Trattamento');
  const stepRiepilogo = (
    <div className="grid gap-5">
      {title('Il riepilogo', 'Controlla che sia tutto giusto, poi mandamela.')}
      <div className="petalo overflow-hidden !rounded-[24px]">
        <div className="flex items-center gap-3 border-b border-petalo/50 bg-cipria/50 px-4 py-4">
          <span className="cerchio cerchio-sm !bg-carta">
            {t ? <IconaTrattamentoSvg icona={t.icona} /> : <IconaScintilla />}
          </span>
          <div className="min-w-0">
            <p className="font-serif text-[19px] font-[700] leading-tight text-lily-deep">{t?.nome ?? 'Non so ancora'}</p>
            <p className="flex items-center gap-1.5 text-[14px] text-inchiostro/80">
              {t ? (
                <>
                  <IconaOrologio size={15} className="text-lily" /> {t.durata} min + circa {RELAX_MINUTI} di relax
                </>
              ) : (
                'Consigliami tu'
              )}
            </p>
          </div>
          <button type="button" onClick={() => f.go(0)} className="ml-auto shrink-0 text-[14.5px] font-[700] text-lily-deep underline-offset-2 hover:underline">
            Modifica
          </button>
        </div>
        <dl className="divide-y divide-petalo/40 px-4">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[8em_1fr] gap-3 py-3 text-[15px]">
              <dt className="text-ink-mute">{k}</dt>
              <dd className="font-[600] text-inchiostro">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-petalo/40 px-4 py-3 text-[14.5px] font-[700] text-lily-deep">
          <button type="button" onClick={() => f.go(1)} className="underline-offset-2 hover:underline">
            Modifica quando
          </button>
          <button type="button" onClick={() => f.go(2)} className="underline-offset-2 hover:underline">
            Modifica i contatti
          </button>
        </div>
      </div>
      {f.failed && (
        <SendFallback reason={f.failed} text={prenotaText(d)} subject={prenotaSubject(d)} onInstagram={() => f.setSent('instagram')} />
      )}
    </div>
  );

  const stepSent = (
    <div className="grid justify-items-center gap-4 py-4 text-center">
      <SuccessCheck />
      <h3 ref={titleRef} tabIndex={-1} className="font-serif text-[30px] font-[700] leading-[1.05] text-inchiostro outline-none">
        {sent === 'instagram' ? 'Ci sentiamo su Instagram.' : `Ricevuto, ${d.name.trim().split(' ')[0] || 'grazie'}!`}
      </h3>
      <p className="max-w-[24em] text-[16px] leading-relaxed text-inchiostro/85">
        {sent === 'instagram'
          ? 'Incolla il testo nel messaggio e mandalo: ti rispondo io.'
          : `${DOPO[d.contatto] ?? DOPO['']} per fissare insieme giorno e ora.${d.email.trim() ? ' Intanto ti ho mandato il riepilogo via email.' : ''}`}
      </p>
      <p className="font-script text-[30px] text-lily">Silvia</p>
    </div>
  );

  const body = (
    <div ref={bodyRef} className="px-4 pb-6 pt-2">
      <Honeypot value={f.company} onChange={f.setCompany} />
      {sent ? stepSent : [stepTrattamento, stepQuando, stepContatti, stepRiepilogo][step]}
    </div>
  );

  /* ── barra delle azioni ─────────────────────────────────────────── */
  const footer = (
    <FlowFooter>
      {sent ? (
        <div className="grid gap-2">
          <a className="btn btn-lg btn-block" href={IG_URL} target="_blank" rel="noopener">
            <InstagramIcon size={17} /> Seguimi su Instagram
          </a>
          <div className="flex justify-center gap-5 pt-1 text-[14.5px] font-[700] text-lily-deep">
            {onClose && (
              <button type="button" onClick={onClose}>
                Torna al sito
              </button>
            )}
            <button type="button" onClick={f.restart} className="inline-flex items-center gap-1.5">
              <RotateCcw size={14} aria-hidden /> Un’altra richiesta
            </button>
          </div>
        </div>
      ) : step < 3 ? (
        <button type="button" className="btn btn-lg btn-block" onClick={f.next}>
          Continua <ArrowIcon size={16} />
        </button>
      ) : (
        <div className="grid gap-2">
          <button type="button" className="btn btn-lg btn-block" onClick={f.submit} disabled={f.sending} aria-busy={f.sending}>
            {f.sending ? (
              <>
                <Preloader className="!h-5 !w-5 !text-white" /> Invio in corso…
              </>
            ) : (
              <>
                Invia a Silvia <ArrowIcon size={16} />
              </>
            )}
          </button>
          <PrivacyNote />
        </div>
      )}
    </FlowFooter>
  );

  return <>{children({ header, body, footer })}</>;
}
