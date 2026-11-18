import ComeFunziona from '@/components/home/ComeFunziona';
import Hero from '@/components/home/Hero';
import Letture from '@/components/home/Letture';
import Listino from '@/components/home/Listino';
import Nastro from '@/components/home/Nastro';
import Prenota from '@/components/home/Prenota';
import Recensioni from '@/components/home/Recensioni';
import Relax from '@/components/home/Relax';
import Silvia from '@/components/home/Silvia';
import Domande from '@/components/ui/Domande';
import Invito from '@/components/ui/Invito';
import { DOMANDE } from '@/lib/domande';
import { pageMetadata } from '@/lib/seo';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site';

export const metadata = pageMetadata({
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  path: '/',
});

/**
 * La home: la finestra che si apre (hero), il listino che sale come un
 * foglio, il nastro dei nomi, i quindici minuti di relax, come funziona
 * (le stories), Silvia con la scheda Instagram, le recensioni (solo vere),
 * le letture con la chat, prenotare e trovarmi, le domande, l'invito. Ogni
 * tema ha la sua pagina: /trattamenti, /letture, /chi-sono.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Listino />
      <Nastro />
      <Relax />
      <ComeFunziona />
      <Silvia />
      <Recensioni />
      <Letture />
      <Prenota />
      <Domande items={DOMANDE} />
      <Invito />
    </>
  );
}
