export interface BarbaraServizio {
  slug: string;
  title: string;
  category: "verde-sostenibile" | "outdoor-living" | "acqua-benessere";
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  idealFor: string;
  pricingHint: string;
  icon: string;
  relatedServices: string[];
}

export const barbaraServizi: BarbaraServizio[] = [
  {
    slug: "progettazione-giardini",
    title: "Progettazione giardini",
    category: "verde-sostenibile",
    shortDescription:
      "Progettiamo giardini e terrazzi partendo da uso reale, suolo e acqua. Ogni scelta e motivata, cosi il progetto resta gestibile anche dopo la consegna.",
    longDescription:
      "La progettazione inizia con un sopralluogo tecnico: ascoltiamo obiettivi, leggiamo esposizione, microclima, qualita del suolo e vincoli di accesso. Questo passaggio serve perche il progetto deve funzionare nel luogo reale, non solo in render.\n\nDefiniamo schema degli spazi, palette vegetale, logica idrica e materiali in base a manutenzione disponibile e budget. Ogni scelta viene spiegata con alternative e pro/contro, perche decidere in modo consapevole evita ripensamenti costosi.\n\nChiudiamo con un piano lavori a fasi, cosi sai cosa fare prima, cosa puo attendere e come distribuire l'investimento. Il risultato e un progetto bello ma soprattutto praticabile nel tempo.",
    benefits: [
      "Priorita chiare prima di spendere",
      "Specie e materiali adatti a esposizione e microclima",
      "Meno rifacimenti nei primi anni",
      "Base tecnica condivisibile con tutti i partner di cantiere",
    ],
    idealFor: "Ideale per chi parte da zero o vuole riqualificare senza andare a tentativi.",
    pricingHint: "Da sopralluogo",
    icon: "PenTool",
    relatedServices: [
      "realizzazione-riqualificazione",
      "rigenerazione-suolo",
      "irrigazione-smart",
    ],
  },
  {
    slug: "realizzazione-riqualificazione",
    title: "Realizzazione e riqualificazione",
    category: "verde-sostenibile",
    shortDescription:
      "Trasformiamo il progetto in cantiere ordinato, con regia unica e fasi controllate. Nei giardini esistenti interveniamo per priorita, cosi ogni euro produce un miglioramento stabile.",
    longDescription:
      "In realizzazione seguiamo preparazioni del suolo, impianti, messa a dimora e finiture con una sequenza precisa. Questa sequenza e importante perche evita sovrapposizioni tra lavorazioni e riduce tempi morti in cantiere.\n\nNelle riqualificazioni non demoliamo tutto per principio: analizziamo cosa salvare, cosa correggere e cosa sostituire. Cosi si riducono sprechi e si mantiene continuita con lo spazio gia vissuto.\n\nOgni fase viene chiusa con verifica tecnica e passaggio condiviso con il cliente. Il vantaggio pratico e avere controllo su qualita, tempi e costo reale prima di passare allo step successivo.",
    benefits: [
      "Cantiere coordinato da un solo referente",
      "Interventi a step con budget leggibile",
      "Riduzione di errori tra suolo, impianti e verde",
      "Consegna piu stabile nei primi mesi",
    ],
    idealFor: "Ideale per chi vuole rifare o recuperare il giardino senza caos operativo.",
    pricingHint: "Su preventivo a fasi",
    icon: "Shovel",
    relatedServices: [
      "progettazione-giardini",
      "manutenzione-programmata",
      "pavimentazioni-percorsi",
    ],
  },
  {
    slug: "manutenzione-programmata",
    title: "Manutenzione programmata",
    category: "verde-sostenibile",
    shortDescription:
      "Un calendario tecnico sostituisce le urgenze. Interventi mirati, tempi chiari e monitoraggio periodico tengono il verde stabile stagione dopo stagione.",
    longDescription:
      "La manutenzione programmata evita il modello a chiamata, che spesso arriva quando il danno e gia in corso. Pianificare significa intervenire prima, con costi piu bassi e scelte piu efficaci.\n\nCostruiamo piani diversi per privati, condomini e aziende: potature, controllo fitosanitario, gestione irrigazione, nutrizione del suolo e verifiche di sicurezza. La frequenza dipende da uso dello spazio e criticita reali, non da pacchetti rigidi.\n\nDopo ogni visita lasciamo un report sintetico con priorita e prossimi passi. Questo e utile perche rende tracciabile il lavoro e permette di decidere con dati, non in emergenza.",
    benefits: [
      "Meno interventi d'urgenza",
      "Costi annuali piu prevedibili",
      "Giardino piu ordinato durante tutto l'anno",
      "Storico tecnico utile per decisioni future",
    ],
    idealFor: "Ideale per chi vuole continuita senza rincorrere problemi ogni mese.",
    pricingHint: "Canone mensile o stagionale",
    icon: "CalendarCheck",
    relatedServices: [
      "rigenerazione-suolo",
      "irrigazione-smart",
      "potature-tree-climbing",
    ],
  },
  {
    slug: "rigenerazione-suolo",
    title: "Rigenerazione suolo",
    category: "verde-sostenibile",
    shortDescription:
      "Quando il terreno e stanco, il resto del progetto fatica. Rigeneriamo struttura e fertilita del suolo per ridurre sostituzioni piante e irrigazioni eccessive.",
    longDescription:
      "Un suolo compattato o povero blocca radici, assorbimento idrico e vitalita biologica. Per questo la rigenerazione viene prima di molte scelte estetiche: senza base viva, il risultato non regge.\n\nInterveniamo con decompattazione, ammendanti organici, gestione della sostanza organica e correzioni mirate in base al contesto. L'approccio e biodinamico e pragmatico: usiamo quello che serve, evitando trattamenti inutili.\n\nDefiniamo poi un piano di mantenimento con pacciamatura e pratiche stagionali. In questo modo il suolo continua a migliorare e le piante lavorano in equilibrio, non in sopravvivenza.",
    benefits: [
      "Migliore ritenzione idrica del terreno",
      "Radicazione piu stabile delle nuove piante",
      "Riduzione di stress e ingiallimenti estivi",
      "Meno necessita di sostituzioni frequenti",
    ],
    idealFor: "Ideale per chi ha aree compattate, piante deboli o prato che degrada ogni estate.",
    pricingHint: "Da sopralluogo",
    icon: "Sprout",
    relatedServices: [
      "progettazione-giardini",
      "irrigazione-smart",
      "manutenzione-programmata",
    ],
  },
  {
    slug: "irrigazione-smart",
    title: "Irrigazione smart",
    category: "verde-sostenibile",
    shortDescription:
      "Ottimizziamo impianti nuovi o esistenti con zone, tempi e portate coerenti. Obiettivo: meno sprechi e piante piu stabili nei mesi caldi.",
    longDescription:
      "L'acqua va distribuita in base a esposizione, tipologia di piante e tessitura del suolo. Un impianto uniforme su tutto il giardino spreca dove non serve e manca dove serve di piu.\n\nRiprogettiamo settori, ugelli e gocciolatori, inserendo quando utile sensori meteo e controllo remoto. Il perche e semplice: calibrare una volta bene riduce interventi ripetuti ogni estate.\n\nDopo l'avvio facciamo collaudo e regolazioni stagionali, cosi il sistema resta efficiente nel tempo. Non vendiamo centraline per moda, ma assetto idrico adatto al contesto reale.",
    benefits: [
      "Riduzione dei consumi idrici",
      "Meno zone secche o sovra-irrorate",
      "Programmazione adattata alle stagioni",
      "Maggiore continuita durante ferie e assenze",
    ],
    idealFor: "Ideale per chi ha bollette alte, zone disomogenee o impianti mai tarati.",
    pricingHint: "Da audit impianto",
    icon: "Droplets",
    relatedServices: [
      "rigenerazione-suolo",
      "manutenzione-programmata",
      "progettazione-giardini",
    ],
  },
  {
    slug: "potature-tree-climbing",
    title: "Potature e tree climbing",
    category: "verde-sostenibile",
    shortDescription:
      "Potature tecniche e lavori in quota con criteri di sicurezza e fisiologia vegetale. Tagliamo il necessario, nel periodo corretto, perche la pianta deve restare stabile nel tempo.",
    longDescription:
      "Potare non significa ridurre volume a vista: significa gestire struttura, sicurezza e salute della pianta. Interveniamo con valutazione preliminare per evitare tagli che indeboliscono o stimolano ricacci problematici.\n\nCon tree climbing operiamo in contesti dove piattaforme non sono adatte, riducendo impatto su suolo e aree sensibili. Questo approccio e utile in condomini, cortili stretti e giardini maturi con accessi complessi.\n\nA fine intervento definiamo monitoraggio e prossima finestra utile di manutenzione. Cosi si passa da potatura emergenziale a gestione preventiva, con costi piu razionali.",
    benefits: [
      "Maggiore sicurezza in aree frequentate",
      "Tagli coerenti con fisiologia della pianta",
      "Intervento possibile anche in spazi difficili",
      "Pianificazione delle prossime potature",
    ],
    idealFor: "Ideale per chi ha alberi maturi, accessi complessi o necessita di messa in sicurezza.",
    pricingHint: "Su preventivo tecnico",
    icon: "TreePine",
    relatedServices: [
      "manutenzione-programmata",
      "realizzazione-riqualificazione",
      "rigenerazione-suolo",
    ],
  },
  {
    slug: "pavimentazioni-percorsi",
    title: "Pavimentazioni e percorsi",
    category: "outdoor-living",
    shortDescription:
      "Disegniamo percorsi che migliorano uso, drenaggio e continuita del progetto verde. Materiali e quote sono scelti per durare e richiedere poca manutenzione.",
    longDescription:
      "Percorsi e pavimentazioni non sono un dettaglio finale: guidano movimenti, raccolta delle acque e accessibilita dello spazio. Per questo li progettiamo insieme al verde e non come elemento separato.\n\nScegliamo materiali in base a esposizione, carico, pendenza e contesto estetico. La scelta corretta evita cedimenti, ristagni e manutenzioni frequenti che spesso compaiono dopo il primo inverno.\n\nCoordiniamo quote e raccordi con impianti e aree vegetate, cosi il cantiere resta coerente. Il vantaggio e pratico: comfort quotidiano e meno costi di ripristino nel tempo.",
    benefits: [
      "Migliore accessibilita degli spazi esterni",
      "Minore rischio di ristagni e cedimenti",
      "Materiali coerenti con uso e manutenzione",
      "Integrazione ordinata con verde e impianti",
    ],
    idealFor: "Ideale per chi vuole rendere il giardino piu fruibile tutto l'anno.",
    pricingHint: "Su preventivo",
    icon: "Route",
    relatedServices: [
      "realizzazione-riqualificazione",
      "illuminazione-esterna",
      "arredi-outdoor",
    ],
  },
  {
    slug: "illuminazione-esterna",
    title: "Illuminazione esterna",
    category: "outdoor-living",
    shortDescription:
      "Progettiamo luce esterna per sicurezza, orientamento e atmosfera, senza eccessi. Punti luce, ottiche e consumi sono calibrati sugli usi reali dello spazio.",
    longDescription:
      "Una buona illuminazione esterna deve prima di tutto rendere sicuri i percorsi e leggibili gli accessi. Solo dopo valorizza volumi, piante e materiali. Questo ordine serve perche la luce e un dispositivo funzionale prima che decorativo.\n\nStudiamo livelli luminosi, schermature antiabbagliamento, gestione a scene e tecnologia a basso consumo. Cosi si evita il classico effetto di zone sovrailluminate e angoli bui che riducono comfort e sicurezza.\n\nCoordiniamo impianto con irrigazione e arredi per limitare interferenze in cantiere. Il risultato e una luce utile ogni sera, con costi energetici controllati.",
    benefits: [
      "Percorsi e ingressi piu sicuri",
      "Riduzione consumi grazie a punti luce efficienti",
      "Atmosfera coerente con stile del giardino",
      "Manutenzione impianto semplificata",
    ],
    idealFor: "Ideale per chi usa il giardino la sera e vuole comfort senza sprechi energetici.",
    pricingHint: "Da progetto illuminotecnico",
    icon: "Lightbulb",
    relatedServices: [
      "pavimentazioni-percorsi",
      "arredi-outdoor",
      "realizzazione-riqualificazione",
    ],
  },
  {
    slug: "arredi-outdoor",
    title: "Arredi outdoor",
    category: "outdoor-living",
    shortDescription:
      "Selezioniamo e coordiniamo arredi esterni in partnership, mantenendo regia unica. L'obiettivo e avere uno spazio bello ma soprattutto comodo da vivere e da mantenere.",
    longDescription:
      "L'arredo outdoor funziona quando e coerente con percorsi, ombre, illuminazione e manutenzione prevista. Inserire elementi senza un disegno generale produce spazi belli in foto ma scomodi nell'uso quotidiano.\n\nDefiniamo ingombri, materiali e posizionamenti in relazione a sole, vento e gestione stagionale. Questo evita deterioramenti precoci e spostamenti continui dopo la consegna.\n\nCon i partner curiamo fornitura e installazione, mantenendo un solo referente per il cliente. Cosi decisioni e varianti restano ordinate e il risultato finale resta coerente con il progetto verde.",
    benefits: [
      "Spazi esterni piu comodi e funzionali",
      "Materiali adatti a esposizione e uso intensivo",
      "Coordinamento unico con partner selezionati",
      "Meno sostituzioni dovute a scelte incoerenti",
    ],
    idealFor: "Ideale per chi vuole vivere davvero lo spazio esterno, non solo arredarlo.",
    pricingHint: "Su preventivo in partnership",
    icon: "Armchair",
    relatedServices: [
      "pavimentazioni-percorsi",
      "illuminazione-esterna",
      "progettazione-giardini",
    ],
  },
  {
    slug: "punti-acqua-laghetti",
    title: "Punti acqua e laghetti",
    category: "acqua-benessere",
    shortDescription:
      "Inseriamo acqua nel paesaggio con soluzioni sostenibili e gestibili. Ogni elemento viene dimensionato per evitare ristagni, sprechi e manutenzioni ingestibili.",
    longDescription:
      "Un punto acqua ben progettato migliora microclima, qualita percepita dello spazio e biodiversita utile. Ma funziona solo se ricircolo, profondita e sicurezza sono calibrati sul contesto reale.\n\nValutiamo struttura, filtrazione, gestione alghe e integrazione con vegetazione circostante. Questo approccio e necessario perche un elemento acqua senza piano tecnico diventa presto un costo imprevisto.\n\nDefiniamo infine una manutenzione stagionale semplice e replicabile. Cosi il risultato resta stabile e l'acqua rimane una risorsa estetica e funzionale, non una criticita.",
    benefits: [
      "Miglioramento del comfort microclimatico",
      "Integrazione paesaggistica con il verde",
      "Gestione alghe e qualita acqua pianificata",
      "Aumento della biodiversita locale",
    ],
    idealFor: "Ideale per chi vuole inserire acqua nel progetto senza complicare la gestione.",
    pricingHint: "Da fattibilita tecnica",
    icon: "Waves",
    relatedServices: [
      "progettazione-giardini",
      "rigenerazione-suolo",
      "biopiscine",
    ],
  },
  {
    slug: "piscine",
    title: "Piscine",
    category: "acqua-benessere",
    shortDescription:
      "Coordiniamo piscine in partnership come parte di un progetto unico. Non e un accessorio separato: quote, percorsi e verde devono dialogare per evitare extracosti futuri.",
    longDescription:
      "Una piscina funziona quando e progettata insieme al giardino, non aggiunta a fine lavori. Questo perche impianti, drenaggi, accessi tecnici e aree di sosta influenzano tutto il layout esterno.\n\nGestiamo partner specializzati mantenendo una regia unica su tempi, priorita e integrazione estetica. Il cliente ha un referente solo e puo valutare varianti con impatto reale su costi e tempi.\n\nDefiniamo anche fabbisogni di manutenzione e gestione stagionale, cosi il costo di esercizio e chiaro fin dall'inizio. L'obiettivo e evitare sorprese dopo la consegna.",
    benefits: [
      "Regia unica tra partner e cantiere",
      "Integrazione con verde e percorsi esterni",
      "Tempi e varianti sotto controllo",
      "Maggiore chiarezza sui costi di gestione",
    ],
    idealFor: "Ideale per chi vuole una piscina ben integrata senza gestire fornitori multipli.",
    pricingHint: "Su progetto con partner",
    icon: "Droplets",
    relatedServices: [
      "pavimentazioni-percorsi",
      "illuminazione-esterna",
      "arredi-outdoor",
    ],
  },
  {
    slug: "biopiscine",
    title: "Biopiscine",
    category: "acqua-benessere",
    shortDescription:
      "Progettiamo biopiscine con equilibrio tra balneazione e fitodepurazione. Soluzione adatta a chi cerca acqua viva, meno chimica e gestione consapevole.",
    longDescription:
      "La biopiscina combina area di balneazione e area di rigenerazione biologica dell'acqua. Funziona quando superfici, ricircolo e vegetazione filtrante sono dimensionati correttamente fin dall'inizio.\n\nNon promettiamo zero manutenzione: richiede controlli e cure diverse da una piscina tradizionale. Il vantaggio e ridurre uso di chimica e integrare l'acqua in modo piu naturale nel paesaggio.\n\nCoordiniamo progettazione, partner tecnici e avviamento, mantenendo un unico piano operativo. Cosi il cliente sa prima cosa comporta la scelta e puo decidere con criteri chiari.",
    benefits: [
      "Riduzione dell'uso di chimica",
      "Integrazione paesaggistica ad alta qualita",
      "Supporto alla biodiversita locale",
      "Gestione tecnica chiara fin dalla fase di progetto",
    ],
    idealFor: "Ideale per chi vuole acqua balneabile con approccio naturale e metodo tecnico.",
    pricingHint: "Da studio preliminare",
    icon: "Leaf",
    relatedServices: [
      "punti-acqua-laghetti",
      "progettazione-giardini",
      "manutenzione-programmata",
    ],
  },
];
