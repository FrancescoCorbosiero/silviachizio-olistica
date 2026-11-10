import NotFoundContent from '@/components/layout/NotFoundContent';

export const metadata = { title: 'Pagina non trovata' };

/** 404 dentro il sito: con header e piè di pagina (da andrea-bellettati). */
export default function NotFound() {
  return <NotFoundContent />;
}
