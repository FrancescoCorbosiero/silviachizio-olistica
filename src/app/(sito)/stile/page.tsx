import type { Metadata } from 'next';
import { Camera, Heart, Leaf, MapPin, Sparkles } from 'lucide-react';
import DivisoreLoto from '@/components/brand/DivisoreLoto';
import Giglio from '@/components/brand/Giglio';
import Listino from '@/components/brand/Listino';
import Esempio from '@/components/ui/Esempio';
import Scena from '@/components/ui/Scena';
import { IMMAGINI, type NomeImmagine } from '@/lib/immagini';
import {
  ArrowIcon,
  IconaCandela,
  IconaCuore,
  IconaFoglia,
  IconaFuton,
  IconaLoto,
  IconaOrologio,
  IconaSchiena,
  IconaScintilla,
  InstagramIcon,
  WhatsAppIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Stile',
  description: 'Il Brand System di Lily: colori, caratteri, componenti ed effetti, per rivederli insieme.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/stile' },
};

/** La palette di docs/brand.md, con l'uso di ogni colore. */
const PALETTE = [
  { nome: 'lily', hex: '#E00B57', uso: 'marchio, titoli in rosa, bottoni principali', scuro: true },
  { nome: 'lily-deep', hex: '#C40A4C', uso: 'testo rosa piccolo su fondi rosati, hover', scuro: true },
  { nome: 'lily-bright', hex: '#F24F80', uso: 'rosa su fondo notte, il filo dei bordi', scuro: true },
  { nome: 'petalo', hex: '#F8AAC6', uso: 'filetti, sottolineature a mano, decoro' },
  { nome: 'cipria', hex: '#FCE0E9', uso: 'cerchi delle icone, pillole, campi scelti' },
  { nome: 'blush', hex: '#FBE8EE', uso: 'nastri, fasce, sezioni chiare' },
  { nome: 'latte', hex: '#FDF6F8', uso: 'testo su fondi scuri, campi dei moduli' },
  { nome: 'sabbia', hex: '#F2E4DD', uso: 'il muro dello studio: il fondo pagina' },
  { nome: 'sabbia-deep', hex: '#E8D2C8', uso: 'fasce e filetti su sabbia' },
  { nome: 'vino', hex: '#4A1027', uso: 'il lily in ombra: fasce piene, scene scure', scuro: true },
  { nome: 'carta', hex: '#FFFFFF', uso: 'fogli delle richieste' },
  { nome: 'inchiostro', hex: '#2A1B17', uso: 'titoli scuri e testo', scuro: true },
  { nome: 'ink-mute', hex: '#6E5A5E', uso: 'testo secondario', scuro: true },
  { nome: 'notte', hex: '#221814', uso: 'sezioni scure, footer', scuro: true },
  { nome: 'grafite', hex: '#6F6664', uso: 'disegni a linea', scuro: true },
  { nome: 'foglia', hex: '#A09A5D', uso: 'solo decoro, mai testo', scuro: true },
  { nome: 'candela', hex: '#F6C28B', uso: 'bagliori caldi, Lily Magic' },
  { nome: 'cera', hex: '#FCE2BC', uso: 'fondi caldi, aloni' },
] as const;

/** Le coppie sicure per il testo (WCAG AA), calcolate sui colori qui sopra. */
const COPPIE = [
  { testo: 'inchiostro', fondo: 'sabbia', ratio: '13,3:1', classe: 'bg-sabbia text-inchiostro' },
  { testo: 'ink-mute', fondo: 'sabbia', ratio: '5,1:1', classe: 'bg-sabbia text-ink-mute' },
  { testo: 'lily-deep', fondo: 'sabbia', ratio: '4,8:1', classe: 'bg-sabbia text-lily-deep' },
  { testo: 'latte', fondo: 'vino', ratio: '14,1:1', classe: 'bg-vino text-latte' },
  { testo: 'petalo', fondo: 'vino', ratio: '8,3:1', classe: 'bg-vino text-petalo' },
  { testo: 'inchiostro', fondo: 'latte', ratio: '15,6:1', classe: 'bg-latte text-inchiostro' },
  { testo: 'ink-mute', fondo: 'latte', ratio: '6,0:1', classe: 'bg-latte text-ink-mute' },
  { testo: 'lily', fondo: 'carta', ratio: '4,8:1', classe: 'bg-carta text-lily' },
  { testo: 'lily', fondo: 'latte', ratio: '4,5:1 (al limite)', classe: 'bg-latte text-lily' },
  { testo: 'lily-deep', fondo: 'cipria', ratio: '4,9:1', classe: 'bg-cipria text-lily-deep' },
  { testo: 'lily-deep', fondo: 'blush', ratio: '5,1:1', classe: 'bg-blush text-lily-deep' },
  { testo: 'bianco', fondo: 'lily', ratio: '4,8:1', classe: 'bg-lily text-white' },
  { testo: 'bianco', fondo: 'lily-deep', ratio: '6,0:1', classe: 'bg-lily-deep text-white' },
  { testo: 'latte', fondo: 'notte', ratio: '16,3:1', classe: 'bg-notte text-latte' },
  { testo: 'candela', fondo: 'notte', ratio: '10,8:1', classe: 'bg-notte text-candela' },
  { testo: 'petalo', fondo: 'notte', ratio: '9,6:1', classe: 'bg-notte text-petalo' },
  { testo: 'lily-bright', fondo: 'notte', ratio: '5,1:1', classe: 'bg-notte text-lily-bright' },
] as const;

