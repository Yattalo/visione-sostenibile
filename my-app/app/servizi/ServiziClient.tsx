"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Leaf, Sparkles } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { QuizCTA } from "../components/QuizCTA";
import { ReviewsWidget } from "../components/ReviewsWidget";
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

/* ── Benefit-driven outcome copy per service ──────────────── */

const serviceOutcomes: Record<string, string> = {
  "progettazione-giardini":
    "Ottieni un progetto chiaro e realizzabile che riduce errori in cantiere e abbassa i costi di manutenzione nel tempo.",
  "realizzazione-giardini":
    "Un unico referente dalla preparazione del terreno alla consegna: tempi certi, qualita controllata, spazio pronto da vivere.",
  "scelta-piante":
    "Piante selezionate per il tuo territorio che prosperano naturalmente, riducendo irrigazione e interventi straordinari.",
  "trattamenti-piante":
    "Piante piu sane e resistenti grazie a interventi biologici mirati che prevengono i problemi prima che si manifestino.",
  "impianti-irrigazione":
    "Consumi idrici ridotti fino al 40% con un sistema su misura che mantiene il verde rigoglioso in automatico.",
  "camminamenti-pietra":
    "Percorsi e muretti in materiali naturali che valorizzano il giardino e durano nel tempo senza manutenzione invasiva.",
  "illuminazione-esterni":
    "Spazi verdi vivibili anche di sera con soluzioni a basso consumo che esaltano la bellezza del giardino.",
  "ingegneria-naturalistica":
    "Terreni consolidati e pendii stabilizzati con tecniche naturali che proteggono il paesaggio e prevengono il dissesto.",
  "arredamento-esterni":
    "Arredi sostenibili che trasformano il giardino in un vero ambiente da vivere, funzionale e accogliente tutto l'anno.",
  potature:
    "Chiome equilibrate e rami sicuri grazie a potature tecniche che rispettano la fisiologia della pianta.",
  "rigenerazione-terreni":
    "Suolo rigenerato e fertile che sostiene un ecosistema autonomo, riducendo trattamenti chimici anno dopo anno.",
  manutenzioni:
    "Verde sempre curato con un piano stagionale che previene le emergenze e tiene sotto controllo i costi.",
};

export function ServiziClient() {
  const siteUrl = siteConfig.siteUrl;
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

      {/* ── Hero Section ── */}
      <section className="relative flex items-center justify-center overflow-hidden bg-forest-950 py-32 md:py-40 lg:py-48">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-leaf-900/30 via-forest-950 to-forest-950" />
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-sun-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-leaf-500/15 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <FadeIn>
            <Badge className="mb-6 border-leaf-500/30 bg-leaf-500/10 text-leaf-300">
              <Leaf className="mr-1.5 h-3.5 w-3.5" />
              12 servizi professionali
            </Badge>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-4xl font-light leading-tight text-paper-50 md:text-5xl lg:text-6xl">
              I Nostri Servizi
            </h1>
          </SlideUp>

          <SlideUp delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper-300 md:text-xl">
              Ogni servizio e progettato per darti un risultato concreto: meno
              sprechi, piu valore e un verde che funziona davvero nel tempo.
            </p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="border-0 bg-sun-400 px-8 py-4 text-forest-950 hover:bg-sun-500"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Richiedi un Preventivo
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const slug = normalizeServiceSlug(service.slug);
                const image = getImageForService(service.slug);
                const outcome =
                  serviceOutcomes[slug] || service.shortDescription;

                return (
                  <StaggerItem key={service._id} delay={0.05}>
                    <Link
                      href={`/servizi/${slug}`}
                      className="group block h-full"
                    >
                      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-paper-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-leaf-500/30 hover:shadow-medium">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={image}
                            alt={service.title}
                            width={630}
                            height={394}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />

                          {/* Index number */}
                          <span className="absolute left-5 top-4 select-none font-display text-4xl font-light leading-none text-paper-50/25">
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-display text-xl leading-tight text-forest-950 transition-colors duration-300 group-hover:text-leaf-700">
                            {service.title}
                          </h3>

                          <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-forest-800/70">
                            {outcome}
                          </p>

                          {/* CTA */}
                          <div className="mt-6 flex items-center justify-between border-t border-paper-100 pt-5">
                            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-800/50 transition-colors duration-300 group-hover:text-sun-500">
                              Scopri di piu
                            </span>
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sun-400 text-forest-950 transition-all duration-300 group-hover:bg-sun-500 group-hover:shadow-md">
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Quiz CTA ── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <QuizCTA variant="inline" />
        </div>
      </section>

      {/* ── Reviews ── */}
      <ReviewsWidget />

      {/* ── Bottom CTA ── */}
      <section className="relative overflow-hidden bg-forest-950 px-6 py-20 lg:px-8 lg:py-28">
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-leaf-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sun-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <SlideUp>
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-sun-400/60" />
            <h2 className="font-display text-4xl font-light leading-tight text-paper-50 md:text-5xl lg:text-6xl">
              Non sai da dove partire?
              <span className="block italic text-leaf-400">
                Parti dal Check-up Sostenibile
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-lg text-paper-300/70">
              In 60-90 minuti ti lasciamo 3 priorita, 3 errori da evitare e un
              piano in step.
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="border-0 bg-sun-400 px-8 py-4 text-lg text-forest-950 hover:bg-sun-500"
                >
                  Prenota il Check-up
                </Button>
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
