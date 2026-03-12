"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Bug } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ReviewsWidget } from "../components/ReviewsWidget";
import { ServiceCard } from "../components/ServiceCard";
import {
  normalizeServiceSlug,
  staticServices,
  serviceImages,
} from "../lib/static-data";
import { siteConfig } from "../lib/site-config";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

const extraServiceBoxes = [
  {
    title: "Riqualificazione giardini esistenti",
    subtitle: "PRESERVIAMO L’ESISTENTE",
    kicker: "interveniamo per fasi, senza rifare tutto",
    text:
      "Un giardino può perdere equilibrio per suolo, acqua, scelte botaniche o manutenzione discontinua o errata. Non sempre, però, è necessario rifare l’intero giardino. Semplici interventi possono comunque fare la differenza. Noi partiamo dall’analisi e costruiamo un percorso a fasi: basi (suolo/irrigazione), verde, finiture e gestione nel tempo. In questo modo recuperiamo ordine e vitalità con interventi mirati e risultati garantiti.",
    cta: "Prenota il tuo Check-up Sostenibile",
  },
  {
    title: "Terrazzi e attici",
    subtitle: "TETTI VERDI, PENSILI, IN VASO",
    kicker: "belli, leggeri, gestibili",
    text:
      "Grazie alle nuove tecnologie dei materiali esistenti possiamo realizzare il tuo giardino anche all’ultimo piano del palazzo. Progettiamo terrazzi e attici sostenibili valutando esposizione, vento, irrigazione e gestione reale del tempo. Scegliamo soluzioni e piante adatte, per avere un outdoor vivibile e stabile senza affanno, inoltre coordiniamo anche finiture e arredi outdoor se parte del progetto.",
    cta: "Richiedi un sopralluogo",
  },
  {
    title: "Gestione del verde per condomìni e aziende",
    subtitle: "L’INGRESSO È IL TUO BIGLIETTO DA VISITA",
    kicker: "continuità, sicurezza e immagine",
    text:
      "L’accoglienza data da un ingresso curato e verde (azienda, condominio, struttura pubblica o privata) è fondamentale per il benessere di tutti. Per condomìni, aziende e strutture ricettive offriamo manutenzione programmata e gestione tecnica del verde, con un referente unico e squadre specializzate. Calendario stagionale, interventi mirati, ottimizzazione dove serve: meno emergenze e costi più prevedibili.",
    cta: "Richiedi una proposta (B2B)",
  },
  {
    title: "Orti sostenibili",
    subtitle: "LA TUA VERDURA A KM 0",
    kicker: "sana, stagionale, gustosa",
    text:
      "Progettiamo e realizziamo orti sostenibili su misura: per chi vuole coltivare in modo semplice, ordinato e produttivo, con una gestione dell’acqua e del suolo pensata per reggere nel tempo. Un orto non è solo “piantare qualcosa”: è esposizione, terreno, irrigazione, rotazioni, accessi, protezioni. Se uno di questi elementi è fuori posto, l’orto diventa fatica, spreco e delusione. Noi partiamo dall’ascolto e dall’analisi del contesto, poi impostiamo spazi, materiali e impianti perché l’orto funzioni davvero, sia bello da vedere e sostenibile da mantenere stagione dopo stagione.",
    cta: "Parliamone: ti consigliamo la soluzione più adatta al tuo spazio",
  },
];

