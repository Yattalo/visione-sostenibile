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
} from "../lib/progetti-data";
import type { ProgettiProject } from "../lib/progetti-data";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";
import { cn } from "../lib/utils";

function ProjectCard({ project, index }: { project: ProgettiProject; index: number }) {
  return (
    <Link href={`/progetti/${project.slug}`} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="relative bg-white rounded-2xl overflow-hidden border border-paper-300 shadow-soft hover:shadow-floating transition-all duration-500"
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
            <div className="absolute inset-0 bg-paper-300 flex items-center justify-center">
              <Leaf className="w-12 h-12 text-paper-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Photo count badge */}
          {project.photo_count > 0 && (
            <div className="absolute top-4 right-4 bg-paper-50/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-sans tracking-wide text-forest-900">
              {project.photo_count} foto
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-paper-50/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-forest-900" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-display text-xl text-forest-950 group-hover:text-leaf-600 transition-colors leading-tight">
              {project.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-forest-800/70 mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-leaf-400" />
              {project.location}
            </span>
            {project.area_mq && (
              <span className="flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-leaf-500" />
                {project.area_mq.toLocaleString("it-IT")} mq
              </span>
            )}
          </div>

          <p className="font-sans text-xs uppercase tracking-widest text-leaf-600">
            {project.type}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}

function TextProjectCard({ project }: { project: ProgettiProject }) {
  return (
    <Link href={`/progetti/${project.slug}`} className="group block">
      <div className="flex items-start gap-4 py-4 border-b border-paper-300 last:border-0 group-hover:bg-paper-50/50 -mx-4 px-4 rounded-lg transition-colors">
        <div className="w-10 h-10 rounded-xl bg-leaf-100 flex items-center justify-center flex-shrink-0 group-hover:bg-leaf-200 transition-colors">
          <Leaf className="w-5 h-5 text-leaf-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-forest-950 group-hover:text-leaf-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-forest-800/70 mt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {project.location}
            </span>
            {project.area_mq && (
              <span>{project.area_mq.toLocaleString("it-IT")} mq</span>
            )}
            <span className="text-leaf-600">{project.type}</span>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-forest-700 group-hover:text-leaf-500 transition-colors mt-2 flex-shrink-0" />
      </div>
    </Link>
  );
}

export default function ProgettiPage() {
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
    <div className="min-h-screen bg-paper-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-forest-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          {projectsWithPhotos[0]?.hero_image && (
            <Image
              src={projectsWithPhotos[0].hero_image}
              alt="Progetti Visione Sostenibile"
              fill
              className="object-cover opacity-20"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-900/85 to-forest-950/90" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-leaf-500/20 rounded-full blur-3xl animate-drift" />

        {/* Thin accent line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-leaf-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 px-4 py-1.5 text-xs tracking-widest uppercase mb-8">
              I Nostri Progetti
            </Badge>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-paper-50 leading-tight max-w-4xl mb-8">
              Progetti
              <span className="block italic text-leaf-400">
                realizzazioni
              </span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-paper-300/80 max-w-2xl leading-relaxed mb-8">
              Ogni progetto racconta una storia unica. Scopri le nostre
              realizzazioni in Piemonte e Lombardia: parchi, giardini e spazi
              verdi progettati con passione e competenza.
            </p>
          </SlideUp>

          <SlideUp delay={0.4}>
            <div className="flex items-center gap-8 text-paper-400/70">
              <div>
                <span className="font-display text-3xl text-leaf-400">
                  {projectsWithPhotos.length + projectsWithoutPhotos.length}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest ml-2">
                  Progetti
                </span>
              </div>
              <div className="w-px h-8 bg-paper-600" />
              <div>
                <span className="font-display text-3xl text-leaf-400">2</span>
                <span className="font-sans text-xs uppercase tracking-widest ml-2">
                  Regioni
                </span>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.5}>
            <div className="mt-16">
              <div className="w-px h-16 bg-gradient-to-b from-paper-400/50 to-transparent mx-0" />
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          TAG FILTERS
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-8 border-b border-paper-300 bg-paper-50/80 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm transition-all",
                showFilters || activeTag
                  ? "bg-leaf-700 text-white"
                  : "bg-paper-100 text-forest-800 hover:bg-paper-300"
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-leaf-50 text-leaf-700 text-sm font-sans hover:bg-leaf-100 transition-colors"
              >
                {formatTag(activeTag)}
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}

            <span className="font-body text-sm text-forest-800/60 ml-auto">
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
                          ? "bg-leaf-700 text-white"
                          : "bg-paper-100 text-forest-800 hover:bg-paper-300"
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
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-forest-950/5 to-transparent" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-leaf-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-leaf-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SlideUp>
            <div className="max-w-2xl mb-12 lg:mb-16">
              <span className="font-display italic text-leaf-600 text-lg">
                Le nostre realizzazioni
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950 mt-3 leading-tight">
                Progetti completati con{" "}
                <span className="text-leaf-700">documentazione fotografica</span>
              </h2>
              <div className="w-16 h-px bg-leaf-400 mt-6" />
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
                  <Leaf className="w-12 h-12 text-paper-400 mx-auto mb-4" />
                  <p className="font-body text-forest-800/70">
                    Nessun progetto fotografato per questo filtro.
                  </p>
                  <button
                    onClick={() => setActiveTag(null)}
                    className="mt-4 font-sans text-sm text-leaf-600 hover:text-leaf-700 underline"
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
        <section className="relative py-16 lg:py-24 bg-paper-100 overflow-hidden">
          <div className="absolute inset-0 bg-organic-noise" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-paper-400 to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
            <SlideUp>
              <div className="mb-10">
                <span className="font-display italic text-leaf-600 text-lg">
                  Altre realizzazioni
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-forest-950 mt-3 leading-tight">
                  Progetti in{" "}
                  <span className="italic text-leaf-700">fase di documentazione</span>
                </h2>
                <p className="font-body text-forest-800/70 mt-4">
                  Questi progetti sono stati completati con successo e saranno
                  presto documentati con reportage fotografico professionale.
                </p>
              </div>
            </SlideUp>

            <StaggerContainer delay={0.1}>
              <div className="bg-white rounded-2xl p-6 border border-paper-300 shadow-soft">
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
      <section className="relative py-28 lg:py-36 bg-forest-950 text-paper-50 overflow-hidden">
        <div className="absolute inset-0">
          {projectsWithPhotos[4]?.hero_image && (
            <Image
              src={projectsWithPhotos[4].hero_image}
              alt=""
              fill
              className="object-cover opacity-10"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>

        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-sun-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-leaf-500/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-leaf-500/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <SlideUp>
            <span className="font-display italic text-leaf-400 text-lg">
              Il tuo progetto
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light text-paper-50 mt-4 mb-6 leading-tight">
              Vuoi realizzare il tuo
              <span className="block italic text-leaf-400">
                spazio verde?
              </span>
            </h2>
            <p className="font-body text-lg text-paper-300/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ogni progetto inizia da un incontro. Raccontaci la tua visione e
              insieme la trasformeremo in realta.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+393714821825">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-white border-0 px-8"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Chiama Ora
                </Button>
              </a>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-paper-400/30 text-paper-100 hover:bg-paper-100/10 hover:border-paper-400/50 px-8"
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
