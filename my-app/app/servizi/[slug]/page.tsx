"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ElementType } from "react";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  MapPin,
  Check,
  MessageCircle,
  CheckCircle2,
  Sprout,
  PenTool,
  Hammer,
  Scissors,
  Leaf,
  Flower2,
  Play,
  ChevronDown,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { staticServices } from "../../lib/static-data";
import { Button } from "../../components/ui/Button";

type ServiceItem = (typeof staticServices)[number];

type FaqItem = {
  question: string;
  answer: string;
};

type ServiceContent = {
  quickAnswer: string;
  intro: string;
  body: string;
  deliverables: string[];
  process: string[];
  results: string[];
  whenToChoose: string[];
  faqs: FaqItem[];
};

const SITE_URL = "https://www.visionesostenibile.it";

const serviceIconMap: Record<string, ElementType> = {
  "progettazione-giardini-orti": PenTool,
  "realizzazione-chiavi-in-mano": Hammer,
  "manutenzione-sostenibile": Leaf,
  "potatura-professionale": Scissors,
  "gestione-verde-biodinamica": Flower2,
};

const serviceImageMap: Record<string, string> = {
  "progettazione-giardini-orti":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
  "realizzazione-chiavi-in-mano":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  "manutenzione-sostenibile":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
  "potatura-professionale":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
  "gestione-verde-biodinamica":
    "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200",
};

// Side images for the carousel — generic garden Unsplash photos
const carouselSideImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
];

const serviceSubtitles: Record<string, string> = {
  "progettazione-giardini-orti": "Dal concept alla realtà",
  "realizzazione-chiavi-in-mano": "Senza pensieri",
  "manutenzione-sostenibile": "Cura continua",
  "potatura-professionale": "Precisione e rispetto",
  "gestione-verde-biodinamica": "Equilibrio naturale",
};

