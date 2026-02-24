"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Award,
  Clock,
  MapPin,
  Bug,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { Badge } from "./components/ui/Badge";
import { ServiceCard } from "./components/ServiceCard";
import { ReviewsWidget } from "./components/ReviewsWidget";
import { PhilosophySection } from "./components/PhilosophySection";
import { staticServices, serviceImages } from "./lib/static-data";
import { QuizCTA } from "./components/QuizCTA";
import { QuizMiniPreview } from "./components/QuizMiniPreview";
import { useRef } from "react";

const featuredSlugs = [
  "progettazione-giardini",
  "realizzazione-giardini",
  "potature",
  "manutenzioni",
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
    name: "Visione Sostenibile",
    description:
      "Progettazione, realizzazione e manutenzione di giardini biodinamici a impatto zero",
    url: "https://www.visionesostenibile.it",
    telephone: "+393714821825",
    email: "visionesostenibile96@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via San Francesco D'Assisi, 14",
      addressLocality: "Torino",
      postalCode: "10122",
      addressCountry: "IT",
    },
    areaServed: ["Torino", "Piemonte", "Trentino Alto-Adige", "Lombardia"],
    founder: {
      "@type": "Person",
      name: "Andrea Giordano",
    },
    foundingDate: "2009",
    sameAs: [
      "https://www.instagram.com/visionesostenibile",
      "https://www.facebook.com/visionesostenibilegiardinieortisostenibili",
      "https://www.linkedin.com/in/andrea-giordano-16810626a",
      "https://www.youtube.com/@AndreaGiordano-vk8el",
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with video support */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/80 via-forest-900/60 to-forest-950/70" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          >
            <source src="/videos/garden-bloom-timelapse.mp4" type="video/mp4" />
          </video>
          {/* Decorative organic blobs */}
          <motion.div
            style={{ y, opacity }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-sun-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-80 h-80 bg-leaf-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 px-6 py-2 text-sm tracking-widest uppercase">
                Dal 2009
              </Badge>
              <Badge variant="eco" className="px-4 py-1.5 text-xs tracking-widest uppercase">
                <Bug className="w-3 h-3 mr-1.5 inline" />
                Biodinamica Certificata
              </Badge>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 text-balance">
              Il tuo giardino sostenibile,
              <span className="block italic text-leaf-400">
                senza coordinare 5 fornitori
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Con Visione Sostenibile hai un unico interlocutore che progetta, realizza e mantiene il tuo giardino: specialisti e partner coordinati, niente più caos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8 py-4 text-lg tracking-wide"
                >
                  Richiedi un sopralluogo
                </Button>
              </Link>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg tracking-wide"
                >
                  Sono un&apos;azienda/condominio
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-paper-300/90">
              <span className="font-sans text-xs uppercase tracking-[0.14em]">
                Un referente
              </span>
              <span className="hidden sm:block h-4 w-px bg-paper-400/40" />
              <span className="font-sans text-xs uppercase tracking-[0.14em]">
                Team modulare
              </span>
              <span className="hidden sm:block h-4 w-px bg-paper-400/40" />
              <span className="font-sans text-xs uppercase tracking-[0.14em]">
                Piemonte · Trentino · Lombardia
              </span>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-px h-20 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy — Cinematic sticky scroll */}
      <PhilosophySection />

      {/* Services — Stitch-inspired card grid */}
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
              Perché funziona
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-leaf-700 mb-6 leading-tight">
              Un referente, una squadra su misura
            </h2>
            <p className="font-body text-lg text-forest-800/70 leading-relaxed max-w-2xl">
              Non facciamo giardini Instagram. Facciamo giardini che superano agosto: belli oggi, funzionano domani.
            </p>
          </motion.div>

          {/* Tre card di valore */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Un referente",
                subtitle: "Andrea coordina. Tu respiri.",
                description: "Un solo contatto per tempi, scelte e budget: niente rimbalzi tra fornitori.",
              },
              {
                title: "Sostenibile vero",
                subtitle: "Meno sprechi, più durata.",
                description: "Scelte botaniche e tecniche orientate a resilienza, acqua e suolo: il giardino è bello oggi e funziona domani.",
              },
              {
                title: "Team modulare",
                subtitle: "Entrano solo le competenze che servono.",
                description: "Professionisti verticali e partner affidabili che si attivano fase per fase, in un piano lavori coerente.",
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-500 border border-paper-100"
              >
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-leaf-600 mb-4 block">
                  {index + 1}
                </span>
                <h3 className="font-display text-2xl text-forest-950 mb-2">
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
            className="bg-forest-950 rounded-3xl p-10 md:p-14 text-center mb-16"
          >
            <h3 className="font-display text-2xl md:text-3xl text-paper-50 mb-6 italic">
              Bello. Sostenibile. Gestibile.
            </h3>
            <p className="font-body text-paper-300 max-w-2xl mx-auto mb-4">
              Un referente, un metodo, una squadra su misura.<br />
              Scelte spiegate, risultati che durano.
            </p>
            <p className="font-body text-sm text-leaf-400">
              Non facciamo giardini Instagram. Facciamo giardini che superano agosto.
            </p>
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

      {/* Stats / Trust — Stitch-inspired dark split panel */}
      <section className="py-24 px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-deep"
        >
          <div className="bg-forest-950 grid grid-cols-1 lg:grid-cols-12">
            {/* Left — Title panel */}
            <div className="lg:col-span-5 bg-forest-900 p-10 md:p-16 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-leaf-700/10 mix-blend-overlay" />
              <div className="relative z-10">
                <span className="block font-sans text-xs font-bold tracking-[0.2em] uppercase text-leaf-400 mb-4">
                  I Nostri Numeri
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                  Cosa abbiamo{" "}
                  <span className="block italic text-paper-300">
                    fatto finora
                  </span>
                </h2>
                <p className="font-body text-paper-400 text-sm md:text-base leading-relaxed max-w-md">
                  Ogni numero rappresenta un passo avanti verso un futuro piu
                  verde. La nostra dedizione alla sostenibilita e misurabile e
                  tangibile.
                </p>
              </div>
            </div>

            {/* Right — Stats grid */}
            <div className="lg:col-span-7 p-10 md:p-16 flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {[
                  {
                    value: "250+",
                    label: "Progetti Completati",
                    icon: (
                      <Award className="w-10 h-10" />
                    ),
                  },
                  {
                    value: "20+",
                    label: "Anni di Esperienza",
                    icon: (
                      <Clock className="w-10 h-10" />
                    ),
                  },
                  {
                    value: "100%",
                    label: "Impatto Zero",
                    icon: (
                      <Heart className="w-10 h-10" />
                    ),
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left group"
                  >
                    <div className="mb-4 text-white group-hover:text-leaf-400 transition-colors duration-300">
                      {stat.icon}
                    </div>
                    <span className="font-sans text-5xl md:text-6xl font-bold text-white tracking-tighter mb-2">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold tracking-widest text-paper-400 uppercase border-t border-paper-600/30 pt-4 w-full">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

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
              <h2 className="mb-5 font-display text-5xl leading-[1.05] text-forest-950 md:text-6xl">
                Che giardino
                <span className="block italic text-leaf-600">fa per te?</span>
              </h2>
              <p className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-forest-800/72 md:text-xl">
                Rispondi a 6 domande e scopri il tuo profilo verde personalizzato.
                Riceverai consigli su misura per il tuo spazio.
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
        title="La voce dei nostri clienti"
        subtitle="Feedback reali da chi ci ha scelto per trasformare e valorizzare i propri spazi verdi."
      />

      {/* Featured Project / CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
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
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-floating">
                <Image
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800"
                  alt="Giardino realizzato"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-leaf-200/30 rounded-3xl -z-10" />
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
              <h2 className="font-display text-4xl md:text-5xl text-forest-950 mb-6 leading-tight">
                Ogni giardino è una
                <span className="block italic text-leaf-600">
                  storia unica
                </span>
              </h2>
              <p className="font-body text-lg text-forest-800 leading-relaxed mb-8">
                Dai un&apos;occhiata ai nostri progetti realizzati. Ogni giardino
                racconta una storia diversa, ma tutti condividono lo stesso
                denominatore comune: la passione per il verde.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contatti">
                  <Button className="bg-leaf-700 hover:bg-leaf-600 text-white px-8 py-4">
                    Richiedi una Consulenza
                  </Button>
                </Link>
                <Link href="/qualita">
                  <Button
                    variant="outline"
                    className="border-forest-700 text-forest-900 hover:bg-paper-300 px-8 py-4"
                  >
                    Perché Scegliere Noi
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
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            Parliamone:
            <span className="block italic text-leaf-400">
              ti diciamo cosa serve davvero
            </span>
          </h2>
          <p className="font-body text-lg text-paper-300 mb-10 max-w-2xl mx-auto">
            Che tu stia partendo da zero o che tu voglia riqualificare un giardino esistente, ti aiutiamo a fare chiarezza su priorità, fasi e investimenti.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+393714821825">
              <Button className="bg-sun-400 hover:bg-sun-500 text-forest-950 px-8 py-4">
                <Phone className="mr-2 w-5 h-5" />
                Richiedi un sopralluogo
              </Button>
            </a>
            <Link href="/contatti">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
              >
                Richiedi una call (aziende/condomini)
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-paper-400">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Rispondiamo entro 48 ore lavorative
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Operativi in Piemonte e Trentino Alto-Adige. In espansione in Lombardia.
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
