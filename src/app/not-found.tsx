import Logo from '@/components/layout/Logo';
import NotFoundContent from '@/components/layout/NotFoundContent';

export const metadata = { title: 'Pagina non trovata' };

/**
 * 404 per gli indirizzi che non esistono. Sta fuori dal gruppo (sito),
 * quindi senza testata e piè di pagina: solo il marchio. Next la mette nei
 * dati di ogni pagina: deve restare leggera.
 */
export default function NotFound() {
  return (
    <>
      <header className="testata">
        <div className="testata-pillola !justify-center">
          <Logo />
        </div>
      </header>
      <main id="contenuto">
        <NotFoundContent />
      </main>
    </>
  );
}
