"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Ruler,
  Phone,
  Filter,
  X,
  Leaf,
  Map,
  Layers,
  Tag,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "../components/ui/Button";
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";
import { cn } from "../lib/utils";
import { progettiProjects as staticProjects } from "../lib/progetti-data";

function formatTag(tag: string): string {
  return tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface Project {
  slug: string;
  title: string;
  location: string;
  region: string;
  area_mq?: number | null;
  type: string;
  tags: string[];
  has_photos: boolean;
  hero_image?: string | null;
  hero_alt?: string;
  thumbnail?: string | null;
  photo_count: number;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

function TextProjectCard({ project }: { project: Project }) {
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

/* ─── Filter pill component ─── */

function FilterPill({
  label,
  isActive,
  onClick,
  count,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-full text-sm font-sans transition-all inline-flex items-center gap-1.5",
        isActive
          ? "bg-leaf-700 text-white shadow-sm"
          : "bg-paper-100 text-forest-800 hover:bg-paper-300"
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center leading-none",
            isActive ? "bg-white/20" : "bg-paper-300/80"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ─── Active filter chip ─── */

function ActiveFilterChip({
  label,
  categoryIcon,
  onRemove,
}: {
  label: string;
  categoryIcon: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onClick={onRemove}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-leaf-50 text-leaf-700 text-sm font-sans hover:bg-leaf-100 transition-colors"
    >
      {categoryIcon}
      {label}
      <X className="w-3.5 h-3.5" />
    </motion.button>
  );
}

export default function ProgettiPage() {
  const convexProjects = useQuery(api.projects.getAll);
  const allProjects = convexProjects ?? staticProjects;
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const projectsWithPhotos = useMemo(() => {
    return allProjects.filter((p) => p.has_photos);
  }, [allProjects]);

  const projectsWithoutPhotos = useMemo(() => {
    return allProjects.filter((p) => !p.has_photos);
  }, [allProjects]);

  /* ─── Extract unique values for each filter dimension ─── */

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const project of allProjects) {
      for (const tag of project.tags) {
        tags.add(tag);
      }
    }
    return Array.from(tags).sort();
  }, [allProjects]);

  const allRegions = useMemo(() => {
    const regions = new Set<string>();
    for (const project of allProjects) {
      if (project.region) {
        regions.add(project.region);
      }
    }
    return Array.from(regions).sort();
  }, [allProjects]);

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    for (const project of allProjects) {
      if (project.type) {
        types.add(project.type);
      }
    }
    return Array.from(types).sort();
  }, [allProjects]);

  /* ─── Count active filters ─── */

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeTag) count++;
    if (activeRegion) count++;
    if (activeType) count++;
    return count;
  }, [activeTag, activeRegion, activeType]);

  /* ─── Apply all filters simultaneously ─── */

  function matchesFilters(project: Project): boolean {
    if (activeTag && !project.tags.includes(activeTag)) return false;
    if (activeRegion && project.region !== activeRegion) return false;
    if (activeType && project.type !== activeType) return false;
    return true;
  }

  const filteredProjects = useMemo(
    () => projectsWithPhotos.filter(matchesFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectsWithPhotos, activeTag, activeRegion, activeType]
  );

  const filteredTextProjects = useMemo(
    () => projectsWithoutPhotos.filter(matchesFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectsWithoutPhotos, activeTag, activeRegion, activeType]
  );

  /* ─── Count projects per filter value (for badges) ─── */

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const region of allRegions) {
      counts[region] = allProjects.filter(
        (p) =>
          p.region === region &&
          (!activeTag || p.tags.includes(activeTag)) &&
          (!activeType || p.type === activeType)
      ).length;
    }
    return counts;
  }, [allProjects, allRegions, activeTag, activeType]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const type of allTypes) {
      counts[type] = allProjects.filter(
        (p) =>
          p.type === type &&
          (!activeTag || p.tags.includes(activeTag)) &&
          (!activeRegion || p.region === activeRegion)
      ).length;
    }
    return counts;
  }, [allProjects, allTypes, activeTag, activeRegion]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const tag of allTags) {
      counts[tag] = allProjects.filter(
        (p) =>
          p.tags.includes(tag) &&
          (!activeRegion || p.region === activeRegion) &&
          (!activeType || p.type === activeType)
      ).length;
    }
    return counts;
  }, [allProjects, allTags, activeRegion, activeType]);

  function clearAllFilters() {
    setActiveTag(null);
    setActiveRegion(null);
    setActiveType(null);
  }

  return (
    <div className="min-h-screen bg-paper-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative h-[70vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-forest-950">
        <div className="absolute inset-0">
          {projectsWithPhotos[0]?.hero_image && (
            <Image
              src={projectsWithPhotos[0].hero_image}
              alt="Progetti Visione Sostenibile"
              fill
              className="object-cover opacity-38"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/48 via-forest-900/30 to-forest-950/40" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-leaf-500/20 rounded-full blur-3xl animate-drift" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 md:pt-24 text-center">
          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-paper-50 leading-tight mb-8 text-balance">
              I progetti che ci rendono
              <span className="block italic text-leaf-400">orgogliosi</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.1}>
            <p className="font-body text-lg md:text-xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
              La bellezza è la naturale conseguenza di un progetto ben realizzato. Ogni intervento nasce da un bisogno reale: analisi, ascolto e decisioni che si apprezzano subito e reggono nel tempo.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FILTERS
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-8 border-b border-paper-300 bg-paper-50/80 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filter bar top row */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm transition-all",
                showFilters || activeFilterCount > 0
                  ? "bg-leaf-700 text-white"
                  : "bg-paper-100 text-forest-800 hover:bg-paper-300"
              )}
            >
              <Filter className="w-4 h-4" />
              Filtra
              {activeFilterCount > 0 && (
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Active filter chips */}
            <AnimatePresence>
              {activeRegion && (
                <ActiveFilterChip
                  key={`region-${activeRegion}`}
                  label={activeRegion}
                  categoryIcon={<Map className="w-3 h-3" />}
                  onRemove={() => setActiveRegion(null)}
                />
              )}
              {activeType && (
                <ActiveFilterChip
                  key={`type-${activeType}`}
                  label={activeType}
                  categoryIcon={<Layers className="w-3 h-3" />}
                  onRemove={() => setActiveType(null)}
                />
              )}
              {activeTag && (
                <ActiveFilterChip
                  key={`tag-${activeTag}`}
                  label={formatTag(activeTag)}
                  categoryIcon={<Tag className="w-3 h-3" />}
                  onRemove={() => setActiveTag(null)}
                />
              )}
            </AnimatePresence>

            {activeFilterCount > 1 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={clearAllFilters}
                className="text-sm font-sans text-forest-800/60 hover:text-leaf-700 underline underline-offset-2 transition-colors"
              >
                Rimuovi tutti
              </motion.button>
            )}

            <span className="font-body text-sm text-forest-800/60 ml-auto">
              {filteredProjects.length + filteredTextProjects.length} progett{filteredProjects.length + filteredTextProjects.length === 1 ? "o" : "i"}
            </span>
          </div>

          {/* Expandable filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-5">
                  {/* Region filter */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Map className="w-3.5 h-3.5 text-leaf-600" />
                      <span className="font-sans text-xs uppercase tracking-widest text-forest-800/60">
                        Regione
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allRegions.map((region) => (
                        <FilterPill
                          key={region}
                          label={region}
                          isActive={activeRegion === region}
                          count={regionCounts[region]}
                          onClick={() =>
                            setActiveRegion(
                              activeRegion === region ? null : region
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Type filter */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Layers className="w-3.5 h-3.5 text-leaf-600" />
                      <span className="font-sans text-xs uppercase tracking-widest text-forest-800/60">
                        Tipologia
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTypes.map((type) => (
                        <FilterPill
                          key={type}
                          label={type}
                          isActive={activeType === type}
                          count={typeCounts[type]}
                          onClick={() =>
                            setActiveType(activeType === type ? null : type)
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tag filter */}
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Tag className="w-3.5 h-3.5 text-leaf-600" />
                      <span className="font-sans text-xs uppercase tracking-widest text-forest-800/60">
                        Caratteristiche
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <FilterPill
                          key={tag}
                          label={formatTag(tag)}
                          isActive={activeTag === tag}
                          count={tagCounts[tag]}
                          onClick={() =>
                            setActiveTag(activeTag === tag ? null : tag)
                          }
                        />
                      ))}
                    </div>
                  </div>
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
              key={`${activeTag}-${activeRegion}-${activeType}`}
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
                    Nessun progetto fotografato per questi filtri.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 font-sans text-sm text-leaf-600 hover:text-leaf-700 underline"
                  >
                    Rimuovi tutti i filtri
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
              Hai uno spazio che merita
              <span className="block italic text-leaf-400">
                di più?
              </span>
            </h2>
            <p className="font-body text-lg text-paper-300/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Ogni progetto inizia da un incontro. Raccontaci la tua visione e
              insieme la trasformeremo in realtà.
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
