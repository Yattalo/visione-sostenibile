export type SeoEntry = {
  title: string;
  description: string;
};

export const pageSeo = {
  home: {
    title:
      "Giardini Biodinamici Torino | Progettazione e Manutenzione | Visione Sostenibile",
    description:
      "Progettiamo, realizziamo e manteniamo giardini biodinamici a Torino e Piemonte. Un referente, zero chimica. Richiedi un sopralluogo gratuito.",
  },
  chiSiamo: {
    title:
      "Chi Siamo — Andrea Giordano, Giardiniere Biodinamico | Visione Sostenibile",
    description:
      "Conosci Andrea Giordano e il metodo Visione Sostenibile: progettazione, realizzazione e manutenzione biodinamica. Scopri il team e richiedi consulenza.",
  },
  servizi: {
    title:
      "Servizi di Giardinaggio Sostenibile Torino e Piemonte | Visione Sostenibile",
    description:
      "Servizi di giardinaggio sostenibile a Torino e Piemonte: progettazione, realizzazione, manutenzione e molto altro. Richiedi un preventivo gratuito.",
  },
  blog: {
    title:
      "Blog Giardinaggio Sostenibile | Consigli e Guide | Visione Sostenibile",
    description:
      "Blog di giardinaggio sostenibile con consigli pratici, guide stagionali e trend del verde. Leggi gli articoli e richiedi supporto.",
  },
  qualita: {
    title:
      "Qualità e Certificazioni Biodinamiche | Visione Sostenibile",
    description:
      "Qualità e certificazioni biodinamiche: zero chimica, impatto zero e standard elevati in ogni progetto. Scopri il nostro metodo.",
  },
  contatti: {
    title:
      "Contatti e Preventivo Gratuito | Visione Sostenibile Torino",
    description:
      "Contatta Visione Sostenibile a Torino per preventivo gratuito e sopralluogo. Rispondiamo entro 48 ore lavorative. Scrivici ora.",
  },
  progetti: {
    title:
      "Progetti Realizzati | Portfolio Giardini | Visione Sostenibile",
    description:
      "Portfolio progetti realizzati: giardini, parchi e outdoor living curati da Visione Sostenibile. Guarda i lavori e richiedi un incontro.",
  },
  quiz: {
    title:
      "Quiz: Che Giardino Fa Per Te? | Visione Sostenibile",
    description:
      "Fai il quiz e scopri il giardino perfetto per te. Ricevi una scorecard personalizzata e richiedi una consulenza gratuita.",
  },
} satisfies Record<string, SeoEntry>;

export const serviceSeoBySlug: Record<string, SeoEntry> = {
  "progettazione-giardini": {
    title:
      "Progettazione Giardini Torino | Design Biodinamico | Visione Sostenibile",
    description:
      "Progettazione giardini a Torino e Piemonte con approccio biodinamico: layout, piante e roadmap lavori. Prenota un sopralluogo gratuito.",
  },
  "realizzazione-giardini": {
    title:
      "Realizzazione Giardini Chiavi in Mano Torino | Visione Sostenibile",
    description:
      "Realizzazione giardini chiavi in mano a Torino: cantiere coordinato, posa completa e consegna pronta. Richiedi un preventivo gratuito.",
  },
  potature: {
    title:
      "Potatura Alberi e Tree Climbing Torino | Visione Sostenibile",
    description:
      "Potatura alberi e tree climbing a Torino con interventi sicuri e mirati. Migliora salute e stabilita delle piante. Prenota una valutazione.",
  },
  manutenzioni: {
    title:
      "Manutenzione Giardini Torino | Metodo Biodinamico | Visione Sostenibile",
    description:
      "Manutenzione giardini a Torino e Piemonte con metodo biodinamico e piani stagionali. Riduci emergenze e costi. Richiedi una consulenza.",
  },
  "impianti-irrigazione": {
    title:
      "Impianti Irrigazione Giardino Torino | Visione Sostenibile",
    description:
      "Impianti di irrigazione giardino a Torino: sistemi smart, consumi ridotti e gestione precisa dell'acqua. Richiedi un sopralluogo gratuito.",
  },
  "rigenerazione-terreni": {
    title:
      "Rigenerazione Terreni e Suoli Torino | Visione Sostenibile",
    description:
      "Rigenerazione terreni a Torino con pratiche biodinamiche: suolo fertile, piante piu resilienti e meno chimica. Richiedi una consulenza.",
  },
  "camminamenti-pietra": {
    title:
      "Camminamenti e Muretti in Pietra per Giardini | Visione Sostenibile",
    description:
      "Camminamenti e muretti in pietra per giardini su misura: materiali naturali, posa accurata e durata nel tempo. Richiedi un preventivo.",
  },
  "illuminazione-esterni": {
    title:
      "Illuminazione Giardino Esterno Torino | Visione Sostenibile",
    description:
      "Illuminazione giardino esterno a Torino: luce funzionale e scenografica a basso consumo. Valorizza i tuoi spazi, richiedi consulenza.",
  },
  "arredamento-esterni": {
    title:
      "Arredamento per Esterni e Outdoor Living | Visione Sostenibile",
    description:
      "Arredamento per esterni e outdoor living: soluzioni su misura per vivere il giardino tutto l'anno. Prenota una consulenza gratuita.",
  },
  "ingegneria-naturalistica": {
    title:
      "Ingegneria Naturalistica e Bioingegneria | Visione Sostenibile",
    description:
      "Ingegneria naturalistica e bioingegneria per consolidare pendii e recuperare aree verdi. Soluzioni sostenibili, richiedi valutazione.",
  },
  "scelta-piante": {
    title:
      "Scelta Piante Autoctone per Giardini | Visione Sostenibile",
    description:
      "Selezioniamo piante autoctone e ornamentali adatte al tuo terreno per un giardino piu stabile e resiliente. Richiedi una consulenza.",
  },
  "trattamenti-piante": {
    title:
      "Trattamenti Naturali per la Salute delle Piante | Visione Sostenibile",
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
    title: `${fallbackTitle} | Visione Sostenibile`,
    description:
      "Servizio di giardinaggio sostenibile a Torino e Piemonte con approccio biodinamico. Richiedi una consulenza personalizzata.",
  };
}
