'use client';

/* "Avvisami quando riapro" (docs/spec.md): al posto di una richiesta
   sospesa. Un consenso per un solo scopo, non una newsletter. Stesso motore
   e stessa impaginazione delle altre richieste (sul modello di ConsultFlow
   di andrea-bellettati), in un passo solo. */
import { useMemo, type ReactNode } from 'react';
import { List, ListInput, Preloader } from 'konsta/react';
import { ArrowIcon, InstagramIcon } from '@/components/icons';
import { EMPTY_AVVISAMI, INTERESSI, avvisamiSubject, avvisamiText, isEmail, type AvvisamiDraft, type Interesse } from '@/lib/forms';
import { rigaSospensione, type TipoRichiesta } from '@/lib/richieste';
import { IG_URL } from '@/lib/site';
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
  SendFallback,
  SuccessCheck,
  inputClass,
  listClass,
  type FlowParts,
} from './fields';
import { useFlow, type Errors, type Variant } from './useFlow';

type Field = 'email' | 'interessi' | 'consenso';

function validate(_step: number, d: AvvisamiDraft): Errors<Field> {
  const e: Errors<Field> = {};
  if (!isEmail(d.email)) e.email = d.email.trim() ? 'Controlla l’indirizzo email.' : 'Mi serve la tua email per avvisarti.';
  if (d.interessi.length === 0) e.interessi = 'Scegli cosa ti interessa.';
  if (!d.consenso) e.consenso = 'Spunta la casella: mi serve il tuo sì per scriverti.';
  return e;
}

export default function AvvisamiFlow({
  variant,
  tipo,
  onClose,
  children,
}: {
  variant: Variant;
  /** Quale richiesta è sospesa: preseleziona cosa interessa. */
  tipo: TipoRichiesta;
  onClose?: () => void;
  children: (parts: FlowParts) => ReactNode;
}) {
  const handoff = useMemo(() => ({ interessi: [tipo] as Interesse[] }), [tipo]);
  const { flow: f, bodyRef, titleRef } = useFlow<AvvisamiDraft, Field>({
    storageKey: `lily:avvisami-${tipo}`,
    empty: EMPTY_AVVISAMI,
    handoff,
    steps: 1,
    variant,
    validate,
    toPayload: (d) => ({
      kind: 'avvisami',
      email: d.email.trim(),
      name: d.name.trim(),
      interessi: d.interessi,
      consenso: true,
    }),
  });
  const { draft: d, sent } = f;

  const header = (
    <FlowHeader
      title="Avvisami quando riapro"
      status={sent ? 'Fatto' : tipo === 'trattamenti' ? 'Prenotazioni sospese' : 'Letture sospese'}
      canBack={false}
      onBack={f.back}
      onClose={onClose}
      closeLabel="Chiudi"
    />
  );

  const form = (
    <div className="grid gap-6">
      <div className="mb-1 px-1">
        {/* BOZZA */}
        <h3 ref={titleRef} tabIndex={-1} className="font-serif text-[28px] font-[700] leading-[1.08] text-inchiostro outline-none">
          Ti scrivo io quando riapro
        </h3>
        <p className="mt-2 text-[15.5px] leading-snug text-ink-mute">{rigaSospensione(tipo)}</p>
      </div>
      <List strong inset className={listClass}>
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
              enterKeyHint="next"
              maxLength={120}
              placeholder="nome@esempio.it"
              className={inputClass}
              {...f.aria('email')}
            />
          }
        />
        <ListInput
          label={
            <FieldLabel htmlFor={f.fid('name')} optional>
              Il tuo nome
            </FieldLabel>
          }
          input={
            <input
              id={f.fid('name')}
              value={d.name}
              onChange={(e) => f.set('name', e.target.value)}
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="done"
              maxLength={80}
              placeholder="Come ti chiami"
              className={inputClass}
            />
          }
        />
      </List>
      <div>
        <GroupTitle id={f.fid('interessi-t')} hint="anche entrambi">
          Cosa ti interessa
        </GroupTitle>
        <ChipGroup
          labelledBy={f.fid('interessi-t')}
          options={INTERESSI}
          values={d.interessi}
          onToggle={(v) => f.toggle('interessi', v)}
          field="interessi"
        />
        <GroupError field="interessi-error" message={f.errors.interessi} />
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-[20px] border border-petalo/70 bg-white/90 p-4">
          <input
            type="checkbox"
            data-field="consenso"
            checked={d.consenso}
            onChange={() => f.set('consenso', !d.consenso)}
            className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-[var(--color-lily)]"
            {...f.aria('consenso')}
          />
          <span>
            <span className="block text-[16px] font-[700] text-inchiostro">Scrivimi quando riapri</span>
            {/* BOZZA */}
            <span className="block text-[14px] leading-snug text-ink-mute">
              Uso la tua email solo per questo avviso, una volta. Non è una newsletter.
            </span>
          </span>
        </label>
        {f.errors.consenso && (
          <p id={`${f.fid('consenso')}-error`} role="alert" className="mt-2 px-1 text-[14px] font-[600] text-lily-deep">
            {f.errors.consenso}
          </p>
        )}
      </div>
      {f.failed && (
        <SendFallback reason={f.failed} text={avvisamiText(d)} subject={avvisamiSubject(d)} onInstagram={() => f.setSent('instagram')} />
      )}
    </div>
  );

  const done = (
    <div className="grid justify-items-center gap-4 py-4 text-center">
      <SuccessCheck />
      <h3 ref={titleRef} tabIndex={-1} className="font-serif text-[30px] font-[700] leading-[1.05] text-inchiostro outline-none">
        {sent === 'instagram' ? 'Ci sentiamo su Instagram.' : 'Fatto, ti avviso io!'}
      </h3>
      <p className="max-w-[24em] text-[16px] leading-relaxed text-inchiostro/85">
        {sent === 'instagram'
          ? 'Incolla il testo nel messaggio e mandalo: ti rispondo io.'
          : `Quando riapro ti scrivo a ${d.email.trim()}, una volta sola.`}
      </p>
      <p className="font-script text-[30px] text-lily">Silvia</p>
    </div>
  );

  const body = (
    <div ref={bodyRef} className="px-4 pb-6 pt-2">
      <Honeypot value={f.company} onChange={f.setCompany} />
      {sent ? done : form}
    </div>
  );

  const footer = (
    <FlowFooter>
      {sent ? (
        <div className="grid gap-2">
          <a className="btn btn-lg btn-block" href={IG_URL} target="_blank" rel="noopener">
            <InstagramIcon size={17} /> Seguimi su Instagram
          </a>
          {onClose && (
            <button type="button" onClick={onClose} className="pt-1 text-[14.5px] font-[700] text-lily-deep">
              Torna al sito
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-2">
          <button type="button" className="btn btn-lg btn-block" onClick={f.submit} disabled={f.sending} aria-busy={f.sending}>
            {f.sending ? (
              <>
                <Preloader className="!h-5 !w-5 !text-white" /> Invio in corso…
              </>
            ) : (
              <>
                Avvisami <ArrowIcon size={16} />
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
