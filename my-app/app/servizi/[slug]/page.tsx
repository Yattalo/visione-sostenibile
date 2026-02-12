"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  MapPin,
  Check,
  PenTool,
  Hammer,
  Flower2,
  HeartPulse,
  Droplets,
  Layers,
  Lightbulb,
  Mountain,
  Armchair,
  Scissors,
  Sprout,
  Wrench,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { staticServices } from "../../lib/static-data";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

/* ─── Icon & image maps ─── */

const serviceIconMap: Record<string, React.ElementType> = {
  "progettazione-giardini": PenTool,
  "realizzazione-giardini": Hammer,
  "scelta-piante": Flower2,
  "trattamenti-piante": HeartPulse,
  "impianti-irrigazione": Droplets,
  "camminamenti-pietra": Layers,
  "illuminazione-esterni": Lightbulb,
  "ingegneria-naturalistica": Mountain,
  "arredamento-esterni": Armchair,
  potature: Scissors,
  "rigenerazione-terreni": Sprout,
  manutenzioni: Wrench,
};

const serviceAccentMap: Record<string, string> = {
  "progettazione-giardini": "from-moss-600 to-moss-800",
  "realizzazione-giardini": "from-terracotta-500 to-terracotta-700",
  "scelta-piante": "from-moss-500 to-moss-700",
  "trattamenti-piante": "from-terracotta-400 to-terracotta-600",
  "impianti-irrigazione": "from-moss-600 to-moss-800",
  "camminamenti-pietra": "from-terracotta-500 to-terracotta-700",
  "illuminazione-esterni": "from-terracotta-400 to-moss-600",
  "ingegneria-naturalistica": "from-moss-700 to-moss-900",
  "arredamento-esterni": "from-terracotta-500 to-terracotta-700",
  potature: "from-moss-500 to-moss-700",
  "rigenerazione-terreni": "from-moss-600 to-terracotta-500",
  manutenzioni: "from-moss-600 to-moss-800",
};

const serviceImageMap: Record<string, string> = {
  "progettazione-giardini":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
  "realizzazione-giardini":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  "scelta-piante":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
  "trattamenti-piante":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
  "impianti-irrigazione":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  "camminamenti-pietra":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
  "illuminazione-esterni":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
  "ingegneria-naturalistica":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  "arredamento-esterni":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
  potature:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
  "rigenerazione-terreni":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  manutenzioni:
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
};

/* ─── Rich descriptions per service ─── */

const serviceDescriptions: Record<
  string,
  { intro: string; body: string; features: string[] }
