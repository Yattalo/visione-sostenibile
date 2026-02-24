"use client";

import Link from "next/link";
import { Phone, Bug } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ReviewsWidget } from "../components/ReviewsWidget";
import { QuizCTA } from "../components/QuizCTA";
import { ServiceCard } from "../components/ServiceCard";
import { normalizeServiceSlug, staticServices } from "../lib/static-data";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

export function ServiziClient() {
  const siteUrl = "https://www.visionesostenibile.it";
  const servicesQuery = useQuery(api.services.getAll);
  const services =
    servicesQuery && servicesQuery.length > 0 ? servicesQuery : staticServices;

  const getImageForService = (service: { slug: string; image?: string | null }) => {
    const normalizedSlug = normalizeServiceSlug(service.slug);

    // Use image from Convex if available, otherwise fallback to local images
    if (service.image && service.image.startsWith("/")) {
      return service.image;
    }

    // Fallback to local images based on slug
    const imageMap: Record<string, string> = {
      "progettazione-giardini": "/images/servizi/progettazione-giardini-cover.png",
      "realizzazione-giardini": "/images/servizi/realizzazione-giardini-cover.png",
      "scelta-piante": "/images/servizi/scelta-piante-cover.png",
      "trattamenti-piante": "/images/servizi/trattamenti-piante-cover.png",
      "impianti-irrigazione": "/images/servizi/impianti-irrigazione-cover.png",
      "camminamenti-pietra": "/images/servizi/camminamenti-pietra-cover.png",
      "illuminazione-esterni": "/images/servizi/illuminazione-esterni-cover.png",
      "ingegneria-naturalistica": "/images/servizi/ingegneria-naturalistica-cover.png",
      "arredamento-esterni": "/images/servizi/arredamento-esterni-cover.png",
      "potature": "/images/servizi/potature-cover.png",
      "rigenerazione-terreni": "/images/servizi/rigenerazione-terreni-cover.png",
      "manutenzioni": "/images/servizi/manutenzioni-cover.png",
    };

    return imageMap[normalizedSlug] || "/images/servizi/progettazione-giardini-cover.png";
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
            <p className="font-body text-lg text-paper-300/80 max-w-2xl mb-6">
              Organizziamo i servizi in tre livelli, così puoi scegliere quello che ti serve davvero — senza pezzi inutili.
            </p>
            <p className="font-body text-lg italic text-leaf-400 max-w-2xl mb-10">
              Non vendiamo pezzi. Progettiamo sistemi.
            </p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Link href="/contatti">
                <Button size="lg" className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-6 py-3">
                  <Phone className="w-4 h-4 mr-2" />
                  Richiedi un Preventivo
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
                  ['progettazione-giardini', 'realizzazione-giardini', 'manutenzioni', 'rigenerazione-terreni', 'impianti-irrigazione', 'potature'].includes(s.slug)
                ).slice(0, 6).map((service, index) => (
                  <StaggerItem key={service._id} delay={0.05}>
                    <ServiceCard
                      slug={normalizeServiceSlug(service.slug)}
                      title={service.title}
                      shortDescription={service.shortDescription}
                      image={getImageForService(service)}
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
                  ['arredamento-esterni', 'illuminazione-esterni', 'camminamenti-pietra'].includes(s.slug)
                ).slice(0, 3).map((service, index) => (
                  <StaggerItem key={service._id} delay={0.05}>
                    <ServiceCard
                      slug={normalizeServiceSlug(service.slug)}
                      title={service.title}
                      shortDescription={service.shortDescription}
                      image={getImageForService(service)}
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
                Acqua e benessere <span className="italic text-leaf-700">(premium)</span>
              </h2>
            </div>
            <p className="font-body text-forest-800/70 max-w-2xl mb-8">
              In partnership con selezionati specialisti: laghetti, punti acqua e integrazioni paesaggistiche che valorizzano lo spazio.
            </p>
            <StaggerContainer>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {services.filter(s => 
                  ['ingegneria-naturalistica'].includes(s.slug)
                ).slice(0, 3).map((service, index) => (
                  <StaggerItem key={service._id} delay={0.05}>
                    <ServiceCard
                      slug={normalizeServiceSlug(service.slug)}
                      title={service.title}
                      shortDescription={service.shortDescription}
                      image={getImageForService(service)}
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
