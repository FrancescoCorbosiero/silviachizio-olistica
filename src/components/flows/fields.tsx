'use client';

// Da andrea-bellettati (src/components/flows/fields.tsx), ritemato per Lily.
import { useState, type ReactNode } from 'react';
import { Chip, Segmented, SegmentedButton } from 'konsta/react';
import { Check, Copy, Mail } from 'lucide-react';
import { IconaGiglio, IconaOrologio, IconaScintilla, IconaTrattamentoSvg, InstagramIcon } from '@/components/icons';
import { CONSIGLIAMI } from '@/lib/forms';
import { HAS_EMAIL, IG_DM_URL, PRIVACY_HREF, mailtoLink } from '@/lib/site';
import { TRATTAMENTI } from '@/lib/trattamenti';

/* Pezzi condivisi dalle richieste: campi in stile Konsta (iOS), scelte a
   tocco, le card del listino, la barra dei passi col giglio. */

/** Un input normale con l'aspetto del campo di ListInput (passato come `input`). */
export const inputClass =
  'block h-11 w-full appearance-none bg-transparent text-[16.5px] text-inchiostro placeholder:text-ink-mute/60 focus:outline-none';

/** Le liste Konsta dentro i flussi: niente margini esterni, righe più compatte. */
export const listClass = '!my-0 !mx-0 [&_.k-list-input]:!py-0';

/** L'etichetta di un ListInput legata al suo campo (Konsta disegna un div, che non nomina niente). */
export function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="inline-flex items-center gap-1.5">
      {children}
      {optional && <span className="font-normal text-ink-mute">· facoltativo</span>}
    </label>
  );
}

/** Il messaggio d'errore sotto un campo, collegato all'input con aria-describedby. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span id={id} role="alert" className="text-lily-deep">
      {message}
    </span>
  ) : undefined;
}

/** L'errore di un gruppo di scelte (chip, card), raggiungibile con il focus. */
export function GroupError({ field, message }: { field: string; message?: string }) {
  return message ? (
    <p role="alert" className="mt-2 px-1 text-[14px] font-[600] text-lily-deep outline-none" data-field={field} tabIndex={-1}>
      {message}
    </p>
  ) : null;
}

/** Titolo di un gruppo di scelte, con la nota facoltativa. */
export function GroupTitle({ id, children, hint }: { id: string; children: ReactNode; hint?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
      <h4 id={id} className="text-[15.5px] font-[700] text-inchiostro">
        {children}
      </h4>
      {hint && <span className="text-[13px] text-ink-mute">{hint}</span>}
    </div>
  );
}

/**
 * Segmenti iOS per una scelta singola: un tocco sceglie, un secondo tocco
 * sulla stessa voce la toglie.
 */
export function SegmentedChoice<T extends string>({
  labelledBy,
  options,
  value,
  onChange,
  deselect = true,
}: {
  labelledBy: string;
  options: readonly { value: T; label: string; hint?: string }[];
  value: T | '';
  onChange: (v: T | '') => void;
  deselect?: boolean;
}) {
  const current = options.find((o) => o.value === value);
  return (
    <div>
      <Segmented strong rounded role="radiogroup" aria-labelledby={labelledBy}>
        {options.map((o) => (
          <SegmentedButton
            key={o.value}
            active={value === o.value}
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(value === o.value && deselect ? '' : o.value)}
          >
            {o.label}
          </SegmentedButton>
        ))}
      </Segmented>
      {options.some((o) => o.hint) && (
        <p className="mt-1.5 min-h-[1.2em] px-1 text-[13px] text-ink-mute" aria-live="polite">
          {current?.hint ?? ' '}
        </p>
      )}
    </div>
  );
}

