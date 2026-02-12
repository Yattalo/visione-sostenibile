// Dati statici di fallback quando Convex non è connesso

export const staticServices = [
  { _id: "1", slug: "progettazione-giardini-orti", title: "Progettazione Giardini e Orti Sostenibili", shortDescription: "Progetti personalizzati per giardini e orti a impatto zero", fullDescription: "", order: 1, isActive: true },
  { _id: "2", slug: "realizzazione-chiavi-in-mano", title: "Realizzazione Completa Chiavi in Mano", shortDescription: "Dalla progettazione alla posa, un servizio completo", fullDescription: "", order: 2, isActive: true },
  { _id: "3", slug: "manutenzione-sostenibile", title: "Manutenzione con Pratiche Sostenibili", shortDescription: "Cura del verde con metodi naturali e biodinamici", fullDescription: "", order: 3, isActive: true },
  { _id: "4", slug: "potatura-professionale", title: "Potatura Professionale", shortDescription: "Potatura non invasiva per la salute delle piante", fullDescription: "", order: 4, isActive: true },
  { _id: "5", slug: "gestione-verde-biodinamica", title: "Gestione del Verde Biodinamica", shortDescription: "Metodologie biodinamiche per un verde sano e rigoglioso", fullDescription: "", order: 5, isActive: true },
];

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