function Blocco({ id, titolo, children, nota }: { id: string; titolo: string; children: React.ReactNode; nota?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-titolo`} className="section-tight border-t border-lily/15">
      <div className="wrap">
        <h2 id={`${id}-titolo`} className="display-md">
          {titolo}
        </h2>
        {nota && <p className="lead misura mt-3">{nota}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

/**
 * Tutti i componenti del Brand System «Lily», per rivederli con Silvia
 * (docs/spec.md). Fuori dai motori e dalla sitemap.
 */
export default function StilePage() {
  return (
    <>
      <Scena immagine="seta" altezza="bassa" velo="vino" priorita aria-labelledby="stile-titolo">
        <p className="eyebrow">Brand System</p>
        <h1 id="stile-titolo" className="display-xl mt-4">
          Lo stile di <span className="script">Lily</span>
        </h1>
        <p className="lead misura mt-5">
          Colori, caratteri, componenti ed effetti del sito, tutti in una pagina: per rivederli insieme a Silvia prima
          di usarli. Riferimenti in <code>docs/brand.md</code>.
        </p>
      </Scena>

      <Blocco
        id="scene"
        titolo="Scene e immagini"
        nota="Le sezioni a tutto schermo (Scena): l'immagine scorre più lenta della pagina, il velo tiene leggibile il testo. Le immagini stanno in src/lib/immagini.ts: atmosfere disegnate da noi, foto per l'anteprima, domani le foto di Silvia."
      >
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {(Object.keys(IMMAGINI) as NomeImmagine[]).map((nome) => (
            <li key={nome} className="flex flex-col gap-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-tile)] bg-notte">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMMAGINI[nome].src} alt="" width={2000} height={1250} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <p className="text-sm">
                <span className="font-semibold">{nome}</span> · <span className="testo-mute">{IMMAGINI[nome].fonte}</span>
              </p>
            </li>
          ))}
        </ul>
        <h3 className="display-sm mt-12">Il segno dell&apos;anteprima</h3>
        <p className="lead misura mt-3">
          In anteprima ogni blocco compare, anche quelli che aspettano un dato di Silvia: il valore d&apos;esempio porta questo
          segno. Nel sito online non c&apos;è.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Esempio cosa="il prezzo" />
          <span className="notte on-notte rounded-[var(--radius-tile)] px-4 py-3">
            <Esempio cosa="l'indirizzo" />
          </span>
        </div>
      </Blocco>

      <Blocco id="logo" titolo="Logo e giglio" nota="Ricostruzione provvisoria in SVG del logo del listino: va sostituita dal file originale di Silvia.">
        <div className="grid gap-5 md:grid-cols-3">
          <figure className="petalo grid place-items-center p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.svg" alt="Logo Lily Trattamenti Benessere su fondo chiaro" width={244} height={252} className="h-auto w-56" />
            <figcaption className="testo-mute mt-4 text-sm">Completo, su chiaro</figcaption>
          </figure>
          <figure className="notte grid place-items-center rounded-[var(--radius-petalo)] p-8 on-notte">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-notte.svg" alt="Logo Lily Trattamenti Benessere su fondo notte" width={244} height={252} className="h-auto w-56" />
            <figcaption className="testo-mute mt-4 text-sm">Su fondo notte</figcaption>
          </figure>
          <figure className="petalo petalo-blush grid place-items-center gap-6 p-8">
            <Giglio className="w-48" title="Il giglio di Lily" />
            <p className="font-script text-6xl leading-none text-lily">Lily</p>
            <figcaption className="testo-mute text-sm">Solo giglio · solo wordmark</figcaption>
          </figure>
        </div>
      </Blocco>

      <Blocco id="palette" titolo="Palette" nota="Campionata dal listino, dal logo e dalla divisa.">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PALETTE.map((c) => (
            <li key={c.nome} className="petalo overflow-hidden">
              <div className="h-20 border-b border-petalo/40" style={{ backgroundColor: c.hex }} />
              <div className="p-3">
                <p className="font-semibold">--{c.nome}</p>
                <p className="testo-mute text-sm">{c.hex}</p>
                <p className="mt-1 text-sm leading-snug">{c.uso}</p>
              </div>
            </li>
          ))}
        </ul>
        <h3 className="display-sm mt-12">Coppie sicure per il testo</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COPPIE.map((c) => (
            <li key={`${c.testo}-${c.fondo}`} className={`rounded-2xl border border-petalo/40 px-4 py-3 ${c.classe}`}>
              <span className="font-semibold">
                {c.testo} su {c.fondo}
              </span>{' '}
              · {c.ratio}
            </li>
          ))}
        </ul>
        <p className="testo-mute mt-4 text-sm">
          Per il testo piccolo sui fondi rosati si usa --lily-deep; --lily su cipria e su notte solo per il testo grande;
          --foglia mai per il testo (2,7:1).
        </p>
      </Blocco>

      <Blocco id="tipografia" titolo="Tipografia">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="display-xl">
              Un&apos;ora per <span className="script">te</span>
            </p>
            <p className="display-lg">Playfair Display, 800</p>
            <p className="display-md">Titoli di sezione, 700</p>
            <p className="manifesto display-md">Listino</p>
          </div>
          <div className="space-y-5">
            <p className="corsivo text-2xl">Quattro esperienze di benessere</p>
            <p>
              <span className="pennellata text-xl">Quattro esperienze di benessere</span>
            </p>
            <p className="eyebrow">Etichetta con la scintilla</p>
            <p className="lead">Testo introduttivo, in Figtree: frasi semplici e calde, righe di 60–70 caratteri.</p>
            <p className="misura">
              Testo normale in Figtree, 17 px su telefono e 18 px su schermi più grandi. Silvia parla in prima persona e dà
              del tu. <a className="text-link" href="#tipografia">Link nel testo <ArrowIcon /></a>
            </p>
            <p className="font-script text-5xl text-lily">Damion · la parola a mano</p>
          </div>
        </div>
      </Blocco>

      <Blocco id="bottoni" titolo="Bottoni" nota="Rettangoli con gli angoli appena smussati: pieno rosa (principale), contorno rosa (secondario), latte e contorno latte sulle scene e sulle sezioni scure.">
        <div className="flex flex-wrap items-center gap-4">
          <a className="btn" href="#bottoni">
            Prenota un trattamento
          </a>
          <a className="btn btn-outline" href="#bottoni">
            Richiedi una lettura
          </a>
          <a className="btn btn-sm" href="#bottoni">
            Piccolo
          </a>
          <a className="btn btn-lg" href="#bottoni">
            Grande <ArrowIcon />
          </a>
          <button type="button" className="btn" disabled>
            Disattivato
          </button>
          <a className="icon-btn" href="#bottoni" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>
        <div className="notte on-notte mt-8 flex flex-wrap items-center gap-4 rounded-[var(--radius-petalo)] p-6">
          <a className="btn btn-latte" href="#bottoni">
            Prenota un trattamento
          </a>
          <a className="btn btn-outline-latte" href="#bottoni">
            Richiedi una lettura
          </a>
          <a className="icon-btn" href="#bottoni" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </div>
      </Blocco>

      <Blocco id="superfici" titolo="Superfici">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="petalo petalo-lift p-6">
            <p className="display-sm">Petalo</p>
            <p className="testo-mute mt-2">Card su carta, raggio 26 px, ombra rosa morbida. Si solleva al passaggio.</p>
          </div>
          <div className="petalo petalo-latte p-6">
            <p className="display-sm">Petalo latte</p>
            <p className="testo-mute mt-2">Per i pannelli dentro le sezioni bianche.</p>
          </div>
          <div className="petalo petalo-blush p-6">
            <p className="display-sm">Petalo blush</p>
            <p className="mt-2">Fasce e riquadri chiari.</p>
          </div>
          <div className="relative overflow-hidden rounded-[var(--radius-petalo)] p-6" style={{ background: 'linear-gradient(135deg, #f8aac6, #fce2bc)' }}>
            <div className="vetro rounded-2xl p-5">
              <p className="display-sm">Vetro rosato</p>
              <p className="mt-2">Header, barra in basso e fogli: trasparenza solo dove dietro c&apos;è qualcosa.</p>
            </div>
          </div>
        </div>
        <div className="notte on-notte relative isolate mt-6 overflow-hidden rounded-[var(--radius-petalo)] p-8">
          <div className="luce-candela -right-16 -top-16 w-80" aria-hidden />
          <p className="eyebrow">Notte</p>
          <p className="display-md mt-3">
            La luce della <span className="script">candela</span>
          </p>
          <p className="lead mt-3 misura">Le sezioni scure come la divisa: il bordino rosa in alto, testo latte, accenti candela e rosa acceso.</p>
          <div className="petalo-notte mt-6 rounded-2xl p-5">Petalo su notte</div>
        </div>
      </Blocco>

      <Blocco id="listino" titolo="Il listino" nota="La riga del listino: il componente simbolo, in home, nei trattamenti, nella richiesta e nelle email.">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="petalo p-5 sm:p-8">
            <p className="text-center">
              <span className="pennellata text-lg">Quattro esperienze di benessere</span>
            </p>
            <DivisoreLoto className="my-5" />
            <Listino />
          </div>
          <div>
            <h3 className="display-sm">Cerchi delle icone</h3>
            <div className="mt-5 flex flex-wrap gap-4">
              <span className="cerchio cerchio-lg">
                <IconaLoto />
              </span>
              <span className="cerchio cerchio-lg">
                <IconaFuton />
              </span>
              <span className="cerchio cerchio-lg">
                <IconaSchiena />
              </span>
              <span className="cerchio cerchio-lg">
                <IconaCandela />
              </span>
            </div>
            <h3 className="display-sm mt-10">Con la stessa mano</h3>
            <div className="mt-5 flex flex-wrap gap-4 text-lily">
              {[IconaOrologio, IconaCuore, IconaScintilla, IconaFoglia, IconaLoto].map((Icona, i) => (
                <span key={i} className="cerchio cerchio-sm">
                  <Icona />
                </span>
              ))}
            </div>
            <h3 className="display-sm mt-10">Interfaccia (Lucide, stesso spessore)</h3>
            <div className="mt-5 flex flex-wrap gap-5 text-lily-deep">
              {[MapPin, Camera, Heart, Leaf, Sparkles].map((Icona, i) => (
                <Icona key={i} size={26} strokeWidth={1.75} aria-hidden />
              ))}
            </div>
          </div>
        </div>
      </Blocco>

      <Blocco id="motivi" titolo="Motivi">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            <DivisoreLoto />
            <p className="filetti text-lily">
              <span className="font-script text-4xl">Lily</span>
            </p>
            <ul className="elenco">
              <li>foto della stesa</li>
              <li>interpretazione personalizzata scritta o video</li>
              <li>risposta via email entro 24–48 ore</li>
            </ul>
          </div>
          <div className="flex flex-wrap content-start gap-3">
            <span className="pill">Montebelluna (TV)</span>
            <span className="pill">Quattro trattamenti</span>
            <span className="pill pill-latte">Letture a distanza</span>
            <span className="pill">
              <IconaOrologio /> 75 min
            </span>
          </div>
        </div>
      </Blocco>

      <Blocco id="movimento" titolo="Movimento «respiro»" nota="Lento e morbido: le cose leggere galleggiano, le cose care si disegnano. Con “riduci movimento” tutto è fermo.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="petalo relative isolate grid h-64 place-items-center overflow-hidden">
            <p className="corsivo text-xl">Il bagliore che respira</p>
          </div>
          <div className="notte on-notte relative isolate grid h-64 place-items-center overflow-hidden rounded-[var(--radius-petalo)]">
            <div className="luce-candela w-72" aria-hidden />
            <p className="corsivo text-xl">La luce della candela</p>
          </div>
        </div>
      </Blocco>
    </>
  );
}
