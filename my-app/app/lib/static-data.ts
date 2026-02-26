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
  { _id: "1", slug: "progettazione-giardini", title: "Progettazione Giardini", shortDescription: "Progettiamo giardini e terrazzi partendo da uso reale, suolo e acqua. Ogni scelta è motivata, così il progetto resta gestibile anche dopo la consegna.", fullDescription: "", order: 1, isActive: true },
  { _id: "2", slug: "realizzazione-giardini", title: "Realizzazione Giardini", shortDescription: "Trasformiamo il progetto in cantiere ordinato, con regia unica e fasi controllate. Nei giardini esistenti interveniamo per priorità, così ogni euro produce un miglioramento stabile.", fullDescription: "", order: 2, isActive: true },
  { _id: "3", slug: "scelta-piante", title: "Ampia Scelta di Piante", shortDescription: "Piante autoctone, ornamentali e da frutto selezionate per il tuo territorio", fullDescription: "", order: 3, isActive: true },
  { _id: "4", slug: "trattamenti-piante", title: "Trattamenti Curativi e Nutrizionali", shortDescription: "Interventi biologici per la salute e la nutrizione delle piante", fullDescription: "", order: 4, isActive: true },
  { _id: "5", slug: "impianti-irrigazione", title: "Impianti di Irrigazione", shortDescription: "Ottimizziamo impianti nuovi o esistenti con zone, tempi e portate coerenti. Obiettivo: meno sprechi e piante più stabili nei mesi caldi.", fullDescription: "", order: 5, isActive: true },
  { _id: "6", slug: "camminamenti-pietra", title: "Posa Camminamenti e Muretti in Pietra", shortDescription: "Disegniamo percorsi che migliorano uso, drenaggio e continuità del progetto verde. Materiali e quote sono scelti per durare e richiedere poca manutenzione.", fullDescription: "", order: 6, isActive: true },
  { _id: "7", slug: "illuminazione-esterni", title: "Illuminazione per Esterni", shortDescription: "Progettiamo luce esterna per sicurezza, orientamento e atmosfera, senza eccessi. Punti luce, ottiche e consumi sono calibrati sugli usi reali dello spazio.", fullDescription: "", order: 7, isActive: true },
  { _id: "8", slug: "ingegneria-naturalistica", title: "Ingegneria Naturalistica", shortDescription: "Tecniche di consolidamento e recupero ambientale con metodi naturali", fullDescription: "", order: 8, isActive: true },
  { _id: "9", slug: "arredamento-esterni", title: "Arredamento per Esterni", shortDescription: "Selezioniamo e coordiniamo arredi esterni in partnership, mantenendo regia unica. L'obiettivo è avere uno spazio bello ma soprattutto comodo da vivere e da mantenere.", fullDescription: "", order: 9, isActive: true },
  { _id: "10", slug: "potature", title: "Potature e Abbattimenti in Quota", shortDescription: "Potature tecniche e lavori in quota con criteri di sicurezza e fisiologia vegetale. Tagliamo il necessario, nel periodo corretto, perché la pianta deve restare stabile nel tempo.", fullDescription: "", order: 10, isActive: true },
  { _id: "11", slug: "rigenerazione-terreni", title: "Rigenerazione dei Terreni", shortDescription: "Quando il terreno è stanco, il resto del progetto fatica. Rigeneriamo struttura e fertilità del suolo per ridurre sostituzioni piante e irrigazioni eccessive.", fullDescription: "", order: 11, isActive: true },
  { _id: "12", slug: "manutenzioni", title: "Manutenzioni", shortDescription: "Un calendario tecnico sostituisce le urgenze. Interventi mirati, tempi chiari e monitoraggio periodico tengono il verde stabile stagione dopo stagione.", fullDescription: "", order: 12, isActive: true },
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

// Recensioni statiche di fallback (Barbara copy)
export const staticReviews: {
  _id: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  text: string;
  serviceSlug: string;
  isApproved: boolean;
}[] = [
  { _id: "br1", authorName: "NutriX Revolution", authorLocation: "Azienda agricola, Piemonte", rating: 5, text: "Quando Andrea parla di amore per la Terra e per la Natura non è uno slogan: nel nostro terreno ha fatto analisi del suolo, ridotto i passaggi inutili e ricalibrato l'irrigazione a settori. In piena estate le piante sono rimaste stabili con meno acqua e meno corse dell'ultimo minuto.", serviceSlug: "rigenerazione-terreni", isApproved: true },
  { _id: "br2", authorName: "S. Coppola", authorLocation: "Privato, Torino", rating: 5, text: "Ci ha aiutati a curare rose e agrumi senza l'uso della chimica, partendo da drenaggio e qualità del suolo prima di qualsiasi trattamento. In due mesi abbiamo ridotto afidi e clorosi e non rifacciamo più interventi ogni settimana.", serviceSlug: "trattamenti-piante", isApproved: true },
  { _id: "br3", authorName: "R. Giardino", authorLocation: "Condominio Residenza Verde, Torino", rating: 5, text: "Siamo stati seguiti nei dettagli: sopralluogo tecnico, calendario potature in quota e comunicazione ai residenti con tempi chiari. Area messa in sicurezza, lavori puliti e budget rispettato fase per fase.", serviceSlug: "potature", isApproved: true },
  { _id: "br4", authorName: "S. Delpiano", authorLocation: "Privato, Chieri", rating: 5, text: "Competenza e correttezza rare: invece di rifare tutto subito ci ha proposto una riqualificazione a step, con priorità vere. Ha valorizzato l'estetica scegliendo specie adatte al caldo e ci ha fatto spendere poco rispetto al preventivo iniziale.", serviceSlug: "realizzazione-giardini", isApproved: true },
  { _id: "br5", authorName: "Famiglia Bonetti", authorLocation: "Privato, Pino Torinese", rating: 5, text: "Ogni agosto il prato si bruciava e la bolletta acqua saliva. Con rigenerazione del suolo e irrigazione smart tarata su esposizione, oggi consumiamo meno e il giardino resta ordinato anche durante le ferie.", serviceSlug: "impianti-irrigazione", isApproved: true },
  { _id: "br6", authorName: "M. Ferraris", authorLocation: "Agriturismo, Monferrato", rating: 5, text: "Abbiamo affidato la gestione del verde esterno e delle aree comuni a Visione Sostenibile. Calendario stagionale, interventi puntuali, una sola fattura e nessuna sorpresa. Per un'attività ricettiva è esattamente quello che serve.", serviceSlug: "manutenzioni", isApproved: true },
];
