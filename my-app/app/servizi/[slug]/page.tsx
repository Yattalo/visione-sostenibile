"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Sprout,
  ChevronDown,
  ListChecks,
  Leaf,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { normalizeServiceSlug, staticServices, serviceImages } from "../../lib/static-data";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ScrollCTA } from "../../components/ScrollCTA";
import { ReviewsWidget } from "../../components/ReviewsWidget";
import { siteConfig } from "../../lib/site-config";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../../components/animations";
import { BLUR_DATA_URL } from "../../lib/image-utils";

type ServiceItem = (typeof staticServices)[number];

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceContent = {
  questionH2?: string;
  quickAnswer: string;
  intro: string;
  body: string;
  deliverables: string[];
  process: string[];
  results: string[];
  whenToChoose: string[];
  faqs: FaqItem[];
};

const SITE_URL = siteConfig.siteUrl;

const serviceImageMap: Record<string, string> = {
  "progettazione-giardini": "/images/servizi/progettazione-giardini-cover.png",
  "realizzazione-giardini": "/images/servizi/realizzazione-giardini-cover.png",
  "scelta-piante": "/images/servizi/scelta-piante-cover.png",
  "trattamenti-piante": "/images/servizi/trattamenti-piante-cover.png",
  "impianti-irrigazione": "/images/servizi/impianti-irrigazione-cover.png",
  "camminamenti-pietra": "/images/servizi/camminamenti-pietra-cover.png",
  "illuminazione-esterni": "/images/servizi/illuminazione-esterni-cover.png",
  "ingegneria-naturalistica": "/images/servizi/ingegneria-naturalistica-cover.png",
  "arredamento-esterni": "/images/servizi/arredamento-esterni-cover.png",
  potature: "/images/servizi/potature-cover.png",
  "rigenerazione-terreni": "/images/servizi/rigenerazione-terreni-cover.png",
  manutenzioni: "/images/servizi/manutenzioni-cover.png",
};

const serviceSubtitles: Record<string, string> = {
  "progettazione-giardini": "Dal concept alla realta a Torino e Piemonte",
  "realizzazione-giardini": "Realizzazione Giardini a Torino",
  manutenzioni: "Cura continua a Torino e Piemonte",
  potature: "Potatura Alberi a Torino",
  "rigenerazione-terreni": "Equilibrio naturale",
};

const blogArticlesBySlug: Record<string, { title: string; slug: string }> = {
  "come-mantenere-giardino-autunno": {
    slug: "come-mantenere-giardino-autunno",
    title: "Come Mantenere il Giardino in Autunno: Guida Completa",
  },
  "tendenze-giardini-2026": {
    slug: "tendenze-giardini-2026",
    title: "Tendenze Giardini 2026: Le Novita del Verde",
  },
  "piante-pendio": {
    slug: "piante-pendio",
    title: "Le Migliori Piante per Terreni in Pendio",
  },
};

const relatedBlogSlugsByService: Record<string, string[]> = {
  "progettazione-giardini": ["tendenze-giardini-2026"],
  "realizzazione-giardini": ["tendenze-giardini-2026"],
  manutenzioni: ["come-mantenere-giardino-autunno"],
  potature: ["come-mantenere-giardino-autunno"],
  "rigenerazione-terreni": ["piante-pendio"],
  "scelta-piante": ["piante-pendio"],
  "trattamenti-piante": ["come-mantenere-giardino-autunno"],
  "impianti-irrigazione": ["tendenze-giardini-2026"],
  "camminamenti-pietra": ["tendenze-giardini-2026"],
  "illuminazione-esterni": ["tendenze-giardini-2026"],
  "arredamento-esterni": ["tendenze-giardini-2026"],
  "ingegneria-naturalistica": ["piante-pendio"],
};

