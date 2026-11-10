import Link from 'next/link';
import { ArrowIcon, IconaLoto, IconaScintilla } from '@/components/icons';
import { ZONA } from '@/lib/site';

const PORTE = [
  {
    href: '/trattamenti',
    titolo: `In studio, a ${ZONA.replace(' (TV)', '')}`,
    // BOZZA
    testo: 'Quattro trattamenti, da 60 a 75 minuti, e dopo ognuno un momento relax di circa quindici minuti.',
    vai: 'Il listino',
    Icona: IconaLoto,
  },
  {
    href: '/letture',
    titolo: 'A distanza, via email',
    // BOZZA (con le parole del form di Silvia)
    testo: 'Una lettura simbolica e intuitiva personalizzata: la foto della stesa e la mia interpretazione, scritta o video.',
    vai: 'Le letture',
    Icona: IconaScintilla,
  },
] as const;

/** Le due porte: lo studio a Montebelluna e le letture a distanza. */
export default function DuePorte() {
  return (
    <section className="section-tight" aria-label="In studio o a distanza">
      <div className="wrap grid gap-5 md:grid-cols-2" data-reveal="stagger">
        {PORTE.map(({ href, titolo, testo, vai, Icona }) => (
          <Link key={href} href={href} className="petalo petalo-lift group flex flex-col items-start gap-4 p-7 sm:p-9" data-tilt>
            <span className="cerchio" data-pop>
              <Icona />
            </span>
            <h2 className="display-sm">{titolo}</h2>
            <p className="testo-mute">{testo}</p>
            <span className="text-link mt-auto">
              {vai} <ArrowIcon size={15} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