const serviceContents: Record<string, ServiceContent> = {
  "progettazione-giardini-orti": {
    quickAnswer:
      "La progettazione di giardini e orti sostenibili funziona meglio quando parte da analisi del sito, obiettivi d'uso e scelta botanica locale. Cosi ottieni un progetto realizzabile, riduci errori in cantiere e abbassi i costi di manutenzione nel medio periodo.",
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
  "realizzazione-chiavi-in-mano": {
    quickAnswer:
      "La realizzazione chiavi in mano ti permette di avere un unico referente dalla preparazione del terreno alla posa finale. In questo modo riduci coordinamento, tempi morti e rischi di incompatibilita tra fornitori diversi.",
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
  "manutenzione-sostenibile": {
    quickAnswer:
      "La manutenzione sostenibile mantiene il giardino sano con interventi programmati, tecniche a basso impatto e prevenzione stagionale. L'approccio riduce degrado progressivo e aiuta a contenere costi straordinari nel tempo.",
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
  "potatura-professionale": {
    quickAnswer:
      "La potatura professionale migliora struttura, sicurezza e vitalita delle piante quando viene eseguita nel periodo corretto e con tagli adeguati. Interventi non invasivi riducono stress vegetativo e aiutano una crescita equilibrata.",
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
  "gestione-verde-biodinamica": {
    quickAnswer:
      "La gestione biodinamica del verde punta a rigenerare suolo e piante con pratiche naturali e cicli stagionali coerenti. Il risultato e un ecosistema piu resiliente, con minore dipendenza da interventi chimici e maggiore stabilita complessiva.",
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
};

/* ── Section Components ────────────────── */

function HeroSection({ service, imageUrl }: { service: ServiceItem; imageUrl: string }) {
  const subtitle = serviceSubtitles[service.slug] ?? "";
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={service.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pb-24">
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white leading-[0.95] tracking-tight">
            {service.title}
            {subtitle && (
              <span className="block font-light italic text-4xl md:text-5xl mt-2 text-paper-200/90">
                {subtitle}
              </span>
            )}
          </h1>
        </div>
      </div>
    </section>
  );
}

function EditorialIntro({ content }: { content: ServiceContent }) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-sun-400 font-semibold block mb-4">
              Il nostro approccio
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-forest-950 leading-tight">
              Un metodo{" "}
              <span className="italic text-leaf-600">pensato</span>
              <br />
              per il tuo verde
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-forest-800 leading-relaxed">
              {content.intro}
            </p>
            <p className="text-lg text-forest-800/80 leading-relaxed">
              {content.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageCarousel({ imageUrl, slug }: { imageUrl: string; slug: string }) {
  // Pick two side images that differ from the main one
  const sideImages = carouselSideImages.filter((img) => img !== imageUrl.replace("?w=1200", "?w=800")).slice(0, 2);
  const leftImage = sideImages[0] ?? carouselSideImages[0];
  const rightImage = sideImages[1] ?? carouselSideImages[1];

  return (
    <section className="bg-paper-100 py-12 overflow-hidden">
      <div className="carousel-container max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Left side image */}
          <div className="hidden sm:block w-1/4 h-80 rounded-carousel overflow-hidden opacity-60 shrink-0">
            <div className="relative w-full h-full">
              <Image
                src={leftImage}
                alt={`${slug} ambiente 1`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Center image */}
          <div className="w-full sm:w-1/3 aspect-[4/5] rounded-carousel overflow-hidden scale-100 sm:scale-110 z-10 border-4 border-white shadow-2xl shrink-0">
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={`${slug} principale`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side image */}
          <div className="hidden sm:block w-1/4 h-80 rounded-carousel overflow-hidden opacity-60 shrink-0">
            <div className="relative w-full h-full">
              <Image
                src={rightImage}
                alt={`${slug} ambiente 2`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 1 ? "bg-forest-950" : "bg-paper-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSteps({ content }: { content: ServiceContent }) {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 gap-12">
          {/* Left: title block */}
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <span className="text-xs uppercase tracking-[0.2em] text-sun-400 font-semibold block mb-4">
              Come lavoriamo
            </span>
            <h2 className="font-display text-4xl text-forest-950">
              Processo in
              <span className="block text-6xl font-bold">
                {content.process.length} Fasi
              </span>
            </h2>
          </div>

          {/* Right: step cards */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {content.process.map((step, index) => (
                <div
                  key={step}
                  className="step-card bg-white p-8 rounded-xl"
                >
                  <span className="text-5xl font-display text-paper-300 font-bold block mb-3">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <h4 className="font-semibold mb-2 text-forest-950">
                    Fase {index + 1}
                  </h4>
                  <p className="text-sm text-forest-800/60 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoShowcase({ service, imageUrl }: { service: ServiceItem; imageUrl: string }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden h-[500px] group cursor-pointer shadow-2xl">
          <Image
            src={imageUrl}
            alt={`${service.title} video`}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-8">
              Che cosa
              <span className="block font-bold">Aspettarsi</span>
            </h2>
            <div className="bg-white/20 backdrop-blur-md rounded-full p-6 transition-transform duration-300 group-hover:scale-110">
              <Play className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion({ content }: { content: ServiceContent }) {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-4xl text-center text-forest-950 uppercase tracking-widest mb-16">
          Domande frequenti
        </h2>
        <div className="space-y-4">
          {content.faqs.map((faq) => (
            <details
              key={faq.question}
              className="faq-card bg-white rounded-xl overflow-hidden shadow-sm group"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-forest-800">
                <span>{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-forest-800/40 transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-forest-800/70 leading-relaxed">
                {faq.answer}
              </div>
            </details>
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-paper-300">
          <div className="py-8 lg:py-12 pr-0 md:pr-8">
            {prevService ? (
              <Link href={`/servizi/${prevService.slug}`} className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowLeft className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">Precedente</p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    {prevService.title}
                  </p>
                </div>
              </Link>
            ) : (
              <Link href="/servizi" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowLeft className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">Torna a</p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    Tutti i Servizi
                  </p>
                </div>
              </Link>
            )}
          </div>

          <div className="py-8 lg:py-12 pl-0 md:pl-8">
            {nextService ? (
              <Link
                href={`/servizi/${nextService.slug}`}
                className="group flex items-center justify-end gap-4 text-right"
              >
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">Successivo</p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    {nextService.title}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowRight className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                </div>
              </Link>
            ) : (
              <Link href="/servizi" className="group flex items-center justify-end gap-4 text-right">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">Esplora</p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    Tutti i Servizi
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowRight className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
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
  const [shareState, setShareState] = useState<"idle" | "success" | "error">("idle");

  const slug = params.slug as string;
  const service = staticServices.find((item) => item.slug === slug);
  const serviceIndex = staticServices.findIndex((item) => item.slug === slug);
  const nextService =
    serviceIndex >= 0 && serviceIndex < staticServices.length - 1
      ? staticServices[serviceIndex + 1]
      : null;
  const prevService = serviceIndex > 0 ? staticServices[serviceIndex - 1] : null;

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
      <div className="min-h-screen flex items-center justify-center bg-paper-50">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-paper-300 flex items-center justify-center mx-auto mb-6">
            <Sprout className="w-10 h-10 text-forest-800/60" />
          </div>
          <h1 className="font-display text-3xl text-forest-950 mb-4">Servizio non trovato</h1>
          <p className="font-body text-forest-800/70 mb-8">
            Il servizio che stai cercando non esiste o potrebbe essere stato rimosso.
          </p>
          <Link href="/servizi">
            <Button variant="secondary">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Torna ai Servizi
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl =
    serviceImageMap[service.slug] ||
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200";

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
    results: ["Maggior controllo", "Qualita costante", "Gestione semplificata"],
    whenToChoose: ["Serve una soluzione strutturata", "Vuoi ridurre errori", "Cerchi continuita"],
    faqs: [
      {
        question: "Come funziona il servizio?",
        answer:
          "Partiamo da analisi e obiettivi, definiamo il piano e procediamo per fasi monitorate per garantire un risultato coerente.",
      },
    ],
  };

  const content = serviceContents[service.slug] ?? fallbackContent;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: content.quickAnswer,
    provider: {
      "@type": "LocalBusiness",
      name: "Visione Sostenibile",
      areaServed: "Piemonte e Lombardia",
    },
    url: `${SITE_URL}/servizi/${service.slug}`,
  };

  const faqJsonLd = {
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
  };

  const handleShare = async () => {
    const shareUrl = new URL(`${window.location.origin}${window.location.pathname}`);
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Section 1: Full-Bleed Hero */}
      <HeroSection service={service} imageUrl={imageUrl} />

      {/* Section 2: Editorial Intro */}
      <EditorialIntro content={content} />

      {/* Section 3: Image Carousel */}
      <ImageCarousel imageUrl={imageUrl} slug={service.slug} />

      {/* Section 4: Process Steps */}
      <ProcessSteps content={content} />

      {/* Section 5: Video Showcase */}
      <VideoShowcase service={service} imageUrl={imageUrl} />

      {/* Section 6: FAQ Accordion */}
      <FaqAccordion content={content} />

      {/* Section 7: CTA (kept as-is) */}
      <section className="relative py-24 lg:py-32 bg-forest-950 text-paper-50 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="font-display italic text-leaf-400 text-lg">Preventivo gratuito</span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-paper-50 mt-4 mb-6 leading-tight">
            Inizia il tuo progetto di
            <span className="block italic text-leaf-400">{service.title.toLowerCase()}</span>
          </h2>
          <p className="text-lg text-paper-300/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contattaci per una consulenza senza impegno. Definiamo insieme il percorso migliore per il tuo spazio verde.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+39061234567">
              <Button
                size="lg"
                className="bg-sun-400 hover:bg-sun-500 text-white border-0 px-8"
              >
                <Phone className="mr-2 w-5 h-5" />
                Chiama ora
              </Button>
            </a>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-paper-400/30 text-paper-100 hover:bg-paper-100/10 hover:border-paper-400/50 px-8"
              >
                Richiedi preventivo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-paper-400/80 flex flex-col sm:flex-row justify-center gap-4">
            <span className="inline-flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4" />
              Piemonte e Lombardia
            </span>
            <span className="inline-flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4" />
              Lun-Ven: 8:00-18:00
            </span>
          </div>
        </div>
      </section>

      {/* WhatsApp share (floating) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleShare}
          className="bg-leaf-600 hover:bg-leaf-700 text-white rounded-full p-4 shadow-deep transition-all hover:scale-110"
          aria-label="Condividi su WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        {shareState === "success" && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-medium px-4 py-2 text-sm text-forest-800 whitespace-nowrap flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-leaf-500" />
            WhatsApp aperto
          </div>
        )}
      </div>

      {/* Prev/Next Navigation */}
      <PrevNextNav prevService={prevService} nextService={nextService} />
    </div>
  );
}
