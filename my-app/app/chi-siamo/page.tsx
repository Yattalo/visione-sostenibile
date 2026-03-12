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
import { BLUR_DATA_URL } from "../lib/image-utils";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.chiSiamo.title,
    description: pageSeo.chiSiamo.description,
    path: "/chi-siamo",
    image: "/images/chi-siamo/hero.webp",
  }),
};

/* ── Data ────────────────────────────────────────────────────────────── */

const pillars = [
  {
    icon: Leaf,
    title: "Sostenibile",
    subtitle: "NON È UNA MODA",
    description:
      "È una strategia. Un giardino sostenibile è progettato per ridurre sprechi e interventi inutili, gestire meglio l'acqua, favorire equilibrio e biodiversità, durare nel tempo con costi più controllabili. La sostenibilità, però, è anche gestione. Interventi mirati, prevenzione, calendario stagionale: il verde resta un valore, non si trasforma in un problema.",
  },
  {
    icon: TreePine,
    title: "Approccio naturale",
    subtitle: "IN CONDIZIONI NORMALI",
    description:
      "Nessun prodotto fitosanitario perché l'approccio biodinamico parte dal presupposto che il terreno sia un organo vivente che, in una condizione di massima salute, deve risultare soffice, fertile e ricco di microrganismi e sostanza organica. In un terreno ricco di vita viene favorita la crescita naturale delle piante. Laddove per cause maggiori il terreno necessiti di un intervento più invasivo, ci avvaliamo di agronomi di fiducia che mettono a disposizione la propria esperienza professionale affinché il trattamento sia regolamentato e sicuro.",
  },
  {
    icon: Award,
    title: "Visione armonica",
    subtitle: "COLLABORAZIONE COME EVOLUZIONE",
    description:
      "Un solo interlocutore per ottimizzare tempi, scelte e budget: azzeramento del problema rimbalzi tra i fornitori, potenziamento della comunicazione interna organizzata, coordinamento puntuale delle diverse competenze verticali coinvolte nel progetto. Ogni imprevisto viene preso in carico con la massima tempestività e con l’esperto che può risolvere davvero il problema. Il nostro obiettivo è far fede all’impegno che nulla è mai lasciato al caso, è il nostro modo per dimostrare la cura e la responsabilità con cui lavoriamo.",
  },
  {
    icon: Heart,
    title: "Passione",
    subtitle: "PER GLI SPAZI VERDI",
    description:
      "Formazione continua, confronto con specialisti e attenzione ai dettagli. Per noi, un giardino non è un lavoro da finire, ma è un equilibrio da costruire, con cura e responsabilità.",
  },
];

