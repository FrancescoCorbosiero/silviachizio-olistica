import type { ReactNode } from 'react';
import MotionPage from '@/components/motion/MotionPage';

/**
 * Da andrea-bellettati (src/app/template.tsx). Qui nascono e muoiono le
 * animazioni di ogni pagina. Il template si rimonta solo quando cambia il
 * gruppo ((sito) o (campagne)), non tra due pagine dello stesso gruppo: il
 * cambio pagina vero lo segue MotionPage, con il percorso come chiave.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <MotionPage>{children}</MotionPage>;
}
