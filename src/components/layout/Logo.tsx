import Link from 'next/link';
import { IconaGiglio } from '@/components/icons';
import { SITE_NAME } from '@/lib/site';

/**
 * Il marchio compatto: il giglio in piccolo e «Lily» nel pennello del logo
 * (Damion). Il logo completo, ricostruito in SVG, sta in public/brand/ e va
 * sostituito dall'originale di Silvia (docs/domande-aperte.md).
 */
export default function Logo({ link = true, tono = 'chiaro' }: { link?: boolean; tono?: 'chiaro' | 'notte' }) {
  const dentro = (
    <>
      <IconaGiglio
        size={26}
        className={`shrink-0 transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-[-10deg] ${
          tono === 'notte' ? 'text-petalo' : 'text-lily'
        }`}
      />
      <span aria-hidden className={`translate-y-[3px] font-script text-[31px] leading-none ${tono === 'notte' ? 'text-lily-bright' : 'text-lily'}`}>
        Lily
      </span>
    </>
  );
  if (!link) {
    return (
      <span className="group inline-flex min-w-0 items-center gap-1.5" role="img" aria-label={SITE_NAME}>
        {dentro}
      </span>
    );
  }
  return (
    <Link href="/" className="group inline-flex min-h-[44px] min-w-0 items-center gap-1.5" aria-label={`${SITE_NAME}, torna all'inizio`}>
      {dentro}
    </Link>
  );
}
