export interface BarbaraReview {
  id: string;
  author: string;
  role?: string;
  text: string;
  rating: number;
  source: "google" | "website" | "direct";
  highlight: string;
  date: string;
}

export const barbaraReviews: BarbaraReview[] = [
  {
    id: "nutrix-revolution-2024-06",
    author: "NutriX Revolution",
    role: "Azienda agricola, Piemonte",
    text: "Quando Andrea parla di amore per la Terra e per la Natura non e uno slogan: nel nostro terreno ha fatto analisi del suolo, ridotto i passaggi inutili e ricalibrato l'irrigazione a settori. In piena estate le piante sono rimaste stabili con meno acqua e meno corse dell'ultimo minuto.",
    rating: 5,
    source: "google",
    highlight: "Amore per la Terra e per la Natura",
    date: "2024-06-14",
  },
  {
    id: "s-coppola-2024-05",
    author: "S. Coppola",
    role: "Privato, Torino",
    text: "Ci ha aiutati a curare rose e agrumi senza l'uso della chimica, partendo da drenaggio e qualita del suolo prima di qualsiasi trattamento. In due mesi abbiamo ridotto afidi e clorosi e non rifacciamo piu interventi ogni settimana.",
    rating: 5,
    source: "website",
    highlight: "Senza l'uso della chimica",
    date: "2024-05-03",
  },
  {
    id: "r-giardino-2024-09",
    author: "R. Giardino",
    role: "Condominio Residenza Verde, Torino",
    text: "Siamo stati seguiti nei dettagli: sopralluogo tecnico, calendario potature in quota e comunicazione ai residenti con tempi chiari. Area messa in sicurezza, lavori puliti e budget rispettato fase per fase.",
    rating: 5,
    source: "google",
    highlight: "Seguito nei dettagli",
    date: "2024-09-19",
  },
  {
    id: "s-delpiano-2024-07",
    author: "S. Delpiano",
    role: "Privato, Chieri",
    text: "Competenza e correttezza rare: invece di rifare tutto subito ci ha proposto una riqualificazione a step, con priorita vere. Ha valorizzato l'estetica scegliendo specie adatte al caldo e ci ha fatto spendere poco rispetto al preventivo iniziale.",
    rating: 5,
    source: "website",
    highlight: "Competenza e correttezza rare",
    date: "2024-07-08",
  },
  {
    id: "famiglia-bonetti-2025-03",
    author: "Famiglia Bonetti",
    role: "Privato, Pino Torinese",
    text: "Ogni agosto il prato si bruciava e la bolletta acqua saliva. Con rigenerazione del suolo e irrigazione smart tarata su esposizione, oggi consumiamo meno e il giardino resta ordinato anche durante le ferie.",
    rating: 5,
    source: "direct",
    highlight: "Irrigazione smart tarata sull'esposizione",
    date: "2025-03-22",
  },
  {
    id: "studio-esse-2025-04",
    author: "Studio ESSE Immobiliare",
    role: "Azienda, Torino",
    text: "Avevamo tre fornitori e nessun coordinamento: ritardi continui e costi poco chiari. Con un referente unico abbiamo avuto cronoprogramma, cantiere ordinato e interventi specializzati solo quando servivano.",
    rating: 4,
    source: "direct",
    highlight: "Un referente unico e cronoprogramma chiaro",
    date: "2025-04-11",
  },
  {
    id: "condominio-parco-po-2025-10",
    author: "Condominio Parco Po",
    role: "Condominio, Torino",
    text: "Gli alberi erano anni senza controllo e i percorsi si stavano deformando. Hanno eseguito verifica, potature tree climbing e ripristino delle zone critiche: oggi abbiamo meno rischio e manutenzione programmata invece di emergenze.",
    rating: 5,
    source: "google",
    highlight: "Meno emergenze, piu programma",
    date: "2025-10-02",
  },
  {
    id: "cascina-san-vito-2025-06",
    author: "Cascina San Vito",
    role: "Struttura ricettiva, Collina Torinese",
    text: "Per la struttura avevamo problemi su irrigazione e gestione dei punti acqua nelle aree comuni. Hanno semplificato impianto e manutenzione, con risultato visibile agli ospiti e tempi di gestione dimezzati per il nostro staff.",
    rating: 4,
    source: "website",
    highlight: "Gestione dimezzata per lo staff",
    date: "2025-06-27",
  },
];
