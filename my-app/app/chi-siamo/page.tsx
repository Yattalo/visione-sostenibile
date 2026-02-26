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
import { TeamSection } from "../components/TeamSection";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.chiSiamo.title,
    description: pageSeo.chiSiamo.description,
    path: "/chi-siamo",
    image: "/images/chi-siamo/hero.jpg",
  }),
};

const values = [
  {
    icon: Leaf,
    title: "Sostenibile non è una moda",
    description:
      "È una strategia. Un giardino sostenibile è progettato per ridurre sprechi e interventi inutili, gestire meglio l'acqua, favorire equilibrio e biodiversità, durare nel tempo con costi più controllabili.",
  },
  {
    icon: Bug,
    title: "Zero chimica",
    description:
      "Nessun prodotto fitosanitario. L'approccio biodinamico crea terreni ricchi di vita che favoriscono la crescita naturale delle piante.",
  },
  {
    icon: Award,
    title: "Un referente",
    description:
      "Un solo interlocutore per tempi, scelte e budget: niente rimbalzi tra fornitori. Andrea coordina competenze verticali e partner selezionati.",
  },
  {
    icon: Users,
    title: "Manutenzione programmata",
    description:
      "La sostenibilità è anche gestione. Interventi mirati, prevenzione, calendario stagionale: il verde resta un valore, non torna un problema.",
  },
];

const storyContent = [
  "Andrea è il volto di Visione Sostenibile: appassionato, curioso, in continua ricerca.",
  "Lavora in ascolto: delle persone, degli spazi, e di ciò che la natura sta dicendo oggi (anche quando è scomodo).",
  "Ama raccontare cosa fa e come lo fa, ma soprattutto perché sceglie una soluzione e non un'altra: perché per Andrea un giardino non è un lavoro da finire, è un equilibrio da costruire.",
  "Coordina un team di competenze verticali e partnership selezionate, e nel frattempo continua a formarsi, confrontarsi e tenere corsi dal vivo: perché il futuro del verde — tra clima che cambia e risorse da gestire meglio — si costruisce con scelte consapevoli, non con scorciatoie.",
];

