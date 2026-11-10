import Logo from '@/components/layout/Logo';
import NotFoundContent from '@/components/layout/NotFoundContent';

export const metadata = { title: 'Pagina non trovata' };

/**
 * 404 per gli indirizzi che non esistono (da andrea-bellettati). Sta fuori
 * dai gruppi, quindi senza header e piè di pagina del sito: solo il
 * marchio. Next la mette nei dati di ogni pagina: deve restare leggera.
 */
export default function NotFound() {
  return (
    <>
      <header className="wrap flex h-[64px] items-center lg:h-[76px]">
        <Logo />
      </header>
      <main id="contenuto">
        <NotFoundContent />
      </main>
    </>
  );
}