> = {
  "progettazione-giardini": {
    intro:
      "Ogni grande giardino nasce da una grande idea. Il nostro servizio di progettazione trasforma desideri e intuizioni in un piano concreto, dove ogni pianta, sentiero e angolo ha un significato preciso.",
    body: "Lavoriamo con rilievi topografici, analisi del suolo e studio dell'esposizione solare per creare progetti che rispettano la natura del luogo. Utilizziamo software CAD per presentarvi rendering fotorealistici prima di iniziare qualsiasi lavoro, garantendo che il risultato finale corrisponda esattamente alla vostra visione.",
    features: [
      "Sopralluogo e analisi del sito gratuiti",
      "Progetto planimetrico e rendering 3D",
      "Scelta botanica personalizzata per clima e suolo",
      "Piano di irrigazione integrato nel progetto",
      "Consulenza su illuminazione e arredo",
      "Cronoprogramma lavori dettagliato",
    ],
  },
  "realizzazione-giardini": {
    intro:
      "Dal progetto alla realtà, con la cura artigianale che contraddistingue il nostro lavoro. Trasformiamo spazi vuoti in giardini che vivono e respirano.",
    body: "Il nostro team di giardinieri esperti si occupa di ogni fase della realizzazione: dalla preparazione del terreno alla messa a dimora delle piante, dalla posa dei camminamenti all'installazione degli impianti. Ogni dettaglio viene curato con attenzione maniacale, perché sappiamo che la differenza tra un buon giardino e uno straordinario sta nei particolari.",
    features: [
      "Preparazione professionale del terreno",
      "Messa a dimora con tecniche specializzate",
      "Posa di prati in zolle o da semina",
      "Installazione impianti di irrigazione",
      "Realizzazione di elementi in pietra naturale",
      "Collaudo e consegna con garanzia sui lavori",
    ],
  },
  "scelta-piante": {
    intro:
      "La pianta giusta nel posto giusto. La nostra vasta selezione comprende specie autoctone, esotiche e ornamentali, ognuna scelta per le sue caratteristiche uniche.",
    body: "Collaboriamo con i migliori vivai italiani ed europei per offrirvi piante di qualità superiore. Ogni esemplare viene selezionato personalmente dal nostro team botanico, verificando stato di salute, conformazione e adattabilità al vostro specifico microclima. Vi guidiamo nella scelta consigliando combinazioni cromatiche e associazioni che garantiscono fioriture scalari durante tutto l'anno.",
    features: [
      "Catalogo con oltre 500 specie disponibili",
      "Piante autoctone a bassa manutenzione",
      "Esemplari ornamentali di grandi dimensioni",
      "Consulenza botanica personalizzata",
      "Garanzia di attecchimento",
      "Servizio di sostituzione stagionale",
    ],
  },
  "trattamenti-piante": {
    intro:
      "Prevenire e curare, con rispetto per l'ecosistema. I nostri trattamenti fitosanitari sono mirati, sostenibili e sempre a basso impatto ambientale.",
    body: "Utilizziamo un approccio integrato che combina prevenzione, monitoraggio e intervento mirato. I nostri agronomi analizzano lo stato di salute delle vostre piante e progettano piani di trattamento personalizzati, privilegiando sempre soluzioni biologiche e compatibili con l'ambiente circostante.",
    features: [
      "Diagnosi fitosanitaria approfondita",
      "Trattamenti biologici e a basso impatto",
      "Concimazioni organiche programmate",
      "Prevenzione malattie fungine e parassitarie",
      "Monitoraggio stagionale dello stato di salute",
      "Report dettagliato sullo stato delle piante",
    ],
  },
  "impianti-irrigazione": {
    intro:
      "L'acqua è vita. Progettiamo e installiamo impianti di irrigazione intelligenti che risparmiano risorse e garantiscono il benessere del vostro verde.",
    body: "Ogni impianto viene progettato su misura, tenendo conto della tipologia di terreno, delle piante presenti e dell'esposizione solare. Utilizziamo centraline smart con sensori di umidità e pioggia per ottimizzare il consumo idrico, riducendo gli sprechi fino al 40% rispetto all'irrigazione manuale.",
    features: [
      "Progettazione idraulica su misura",
      "Centraline smart con sensori meteo",
      "Irrigazione a goccia per aiuole e orti",
      "Impianti pop-up per tappeti erbosi",
      "Risparmio idrico garantito fino al 40%",
      "Manutenzione e winterizzazione incluse",
    ],
  },
  "camminamenti-pietra": {
    intro:
      "La pietra naturale dona carattere e permanenza al giardino. Realizziamo camminamenti, muretti e bordure che si integrano armoniosamente con il paesaggio.",
    body: "Lavoriamo con pietra locale, travertino, porfido e materiali selezionati per resistenza e bellezza. Ogni posa è eseguita a regola d'arte, con drenaggi adeguati e fondazioni stabili che garantiscono durata nel tempo. Il risultato è un elemento strutturale che sembra essere sempre stato lì.",
    features: [
      "Ampia scelta di pietre naturali",
      "Posa a secco o con malta tradizionale",
      "Muretti a secco e di contenimento",
      "Bordure e delimitazioni naturali",
      "Scale e gradinate in pietra",
      "Drenaggio integrato per massima durabilità",
    ],
  },
  "illuminazione-esterni": {
    intro:
      "La luce giusta trasforma un giardino. Progettiamo sistemi di illuminazione che esaltano la bellezza del verde anche dopo il tramonto.",
    body: "Creiamo scenografie luminose studiate per valorizzare architetture vegetali, percorsi e punti focali. Utilizziamo esclusivamente tecnologia LED a risparmio energetico con possibilità di dimmerazione e controllo da smartphone, per un'esperienza personalizzabile in ogni momento.",
    features: [
      "Progetto illuminotecnico su misura",
      "Tecnologia LED a risparmio energetico",
      "Illuminazione scenografica per piante e alberi",
      "Luci segnapasso per camminamenti",
      "Controllo smart via app",
      "Installazione a norma con certificazione",
    ],
  },
  "ingegneria-naturalistica": {
    intro:
      "Soluzioni che lavorano con la natura, non contro di essa. L'ingegneria naturalistica stabilizza, protegge e rigenera il territorio utilizzando materiali vivi.",
    body: "Interveniamo su versanti instabili, sponde fluviali e aree soggette a erosione con tecniche che combinano elementi naturali (piante, legno, pietre) e geosintetici biodegradabili. Il risultato è un consolidamento duraturo che migliora la biodiversità e il valore paesaggistico del sito.",
    features: [
      "Consolidamento di versanti e scarpate",
      "Interventi su sponde fluviali e lacustri",
      "Tecniche di bioingegneria certificate",
      "Utilizzo di specie autoctone stabilizzanti",
      "Gestione delle acque piovane",
      "Progetti compatibili con vincoli paesaggistici",
    ],
  },
  "arredamento-esterni": {
    intro:
      "Lo spazio esterno merita lo stesso amore dello spazio interno. Selezioniamo arredi che completano il giardino con stile e funzionalità.",
    body: "Collaboriamo con i migliori produttori di arredo outdoor per proporvi soluzioni in teak, alluminio, rattan sintetico e materiali innovativi. Ogni pezzo viene scelto per resistenza alle intemperie, comfort e coerenza estetica con il progetto complessivo del giardino.",
    features: [
      "Selezione curata di arredi premium",
      "Materiali resistenti alle intemperie",
      "Pergole, gazebo e strutture ombreggianti",
      "Cucine e barbecue da esterno",
      "Complementi decorativi e vasi di design",
      "Servizio di consegna e montaggio incluso",
    ],
  },
  potature: {
    intro:
      "Interveniamo in sicurezza su alberi di ogni altezza. Le potature sono un atto di cura che preserva la salute e la bellezza degli esemplari arborei.",
    body: "Il nostro team di arboricoltori certificati opera con tecniche di tree climbing e piattaforme aeree per raggiungere anche le chiome più alte. Ogni intervento segue le linee guida della moderna arboricoltura, rispettando la fisiologia della pianta e garantendo tagli precisi che favoriscono la cicatrizzazione naturale.",
    features: [
      "Arboricoltori certificati ETW",
      "Interventi in tree climbing",
      "Piattaforme aeree fino a 30 metri",
      "Potature di formazione e contenimento",
      "Abbattimenti controllati in spazi ristretti",
      "Smaltimento e cippatura del materiale",
    ],
  },
  "rigenerazione-terreni": {
    intro:
      "Un terreno sano è la base di un giardino rigoglioso. Analizziamo, correggiamo e rigeneriamo suoli impoveriti o degradati.",
    body: "Attraverso analisi chimico-fisiche del suolo, identifichiamo carenze e squilibri per intervenire con ammendanti organici, sovesci e tecniche di bioattivazione. Ripristiniamo la struttura, la fertilità e la vita microbiologica del terreno, creando le condizioni ideali per una crescita sana e duratura.",
    features: [
      "Analisi chimico-fisica del terreno",
      "Correzione pH e struttura del suolo",
      "Ammendanti organici e compost certificato",
      "Tecniche di sovescio e pacciamatura",
      "Bioattivazione della microflora",
      "Piano di mantenimento della fertilità",
    ],
  },
  manutenzioni: {
    intro:
      "Un giardino bello è un giardino curato. Il nostro servizio di manutenzione programmata mantiene il vostro verde sempre al meglio, stagione dopo stagione.",
    body: "Offriamo piani di manutenzione personalizzati che coprono ogni aspetto della cura del giardino: dal taglio del prato alle potature stagionali, dalla concimazione ai trattamenti preventivi. Il nostro team interviene con regolarità e puntualità, adattando gli interventi al ritmo naturale delle stagioni.",
    features: [
      "Piani personalizzati mensili o stagionali",
      "Taglio prato e bordatura precisa",
      "Potature stagionali e pulizia aiuole",
      "Concimazione e trattamenti preventivi",
      "Gestione dell'impianto di irrigazione",
      "Reportistica fotografica degli interventi",
    ],
  },
};

