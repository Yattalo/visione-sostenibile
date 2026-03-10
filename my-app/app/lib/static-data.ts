// Dati statici di fallback quando Convex non e connesso

export const serviceSlugAliases: Record<string, string> = {
  "progettazione-giardini-orti": "progettazione-giardini",
  "realizzazione-chiavi-in-mano": "realizzazione-giardini",
  "ampia-scelta-piante": "scelta-piante",
  "trattamenti-curativi-nutrizionali": "trattamenti-piante",
  "camminamenti-muretti-pietra": "camminamenti-pietra",
  "potatura-professionale": "potature",
  "manutenzione-sostenibile": "manutenzioni",
};

export function normalizeServiceSlug(slug: string): string {
  return serviceSlugAliases[slug] ?? slug;
}

export const staticServices = [
  { _id: "1", slug: "progettazione-giardini", title: "Progettazione Giardini", shortDescription: "Progetti personalizzati per giardini e orti a impatto zero", b2bShortDescription: "Progettazione aree verdi aziendali e condominiali con analisi ROI, cronoprogramma e specifiche tecniche per capitolato", fullDescription: "", order: 1, isActive: true },
  { _id: "2", slug: "realizzazione-giardini", title: "Realizzazione Giardini", shortDescription: "Dalla progettazione alla posa, un servizio completo chiavi in mano", b2bShortDescription: "Regia unica di cantiere con fasi controllate, reportistica avanzamento e un solo referente per tempi e budget", fullDescription: "", order: 2, isActive: true },
  { _id: "3", slug: "scelta-piante", title: "Ampia Scelta di Piante", shortDescription: "Piante autoctone, ornamentali e da frutto selezionate per il tuo territorio", b2bShortDescription: "Selezione botanica per contesti aziendali: specie a bassa manutenzione, resistenti al clima e conformi alle normative comunali", fullDescription: "", order: 3, isActive: true },
  { _id: "4", slug: "trattamenti-piante", title: "Trattamenti Curativi e Nutrizionali", shortDescription: "Interventi biologici per la salute e la nutrizione delle piante", b2bShortDescription: "Piani fitosanitari programmati per patrimonio arboreo aziendale: monitoraggio, interventi preventivi e documentazione per compliance", fullDescription: "", order: 4, isActive: true },
  { _id: "5", slug: "impianti-irrigazione", title: "Impianti di Irrigazione", shortDescription: "Sistemi di irrigazione efficienti per ridurre sprechi e consumi idrici", b2bShortDescription: "Audit e ottimizzazione impianti idrici per ridurre i costi operativi: sensori, controllo remoto e reportistica consumi", fullDescription: "", order: 5, isActive: true },
  { _id: "6", slug: "camminamenti-pietra", title: "Posa Camminamenti e Muretti in Pietra", shortDescription: "Realizzazione di percorsi e muretti con materiali naturali e locali", b2bShortDescription: "Percorsi e pavimentazioni conformi alle normative di accessibilita e sicurezza per aree aziendali e condominiali", fullDescription: "", order: 6, isActive: true },
  { _id: "7", slug: "illuminazione-esterni", title: "Illuminazione per Esterni", shortDescription: "Soluzioni luminose a basso consumo per valorizzare gli spazi verdi", b2bShortDescription: "Illuminazione esterna a norma per sedi aziendali: sicurezza percorsi, valorizzazione immagine e riduzione costi energetici", fullDescription: "", order: 7, isActive: true },
  { _id: "8", slug: "ingegneria-naturalistica", title: "Ingegneria Naturalistica", shortDescription: "Tecniche di consolidamento e recupero ambientale con metodi naturali", b2bShortDescription: "Interventi di consolidamento e recupero ambientale con tecniche certificate per enti pubblici e proprietari di fondi", fullDescription: "", order: 8, isActive: true },
  { _id: "9", slug: "arredamento-esterni", title: "Arredamento per Esterni", shortDescription: "Arredi e complementi sostenibili per vivere al meglio il tuo giardino", b2bShortDescription: "Arredi outdoor per aree comuni, hospitality e spazi di rappresentanza: selezione coordinata con regia unica", fullDescription: "", order: 9, isActive: true },
  { _id: "10", slug: "potature", title: "Potature e Abbattimenti in Quota", shortDescription: "Potatura e abbattimento controllato con tecniche di tree climbing", b2bShortDescription: "Gestione programmata del patrimonio arboreo: potature in sicurezza, messa a norma e piano manutentivo documentato", fullDescription: "", order: 10, isActive: true },
  { _id: "11", slug: "rigenerazione-terreni", title: "Rigenerazione dei Terreni", shortDescription: "Metodologie biodinamiche per rigenerare suoli impoveriti e compattati", b2bShortDescription: "Rigenerazione suoli per aree verdi aziendali degradate: riduzione costi di sostituzione piante e miglioramento resilienza", fullDescription: "", order: 11, isActive: true },
  { _id: "12", slug: "manutenzioni", title: "Manutenzioni", shortDescription: "Cura del verde con metodi naturali e biodinamici durante tutto l'anno", b2bShortDescription: "Contratti di manutenzione annuale con SLA, calendario programmato, reportistica periodica e costi certi per budget aziendale", fullDescription: "", order: 12, isActive: true },
];

// Immagini servizi - usa path locali dalla cartella servizi
export const serviceImages: Record<string, string> = {
  "progettazione-giardini": "/images/servizi/progettazione-giardini-cover.png",
  "realizzazione-giardini": "/images/servizi/realizzazione-giardini-cover.png",
  "scelta-piante": "/images/servizi/scelta-piante-cover.png",
  "trattamenti-piante": "/images/servizi/trattamenti-piante-cover.png",
  "impianti-irrigazione": "/images/servizi/impianti-irrigazione-cover.png",
  "camminamenti-pietra": "/images/servizi/camminamenti-pietra-cover.png",
  "illuminazione-esterni": "/images/servizi/illuminazione-esterni-cover.png",
  "ingegneria-naturalistica": "/images/servizi/ingegneria-naturalistica-cover.png",
  "arredamento-esterni": "/images/servizi/arredamento-esterni-cover.png",
  "potature": "/images/servizi/potature-cover.png",
  "rigenerazione-terreni": "/images/servizi/rigenerazione-terreni-cover.png",
  "manutenzioni": "/images/servizi/manutenzioni-cover.png",
};

// Recensioni vuote - da popolare con recensioni reali del cliente
export const staticReviews: {
  _id: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  text: string;
  serviceSlug: string;
  isApproved: boolean;
}[] = [];
