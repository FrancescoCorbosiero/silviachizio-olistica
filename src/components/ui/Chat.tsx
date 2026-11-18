import { IconaGiglio } from '@/components/icons';
import { IG_HANDLE } from '@/lib/site';

/* La chat delle letture (dalla versione precedente): i messaggi diretti di
   Instagram raccontano come funziona una lettura. BOZZE
   (docs/testi-da-validare.md), con le parole del modulo di Silvia. */
export type Messaggio = { da: 'te' | 'silvia'; testo: string };

export const CHAT_LETTURA: Messaggio[] = [
  { da: 'te', testo: 'Ciao Silvia, vorrei una lettura.' },
  { da: 'silvia', testo: 'Ciao! Scegli il tema, io preparo la stesa.' },
  { da: 'te', testo: 'Amore / Relazioni' },
  { da: 'silvia', testo: 'Ti mando la foto della stesa e la mia interpretazione, scritta o in video, via email.' },
];

/**
 * La chat che si scrive da sola quando arriva a schermo (data-chat): i
 * fumetti entrano uno alla volta. Senza script, tutti fermi e leggibili.
 */
export default function Chat({ messaggi = CHAT_LETTURA, className = '' }: { messaggi?: Messaggio[]; className?: string }) {
  return (
    <div className={`chat ${className}`} data-chat>
      <div className="flex items-center gap-3 border-b border-petalo/60 bg-carta/70 px-5 py-3.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-cipria text-lily">
          <IconaGiglio size={19} />
        </span>
        <span className="text-[15px] font-bold">{IG_HANDLE.slice(1)}</span>
        <span className="ml-auto text-[13px] text-ink-mute">Messaggi</span>
      </div>
      <div className="flex flex-col gap-2.5 px-4 py-5 sm:px-5">
        {messaggi.map((m, i) => (
          <p
            key={i}
            className={`chat-bub max-w-[85%] px-4 py-2.5 text-[16px] leading-snug ${
              m.da === 'te' ? 'self-end rounded-[20px_6px_20px_20px] bg-lily text-white' : 'self-start rounded-[6px_20px_20px_20px] bg-carta'
            }`}
            style={{ '--i': i } as React.CSSProperties}
          >
            {m.testo}
          </p>
        ))}
      </div>
    </div>
  );
}
