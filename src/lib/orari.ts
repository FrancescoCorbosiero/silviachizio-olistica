import type { Giorno } from './site';

const NOMI: Record<Giorno, string> = { lun: 'lunedì', mar: 'martedì', mer: 'mercoledì', gio: 'giovedì', ven: 'venerdì', sab: 'sabato', dom: 'domenica' };
const ORDINE: Giorno[] = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];

/** "Lunedì–venerdì, 9:00–19:00" oppure "Martedì e giovedì, 15:00–20:00". */
export function orarioDisplay(o: { giorni: Giorno[]; dalle: string; alle: string }): string {
  const idx = o.giorni.map((g) => ORDINE.indexOf(g)).sort((a, b) => a - b);
  const contigui = idx.length > 2 && idx.every((v, i) => i === 0 || v === (idx[i - 1] ?? -2) + 1);
  const nomi = idx.map((i) => NOMI[ORDINE[i] as Giorno]);
  const giorni = contigui
    ? `${nomi[0]}–${nomi[nomi.length - 1]}`
    : nomi.length > 1
      ? `${nomi.slice(0, -1).join(', ')} e ${nomi[nomi.length - 1]}`
      : (nomi[0] ?? '');
  const ora = (s: string) => s.replace(/^0/, '');
  return `${giorni.charAt(0).toUpperCase()}${giorni.slice(1)}, ${ora(o.dalle)}–${ora(o.alle)}`;
}

/** Il giorno in schema.org (dati strutturati). */
export const GIORNO_SCHEMA: Record<Giorno, string> = {
  lun: 'Monday',
  mar: 'Tuesday',
  mer: 'Wednesday',
  gio: 'Thursday',
  ven: 'Friday',
  sab: 'Saturday',
  dom: 'Sunday',
};
