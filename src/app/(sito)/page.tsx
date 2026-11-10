import ChiSonoBreve from '@/components/home/ChiSonoBreve';
import ComeFunziona from '@/components/home/ComeFunziona';
import DuePorte from '@/components/home/DuePorte';
import HomeHero from '@/components/home/HomeHero';
import InstagramHome from '@/components/home/InstagramHome';
import LettureChat from '@/components/home/LettureChat';
import ListinoHome from '@/components/home/ListinoHome';
import MomentoRelax from '@/components/home/MomentoRelax';
import Nastro from '@/components/home/Nastro';
import Recensioni from '@/components/home/Recensioni';
import JsonLd from '@/components/seo/JsonLd';
import Chiusura from '@/components/ui/Chiusura';
import FaqList from '@/components/ui/FaqList';
import SectionHead from '@/components/ui/SectionHead';
import { faqLd, pageMetadata } from '@/lib/seo';
import { HAS_INDIRIZZO, INDIRIZZO_DISPLAY, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site';
import { RELAX_MINUTI } from '@/lib/trattamenti';

export const metadata = pageMetadata({
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  path: '/',
});

/** BOZZE nella forma, vere nella sostanza: solo risposte che si sanno già. */
const FAQ = [
  {
    q: 'Quanto dura un trattamento?',
    a: `Da 60 a 75 minuti, a seconda del trattamento. Dopo ognuno c'è un momento relax di circa ${RELAX_MINUTI} minuti, già compreso.`,
  },
  {
    q: 'Dove si trova lo studio?',
    a: HAS_INDIRIZZO ? `A Montebelluna: ${INDIRIZZO_DISPLAY}.` : 'A Montebelluna, in provincia di Treviso.',
  },
  {
    q: 'Come prenoto?',
    a: 'Dal sito, con «Prenota un trattamento»: scegli il trattamento e quando ti va, lasci nome e telefono e ti scrivo io per fissare giorno e ora. Se preferisci, scrivimi su Instagram.',
  },
  {
    q: 'Non so quale trattamento scegliere: come faccio?',
    a: 'Nella richiesta puoi scegliere «Non so ancora: consigliami tu». Ne parliamo insieme e troviamo quello giusto per te.',
  },
  {
    q: 'Le letture si fanno a distanza?',
    a: 'Sì. Ricevi via email la foto della stesa e la mia interpretazione personalizzata, scritta o video.',
  },
] as const;

/**
 * Home (docs/spec.md): chi è Lily, i quattro trattamenti, come funziona,
 * Silvia, le letture, Instagram, le domande, la chiusura.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Nastro />
      <DuePorte />
      <ListinoHome />
      <MomentoRelax />
      <ComeFunziona />
      <ChiSonoBreve />
      <Recensioni />
      <LettureChat />
      <InstagramHome />
      <section className="section" aria-labelledby="faq-titolo">
        <div className="wrap grid items-start gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            {/* BOZZA */}
            <SectionHead id="faq-titolo" eyebrow="Domande frequenti" title="Quello che mi chiedete" script="spesso" />
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>
      <Chiusura
        eyebrow="Ti aspetto"
        // BOZZA
        title={
          <>
            Il resto può <span className="script">aspettare</span>
          </>
        }
        lead="Scegli un trattamento in studio o una lettura a distanza: ti rispondo io, di persona."
      />
      <JsonLd data={faqLd(FAQ)} />
    </>
  );
}
