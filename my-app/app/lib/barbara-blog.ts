export interface BarbaraBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "guida" | "metodo" | "stagionale" | "sostenibilita";
  coverImage: string;
  readTime: number;
  sections: { heading: string; content: string }[];
  quickAnswer: string;
  tags: string[];
  publishedAt: string;
}

export const barbaraBlogPosts: BarbaraBlogPost[] = [
  {
    slug: "giardino-che-supera-agosto",
    title: "Il giardino che supera agosto: guida pratica alla resilienza estiva",
    excerpt:
      "Un giardino non salta ad agosto per caso. Succede quando suolo compattato, irrigazione casuale e specie sbagliate lavorano insieme. Questa guida spiega quali controlli fare prima del caldo e come distribuire il budget in priorita che reggono davvero nel tempo.",
    category: "stagionale",
    coverImage: "/images/blog/giardino-che-supera-agosto.jpg",
    readTime: 8,
    sections: [
      {
        heading: "Perche il giardino soffre proprio tra luglio e agosto?",
        content:
          "Tra Torino e cintura il problema non e solo il caldo: contano anche vento secco, superfici riflettenti e suolo povero che trattiene poca acqua. Se il sistema parte debole in primavera, ad agosto collassa. Per questo conviene leggere insieme microclima, terreno e uso reale dello spazio prima di aggiungere nuove piante.",
      },
      {
        heading: "Quali piante reggono caldo e poca acqua in Piemonte?",
        content:
          "Funzionano meglio specie rustiche e radicazione profonda, con gruppi omogenei per fabbisogno idrico. Quando si mescolano piante con esigenze opposte si spreca acqua e si moltiplicano i cambi. La scelta giusta riduce sostituzioni annuali e rende la manutenzione piu lineare anche per chi ha poco tempo.",
      },
      {
        heading: "Come impostare irrigazione e pacciamatura senza sprechi?",
        content:
          "Si parte da settori separati per esposizione, gocciolatori dove serve precisione e test di uniformita nei punti critici. La pacciamatura limita evaporazione e sbalzi termici, quindi l'acqua resa utile aumenta. Non e un accessorio estetico: e la leva che stabilizza il suolo nei mesi piu stressanti.",
      },
      {
        heading: "Cosa controllare prima di partire per le ferie?",
        content:
          "Controlla filtri, centralina, pressioni e perdite nei raccordi; poi elimina rami secchi e protegge il colletto delle piante piu giovani. Un check di un'ora evita settimane di recupero a settembre. Il principio e semplice: prevenire costa meno che ripristinare.",
      },
    ],
    quickAnswer:
      "Per superare agosto il giardino va preparato prima: suolo attivo, irrigazione divisa per zone, pacciamatura e specie coerenti con esposizione e vento. Con questa base consumi meno acqua, riduci perdite estive e limiti gli interventi d'emergenza quando rientri dalle ferie.",
    tags: ["estate", "resilienza", "irrigazione", "suolo"],
    publishedAt: "2025-06-12",
  },
  {
    slug: "quanto-costa-un-giardino-sostenibile",
    title: "Quanto costa un giardino sostenibile?",
    excerpt:
      "Il costo non dipende da una tariffa standard ma da obiettivi, superfici e stato di partenza del giardino. Qui trovi una guida concreta per capire cosa pesa davvero sul preventivo, come lavorare a fasi e quali scelte evitano spese doppie nei primi due anni.",
    category: "guida",
    coverImage: "/images/blog/quanto-costa-un-giardino-sostenibile.jpg",
    readTime: 9,
    sections: [
      {
        heading: "Da cosa dipende davvero il costo finale?",
        content:
          "Incidono quattro variabili: stato del suolo, impianto idrico, complessita degli accessi e livello di finitura richiesto. Se una di queste e critica, ignorarla all'inizio genera extracosti dopo. Il prezzo corretto e quello che include basi solide, non quello piu basso in prima riga.",
      },
      {
        heading: "Quanto incide lavorare a fasi sul budget?",
        content:
          "Lavorare a step aiuta a distribuire la spesa e riduce gli errori di sequenza. Prima si mettono in ordine suolo e acqua, poi si investe su piante e finiture. Cosi ogni euro sostiene quello successivo e il progetto non va rifatto quando cambiano stagione o disponibilita economica.",
      },
      {
        heading: "Quali spese evitabili pesano dopo il primo anno?",
        content:
          "Le piu frequenti sono sostituzione piante non adatte, rilavorazioni dell'irrigazione e manutenzioni d'emergenza ripetute. Tutte nascono da scelte iniziali scollegate dal contesto. Una pianificazione minima con priorita tecniche riduce questi costi ricorrenti e rende il bilancio piu prevedibile.",
      },
      {
        heading: "Come leggere un preventivo senza sorprese?",
        content:
          "Chiedi sempre cosa e incluso per sopralluogo, preparazione suolo, impianti, avviamento e manutenzione iniziale. Verifica anche tempi e responsabilita del coordinamento. Un preventivo chiaro non nasconde complessita: le rende leggibili e quindi governabili.",
      },
    ],
    quickAnswer:
      "Un giardino sostenibile costa in base a condizioni reali e livello di obiettivo, non a un prezzo al metro quadro valido per tutti. La strada piu efficace e lavorare per fasi: prima suolo e irrigazione, poi verde e finiture. Cosi riduci sprechi e controlli meglio il budget.",
    tags: ["budget", "preventivo", "riqualificazione", "manutenzione"],
    publishedAt: "2025-07-03",
  },
  {
    slug: "contractor-del-verde-cosa-significa",
    title: "Contractor del verde: cosa significa davvero",
    excerpt:
      "Contractor del verde significa una regia unica: un referente che coordina progetto, cantiere e manutenzione con partner specialisti attivati solo quando servono. In questa guida spieghiamo perche questo metodo riduce ritardi, rimbalzi tra fornitori e costi non previsti nel tempo.",
    category: "metodo",
    coverImage: "/images/blog/contractor-del-verde-cosa-significa.jpg",
    readTime: 7,
    sections: [
      {
        heading: "Che differenza c'e tra giardiniere, impresa e contractor del verde?",
        content:
          "Il giardiniere esegue, l'impresa costruisce, il contractor coordina l'intero sistema. Quando il lavoro richiede competenze diverse, la regia evita sovrapposizioni e vuoti decisionali. Non e un'etichetta commerciale: e una responsabilita operativa unica su tempi, priorita e coerenza tecnica.",
      },
      {
        heading: "Perche un referente unico riduce errori e ritardi?",
        content:
          "Con un solo interlocutore decisioni e varianti passano da un canale chiaro, quindi si riducono attese e passaggi inutili. Anche il budget e piu leggibile perche ogni scelta viene motivata prima, non giustificata dopo. Il vantaggio pratico e meno caos in cantiere.",
      },
      {
        heading: "Quando entrano i partner specializzati nel progetto?",
        content:
          "Entrano solo nelle fasi in cui aggiungono valore: irrigazione, potature in quota, outdoor living o piscine. Il punto non e avere tanti fornitori, ma attivare la competenza giusta al momento giusto. Cosi il risultato resta coerente tra estetica, uso e gestione futura.",
      },
      {
        heading: "Come si controllano tempi e budget in pratica?",
        content:
          "Con cronoprogramma, priorita condivise e verifiche a fine fase. Ogni step deve consegnare qualcosa di stabile, non un lavoro provvisorio da riprendere due volte. Questo e il motivo per cui il metodo contractor funziona soprattutto in condomini, aziende e contesti complessi.",
      },
    ],
    quickAnswer:
      "Il contractor del verde e il referente unico che orchestra progetto, specialisti e manutenzione. Serve quando il giardino e un sistema complesso, non un intervento singolo. Con una regia chiara diminuiscono ritardi, conflitti tra fornitori e costi nati da decisioni prese fuori sequenza.",
    tags: ["contractor del verde", "coordinamento", "metodo", "b2b"],
    publishedAt: "2025-08-01",
  },
  {
    slug: "5-errori-che-bruciano-soldi-in-giardino",
    title: "5 errori che bruciano soldi in giardino",
    excerpt:
      "La maggior parte delle spese inutili nasce da errori prevedibili: piante scelte senza leggere il suolo, irrigazione non calibrata, manutenzione solo quando c'e emergenza. Qui trovi i cinque sbagli piu costosi e il motivo tecnico per cui conviene correggerli subito.",
    category: "sostenibilita",
    coverImage: "/images/blog/5-errori-che-bruciano-soldi-in-giardino.jpg",
    readTime: 8,
    sections: [
      {
        heading: "Perche partire dalle piante senza leggere il suolo costa di piu?",
        content:
          "Se il terreno e compattato o povero, anche piante corrette faticano e si sostituiscono presto. La spesa iniziale sembra bassa ma si ripete ogni stagione. Preparare il suolo prima e meno visibile, ma evita ricambi continui e trattamenti tampone.",
      },
      {
        heading: "Cosa succede quando l'irrigazione non e calibrata?",
        content:
          "Si annaffia troppo nelle zone in ombra e troppo poco nelle zone esposte: risultato, spreco idrico e piante stressate insieme. Un impianto diviso per settori riduce entrambe le perdite. La calibrazione e una spesa una tantum che previene costi ricorrenti.",
      },
      {
        heading: "Quanto costa rinviare la manutenzione programmata?",
        content:
          "Rinviare significa accumulare piccoli problemi che diventano interventi urgenti e piu cari: potature drastiche, ripristini, sostituzioni. Con un calendario minimo si lavora prima del danno, quindi con tempi brevi e margine decisionale. E la differenza tra gestione e rincorsa.",
      },
      {
        heading: "Come evitare interventi spot senza risultato?",
        content:
          "Serve un piano semplice: priorita tecniche, sequenza delle fasi e obiettivi verificabili. Anche un progetto piccolo funziona meglio se ogni scelta ha un perche. Questo approccio riduce lavori doppi e mantiene coerente il rapporto tra spesa, uso e durata.",
      },
    ],
    quickAnswer:
      "I soldi si bruciano quando il giardino viene trattato a interventi spot: piante senza analisi suolo, acqua distribuita male, potature tardive e manutenzione solo in emergenza. Correggere la sequenza tecnica riduce sprechi e rende i costi piu stabili, stagione dopo stagione.",
    tags: ["errori comuni", "risparmio", "suolo", "metodo"],
    publishedAt: "2025-09-18",
  },
];
