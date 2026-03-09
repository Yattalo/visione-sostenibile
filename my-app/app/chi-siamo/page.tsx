import type { Metadata } from "next";
import Image from "next/image";
import {
  Leaf,
  Award,
  Sparkles,
  Heart,
  TreePine,
  Droplets,
  Bug,
  Flower2,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";
import Link from "next/link";
import { TeamSection } from "../components/TeamSection";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";
import { siteConfig } from "../lib/site-config";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.chiSiamo.title,
    description: pageSeo.chiSiamo.description,
    path: "/chi-siamo",
    image: "/images/chi-siamo/hero.jpg",
  }),
};

/* ── Data ────────────────────────────────────────────────────────────── */

const pillars = [
  {
    icon: Leaf,
    title: "Sostenibilita",
    subtitle: "In ogni progetto",
    description:
      "Un giardino sostenibile riduce sprechi e interventi inutili, gestisce meglio l\u2019acqua, favorisce la biodiversita e dura nel tempo con costi controllabili. Non e una moda: e una strategia.",
  },
  {
    icon: TreePine,
    title: "Biodinamica",
    subtitle: "Approccio naturale",
    description:
      "Nessun prodotto fitosanitario. L\u2019approccio biodinamico crea terreni ricchi di vita che favoriscono la crescita naturale delle piante, rispettando i cicli della natura.",
  },
  {
    icon: Award,
    title: "Qualita",
    subtitle: "Materiali ed esecuzione",
    description:
      "Un solo interlocutore per ottimizzare tempi, scelte e budget. Niente rimbalzi tra fornitori: coordinamento puntuale delle competenze verticali coinvolte nel progetto.",
  },
  {
    icon: Heart,
    title: "Passione",
    subtitle: "Per gli spazi verdi",
    description:
      "Formazione continua, confronto con specialisti e attenzione ai dettagli. Per Andrea un giardino non e un lavoro da finire: e un equilibrio da costruire, con cura e responsabilita.",
  },
];

const founderBio = [
  "Andrea e il volto di Visione Sostenibile: appassionato, curioso, in continua ricerca.",
  "Lavora in ascolto: delle persone, degli spazi, e di cio che la natura sta dicendo oggi \u2014 anche quando e scomodo.",
  "Ama raccontare cosa fa e come lo fa, ma soprattutto perche sceglie una soluzione e non un\u2019altra: perche per Andrea un giardino non e un lavoro da finire, e un equilibrio da costruire.",
  "Coordina un team di competenze verticali e partnership selezionate, e nel frattempo continua a formarsi, confrontarsi e tenere corsi dal vivo: perche il futuro del verde \u2014 tra clima che cambia e risorse da gestire meglio \u2014 si costruisce con scelte consapevoli, non con scorciatoie.",
];

const stats = [
  { value: "20+", label: "Anni in biodinamica" },
  { value: "10+", label: "Anni di giardinaggio" },
  { value: "100%", label: "Impatto zero" },
  { value: "0", label: "Prodotti chimici" },
];

