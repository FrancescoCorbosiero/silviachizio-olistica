import type { ReactNode } from 'react';

type Split = 'lines' | 'blur' | 'chars' | 'wipe';

/**
 * Testata di sezione (da andrea-bellettati, SectionHead.tsx): l'etichetta
 * con la scintilla, il titolo in Playfair con al massimo una parola scritta
 * a mano (`script`) e, se serve, un sottotitolo.
 */
export default function SectionHead({
  eyebrow,
  title,
  script,
  scriptPrima = false,
  lead,
  id,
  size = 'lg',
  align = 'left',
  className = '',
  as: Tag = 'h2',
  split = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  /** La parola scritta a mano (una sola per titolo). */
  script?: string;
  /** La parola a mano in testa al titolo invece che in fondo. */
  scriptPrima?: boolean;
  lead?: ReactNode;
  id?: string;
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2';
  /** Come entra il titolo (data-split del motore): a turno, una variante, o fermo. */
  split?: boolean | Split;
}) {
  const parola = script ? <span className="script">{script}</span> : null;
  return (
    <div className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag id={id} className={`display-${size}`} data-split={split === false ? undefined : split === true ? '' : split}>
        {scriptPrima && parola && (
          <>
            {parola}{' '}
          </>
        )}
        {title}
        {!scriptPrima && parola && (
          <>
            {' '}
            {parola}
          </>
        )}
      </Tag>
      {lead && <p className={`lead misura ${align === 'center' ? 'mx-auto' : ''}`}>{lead}</p>}
    </div>
  );
}
