'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Map as MappaLeaflet } from 'leaflet';
import { MapPin } from 'lucide-react';

/** La scelta di questa scheda: dopo il primo clic la mappa torna da sola (memoria della scheda, non un cookie). */
const CHIAVE = 'lily:mappa';

/** Il segno sulla mappa: una goccia lily con il giglio a linea. */
const SEGNO = `<span class="mappa-segno-goccia"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.6c2 2.5 2.3 6.4 0 10-2.3-3.6-2-7.5 0-10Z"/><path d="M11.5 12.7c-3.4.3-6.9-1.5-9.3-4.6 1.5-.5 3-.3 4.4.3 2.3 1 4 2.5 4.9 4.3Z"/><path d="M12.5 12.7c3.4.3 6.9-1.5 9.3-4.6-1.5-.5-3-.3-4.4.3-2.3 1-4 2.5-4.9 4.3Z"/><path d="M12 13v8"/></svg></span>`;

/**
 * La mappa dello studio (Contatti): una mappa vera, OpenStreetMap con
 * Leaflet, ma che si carica solo se chi visita lo chiede. Prima del clic
 * il sito non contatta nessun server esterno (docs/decisioni.md, "La mappa
 * si carica con un clic"): al suo posto la foto di Montebelluna e il
 * bottone. Leaflet e il suo CSS arrivano con un import dinamico, solo
 * allora. Sul telefono la mappa non ruba lo scroll: si sposta dopo un tocco.
 */
export default function MappaStudio({
  lat,
  lng,
  nome,
  sfondo,
}: {
  lat: number;
  lng: number;
  /** Il nome sul segno (title e testo per i lettori di schermo). */
  nome: string;
  /** La foto da mostrare prima del clic. */
  sfondo: { src: string; srcVerticale: string };
}) {
  const tela = useRef<HTMLDivElement>(null);
  const mappa = useRef<MappaLeaflet | null>(null);
  // Già caricata in questa scheda? Allora torna da sola (sul server: no).
  const ricordata = useSyncExternalStore(
    () => () => {},
    () => {
      try {
        return sessionStorage.getItem(CHIAVE) === 'si';
      } catch {
        return false;
      }
    },
    () => false,
  );
  const [cliccata, setCliccata] = useState(false);
  const attiva = cliccata || ricordata;
  const [stato, setStato] = useState<'attesa' | 'pronta' | 'errore'>('attesa');
  const [ferma, setFerma] = useState(false);

  useEffect(() => {
    if (!attiva || !tela.current) return;
    let annullato = false;
    (async () => {
      try {
        const [{ default: L }] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]);
        if (annullato || !tela.current) return;
        const tocco = L.Browser.mobile;
        const m = L.map(tela.current, {
          center: [lat, lng],
          zoom: 16,
          minZoom: 11,
          scrollWheelZoom: false,
          dragging: !tocco,
          zoomControl: true,
        });
        m.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
        }).addTo(m);
        L.marker([lat, lng], {
          title: nome,
          alt: nome,
          keyboard: false,
          icon: L.divIcon({ className: 'mappa-segno', html: SEGNO, iconSize: [46, 58], iconAnchor: [23, 56] }),
        }).addTo(m);
        mappa.current = m;
        setFerma(tocco);
        setStato('pronta');
      } catch {
        if (!annullato) setStato('errore');
      }
    })();
    return () => {
      annullato = true;
      mappa.current?.remove();
      mappa.current = null;
    };
  }, [attiva, lat, lng, nome]);

  const accendi = () => {
    try {
      sessionStorage.setItem(CHIAVE, 'si');
    } catch {
      /* va bene anche senza */
    }
    setCliccata(true);
  };

  const sblocca = () => {
    mappa.current?.dragging.enable();
    setFerma(false);
  };

  return (
    <div className="mappa">
      {!attiva || stato !== 'pronta' ? (
        <div className="mappa-attesa">
          <picture>
            <source media="(min-width: 768px)" srcSet={sfondo.src} />
            <img src={sfondo.srcVerticale} alt="" width={900} height={1500} loading="lazy" decoding="async" />
          </picture>
          <div className="mappa-attesa-testo on-notte">
            <MapPin size={30} strokeWidth={1.5} className="text-petalo" aria-hidden />
            {stato === 'errore' ? (
              <p className="max-w-[26em]">La mappa non si è caricata: riprova tra poco, o apri le indicazioni qui accanto.</p>
            ) : (
              <>
                {/* BOZZA */}
                <p className="max-w-[26em]">
                  La mappa arriva da OpenStreetMap e si carica solo se me lo chiedi: prima, il sito non manda niente a nessuno.
                </p>
                <button type="button" className="btn btn-latte" onClick={accendi} disabled={attiva}>
                  {attiva ? 'Un attimo…' : 'Mostra la mappa'}
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
      <div ref={tela} className="mappa-tela" role="region" aria-label={`Mappa: ${nome}`} />
      {stato === 'pronta' && ferma && (
        <button type="button" className="mappa-sblocca" onClick={sblocca}>
          Tocca per spostare la mappa
        </button>
      )}
    </div>
  );
}