/* ─── Animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

/* ─── Component ─── */

export default function ServiceDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const trackShareEvent = useMutation(api.shareEvents.track);
  const landingTrackedRef = useRef(false);
  const [shareState, setShareState] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const slug = params.slug as string;

  const service = staticServices.find((s) => s.slug === slug);
  const serviceIndex = staticServices.findIndex((s) => s.slug === slug);
  const nextService =
    serviceIndex < staticServices.length - 1
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
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <Sprout className="w-10 h-10 text-charcoal-400" />
          </div>
          <h1 className="font-display text-3xl text-charcoal-800 mb-4">
            Servizio non trovato
          </h1>
          <p className="font-body text-charcoal-500 mb-8">
            Il servizio che stai cercando non esiste o potrebbe essere stato
            rimosso.
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

  const IconComponent = serviceIconMap[service.slug] || Sprout;
  const gradientClass =
    serviceAccentMap[service.slug] || "from-moss-600 to-moss-800";
  const imageUrl =
    serviceImageMap[service.slug] ||
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800";
  const content = serviceDescriptions[service.slug] || {
    intro: `Offriamo un servizio professionale di ${service.title.toLowerCase()} con la massima cura dei dettagli e l'utilizzo di tecniche all'avanguardia.`,
    body: "Il nostro team di esperti è a tua disposizione per realizzare il tuo progetto con professionalità e passione. Utilizziamo solo materiali di alta qualità e tecniche sostenibili per garantire risultati duraturi nel tempo.",
    features: [
      "Personale qualificato e esperto",
      "Materiali di prima qualità",
      "Tecniche eco-sostenibili",
      "Preventivo gratuito e personalizzato",
      "Garanzia sui lavori",
      "Supporto post-intervento",
    ],
  };

  const handleShare = async () => {
    if (!service) return;

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
    <div className="min-h-screen bg-cream-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-moss-900 pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* Background image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-moss-500/15 rounded-full blur-3xl animate-drift" />

        {/* Thin accent line */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm mb-10 lg:mb-14"
          >
            <Link
              href="/"
              className="font-sans text-cream-400 hover:text-cream-200 transition-colors tracking-wide"
            >
              Home
            </Link>
            <span className="text-cream-600">/</span>
            <Link
              href="/servizi"
              className="font-sans text-cream-400 hover:text-cream-200 transition-colors tracking-wide"
            >
              Servizi
            </Link>
            <span className="text-cream-600">/</span>
            <span className="font-sans text-cream-200 tracking-wide">
              {service.title}
            </span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-deep mb-8`}
                >
                  <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-cream-200 mb-6 px-5 py-1.5 text-xs tracking-widest uppercase">
                  Servizio {(serviceIndex + 1).toString().padStart(2, "0")} / 12
                </Badge>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream-50 leading-tight mb-6">
                  {service.title}
                </h1>

                <p className="font-body text-xl text-cream-200/80 leading-relaxed max-w-2xl">
                  {service.shortDescription}
                </p>
              </motion.div>
            </div>

            {/* Decorative number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <span className="font-display text-[8rem] leading-none font-light text-white/5">
                {(serviceIndex + 1).toString().padStart(2, "0")}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT AREA
          Two-column: rich content + sticky sidebar
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-24">
        {/* Subtle top gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-moss-900/5 to-transparent" />

        {/* Background blobs */}
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-terracotta-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* ── Main content column ── */}
            <div className="lg:col-span-2">
              {/* Image */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="relative rounded-2xl overflow-hidden mb-12 shadow-floating"
              >
                <div className="aspect-[16/9]">
                  <Image
                    src={imageUrl}
                    alt={`${service.title} - Visione Sostenibile`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-moss-900/30 to-transparent" />
                </div>

                {/* Decorative corner accent */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-terracotta-500/20 to-transparent" />
              </motion.div>

              {/* Introduction text */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.1}
              >
                <p className="font-body text-xl lg:text-2xl text-charcoal-700 leading-relaxed mb-8">
                  {content.intro}
                </p>

                <div className="w-16 h-px bg-terracotta-400 mb-8" />

                <p className="font-body text-lg text-charcoal-500 leading-relaxed mb-12">
                  {content.body}
                </p>
              </motion.div>

              {/* Features list */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.2}
                className="bg-cream-100 rounded-2xl p-8 lg:p-10 mb-12"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-display text-2xl lg:text-3xl text-charcoal-800">
                    Cosa include
                  </h2>
                </div>

                <motion.ul
                  variants={staggerChildren}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {content.features.map((feature) => (
                    <motion.li
                      key={feature}
                      variants={staggerItem}
                      className="flex items-start gap-4 group"
                    >
                      <span className="mt-1.5 w-5 h-5 rounded-full bg-moss-700 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                      <span className="font-body text-charcoal-600 text-lg leading-relaxed group-hover:text-charcoal-800 transition-colors">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Why choose us block */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3}
                className="relative bg-moss-900 rounded-2xl p-8 lg:p-10 overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-terracotta-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-moss-500/20 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <span className="font-display italic text-terracotta-300 text-base">
                    Perche scegliere noi
                  </span>
                  <h2 className="font-display text-2xl lg:text-3xl text-cream-50 mt-2 mb-6">
                    Esperienza e passione dal 2009
                  </h2>
                  <p className="font-body text-cream-200/80 text-lg leading-relaxed mb-8">
                    Con oltre 15 anni di esperienza nel settore, il nostro team
                    unisce competenza tecnica e sensibilita estetica per offrirvi
                    risultati che superano le aspettative. Ogni progetto e per noi
                    una nuova sfida da affrontare con entusiasmo.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "15+", label: "Anni esperienza" },
                      { value: "500+", label: "Clienti soddisfatti" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-3xl text-terracotta-300">
                          {stat.value}
                        </p>
                        <p className="font-sans text-xs uppercase tracking-widest text-cream-400 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Sticky sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Contact card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.2}
                  className="bg-white rounded-2xl border border-cream-200 p-8 shadow-soft"
                >
                  <span className="font-display italic text-terracotta-600 text-base">
                    Interessato?
                  </span>
                  <h3 className="font-display text-2xl text-charcoal-800 mt-1 mb-3">
                    Richiedi Informazioni
                  </h3>
                  <p className="font-body text-charcoal-500 leading-relaxed mb-6">
                    Contattaci per una consulenza gratuita e un preventivo
                    personalizzato per {service.title.toLowerCase()}.
                  </p>

                  <Link href="/contatti" className="block mb-6">
                    <Button className="w-full" size="lg">
                      Contattaci Ora
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>

                  <div className="space-y-4 pt-6 border-t border-cream-200">
                    <a
                      href="tel:+39061234567"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-moss-100 flex items-center justify-center group-hover:bg-moss-200 transition-colors">
                        <Phone className="w-4 h-4 text-moss-700" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Telefono
                        </p>
                        <p className="font-body text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                          +39 06 1234567
                        </p>
                      </div>
                    </a>

                    <a
                      href="mailto:info@visionesostenibile.it"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-terracotta-50 flex items-center justify-center group-hover:bg-terracotta-100 transition-colors">
                        <Mail className="w-4 h-4 text-terracotta-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Email
                        </p>
                        <p className="font-body text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                          info@visionesostenibile.it
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-charcoal-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Orari
                        </p>
                        <p className="font-body text-charcoal-700">
                          Lun-Ven: 8:00-18:00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-charcoal-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Zona
                        </p>
                        <p className="font-body text-charcoal-700">
                          Roma e provincia
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Share loop */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.26}
                  className="bg-moss-900 rounded-2xl p-8 text-cream-50"
                >
                  <span className="font-display italic text-terracotta-300 text-base">
                    Passaparola
                  </span>
                  <h3 className="font-display text-2xl text-cream-50 mt-1 mb-3">
                    Condividi questo servizio
                  </h3>
                  <p className="font-body text-cream-200/80 leading-relaxed mb-6">
                    Se conosci qualcuno interessato, invia questa pagina su
                    WhatsApp in un tap.
                  </p>

                  <Button
                    className="w-full bg-terracotta-500 hover:bg-terracotta-600 border-0"
                    onClick={handleShare}
                  >
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Condividi su WhatsApp
                  </Button>

                  {shareState === "success" && (
                    <p className="mt-4 flex items-center gap-2 font-body text-sm text-cream-200">
                      <CheckCircle2 className="w-4 h-4 text-moss-300" />
                      WhatsApp aperto. Scegli un contatto e invia.
                    </p>
                  )}

                  {shareState === "error" && (
                    <p className="mt-4 font-body text-sm text-terracotta-200">
                      Non siamo riusciti ad aprire WhatsApp. Riprova.
                    </p>
                  )}
                </motion.div>

                {/* Other services teaser */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.35}
                  className="bg-cream-100 rounded-2xl p-8"
                >
                  <h3 className="font-display text-xl text-charcoal-800 mb-4">
                    Altri Servizi
                  </h3>
                  <div className="space-y-3">
                    {staticServices
                      .filter((s) => s.slug !== slug)
                      .slice(0, 4)
                      .map((s) => {
                        const SIcon = serviceIconMap[s.slug] || Sprout;
                        return (
                          <Link
                            key={s._id}
                            href={`/servizi/${s.slug}`}
                            className="flex items-center gap-3 group py-2"
                          >
                            <div className="w-8 h-8 rounded-lg bg-moss-100 flex items-center justify-center group-hover:bg-moss-200 transition-colors flex-shrink-0">
                              <SIcon className="w-4 h-4 text-moss-700" />
                            </div>
                            <span className="font-body text-charcoal-600 group-hover:text-terracotta-600 transition-colors text-sm leading-tight">
                              {s.title}
                            </span>
                          </Link>
                        );
                      })}
                  </div>
                  <Link
                    href="/servizi"
                    className="inline-flex items-center font-sans text-xs uppercase tracking-widest text-terracotta-600 mt-5 hover:text-terracotta-700 transition-colors"
                  >
                    Tutti i servizi
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NAVIGATION BETWEEN SERVICES
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-cream-200">
            {/* Previous */}
            <div className="py-8 lg:py-12 pr-0 md:pr-8">
              {prevService ? (
                <Link
                  href={`/servizi/${prevService.slug}`}
                  className="group flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all">
                    <ArrowLeft className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Precedente
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                      {prevService.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/servizi"
                  className="group flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all">
                    <ArrowLeft className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Torna a
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                      Tutti i Servizi
                    </p>
                  </div>
                </Link>
              )}
            </div>

            {/* Next */}
            <div className="py-8 lg:py-12 pl-0 md:pl-8">
              {nextService ? (
                <Link
                  href={`/servizi/${nextService.slug}`}
                  className="group flex items-center justify-end gap-4 text-right"
                >
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Successivo
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                      {nextService.title}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all">
                    <ArrowRight className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                </Link>
              ) : (
                <Link
                  href="/servizi"
                  className="group flex items-center justify-end gap-4 text-right"
                >
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Esplora
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                      Tutti i Servizi
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all">
                    <ArrowRight className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-moss-900 text-cream-50 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-moss-900 via-moss-800/90 to-moss-900" />
        </div>

        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta-500/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <span className="font-display italic text-terracotta-300 text-lg">
            Preventivo gratuito
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream-50 mt-4 mb-6 leading-tight">
            Inizia il tuo progetto di
            <span className="block italic text-terracotta-300">
              {service.title.toLowerCase()}
            </span>
          </h2>
          <p className="font-body text-lg text-cream-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contattaci per una consulenza senza impegno. Insieme, troveremo la
            soluzione perfetta per le tue esigenze.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+39061234567">
              <Button
                size="lg"
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white border-0 px-8"
              >
                <Phone className="mr-2 w-5 h-5" />
                Chiama Ora
              </Button>
            </a>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-cream-400/30 text-cream-100 hover:bg-cream-100/10 hover:border-cream-300/50 px-8"
              >
                Richiedi Preventivo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
