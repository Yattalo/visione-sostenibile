"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { Badge } from "./components/ui/Badge";
import { ServiceCard } from "./components/ServiceCard";
import { staticServices, serviceImages } from "./lib/static-data";
import { siteConfig } from "./lib/site-config";
import { BLUR_DATA_URL } from "./lib/image-utils";
import { useRef } from "react";

// Dynamically import heavy below-fold components to reduce initial JS bundle
const ReviewsWidget = dynamic(
  () => import("./components/ReviewsWidget").then((mod) => ({ default: mod.ReviewsWidget })),
  { ssr: true }
);
const PhilosophySection = dynamic(
  () => import("./components/PhilosophySection").then((mod) => ({ default: mod.PhilosophySection })),
  { ssr: true }
);
const TrustNumbers = dynamic(
  () => import("./components/TrustNumbers").then((mod) => ({ default: mod.TrustNumbers })),
  { ssr: true }
);
const QuizCTA = dynamic(
  () => import("./components/QuizCTA").then((mod) => ({ default: mod.QuizCTA })),
  { ssr: true }
);
const QuizMiniPreview = dynamic(
  () => import("./components/QuizMiniPreview").then((mod) => ({ default: mod.QuizMiniPreview })),
  { ssr: true }
);

const featuredSlugs = [
  "progettazione-giardini",
  "realizzazione-giardini",
  "potature",
  "manutenzioni",
];

const homeManifesto = [
  "Visione Sostenibile nasce dall’ascolto: delle persone, dei luoghi, della natura che cambia.",
  "Crediamo in giardini belli, sì — ma soprattutto stabili, gestibili e capaci di durare. Ogni scelta ha un motivo: spieghiamo il perché, valutiamo alternative, costruiamo consapevolezza.",
  "Lavoriamo con un’unica regia e competenze verticali: un referente, una squadra su misura. Perché il futuro del verde non è una moda: è cura, metodo e responsabilità.",
];