const serviceContents: Record<string, ServiceContent> = {
  "progettazione-giardini": {
    questionH2: "Come funziona la progettazione di un giardino sostenibile?",
    quickAnswer:
      "La progettazione di giardini e orti sostenibili funziona meglio quando parte da un'analisi del sito, degli obiettivi d'uso e dalla scelta botanica locale. Con questo approccio ottieni un progetto realizzabile e coerente, riduci gli errori in fase di cantiere e abbassi sensibilmente i costi di manutenzione nel medio e lungo periodo.",
    intro:
      "Progettiamo spazi verdi su misura, con equilibrio tra estetica, funzionalita e sostenibilita.",
    body: "Ogni proposta parte da sopralluogo, lettura del suolo, esposizione e abitudini di utilizzo. Definiamo schema distributivo, palette vegetale e materiali, cosi il giardino cresce coerente nel tempo.",
    deliverables: [
      "Sopralluogo e analisi preliminare",
      "Layout funzionale di giardino o orto",
      "Piano specie e stagionalita",
      "Indicazioni per irrigazione e manutenzione",
      "Roadmap di realizzazione per fasi",
    ],
    process: [
      "Brief iniziale e rilievo fotografico",
      "Concept con priorita estetiche e pratiche",
      "Definizione tecnica di piante e materiali",
      "Consegna piano operativo e supporto avvio lavori",
    ],
    results: [
      "Riduzione interventi correttivi in cantiere",
      "Migliore resa estetica nel primo anno",
      "Spese di gestione piu prevedibili",
    ],
    whenToChoose: [
      "Stai iniziando da zero con un nuovo spazio verde",
      "Vuoi rinnovare un giardino esistente senza sprechi",
      "Hai bisogno di una visione chiara prima dei lavori",
    ],
    faqs: [
      {
        question: "Quanto dura la fase di progettazione?",
        answer:
          "Dipende da metratura e complessita. In molti casi una prima proposta arriva in 1-2 settimane, poi si rifinisce il piano definitivo con priorita e budget.",
      },
      {
        question: "La progettazione include anche l'orto?",
        answer:
          "Si. Possiamo integrare orto produttivo, aromatiche e aree decorative in un unico schema coerente, tenendo conto di sole, accessi e irrigazione.",
      },
      {
        question: "Posso realizzare il progetto a step?",
        answer:
          "Si, e una scelta comune. Definiamo una roadmap per fasi, cosi distribuisci investimento e lavori mantenendo coerenza finale.",
      },
    ],
  },
  "realizzazione-giardini": {
    questionH2: "Quali vantaggi offre la realizzazione chiavi in mano del giardino?",
    quickAnswer:
      "La realizzazione chiavi in mano ti permette di avere un unico referente professionale dalla preparazione del terreno alla posa finale di piante e impianti. In questo modo riduci i tempi di coordinamento, elimini i tempi morti tra le fasi e abbassi i rischi di incompatibilita tra fornitori e materiali diversi.",
    intro:
      "Gestiamo il cantiere verde in modo completo, con un flusso organizzato e controlli su ogni fase.",
    body: "Dalla preparazione del suolo all'impianto piante, fino a irrigazione e finiture, coordiniamo tutte le attivita in sequenza logica per consegnare uno spazio pronto da vivere.",
    deliverables: [
      "Pianificazione operativa del cantiere",
      "Preparazione suolo e infrastrutture",
      "Messa a dimora e finiture",
      "Collaudo impianti essenziali",
      "Consegna con indicazioni di mantenimento",
    ],
    process: [
      "Kick-off tecnico e calendario lavori",
      "Interventi strutturali e preparazione",
      "Installazione verde e impianti",
      "Verifica finale e passaggio consegne",
    ],
    results: [
      "Tempi di consegna piu affidabili",
      "Maggiore qualita esecutiva complessiva",
      "Riduzione criticita post-consegna",
    ],
    whenToChoose: [
      "Vuoi un unico partner per tutto il progetto",
      "Hai poco tempo per coordinare piu fornitori",
      "Cerchi consegna completa e pronta all'uso",
    ],
    faqs: [
      {
        question: "Chi segue il coordinamento dei lavori?",
        answer:
          "Il coordinamento e centralizzato nel nostro team, con un referente unico per pianificazione, aggiornamenti e controllo qualita.",
      },
      {
        question: "E possibile integrare materiali gia acquistati?",
        answer:
          "In molti casi si, previa verifica tecnica e compatibilita con il progetto, per evitare errori in fase di posa.",
      },
      {
        question: "Come viene gestita la consegna finale?",
        answer:
          "Prevediamo controllo finale e indicazioni pratiche di gestione iniziale, cosi la fase di avvio del verde e piu semplice.",
      },
    ],
  },
  manutenzioni: {
    questionH2: "Come funziona la manutenzione sostenibile del giardino?",
    quickAnswer:
      "La manutenzione sostenibile mantiene il giardino sano e ordinato attraverso interventi programmati, tecniche a basso impatto ambientale e prevenzione stagionale mirata. Questo approccio riduce il degrado progressivo del verde, previene le emergenze fitosanitarie e aiuta a contenere i costi straordinari e imprevisti nel medio e lungo periodo.",
    intro:
      "Programmiamo la cura del verde con cadenze intelligenti, in base al ciclo stagionale reale.",
    body: "Un piano di manutenzione efficace combina taglio, controllo fitosanitario, nutrizione del suolo e monitoraggio costante. Ogni intervento e calibrato su piante, esposizione e uso dello spazio.",
    deliverables: [
      "Piano stagionale personalizzato",
      "Interventi periodici programmati",
      "Controllo salute vegetale",
      "Ottimizzazione irrigazione e consumi",
      "Report sintetico delle attivita svolte",
    ],
    process: [
      "Audit iniziale dello stato del verde",
      "Definizione frequenze operative",
      "Esecuzione ciclica per stagione",
      "Revisione periodica del piano",
    ],
    results: [
      "Migliore continuita estetica annuale",
      "Meno emergenze e interventi urgenti",
      "Suolo e piante piu stabili nel tempo",
    ],
    whenToChoose: [
      "Il giardino richiede interventi frequenti ma non coordinati",
      "Vuoi prevenire problemi invece di rincorrerli",
      "Cerchi una gestione ordinata e misurabile",
    ],
    faqs: [
      {
        question: "Ogni quanto conviene fare manutenzione?",
        answer:
          "Dipende dal tipo di verde, ma in generale conviene impostare frequenze diverse per stagione, con controlli piu ravvicinati nei periodi di crescita intensa.",
      },
      {
        question: "La manutenzione include anche trattamenti?",
        answer:
          "Si, quando necessario e con approccio mirato. L'obiettivo e prevenire squilibri e intervenire in modo proporzionato, evitando eccessi.",
      },
      {
        question: "Posso modificare il piano durante l'anno?",
        answer:
          "Si. Il piano viene aggiornato in base a clima, risposta delle piante e nuove esigenze funzionali dello spazio.",
      },
    ],
  },
  potature: {
    questionH2: "Quando e come potare le piante in modo professionale?",
    quickAnswer:
      "La potatura professionale migliora struttura, sicurezza e vitalita delle piante quando viene eseguita nel periodo corretto con tagli adeguati alla specie. Gli interventi graduali e non invasivi riducono lo stress vegetativo, favoriscono la cicatrizzazione naturale e aiutano una crescita equilibrata che mantiene la forma nel tempo.",
    intro:
      "Eseguiamo potature tecniche con attenzione alla fisiologia della pianta e al contesto di sicurezza.",
    body: "Ogni albero o arbusto richiede un approccio specifico. Valutiamo forma, carichi, punti critici e stagione, poi definiamo un intervento preciso che protegge la salute vegetale e migliora la gestione dello spazio.",
    deliverables: [
      "Valutazione tecnica pre-intervento",
      "Potatura mirata e non invasiva",
      "Gestione ramaglie e pulizia area",
      "Indicazioni per monitoraggio successivo",
      "Suggerimenti di manutenzione annuale",
    ],
    process: [
      "Ispezione piante e obiettivi del taglio",
      "Definizione tecnica dell'intervento",
      "Esecuzione in sicurezza",
      "Verifica finale e consigli post-potatura",
    ],
    results: [
      "Migliore equilibrio della chioma",
      "Riduzione rischi su rami critici",
      "Recupero estetico e funzionale del verde",
    ],
    whenToChoose: [
      "Hai alberi o arbusti cresciuti in modo disordinato",
      "Vuoi prevenire rischi legati a rami deboli",
      "Desideri migliorare luce e aria nello spazio verde",
    ],
    faqs: [
      {
        question: "Qual e il periodo migliore per potare?",
        answer:
          "Dipende dalla specie. In generale si scelgono finestre stagionali che limitano stress e favoriscono corretta cicatrizzazione del taglio.",
      },
      {
        question: "La potatura forte e sempre necessaria?",
        answer:
          "No. Nella maggior parte dei casi e preferibile una potatura graduale e mirata, che mantiene equilibrio vegetativo e forma naturale.",
      },
      {
        question: "Dopo quanto vedo il risultato?",
        answer:
          "L'effetto visivo e immediato, mentre la risposta vegetativa si osserva nelle settimane successive, in base a specie e stagione.",
      },
    ],
  },
  "rigenerazione-terreni": {
    questionH2: "Cos'e la gestione biodinamica del verde e come funziona?",
    quickAnswer:
      "La gestione biodinamica del verde punta a rigenerare suolo e piante con pratiche naturali, compostaggio e cicli stagionali coerenti. Il risultato e un ecosistema piu resiliente e autonomo, con minore dipendenza da interventi chimici, maggiore biodiversita nel terreno e una stabilita complessiva che migliora anno dopo anno.",
    intro:
      "Applichiamo pratiche biodinamiche per migliorare vitalita del terreno, equilibrio biologico e qualita del paesaggio.",
    body: "Il metodo integra nutrizione organica, osservazione dei cicli naturali e gestione preventiva. Cosi favoriamo biodiversita, resistenza delle piante e qualita estetica sostenibile.",
    deliverables: [
      "Analisi stato biologico iniziale",
      "Piano biodinamico stagionale",
      "Interventi di riequilibrio del suolo",
      "Supporto su pratiche naturali continuative",
      "Monitoraggio evoluzione del verde",
    ],
    process: [
      "Valutazione ecosistema e criticita",
      "Definizione protocollo biodinamico",
      "Applicazione ciclica degli interventi",
      "Adattamento del piano in base ai risultati",
    ],
    results: [
      "Maggior resilienza del sistema verde",
      "Incremento fertilita biologica del suolo",
      "Riduzione progressiva trattamenti invasivi",
    ],
    whenToChoose: [
      "Vuoi passare a pratiche di gestione naturale",
      "Hai un giardino con calo di vitalita ricorrente",
      "Cerchi un approccio sistemico e non solo correttivo",
    ],
    faqs: [
      {
        question: "La gestione biodinamica e adatta a tutti i giardini?",
        answer:
          "In molti casi si, con un piano personalizzato. L'intensita degli interventi dipende da stato iniziale, obiettivi e condizioni ambientali.",
      },
      {
        question: "Quanto tempo serve per vedere benefici?",
        answer:
          "I primi segnali possono arrivare in pochi mesi, mentre i risultati piu solidi si consolidano nel medio periodo grazie alla continuita del metodo.",
      },
      {
        question: "Si puo integrare con manutenzione ordinaria?",
        answer:
          "Si. Anzi, la gestione biodinamica funziona meglio quando viene coordinata con una manutenzione programmata e coerente.",
      },
    ],
  },
  "impianti-irrigazione": {
    questionH2: "Come scegliere il sistema di irrigazione giusto per il giardino?",
    quickAnswer:
      "Il sistema di irrigazione ideale dipende da tipo di terreno, esposizione e piante presenti. Un impianto progettato su misura riduce gli sprechi idrici, garantisce copertura uniforme e semplifica la gestione quotidiana del verde.",
    intro:
      "Progettiamo e installiamo impianti di irrigazione efficienti, calibrati sulle esigenze reali del tuo spazio verde.",
    body: "Ogni impianto parte da un rilievo tecnico che valuta pendenze, zone d'ombra, tipo di suolo e fabbisogno idrico delle specie presenti. Il risultato e un sistema preciso che consuma meno e irriga meglio.",
    deliverables: [
      "Rilievo tecnico e mappatura zone idriche",
      "Progetto impianto con schema idraulico",
      "Installazione linee e irrigatori",
      "Programmazione centralina smart",
      "Collaudo e regolazione finale",
      "Istruzioni d'uso e manutenzione stagionale",
    ],
    process: [
      "Sopralluogo e analisi fabbisogno idrico",
      "Progettazione schema e componenti",
      "Installazione e posa in opera",
      "Programmazione, collaudo e consegna",
    ],
    results: [
      "Riduzione consumi idrici fino al 40%",
      "Copertura uniforme senza zone secche",
      "Gestione automatizzata e programmabile",
    ],
    whenToChoose: [
      "Il giardino soffre di irrigazione irregolare",
      "Vuoi ridurre i consumi idrici senza sacrificare il verde",
      "Cerchi un sistema automatico e affidabile",
    ],
    faqs: [
      {
        question: "Quanto costa un impianto di irrigazione?",
        answer:
          "Il costo dipende da superficie, numero di zone e tipo di irrigatori. Dopo il sopralluogo forniamo un preventivo dettagliato senza impegno.",
      },
      {
        question: "Si puo installare su un giardino gia esistente?",
        answer:
          "Si. L'installazione su giardini esistenti e comune e viene pianificata per ridurre al minimo l'impatto sulle piante e sul prato.",
      },
      {
        question: "L'impianto funziona anche con acqua di pozzo?",
        answer:
          "Si, previa verifica della portata e qualita dell'acqua. Adattiamo filtri e pressione per garantire il corretto funzionamento.",
      },
    ],
  },
  "camminamenti-pietra": {
    questionH2: "Quali materiali scegliere per camminamenti e muretti in giardino?",
    quickAnswer:
      "I materiali migliori per camminamenti e muretti in giardino sono pietre naturali locali, resistenti al gelo e coerenti con il paesaggio. Una posa accurata garantisce stabilita nel tempo, drenaggio corretto e un risultato estetico che valorizza lo spazio.",
    intro:
      "Realizziamo camminamenti, muretti e bordure con materiali naturali selezionati per durabilita e coerenza estetica.",
    body: "Ogni intervento parte dalla scelta del materiale giusto per contesto, uso e clima. La posa segue tecniche tradizionali che garantiscono stabilita strutturale e integrazione naturale con il verde circostante.",
    deliverables: [
      "Consulenza su materiali e finiture",
      "Progetto esecutivo del tracciato",
      "Preparazione del fondo e drenaggi",
      "Posa in opera con tecniche tradizionali",
      "Stuccatura e finiture finali",
      "Indicazioni per manutenzione nel tempo",
    ],
    process: [
      "Sopralluogo e definizione tracciato",
      "Selezione materiali e campionatura",
      "Preparazione fondo e sottofondo drenante",
      "Posa, stuccatura e pulizia finale",
    ],
    results: [
      "Percorsi stabili e sicuri in ogni stagione",
      "Estetica naturale integrata nel paesaggio",
      "Durabilita superiore con manutenzione minima",
    ],
    whenToChoose: [
      "Il giardino manca di percorsi pedonali definiti",
      "Vuoi contenere un pendio o delimitare aree",
      "Cerchi materiali naturali e durevoli",
    ],
    faqs: [
      {
        question: "Quanto dura un camminamento in pietra naturale?",
        answer:
          "Con una posa corretta e materiali di qualita, un camminamento in pietra dura decenni con manutenzione minima.",
      },
      {
        question: "Quali pietre sono adatte al clima piemontese?",
        answer:
          "Usiamo prevalentemente luserna, beola e porfido, pietre locali resistenti al gelo e all'usura tipiche del territorio.",
      },
      {
        question: "E possibile posare su terreno in pendenza?",
        answer:
          "Si. In pendenza realizziamo gradonate, scalinate e muretti di contenimento con tecniche che garantiscono stabilita e drenaggio.",
      },
    ],
  },
  "illuminazione-esterni": {
    questionH2: "Come illuminare il giardino in modo efficace e sostenibile?",
    quickAnswer:
      "Un'illuminazione esterna ben progettata valorizza il giardino di sera, migliora la sicurezza dei percorsi e consuma poco grazie a tecnologie LED a basso consumo. Il progetto parte dalla mappatura delle zone da illuminare e dalla scelta di apparecchi adatti al contesto.",
    intro:
      "Progettiamo sistemi di illuminazione esterna che uniscono funzionalita, atmosfera e risparmio energetico.",
    body: "Ogni progetto illuminotecnico parte dall'analisi degli spazi, dei punti focali e degli usi serali del giardino. Scegliamo apparecchi a LED, posizioni studiate e temperature di colore che esaltano il verde senza inquinamento luminoso.",
    deliverables: [
      "Rilievo e mappatura punti luce",
      "Progetto illuminotecnico con planimetria",
      "Fornitura apparecchi LED selezionati",
      "Installazione e cablaggio a norma",
      "Programmazione accensioni e dimmer",
      "Collaudo e istruzioni operative",
    ],
    process: [
      "Sopralluogo serale e analisi esigenze",
      "Progetto con posizionamento e scelta apparecchi",
      "Installazione elettrica e posa corpi illuminanti",
      "Collaudo notturno e regolazione finale",
    ],
    results: [
      "Giardino fruibile e sicuro anche di sera",
      "Valorizzazione estetica di piante e architetture",
      "Consumi ridotti grazie a tecnologia LED",
    ],
    whenToChoose: [
      "Il giardino e poco fruibile dopo il tramonto",
      "Vuoi valorizzare piante o elementi architettonici di sera",
      "Cerchi sicurezza sui percorsi con luce discreta",
    ],
    faqs: [
      {
        question: "L'illuminazione da giardino consuma molto?",
        answer:
          "No. Con apparecchi LED e programmazione intelligente i consumi sono contenuti, spesso inferiori a quelli di una singola lampada domestica.",
      },
      {
        question: "Si possono illuminare anche alberi e siepi?",
        answer:
          "Si. Usiamo faretti a incasso, spot direzionabili e strip LED per evidenziare chiome, tronchi e masse verdi con effetti scenografici.",
      },
      {
        question: "Serve un impianto elettrico dedicato?",
        answer:
          "Dipende dallo stato esistente. In molti casi integriamo l'illuminazione su linee esistenti, altrimenti prevediamo un circuito dedicato a norma.",
      },
    ],
  },
  "arredamento-esterni": {
    questionH2: "Come scegliere l'arredamento da esterno giusto per il giardino?",
    quickAnswer:
      "L'arredamento da esterno ideale combina resistenza alle intemperie, comfort e coerenza estetica con il giardino. La scelta dei materiali e del layout trasforma lo spazio verde in un'area vivibile tutto l'anno, dall'angolo relax alla zona pranzo.",
    intro:
      "Selezioniamo e posizioniamo arredi da esterno che trasformano il giardino in uno spazio da vivere.",
    body: "Dalla scelta dei materiali al layout funzionale, progettiamo zone outdoor coerenti con lo stile del giardino. Ogni elemento e selezionato per resistenza, comfort e integrazione estetica con il contesto verde.",
    deliverables: [
      "Consulenza su stile e materiali",
      "Layout funzionale delle zone outdoor",
      "Selezione arredi e complementi",
      "Coordinamento consegne e posizionamento",
      "Accessori e tessili per esterni",
      "Indicazioni per cura e rimessaggio stagionale",
    ],
    process: [
      "Analisi spazi e stile di vita all'aperto",
      "Proposta layout e selezione arredi",
      "Ordine, consegna e posizionamento",
      "Verifica finale e consigli di manutenzione",
    ],
    results: [
      "Spazio esterno vivibile in ogni stagione",
      "Comfort e stile coerente con il giardino",
      "Arredi durevoli con manutenzione semplice",
    ],
    whenToChoose: [
      "Vuoi creare una zona pranzo o relax all'aperto",
      "Gli arredi attuali sono deteriorati o inadatti",
      "Cerchi soluzioni su misura per il tuo spazio",
    ],
    faqs: [
      {
        question: "Quali materiali resistono meglio all'esterno?",
        answer:
          "Teak, alluminio verniciato, resina intrecciata e tessuti tecnici offrono la migliore combinazione di resistenza e estetica per uso outdoor tutto l'anno.",
      },
      {
        question: "E possibile arredare anche spazi piccoli?",
        answer:
          "Si. Con arredi compatti e layout studiato si ottimizzano anche terrazzi e cortili di dimensioni ridotte, senza rinunciare a comfort e funzionalita.",
      },
      {
        question: "Gli arredi vanno coperti in inverno?",
        answer:
          "Dipende dal materiale. Forniamo indicazioni specifiche per ogni pezzo, incluse coperture protettive e consigli di rimessaggio stagionale.",
      },
    ],
  },
  "ingegneria-naturalistica": {
    questionH2: "Quando serve l'ingegneria naturalistica per il giardino o il terreno?",
    quickAnswer:
      "L'ingegneria naturalistica serve quando il terreno presenta problemi di stabilita, erosione o dissesto idrogeologico. Utilizza tecniche a basso impatto ambientale per consolidare pendii, proteggere sponde e recuperare aree degradate in modo sostenibile e duraturo.",
    intro:
      "Applichiamo tecniche di ingegneria naturalistica per stabilizzare terreni, proteggere versanti e recuperare aree verdi compromesse.",
    body: "Ogni intervento combina materiali naturali (legno, pietra, geotessili) con piante a radicazione profonda per creare strutture stabili che si integrano nel paesaggio e migliorano nel tempo.",
    deliverables: [
      "Sopralluogo e analisi geomorfologica",
      "Relazione tecnica con soluzioni proposte",
      "Progetto esecutivo dell'intervento",
      "Realizzazione opere di consolidamento",
      "Rinverdimento e messa a dimora",
      "Monitoraggio post-intervento",
    ],
    process: [
      "Rilievo del dissesto e delle cause",
      "Progettazione intervento con tecniche naturali",
      "Esecuzione opere strutturali e vegetazionali",
      "Verifica stabilita e monitoraggio nel tempo",
    ],
    results: [
      "Pendii e scarpate stabilizzati in modo naturale",
      "Riduzione del rischio idrogeologico",
      "Recupero estetico e funzionale dell'area",
    ],
    whenToChoose: [
      "Il terreno presenta frane, smottamenti o erosione",
      "Devi consolidare un pendio o una scarpata",
      "Cerchi soluzioni a basso impatto ambientale per il dissesto",
    ],
    faqs: [
      {
        question: "L'ingegneria naturalistica e efficace come quella tradizionale?",
        answer:
          "Si, e in molti casi superiore nel lungo periodo perche le radici delle piante rafforzano progressivamente la struttura, aumentando la stabilita nel tempo.",
      },
      {
        question: "Quanto tempo serve per completare un intervento?",
        answer:
          "Dipende dalla scala. Interventi su giardini privati richiedono da pochi giorni a qualche settimana, con risultati visibili gia nella prima stagione vegetativa.",
      },
      {
        question: "Servono permessi per questi interventi?",
        answer:
          "In alcuni casi si, soprattutto per aree vincolate. Ci occupiamo della verifica normativa e, se necessario, supportiamo la pratica autorizzativa.",
      },
    ],
  },
  "scelta-piante": {
    questionH2: "Come scegliere le piante giuste per il proprio giardino?",
    quickAnswer:
      "La scelta delle piante giuste parte dall'analisi di terreno, esposizione, clima e obiettivi estetici. Selezionare specie adatte al contesto riduce le sostituzioni, abbassa i costi di manutenzione e garantisce un giardino che migliora naturalmente nel tempo.",
    intro:
      "Selezioniamo piante autoctone e ornamentali adatte al tuo terreno, al clima e allo stile del giardino.",
    body: "Ogni proposta botanica nasce da un'analisi approfondita di suolo, esposizione, microclima e preferenze estetiche. Il risultato e una palette vegetale coerente, resiliente e di facile gestione.",
    deliverables: [
      "Analisi pedoclimatica del sito",
      "Selezione specie con schede botaniche",
      "Piano di impianto con posizionamento",
      "Fornitura piante da vivaisti selezionati",
      "Messa a dimora con substrato e pacciamatura",
      "Calendario cure e irrigazione primo anno",
    ],
    process: [
      "Sopralluogo e analisi terreno e microclima",
      "Selezione botanica e proposta palette vegetale",
      "Approvvigionamento e messa a dimora",
      "Istruzioni di cura e monitoraggio attecchimento",
    ],
    results: [
      "Piante adatte al contesto con alto tasso di attecchimento",
      "Giardino esteticamente coerente tutto l'anno",
      "Manutenzione ridotta grazie a specie resilienti",
    ],
    whenToChoose: [
      "Stai piantumando un nuovo giardino da zero",
      "Vuoi sostituire piante che non si adattano al terreno",
      "Cerchi specie autoctone e a bassa manutenzione",
    ],
    faqs: [
      {
        question: "Le piante autoctone sono meno belle di quelle esotiche?",
        answer:
          "No. Esistono specie autoctone con fioriture spettacolari e fogliami decorativi che offrono anche il vantaggio di adattarsi meglio al clima locale.",
      },
      {
        question: "Quanto tempo serve per vedere il giardino maturo?",
        answer:
          "Dipende dalle specie scelte. Erbacee e arbusti danno risultati in 1-2 stagioni, mentre alberi richiedono 3-5 anni per raggiungere una dimensione significativa.",
      },
      {
        question: "Garantite l'attecchimento delle piante?",
        answer:
          "Selezioniamo piante di qualita da vivaisti di fiducia e forniamo istruzioni precise per il primo anno. Il tasso di attecchimento con il nostro metodo e molto elevato.",
      },
    ],
  },
  "trattamenti-piante": {
    questionH2: "Quando e come trattare le piante in modo naturale?",
    quickAnswer:
      "I trattamenti naturali per le piante funzionano meglio quando vengono applicati preventivamente e con dosaggi calibrati sulla specie. Questo approccio riduce la dipendenza dalla chimica di sintesi, preserva l'equilibrio biologico del giardino e protegge la salute delle piante nel lungo periodo.",
    intro:
      "Applichiamo trattamenti curativi e nutrizionali naturali per proteggere le piante e rafforzarne la salute.",
    body: "Ogni intervento parte da una diagnosi dello stato fitosanitario e nutrizionale. Utilizziamo prodotti biologici, macerati e preparati biodinamici calibrati sulla specie e sul problema specifico.",
    deliverables: [
      "Diagnosi fitosanitaria visiva e strumentale",
      "Piano trattamenti con prodotti naturali",
      "Applicazione trattamenti curativi",
      "Somministrazione nutrienti e biostimolanti",
      "Monitoraggio risposta vegetativa",
      "Report e raccomandazioni di follow-up",
    ],
    process: [
      "Ispezione e diagnosi dello stato di salute",
      "Definizione protocollo trattamento naturale",
      "Applicazione trattamenti e nutrienti",
      "Monitoraggio risultati e adattamento piano",
    ],
    results: [
      "Piante piu sane e resistenti ai patogeni",
      "Riduzione progressiva dei trattamenti chimici",
      "Equilibrio biologico del giardino preservato",
    ],
    whenToChoose: [
      "Le piante mostrano segni di sofferenza o malattia",
      "Vuoi passare da trattamenti chimici a naturali",
      "Cerchi una cura preventiva e non solo d'emergenza",
    ],
    faqs: [
      {
        question: "I trattamenti naturali sono efficaci quanto quelli chimici?",
        answer:
          "Si, soprattutto in ottica preventiva. I trattamenti naturali rafforzano le difese della pianta, riducendo la necessita di interventi d'urgenza nel tempo.",
      },
      {
        question: "Ogni quanto vanno ripetuti i trattamenti?",
        answer:
          "Dipende dalla specie e dal problema. In genere prevediamo cicli stagionali con frequenza maggiore nei periodi di crescita attiva e minore in inverno.",
      },
      {
        question: "I trattamenti sono sicuri per bambini e animali?",
        answer:
          "Si. Utilizziamo esclusivamente prodotti biologici e naturali, sicuri per persone, animali domestici e insetti utili come api e coccinelle.",
      },
    ],
  },
};