/** Chip a scelta multipla (o singola con `single`): si accendono di rosa al tocco. */
export function ChipGroup({
  labelledBy,
  options,
  values,
  onToggle,
  single = false,
  field,
}: {
  labelledBy: string;
  options: readonly { value: string; label: string }[];
  values: readonly string[];
  onToggle: (v: string) => void;
  single?: boolean;
  /** Il primo chip riceve il focus quando il gruppo ha un errore. */
  field?: string;
}) {
  return (
    <div role={single ? 'radiogroup' : 'group'} aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {options.map((o, i) => {
        const on = values.includes(o.value);
        return (
          <Chip
            key={o.value}
            component="button"
            outline={!on}
            role={single ? 'radio' : undefined}
            aria-checked={single ? on : undefined}
            aria-pressed={single ? undefined : on}
            data-field={i === 0 ? field : undefined}
            onClick={() => onToggle(o.value)}
            media={on ? <Check size={15} strokeWidth={2.6} aria-hidden /> : undefined}
            className={`!m-0 !h-10 !px-4 !text-[15px] !font-[650] transition-[background-color,box-shadow,color] duration-300 ${
              on
                ? '!border-lily !bg-lily !text-white shadow-[0_8px_16px_-10px_rgb(224_11_87/0.75)]'
                : '!border-petalo !bg-white/85 !text-inchiostro'
            }`}
          >
            {o.label}
          </Chip>
        );
      })}
    </div>
  );
}

/**
 * La scelta del trattamento: le card del listino (cerchio con l'icona,
 * nome, descrizione, durata) più "Non so ancora: consigliami tu".
 */
export function TrattamentoChoice({
  labelledBy,
  value,
  onChange,
}: {
  labelledBy: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const card = (key: string, on: boolean, icon: ReactNode, nome: string, breve: string, durata?: number) => (
    <button
      key={key}
      type="button"
      role="radio"
      aria-checked={on}
      data-field={key === TRATTAMENTI[0]?.slug ? 'trattamento' : undefined}
      onClick={() => onChange(key)}
      className="scelta riga-listino"
    >
      <span className="cerchio">{icon}</span>
      <span className="min-w-0">
        <span className="riga-nome">{nome}</span>
        <span className="riga-breve">{breve}</span>
      </span>
      {durata ? (
        <span className="riga-durata">
          <IconaOrologio />
          <span>{durata} min</span>
        </span>
      ) : (
        <span />
      )}
      {on && (
        <span className="scelta-check" aria-hidden>
          <Check size={14} strokeWidth={3} />
        </span>
      )}
    </button>
  );
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="scelte">
      {TRATTAMENTI.map((t) => card(t.slug, value === t.slug, <IconaTrattamentoSvg icona={t.icona} />, t.nome, t.breve, t.durata))}
      {/* BOZZA */}
      {card(CONSIGLIAMI, value === CONSIGLIAMI, <IconaScintilla />, 'Non so ancora', 'Consigliami tu: ne parliamo insieme')}
    </div>
  );
}

/**
 * La barra dei passi: un segmento per passo e un piccolo giglio che salta
 * da un passo all'altro (al posto della zampina di andrea-bellettati).
 * Solo CSS: la posizione scorre con una transizione e il salto riparte a
 * ogni passo (la chiave cambia).
 */
export function StepBar({ count, step, done }: { count: number; step: number; done: boolean }) {
  const at = done ? count - 1 : step;
  return (
    <div className="relative mt-6" aria-hidden>
      <span
        className="pointer-events-none absolute -top-[23px] h-[18px] w-[18px] -translate-x-1/2 text-lily transition-[left] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"
        style={{ left: `${(((at + 0.5) / count) * 100).toFixed(2)}%` }}
      >
        <span key={at} className="giglio-hop block">
          <IconaGiglio size={18} />
        </span>
      </span>
      <ol className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
        {Array.from({ length: count }, (_, i) => (
          <li
            key={i}
            className={`h-1.5 rounded-full transition-colors duration-500 ${
              done || i <= step ? 'bg-lily shadow-[0_2px_6px_-2px_rgb(224_11_87/0.6)]' : 'bg-inchiostro/10'
            }`}
          />
        ))}
      </ol>
    </div>
  );
}

/** Accanto all'invio: a chi arrivano i dati e il link all'informativa (si apre a parte, la bozza resta). BOZZA */
export function PrivacyNote() {
  return (
    <p className="px-2 text-center text-[13px] leading-snug text-ink-mute">
      Inviando, i tuoi dati arrivano solo a me, per risponderti.{' '}
      <a href={PRIVACY_HREF} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-inchiostro">
        Informativa privacy
      </a>
    </p>
  );
}

