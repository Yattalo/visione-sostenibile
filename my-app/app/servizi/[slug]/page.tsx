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
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { normalizeServiceSlug, staticServices } from "../../lib/static-data";
import { Button } from "../../components/ui/Button";
import { ScrollCTA } from "../../components/ScrollCTA";
import { QuizCTA } from "../../components/QuizCTA";
import { ImageCarousel } from "../../components/ImageCarousel";
import { ProcessSteps } from "../../components/ProcessSteps";
import { VideoShowcase } from "../../components/VideoShowcase";
import { AccordionFAQ } from "../../components/AccordionFAQ";

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

const serviceQuestionH2: Record<string, string> = {
  "progettazione-giardini": "Quanto costa la progettazione di un giardino sostenibile?",
  "realizzazione-giardini": "Cosa include la realizzazione di un giardino chiavi in mano?",
  manutenzioni: "Come funziona la manutenzione programmata del giardino?",
  potature: "Quando e come potare gli alberi in modo corretto?",
  "rigenerazione-terreni": "Come funziona la gestione biodinamica del verde?",
  "scelta-piante": "Come scegliere le piante giuste per il proprio giardino?",
  "trattamenti-piante": "Quali trattamenti servono per mantenere le piante sane?",
  "impianti-irrigazione": "Come funziona un impianto di irrigazione efficiente?",
  "camminamenti-pietra": "Come si realizzano camminamenti in pietra naturale?",
  "illuminazione-esterni": "Come illuminare il giardino in modo efficace e sostenibile?",
  "arredamento-esterni": "Come arredare gli spazi esterni per viverli tutto l'anno?",
  "ingegneria-naturalistica": "Cos'è l'ingegneria naturalistica e quando serve?",
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
      "La realizzazione di giardini chiavi in mano ti permette di avere un unico referente dalla preparazione del terreno alla posa finale di piante e finiture. In questo modo riduci coordinamento tra fornitori, tempi morti in cantiere e rischi di incompatibilita. Il risultato è uno spazio verde pronto da vivere con tempi e costi piu prevedibili.",
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
      "La manutenzione sostenibile mantiene il giardino sano e ordinato con interventi programmati per stagione, tecniche a basso impatto ambientale e prevenzione fitosanitaria mirata. Questo approccio riduce il degrado progressivo delle piante, previene emergenze e aiuta a contenere i costi straordinari nel medio-lungo periodo.",
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
      "La potatura professionale migliora struttura, sicurezza e vitalita delle piante quando viene eseguita nel periodo corretto, con tagli adeguati alla specie e alla sua fisiologia. Interventi non invasivi e graduali riducono lo stress vegetativo, favoriscono una crescita equilibrata della chioma e abbassano i rischi legati a rami deboli o malposizionati.",
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
      "La gestione biodinamica del verde punta a rigenerare suolo e piante attraverso pratiche naturali, nutrizione organica e rispetto dei cicli stagionali. Il risultato e un ecosistema giardino piu resiliente e autonomo, con minore dipendenza da trattamenti chimici, maggiore fertilita biologica del terreno e una stabilita complessiva che migliora nel tempo.",
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


function RelatedBlogSection({ serviceSlug }: { serviceSlug: string }) {
  const relatedBlogPosts = (relatedBlogSlugsByService[serviceSlug] ?? [])
    .map((slug) => blogArticlesBySlug[slug])
    .filter(Boolean);

  if (relatedBlogPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-paper-100">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-4xl md:text-5xl text-forest-950 mb-10 leading-tight">
          Approfondisci nel blog
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {relatedBlogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-paper-300 bg-white px-6 py-5 hover:border-leaf-400 hover:shadow-soft transition-all"
            >
              <p className="font-display text-2xl text-forest-950 group-hover:text-leaf-700 transition-colors mb-3">
                {post.title}
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-leaf-700">
                Leggi articolo
                <ArrowRight className="w-3.5 h-3.5" />
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

  const serviceUrl = `${SITE_URL}/servizi/${service.slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: content.quickAnswer,
    areaServed: ["Torino", "Piemonte", "Trentino Alto-Adige", "Lombardia"],
    provider: {
      "@type": "LocalBusiness",
      name: "Visione Sostenibile",
      url: SITE_URL,
      telephone: "+393714821825",
      email: "visionesostenibile96@gmail.com",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Section 1: Full-Bleed Hero */}
      <HeroSection service={service} imageUrl={imageUrl} />

      {/* Quick Answer (SEO featured snippet target) */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        <div className="bg-white border border-paper-300 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-leaf-600" />
            <h2 className="font-display text-2xl text-forest-950">
              {serviceQuestionH2[service.slug] ?? "Risposta rapida"}
            </h2>
          </div>
          <p className="font-body text-forest-900 leading-relaxed text-lg">{content.quickAnswer}</p>
        </div>
      </section>

      {/* Section 2: Editorial Intro */}
      <EditorialIntro content={content} />

      {/* Section 3: Image Carousel */}
      <ImageCarousel
        images={[
          imageUrl.replace("?w=1200", "?w=800"),
          ...carouselImagesPool.filter((img) => img !== imageUrl.replace("?w=1200", "?w=800")),
        ]}
        altPrefix={service.slug}
      />

      {/* Section 4: Process Steps */}
      <ProcessSteps steps={content.process} />

      {/* Section 5: Video Showcase */}
      <VideoShowcase imageUrl={imageUrl} alt={`${service.title} video`} />

      {/* Section 6: FAQ Accordion */}
      <AccordionFAQ faqs={content.faqs} />

      {/* Section 6b: Quiz CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-md mx-auto px-6 lg:px-8">
          <QuizCTA variant="sidebar" />
        </div>
      </section>

      {/* Section 7: Blog internal links */}
      <RelatedBlogSection serviceSlug={service.slug} />

      {/* Section 8: CTA (kept as-is) */}
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
            <a href="tel:+393714821825">
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
              Piemonte · Trentino · Lombardia
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

      {/* Scroll-triggered Quiz CTA */}
      <ScrollCTA />
    </div>
  );
}
