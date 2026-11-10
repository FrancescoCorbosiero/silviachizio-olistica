import Link from 'next/link';
import { IconaGiglio } from '@/components/icons';
import { SITE_NAME } from '@/lib/site';

/**
 * Il marchio compatto (header): il giglio in piccolo e il wordmark «Lily».
 * Struttura da andrea-bellettati (src/components/layout/Logo.tsx). Con
 * `link={false}` non porta alla home (la pagina del link in bio).
 */
export default function Logo({ link = true, tone = 'chiaro' }: { link?: boolean; tone?: 'chiaro' | 'notte' }) {
  const inner = (
    <>
      <IconaGiglio
        size={28}
        className={`shrink-0 transition-transform duration-700 ease-[var(--ease-soft)] group-hover:rotate-[-8deg] ${
          tone === 'notte' ? 'text-petalo' : 'text-lily'
        }`}
      />
      <span
        aria-hidden
        className={`translate-y-[3px] font-script text-[34px] leading-none ${tone === 'notte' ? 'text-lily-bright' : 'text-lily'}`}
      >
        Lily
      </span>
    </>
  );
  if (!link) {
    return (
      <span className="group inline-flex min-w-0 items-center gap-1.5" role="img" aria-label={SITE_NAME}>
        {inner}
      </span>
    );
  }
  return (
    <Link href="/" className="group inline-flex min-h-[44px] min-w-0 items-center gap-1.5" aria-label={`${SITE_NAME}, torna alla home`}>
      {inner}
    </Link>
  );
}
