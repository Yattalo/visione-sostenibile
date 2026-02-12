import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Award, Users, Bug, Droplets, Flower2 } from "lucide-react";
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
    "Scopri Visione Sostenibile: Andrea Giordano e la passione per il giardinaggio sostenibile a impatto zero. Oltre 20 anni di biodinamica in Piemonte e Lombardia.",
};

const values = [
  {
    icon: Leaf,
    title: "Impatto Zero",
    description:
      "Ripristiniamo i danni causati all'ambiente durante gli interventi invasivi. Il bilancio ambientale netto e sempre zero.",
  },
  {
    icon: Bug,
    title: "Zero Rischi",
    description:
      "Eliminazione totale del rischio di intossicazione per persone, bambini e animali domestici. Nessun prodotto chimico.",
  },
  {
    icon: Award,
    title: "Biodinamica",
    description:
      "Oltre 20 anni di pratica biodinamica integrata in ogni progetto per un verde sano e rigoglioso.",
  },
  {
    icon: Users,
    title: "Bassa Manutenzione",
    description:
      "Terreni ricchi di vita che favoriscono la crescita naturale delle piante, riducendo drasticamente gli interventi.",
  },
];

const stats = [
  { value: "20+", label: "Anni in biodinamica" },
  { value: "10+", label: "Anni di giardinaggio" },
  { value: "100%", label: "Impatto zero" },
  { value: "0", label: "Prodotti chimici" },
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
              Giardinaggio Sostenibile
              <span className="block italic text-terracotta-300">
                a Impatto Zero
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-cream-200 max-w-2xl mx-auto leading-relaxed">
              Andrea Giordano e Visione Sostenibile: oltre 20 anni di biodinamica
              al servizio del verde in Piemonte e Lombardia.
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
                  Andrea Giordano, fondatore di Visione Sostenibile, pratica
                  l&apos;agricoltura biodinamica da oltre 20 anni e ha oltre 10 anni
                  di esperienza nella realizzazione di giardini e orti sostenibili.
                </p>
                <p className="text-lg leading-relaxed">
                  Operiamo in Piemonte e Lombardia con un approccio unico:
                  siamo l&apos;unico giardiniere nel territorio che realizza giardini
                  a impatto zero, ripristinando completamente i danni ambientali
                  causati durante gli interventi.
                </p>
                <p className="text-lg leading-relaxed">
                  La nostra missione nasce dalla definizione ONU di sostenibilita:
                  garantire i bisogni della generazione presente senza compromettere
                  quelli delle generazioni future. Preservare l&apos;ambiente per i nostri figli.
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

      {/* Eco/Sustainability Dedicated Section */}
      <section className="py-28 md:py-36 px-6 relative overflow-hidden bg-moss-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920')",
            }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta-500/40 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideUp>
              <Badge variant="eco" className="mb-6">
                <Bug className="w-3 h-3 mr-1.5 inline" />
                Il Nostro Approccio
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl text-cream-50 leading-tight mb-8">
                Sostenibilita ambientale
                <span className="block italic text-terracotta-300">
                  a impatto zero
                </span>
              </h2>
              <div className="space-y-6 font-body text-cream-200/80 leading-relaxed">
                <p className="text-lg">
                  Il nostro approccio si distingue per il <strong>giardinaggio a impatto zero</strong>:
                  ripristiniamo i danni causati all&apos;ambiente durante gli interventi invasivi,
                  garantendo un bilancio ambientale netto pari a zero.
                </p>
                <p className="text-lg">
                  Eliminiamo completamente il <strong>rischio di intossicazione</strong> per
                  persone, bambini e animali domestici. Nessun pesticida, nessun prodotto chimico.
                </p>
                <p className="text-lg">
                  I nostri giardini sono progettati per essere a <strong>bassa manutenzione</strong>:
                  terreni ricchi di vita che favoriscono la crescita naturale delle piante,
                  trasformando ogni spazio in un ecosistema autosufficiente.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Badge variant="biodynamic" className="px-4 py-2">
                  20+ Anni di Biodinamica
                </Badge>
                <Badge variant="eco" className="px-4 py-2">
                  Impatto Zero
                </Badge>
                <Badge variant="eco" className="px-4 py-2">
                  Zero Prodotti Chimici
                </Badge>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Leaf, label: "Impatto ambientale zero" },
                  { icon: Bug, label: "Zero rischio intossicazione" },
                  { icon: Flower2, label: "Bassa manutenzione" },
                  { icon: Droplets, label: "Metodi biodinamici" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
                  >
                    <item.icon className="w-8 h-8 mx-auto text-terracotta-400 mb-3" />
                    <p className="font-body text-sm text-cream-200">{item.label}</p>
                  </div>
                ))}
              </div>
            </SlideUp>
          </div>
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
