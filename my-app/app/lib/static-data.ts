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
  { _id: "1", slug: "progettazione-giardini", title: "Progettazione giardini sostenibili", shortDescription: "Bellezza, gestione e durata su misura per te.", fullDescription: "", order: 1, isActive: true },
  { _id: "2", slug: "realizzazione-giardini", title: "Realizzazione Giardini", shortDescription: "Uno per tutta la vita: dal progetto al cantiere, senza rimbalzi.", fullDescription: "", order: 2, isActive: true },
  { _id: "3", slug: "scelta-piante", title: "Selezione Piante e Vivaio Interno", shortDescription: "La pianta giusta al posto giusto.", fullDescription: "", order: 3, isActive: true },
  { _id: "4", slug: "trattamenti-piante", title: "Trattamenti curativi e nutrizionali", shortDescription: "Prevenzione, diagnosi e interventi mirati per riportare equilibrio.", fullDescription: "", order: 4, isActive: true },
  { _id: "5", slug: "impianti-irrigazione", title: "Impianti di irrigazione", shortDescription: "L’acqua è un bene prezioso: va gestita con intelligenza.", fullDescription: "", order: 5, isActive: true },
  { _id: "6", slug: "camminamenti-pietra", title: "Posa camminamenti e muretti in pietra", shortDescription: "La natura che arreda la natura: percorsi, contenimenti, scalinate.", fullDescription: "", order: 6, isActive: true },
  { _id: "7", slug: "illuminazione-esterni", title: "Illuminazione per esterni", shortDescription: "Creiamo atmosfera: luce che guida, accoglie e valorizza.", fullDescription: "", order: 7, isActive: true },
  { _id: "8", slug: "ingegneria-naturalistica", title: "Ingegneria naturalistica", shortDescription: "Sostituiamo il cemento con materiali naturali.", fullDescription: "", order: 8, isActive: true },
  { _id: "9", slug: "arredamento-esterni", title: "Arredi e outdoor living", shortDescription: "Il giardino da vivere, in solitudine, in famiglia, con gli amici.", fullDescription: "", order: 9, isActive: true },
  { _id: "10", slug: "potature", title: "Potature e abbattimenti in quota", shortDescription: "La pianta si pota dall’interno: sicurezza e salute dell’albero.", fullDescription: "", order: 10, isActive: true },
  { _id: "11", slug: "rigenerazione-terreni", title: "Rigenerazione del suolo", shortDescription: "La terra è viva: se il suolo sta bene, tutto il giardino lavora meglio.", fullDescription: "", order: 11, isActive: true },
  { _id: "12", slug: "manutenzioni", title: "Manutenzione programmata del verde", shortDescription: "Pensaci una volta sola, poi ci pensiamo noi.", fullDescription: "", order: 12, isActive: true },
];

// Immagini servizi - usa path locali dalla cartella servizi
export const serviceImages: Record<string, string> = {
  "progettazione-giardini": "/images/servizi/progettazione-giardini-cover.webp",
  "realizzazione-giardini": "/images/servizi/realizzazione-giardini-cover.webp",
  "scelta-piante": "/images/servizi/scelta-piante-cover.webp",
  "trattamenti-piante": "/images/servizi/trattamenti-piante-cover.webp",
  "impianti-irrigazione": "/images/servizi/impianti-irrigazione-cover.webp",
  "camminamenti-pietra": "/images/servizi/camminamenti-pietra-cover.webp",
  "illuminazione-esterni": "/images/servizi/illuminazione-esterni-cover.webp",
  "ingegneria-naturalistica": "/images/servizi/ingegneria-naturalistica-cover.webp",
  "arredamento-esterni": "/images/servizi/arredamento-esterni-cover.webp",
  "potature": "/images/servizi/potature-cover.webp",
  "rigenerazione-terreni": "/images/servizi/rigenerazione-terreni-cover.webp",
  "manutenzioni": "/images/servizi/manutenzioni-cover.webp",
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
