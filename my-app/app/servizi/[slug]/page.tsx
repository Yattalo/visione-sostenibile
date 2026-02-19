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
  Play,
  ChevronDown,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { normalizeServiceSlug, staticServices } from "../../lib/static-data";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/utils";

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

// All carousel images pool — service images + generic garden photos
const carouselImagesPool = [
  "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800",
];

const serviceSubtitles: Record<string, string> = {
  "progettazione-giardini": "Dal concept alla realta",
  "realizzazione-giardini": "Senza pensieri",
  manutenzioni: "Cura continua",
  potature: "Precisione e rispetto",
  "rigenerazione-terreni": "Equilibrio naturale",
};

const serviceContents: Record<string, ServiceContent> = {
  "progettazione-giardini": {
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
  "realizzazione-giardini": {
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
  manutenzioni: {
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
  potature: {
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
  "rigenerazione-terreni": {
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
  
  // Split title for thin/bold effect
  const words = service.title.split(" ");
  const firstPart = words.slice(0, words.length > 2 ? 1 : 1).join(" ");
  const secondPart = words.slice(words.length > 2 ? 1 : 1).join(" ");

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={service.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Double gradient: pronounced top and deep bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pb-20 md:pb-32">
          <h1 className="text-stitch-heading text-5xl md:text-8xl text-white">
            <span className="font-light block mb-2">{firstPart}</span>
            <span className="font-bold block">{secondPart}</span>
            {subtitle && (
              <span className="block font-light italic text-2xl md:text-4xl mt-6 text-paper-200/90 tracking-normal normal-case">
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
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-leaf-700 leading-[1.1] tracking-tight uppercase">
              <span className="font-light block">Il tuo giardino</span>
              <span className="font-light block">può tingersi di</span>
              <span className="font-bold block">Fascino</span>
            </h2>
            <p className="mt-4 text-micro text-leaf-600/60 font-bold italic tracking-widest">Anche nelle ore serali</p>
          </div>
          <div className="space-y-8">
            <p className="text-lg text-forest-900/80 leading-relaxed">
              {content.intro}
            </p>
            <p className="text-lg text-forest-800/60 leading-relaxed">
              {content.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageCarousel({ imageUrl, slug }: { imageUrl: string; slug: string }) {
  const [current, setCurrent] = useState(0);

  // Build image list: main image first, then pool (deduplicated)
  const mainThumb = imageUrl.replace("?w=1200", "?w=800");
  const images = [mainThumb, ...carouselImagesPool.filter((img) => img !== mainThumb)];
  const total = images.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-advance every 4s
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  // Positions: -1, 0 (center), +1
  const getOffset = (index: number) => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section className="bg-paper-100 py-24 overflow-hidden">
      <div className="carousel-container max-w-5xl mx-auto px-6">
        {/* Horizontal Carousel - Single Level, No Tilt */}
        <div className="relative h-[480px] flex items-center justify-center">
          {images.map((img, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);

            // Show 3 cards (center + sides)
            if (absOffset > 1) return null;

            const isCenter = offset === 0;
            
            // X: Controlled overlap
            const translateX = offset * 240; 
            // Scale: Sides are smaller as requested
            const scale = isCenter ? 1 : 0.85;
            const zIndex = isCenter ? 20 : 10;
            const opacity = isCenter ? 1 : 0.7;

            return (
              <div
                key={img}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                onClick={() => {
                  if (offset < 0) prev();
                  if (offset > 0) next();
                }}
              >
                <div
                  className={cn(
                    "relative w-64 md:w-80 aspect-[3.5/4.5] rounded-[40px] overflow-hidden transition-all duration-500",
                    isCenter
                      ? "shadow-floating"
                      : "shadow-medium"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${slug} foto ${index + 1}`}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                  {!isCenter && <div className="absolute inset-0 bg-black/10" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators - Gold/Yellow */}
        <div className="flex justify-center gap-2.5 mt-12">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Vai alla foto ${i + 1}`}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                i === current ? "bg-sun-400 w-8" : "bg-sun-200/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSteps({ content }: { content: ServiceContent }) {
  return (
    <section className="py-24 lg:py-32 bg-paper-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
          {/* Left: title block */}
          <div className="lg:col-span-4 mb-16 lg:mb-0">
            <h2 className="font-display text-5xl md:text-6xl text-leaf-600 uppercase tracking-tight leading-none">
              <span className="font-light block">Processo in</span>
              <span className="font-bold block">{content.process.length} Fasi</span>
            </h2>
            <p className="mt-6 text-micro text-forest-800/40">
              Dall&apos;idea alla realizzazione
            </p>
          </div>

          {/* Right: step cards - 2x2 Neumorphic Grid */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {content.process.map((step, index) => (
                <div
                  key={step}
                  className="step-card bg-white p-6 md:p-10 rounded-[20px] flex gap-6 md:gap-10 items-center min-h-[160px]"
                >
                  <span className="text-7xl md:text-8xl font-display text-paper-200/50 font-black leading-none shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-base md:text-lg text-forest-900 leading-snug font-medium">
                      {step}
                    </p>
                  </div>
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
    <section className="py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[30px] md:rounded-[50px] overflow-hidden h-[400px] md:h-[600px] group cursor-pointer shadow-deep">
          <Image
            src={imageUrl}
            alt={`${service.title} video`}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-stitch-heading text-4xl md:text-7xl text-white mb-10 drop-shadow-lg">
              Che cosa
              <span className="block font-bold">Aspettarsi</span>
            </h2>
            <div className="bg-white/90 backdrop-blur-md rounded-full p-6 md:p-8 transition-all duration-500 group-hover:scale-110 shadow-xl">
              <Play className="w-8 h-8 md:w-12 md:h-12 text-forest-900 fill-forest-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion({ content }: { content: ServiceContent }) {
  return (
    <section className="py-24 lg:py-32 bg-paper-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-leaf-600 uppercase tracking-tight">
            FAQ
          </h2>
        </div>
        <div className="space-y-4">
          {content.faqs.map((faq) => (
            <details
              key={faq.question}
              className="faq-card bg-white rounded-xl overflow-hidden shadow-sm group border border-paper-200/30"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-forest-900">
                <span className="text-lg">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-leaf-600 transition-transform duration-500 group-open:rotate-180 shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-forest-800/70 leading-relaxed text-lg border-t border-paper-50 pt-4">
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

  const slugParam = params.slug as string;
  const normalizedSlug = normalizeServiceSlug(slugParam);
  const service = staticServices.find((item) => item.slug === normalizedSlug);
  const serviceIndex = staticServices.findIndex((item) => item.slug === normalizedSlug);
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
