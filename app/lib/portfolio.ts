export interface PortfolioProject {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  location: string;
  duration: string;
  completedAt: string;
  services: string[];
  gallery: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "giardino-biodinamico-villa-monferrato",
    title: "Giardino Biodinamico - Villa Monferrato",
    excerpt:
      "Trasformazione completa di un terreno incolto di 800 mq in un giardino biodinamico con orto sinergico, percorsi in pietra naturale e area relax immersa nel verde.",
    content: `
Un progetto ambizioso che ha trasformato completamente uno spazio verde trascurato in un ecosistema vivente. La proprietaria desiderava un giardino che rispettasse i principi della biodinamica, producesse ortaggi sani e offrisse un rifugio di pace.

## La Sfida

Il terreno presentava diverse criticita:

- Suolo impoverito dopo anni di abbandono
- Pendenza del 15% nella zona sud
- Presenza di infestanti persistenti
- Esposizione mista sole/ombra

## Il Nostro Approccio

Abbiamo iniziato con un'analisi approfondita del terreno e della sua microbiologia. Attraverso tecniche di rigenerazione del suolo e sovescio, abbiamo ripristinato la fertilita naturale in soli 4 mesi.

### Zona Orto Sinergico

L'orto occupa circa 120 mq ed e organizzato in bancali rialzati seguendo i principi dell'agricoltura sinergica. Le consociazioni di piante sono state studiate per massimizzare la resa e minimizzare i parassiti senza alcun prodotto chimico.

### Giardino Ornamentale

Il giardino principale presenta un mix di piante autoctone e mediterranee selezionate per garantire fioriture scalari durante tutto l'anno. Lavanda, rosmarino, salvie ornamentali e graminacee creano un paesaggio naturale e a bassa manutenzione.

### Area Relax

Un pergolato in legno di castagno locale, circondato da gelsomini e rose rampicanti, offre un angolo di ombra e tranquillita con vista sulla campagna del Monferrato.

## Risultati

Il giardino oggi e un ecosistema autosufficiente che richiede interventi minimi. La biodiversita e aumentata con la presenza stabile di farfalle, api e uccelli.
    `,
    coverImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
    category: "Giardino Completo",
    location: "Monferrato, Piemonte",
    duration: "6 mesi",
    completedAt: "2024-06",
    services: [
      "Progettazione",
      "Rigenerazione Terreni",
      "Realizzazione Chiavi in Mano",
      "Impianto Irrigazione",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    ],
  },
  {
    slug: "terrazza-sostenibile-milano",
    title: "Terrazza Verde Sostenibile - Milano Centro",
    excerpt:
      "Progettazione e realizzazione di una terrazza urbana di 50 mq con giardino pensile, irrigazione smart e illuminazione scenografica a basso consumo.",
    content: `
Un progetto di verde pensile nel cuore di Milano che ha trasformato una terrazza spoglia in un'oasi urbana. Il committente cercava uno spazio intimo e rigoglioso, ma con esigenze di peso ridotto e manutenzione minima.

## La Sfida

Lavorare su una terrazza al quinto piano presenta vincoli specifici:

- Carico massimo strutturale limitato
- Esposizione a vento forte e sole diretto
- Necessita di impermeabilizzazione perfetta
- Accesso limitato per i materiali

## Il Nostro Approccio

Abbiamo progettato un sistema di substrato alleggerito con argilla espansa e terriccio specifico per verde pensile, rimanendo ben sotto i limiti di carico. Ogni vaso e fioriera e stata posizionata strategicamente per creare zone d'ombra naturali.

### Selezione Piante

Abbiamo scelto specie resistenti al vento e alla siccita:

- Graminacee ornamentali per movimento e leggerezza
- Ulivo nano come elemento focale
- Piante aromatiche mediterranee (timo, origano, menta)
- Rampicanti su grigliati per privacy e schermatura

### Sistema Irrigazione Smart

Un impianto a goccia con centralina Wi-Fi e sensori di umidita garantisce l'irrigazione ottimale anche durante le assenze prolungate, con un risparmio idrico del 45% rispetto all'irrigazione manuale.

### Illuminazione

Punti luce LED a incasso e strip light lungo i bordi creano un'atmosfera intima e accogliente nelle serate estive.

## Risultati

La terrazza e diventata la stanza preferita della casa. Le piante hanno attecchito al 100% e il sistema di irrigazione smart funziona in completa autonomia.
    `,
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    category: "Terrazza e Balcone",
    location: "Milano, Lombardia",
    duration: "3 mesi",
    completedAt: "2024-09",
    services: [
      "Progettazione",
      "Scelta Piante",
      "Impianto Irrigazione",
      "Illuminazione Esterni",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    ],
  },
  {
    slug: "recupero-parco-storico-lago-maggiore",
    title: "Recupero Parco Storico - Lago Maggiore",
    excerpt:
      "Restauro conservativo di un parco storico di 2000 mq con potature arboree specializzate, ripristino dei camminamenti originali in pietra e nuove piantumazioni autoctone.",
    content: `
Un intervento di recupero e valorizzazione di un parco ottocentesco sulle rive del Lago Maggiore, con alberi secolari, camminamenti storici e un sistema idrico naturale. Il proprietario voleva preservare l'anima storica del parco, migliorandone la fruibilita e la sicurezza.

## La Sfida

Il parco presentava segni evidenti di trascuratezza:

- Alberi secolari con rami pericolanti
- Camminamenti in pietra dissestati e coperti di muschio
- Sistema di drenaggio intasato
- Specie invasive che soffocavano le piante originali

## Il Nostro Approccio

Abbiamo lavorato in stretta collaborazione con la Soprintendenza per rispettare i vincoli paesaggistici. Ogni intervento e stato documentato e approvato prima dell'esecuzione.

### Cura degli Alberi Secolari

I nostri arboricoltori certificati hanno operato in tree climbing su querce, tigli e ippocastani centenari. Le potature conservative hanno rimosso rami secchi e pericolanti preservando la forma naturale delle chiome.

### Restauro Camminamenti

I camminamenti originali in porfido e beola sono stati smontati, catalogati e riposati su un nuovo sottofondo drenante. Le pietre mancanti sono state sostituite con materiale compatibile proveniente da cave locali.

### Nuove Piantumazioni

Nelle zone dove le specie invasive erano state rimosse, abbiamo reintrodotto piante autoctone coerenti con il progetto originale del parco: ortensie, camelie, azalee e felci arboree.

### Ingegneria Naturalistica

Le sponde del ruscello interno sono state consolidate con tecniche di bioingegneria: fascinate vive, palificate e talee di salice per prevenire l'erosione in modo naturale e duraturo.

## Risultati

Il parco ha ritrovato il suo splendore storico, con alberi sani, percorsi sicuri e una biodiversita rinnovata. Il proprietario organizza ora visite guidate aperte al pubblico durante le giornate FAI.
    `,
    coverImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
    category: "Restauro e Recupero",
    location: "Lago Maggiore, Piemonte",
    duration: "8 mesi",
    completedAt: "2024-03",
    services: [
      "Potatura Professionale",
      "Camminamenti in Pietra",
      "Ingegneria Naturalistica",
      "Scelta Piante",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
    ],
  },
];

export function getPortfolioProject(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string): PortfolioProject[] {
  return portfolioProjects
    .filter((project) => project.slug !== currentSlug)
    .slice(0, 2);
}
