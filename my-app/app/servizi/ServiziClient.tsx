"use client";

import Link from "next/link";
import { ArrowRight, Phone, Bug } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ReviewsWidget } from "../components/ReviewsWidget";
import { ServiceCard } from "../components/ServiceCard";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

export function ServiziClient() {
  const services = useQuery(api.services.getAll) ?? [];

  const getImageForService = (service: { slug: string; image?: string }) => {
    // Use image from Convex if available, otherwise fallback to local images
    if (service.image && service.image.startsWith('/')) {
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
    return imageMap[service.slug] || "/images/servizi/progettazione-giardini-cover.png";
  };

  return (
    <div className="min-h-screen bg-paper-50">
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
              Soluzioni per ogni
              <span className="block italic text-leaf-400">
                esigenza verde
              </span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.1}>
            <p className="font-body text-lg text-paper-300/80 max-w-2xl mb-10">
              Progettazione, realizzazione e manutenzione di giardini sostenibili.
              Un approccio biodinamico per spazi verdi che rispettano l&apos;ambiente.
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

      {/* Services Grid */}
      <section className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <StaggerItem key={service._id} delay={0.05}>
                  <ServiceCard
                    slug={service.slug}
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
              Inizia il tuo progetto
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-paper-50 leading-tight mb-6">
              Pronto a trasformare
              <span className="block italic text-leaf-400">
                il tuo giardino?
              </span>
            </h2>
            <p className="font-body text-lg text-paper-300/70 max-w-xl mx-auto mb-10">
              Prenota una consulenza gratuita. Insieme progetteremo lo spazio verde
              che hai sempre desiderato.
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contatti">
                <Button size="lg" className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8 py-4 text-lg">
                  Contattaci Ora
                </Button>
              </Link>
              <Link href="/progetti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-paper-400/30 text-paper-100 hover:bg-paper-100/10 px-8 py-4 text-lg"
                >
                  Guarda i Nostri Progetti
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