const outcomes = [
  {
    icon: Droplets,
    label: "Consumo idrico ridotto",
    detail: "Irrigazione efficiente e piante adatte al territorio",
  },
  {
    icon: Bug,
    label: "Zero rischio intossicazione",
    detail: "Nessun prodotto fitosanitario, sicuro per famiglie e animali",
  },
  {
    icon: Flower2,
    label: "Bassa manutenzione",
    detail: "Progetti pensati per durare e richiedere meno interventi",
  },
  {
    icon: Sparkles,
    label: "Valore che cresce",
    detail: "Un giardino biodinamico migliora nel tempo, non degrada",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-paper-50">
      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section className="relative h-[70vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/chi-siamo/hero.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950/48 via-forest-900/30 to-forest-950/40" />
          </div>
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-leaf-500/15 rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 md:pt-24 text-center">
          <SlideUp>
            <Badge
              variant="eco"
              className="mb-6 bg-white/10 border-white/20 text-paper-200 backdrop-blur-sm"
            >
              <Leaf className="w-3 h-3 mr-1.5 inline" />
              Dal {siteConfig.foundingDate} a {siteConfig.address.city}
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 text-white text-balance">
              Chi siamo
              <span className="block italic text-leaf-400">
                il giardiniere che ti spiega i perche
              </span>
            </h1>
            <p className="font-body text-lg md:text-xl text-paper-300 max-w-3xl mx-auto leading-relaxed">
              Un referente unico che coordina competenze verticali, metodo
              biodinamico e partnership selezionate per risultati durevoli.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* ── Founder Bio: Andrea Giordano ──────────────────────────── */}
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
              <Badge variant="primary" className="mb-4">
                Fondatore
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-2 mb-4 leading-tight">
                {siteConfig.founder}
              </h2>
              <p className="font-display italic text-leaf-700 text-xl mb-8">
                Giardiniere biodinamico a {siteConfig.address.city}
              </p>
              <div className="space-y-5 font-body text-forest-800">
                {founderBio.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Badge variant="biodynamic" className="px-4 py-2">
                  20+ Anni di Biodinamica
                </Badge>
                <Badge variant="eco" className="px-4 py-2">
                  Zero Chimica
                </Badge>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ── Company Story ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/chi-siamo/approccio.jpg')",
            }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-leaf-500/40 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <SlideUp>
            <Badge
              variant="eco"
              className="mb-8 bg-white/5 border-white/10 text-leaf-300"
            >
              <TreePine className="w-3 h-3 mr-1.5 inline" />
              La nostra storia
            </Badge>
            <h2 className="font-display text-3xl md:text-5xl text-paper-50 leading-tight mb-8">
              Un giardino non e un lavoro da finire.
              <span className="block italic text-leaf-400 mt-2">
                E un equilibrio da costruire.
              </span>
            </h2>
          </SlideUp>

          <SlideUp delay={0.15}>
            <div className="font-body text-lg md:text-xl text-paper-300/90 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                Visione Sostenibile nasce dall&apos;ascolto: delle persone, dei
                luoghi, della natura che cambia. Fondata da{" "}
                <strong className="text-paper-100">{siteConfig.founder}</strong>{" "}
                a {siteConfig.address.city}, e cresciuta intorno a
                un&apos;idea semplice: il verde che funziona davvero e quello
                che rispetta i cicli naturali.
              </p>
              <p>
                Il metodo biodinamico non e solo una tecnica: e una visione.
                Significa costruire terreni vivi, scegliere piante adatte al
                territorio, eliminare la chimica e progettare giardini che
                migliorano con il tempo invece di degradare.
              </p>
              <p>
                Oggi collaboriamo con un&apos;equipe multidisciplinare di
                specialisti \u2014 dal tree climbing alla fitoiatria,
                dall&apos;illuminazione all&apos;ingegneria naturalistica \u2014
                per offrire un servizio chiavi in mano con un unico referente.
              </p>
            </div>
          </SlideUp>

          {/* Stats inline */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <SlideUp key={stat.label} delay={0.2 + index * 0.08}>
                <div className="text-center">
                  <p className="font-display text-4xl md:text-5xl font-light text-leaf-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs uppercase tracking-widest text-paper-400">
                    {stat.label}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 Pillars / Values ────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 bg-paper-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-leaf-100/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-20">
              <span className="font-display italic text-leaf-600 text-lg">
                I nostri valori
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-4 leading-tight">
                Quattro pilastri per un verde
                <span className="italic text-leaf-700"> che dura</span>
              </h2>
              <p className="mt-6 text-lg text-forest-800 max-w-2xl mx-auto font-body">
                Ogni progetto Visione Sostenibile si fonda su principi precisi.
                Non slogan: metodo.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, index) => (
                <StaggerItem key={pillar.title} delay={index * 0.1}>
                  <Card
                    variant="default"
                    className="h-full text-center bg-white border-paper-300 hover:shadow-medium transition-shadow duration-500"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-leaf-100 flex items-center justify-center mx-auto mb-6">
                        <pillar.icon className="w-8 h-8 text-leaf-700" />
                      </div>
                      <h3 className="font-display text-2xl text-forest-950 mb-1">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-sm text-leaf-600 uppercase tracking-wider mb-4">
                        {pillar.subtitle}
                      </p>
                      <p className="font-body text-forest-800/70 leading-relaxed">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Outcomes: What Clients Gain ────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-leaf-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideUp>
              <span className="font-display italic text-leaf-600 text-lg">
                Il risultato per te
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950 mt-4 mb-6 leading-tight">
                Cosa cambia scegliendo
                <span className="block italic text-leaf-700">
                  un approccio biodinamico?
                </span>
              </h2>
              <p className="font-body text-lg text-forest-800 leading-relaxed mb-4">
                Non facciamo giardini Instagram. Facciamo giardini che superano
                agosto, che richiedono meno manutenzione e che diventano piu
                belli anno dopo anno.
              </p>
              <p className="font-body text-lg text-forest-800 leading-relaxed">
                Scelte spiegate, un referente unico, una squadra su misura: il
                tuo giardino e un investimento che cresce.
              </p>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {outcomes.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white border border-leaf-200 rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-leaf-700" />
                    </div>
                    <h4 className="font-display text-lg text-forest-950 mb-2">
                      {item.label}
                    </h4>
                    <p className="font-body text-sm text-forest-800/70 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ── Team Section ──────────────────────────────────────────── */}
      <TeamSection />

      {/* ── CTA Section ───────────────────────────────────────────── */}
      <section className="py-28 md:py-36 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-leaf-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-leaf-100/50 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SlideUp>
            <span className="font-display italic text-leaf-600 text-lg">
              Inizia da qui
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-4 mb-8 leading-tight">
              Bello. Sostenibile. Gestibile.
              <span className="block italic text-leaf-700">
                Un referente, un metodo, una squadra su misura.
              </span>
            </h2>
            <div className="font-body text-lg text-forest-800 leading-relaxed max-w-2xl mx-auto space-y-4 mb-10">
              <p>
                Crediamo in giardini belli, si \u2014 ma soprattutto{" "}
                <strong>stabili, gestibili e capaci di durare</strong>.
              </p>
              <p>
                Ogni scelta ha un motivo:{" "}
                <strong>spieghiamo il perche</strong>, valutiamo alternative,
                costruiamo consapevolezza.
              </p>
              <p>
                Perche il futuro del verde non e una moda: e{" "}
                <strong>cura, metodo e responsabilita</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8 py-4 text-lg tracking-wide"
                >
                  Richiedi un sopralluogo
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Button>
              </Link>
              <Link href="/servizi">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-forest-700 text-forest-900 hover:bg-paper-300 px-8 py-4 text-lg tracking-wide"
                >
                  Scopri i servizi
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