const founderBio = [
  "“Una ventina di anni fa ho iniziato a capire che qualcosa nel clima non funzionava più come doveva, che i cibi di cui ci nutriamo quotidianamente non avevano più le caratteristiche nutrizionali di qualche decennio prima. Ho iniziato a preoccuparmi dello sfruttamento del suolo, della non corretta gestione delle lavorazioni e dello spropositato utilizzo di prodotti fito sanitari che causano la sterilità dei terreni e l’avanzamento della desertificazione. Ho intrapreso così la strada della sostenibilità, un cammino lungo che ancora oggi non smette di insegnarmi sempre qualcosa e di stupirmi.”",
  "Visione Sostenibile lavora in ascolto: delle persone, degli spazi e di ciò che la natura sta dicendo oggi.",
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
    label: "Equilibrio degli elementi",
    detail: "Si basa sull'armonizzazione dei quattro elementi aristotelici (terra, acqua, aria, fuoco), calibrando irrigazione, temperatura, illuminazione e fertilità del suolo per ottimizzare la crescita delle piante.",
  },
  {
    icon: Bug,
    label: "Calendario lunare",
    detail: "Le attività come semine, trapianti e potature seguono un calendario biodinamico influenzato da fasi lunari e posizioni astrali, adattandosi annualmente ai movimenti celesti per massimizzare i risultati.",
  },
  {
    icon: Flower2,
    label: "Preparati specifici",
    detail: "Si utilizzano preparati naturali (es. cornoletame o cornosilice) per vitalizzare il suolo e le piante, rigenerando la fertilità senza chimici e promuovendo un terreno come organismo vivente.",
  },
  {
    icon: Sparkles,
    label: "Promozione biodiversità",
    detail: "Favorisce policolture, rotazioni, consociazioni e aree rifugio (almeno 10% del terreno), vietando pesticidi sintetici e creando un ecosistema autosufficiente con piante, animali e insetti utili.",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-paper-50">
      {/* ── Hero Section ──────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src="/images/chi-siamo/hero.webp"
              alt="Giardino biodinamico Visione Sostenibile"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950/60 via-forest-900/40 to-forest-950/50" />
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
            <h1 className="text-stitch-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 text-balance">
              IL GIARDINIERE CHE TI SPIEGA I
              <span className="block text-paper-200 mt-2">PERCHÉ</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-paper-300 max-w-3xl mx-auto leading-relaxed">
              Visione Sostenibile nasce dalla mente appassionata, curiosa, in continua ricerca di Andrea Giordano che, grazie alle partnership consolidate nel tempo, si presenta come unico referente che coordina le diverse competenze verticali dei membri del team.
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
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-leaf-200/40 rounded-[30px]" />
                <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden shadow-floating">
                  <Image
                    src="/images/chi-siamo/andrea.webp"
                    alt="Andrea Giordano, fondatore di Visione Sostenibile, giardiniere biodinamico a Torino"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <h2 className="text-stitch-heading text-3xl md:text-4xl text-forest-950 mt-2 mb-4">
                ANDREA GIORDANO
              </h2>
              <p className="font-display italic text-leaf-700 text-xl mb-8">
                Passione, Ricerca, Visione
              </p>
              <div className="space-y-5 font-body text-forest-800">
                {founderBio.map((paragraph, index) => (
                  <p key={index} className={`text-lg leading-relaxed ${index === 0 ? "italic" : ""}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ── Company Story ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/chi-siamo/approccio.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
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
              Visione
            </Badge>
            <h2 className="text-stitch-heading text-3xl md:text-5xl text-paper-50 mb-8">
              VISIONE SOSTENIBILE NASCE DALL’
              <em className="italic font-normal text-leaf-400">Ascolto</em>
            </h2>
          </SlideUp>

          <SlideUp delay={0.15}>
            <div className="font-body text-lg md:text-xl text-paper-300/90 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                Visione Sostenibile nasce dall&apos;ascolto delle persone, dei luoghi, della natura che cambia, ed è cresciuta attorno a un&apos;idea semplice: il verde che funziona davvero e quello che rispetta i cicli naturali.
              </p>
              <p>
                Il metodo biodinamico si impegna a costruire terreni vivi, scegliere piante adatte al territorio, eliminare la chimica e progettare giardini che migliorano con il tempo in modo naturale.
              </p>
              <p>
                Visione Sostenibile è un team multidisciplinare di specialisti che lavorano in sinergia per offrire un servizio completo e sicuro da tutti i punti di vista.
              </p>
              <p>
                Inoltre, grazie alla direzione di un referente unico si ottimizzano tempi, costi e risultati.
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
      <section className="py-24 lg:py-32 px-6 bg-paper-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-leaf-100/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-20">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
                Cosa ci guida
              </span>
              <h2 className="text-stitch-heading text-3xl md:text-4xl lg:text-5xl text-forest-950 mt-4">
                QUATTRO PILASTRI PER UN VERDE CHE{" "}
                <em className="italic font-normal text-leaf-600">Vive</em>
              </h2>
              <p className="mt-6 text-lg text-forest-800 max-w-2xl mx-auto font-body">
                Il metodo di Visione Sostenibile è la garanzia migliore
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar, index) => (
                <StaggerItem key={pillar.title} delay={index * 0.1}>
                  <Card
                    variant="default"
                    className="h-full text-center border border-paper-100 bg-paper-50 hover:border-leaf-200 hover:shadow-soft hover:-translate-y-1.5 hover:shadow-floating transition-all duration-300"
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
      <section className="py-24 lg:py-32 px-6 bg-leaf-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideUp>
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
                Il risultato per te
              </span>
              <h2 className="text-stitch-heading text-3xl md:text-4xl text-forest-950 mt-4 mb-6">
                COSA CAMBIA SCEGLIENDO UN APPROCCIO{" "}
                <em className="italic font-normal text-leaf-600">Biodinamico</em>
              </h2>
              <p className="font-body text-lg text-forest-800 leading-relaxed mb-4">
                Scegliere un approccio biodinamico per la gestione del giardino o dell’orto implica una visione olistica che va oltre il biologico, integrando ritmi cosmici e naturali per un ecosistema più equilibrato.
              </p>
              <p className="font-body text-lg text-forest-800 leading-relaxed">
                La bellezza di un giardino o orto biodinamico risiede nella sua armonia naturale: siepi, fiori e consociazioni attirano insetti utili generando un ambiente colorato, resiliente e autosufficiente privo di chimica.
              </p>
              <p className="font-body text-lg text-forest-800 leading-relaxed">
                Un orto biodinamico produce piante sane, nutrienti e gustose con suolo vivo popolato da microorganismi.
              </p>
            </SlideUp>

            <SlideUp delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {outcomes.map((item) => (
                  <div
                    key={item.label}
                    className="border border-paper-100 bg-paper-50 rounded-[30px] p-6 transition-all duration-300 hover:border-leaf-200 hover:shadow-soft hover:-translate-y-1.5 hover:shadow-floating"
                  >
                    <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-leaf-700" />
                    </div>
                    <h3 className="font-display text-lg text-forest-950 mb-2">
                      {item.label}
                    </h3>
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
      <section className="py-24 lg:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-leaf-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-leaf-100/50 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <SlideUp>
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
              Inizia da qui
            </span>
            <h2 className="text-stitch-heading text-3xl md:text-4xl lg:text-5xl text-forest-950 mt-4 mb-8">
              BELLO.{" "}
              <em className="italic font-normal text-leaf-600">Sostenibile.</em>{" "}
              GESTIBILE.
              <span className="block mt-2">
                UN REFERENTE, UN METODO, UNA SQUADRA SU MISURA
              </span>
            </h2>
            <div className="font-body text-lg text-forest-800 leading-relaxed max-w-2xl mx-auto space-y-4 mb-10">
              <p>
                Giardini belli, stabili, gestibili e capaci di durare.
              </p>
              <p>
                Ogni scelta parte da presupposti di salute del suolo e delle piante che lo vivono. Ti spieghiamo il perché e valutiamo insieme le alternative possibili.
              </p>
              <p>
                Il futuro del verde, per noi, è cura, metodo e responsabilità.
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
