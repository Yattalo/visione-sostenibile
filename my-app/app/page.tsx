"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Leaf,
  Sprout,
  Trees,
  Sun,
  Droplets,
  Star,
  Award,
  Clock,
  MapPin,
  Mail,
  Bug,
  Flower2,
  Wind,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { ReviewsWidget } from "./components/ReviewsWidget";
import { useRef } from "react";

const services = [
  {
    slug: "progettazione-giardini-orti",
    title: "Progettazione",
    tagline: "Giardini e orti sostenibili",
    description: "Progetti su misura a impatto zero per il tuo spazio verde.",
    icon: Sprout,
    color: "bg-moss-700",
  },
  {
    slug: "realizzazione-chiavi-in-mano",
    title: "Realizzazione",
    tagline: "Chiavi in mano",
    description: "Dalla progettazione alla posa, un servizio completo.",
    icon: Trees,
    color: "bg-terracotta-600",
  },
  {
    slug: "manutenzione-sostenibile",
    title: "Manutenzione",
    tagline: "Pratiche sostenibili",
    description: "Cura del verde con metodi naturali e biodinamici.",
    icon: Leaf,
    color: "bg-moss-600",
  },
];

const philosophy = [
  {
    icon: Flower2,
    title: "Terra",
    description:
      "Rigeneriamo il suolo con pratiche biodinamiche che aumentano fertilita, vita microbica e stabilita.",
  },
  {
    icon: Droplets,
    title: "Acqua",
    description:
      "Gestione idrica efficiente per ridurre sprechi e mantenere il verde sano durante tutto l'anno.",
  },
  {
    icon: Wind,
    title: "Aria",
    description:
      "Progettiamo spazi aperti e vitali che migliorano il microclima e il benessere delle persone.",
  },
  {
    icon: Sun,
    title: "Fuoco",
    description:
      "Luce, energia e cicli naturali guidano ogni scelta progettuale per un equilibrio duraturo.",
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

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with video support */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/80 via-moss-800/60 to-charcoal-900/70" />
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
            className="absolute top-1/4 -left-20 w-96 h-96 bg-terracotta-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-80 h-80 bg-moss-500/20 rounded-full blur-3xl"
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
              <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-cream-100 px-6 py-2 text-sm tracking-widest uppercase">
                Dal 2009
              </Badge>
              <Badge variant="eco" className="px-4 py-1.5 text-xs tracking-widest uppercase">
                <Bug className="w-3 h-3 mr-1.5 inline" />
                Biodinamica Certificata
              </Badge>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 text-balance">
              Giardini sostenibili
              <span className="block italic text-terracotta-300">
                a impatto zero
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-cream-200 max-w-2xl mx-auto mb-12 leading-relaxed">
              Progettazione, realizzazione e manutenzione con metodi biodinamici.
              Zero chimica, piu valore nel tempo, meno interventi futuri.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg tracking-wide"
                >
                  Richiedi Preventivo
                </Button>
              </Link>
              <Link href="/servizi">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg tracking-wide"
                >
                  Vedi i Servizi
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-cream-200/90">
              <span className="font-sans text-xs uppercase tracking-[0.14em]">
                20+ anni in biodinamica
              </span>
              <span className="hidden sm:block h-4 w-px bg-cream-300/40" />
              <span className="font-sans text-xs uppercase tracking-[0.14em]">
                Zero prodotti chimici
              </span>
              <span className="hidden sm:block h-4 w-px bg-cream-300/40" />
              <span className="font-sans text-xs uppercase tracking-[0.14em]">
                Piemonte e Lombardia
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

      {/* Introduction */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display italic text-terracotta-600 text-lg">
              Metodo biodinamico
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-4 mb-8 leading-tight">
              Terra, acqua, aria e fuoco.
              <span className="block text-moss-700">
                Un equilibrio reale, non solo estetico.
              </span>
            </h2>
            <p className="font-body text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto">
              Ogni progetto nasce da un principio semplice: il giardino deve essere
              bello, sano e gestibile nel tempo. Per questo lavoriamo sui 4 elementi
              biodinamici con soluzioni concrete, misurabili e sostenibili.
            </p>
          </motion.div>
        </div>

        {/* Philosophy icons */}
        <div className="max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {philosophy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream-100 mb-6">
                  <item.icon className="w-10 h-10 text-terracotta-600" />
                </div>
                <h3 className="font-display text-2xl text-charcoal-800 mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Editorial Layout */}
      <section className="py-32 bg-moss-900 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-terracotta-500/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-terracotta-500/20 border-terracotta-400/30 text-terracotta-200 mb-6">
                I Nostri Servizi
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">
                Tre servizi, un solo obiettivo:
                <span className="block italic text-moss-300">
                  un verde bello e sostenibile
                </span>
              </h2>
              <p className="font-body text-lg text-cream-200 mb-8 leading-relaxed">
                Interveniamo dove conta: progettazione chiara, realizzazione
                ordinata, manutenzione efficace. Un percorso unico, con risultati
                concreti per il tuo spazio esterno.
              </p>
              <Link href="/servizi">
                <Button
                  variant="outline"
                  className="border-cream-400/30 text-cream-100 hover:bg-cream-100/10"
                >
                  Scopri tutti i servizi
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <Link href={`/servizi/${service.slug}`}>
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 group cursor-pointer">
                      <div className="p-8">
                        <div className="flex items-start gap-6">
                          <div
                            className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}
                          >
                            <service.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <span className="font-sans text-xs tracking-widest uppercase text-moss-300 mb-2 block">
                              {service.tagline}
                            </span>
                            <h3 className="font-display text-2xl mb-3 text-cream-50 group-hover:text-terracotta-200 transition-colors">
                              {service.title}
                            </h3>
                            <p className="font-body text-cream-300 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-24 px-6 bg-cream-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: "20+", label: "Anni in biodinamica", icon: Clock },
              { value: "10+", label: "Anni di giardinaggio", icon: Star },
              { value: "100%", label: "Impatto zero", icon: Heart },
              { value: "0", label: "Prodotti chimici", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto text-terracotta-500 mb-4" />
                <p className="font-display text-4xl md:text-5xl text-charcoal-800 mb-2">
                  {stat.value}
                </p>
                <p className="font-sans text-sm uppercase tracking-widest text-charcoal-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
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
        <div className="absolute inset-0 bg-moss-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta-100/50 rounded-full blur-3xl" />

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
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moss-900/40 to-transparent" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-terracotta-200/30 rounded-3xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-moss-100 text-moss-700 mb-6">
                Realizzazioni
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mb-6 leading-tight">
                Ogni giardino è una
                <span className="block italic text-terracotta-600">
                  storia unica
                </span>
              </h2>
              <p className="font-body text-lg text-charcoal-600 leading-relaxed mb-8">
                Dai un&apos;occhiata ai nostri progetti realizzati. Ogni giardino
                racconta una storia diversa, ma tutti condividono lo stesso
                denominatore comune: la passione per il verde.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contatti">
                  <Button className="bg-moss-700 hover:bg-moss-600 text-white px-8 py-4">
                    Richiedi una Consulenza
                  </Button>
                </Link>
                <Link href="/qualita">
                  <Button
                    variant="outline"
                    className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-100 px-8 py-4"
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
      <section className="py-24 bg-moss-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-moss-900 via-moss-800/90 to-moss-900" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            Pronto a trasformare il tuo
            <span className="block italic text-terracotta-300">
              spazio verde?
            </span>
          </h2>
          <p className="font-body text-lg text-cream-200 mb-10 max-w-2xl mx-auto">
            Contattaci per una consulenza senza impegno. Insieme,
            creeremo il giardino che hai sempre sognato.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+393714821825">
              <Button className="bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4">
                <Phone className="mr-2 w-5 h-5" />
                Chiama Ora
              </Button>
            </a>
            <Link href="/contatti">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
              >
                Scrivici
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-cream-300">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Piemonte e Lombardia
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              visionesostenibile96@gmail.com
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
