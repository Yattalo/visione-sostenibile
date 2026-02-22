export type SeoEntry = {
  title: string;
  description: string;
};

/**
 * Page-specific SEO titles WITHOUT the brand suffix.
 * The root layout template appends " | Visione Sostenibile" automatically.
 * The `buildMetadata` function adds the brand suffix for OG/Twitter titles.
 */
export const pageSeo = {
  home: {
    title:
      "Giardini Biodinamici Torino | Progettazione e Manutenzione",
    description:
      "Progettiamo, realizziamo e manteniamo giardini biodinamici a Torino e Piemonte. Un referente, zero chimica. Richiedi un sopralluogo gratuito.",
  },
  chiSiamo: {
    title:
      "Chi Siamo — Andrea Giordano, Giardiniere Biodinamico",
    description:
      "Conosci Andrea Giordano e il metodo Visione Sostenibile: progettazione, realizzazione e manutenzione biodinamica. Scopri il team e richiedi consulenza.",
  },
  servizi: {
    title:
      "Servizi di Giardinaggio Sostenibile Torino e Piemonte",
    description:
      "Servizi di giardinaggio sostenibile a Torino e Piemonte: progettazione, realizzazione, manutenzione e molto altro. Richiedi un preventivo gratuito.",
  },
  blog: {
    title:
      "Blog Giardinaggio Sostenibile | Consigli e Guide",
    description:
      "Blog di giardinaggio sostenibile con consigli pratici, guide stagionali e trend del verde. Leggi gli articoli e richiedi supporto.",
  },
  qualita: {
    title:
      "Qualità e Certificazioni Biodinamiche",
    description:
      "Qualità e certificazioni biodinamiche: zero chimica, impatto zero e standard elevati in ogni progetto. Scopri il nostro metodo.",
  },
  contatti: {
    title:
      "Contatti e Preventivo Gratuito Torino",
    description:
      "Contatta Visione Sostenibile a Torino per preventivo gratuito e sopralluogo. Rispondiamo entro 48 ore lavorative. Scrivici ora.",
  },
  progetti: {
    title:
      "Progetti Realizzati | Portfolio Giardini",
    description:
      "Portfolio progetti realizzati: giardini, parchi e outdoor living curati da Visione Sostenibile. Guarda i lavori e richiedi un incontro.",
  },
  quiz: {
    title:
      "Quiz: Che Giardino Fa Per Te?",
    description:
      "Fai il quiz e scopri il giardino perfetto per te. Ricevi una scorecard personalizzata e richiedi una consulenza gratuita.",
  },
} satisfies Record<string, SeoEntry>;

/**
 * Service-specific SEO titles WITHOUT the brand suffix.
 * The layout template adds " | Visione Sostenibile" automatically.
 */
export const serviceSeoBySlug: Record<string, SeoEntry> = {
  "progettazione-giardini": {
    title:
      "Progettazione Giardini Torino | Design Biodinamico",
    description:
      "Progettazione giardini a Torino e Piemonte con approccio biodinamico: layout, piante e roadmap lavori. Prenota un sopralluogo gratuito.",
  },
  "realizzazione-giardini": {
    title:
      "Realizzazione Giardini Chiavi in Mano Torino",
    description:
      "Realizzazione giardini chiavi in mano a Torino: cantiere coordinato, posa completa e consegna pronta. Richiedi un preventivo gratuito.",
  },
  potature: {
    title:
      "Potatura Alberi e Tree Climbing Torino",
    description:
      "Potatura alberi e tree climbing a Torino con interventi sicuri e mirati. Migliora salute e stabilita delle piante. Prenota una valutazione.",
  },
  manutenzioni: {
    title:
      "Manutenzione Giardini Torino | Metodo Biodinamico",
    description:
      "Manutenzione giardini a Torino e Piemonte con metodo biodinamico e piani stagionali. Riduci emergenze e costi. Richiedi una consulenza.",
  },
  "impianti-irrigazione": {
    title:
      "Impianti Irrigazione Giardino Torino",
    description:
      "Impianti di irrigazione giardino a Torino: sistemi smart, consumi ridotti e gestione precisa dell'acqua. Richiedi un sopralluogo gratuito.",
  },
  "rigenerazione-terreni": {
    title:
      "Rigenerazione Terreni e Suoli Torino",
    description:
      "Rigenerazione terreni a Torino con pratiche biodinamiche: suolo fertile, piante piu resilienti e meno chimica. Richiedi una consulenza.",
  },
  "camminamenti-pietra": {
    title:
      "Camminamenti e Muretti in Pietra per Giardini",
    description:
      "Camminamenti e muretti in pietra per giardini su misura: materiali naturali, posa accurata e durata nel tempo. Richiedi un preventivo.",
  },
  "illuminazione-esterni": {
    title:
      "Illuminazione Giardino Esterno Torino",
    description:
      "Illuminazione giardino esterno a Torino: luce funzionale e scenografica a basso consumo. Valorizza i tuoi spazi, richiedi consulenza.",
  },
  "arredamento-esterni": {
    title:
      "Arredamento per Esterni e Outdoor Living",
    description:
      "Arredamento per esterni e outdoor living: soluzioni su misura per vivere il giardino tutto l'anno. Prenota una consulenza gratuita.",
  },
  "ingegneria-naturalistica": {
    title:
      "Ingegneria Naturalistica e Bioingegneria",
    description:
      "Ingegneria naturalistica e bioingegneria per consolidare pendii e recuperare aree verdi. Soluzioni sostenibili, richiedi valutazione.",
  },
  "scelta-piante": {
    title:
      "Scelta Piante Autoctone per Giardini",
    description:
      "Selezioniamo piante autoctone e ornamentali adatte al tuo terreno per un giardino piu stabile e resiliente. Richiedi una consulenza.",
  },
  "trattamenti-piante": {
    title:
      "Trattamenti Naturali per la Salute delle Piante",
    description:
      "Trattamenti naturali e nutrizionali per piante sane, senza eccessi chimici e con monitoraggio mirato. Richiedi un intervento dedicato.",
  },
};

export function getServiceSeo(slug: string, fallbackTitle: string): SeoEntry {
  const fromMap = serviceSeoBySlug[slug];
  if (fromMap) {
    return fromMap;
  }

  return {
    title: fallbackTitle,
    description:
      "Servizio di giardinaggio sostenibile a Torino e Piemonte con approccio biodinamico. Richiedi una consulenza personalizzata.",
  };
}
