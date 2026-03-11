export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceSupportPanel = {
  title: string;
  subtitle?: string;
  items?: string[];
  paragraphs?: string[];
};

export type ServiceDetailCopy = {
  summary: string;
  introTitle: string;
  introSubtitle?: string;
  introParagraphs: string[];
  primaryTitle: string;
  primarySubtitle?: string;
  primaryItems: string[];
  panels?: ServiceSupportPanel[];
  microCta: string;
  closingLine?: string;
  faqs?: ServiceFaq[];
};

export const serviceDetailCopyBySlug: Record<string, ServiceDetailCopy> = {
  "progettazione-giardini": {
    summary: "Bellezza, gestione e durata su misura per te.",
    introTitle: "BELLEZZA, GESTIONE E DURATA",
    introSubtitle: "su misura per te",
    introParagraphs: [
      "Progettiamo giardini e terrazzi sostenibili partendo da ciò che conta davvero: come vuoi vivere lo spazio, quanta manutenzione vuoi (o non vuoi) e cosa può reggere nel tempo.",
      "Ti guidiamo nelle scelte con un metodo chiaro: piante, suolo, acqua, percorsi e funzioni.",
      "Per rendere tutto concreto, realizziamo un rendering fotografico e, quando serve, un progetto 3D. La nostra progettazione ha come obiettivo che per i prossimi 20 anni tu non debba più preoccuparti per il tuo giardino, dovrai soltanto viverlo.",
    ],
    primaryTitle: "COSA INCLUDE IL SERVIZIO",
    primarySubtitle: "tutto chiaro, nessuna sorpresa",
    primaryItems: [
      "Analisi del contesto (esposizione, suolo, disponibilità idrica)",
      "Layout funzionale + selezione vegetale coerente",
      "Rendering / progetto 3D (in base alla complessità)",
    ],
    panels: [
      {
        title: "Per chi è",
        items: [
          "Privati: giardino, terrazzo, attico (anche piccoli spazi)",
          "Aziende / enti / condomìni: aree verdi, spazi rappresentativi, riqualificazioni",
        ],
      },
      {
        title: "Plus tecnico",
        paragraphs: [
          "Nel team c’è un architetto del paesaggio: per committenti pubblici il progetto può essere firmato e depositato.",
        ],
      },
    ],
    microCta: "Vuoi capire da dove partire? Prenota il Check-up Sostenibile.",
  },
  "realizzazione-giardini": {
    summary: "Uno per tutta la vita: dal progetto al cantiere, senza rimbalzi.",
    introTitle: "UNO PER TUTTA LA VITA",
    introSubtitle: "dal progetto al cantiere, senza rimbalzi",
    introParagraphs: [
      "La nostra filosofia è: bello, resistente, vivibile, fatto su misura. Realizziamo giardini e spazi outdoor, coordinando competenze e partner nel momento giusto.",
      "Possiamo partire da zero oppure intervenire su aree già esistenti con lavorazioni mirate, sempre al raggiungimento dell’obiettivo: ordine, durata e gestione sostenibile.",
      "A fine lavoro lasciamo lo spazio pulito e pronto da vivere, con tempi chiari e comunicazione semplice.",
    ],
    primaryTitle: "COSA REALIZZIAMO",
    primarySubtitle: "principali lavorazioni",
    primaryItems: [
      "Camminamenti e pavimentazioni esterne (pietra e materiali compatibili)",
      "Impianti di irrigazione centralizzati e ottimizzazione dell’acqua",
      "Aiuole a bassa manutenzione e composizioni vegetali sostenibili",
      "Illuminazione da esterno funzionale e scenografica",
      "Serbatoi e sistemi di recupero acque piovane",
      "Prato: semina o posa (in base al contesto e all’uso)",
      "Strutture e contenimenti: muretti, bordure, elementi tecnici",
      "Soluzioni alternative al prato (valutazione caso per caso): quando non è sostenibile tenere un prato naturale, proponiamo opzioni più adatte all’uso e alle condizioni dello spazio, come può esserlo il prato sintetico (anche la plastica, se riciclata e non sotterrata è una alternativa sostenibile).",
    ],
    panels: [
      {
        title: "Perché sceglierci",
        items: [
          "Professionalità e puntualità, tempi rispettati",
          "Cura dei dettagli e pulizia di fine lavoro",
          "Un unico referente che coordina le fasi e le competenze",
        ],
      },
    ],
    microCta: "Vuoi un servizio completo con scelte sensate? Prenota il Check-up Sostenibile.",
  },
  "scelta-piante": {
    summary: "La pianta giusta al posto giusto.",
    introTitle: "LA PIANTA GIUSTA AL POSTO GIUSTO",
    introParagraphs: [
      "Grazie ai vivai che abbiamo selezionato negli anni, abbiamo a disposizione qualsiasi esemplare arboreo: alto fusto, perenni, graminacee, arbustive, rampicanti. Abbiamo un vivaio interno dove coltiviamo molte delle cultivar più comuni e più utilizzate per i nostri lavori, senza prodotti di sintesi per la difesa e usando humus di lombrico prodotto da noi in modo naturale.",
      "Se cerchi piante particolari o esemplari di grandi dimensioni, ci appoggiamo a vivai di fiducia: selezioniamo piante sane, ben radicate e adatte al contesto.",
      "Perché un giardino sostenibile si costruisce anche così: dalla qualità di ciò che metti a dimora.",
    ],
    primaryTitle: "COSA SIGNIFICA PER TE",
    primarySubtitle: "scelta oculata per risultati senza sorprese",
    primaryItems: [
      "Piante più robuste e coerenti con suolo e microclima",
      "Meno stress da trapianto e avvio più stabile",
      "Scelta botanica orientata a bassa manutenzione (quando richiesta)",
    ],
    panels: [
      {
        title: "Dove è utile",
        items: [
          "Giardini privati, terrazzi e attici",
          "Aree verdi condominiali e aziendali",
          "Riqualificazioni e sostituzioni mirate",
        ],
      },
    ],
    microCta: "Vuoi scegliere le piante giuste senza andare “a gusto”? Prenota il Check-up Sostenibile.",
    closingLine: "Curiamo il tuo giardino dal primo germoglio — e lo facciamo durare.",
  },
  "trattamenti-piante": {
    summary: "Prevenzione, diagnosi e interventi mirati per riportare equilibrio.",
    introTitle: "VOGLIAMO BENE ALLE NOSTRE PIANTE",
    introSubtitle: "prevenzione, diagnosi, interventi mirati",
    introParagraphs: [
      "Anche le piante si ammalano, ma la soluzione migliore per evitarlo è la prevenzione. Oggi il verde è più esposto a stress: caldo, sbalzi climatici, suoli poveri, parassiti e patogeni.",
      "Per questo non lavoriamo “a tentativi”, osserviamo i segnali e interveniamo con un approccio preventivo e mirato, per riportare equilibrio e vitalità.",
      "Utilizziamo prodotti di origine naturale per nutrizione e difesa; nei casi complessi, ci affidiamo alla diagnosi del nostro entomologo/fitoiatra.",
    ],
    primaryTitle: "COSA FACCIAMO",
    primarySubtitle: "analisi, valutazione, cura",
    primaryItems: [
      "Trattamenti nutrizionali e biostimolanti di origine naturale",
      "Difesa naturale e strategie preventive",
      "Valutazione sintomi: stress idrico, deperimento, attacchi parassitari, malattie fungine",
      "Interventi su casi critici con supporto tecnico (fitoiatria/entomologia)",
    ],
    panels: [
      {
        title: "Per chi è",
        items: [
          "Giardini privati e terrazzi (piante ornamentali, siepi, alberature)",
          "Condomìni e aziende (aree verdi con criticità ricorrenti)",
          "Vivai, nuove messe a dimora e riqualificazioni",
        ],
      },
    ],
    microCta: "La tua pianta sta soffrendo? Inviaci una foto della tua pianta e una di una delle sue foglie per farci capire cosa sta succedendo: ti risponderemo entro 48 ore.",
  },
  "impianti-irrigazione": {
    summary: "L’acqua è un bene prezioso: va gestita con intelligenza.",
    introTitle: "L’ACQUA COME IL NOSTRO BENE PIÙ PREZIOSO",
    introSubtitle: "consapevolezza che cambia tutto",
    introParagraphs: [
      "L’acqua è vitale e oggi va gestita con intelligenza: superficie, specie, microclima e tempo reale a disposizione cambiano tutto. L’irrigazione deve essere mirata affinché a ogni pianta sia assicurato il giusto dosaggio. Noi progettiamo impianti di irrigazione su misura, integrati già in fase di progettazione o ottimizzati su giardini esistenti.",
      "Con il clima che alterna caldo estremo e lunghi periodi secchi, un impianto ben fatto non è un optional, è ciò che permette al verde di durare.",
    ],
    primaryTitle: "COSA FACCIAMO",
    primarySubtitle: "dopo un’analisi accurata",
    primaryItems: [
      "Progettazione e realizzazione di impianti di irrigazione per giardini e terrazzi",
      "Ottimizzazione di impianti esistenti (sprechi, zone secche, pressioni)",
      "Gestione intelligente: sensori e programmazione in base al bisogno reale",
    ],
    panels: [
      {
        title: "Tecnologia utilizzata",
        items: [
          "Centraline professionali con gestione da remoto Wi-Fi",
          "Sensori pioggia/umidità (l’impianto lavora solo quando serve)",
          "Irrigatori a basso consumo per ridurre sprechi e migliorare la copertura del suolo con l’effetto pioggia.",
        ],
      },
    ],
    microCta: "Vuoi capire quanta acqua serve davvero al tuo giardino? Prenota il Check-up Sostenibile.",
  },
  "camminamenti-pietra": {
    summary: "La natura che arreda la natura: percorsi, contenimenti, scalinate.",
    introTitle: "LA NATURA CHE ARREDA LA NATURA",
    introSubtitle: "percorsi, contenimenti, scalinate",
    introParagraphs: [
      "La pietra e il legno sono materie vive: collegano lo spazio al territorio e danno al giardino ordine, ritmo e durata. Nel team abbiamo posatori esperti per realizzare camminamenti, marciapiedi, scalinate e muretti (anche a secco), curando stabilità, drenaggi e finiture.",
      "Partiamo spesso da pietre locali come Luserna e Langarola, ma selezioniamo anche materiali da cave italiane, sempre in coerenza con stile e contesto.",
    ],
    primaryTitle: "COSA REALIZZIAMO",
    primarySubtitle: "la pietra che struttura e fa durare il progetto",
    primaryItems: [
      "Camminamenti e percorsi in pietra",
      "Muretti (a secco e tradizionali) e bordure",
      "Scalinate e collegamenti tra quote",
      "Soluzioni funzionali per drenaggio e sicurezza",
    ],
    panels: [
      {
        title: "Per chi è",
        items: [
          "Giardini privati e terrazzi (comfort + estetica)",
          "Condomìni, aziende e strutture ricettive (durabilità e ordine)",
        ],
      },
    ],
    microCta: "Vuoi scegliere materiali e percorsi senza errori? Prenota il Check-up Sostenibile.",
  },
  "illuminazione-esterni": {
    summary: "Creiamo atmosfera: luce che guida, accoglie e valorizza.",
    introTitle: "CREIAMO L’ATMOSFERA GIUSTA",
    introSubtitle: "luce che guida, accoglie e valorizza",
    introParagraphs: [
      "Un buon progetto luce trasforma il giardino quando cala la sera: aumenta comfort, sicurezza e atmosfera, senza eccessi.",
      "Studiamo l’illuminazione (grazie alla presenza di un elettricista professionista nel nostro team) in base a percorsi, ingressi, aree living e punti da valorizzare, scegliendo soluzioni coerenti per stile e utilizzo.",
      "Proponiamo sia impianti a corrente sia soluzioni solari dove hanno senso: l’obiettivo è luce utile, senza spreco.",
    ],
    primaryTitle: "COSA REALIZZIAMO",
    primarySubtitle: "la luce non è mai un dettaglio",
    primaryItems: [
      "Segnapassi e luce per camminamenti",
      "Punti luce perimetrali e aree living",
      "Applique e corpi illuminanti per facciate/ingressi",
      "Illuminazione funzionale per parcheggi (se necessario)",
    ],
    panels: [
      {
        title: "Scelte tecniche",
        items: [
          "Luce calda o fredda in base al contesto",
          "Posizionamenti anti-abbagliamento e distribuzione uniforme",
        ],
      },
    ],
    microCta: "Vuoi vivere il giardino anche la sera? Prenota il Check-up Sostenibile.",
  },
  "ingegneria-naturalistica": {
    summary: "Sostituiamo il cemento con materiali naturali.",
    introTitle: "SOSTITUIAMO IL CEMENTO CON MATERIALI NATURALI",
    introSubtitle: "contenimenti e stabilizzazioni",
    introParagraphs: [
      "Quando ci sono pendenze, scarpate o rive da mettere in sicurezza, preferiamo soluzioni che lavorano “con” il paesaggio.",
      "Realizziamo contenimenti in modo naturale, ad esempio con palizzate in castagno riempite e modellate per creare piani, recuperare superficie utile e stabilizzare aree critiche.",
      "Ogni intervento viene progettato e seguito da una figura professionale competente, con attenzione a stabilità, drenaggi e durata.",
    ],
    primaryTitle: "COSA FACCIAMO",
    primarySubtitle: "solidità significa sicurezza",
    primaryItems: [
      "Terre armate",
      "Palizzate e contenimenti in legno/castagno",
      "Creazione terrazzamenti su pendenze",
      "Consolidamento scarpate e rive",
      "Gestione drenaggi per ridurre rischio erosione",
    ],
    panels: [
      {
        title: "Per chi è",
        items: [
          "Giardini privati su terreni in pendenza",
          "Aree verdi condominiali, aziende, strutture ricettive",
          "Riqualificazioni dove serve sicurezza + integrazione paesaggistica",
        ],
      },
    ],
    microCta: "Hai una scarpata o una ripa che ti preoccupa? Prenota il Check-up Sostenibile.",
  },
  "arredamento-esterni": {
    summary: "Il giardino da vivere, in solitudine, in famiglia, con gli amici.",
    introTitle: "IL GIARDINO DA VIVERE",
    introSubtitle: "in solitudine, in famiglia, con gli amici",
    introParagraphs: [
      "Progettiamo e realizziamo ambienti esterni che funzionano davvero: aree pranzo, relax, ombra e percorsi, integrati con il verde e con lo stile della casa.",
      "Per farlo, attiviamo partnership selezionate e artigiani di fiducia mentre tu hai un solo referente e una regia unica.",
      "Il risultato è un outdoor vivibile in più stagioni, progettato sulle tue necessità.",
    ],
    primaryTitle: "COSA POSSIAMO INTEGRARE",
    primarySubtitle: "il tuo spazio verde non ha limiti",
    primaryItems: [
      "Arredi outdoor e set relax/pranzo",
      "Ombrelloni, schermature e soluzioni ombreggianti",
      "Pergole su misura (falegnameria) e pergole bioclimatiche",
      "Gazebo in legno o ferro battuto",
      "Fioriere (polietilene, resina) e fioriere su misura (anche corten)",
    ],
    panels: [
      {
        title: "Per chi è",
        items: [
          "Giardini privati, terrazzi e attici",
          "Strutture ricettive e spazi rappresentativi (B2B)",
        ],
      },
    ],
    microCta: "Vuoi trasformare lo spazio esterno in un ambiente da vivere? Prenota il Check-up Sostenibile.",
  },
  potature: {
    summary: "La pianta si pota dall’interno: sicurezza e salute dell’albero.",
    introTitle: "LA PIANTA SI POTA DALL’INTERNO",
    introSubtitle: "sicurezza e salute dell’albero",
    introParagraphs: [
      "I nostri interventi accompagnano l’esigenza del cliente, rispettando la pianta. La potatura non è “tagliare tanto” oppure “non toccare mai”: è un intervento tecnico che serve a dare luce alla chioma, alleggerire in modo equilibrato e mantenere la pianta stabile e resistente.",
      "Quando si pota male, l’albero si indebolisce e aumentano i rischi che nascano problemi e pericolosità nel tempo.",
      "Per lavori in quota operiamo con tree climber certificati, per potature e abbattimenti controllati in sicurezza.",
    ],
    primaryTitle: "COSA FACCIAMO",
    primarySubtitle: "dopo un’analisi accurata",
    primaryItems: [
      "Potature di mantenimento e riequilibrio chioma",
      "Potature di alleggerimento e messa in sicurezza",
      "Interventi su alberi in spazi difficili (accessi complessi, vicino a edifici)",
      "Abbattimenti in quota e gestione del rischio (quando necessario)",
    ],
    panels: [
      {
        title: "Per chi è",
        items: [
          "Giardini privati e terrazzi/aree verdi con alberature",
          "Condomìni, aziende, strutture ricettive (sicurezza e continuità)",
        ],
      },
    ],
    microCta: "Hai alberi da mettere in sicurezza o da gestire correttamente? Prenota il Check-up Sostenibile.",
  },
  "rigenerazione-terreni": {
    summary: "La terra è viva: se il suolo sta bene, tutto il giardino lavora meglio.",
    introTitle: "LA TERRA È VIVA",
    introSubtitle: "un suolo rigenerato non fa rumore ma cambia tutto",
    introParagraphs: [
      "Un terreno sano è popolato da oltre 1 miliardo di batteri per millimetro quadrato. Molti problemi del verde partono da lì: suoli compattati, poveri di sostanza organica, con ristagni o radici in sofferenza.",
      "Noi trattiamo il suolo come un organismo vivente: lavoriamo per aumentare humus e vitalità microbica, migliorare drenaggio e struttura, e ridurre stress per le piante.",
      "Risultato: piante più sane, meno interventi “di emergenza” e costi di mantenimento più controllabili.",
    ],
    primaryTitle: "COSA FACCIAMO",
    primarySubtitle: "dopo un’analisi accurata",
    primaryItems: [
      "Decompattazione e miglioramento struttura del terreno",
      "Aumento sostanza organica e formazione di humus",
      "Prevenzione ristagni idrici e problemi radicali (marciumi, soffocamento)",
      "Interventi conservativi per stabilità nel tempo",
    ],
    panels: [
      {
        title: "Con cosa lavoriamo",
        subtitle: "qualità controllata",
        items: [
          "Humus di lombrico",
          "Compost a fermentazione controllata",
          "Paste e preparati specifici per piante legnose",
        ],
        paragraphs: [
          "(prodotti da noi, per avere controllo sulla qualità)",
        ],
      },
    ],
    microCta: "Vuoi capire se il problema è nel suolo? Prenota il Check-up Sostenibile.",
    closingLine: "Un suolo rigenerato non fa rumore. Ma cambia tutto.",
  },
  manutenzioni: {
    summary: "Pensaci una volta sola, poi ci pensiamo noi.",
    introTitle: "PENSACI UNA VOLTA SOLA",
    introSubtitle: "poi ci pensiamo noi",
    introParagraphs: [
      "Non esiste un giardino che non richiede alcuna manutenzione, la buona regola è: poca ma fatta bene. Un giardino bello non si mantiene “quando capita”, si gestisce con continuità.",
      "Per questo Visione Sostenibile offre manutenzioni programmate con squadre specializzate e attrezzature adeguate, per privati, condomìni, aziende e strutture ricettive.",
      "Ogni contratto è accompagnato da un calendario stagionale di interventi: sai cosa succede e quando, senza sorprese.",
    ],
    primaryTitle: "COSA INCLUDE",
    primarySubtitle: "principali attività",
    primaryItems: [
      "Sfalcio e cura del prato (anche rigenerazione)",
      "Gestione erbe infestanti e pulizia aiuole",
      "Concimazioni e cura del suolo",
      "Controllo e regolazione impianto di irrigazione",
      "Potatura siepi, ornamentali e alberature (quando previsto)",
      "Gestione foglie, scarti verdi e smaltimento",
      "Interventi su criticità (parassiti/patogeni) con approccio mirato",
    ],
    panels: [
      {
        title: "Organizzazione e risorse",
        items: [
          "Team dedicato con più squadre di giardinieri specializzati",
          "Rete di collaborazioni e parco macchine completo per lavorazioni diverse",
        ],
      },
    ],
    microCta: "Vuoi un piano manutentivo su misura? Richiedi una proposta.",
  },
};
