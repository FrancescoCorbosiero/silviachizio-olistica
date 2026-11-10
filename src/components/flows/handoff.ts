import type { PrenotaDraft } from '@/lib/forms';
import { SLUG_TRATTAMENTI, type TrattamentoSlug } from '@/lib/trattamenti';

/**
 * Il trattamento arrivato dal link ("Prenota questo":
 * /prenota?trattamento=<slug>#richiesta). Modulo leggero apposta: lo usa
 * anche AppProvider, che sta in ogni pagina, senza tirarsi dietro il codice
 * dei flussi.
 */
export function handoffFromSlug(slug: string | null | undefined): Partial<PrenotaDraft> {
  return slug && (SLUG_TRATTAMENTI as readonly string[]).includes(slug) ? { trattamento: slug as TrattamentoSlug } : {};
}
