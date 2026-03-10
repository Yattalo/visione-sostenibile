import { mutation } from "./_generated/server";

interface GalleryEntry {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  mediaType: "image" | "video";
}

const galleryEntries: GalleryEntry[] = [
  // ── Servizi (cover images) ──────────────────────────────────────────
  {
    title: "Progettazione Giardini — Vista Progetto",
    description:
      "Progettazione su misura di spazi verdi con approccio biodinamico",
    imageUrl: "/images/servizi/progettazione-giardini-cover.png",
    category: "Progettazione Giardini",
    mediaType: "image",
  },
  {
    title: "Realizzazione Giardini — Cantiere Completato",
    description:
      "Dalla progettazione alla realizzazione di giardini unici",
    imageUrl: "/images/servizi/realizzazione-giardini-cover.png",
    category: "Realizzazione Giardini",
    mediaType: "image",
  },
  {
    title: "Manutenzione Giardini — Cura del Verde",
    description:
      "Manutenzione ordinaria e straordinaria di aree verdi",
    imageUrl: "/images/servizi/manutenzioni-cover.png",
    category: "Manutenzione",
    mediaType: "image",
  },
  {
    title: "Potature — Intervento Professionale",
    description:
      "Potature di formazione, contenimento e risanamento",
    imageUrl: "/images/servizi/potature-cover.png",
    category: "Potature",
    mediaType: "image",
  },
  {
    title: "Rigenerazione Terreni — Suolo Vivo",
    description:
      "Tecniche biodinamiche per il ripristino della fertilità del suolo",
    imageUrl: "/images/servizi/rigenerazione-terreni-cover.png",
    category: "Rigenerazione Terreni",
    mediaType: "image",
  },
  {
    title: "Trattamenti Piante — Protezione Naturale",
    description:
      "Trattamenti fitosanitari con metodi naturali e biologici",
    imageUrl: "/images/servizi/trattamenti-piante-cover.png",
    category: "Trattamenti Piante",
    mediaType: "image",
  },
  {
    title: "Scelta Piante — Selezione Botanica",
    description:
      "Consulenza nella scelta delle specie più adatte al tuo giardino",
    imageUrl: "/images/servizi/scelta-piante-cover.png",
    category: "Scelta Piante",
    mediaType: "image",
  },
  {
    title: "Ingegneria Naturalistica — Stabilizzazione Verde",
    description:
      "Interventi di consolidamento con tecniche di ingegneria naturalistica",
    imageUrl: "/images/servizi/ingegneria-naturalistica-cover.png",
    category: "Ingegneria Naturalistica",
    mediaType: "image",
  },
  {
    title: "Impianti di Irrigazione — Sistema Efficiente",
    description:
      "Progettazione e installazione di impianti irrigui a basso consumo",
    imageUrl: "/images/servizi/impianti-irrigazione-cover.png",
    category: "Impianti Irrigazione",
    mediaType: "image",
  },
  {
    title: "Camminamenti in Pietra — Percorsi Naturali",
    description:
      "Realizzazione di camminamenti in pietra naturale e materiali locali",
    imageUrl: "/images/servizi/camminamenti-pietra-cover.png",
    category: "Camminamenti",
    mediaType: "image",
  },
  {
    title: "Illuminazione Esterni — Atmosfera Notturna",
    description:
      "Progettazione illuminotecnica per valorizzare il giardino di sera",
    imageUrl: "/images/servizi/illuminazione-esterni-cover.png",
    category: "Illuminazione",
    mediaType: "image",
  },
  {
    title: "Arredamento Esterni — Vivere all'Aperto",
    description:
      "Soluzioni di arredo per spazi esterni funzionali e accoglienti",
    imageUrl: "/images/servizi/arredamento-esterni-cover.png",
    category: "Arredamento Esterni",
    mediaType: "image",
  },

  // ── Progetti (hero images) ──────────────────────────────────────────
  {
    title: "Agriturismo Durando — Portacomaro",
    description:
      "Progetto paesaggistico per agriturismo nel Monferrato",
    imageUrl:
      "/progetti/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero.jpg",
    category: "Progetti",
    mediaType: "image",
  },
  {
    title: "Villa sul Lago — Baveno, Lago Maggiore",
    description:
      "Giardino panoramico con vista lago sulle sponde del Maggiore",
    imageUrl:
      "/progetti/baveno-lago-maggiore/baveno-lago-maggiore_hero.jpg",
    category: "Progetti",
    mediaType: "image",
  },
  {
    title: "Giardino Privato — Castagneto Po",
    description:
      "Ristrutturazione paesaggistica in collina torinese",
    imageUrl:
      "/progetti/castagneto-po-marta/castagneto-po-marta_hero.jpg",
    category: "Progetti",
    mediaType: "image",
  },
  {
    title: "Residenza Maria Rosa — Santhià",
    description:
      "Giardino residenziale con spazi verdi integrati",
    imageUrl:
      "/progetti/maria-rosa-santhia/maria-rosa-santhia_hero.jpg",
    category: "Progetti",
    mediaType: "image",
  },
  {
    title: "Giardino Ruta — Portacomaro",
    description:
      "Progettazione e render di giardino privato nel Monferrato",
    imageUrl:
      "/progetti/portacomaro-ruta/portacomaro-ruta_hero.jpg",
    category: "Progetti",
    mediaType: "image",
  },
  {
    title: "Lungolago — Porto Valtravaglia",
    description:
      "Intervento paesaggistico su area lacustre con vegetazione autoctona",
    imageUrl:
      "/progetti/porto-val-travaglia/porto-val-travaglia_hero.jpg",
    category: "Progetti",
    mediaType: "image",
  },
  {
    title: "Giardino Veronica — Render Progettuale",
    description:
      "Progettazione completa con render 3D e realizzazione",
    imageUrl: "/progetti/veronica/veronica_hero.jpg",
    category: "Progetti",
    mediaType: "image",
  },

  // ── Extra: inline images per variare la gallery ─────────────────────
  {
    title: "Dettaglio Progettazione — Planimetria Verde",
    description:
      "Fase di progettazione con planimetria dettagliata degli spazi",
    imageUrl: "/images/servizi/progettazione-inline.png",
    category: "Progettazione Giardini",
    mediaType: "image",
  },
  {
    title: "Realizzazione in Corso — Fase Operativa",
    description:
      "Documentazione della fase di cantiere durante la realizzazione",
    imageUrl: "/images/servizi/realizzazione-inline.png",
    category: "Realizzazione Giardini",
    mediaType: "image",
  },
  {
    title: "Potatura Alberi — Tecnica di Taglio",
    description:
      "Intervento di potatura professionale su alberi ad alto fusto",
    imageUrl: "/images/servizi/potature-inline.png",
    category: "Potature",
    mediaType: "image",
  },
  {
    title: "Camminamento Completato — Dettaglio Pietra",
    description:
      "Particolare di camminamento in pietra naturale posata a mano",
    imageUrl: "/images/servizi/camminamenti-inline.png",
    category: "Camminamenti",
    mediaType: "image",
  },
  {
    title: "Illuminazione Giardino — Effetto Sera",
    description:
      "Risultato finale dell'illuminazione paesaggistica al tramonto",
    imageUrl: "/images/servizi/illuminazione-inline.png",
    category: "Illuminazione",
    mediaType: "image",
  },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Idempotent: skip if gallery already has entries
    const existing = await ctx.db
      .query("gallery")
      .first();

    if (existing) {
      return {
        success: true,
        seeded: 0,
        skipped: galleryEntries.length,
        total: galleryEntries.length,
        message: "Gallery già popolata — seed saltato",
      };
    }

    let seededCount = 0;

    for (let i = 0; i < galleryEntries.length; i++) {
      const entry = galleryEntries[i];

      await ctx.db.insert("gallery", {
        title: entry.title,
        description: entry.description,
        imageUrl: entry.imageUrl,
        mediaType: entry.mediaType,
        category: entry.category,
        order: i,
        isActive: true,
        createdAt: Date.now(),
      });

      seededCount++;
    }

    return {
      success: true,
      seeded: seededCount,
      skipped: 0,
      total: galleryEntries.length,
    };
  },
});
