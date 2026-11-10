import Link from 'next/link';
import CardArticolo from '@/components/blog/CardArticolo';
import { ArrowIcon } from '@/components/icons';
import Esempio from '@/components/ui/Esempio';
import SectionHead from '@/components/ui/SectionHead';
import { getArticoli, scheda } from '@/lib/blog';

/** Dal blog: gli ultimi tre articoli. Senza articoli (o con il blog spento) non compare. */
export default function DalBlog() {
  const ultimi = getArticoli().slice(0, 3);
  if (!ultimi.length) return null;
  return (
    <section className="section fondo-vino on-notte" aria-labelledby="dalblog-titolo">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-4">
            {/* BOZZA */}
            <SectionHead id="dalblog-titolo" eyebrow="Dal blog" title="Poesia, roccia e" script="luce" />
            {ultimi.some((a) => a.esempio) && <Esempio cosa="articoli di prova" />}
          </div>
          <Link className="btn btn-outline-latte" href="/blog">
            Tutti gli articoli <ArrowIcon size={15} />
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
          {ultimi.map((a) => (
            <li key={a.slug}>
              <CardArticolo articolo={scheda(a)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