const stats = [
  { value: "20+", label: "Anni in biodinamica" },
  { value: "10+", label: "Anni di giardinaggio" },
  { value: "100%", label: "Impatto zero" },
  { value: "0", label: "Prodotti chimici" },
];

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/chi-siamo/hero.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950/90 via-forest-900/80 to-forest-950/85" />
          </div>
          {/* Decorative organic blobs */}
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-leaf-500/15 rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <SlideUp>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              Chi Siamo
            </Badge>

            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 text-white text-balance">
              Andrea Giordano:
              <span className="block italic text-leaf-400">
                il giardiniere che ti spiega il perché
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
              Il volto di Visione Sostenibile: appassionato, curioso, in continua ricerca. 
              Un unico referente che coordina competenze verticali e partnership selezionate.
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
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-leaf-200/40 rounded-3xl" />
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-floating">
                  <Image
                    src="/images/chi-siamo/andrea.jpg"
                    alt="Andrea Giordano - Fondatore Visione Sostenibile"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <span className="font-display italic text-leaf-600 text-lg">
                La nostra storia
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-4 mb-8 leading-tight">
                Un giardino non è un lavoro da finire.
                <span className="block text-leaf-700">È un equilibrio da costruire.</span>
              </h2>
              <div className="space-y-6 font-body text-forest-800">
                {storyContent.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 px-6 bg-leaf-50">
        <div className="max-w-4xl mx-auto text-center">
          <SlideUp>
            <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-8 leading-tight">
              Bello. Sostenibile. Gestibile.<br />
              <span className="italic text-leaf-700">Un referente, un metodo, una squadra su misura.</span>
            </h2>
            <p className="font-body text-forest-800 max-w-2xl mx-auto">
              Scelte spiegate, risultati che durano.<br />
              Non facciamo giardini Instagram. Facciamo giardini che superano agosto.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 md:py-36 px-6 bg-paper-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-leaf-100/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-20">
              <span className="font-display italic text-leaf-600 text-lg">
                I nostri valori
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-4 leading-tight">
                Cosa ci
                <span className="italic text-leaf-700"> guida</span>
              </h2>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <StaggerItem key={value.title} delay={index * 0.1}>
                  <Card
                    variant="default"
                    className="h-full text-center bg-white border-paper-300 hover:shadow-medium transition-shadow duration-500"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-leaf-100 flex items-center justify-center mx-auto mb-6">
                        <value.icon className="w-8 h-8 text-leaf-700" />
                      </div>
                      <h3 className="font-display text-2xl text-forest-950 mb-3">
                        {value.title}
                      </h3>
                      <p className="font-body text-forest-800/70 leading-relaxed">
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
      <section className="py-28 md:py-36 px-6 relative overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/chi-siamo/approccio.jpg')",
            }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-leaf-500/40 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideUp>
              <Badge variant="eco" className="mb-6">
                <Bug className="w-3 h-3 mr-1.5 inline" />
                Sostenibile non è una moda
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl text-paper-50 leading-tight mb-8">
                È una strategia.
                <span className="block italic text-leaf-400">
                  Meno sprechi, più durata.
                </span>
              </h2>
              <div className="space-y-6 font-body text-paper-300/80 leading-relaxed">
                <p className="text-lg">
                  <strong>Un giardino sostenibile è progettato per:</strong>
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-leaf-400 mt-1">•</span>
                    <span>ridurre sprechi e interventi inutili</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-leaf-400 mt-1">•</span>
                    <span>gestire meglio l&apos;acqua</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-leaf-400 mt-1">•</span>
                    <span>favorire equilibrio e biodiversità</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-leaf-400 mt-1">•</span>
                    <span>durare nel tempo con costi più controllabili</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Badge variant="biodynamic" className="px-4 py-2">
                  20+ Anni di Biodinamica
                </Badge>
                <Badge variant="eco" className="px-4 py-2">
                  Zero Prodotti Chimici
                </Badge>
                <Badge variant="eco" className="px-4 py-2">
                  Manutenzione Programmata
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
                    <item.icon className="w-8 h-8 mx-auto text-leaf-400 mb-3" />
                    <p className="font-body text-sm text-paper-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      <TeamSection />

      {/* Stats Section */}
      <section className="py-28 md:py-36 bg-forest-950 text-paper-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/chi-siamo/approccio.jpg')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>
        {/* Decorative blobs */}
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-sun-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-16 w-64 h-64 bg-leaf-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SlideUp>
            <div className="text-center mb-20">
              <Badge className="bg-sun-400/20 border-leaf-500/30 text-leaf-300 mb-6">
                I numeri che parlano
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
                Risultati che
                <span className="block italic text-leaf-400">
                  raccontano
                </span>
              </h2>
            </div>
          </SlideUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <SlideUp key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="font-display text-5xl md:text-6xl font-light text-leaf-400 mb-3">
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm uppercase tracking-widest text-paper-400">
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
        <div className="absolute inset-0 bg-paper-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-leaf-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-leaf-100/50 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SlideUp>
            <span className="font-display italic text-leaf-600 text-lg">
              Il nostro manifesto
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-4 mb-8 leading-tight">
              Visione Sostenibile nasce dall&apos;ascolto:
              <span className="block italic text-leaf-700">delle persone, dei luoghi, della natura che cambia.</span>
            </h2>
            <div className="font-body text-lg text-forest-800 leading-relaxed max-w-2xl mx-auto space-y-4 mb-8">
              <p>Crediamo in giardini belli, sì — ma soprattutto <strong>stabili, gestibili e capaci di durare</strong>.</p>
              <p>Ogni scelta ha un motivo: <strong>spieghiamo il perché</strong>, valutiamo alternative, costruiamo consapevolezza.</p>
              <p>Lavoriamo con un&apos;unica regia e competenze verticali: <strong>un referente, una squadra su misura</strong>.</p>
              <p>Perché il futuro del verde non è una moda: è <strong>cura, metodo e responsabilità</strong>.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-white border-0 px-8 py-4 text-lg tracking-wide"
                >
                  Richiedi un sopralluogo
                </Button>
              </Link>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-forest-700 text-forest-900 hover:bg-paper-300 px-8 py-4 text-lg tracking-wide"
                >
                  Guarda Andrea in 2 minuti
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