const homeSystemBoxes = [
  {
    title: "COME OPERIAMO",
    rows: [
      "Sopralluogo, Analisi & obiettivi — Partiamo da uso dello spazio, esposizione, suolo, disponibilità idrica, vincoli, budget e tempi. Obiettivo: capire cosa serve davvero (e cosa no).",
      "Progetto + piano lavori — Soluzioni sostenibili e realizzabili, con priorità e fasi. Traduciamo le esigenze in scelte concrete: materiali, specie, impianti e fasi operative. Così sai cosa succede, quando e perché.",
      "Direzione & realizzazione — Visione Sostenibile coordina le attività e le competenze degli specialisti lungo tutto il percorso. E poi restiamo: con una manutenzione programmata il verde non si trasforma in un “problema”.",
    ],
  },
  {
    title: "PROGETTIAMO SISTEMI",
    rows: [
      "A. Verde sostenibile (core) — Progettazione • Realizzazione • Manutenzione programmata e gestione stagionale • Rigenerazione suolo • Irrigazione smart • Potature/Tree climbing",
      "B. Outdoor living (comfort) — Pavimentazioni e percorsi • Illuminazione esterna • Arredi esterni e finiture • Pergole/strutture leggere (in partnership)",
      "C. Acqua & benessere (premium) — Laghetti/punti acqua/integrazioni paesaggistiche • Piscine (partner selezionati + coordinamento completo con integrazione estetica nel progetto)",
    ],
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.companyName,
    description:
      "Progettazione, realizzazione e manutenzione di giardini biodinamici a impatto zero",
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.countryCode,
    },
    areaServed: siteConfig.areaServed,
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    foundingDate: siteConfig.foundingDate,
    sameAs: [
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.linkedin,
      siteConfig.socialLinks.youtube,
    ],
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[85vh] md:h-[95vh] flex items-end overflow-hidden"
      >
        {/* Background with video support */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/60 via-forest-900/40 to-forest-950/50 z-10" />
          {/* Poster image — fast LCP element */}
          <Image
            src="/images/hero-poster.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          {/* Video loads lazily on top of poster */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/videos/garden-bloom-timelapse.mp4" type="video/mp4" />
          </video>
          {/* Decorative organic blobs */}
          <motion.div
            style={{ y, opacity }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow"
          />
        </div>

        <motion.div
          style={{ opacity }}
          className="relative z-20 max-w-6xl mx-auto px-6 md:px-12 text-white pb-16 md:pb-24 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wide leading-tight mb-6">
              IL TUO GIARDINO{" "}
              <em className="italic font-normal text-leaf-400">Sostenibile:</em>
              <span className="block text-paper-200 mt-2">
                VISIONE, PROGETTO, REALTÀ
              </span>
            </h1>

            <p className="text-hero-subtitle text-xl md:text-2xl text-paper-200/90 max-w-2xl mb-10">
              Con Visione Sostenibile hai un solo interlocutore
              per progettare, realizzare e mantenere il tuo spazio verde
              — con tutti gli specialisti gi&agrave; selezionati per te.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-10 py-5 text-lg tracking-wider font-bold rounded-2xl shadow-deep hover:scale-105 transition-transform"
                >
                  Scopri il Tuo Giardino
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/servizi">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10 px-10 py-5 text-lg tracking-wider font-bold rounded-2xl"
                >
                  I Nostri Servizi
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
        </motion.div>
      </section>

      <section className="bg-paper-50 py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[34px] border border-paper-200 bg-white px-8 py-10 md:px-12 md:py-12 shadow-soft">
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-5 block">
              Visione Sostenibile
            </span>
            <div className="space-y-5 text-forest-900">
              {homeManifesto.map((paragraph) => (
                <p key={paragraph} className="font-body text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy -- Cinematic sticky scroll */}
      <PhilosophySection />

      {/* Services -- Stitch-inspired card grid */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Topographic background pattern */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg
            className="absolute top-0 left-0 w-full h-full text-paper-400"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
          >
            <path
              d="M-100 200 C 100 400, 300 0, 600 200 S 900 600, 1400 400 V 800 H -100 Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M-100 400 C 100 600, 400 300, 700 500 S 1100 800, 1500 600"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M-100 100 C 200 100, 400 400, 800 300 S 1200 100, 1500 200"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20 max-w-3xl"
          >
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
              Perch&eacute; funziona
            </span>
            <h2 className="text-stitch-heading text-4xl md:text-5xl lg:text-6xl text-forest-950 mb-6">
              OGNI GIARDINO NASCE DALL&apos;
              <em className="italic font-normal text-leaf-600">Ascolto</em>
            </h2>
            <p className="font-body text-lg text-forest-800/70 leading-relaxed max-w-2xl">
              Bellezza e sostenibilit&agrave;, per noi, sono sempre la scelta migliore. Per questo progettiamo giardini che funzionano in ogni stagione — sotto la neve come sotto il sole di agosto.
            </p>
          </motion.div>

          {/* Tre card di valore */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Biodinamica, scelta tecnica e sostenibile",
                subtitle: "Il suolo come punto di partenza",
                description: "Non seguiamo una moda, ma un sottile. Un approccio pratico che mette al centro suolo, piante e microclima. Significa osservare prima di intervenire per fare scelte più mirate: meno sprechi, più equilibrio, risultati più stabili nel tempo. Un giardino sostenibile si costruisce dalla base, non dalla superficie.",
              },
              {
                title: "Unico referente, squadra su misura",
                subtitle: "Ottimizzazione tempi e flusso del lavoro",
                description: "Il nostro punto di forza è l’unione e non la separazione. Visione Sostenibile lavora come contractor del verde: Andrea è il tuo riferimento e coordina un team modulare con competenze verticali. Entrano in campo solo i professionisti necessari, nel momento giusto (irrigazione, potature tecniche, outdoor living, piscine), così si evitano incastri, rimbalzi e incoerenze.",
              },
              {
                title: "Dall\u2019idea alla cura nel tempo",
                subtitle: "Progettiamo, realizziamo, manteniamo",
                description: "Garantiamo una copertura totale del servizio: progettazione, realizzazione e manutenzione programmata. Perché un giardino non è “lavoro finito” quando lo si consegna: va avviato, stabilizzato e gestito con continuità. Il risultato? Meno interventi d'emergenza, maggior durata, piena e serena vivibilità del tuo spazio verde.",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-[30px] border border-paper-100 bg-paper-50 p-8 transition-all duration-300 hover:border-leaf-200 hover:shadow-soft hover:-translate-y-1.5 hover:shadow-floating"
              >
                <span className="font-display text-5xl font-light text-paper-300 mb-4 block select-none">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-light uppercase tracking-wide text-forest-950 mb-2">
                  {card.title}
                </h3>
                <p className="font-display text-lg italic text-leaf-700 mb-4">
                  {card.subtitle}
                </p>
                <p className="font-body text-forest-800/70 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Manifesto Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16"
          >
            {homeSystemBoxes.map((box) => (
              <div
                key={box.title}
                className="rounded-[30px] bg-forest-950 p-8 md:p-10 text-left"
              >
                <h3 className="text-stitch-heading text-2xl text-paper-50 mb-6">
                  {box.title}
                </h3>
                <div className="space-y-4">
                  {box.rows.map((row) => {
                    const [title, ...rest] = row.split(" — ");
                    const description = rest.join(" — ");
                    return (
                      <p key={row} className="font-body text-paper-300 leading-relaxed">
                        <strong className="font-bold text-paper-50">{title}</strong>
                        {description && <><br />{description}</>}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSlugs.map((slug, index) => {
              const service = staticServices.find((s) => s.slug === slug);
              if (!service) return null;
              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <ServiceCard
                    slug={service.slug}
                    title={service.title}
                    shortDescription={service.shortDescription}
                    image={serviceImages[service.slug] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"}
                    index={index}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/servizi"
              className="border-2 border-leaf-600 text-leaf-700 hover:bg-leaf-700 hover:text-white px-10 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-medium font-sans"
            >
              Tutti i Servizi
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust -- Extracted reusable component */}
      <TrustNumbers variant="dark" />

      {/* Quiz Section */}
      <section className="relative overflow-hidden bg-paper-canvas px-6 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-leaf-300/45 to-transparent" />
          <div className="absolute -top-20 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-leaf-100/35 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-leaf-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-8 h-72 w-72 rounded-full bg-sun-100/45 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <Badge className="mb-6 border border-leaf-300/70 bg-leaf-50 px-5 py-1.5 text-leaf-700">
                Quiz Gratuito
              </Badge>
              <h2 className="mb-5 text-stitch-heading text-4xl text-forest-950 md:text-5xl lg:text-6xl">
                QUAL &Egrave; IL GIARDINO{" "}
                <em className="italic font-normal text-leaf-600">Perfetto</em>
                <span className="block text-forest-950">PER TE?</span>
              </h2>
              <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-forest-800/72 md:text-xl">
                Abbiamo creato un percorso dedicato a te. Rispondi a 6 domande e avrai il tuo profilo personalizzato con i consigli migliori per vivere il tuo spazio verde.
              </p>
            </div>

            <QuizMiniPreview />
            <div className="mt-10">
              <QuizCTA variant="compact" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews Widget */}
      <ReviewsWidget
        variant="featured"
        className="bg-white"
        title="Ti ascoltiamo davvero"
        subtitleHeading="Costruiamo la fiducia con responsabilità"
        subtitle="Ogni feedback è una bussola: ci aiuta a migliorare il metodo, ampliare competenze e coltiviamo collaborazioni che rendono i risultati più solidi nel tempo. Le vostre recensioni ci permettono di lavorare meglio, correggendo, affinando, innovando. Perché uno spazio verde cambia con chi lo vive, e noi cambiamo con lui."
      />

      {/* Featured Project / CTA */}
      <section className="py-24 lg:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-leaf-100/50 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[30px] overflow-hidden shadow-floating">
                <Image
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800"
                  alt="Giardino biodinamico realizzato da Visione Sostenibile con piante autoctone"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-leaf-200/30 rounded-[30px] -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-leaf-100 text-leaf-700 mb-6">
                Realizzazioni
              </Badge>
              <h2 className="text-stitch-heading text-4xl md:text-5xl text-forest-950 mb-6">
                PROGETTI DIVERSI,{" "}
                <em className="italic font-normal text-leaf-600">Radici</em>
                <span className="block text-forest-950">COMUNI</span>
              </h2>
              <p className="font-body text-lg text-forest-800 leading-relaxed mb-8">
                Questi sono alcuni dei nostri lavori, diversi per scala e obiettivi: progettazione, realizzazione e manutenzione sostenibile. C’è chi voleva più ombra, chi meno manutenzione, chi un giardino da vivere con i bambini, chi un esterno che valorizzasse la casa. Tutti questi progetti poggiano sulla stessa base: decisioni precise basate su analisi e ascolto.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/progetti">
                  <Button className="bg-leaf-700 hover:bg-leaf-600 text-white px-8 py-4">
                    Scopri i Progetti
                  </Button>
                </Link>
                <Link href="/contatti">
                  <Button
                    variant="outline"
                    className="border-forest-700 text-forest-900 hover:bg-paper-300 px-8 py-4"
                  >
                    Richiedi un sopralluogo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-forest-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=30"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="text-stitch-heading text-4xl md:text-5xl mb-6">
            PARLIAMONE: TI DICIAMO COSA
            <span className="block text-paper-50">SERVE DAVVERO</span>
          </h2>
          <p className="font-body text-lg text-paper-300 mb-10 max-w-2xl mx-auto">
            Che tu stia partendo da zero o che tu voglia riqualificare un giardino esistente, ti aiutiamo a fare chiarezza su priorit&agrave;, fasi e investimenti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <Button
                size="lg"
                className="bg-sun-400 hover:bg-sun-500 text-forest-950 px-8 py-4"
              >
                Scopri il Tuo Giardino
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contatti">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
              >
                Scrivici
              </Button>
            </Link>
            <a href={`tel:${siteConfig.phoneRaw}`}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
              >
                <Phone className="mr-2 w-5 h-5" />
                Chiamaci
              </Button>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-paper-400">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Rispondiamo entro 48 ore lavorative
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Operativi in Piemonte e Lombardia
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
