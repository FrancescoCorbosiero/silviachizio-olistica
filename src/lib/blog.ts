import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { z } from 'zod';
import { TEMI, type SchedaArticolo } from './blog-temi';
import { IMMAGINI, type NomeImmagine } from './immagini';
import { ANTEPRIMA, BLOG_ONLINE } from './site';

/* =====================================================================
   Il blog in Markdown (come gli articoli di andrea-bellettati,
   src/lib/content.ts): un file per articolo in src/content/blog, il nome
   del file è lo slug della pagina, i dati in testa (frontmatter).
   Gira solo sul server, al build: le pagine escono già fatte.

   Gli articoli di prova hanno `esempio: true`: compaiono solo in
   anteprima (src/lib/anteprima.ts), col segno «Esempio», e mai nei dati
   strutturati o nella sitemap. Il blog va online con il primo articolo
   vero e BLOG_ONLINE in src/lib/site.ts.
   ===================================================================== */

const CARTELLA = path.join(process.cwd(), 'src/content/blog');

const schema = z.object({
  titolo: z.string(),
  data: z.coerce.date(),
  estratto: z.string(),
  tema: z.enum(TEMI),
  /** Il nome di un'immagine di src/lib/immagini.ts. */
  copertina: z.string().refine((n): n is NomeImmagine => n in IMMAGINI, 'copertina: un nome di src/lib/immagini.ts'),
  inEvidenza: z.boolean().default(false),
  esempio: z.boolean().default(false),
});

export type Articolo = SchedaArticolo & { data: Date; inEvidenza: boolean; corpo: string; parole: number };

const giorno = new Intl.DateTimeFormat('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

/** Tutti gli articoli da mostrare, dal più recente: quelli di prova solo in anteprima. */
export const getArticoli = cache((): Articolo[] => {
  if (!fs.existsSync(CARTELLA)) return [];
  const tutti = fs
    .readdirSync(CARTELLA)
    .filter((f) => f.endsWith('.md'))
    .map((file): Articolo => {
      const { data, content } = matter(fs.readFileSync(path.join(CARTELLA, file), 'utf8'));
      const ok = schema.safeParse(data);
      if (!ok.success) throw new Error(`Frontmatter non valido in src/content/blog/${file}: ${ok.error.message}`);
      const parole = content.trim().split(/\s+/).length;
      return {
        ...ok.data,
        copertina: ok.data.copertina as NomeImmagine,
        slug: file.replace(/\.md$/, ''),
        corpo: content,
        parole,
        minuti: Math.max(1, Math.round(parole / 200)),
        quando: giorno.format(ok.data.data),
      };
    });
  const veri = tutti.filter((a) => !a.esempio);
  if (veri.length && !BLOG_ONLINE) {
    console.warn(`Il blog ha ${veri.length} articoli veri ma BLOG_ONLINE è false (src/lib/site.ts): restano nascosti.`);
  }
  return tutti
    .filter((a) => (a.esempio ? ANTEPRIMA : BLOG_ONLINE || ANTEPRIMA))
    .sort((a, b) => b.data.getTime() - a.data.getTime());
});

export const getArticolo = (slug: string) => getArticoli().find((a) => a.slug === slug);

/** La scheda per card e filtro (niente corpo, niente Date: va al client). */
export const scheda = ({ slug, titolo, estratto, tema, copertina, quando, minuti, esempio }: Articolo): SchedaArticolo => ({
  slug,
  titolo,
  estratto,
  tema,
  copertina,
  quando,
  minuti,
  esempio,
});

/** I temi presenti, nell'ordine di TEMI. */
export const temiPresenti = (articoli: Articolo[]) => TEMI.filter((t) => articoli.some((a) => a.tema === t));

/** Markdown → HTML, con gli id sui titoli. */
export async function renderMarkdown(md: string): Promise<string> {
  const file = await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeSlug).use(rehypeStringify).process(md);
  return String(file);
}
