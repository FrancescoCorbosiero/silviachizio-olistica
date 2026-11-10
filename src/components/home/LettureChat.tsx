import Link from 'next/link';
import { ArrowIcon, IconaGiglio } from '@/components/icons';
import SectionHead from '@/components/ui/SectionHead';
import { etichetta, RICHIESTE } from '@/lib/richieste';
import { IG_HANDLE } from '@/lib/site';
import { LETTURA } from '@/lib/trattamenti';

/* BOZZE (docs/testi-da-validare.md): la chat racconta la richiesta di una
   lettura con le parole del form di Silvia. */
export type Messaggio = { da: 'te' | 'silvia'; testo: string };

const CHAT: Messaggio[] = [
  { da: 'te', testo: 'Ciao Silvia, vorrei una lettura.' },
  { da: 'silvia', testo: 'Ciao! Scegli il tema, io preparo la stesa.' },
  { da: 'te', testo: 'Amore / Relazioni' },
  { da: 'silvia', testo: 'Ti mando la foto della stesa e la mia interpretazione, scritta o in video, via email.' },
];

/**
 * Le letture in anteprima: la chat che si scrive da sola (data-chat, da
 * ireandlunaslife) e il link a /letture, con il disclaimer di Silvia.
 * `conLink={false}` sulla pagina /letture stessa.
 */
export function Chat({ className = '', messaggi = CHAT }: { className?: string; messaggi?: Messaggio[] }) {
  return (
    <div className={`petalo petalo-blush overflow-hidden p-0 ${className}`} data-chat>
      <div className="flex items-center gap-3 border-b border-petalo/60 bg-carta/70 px-5 py-3.5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-cipria text-lily">
          <IconaGiglio size={19} />
        </span>
        <span className="text-[15px] font-bold">{IG_HANDLE.slice(1)}</span>
        <span className="testo-mute ml-auto text-[13px]">Messaggi</span>
      </div>
      <div className="flex flex-col gap-2.5 px-4 py-5 sm:px-5">
        {messaggi.map((m, i) => (
          <p
            key={i}
            className={`chat-bub max-w-[85%] px-4 py-2.5 text-[16px] leading-snug shadow-[var(--shadow-petalo-s)] ${
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

export default function LettureChat() {
  return (
    <section className="section" aria-labelledby="letture-titolo">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <SectionHead
            id="letture-titolo"
            eyebrow="Letture intuitive, a distanza"
            title="Scegli il tema, io preparo la"
            script="stesa"
            lead={`Per chi mi segue da lontano: ${LETTURA.frase}, che ti arriva via email.`}
          />
          <ul className="elenco">
            {LETTURA.riceverai.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link className="btn" href={RICHIESTE.letture.href}>
              {etichetta('letture', { contesto: true })}
            </Link>
            <Link className="btn btn-outline" href="/letture">
              Scopri le letture <ArrowIcon size={15} />
            </Link>
          </div>
          <p className="testo-mute max-w-[34em] text-[14.5px] leading-relaxed">{LETTURA.disclaimer}</p>
        </div>
        <Chat />
      </div>
    </section>
  );
}