/** Cosa dire quando l'invio non riesce, secondo il motivo. BOZZA */
function failedText(reason: string): { title: string; text: string } {
  if (reason === 'rate-limited')
    return { title: 'Troppe richieste di seguito.', text: 'Riprova tra qualche minuto, oppure mandamela in un altro modo: il testo è già pronto.' };
  if (reason === 'unconfigured')
    return { title: 'Da qui non riesco a mandarla.', text: 'Mandamela in un altro modo, il testo è già pronto:' };
  if (reason === 'invalid-payload')
    return { title: 'Qualcosa nei dati non torna.', text: 'Controlla il riepilogo, oppure mandamela in un altro modo:' };
  return { title: 'Non sono riuscita a mandarla da qui.', text: 'Succede se la rete fa i capricci. Mandamela in un altro modo, il testo è già pronto:' };
}

/**
 * Se l'invio non riesce (rete, SES non configurato): il testo già pronto
 * da copiare e il messaggio diretto su Instagram (ig.me non accetta testo
 * precompilato); l'email precompilata solo se Silvia ne ha una pubblica.
 */
export function SendFallback({ reason, text, subject, onInstagram }: { reason: string; text: string; subject: string; onInstagram: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  const { title, text: body } = failedText(reason);
  const mailto = HAS_EMAIL ? mailtoLink(subject, text) : '';
  return (
    <div role="alert" className="petalo petalo-blush !rounded-[22px] p-5">
      <p className="text-[16px] font-[700] text-inchiostro">{title}</p>
      <p className="mt-1 text-[15px] text-inchiostro/85">{body}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-sm" onClick={copy} aria-live="polite">
          {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />} {copied ? 'Testo copiato' : 'Copia il testo'}
        </button>
        <a
          className="btn btn-outline btn-sm"
          href={IG_DM_URL}
          target="_blank"
          rel="noopener"
          onClick={() => {
            void copy();
            onInstagram();
          }}
        >
          <InstagramIcon size={15} /> Apri Instagram
        </a>
        {mailto && (
          <a className="btn btn-outline btn-sm" href={mailto}>
            <Mail size={15} aria-hidden /> Email
          </a>
        )}
      </div>
      <p className="mt-3 text-[13px] text-ink-mute">Su Instagram incolla il testo nel messaggio e mandalo: ti rispondo io.</p>
    </div>
  );
}

/** La spunta che si disegna quando la richiesta è partita (successBurst). */
export function SuccessCheck() {
  return (
    <span data-success-check className="grid h-20 w-20 place-items-center rounded-full bg-lily text-white shadow-[0_18px_34px_-16px_rgb(224_11_87/0.8)]">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12.5 10 17 19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Il campo trappola per i bot: invisibile alle persone. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="absolute -left-[9999px] h-px w-px opacity-0"
    />
  );
}

export type FlowParts = { header: ReactNode; body: ReactNode; footer: ReactNode };

/** La testata comune: indietro, titolo, chiudi, avanzamento. */
export function FlowHeader({
  title,
  status,
  canBack,
  onBack,
  onClose,
  closeLabel,
  bar,
}: {
  title: string;
  status: string;
  canBack: boolean;
  onBack: () => void;
  onClose?: () => void;
  closeLabel: string;
  bar?: ReactNode;
}) {
  return (
    <div className="px-4 pb-3 pt-1">
      <div className="flex h-11 items-center justify-between gap-2">
        {canBack ? (
          <button type="button" onClick={onBack} className="icon-btn !h-10 !w-10" aria-label="Passo precedente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <span className="w-10" />
        )}
        <div className="min-w-0 text-center">
          <p className="text-[15.5px] font-[700] leading-tight text-inchiostro">{title}</p>
          <p className="text-[13px] text-ink-mute" aria-live="polite">
            {status}
          </p>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} className="icon-btn !h-10 !w-10" aria-label={closeLabel}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <span className="w-10" />
        )}
      </div>
      {bar}
    </div>
  );
}

/** La barra delle azioni in fondo al flusso. */
export function FlowFooter({ children }: { children: ReactNode }) {
  return (
    <div className="flow-footer border-t border-white/70 bg-latte/90 px-4 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-3 backdrop-blur-xl">
      {children}
    </div>
  );
}
