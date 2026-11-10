'use client';

// Da andrea-bellettati (src/components/flows/ConsultFlow.tsx): il modello di "Richiedi una lettura".
import type { ReactNode } from 'react';
import { List, ListInput, Preloader } from 'konsta/react';
import { RotateCcw } from 'lucide-react';
import { ArrowIcon, IconaScintilla, InstagramIcon } from '@/components/icons';
import {
  EMPTY_LETTURA,
  FORMATI,
  isEmail,
  letturaLines,
  letturaSubject,
  letturaText,
  temaSummary,
  type LetturaDraft,
} from '@/lib/forms';
import { IG_URL } from '@/lib/site';
import { LETTURA, TEMI_LETTURA, type TemaLettura } from '@/lib/trattamenti';
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
  inputClass,
  listClass,
  type FlowParts,
} from './fields';
import { useFlow, type Errors, type Variant } from './useFlow';

type Field = 'tema' | 'temaAltro' | 'name' | 'email';

/* I testi dei passi sono BOZZE (docs/testi-da-validare.md). */
const STEP_TITLES = ['Il tema', 'La tua domanda', 'I tuoi dati', 'Riepilogo'] as const;
const TEMI = TEMI_LETTURA.map((t) => ({ value: t, label: t }));

function validate(step: number, d: LetturaDraft): Errors<Field> {
  const e: Errors<Field> = {};
  if (step === 0) {
    if (!d.tema) e.tema = 'Scegli il tema della lettura.';
    else if (d.tema === 'Altro' && d.temaAltro.trim().length < 2) e.temaAltro = 'Scrivimi in poche parole su cosa vuoi la lettura.';
  }
  if (step === 2) {
    if (d.name.trim().length < 2) e.name = 'Scrivi il tuo nome.';
    if (!isEmail(d.email)) e.email = d.email.trim() ? 'Controlla l’indirizzo email.' : 'Mi serve la tua email: la lettura arriva lì.';
  }
  return e;
}

/**
 * "Richiedi una lettura": il tema → la tua domanda → i tuoi dati → il
 * riepilogo con il disclaimer integrale di Silvia, poi la richiesta parte
 * per email. Niente codice fiscale (docs/decisioni.md, "Dati minimi").
 * Come PrenotaFlow, l'ospite impagina testata, corpo e barra delle azioni.
 */
