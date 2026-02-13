import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Calendar } from "lucide-react";
import { portfolioProjects } from "../lib/portfolio";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Visione Sostenibile",
  description:
    "Scopri i nostri progetti realizzati: giardini biodinamici, terrazze verdi, recupero parchi storici. Ogni lavoro racconta una storia di sostenibilita e passione per il verde.",
};

export default function PortfolioPage() {
  const [featuredProject, ...remainingProjects] = portfolioProjects;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-moss-900 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-moss-500/20 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-500/5 rounded-full blur-3xl" />

        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-cream-200 mb-8 px-6 py-2 text-xs tracking-widest uppercase">
              Portfolio
            </Badge>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream-50 leading-tight max-w-4xl mb-8">
              I Nostri
              <span className="block italic text-terracotta-300">Progetti</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-cream-200/80 max-w-2xl leading-relaxed">
              Ogni giardino racconta una storia unica. Scopri come abbiamo
              trasformato spazi verdi in ecosistemi vivi e sostenibili.
            </p>
          </SlideUp>

          <SlideUp delay={0.5}>
            <div className="mt-16">
              <div className="w-px h-16 bg-gradient-to-b from-cream-300/50 to-transparent mx-0" />
            </div>
          </SlideUp>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-moss-900/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SlideUp>
            <Link
              href={`/portfolio/${featuredProject.slug}`}
              className="group block"
            >
              <Card variant="elevated" hover className="overflow-hidden p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <Image
                      src={featuredProject.coverImage}
                      alt={featuredProject.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <Badge variant="primary" size="sm">
                        {featuredProject.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="font-sans text-xs uppercase tracking-widest text-terracotta-500 mb-4">
                      Progetto in evidenza
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-charcoal-800 mb-4 leading-snug group-hover:text-moss-700 transition-colors duration-300">
                      {featuredProject.title}
                    </h2>
                    <p className="font-body text-charcoal-500 text-lg leading-relaxed mb-6 line-clamp-3">
                      {featuredProject.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-400 mb-8">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {featuredProject.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredProject.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(
                          featuredProject.completedAt
                        ).toLocaleDateString("it-IT", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-terracotta-600 group-hover:text-terracotta-700 transition-colors">
                      Scopri il progetto
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </SlideUp>

          {/* REMAINING PROJECTS */}
          <StaggerContainer delay={0.2} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingProjects.map((project, index) => (
                <StaggerItem key={project.slug} delay={index * 0.1}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block h-full"
                  >
                    <Card
                      variant="elevated"
                      hover
                      className="h-full overflow-hidden p-0"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="earth" size="sm">
                            {project.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6 lg:p-8">
                        <h2 className="font-display text-xl lg:text-2xl font-light text-charcoal-800 mb-3 leading-snug group-hover:text-moss-700 transition-colors duration-300 line-clamp-2">
                          {project.title}
                        </h2>
                        <p className="font-body text-charcoal-500 text-base leading-relaxed mb-5 line-clamp-3">
                          {project.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mb-5">
                          {project.services.slice(0, 3).map((service) => (
                            <Badge
                              key={service}
                              size="sm"
                              className="bg-moss-50 text-moss-700 border-moss-200"
                            >
                              {service}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-5 border-t border-cream-200">
                          <div className="flex items-center gap-4 text-xs text-charcoal-400">
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {project.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {project.duration}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-charcoal-300 group-hover:text-terracotta-500 transition-all duration-300 group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 bg-moss-900 text-cream-50 overflow-hidden">
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

        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta-500/40 to-transparent" />

        <SlideUp>
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <span className="font-display italic text-terracotta-300 text-lg">
              Il tuo prossimo progetto
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream-50 mt-4 mb-6 leading-tight">
              Vuoi trasformare il tuo
              <span className="block italic text-terracotta-300">
                spazio verde?
              </span>
            </h2>
            <p className="font-body text-lg text-cream-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ogni progetto inizia con una conversazione. Contattaci per
              raccontarci la tua visione e trasformarla in realta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contatti">
                <button className="inline-flex items-center justify-center bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-xl font-medium transition-colors">
                  Richiedi una Consulenza
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
              <Link href="/servizi">
                <button className="inline-flex items-center justify-center border border-cream-400/30 text-cream-100 hover:bg-cream-100/10 px-8 py-4 rounded-xl font-medium transition-colors">
                  Scopri i Servizi
                </button>
              </Link>
            </div>
          </div>
        </SlideUp>
      </section>
    </div>
  );
}
