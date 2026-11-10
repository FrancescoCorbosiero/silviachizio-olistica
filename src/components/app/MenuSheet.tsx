'use client';

import { NextLinkTag } from '@/lib/konsta';
import { Sheet } from 'react-modal-sheet';
import { BlockTitle, List, ListItem } from 'konsta/react';
import { BookOpen, House, Mail, MapPin, MessageCircleHeart, Phone, UserRound } from 'lucide-react';
import { IconaLoto, IconaScintilla, InstagramIcon, WhatsAppIcon } from '@/components/icons';
import { useReducedMotion } from '@/lib/hooks';
import { etichetta, RICHIESTE } from '@/lib/richieste';
import Esempio from '@/components/ui/Esempio';
import { EMAIL_PUBBLICA, TELEFONO, whatsapp } from '@/lib/anteprima';
import { HAS_BLOG, IG_DM_URL, IG_HANDLE, IG_URL } from '@/lib/site';

const WA = whatsapp('Ciao Silvia! Ti scrivo dal sito 🌸');

/* Da andrea-bellettati (src/components/app/MenuSheet.tsx). I sottotitoli
   sono BOZZE (docs/testi-da-validare.md). */
const PAGES = [
  { href: '/', title: 'Home', subtitle: 'Lily, in breve', icon: House },
  { href: '/trattamenti', title: 'Trattamenti', subtitle: 'Il listino: quattro esperienze di benessere', icon: IconaLoto },
  { href: '/letture', title: 'Letture', subtitle: 'Letture intuitive personalizzate, a distanza', icon: IconaScintilla },
  { href: '/chi-sono', title: 'Chi sono', subtitle: 'Silvia, da Montebelluna', icon: UserRound },
  ...(HAS_BLOG ? [{ href: '/blog', title: 'Blog', subtitle: 'Poesia, roccia, luce e benessere', icon: BookOpen }] : []),
  { href: '/contatti', title: 'Contatti', subtitle: 'Dove sono e come scrivermi', icon: MapPin },
];

const media = (Icon: React.ComponentType<{ size?: number; strokeWidth?: number; 'aria-hidden'?: boolean }>, tone = 'bg-cipria text-lily-deep') => (
  <span className={`grid h-9 w-9 place-items-center rounded-full ${tone}`}>
    <Icon size={18} strokeWidth={1.75} aria-hidden />
  </span>
);

/** "Tutto il sito" su telefono: un foglio con le richieste, le pagine e i canali. */
export default function MenuSheet({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: () => void }) {
  const reduced = useReducedMotion();
  return (
    <Sheet isOpen={open} onClose={onClose} detent="content" prefersReducedMotion={reduced}>
      <Sheet.Container className="flow-sheet k-ios" role="dialog" aria-modal="true" aria-label="Menu">
        <Sheet.Header>
          <div className="flex justify-center pt-2">
            <Sheet.DragIndicator />
          </div>
        </Sheet.Header>
        <Sheet.Content scrollClassName="overscroll-contain">
          <div className="px-1 pb-[calc(env(safe-area-inset-bottom)+20px)]">
            <BlockTitle>Le richieste</BlockTitle>
            <List strong inset>
              <ListItem
                link
                href={RICHIESTE.trattamenti.href}
                linkProps={{ onClick: onNavigate }}
                title={etichetta('trattamenti')}
                subtitle={RICHIESTE.trattamenti.sospesa ? 'Le prenotazioni sono sospese' : 'Ti scrivo io per fissare giorno e ora'}
                media={media(IconaLoto, 'bg-lily text-white')}
              />
              <ListItem
                link
                href={RICHIESTE.letture.href}
                linkProps={{ onClick: onNavigate }}
                title={etichetta('letture', { contesto: true })}
                subtitle={RICHIESTE.letture.sospesa ? 'Le richieste sono sospese' : 'Foto della stesa e interpretazione, via email'}
                media={media(IconaScintilla)}
              />
            </List>

            <BlockTitle>Il sito</BlockTitle>
            <List strong inset>
              {PAGES.map((p) => (
                <ListItem
                  key={p.href}
                  link
                  linkComponent={NextLinkTag}
                  href={p.href}
                  title={p.title}
                  subtitle={p.subtitle}
                  media={media(p.icon)}
                  linkProps={{ onClick: onNavigate }}
                />
              ))}
            </List>

            <BlockTitle>Scrivimi</BlockTitle>
            <List strong inset>
              <ListItem
                link
                href={IG_DM_URL}
                target="_blank"
                title="Messaggio su Instagram"
                after={IG_HANDLE}
                media={media(MessageCircleHeart, 'bg-lily text-white')}
              />
              {WA && (
                <ListItem
                  link
                  href={WA.valore}
                  target={WA.esempio ? undefined : '_blank'}
                  title="WhatsApp"
                  after={WA.esempio ? <Esempio /> : undefined}
                  media={
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25d366] text-white">
                      <WhatsAppIcon size={18} />
                    </span>
                  }
                />
              )}
              {TELEFONO && (
                <ListItem
                  link
                  href={TELEFONO.valore.href}
                  title="Telefono"
                  after={TELEFONO.esempio ? <Esempio /> : TELEFONO.valore.testo}
                  media={media(Phone)}
                />
              )}
              {EMAIL_PUBBLICA && (
                <ListItem
                  link
                  href={EMAIL_PUBBLICA.valore.href}
                  title="Email"
                  after={EMAIL_PUBBLICA.esempio ? <Esempio /> : 'Scrivimi'}
                  media={media(Mail)}
                />
              )}
              <ListItem
                link
                href={IG_URL}
                target="_blank"
                title="Instagram"
                after="Seguimi"
                media={
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-cipria text-lily-deep">
                    <InstagramIcon size={18} />
                  </span>
                }
              />
            </List>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} className="!bg-notte/45" />
    </Sheet>
  );
}
