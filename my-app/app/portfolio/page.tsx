"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Ruler,
  Phone,
  Filter,
  X,
  Leaf,
} from "lucide-react";
import {
  getProjectsWithPhotos,
  getProjectsWithoutPhotos,
  getAllTags,
  formatTag,
} from "../lib/portfolio-data";
import type { PortfolioProject } from "../lib/portfolio-data";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";
import { cn } from "../lib/utils";

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="relative bg-white rounded-2xl overflow-hidden border border-cream-200 shadow-soft hover:shadow-floating transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.hero_alt || project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-cream-200 flex items-center justify-center">
              <Leaf className="w-12 h-12 text-cream-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Photo count badge */}
          {project.photo_count > 0 && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-sans tracking-wide text-charcoal-700">
              {project.photo_count} foto
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-charcoal-700" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-display text-xl text-charcoal-800 group-hover:text-terracotta-600 transition-colors leading-tight">
              {project.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-500 mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
              {project.location}
            </span>
            {project.area_mq && (
              <span className="flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-moss-500" />
                {project.area_mq.toLocaleString("it-IT")} mq
              </span>
            )}
          </div>

          <p className="font-sans text-xs uppercase tracking-widest text-moss-600">
            {project.type}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}

function TextProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div className="flex items-start gap-4 py-4 border-b border-cream-200 last:border-0 group-hover:bg-cream-50/50 -mx-4 px-4 rounded-lg transition-colors">
        <div className="w-10 h-10 rounded-xl bg-moss-100 flex items-center justify-center flex-shrink-0 group-hover:bg-moss-200 transition-colors">
          <Leaf className="w-5 h-5 text-moss-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-charcoal-800 group-hover:text-terracotta-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-charcoal-500 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {project.location}
            </span>
            {project.area_mq && (
              <span>{project.area_mq.toLocaleString("it-IT")} mq</span>
            )}
            <span className="text-moss-600">{project.type}</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-charcoal-300 group-hover:text-terracotta-500 transition-colors mt-2 flex-shrink-0" />
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  const projectsWithPhotos = getProjectsWithPhotos();
  const projectsWithoutPhotos = getProjectsWithoutPhotos();
  const allTags = getAllTags();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = activeTag
    ? projectsWithPhotos.filter((p) => p.tags.includes(activeTag))
    : projectsWithPhotos;

  const filteredTextProjects = activeTag
    ? projectsWithoutPhotos.filter((p) => p.tags.includes(activeTag))
    : projectsWithoutPhotos;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-moss-900 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          {projectsWithPhotos[0]?.hero_image && (
            <Image
              src={projectsWithPhotos[0].hero_image}
              alt="Portfolio Visione Sostenibile"
              fill
              className="object-cover opacity-20"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-moss-500/20 rounded-full blur-3xl animate-drift" />

        {/* Thin accent line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-cream-200 px-4 py-1.5 text-xs tracking-widest uppercase mb-8">
              I Nostri Progetti
            </Badge>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream-50 leading-tight max-w-4xl mb-8">
              Portfolio
              <span className="block italic text-terracotta-300">
                realizzazioni
              </span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-cream-200/80 max-w-2xl leading-relaxed mb-8">
              Ogni progetto racconta una storia unica. Scopri le nostre
              realizzazioni in Piemonte e Lombardia: parchi, giardini e spazi
              verdi progettati con passione e competenza.
            </p>
          </SlideUp>

          <SlideUp delay={0.4}>
            <div className="flex items-center gap-8 text-cream-300/70">
              <div>
                <span className="font-display text-3xl text-terracotta-300">
                  {projectsWithPhotos.length + projectsWithoutPhotos.length}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest ml-2">
                  Progetti
                </span>
              </div>
              <div className="w-px h-8 bg-cream-600" />
              <div>
                <span className="font-display text-3xl text-terracotta-300">2</span>
                <span className="font-sans text-xs uppercase tracking-widest ml-2">
                  Regioni
                </span>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.5}>
            <div className="mt-16">
              <div className="w-px h-16 bg-gradient-to-b from-cream-300/50 to-transparent mx-0" />
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TAG FILTERS
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-8 border-b border-cream-200 bg-white/80 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm transition-all",
                showFilters || activeTag
                  ? "bg-moss-700 text-white"
                  : "bg-cream-100 text-charcoal-600 hover:bg-cream-200"
              )}
            >
              <Filter className="w-4 h-4" />
              Filtra
              {activeTag && (
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  1
                </span>
              )}
            </button>

            {activeTag && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setActiveTag(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-terracotta-50 text-terracotta-700 text-sm font-sans hover:bg-terracotta-100 transition-colors"
              >
                {formatTag(activeTag)}
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}

            <span className="font-body text-sm text-charcoal-400 ml-auto">
              {filteredProjects.length + filteredTextProjects.length} progett{filteredProjects.length + filteredTextProjects.length === 1 ? "o" : "i"}
            </span>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-4">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setActiveTag(activeTag === tag ? null : tag);
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-sans transition-all",
                        activeTag === tag
                          ? "bg-moss-700 text-white"
                          : "bg-cream-100 text-charcoal-600 hover:bg-cream-200"
                      )}
                    >
                      {formatTag(tag)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROJECTS GRID
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-moss-900/5 to-transparent" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-terracotta-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-moss-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SlideUp>
            <div className="max-w-2xl mb-12 lg:mb-16">
              <span className="font-display italic text-terracotta-600 text-lg">
                Le nostre realizzazioni
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 mt-3 leading-tight">
                Progetti completati con{" "}
                <span className="text-moss-700">documentazione fotografica</span>
              </h2>
              <div className="w-16 h-px bg-terracotta-400 mt-6" />
            </div>
          </SlideUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag || "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Leaf className="w-12 h-12 text-cream-300 mx-auto mb-4" />
                  <p className="font-body text-charcoal-500">
                    Nessun progetto fotografato per questo filtro.
                  </p>
                  <button
                    onClick={() => setActiveTag(null)}
                    className="mt-4 font-sans text-sm text-terracotta-600 hover:text-terracotta-700 underline"
                  >
                    Rimuovi filtro
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TEXT-ONLY PROJECTS
      ═══════════════════════════════════════════════════ */}
      {filteredTextProjects.length > 0 && (
        <section className="relative py-16 lg:py-24 bg-cream-100 overflow-hidden">
          <div className="absolute inset-0 bg-organic-noise" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream-400 to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
            <SlideUp>
              <div className="mb-10">
                <span className="font-display italic text-terracotta-600 text-lg">
                  Altre realizzazioni
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-charcoal-800 mt-3 leading-tight">
                  Progetti in{" "}
                  <span className="italic text-moss-700">fase di documentazione</span>
                </h2>
                <p className="font-body text-charcoal-500 mt-4">
                  Questi progetti sono stati completati con successo e saranno
                  presto documentati con reportage fotografico professionale.
                </p>
              </div>
            </SlideUp>

            <StaggerContainer delay={0.1}>
              <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-soft">
                {filteredTextProjects.map((project) => (
                  <StaggerItem key={project.slug}>
                    <TextProjectCard project={project} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 bg-moss-900 text-cream-50 overflow-hidden">
        <div className="absolute inset-0">
          {projectsWithPhotos[4]?.hero_image && (
            <Image
              src={projectsWithPhotos[4].hero_image}
              alt=""
              fill
              className="object-cover opacity-10"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-moss-900 via-moss-800/90 to-moss-900" />
        </div>

        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-moss-500/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta-500/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SlideUp>
            <span className="font-display italic text-terracotta-300 text-lg">
              Il tuo progetto
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-cream-50 mt-4 mb-6 leading-tight">
              Vuoi realizzare il tuo
              <span className="block italic text-terracotta-300">
                spazio verde?
              </span>
            </h2>
            <p className="font-body text-lg text-cream-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ogni progetto inizia da un incontro. Raccontaci la tua visione e
              insieme la trasformeremo in realta.
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
