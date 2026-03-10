"use client";

import Link from "next/link";
import { ArrowRight, Phone, Bug, Building2, Home } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ReviewsWidget } from "../components/ReviewsWidget";
import { QuizCTA } from "../components/QuizCTA";
import { ServiceCard } from "../components/ServiceCard";
import {
  normalizeServiceSlug,
  staticServices,
  serviceImages,
} from "../lib/static-data";
import { siteConfig } from "../lib/site-config";
import { useAudience } from "../lib/useAudience";
import { cn } from "../lib/utils";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

// B2B descriptions lookup from staticServices
const b2bDescriptionMap: Record<string, string> = Object.fromEntries(
  staticServices
    .filter((s) => s.b2bShortDescription)
    .map((s) => [normalizeServiceSlug(s.slug), s.b2bShortDescription])
);

export function ServiziClient() {
  const siteUrl = siteConfig.siteUrl;
  const { audience, setAudience, isB2B } = useAudience();
  const servicesQuery = useQuery(api.services.getAll);
  const services =
    servicesQuery && servicesQuery.length > 0 ? servicesQuery : staticServices;

  const getImageForService = (slug: string): string => {
    const normalizedSlug = normalizeServiceSlug(slug);
    return (
      serviceImages[normalizedSlug] ||
      "/images/servizi/progettazione-giardini-cover.png"
    );
  };

  const getB2BDescription = (slug: string): string | undefined => {
    const normalizedSlug = normalizeServiceSlug(slug);
    // Prefer Convex b2bDescription if available, fallback to static map
    const service = services.find((s) => normalizeServiceSlug(s.slug) === normalizedSlug);
    if (service && "b2bDescription" in service && service.b2bDescription) {
      return service.b2bDescription as string;
    }
    return b2bDescriptionMap[normalizedSlug];
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
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
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
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-light text-paper-50 leading-tight max-w-4xl mb-8">
              {isB2B ? (
                <>
                  Gestione del verde
                  <span className="block italic text-leaf-400">
                    per la vostra azienda
                  </span>
                </>
              ) : (
                <>
                  Cosa possiamo
                  <span className="block italic text-leaf-400">
                    fare per te
                  </span>
                </>
              )}
            </h1>
          </SlideUp>

          <SlideUp delay={0.1}>
            <p className="font-body text-lg text-paper-300/80 max-w-2xl mb-6">
              {isB2B
                ? "Soluzioni integrate per aziende, condomini e strutture ricettive: decoro costante, costi certi, un solo referente."
                : <>Organizziamo i servizi in tre livelli, cos&igrave; puoi scegliere quello che ti serve davvero — senza pezzi inutili.</>}
            </p>
            <p className="font-body text-lg italic text-leaf-400 max-w-2xl mb-6">
              {isB2B
                ? "Un unico contractor del verde. Zero pensieri operativi."
                : "Non vendiamo pezzi. Progettiamo sistemi."}
            </p>

            {/* Audience toggle pill */}
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md p-1 mb-4">
              <button
                onClick={() => setAudience("b2c")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300",
                  audience === "b2c"
                    ? "bg-paper-50/20 text-paper-50 shadow-sm"
                    : "text-paper-300/60 hover:text-paper-300"
                )}
              >
                <Home className="w-3 h-3" />
                Privati
              </button>
              <button
                onClick={() => setAudience("b2b")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300",
                  audience === "b2b"
                    ? "bg-paper-50/20 text-paper-50 shadow-sm"
                    : "text-paper-300/60 hover:text-paper-300"
                )}
              >
                <Building2 className="w-3 h-3" />
                Aziende
              </button>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link href="/contatti">
                <Button size="lg" className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-6 py-3">
                  <Phone className="w-4 h-4 mr-2" />
                  {isB2B ? "Richiedi un preventivo aziendale" : "Richiedi un Preventivo"}
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
              Il cuore del nostro lavoro: progettazione, realizzazione e manutenzione di giardini che resistono al clima di oggi.
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
                      b2bShortDescription={getB2BDescription(service.slug)}
                      isB2B={isB2B}
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
              Trasformiamo il tuo giardino in uno spazio da vivere: luce, arredi, strutture per stare all&apos;aperto.
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
                      b2bShortDescription={getB2BDescription(service.slug)}
                      isB2B={isB2B}
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
              Servizi specialistici: dalla scelta botanica mirata ai trattamenti fitosanitari biologici, fino all&apos;ingegneria naturalistica.
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
                      b2bShortDescription={getB2BDescription(service.slug)}
                      isB2B={isB2B}
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

      {/* Quiz CTA */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <QuizCTA variant="inline" />
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
            <h2 className="text-stitch-heading text-4xl md:text-5xl lg:text-6xl text-paper-50 mb-6">
              {isB2B ? (
                <>
                  Un referente unico
                  <span className="block italic text-leaf-400">
                    per il vostro verde
                  </span>
                </>
              ) : (
                <>
                  Ti diciamo cosa serve
                  <span className="block italic text-leaf-400">
                    davvero
                  </span>
                </>
              )}
            </h2>
            <p className="font-body text-lg text-paper-300/70 max-w-xl mx-auto mb-10">
              {isB2B
                ? "Sopralluogo tecnico, proposta operativa e piano manutentivo: tutto in un unico incontro."
                : "Che tu stia partendo da zero o che tu voglia riqualificare un giardino esistente, ti aiutiamo a capire cosa serve \u2014 e cosa no."}
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contatti">
                <Button size="lg" className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8 py-4 text-lg">
                  {isB2B ? "Prenota una call operativa" : "Richiedi un sopralluogo"}
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
