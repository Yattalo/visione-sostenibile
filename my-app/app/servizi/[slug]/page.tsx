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
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { staticServices } from "../../lib/static-data";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

type TemplateVariant = 1 | 2 | 3;
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

const serviceAccentMap: Record<string, string> = {
  "progettazione-giardini-orti": "from-leaf-600 to-forest-900",
  "realizzazione-chiavi-in-mano": "from-leaf-500 to-leaf-700",
  "manutenzione-sostenibile": "from-leaf-500 to-leaf-500",
  "potatura-professionale": "from-leaf-400 to-leaf-700",
  "gestione-verde-biodinamica": "from-leaf-700 to-forest-950",
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

const templateLabels: Record<TemplateVariant, string> = {
  1: "Template Consulenziale",
  2: "Template Processo",
  3: "Template Decisione Rapida",
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

function resolveTemplate(value: string | null, fallbackIndex: number): TemplateVariant {
  const parsed = Number(value);
  if (parsed === 1 || parsed === 2 || parsed === 3) {
    return parsed;
  }

  const normalizedIndex = fallbackIndex >= 0 ? fallbackIndex : 0;
  return ((normalizedIndex % 3) + 1) as TemplateVariant;
}

function TemplateOne({
  service,
  content,
  imageUrl,
  gradientClass,
  onShare,
  shareState,
}: {
  service: ServiceItem;
  content: ServiceContent;
  imageUrl: string;
  gradientClass: string;
  onShare: () => void;
  shareState: "idle" | "success" | "error";
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-18">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        <article className="lg:col-span-2 space-y-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-deep">
            <Image
              src={imageUrl}
              alt={service.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          <div className="bg-white rounded-2xl border border-paper-300 p-7 lg:p-9">
            <h2 className="font-display text-3xl text-forest-950 mb-4">Panoramica servizio</h2>
            <p className="text-lg text-forest-900 leading-relaxed mb-6">{content.intro}</p>
            <p className="text-forest-800 leading-relaxed">{content.body}</p>
          </div>

          <div className="bg-paper-100 rounded-2xl p-7 lg:p-9">
            <h3 className="font-display text-2xl text-forest-950 mb-5">Cosa include</h3>
            <ul className="space-y-3">
              {content.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-forest-900">
                  <Check className="w-4 h-4 mt-1 text-leaf-700 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border border-paper-300 p-7">
            <h3 className="font-display text-2xl text-forest-950 mb-3">Richiedi consulenza</h3>
            <p className="text-forest-800 mb-5">
              Parliamo del tuo obiettivo e definiamo il percorso migliore per {service.title.toLowerCase()}.
            </p>
            <Link href="/contatti" className="block mb-5">
              <Button className="w-full">
                Contattaci ora
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <div className="space-y-3 text-sm text-forest-800">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +39 06 1234567
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> info@visionesostenibile.it
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> Lun-Ven 8:00-18:00
              </p>
            </div>
          </div>

          <div className="bg-forest-950 rounded-2xl p-7 text-paper-100">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientClass} mb-4`} />
            <h3 className="font-display text-xl mb-3">Video del servizio</h3>
            <video controls className="w-full rounded-xl mb-5" preload="metadata">
              <source src="/videos/nature-garden-flowers.mp4" type="video/mp4" />
            </video>
            <Button className="w-full bg-sun-400 hover:bg-sun-500 border-0" onClick={onShare}>
              <MessageCircle className="mr-2 w-4 h-4" />
              Condividi su WhatsApp
            </Button>
            {shareState === "success" && (
              <p className="mt-3 text-sm text-paper-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-leaf-300" />
                WhatsApp aperto. Scegli un contatto.
              </p>
            )}
            {shareState === "error" && (
              <p className="mt-3 text-sm text-leaf-300">Non siamo riusciti ad aprire WhatsApp. Riprova.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function TemplateTwo({
  content,
  onShare,
  shareState,
}: {
  content: ServiceContent;
  onShare: () => void;
  shareState: "idle" | "success" | "error";
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-14 lg:py-18 space-y-8">
      <div className="bg-white rounded-2xl border border-paper-300 p-7 lg:p-9">
        <h2 className="font-display text-3xl text-forest-950 mb-4">Processo in 4 fasi</h2>
        <ol className="space-y-4">
          {content.process.map((step, index) => (
            <li key={step} className="flex items-start gap-3 text-forest-900 text-lg">
              <span className="text-leaf-600 font-semibold mt-0.5">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {content.results.map((result) => (
          <div key={result} className="bg-paper-100 rounded-2xl p-6">
            <h3 className="font-display text-xl text-forest-950 mb-3">Risultato atteso</h3>
            <p className="text-forest-800">{result}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-paper-300 p-7 lg:p-9">
          <h3 className="font-display text-2xl text-forest-950 mb-4">Elementi inclusi</h3>
          <ul className="space-y-3">
            {content.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-forest-900">
                <Check className="w-4 h-4 mt-1 text-leaf-700 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-forest-950 rounded-2xl p-7 lg:p-9 text-paper-100">
          <h3 className="font-display text-2xl mb-4">Spazio video</h3>
          <p className="text-paper-300/85 mb-4">
            Panoramica operativa del servizio, utile per capire metodo e risultato.
          </p>
          <video controls className="w-full rounded-xl mb-5" preload="metadata">
            <source src="/videos/garden-bloom-timelapse.mp4" type="video/mp4" />
          </video>
          <Button className="w-full bg-sun-400 hover:bg-sun-500 border-0" onClick={onShare}>
            <MessageCircle className="mr-2 w-4 h-4" />
            Condividi su WhatsApp
          </Button>
          {shareState === "success" && (
            <p className="mt-3 text-sm text-paper-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-leaf-300" />
              Link aperto su WhatsApp.
            </p>
          )}
          {shareState === "error" && <p className="mt-3 text-sm text-leaf-300">Riprova tra poco.</p>}
        </div>
      </div>
    </section>
  );
}

function TemplateThree({
  content,
  onShare,
  shareState,
}: {
  content: ServiceContent;
  onShare: () => void;
  shareState: "idle" | "success" | "error";
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-8 py-14 lg:py-18 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-paper-300 p-7 lg:p-9">
          <h2 className="font-display text-3xl text-forest-950 mb-4">Quando scegliere questo servizio</h2>
          <ul className="space-y-3">
            {content.whenToChoose.map((item) => (
              <li key={item} className="flex gap-3 text-forest-900">
                <Check className="w-4 h-4 mt-1 text-leaf-700 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-paper-100 rounded-2xl p-7 lg:p-9">
          <h3 className="font-display text-2xl text-forest-950 mb-4">Benefici principali</h3>
          <ul className="space-y-3">
            {content.results.map((item) => (
              <li key={item} className="text-forest-900">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-paper-300 p-7 lg:p-9 overflow-x-auto">
        <h3 className="font-display text-2xl text-forest-950 mb-5">Confronto rapido</h3>
        <table className="w-full min-w-[620px] text-left border-collapse">
          <thead>
            <tr className="border-b border-paper-300">
              <th className="py-3 pr-4 font-display text-forest-950">Aspetto</th>
              <th className="py-3 pr-4 font-display text-forest-950">Gestione autonoma</th>
              <th className="py-3 font-display text-forest-950">Con servizio professionale</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-paper-300">
              <td className="py-3 pr-4">Pianificazione</td>
              <td className="py-3 pr-4 text-forest-800">Spesso frammentata</td>
              <td className="py-3 text-forest-800">Roadmap chiara e progressiva</td>
            </tr>
            <tr className="border-b border-paper-300">
              <td className="py-3 pr-4">Controllo qualita</td>
              <td className="py-3 pr-4 text-forest-800">Variabile</td>
              <td className="py-3 text-forest-800">Standard operativi costanti</td>
            </tr>
            <tr>
              <td className="py-3 pr-4">Continuita nel tempo</td>
              <td className="py-3 pr-4 text-forest-800">Dipende dalla disponibilita</td>
              <td className="py-3 text-forest-800">Programmazione periodica affidabile</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-forest-950 rounded-2xl p-7 lg:p-9 text-paper-100">
        <h3 className="font-display text-2xl mb-4">Video e condivisione</h3>
        <video controls className="w-full rounded-xl mb-5" preload="metadata">
          <source src="/videos/nature-garden-flowers.mp4" type="video/mp4" />
        </video>
        <Button className="bg-sun-400 hover:bg-sun-500 border-0" onClick={onShare}>
          <MessageCircle className="mr-2 w-4 h-4" />
          Condividi su WhatsApp
        </Button>
        {shareState === "success" && (
          <p className="mt-3 text-sm text-paper-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-leaf-300" />
            WhatsApp aperto correttamente.
          </p>
        )}
        {shareState === "error" && <p className="mt-3 text-sm text-leaf-300">Condivisione non riuscita.</p>}
      </div>
    </section>
  );
}

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

  const template = resolveTemplate(searchParams.get("template"), serviceIndex);
  const IconComponent = serviceIconMap[service.slug] || Sprout;
  const gradientClass = serviceAccentMap[service.slug] || "from-leaf-600 to-forest-900";
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

      <section className="relative overflow-hidden bg-forest-950 pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-900/85 to-forest-950/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-9">
            <Link href="/" className="text-paper-400 hover:text-paper-300 transition-colors">
              Home
            </Link>
            <span className="text-paper-600">/</span>
            <Link href="/servizi" className="text-paper-400 hover:text-paper-300 transition-colors">
              Servizi
            </Link>
            <span className="text-paper-600">/</span>
            <span className="text-paper-300">{service.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-7`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 px-5 py-1.5 text-xs tracking-widest uppercase">
                  Servizio {(serviceIndex + 1).toString().padStart(2, "0")}
                </Badge>
                <Badge className="bg-sun-400/20 border border-leaf-500/30 text-leaf-200">
                  {templateLabels[template]}
                </Badge>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-paper-50 leading-tight mb-5">
                {service.title}
              </h1>
              <p className="text-xl text-paper-300/85 leading-relaxed">{service.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-12">
        <div className="bg-white border border-paper-300 rounded-2xl p-6 lg:p-8">
          <h2 className="font-display text-2xl lg:text-3xl text-forest-950 mb-4">Risposta rapida</h2>
          <p className="text-lg text-forest-900 leading-relaxed">{content.quickAnswer}</p>
        </div>
      </section>

      {template === 1 && (
        <TemplateOne
          service={service}
          content={content}
          imageUrl={imageUrl}
          gradientClass={gradientClass}
          onShare={handleShare}
          shareState={shareState}
        />
      )}

      {template === 2 && (
        <TemplateTwo content={content} onShare={handleShare} shareState={shareState} />
      )}

      {template === 3 && (
        <TemplateThree content={content} onShare={handleShare} shareState={shareState} />
      )}

      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-white border border-paper-300 rounded-2xl p-7 lg:p-9">
          <h2 className="font-display text-3xl text-forest-950 mb-6">FAQ servizio</h2>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="rounded-xl border border-paper-300 p-4 open:bg-paper-50">
                <summary className="cursor-pointer list-none font-display text-lg text-forest-950">
                  {faq.question}
                </summary>
                <p className="mt-3 text-forest-800 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}
