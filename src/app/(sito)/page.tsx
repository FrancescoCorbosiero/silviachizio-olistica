import Domande from '@/components/home/Domande';
import Hero from '@/components/home/Hero';
import Invito from '@/components/home/Invito';
import Letture from '@/components/home/Letture';
import Listino from '@/components/home/Listino';
import Prenota from '@/components/home/Prenota';
import Recensioni from '@/components/home/Recensioni';
import Relax from '@/components/home/Relax';
import Silvia from '@/components/home/Silvia';
import JsonLd from '@/components/seo/JsonLd';
import { DOMANDE } from '@/lib/domande';
import { faqLd, pageMetadata } from '@/lib/seo';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site';

export const metadata = pageMetadata({
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  path: '/',
});

/**
 * La landing: tutto Lily in una pagina. La finestra che si apre (hero), il
 * listino che sale come un foglio, i quindici minuti di relax, Silvia, le
 * recensioni (solo vere), le letture a distanza, come prenotare e dove, le
 * domande, l'invito. Le richieste vanno al modulo Google di Silvia
 * (RICHIESTE_DAL in src/lib/site.ts).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Listino />
      <Relax />
      <Silvia />
      <Recensioni />
      <Letture />
      <Prenota />
      <Domande />
      <Invito />
      <JsonLd data={faqLd(DOMANDE)} />
    </>
  );
}