/* ── Section Components ────────────────── */

function HeroSection({
  service,
  imageUrl,
}: {
  service: ServiceItem;
  imageUrl: string;
}) {
  const subtitle = serviceSubtitles[service.slug] ?? "";

  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-forest-950 py-32 md:py-40">
      <Image
        src={imageUrl}
        alt={`Servizio di ${service.title.toLowerCase()} — Visione Sostenibile`}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/40 to-forest-950/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <Link
            href="/servizi"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper-50/20 bg-paper-50/10 px-4 py-2 font-sans text-xs uppercase tracking-widest text-paper-200 backdrop-blur-sm transition-colors hover:bg-paper-50/20"
          >
            <ArrowLeft className="h-3 w-3" />
            Tutti i servizi
          </Link>
        </FadeIn>

        <SlideUp>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-paper-50 md:text-5xl lg:text-6xl">
            {service.title}
          </h1>
        </SlideUp>

        {subtitle && (
          <SlideUp delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl font-body text-lg italic text-paper-300/90 md:text-xl">
              {subtitle}
            </p>
          </SlideUp>
        )}

        <SlideUp delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-paper-300/70 md:text-lg">
            {service.shortDescription}
          </p>
        </SlideUp>
      </div>
    </section>
  );
}

function QuickAnswerSection({ content }: { content: ServiceContent }) {
  const heading = content.questionH2 ?? "Risposta rapida";
  return (
    <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-14">
      <SlideUp>
        <div className="rounded-2xl border border-paper-200 bg-white p-6 shadow-soft lg:p-8">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-leaf-600" />
            <h2 className="font-display text-xl text-forest-950 md:text-2xl">
              {heading}
            </h2>
          </div>
          <p className="font-body text-base leading-relaxed text-forest-900 md:text-lg">
            {content.quickAnswer}
          </p>
        </div>
      </SlideUp>
    </section>
  );
}