export default function LetturaFlow({
  variant,
  handoff,
  onClose,
  children,
}: {
  variant: Variant;
  handoff?: Partial<LetturaDraft>;
  onClose?: () => void;
  children: (parts: FlowParts) => ReactNode;
}) {
  const { flow: f, bodyRef, titleRef } = useFlow<LetturaDraft, Field>({
    storageKey: 'lily:lettura',
    empty: EMPTY_LETTURA,
    handoff,
    steps: 4,
    variant,
    validate,
    toPayload: (d) => ({
      kind: 'lettura',
      tema: (d.tema || 'Generale') as TemaLettura,
      temaAltro: d.tema === 'Altro' ? d.temaAltro.trim() : '',
      domanda: d.domanda.trim(),
      formato: LETTURA.formatoAScelta ? d.formato : '',
      name: d.name.trim(),
      email: d.email.trim(),
    }),
  });
  const { draft: d, step, sent } = f;

  const header = (
    <FlowHeader
      title="Richiedi una lettura"
      status={sent ? 'Richiesta inviata' : `Passo ${step + 1} di 4 · ${STEP_TITLES[step]}`}
      canBack={step > 0 && !sent}
      onBack={f.back}
      onClose={onClose}
      closeLabel="Chiudi la richiesta"
      bar={<StepBar count={STEP_TITLES.length} step={step} done={!!sent} />}
    />
  );

  const title = (text: ReactNode, sub?: ReactNode) => (
    <div className="mb-5 px-1">
      <h3 ref={titleRef} tabIndex={-1} className="font-serif text-[28px] font-[700] leading-[1.08] text-inchiostro outline-none">
        {text}
      </h3>
      {sub && <p className="mt-2 text-[15.5px] leading-snug text-ink-mute">{sub}</p>}
    </div>
  );

  const stepTema = (
    <div className="grid gap-6">
      {title('Su cosa vuoi la lettura?', 'Scegli il tema, io preparo la stesa.')}
      <div>
        <GroupTitle id={f.fid('tema-t')}>Il tema</GroupTitle>
        <ChipGroup
          labelledBy={f.fid('tema-t')}
          options={TEMI}
          values={d.tema ? [d.tema] : []}
          onToggle={(v) => f.set('tema', v as TemaLettura)}
          single
          field="tema"
        />
        <GroupError field="tema-error" message={f.errors.tema} />
      </div>
      {d.tema === 'Altro' && (
        <List strong inset className={listClass}>
          <ListInput
            label={<FieldLabel htmlFor={f.fid('temaAltro')}>Su cosa?</FieldLabel>}
            error={f.errors.temaAltro ? <FieldError id={`${f.fid('temaAltro')}-error`} message={f.errors.temaAltro} /> : undefined}
            input={
              <input
                id={f.fid('temaAltro')}
                data-field="temaAltro"
                value={d.temaAltro}
                onChange={(e) => f.set('temaAltro', e.target.value)}
                autoComplete="off"
                enterKeyHint="next"
                maxLength={120}
                placeholder="In poche parole"
                className={inputClass}
                onKeyDown={(e) => e.key === 'Enter' && f.next()}
                {...f.aria('temaAltro')}
              />
            }
          />
        </List>
      )}
    </div>
  );

  const stepDomanda = (
    <div className="grid gap-6">
      {title('La tua domanda', 'Se ti va, scrivimi in due righe cosa ti sta a cuore.')}
      {/* Il form di oggi non la chiede: da confermare con Silvia (docs/domande-aperte.md). */}
      <List strong inset className={listClass}>
        <ListInput
          label={
            <FieldLabel htmlFor={f.fid('domanda')} optional>
              In due righe
            </FieldLabel>
          }
          input={
            <textarea
              id={f.fid('domanda')}
              value={d.domanda}
              onChange={(e) => f.set('domanda', e.target.value)}
              rows={3}
              maxLength={600}
              placeholder="La domanda che ti porti dentro, o una situazione che vuoi guardare meglio…"
              className={`${inputClass} h-auto resize-none py-2`}
            />
          }
        />
      </List>
      {LETTURA.formatoAScelta && (
        <div>
          <GroupTitle id={f.fid('formato-t')} hint="facoltativo">
            Come preferisci la risposta?
          </GroupTitle>
          <SegmentedChoice labelledBy={f.fid('formato-t')} options={FORMATI} value={d.formato} onChange={(v) => f.set('formato', v)} />
        </div>
      )}
    </div>
  );

  const stepDati = (
    <div className="grid gap-6">
      {title('Dove ti mando la lettura?', 'La lettura arriva via email: lasciami il tuo nome e l’indirizzo.')}
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
          label={<FieldLabel htmlFor={f.fid('email')}>Email</FieldLabel>}
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
    </div>
  );

  const rows = letturaLines(d).filter(([k]) => k !== 'Tema');
  const stepRiepilogo = (
    <div className="grid gap-5">
      {title('Il riepilogo', 'Controlla che sia tutto giusto, poi mandamela.')}
      <div className="petalo overflow-hidden !rounded-[24px]">
        <div className="flex items-center gap-3 border-b border-petalo/50 bg-cipria/50 px-4 py-4">
          <span className="cerchio cerchio-sm !bg-carta">
            <IconaScintilla />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] text-ink-mute">{LETTURA.nome}</p>
            <p className="font-serif text-[19px] font-[700] leading-tight text-lily-deep">{d.tema ? temaSummary(d) : '—'}</p>
          </div>
          <button type="button" onClick={() => f.go(0)} className="ml-auto shrink-0 text-[14.5px] font-[700] text-lily-deep underline-offset-2 hover:underline">
            Modifica
          </button>
        </div>
        <dl className="divide-y divide-petalo/40 px-4">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[7em_1fr] gap-3 py-3 text-[15px]">
              <dt className="text-ink-mute">{k}</dt>
              <dd className="font-[600] text-inchiostro">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-petalo/40 px-4 py-3 text-[14.5px] font-[700] text-lily-deep">
          <button type="button" onClick={() => f.go(1)} className="underline-offset-2 hover:underline">
            Modifica la domanda
          </button>
          <button type="button" onClick={() => f.go(2)} className="underline-offset-2 hover:underline">
            Modifica i dati
          </button>
        </div>
      </div>
      {/* Il disclaimer di Silvia, integrale e ben visibile (docs/spec.md). */}
      <p className="rounded-[20px] border border-petalo/60 bg-blush px-4 py-3.5 text-[14.5px] leading-relaxed text-inchiostro">
        {LETTURA.disclaimer}
      </p>
      {f.failed && (
        <SendFallback reason={f.failed} text={letturaText(d)} subject={letturaSubject(d)} onInstagram={() => f.setSent('instagram')} />
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
          : `Preparo la stesa per te e ti rispondo via email, a ${d.email.trim() || 'l’indirizzo che mi hai lasciato'}. Ti ho già mandato il riepilogo.`}
      </p>
      <p className="font-script text-[30px] text-lily">Silvia</p>
    </div>
  );

  const body = (
    <div ref={bodyRef} className="px-4 pb-6 pt-2">
      <Honeypot value={f.company} onChange={f.setCompany} />
      {sent ? stepSent : [stepTema, stepDomanda, stepDati, stepRiepilogo][step]}
    </div>
  );

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
              <RotateCcw size={14} aria-hidden /> Un’altra lettura
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
