import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Bug,
} from "lucide-react";
import { staticServices, serviceImages } from "../lib/static-data";
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

export const metadata: Metadata = {
  title: "I Nostri Servizi | Visione Sostenibile",
  description:
    "Scopri tutti i nostri servizi di giardinaggio sostenibile: progettazione, realizzazione e manutenzione giardini e orti a impatto zero. Piemonte e Lombardia.",
};

export default function ServiziPage() {
  const services = staticServices;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          Matches homepage organic aesthetic: dark moss bg,
          decorative blobs, serif italic heading
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-moss-900 pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Background with video support */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/75 via-moss-800/55 to-charcoal-900/65" />
        </div>

        {/* Organic decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-moss-500/20 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-500/5 rounded-full blur-3xl" />

        {/* Thin decorative accent line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-cream-200 px-4 py-1.5 text-xs tracking-widest uppercase">
                I Nostri Servizi
              </Badge>
              <Badge variant="eco" className="px-4 py-1.5 text-xs tracking-widest uppercase">
                <Bug className="w-3 h-3 mr-1.5 inline" />
                Metodi Biodinamici
              </Badge>
            </div>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream-50 leading-tight max-w-4xl mb-8">
              Soluzioni per ogni
              <span className="block italic text-terracotta-300">
                esigenza verde
              </span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-cream-200/80 max-w-2xl leading-relaxed mb-8">
              Dalla progettazione alla manutenzione, un servizio completo chiavi
              in mano per giardini e orti sostenibili a impatto zero, con metodi
              biodinamici nel pieno rispetto della biodiversita.
            </p>
          </SlideUp>

          {/* Scroll indicator */}
          <SlideUp delay={0.5}>
            <div className="mt-16">
              <div className="w-px h-16 bg-gradient-to-b from-cream-300/50 to-transparent mx-0" />
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SERVICES GRID
          Numbered cards with icon, staggered reveal,
          hover arrow for navigation affordance
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        {/* Subtle top gradient blending hero into content */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-moss-900/5 to-transparent" />

        {/* Decorative background blob */}
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-terracotta-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-moss-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section intro */}
          <SlideUp>
            <div className="max-w-2xl mb-16 lg:mb-20">
              <span className="font-display italic text-terracotta-600 text-lg">
                Cosa possiamo fare per te
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-3 leading-tight">
                Competenza e sostenibilita,{" "}
                <span className="text-moss-700">una sola visione</span>
              </h2>
              <div className="w-16 h-px bg-terracotta-400 mt-6" />
            </div>
          </SlideUp>

          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <StaggerItem key={service._id} delay={index * 0.05}>
                  <ServiceCard
                    slug={service.slug}
                    title={service.title}
                    shortDescription={service.shortDescription}
                    image={serviceImages[service.slug] || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"}
                    index={index}
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROCESS SECTION
          Brief 3-step approach to reinforce trust
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-cream-100 overflow-hidden">
        <div className="absolute inset-0 bg-organic-noise" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream-400 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <SlideUp>
            <div className="text-center mb-16 lg:mb-20">
              <span className="font-display italic text-terracotta-600 text-lg">
                Il nostro approccio
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-3 leading-tight">
                Semplicita nel metodo,{" "}
                <span className="italic text-moss-700">eccellenza</span> nel
                risultato
              </h2>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                {
                  step: "01",
                  title: "Ascolto",
                  description:
                    "Incontriamo te e il tuo spazio. Ogni giardino ha una storia da raccontare, e tutto comincia dall'ascolto.",
                },
                {
                  step: "02",
                  title: "Progetto",
                  description:
                    "Trasformiamo le idee in un piano dettagliato, scegliendo piante, materiali e soluzioni su misura.",
                },
                {
                  step: "03",
                  title: "Realizzazione",
                  description:
                    "Il tuo giardino prende vita. Seguiamo ogni fase con cura artigianale e attenzione al dettaglio.",
                },
              ].map((item, index) => (
                <StaggerItem key={item.step} delay={index * 0.15}>
                  <div className="text-center md:text-left">
                    <span className="font-display text-6xl font-light text-terracotta-200">
                      {item.step}
                    </span>
                    <h3 className="font-display text-2xl text-charcoal-800 mt-2 mb-4">
                      {item.title}
                    </h3>
                    <p className="font-body text-charcoal-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Reviews Widget */}
      <ReviewsWidget
        variant="grid"
        className="bg-cream-50"
        title="Cosa dicono i clienti"
        subtitle="Le opinioni di chi ha scelto i nostri servizi di giardinaggio."
        maxReviews={6}
      />

      {/* ═══════════════════════════════════════════════════
          CTA SECTION
          Organic dark section matching homepage CTA style
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 bg-moss-900 text-cream-50 overflow-hidden">
        {/* Background texture */}
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

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-moss-500/15 rounded-full blur-3xl" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta-500/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SlideUp>
            <span className="font-display italic text-terracotta-300 text-lg">
              Preventivo gratuito
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream-50 mt-4 mb-6 leading-tight">
              Pronto a trasformare il tuo
              <span className="block italic text-terracotta-300">
                spazio verde?
              </span>
            </h2>
            <p className="font-body text-lg text-cream-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Contattaci per una consulenza senza impegno. Saremo lieti di
              ascoltare le tue esigenze e proporti la soluzione migliore per il
              tuo giardino.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+393714821825">
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
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