function BenefitsSection({ content }: { content: ServiceContent }) {
  return (
    <section className="bg-paper-50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {/* Intro + Body */}
          <div>
            <SlideUp>
              <Badge
                variant="primary"
                className="mb-4 bg-leaf-50 text-leaf-700"
              >
                <Leaf className="mr-1.5 h-3 w-3" />
                Il nostro approccio
              </Badge>
              <h2 className="font-display text-3xl leading-tight text-forest-950 md:text-4xl">
                Come lavoriamo
              </h2>
              <p className="mt-4 font-body text-lg leading-relaxed text-forest-800/80">
                {content.intro}
              </p>
              <p className="mt-3 font-body text-base leading-relaxed text-forest-800/60">
                {content.body}
              </p>
            </SlideUp>
          </div>

          {/* Deliverables */}
          <div>
            <SlideUp delay={0.1}>
              <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wide text-forest-950">
                Cosa comprende
              </h3>
              <ul className="space-y-4">
                {content.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                    <span className="font-body text-base leading-relaxed text-forest-800/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </SlideUp>
          </div>
        </div>

        {/* Results */}
        {content.results.length > 0 && (
          <StaggerContainer className="mt-16">
            <div className="grid gap-6 sm:grid-cols-3">
              {content.results.map((result, index) => (
                <StaggerItem key={result}>
                  <div className="rounded-xl border border-leaf-100 bg-leaf-50/50 p-6 text-center">
                    <span className="mb-2 block font-display text-3xl font-light text-leaf-700">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="font-body text-sm leading-relaxed text-forest-800/70">
                      {result}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

function ProcessSteps({ content }: { content: ServiceContent }) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SlideUp>
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl text-forest-950 md:text-4xl">
              Processo in{" "}
              <span className="text-leaf-700">
                {content.process.length} fasi
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg font-body text-forest-800/60">
              Dall&apos;idea alla realizzazione, ogni fase e monitorata.
            </p>
          </div>
        </SlideUp>

        <StaggerContainer>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.process.map((step, index) => (
              <StaggerItem key={step}>
                <div className="group relative rounded-2xl border border-paper-100 bg-paper-50 p-6 transition-all duration-300 hover:border-leaf-200 hover:shadow-soft">
                  <span className="mb-4 block font-display text-5xl font-light text-paper-200 transition-colors group-hover:text-leaf-200">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="font-body text-base font-medium leading-snug text-forest-900">
                    {step}
                  </p>
                  {index < content.process.length - 1 && (
                    <ArrowRight className="absolute right-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-paper-300 lg:block" />
                  )}
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

function FaqAccordion({ content }: { content: ServiceContent }) {
  if (content.faqs.length === 0) return null;

  return (
    <section className="bg-paper-50 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SlideUp>
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl text-forest-950 md:text-4xl">
              Domande frequenti
            </h2>
          </div>
        </SlideUp>

        <div className="space-y-3">
          {content.faqs.map((faq) => (
            <details
              key={faq.question}
              className="group overflow-hidden rounded-xl border border-paper-200 bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-forest-900 md:p-6">
                <span className="pr-4 text-base md:text-lg">
                  {faq.question}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-leaf-600 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="border-t border-paper-100 px-5 pb-5 pt-4 font-body text-base leading-relaxed text-forest-800/70 md:px-6 md:pb-6">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedServicesSection({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const related = staticServices
    .filter((s) => s.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SlideUp>
          <h2 className="mb-10 text-center font-display text-3xl text-forest-950 md:text-4xl">
            Servizi correlati
          </h2>
        </SlideUp>

        <StaggerContainer>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((service) => {
              const slug = normalizeServiceSlug(service.slug);
              const image =
                serviceImages[slug] ||
                "/images/servizi/progettazione-giardini-cover.png";

              return (
                <StaggerItem key={service._id}>
                  <Link
                    href={`/servizi/${slug}`}
                    className="group block overflow-hidden rounded-2xl border border-paper-100 bg-paper-50 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-300 hover:shadow-soft"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={image}
                        alt={`Servizio di ${service.title.toLowerCase()}`}
                        width={420}
                        height={263}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-forest-950 transition-colors group-hover:text-leaf-700">
                        {service.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-widest text-sun-500">
                        Scopri
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

function RelatedBlogSection({ serviceSlug }: { serviceSlug: string }) {
  const relatedBlogPosts = (relatedBlogSlugsByService[serviceSlug] ?? [])
    .map((slug) => blogArticlesBySlug[slug])
    .filter(Boolean);

  if (relatedBlogPosts.length === 0) return null;

  return (
    <section className="bg-paper-50 py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SlideUp>
          <h2 className="mb-8 font-display text-2xl text-forest-950 md:text-3xl">
            Approfondisci nel blog
          </h2>
        </SlideUp>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedBlogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-paper-200 bg-white px-6 py-5 transition-all hover:border-leaf-400 hover:shadow-soft"
            >
              <p className="mb-3 font-display text-xl text-forest-950 transition-colors group-hover:text-leaf-700">
                {post.title}
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-leaf-700">
                Leggi articolo
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrevNextNav({
  prevService,
  nextService,
}: {
  prevService: ServiceItem | null;
  nextService: ServiceItem | null;
}) {
  return (
    <section className="border-t border-paper-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-paper-300 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="py-8 pr-0 md:pr-8 lg:py-12">
            {prevService ? (
              <Link
                href={`/servizi/${prevService.slug}`}
                className="group flex items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-paper-400 transition-all group-hover:border-leaf-500 group-hover:bg-leaf-50">
                  <ArrowLeft className="h-5 w-5 text-forest-800/60 transition-colors group-hover:text-leaf-600" />
                </div>
                <div>
                  <p className="mb-1 font-sans text-xs uppercase tracking-widest text-forest-800/60">
                    Precedente
                  </p>
                  <p className="font-display text-lg text-forest-900 transition-colors group-hover:text-leaf-600">
                    {prevService.title}
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                href="/servizi"
                className="group flex items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-paper-400 transition-all group-hover:border-leaf-500 group-hover:bg-leaf-50">
                  <ArrowLeft className="h-5 w-5 text-forest-800/60 transition-colors group-hover:text-leaf-600" />
                </div>
                <div>
                  <p className="mb-1 font-sans text-xs uppercase tracking-widest text-forest-800/60">
                    Torna a
                  </p>
                  <p className="font-display text-lg text-forest-900 transition-colors group-hover:text-leaf-600">
                    Tutti i Servizi
                  </p>
                </div>
              </Link>
            )}
          </div>

          <div className="py-8 pl-0 md:pl-8 lg:py-12">
            {nextService ? (
              <Link
                href={`/servizi/${nextService.slug}`}
                className="group flex items-center justify-end gap-4 text-right"
              >
                <div>
                  <p className="mb-1 font-sans text-xs uppercase tracking-widest text-forest-800/60">
                    Successivo
                  </p>
                  <p className="font-display text-lg text-forest-900 transition-colors group-hover:text-leaf-600">
                    {nextService.title}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-paper-400 transition-all group-hover:border-leaf-500 group-hover:bg-leaf-50">
                  <ArrowRight className="h-5 w-5 text-forest-800/60 transition-colors group-hover:text-leaf-600" />
                </div>
              </Link>
            ) : (
              <Link
                href="/servizi"
                className="group flex items-center justify-end gap-4 text-right"
              >
                <div>
                  <p className="mb-1 font-sans text-xs uppercase tracking-widest text-forest-800/60">
                    Esplora
                  </p>
                  <p className="font-display text-lg text-forest-900 transition-colors group-hover:text-leaf-600">
                    Tutti i Servizi
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-paper-400 transition-all group-hover:border-leaf-500 group-hover:bg-leaf-50">
                  <ArrowRight className="h-5 w-5 text-forest-800/60 transition-colors group-hover:text-leaf-600" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Page Component ────────────────── */

export default function ServiceDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const trackShareEvent = useMutation(api.shareEvents.track);
  const landingTrackedRef = useRef(false);
  const [shareState, setShareState] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const slugParam = params.slug as string;
  const normalizedSlug = normalizeServiceSlug(slugParam);
  const service = staticServices.find(
    (item) => item.slug === normalizedSlug
  );
  const serviceIndex = staticServices.findIndex(
    (item) => item.slug === normalizedSlug
  );
  const nextService =
    serviceIndex >= 0 && serviceIndex < staticServices.length - 1
      ? staticServices[serviceIndex + 1]
      : null;
  const prevService =
    serviceIndex > 0 ? staticServices[serviceIndex - 1] : null;

  useEffect(() => {
    if (!service || landingTrackedRef.current) return;
    if (searchParams.get("ref") !== "wa-share") return;

    landingTrackedRef.current = true;
    void trackShareEvent({
      eventName: "share_landing",
      serviceSlug: service.slug,
      channel: searchParams.get("utm_source") ?? "whatsapp",
      pagePath: window.location.pathname,
    });
  }, [searchParams, service, trackShareEvent]);

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper-50">
        <div className="max-w-md px-6 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-paper-300">
            <Sprout className="h-10 w-10 text-forest-800/60" />
          </div>
          <h1 className="mb-4 font-display text-3xl text-forest-950">
            Servizio non trovato
          </h1>
          <p className="mb-8 font-body text-forest-800/70">
            Il servizio che stai cercando non esiste o potrebbe essere stato
            rimosso.
          </p>
          <Link href="/servizi">
            <Button variant="secondary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna ai Servizi
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl =
    serviceImageMap[service.slug] ||
    "/images/servizi/progettazione-giardini-cover.png";

  const fallbackContent: ServiceContent = {
    quickAnswer:
      "Questo servizio ti aiuta a raggiungere un risultato verde stabile e sostenibile con un piano operativo chiaro.",
    intro: `Supportiamo ${service.title.toLowerCase()} con metodo e attenzione al dettaglio.`,
    body: "Costruiamo una proposta pratica, realizzabile e coerente con obiettivi, tempi e contesto del tuo spazio.",
    deliverables: [
      "Analisi iniziale",
      "Piano operativo",
      "Intervento tecnico",
      "Verifica finale",
    ],
    process: ["Brief", "Piano", "Esecuzione", "Controllo"],
    results: [
      "Maggior controllo",
      "Qualita costante",
      "Gestione semplificata",
    ],
    whenToChoose: [
      "Serve una soluzione strutturata",
      "Vuoi ridurre errori",
      "Cerchi continuita",
    ],
    faqs: [
      {
        question: "Come funziona il servizio?",
        answer:
          "Partiamo da analisi e obiettivi, definiamo il piano e procediamo per fasi monitorate per garantire un risultato coerente.",
      },
    ],
  };

  const content = serviceContents[service.slug] ?? fallbackContent;

  const serviceUrl = `${SITE_URL}/servizi/${service.slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: content.quickAnswer,
    areaServed: siteConfig.areaServed,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.companyName,
      url: SITE_URL,
      telephone: siteConfig.phoneRaw,
      email: siteConfig.email,
    },
    url: serviceUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servizi",
        item: `${SITE_URL}/servizi`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: serviceUrl,
      },
    ],
  };

  const faqJsonLd =
    content.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const howToJsonLd =
    content.process && content.process.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `Come funziona: ${service.title}`,
          description: content.quickAnswer,
          step: content.process.map((stepText, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: `Step ${index + 1}`,
            text: stepText,
          })),
        }
      : null;

  const handleShare = async () => {
    const shareUrl = new URL(
      `${window.location.origin}${window.location.pathname}`
    );
    shareUrl.searchParams.set("ref", "wa-share");
    shareUrl.searchParams.set("utm_source", "whatsapp");
    shareUrl.searchParams.set("utm_medium", "share");
    shareUrl.searchParams.set("utm_campaign", "service_referral");

    try {
      await trackShareEvent({
        eventName: "share_clicked",
        serviceSlug: service.slug,
        channel: "whatsapp",
        pagePath: window.location.pathname,
      });
    } catch (error) {
      console.error("Share tracking failed:", error);
    }

    const message = `Guarda questo servizio di Visione Sostenibile: ${service.title} - ${shareUrl.toString()}`;
    const popup = window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    if (!popup) {
      setShareState("error");
      return;
    }

    setShareState("success");
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}

      {/* Hero */}
      <HeroSection service={service} imageUrl={imageUrl} />

      {/* Quick Answer (SEO featured snippet) */}
      <QuickAnswerSection content={content} />

      {/* Benefits + Deliverables */}
      <BenefitsSection content={content} />

      {/* Process Steps */}
      <ProcessSteps content={content} />

      {/* FAQ Accordion */}
      <FaqAccordion content={content} />

      {/* Related Blog */}
      <RelatedBlogSection serviceSlug={service.slug} />

      {/* Related Services */}
      <RelatedServicesSection currentSlug={service.slug} />

      {/* Reviews */}
      <div className="bg-paper-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <ReviewsWidget
            variant="featured"
            title="La voce dei nostri clienti"
            subtitle="Cosa dicono di questo servizio"
          />
        </div>
      </div>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-forest-950 py-20 text-paper-50 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sun-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
          <SlideUp>
            <span className="font-display text-lg italic text-leaf-400">
              Preventivo gratuito
            </span>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-paper-50 md:text-5xl">
              Inizia il tuo progetto di
              <span className="block italic text-leaf-400">
                {service.title.toLowerCase()}
              </span>
            </h2>
            <p className="mx-auto mb-10 mt-6 max-w-2xl text-lg leading-relaxed text-paper-300/80">
              Contattaci per una consulenza senza impegno. Definiamo insieme il
              percorso migliore per il tuo spazio verde.
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a href={`tel:${siteConfig.phoneRaw}`}>
                <Button
                  size="lg"
                  className="border-0 bg-sun-400 px-8 text-forest-950 hover:bg-sun-500"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Chiama ora
                </Button>
              </a>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-paper-400/30 px-8 text-paper-100 hover:border-paper-400/50 hover:bg-paper-100/10"
                >
                  Richiedi preventivo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </SlideUp>

          <div className="mt-8 flex flex-col justify-center gap-4 text-sm text-paper-400/80 sm:flex-row">
            <span className="inline-flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" />
              Piemonte, Trentino, Lombardia
            </span>
            <span className="inline-flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              Lun-Ven: 8:00-18:00
            </span>
          </div>
        </div>
      </section>

      {/* WhatsApp share (floating) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleShare}
          className="rounded-full bg-leaf-600 p-4 text-white shadow-deep transition-all hover:scale-110 hover:bg-leaf-700"
          aria-label="Condividi su WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        {shareState === "success" && (
          <div className="absolute bottom-full right-0 mb-2 flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm text-forest-800 shadow-medium">
            <CheckCircle2 className="h-4 w-4 text-leaf-500" />
            WhatsApp aperto
          </div>
        )}
      </div>

      {/* Prev/Next Navigation */}
      <PrevNextNav prevService={prevService} nextService={nextService} />

      {/* Scroll-triggered Quiz CTA */}
      <ScrollCTA />
    </div>
  );
}