export function ServiziClient() {
  const siteUrl = siteConfig.siteUrl;
  const servicesQuery = useQuery(api.services.getAll);
  const serviceOverrides = new Map(
    staticServices.map((service) => [service.slug, service])
  );
  const rawServices =
    servicesQuery && servicesQuery.length > 0 ? servicesQuery : staticServices;
  const services = rawServices
    .map((service) => {
      const normalizedSlug = normalizeServiceSlug(service.slug);
      const override = serviceOverrides.get(normalizedSlug);
      return {
        ...service,
        ...override,
        slug: normalizedSlug,
      };
    })
    .sort((left, right) => left.order - right.order);

  const getImageForService = (slug: string): string => {
    const normalizedSlug = normalizeServiceSlug(slug);
    return (
      serviceImages[normalizedSlug] ||
      "/images/servizi/progettazione-giardini-cover.webp"
    );
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servizi",
        item: `${siteUrl}/servizi`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-forest-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          {/* Poster image — fast LCP element */}
          <Image
            src="/images/servizi-hero-poster.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          {/* Video loads lazily on top of poster */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          >
            <source src="/videos/nature-garden-flowers.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/75 via-forest-900/55 to-forest-950/65" />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-leaf-500/20 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sun-400/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-leaf-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 px-4 py-1.5 text-xs tracking-widest uppercase">
                I Nostri Servizi
              </Badge>
              <Badge variant="eco" className="px-4 py-1.5 text-xs tracking-widest uppercase">
                <Bug className="w-3 h-3 mr-1.5 inline" />
                Metodi Biodinamici
              </Badge>
            </div>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-paper-50 leading-tight max-w-4xl mb-8">
              Cosa possiamo
              <span className="block italic text-leaf-400">
                fare per te
              </span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.1}>
            <p className="font-body text-lg text-paper-300/80 max-w-3xl mb-4">
              Visione Sostenibile progetta, realizza e mantiene giardini e spazi outdoor sostenibili con un approccio concreto: scelte motivate, lavoro a fasi e gestione nel tempo.
            </p>
            <p className="font-body text-lg text-paper-300/80 max-w-3xl mb-6">
              Hai un unico referente che coordina un team modulare di competenze verticali e partnership selezionate.
            </p>
            <p className="font-body text-lg italic text-leaf-400 max-w-3xl mb-10">
              Se non sai da dove partire, il modo più semplice è uno: Check-up Sostenibile.
            </p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link href="/contatti">
                <Button size="lg" className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-6 py-3">
                  <Phone className="w-4 h-4 mr-2" />
                  Prenota il Check-up Sostenibile
                </Button>
              </Link>
              <Link href="/contatti">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 px-6 py-3 text-paper-50 hover:bg-white/10">
                  Richiedi una proposta (B2B)
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Services by Level */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Livello A: Verde sostenibile (core) */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-leaf-600 bg-leaf-50 px-4 py-2 rounded-full">
                Livello 1
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950">
                Verde sostenibile <span className="italic text-leaf-700">(core)</span>
              </h2>
            </div>
            <p className="font-body text-forest-800/70 max-w-2xl mb-8">
              La Visione Sostenibile che racchiude tutto il nostro lavoro. Progettiamo, realizziamo e curiamo giardini che resistono al clima di oggi.
            </p>
            <StaggerContainer>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {services.filter(s =>
                  ['progettazione-giardini', 'realizzazione-giardini', 'manutenzioni', 'rigenerazione-terreni', 'impianti-irrigazione', 'potature'].includes(normalizeServiceSlug(s.slug))
                ).slice(0, 6).map((service, index) => (
                  <StaggerItem key={service._id} delay={0.05}>
                    <ServiceCard
                      slug={normalizeServiceSlug(service.slug)}
                      title={service.title}
                      shortDescription={service.shortDescription}
                      image={getImageForService(service.slug)}
                      index={index}
                    />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>

          {/* Livello B: Outdoor living (comfort) */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-sun-500 bg-sun-50 px-4 py-2 rounded-full">
                Livello 2
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950">
                Outdoor living <span className="italic text-leaf-700">(comfort)</span>
              </h2>
            </div>
            <p className="font-body text-forest-800/70 max-w-2xl mb-8">
              Progettiamo il tuo spazio verde per accogliere i tuoi ricordi migliore: luce, arredi, strutture per stare all&apos;aperto davvero.
            </p>
            <StaggerContainer>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {services.filter(s =>
                  ['arredamento-esterni', 'illuminazione-esterni', 'camminamenti-pietra'].includes(normalizeServiceSlug(s.slug))
                ).slice(0, 3).map((service, index) => (
                  <StaggerItem key={service._id} delay={0.05}>
                    <ServiceCard
                      slug={normalizeServiceSlug(service.slug)}
                      title={service.title}
                      shortDescription={service.shortDescription}
                      image={getImageForService(service.slug)}
                      index={index}
                    />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>

          {/* Livello C: Acqua e benessere (premium) */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-leaf-700 bg-leaf-100 px-4 py-2 rounded-full">
                Livello 3
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950">
                Specializzazioni <span className="italic text-leaf-700">(premium)</span>
              </h2>
            </div>
            <p className="font-body text-forest-800/70 max-w-2xl mb-8">
              Dalla scelta botanica ai trattamenti fitosanitari biologici, fino all&apos;ingegneria naturalistica: competenze che raramente si trovano sotto lo stesso tetto.
            </p>
            <StaggerContainer>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {services.filter(s =>
                  ['scelta-piante', 'trattamenti-piante', 'ingegneria-naturalistica'].includes(normalizeServiceSlug(s.slug))
                ).slice(0, 3).map((service, index) => (
                  <StaggerItem key={service._id} delay={0.05}>
                    <ServiceCard
                      slug={normalizeServiceSlug(service.slug)}
                      title={service.title}
                      shortDescription={service.shortDescription}
                      image={getImageForService(service.slug)}
                      index={index}
                    />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-2">
          {extraServiceBoxes.map((box) => (
            <div
              key={box.title}
              className="rounded-[30px] border border-paper-200 bg-white p-8 shadow-soft"
            >
              <p className="font-display text-sm italic text-leaf-600">{box.title}</p>
              <h3 className="mt-3 font-display text-2xl text-forest-950">
                {box.subtitle}
              </h3>
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-leaf-700">
                {box.kicker}
              </p>
              <p className="mt-5 font-body leading-relaxed text-forest-800/80">
                {box.text}
              </p>
              <Link href="/contatti" className="mt-6 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-leaf-700 hover:text-leaf-600 transition-colors">
                {box.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto rounded-[32px] border border-paper-200 bg-white p-8 md:p-10 shadow-soft text-center">
          <Badge className="mb-4 bg-leaf-50 text-leaf-700 border border-leaf-200">
            Check-up Sostenibile
          </Badge>
          <h3 className="font-display text-2xl md:text-3xl text-forest-950">
            Non sai quale servizio ti serve? Parti dal Check-up Sostenibile.
          </h3>
          <p className="mt-4 font-body text-lg text-forest-800/75">
            In 60–90 minuti ti lasciamo 3 priorità, 3 errori da evitare e un piano in step.
          </p>
          <div className="mt-8">
            <Link href="/contatti">
              <Button size="lg" className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8 py-4 text-lg">
                Prenota il Check-up
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsWidget />

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-leaf-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sun-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <SlideUp>
            <Badge className="bg-sun-400/20 border-leaf-500/30 text-leaf-300 mb-6">
              Parliamone
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-paper-50 leading-tight mb-6">
              Ti diciamo cosa serve
              <span className="block italic text-leaf-400">
                davvero
              </span>
            </h2>
            <p className="font-body text-lg text-paper-300/70 max-w-xl mx-auto mb-10">
              Che tu stia partendo da zero o che tu voglia riqualificare un giardino esistente, ti aiutiamo a capire cosa serve — e cosa no.
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contatti">
                <Button size="lg" className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8 py-4 text-lg">
                  Richiedi un sopralluogo
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
