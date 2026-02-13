// Dati statici di fallback quando Convex non è connesso

export const staticServices = [
  { _id: "1", slug: "progettazione-giardini-orti", title: "Progettazione Giardini", shortDescription: "Progetti personalizzati per giardini e orti a impatto zero", fullDescription: "", order: 1, isActive: true },
  { _id: "2", slug: "realizzazione-chiavi-in-mano", title: "Realizzazione Giardini", shortDescription: "Dalla progettazione alla posa, un servizio completo chiavi in mano", fullDescription: "", order: 2, isActive: true },
  { _id: "3", slug: "ampia-scelta-piante", title: "Ampia Scelta di Piante", shortDescription: "Piante autoctone, ornamentali e da frutto selezionate per il tuo territorio", fullDescription: "", order: 3, isActive: true },
  { _id: "4", slug: "trattamenti-curativi-nutrizionali", title: "Trattamenti Curativi e Nutrizionali", shortDescription: "Interventi biologici per la salute e la nutrizione delle piante", fullDescription: "", order: 4, isActive: true },
  { _id: "5", slug: "impianti-irrigazione", title: "Impianti di Irrigazione", shortDescription: "Sistemi di irrigazione efficienti per ridurre sprechi e consumi idrici", fullDescription: "", order: 5, isActive: true },
  { _id: "6", slug: "camminamenti-muretti-pietra", title: "Posa Camminamenti e Muretti in Pietra", shortDescription: "Realizzazione di percorsi e muretti con materiali naturali e locali", fullDescription: "", order: 6, isActive: true },
  { _id: "7", slug: "illuminazione-esterni", title: "Illuminazione per Esterni", shortDescription: "Soluzioni luminose a basso consumo per valorizzare gli spazi verdi", fullDescription: "", order: 7, isActive: true },
  { _id: "8", slug: "ingegneria-naturalistica", title: "Ingegneria Naturalistica", shortDescription: "Tecniche di consolidamento e recupero ambientale con metodi naturali", fullDescription: "", order: 8, isActive: true },
  { _id: "9", slug: "arredamento-esterni", title: "Arredamento per Esterni", shortDescription: "Arredi e complementi sostenibili per vivere al meglio il tuo giardino", fullDescription: "", order: 9, isActive: true },
  { _id: "10", slug: "potatura-professionale", title: "Potature e Abbattimenti in Quota", shortDescription: "Potatura e abbattimento controllato con tecniche di tree climbing", fullDescription: "", order: 10, isActive: true },
  { _id: "11", slug: "rigenerazione-terreni", title: "Rigenerazione dei Terreni", shortDescription: "Metodologie biodinamiche per rigenerare suoli impoveriti e compattati", fullDescription: "", order: 11, isActive: true },
  { _id: "12", slug: "manutenzione-sostenibile", title: "Manutenzioni", shortDescription: "Cura del verde con metodi naturali e biodinamici durante tutto l'anno", fullDescription: "", order: 12, isActive: true },
];

export const serviceImages: Record<string, string> = {
  "progettazione-giardini-orti": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
  "realizzazione-chiavi-in-mano": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "ampia-scelta-piante": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  "trattamenti-curativi-nutrizionali": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  "impianti-irrigazione": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800&q=80",
  "camminamenti-muretti-pietra": "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
  "illuminazione-esterni": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  "ingegneria-naturalistica": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  "arredamento-esterni": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800&q=80",
  "potatura-professionale": "https://images.unsplash.com/photo-1542273917363-1f3e45e3a1d4?w=800&q=80",
  "rigenerazione-terreni": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
  "manutenzione-sostenibile": "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?w=800&q=80",
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
