import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Award, Users, Shield } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "../components/animations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chi Siamo | Visione Sostenibile",
  description:
    "Scopri Visione Sostenibile: passione per il verde, professionalità e sostenibilità. Dal 2009 creiamo giardini unici a Roma e provincia.",
};

const values = [
  {
    icon: Leaf,
    title: "Sostenibilità",
    description:
      "Tecniche a basso impatto e materiali eco-compatibili per proteggere il pianeta che ci ospita.",
  },
  {
    icon: Award,
    title: "Qualità",
    description:
      "Ogni progetto è curato nei minimi dettagli, con piante e materiali selezionati uno ad uno.",
  },
  {
    icon: Users,
    title: "Professionalità",
    description:
      "Agronomi, paesaggisti e giardinieri esperti al servizio della vostra visione.",
  },
  {
    icon: Shield,
    title: "Affidabilità",
    description:
      "Rispetto rigoroso dei tempi, trasparenza nei costi e garanzia su ogni intervento.",
  },
];

const stats = [
  { value: "15+", label: "Anni di esperienza" },
  { value: "500+", label: "Clienti soddisfatti" },
  { value: "1000+", label: "Progetti realizzati" },
  { value: "50+", label: "Tipologie servizi" },
];

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-br from-moss-900/90 via-moss-800/80 to-charcoal-900/85" />
          </div>
          {/* Decorative organic blobs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-moss-500/15 rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <SlideUp>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-cream-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              Chi Siamo
            </Badge>

            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 text-white text-balance">
              Passione per il Verde
              <span className="block italic text-terracotta-300">
                dal 2009
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-cream-200 max-w-2xl mx-auto leading-relaxed">
              Creiamo giardini che armonizzano bellezza estetica e profondo
              rispetto per l&apos;ambiente.
            </p>
          </SlideUp>

          {/* Scroll indicator */}
          <FadeIn delay={1.2}>
            <div className="mt-16">
              <div className="w-px h-20 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            <SlideUp>
              <div className="relative">
                {/* Decorative offset shadow element */}
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-terracotta-200/40 rounded-3xl" />
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-floating">
                  <Image
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800"
                    alt="Giardino rigoglioso con piante curate"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-moss-900/30 to-transparent" />
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <span className="font-display italic text-terracotta-600 text-lg">
                La nostra storia
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-4 mb-8 leading-tight">
                Creiamo spazi verdi
                <span className="block text-moss-700">che ispirano</span>
              </h2>
              <div className="space-y-6 font-body text-charcoal-600">
                <p className="text-lg leading-relaxed">
                  Da oltre quindici anni operiamo nel settore del giardinaggio e
                  della progettazione del paesaggio, trasformando giardini,
                  terrazze e spazi esterni in luoghi unici e rigogliosi.
                </p>
                <p className="text-lg leading-relaxed">
                  Il nostro team è composto da professionisti qualificati:
                  agronomi, architetti del paesaggio, giardinieri esperti e
                  tecnici specializzati nelle diverse aree dell&apos;ingegneria
                  naturalistica.
                </p>
                <p className="text-lg leading-relaxed">
                  Crediamo fermamente che ogni spazio verde debba essere
                  progettato considerando l&apos;equilibrio naturale, la
                  sostenibilità ambientale e le esigenze specifiche di chi lo
                  vivrà ogni giorno.
                </p>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 md:py-36 px-6 bg-cream-100 relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-moss-100/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-20">
              <span className="font-display italic text-terracotta-600 text-lg">
                I nostri valori
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-4 leading-tight">
                Cosa ci
                <span className="italic text-moss-700"> guida</span>
              </h2>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <StaggerItem key={value.title} delay={index * 0.1}>
                  <Card
                    variant="default"
                    className="h-full text-center bg-white border-cream-200 hover:shadow-medium transition-shadow duration-500"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-moss-100 flex items-center justify-center mx-auto mb-6">
                        <value.icon className="w-8 h-8 text-moss-700" />
                      </div>
                      <h3 className="font-display text-2xl text-charcoal-800 mb-3">
                        {value.title}
                      </h3>
                      <p className="font-body text-charcoal-500 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-28 md:py-36 bg-moss-900 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-moss-900 via-moss-800/90 to-moss-900" />
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-16 w-64 h-64 bg-moss-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SlideUp>
            <div className="text-center mb-20">
              <Badge className="bg-terracotta-500/20 border-terracotta-400/30 text-terracotta-200 mb-6">
                I numeri che parlano
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
                Risultati che
                <span className="block italic text-terracotta-300">
                  raccontano
                </span>
              </h2>
            </div>
          </SlideUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <SlideUp key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="font-display text-5xl md:text-6xl font-light text-terracotta-400 mb-3">
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm uppercase tracking-widest text-cream-300">
                    {stat.label}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 md:py-36 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cream-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-terracotta-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-moss-100/50 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SlideUp>
            <span className="font-display italic text-terracotta-600 text-lg">
              Iniziamo insieme
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-4 mb-8 leading-tight">
              Vuoi conoscerci
              <span className="block italic text-moss-700">meglio?</span>
            </h2>
            <p className="font-body text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto mb-12">
              Siamo sempre disponibili per una consulenza gratuita o per
              accompagnarvi nella visita di alcuni dei nostri progetti
              realizzati. Ogni grande giardino inizia con una conversazione.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white border-0 px-8 py-4 text-lg tracking-wide"
                >
                  Contattaci Ora
                </Button>
              </Link>
              <Link href="/servizi">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-charcoal-300 text-charcoal-700 hover:bg-charcoal-100 px-8 py-4 text-lg tracking-wide"
                >
                  I Nostri Servizi
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
