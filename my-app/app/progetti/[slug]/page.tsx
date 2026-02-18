"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MapPin,
  Ruler,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Leaf,
  PenTool,
  Tag,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { cn } from "../../lib/utils";
import { Skeleton } from "../../components/ui/Skeleton";

/* ─── Lightbox Component ─── */

type Photo = {
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  type: "hero" | "gallery" | "render";
  dimensions?: string;
};

function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  const photo = photos[current];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-forest-950/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 font-sans text-sm text-white/70 tracking-wide">
        {current + 1} / {photos.length}
      </div>

      {/* Navigation */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Image */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption */}
      {photo.caption && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <p className="font-body text-white/80 text-center text-sm bg-forest-950/60 backdrop-blur-sm px-6 py-2 rounded-full">
            {photo.caption}
          </p>
        </div>
      )}
    </motion.div>,
    document.body
  );
}

/* ─── Animation variants ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

/* ─── Main Component ─── */

export default function ProgettiDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = useQuery(api.projects.getBySlug, { slug });
  const allProjects = useQuery(api.projects.getAll);
  
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<Array<{
    src: string;
    thumb: string;
    alt: string;
    caption: string;
    type: "hero" | "gallery" | "render";
    dimensions?: string;
  }>>([]);

  const { nextProject, prevProject } = useMemo(() => {
    if (!allProjects || !slug) return { nextProject: null, prevProject: null };
    const projectIndex = allProjects.findIndex((p) => p.slug === slug);
    const next = projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null;
    const prev = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
    return { nextProject: next, prevProject: prev };
  }, [allProjects, slug]);

  const openLightbox = (photos: typeof lightboxPhotos, index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
  };

  if (project === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-50">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-50">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-paper-300 flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-forest-800/60" />
          </div>
          <h1 className="font-display text-3xl text-forest-950 mb-4">
            Progetto non trovato
          </h1>
          <p className="font-body text-forest-800/70 mb-8">
            Il progetto che stai cercando non esiste o potrebbe essere stato
            rimosso.
          </p>
          <Link href="/progetti">
            <Button variant="secondary">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Torna al Progetti
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const galleryPhotos = project.photos.filter((p) => p.type === "gallery");
  const allViewablePhotos = [...project.photos];

  function formatTag(tag: string): string {
    return tag
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <div className="min-h-screen bg-paper-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-forest-950 pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* Background */}
        <div className="absolute inset-0">
          {project.hero_image ? (
            <Image
              src={project.hero_image}
              alt=""
              fill
              className="object-cover opacity-20"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-forest-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-900/85 to-forest-950/90" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-sun-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-leaf-500/15 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-leaf-400/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm mb-10 lg:mb-14"
          >
            <Link href="/" className="font-sans text-paper-400 hover:text-paper-300 transition-colors tracking-wide">
              Home
            </Link>
            <span className="text-paper-600">/</span>
            <Link href="/progetti" className="font-sans text-paper-400 hover:text-paper-300 transition-colors tracking-wide">
              Progetti
            </Link>
            <span className="text-paper-600">/</span>
            <span className="font-sans text-paper-300 tracking-wide">
              {project.title}
            </span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 mb-6 px-5 py-1.5 text-xs tracking-widest uppercase">
                {project.type}
              </Badge>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-paper-50 leading-tight mb-6">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-paper-400/80">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-leaf-400" />
                  <span className="font-body">{project.location}</span>
                </span>
                <span className="font-body text-paper-500">
                  {project.region}
                </span>
                {project.area_mq && (
                  <span className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-leaf-400" />
                    <span className="font-body">
                      {project.area_mq.toLocaleString("it-IT")} mq
                    </span>
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HERO IMAGE (full-width)
      ═══════════════════════════════════════════════════ */}
      {project.hero_image && (
        <section className="relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-forest-950/20 to-transparent z-10" />
          <div
            className="relative w-full aspect-[16/9] cursor-pointer group"
            onClick={() => openLightbox(allViewablePhotos, 0)}
          >
            <Image
              src={project.hero_image}
              alt={project.hero_alt ?? project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-paper-50/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-5 h-5 text-forest-900" />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-leaf-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
              >
                <p className="font-body text-xl lg:text-2xl text-forest-900 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="w-16 h-px bg-leaf-400 mb-12" />
              </motion.div>

              {/* Features */}
              {project.features.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1}
                  className="bg-paper-100 rounded-2xl p-8 lg:p-10 mb-12"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf-600 to-forest-900 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl text-forest-950">
                      Caratteristiche
                    </h2>
                  </div>

                  <ul className="space-y-4">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 group">
                        <span className="mt-1.5 w-5 h-5 rounded-full bg-leaf-700 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="font-body text-forest-800 text-lg leading-relaxed group-hover:text-forest-950 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Photo Gallery */}
              {galleryPhotos.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.2}
                  className="mb-12"
                >
                  <h2 className="font-display text-2xl lg:text-3xl text-forest-950 mb-8">
                    Galleria fotografica
                  </h2>

                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    {galleryPhotos.map((photo, index) => (
                      <figure
                        key={photo.src}
                        className={cn(
                          "relative rounded-xl overflow-hidden cursor-pointer group",
                          index === 0 && galleryPhotos.length >= 3 ? "col-span-2 aspect-[16/9]" : "aspect-[3/2]"
                        )}
                        onClick={() => openLightbox(allViewablePhotos, project.photos.indexOf(photo))}
                      >
                        <Image
                          src={index === 0 ? photo.src : photo.thumb}
                          alt={photo.alt}
                          fill
                          sizes={index === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/20 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-forest-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <figcaption className="font-body text-sm text-white/90">
                            {photo.caption}
                          </figcaption>
                        </div>
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-paper-50/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-forest-900" />
                        </div>
                      </figure>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Renders section */}
              {project.has_renders && project.renders.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.3}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-700 flex items-center justify-center">
                      <PenTool className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl text-forest-950">
                      Progetto e Render
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.renders.map((render, index) => (
                      <figure
                        key={render.src}
                        className="relative rounded-xl overflow-hidden cursor-pointer group aspect-[3/2]"
                        onClick={() => openLightbox(project.renders, index)}
                      >
                        <Image
                          src={render.src}
                          alt={render.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/20 transition-colors" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-sun-400/90 text-white border-0 text-xs">
                            Render
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-forest-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <figcaption className="font-body text-sm text-white/90">
                            {render.caption}
                          </figcaption>
                        </div>
                      </figure>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Info card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.15}
                  className="bg-white rounded-2xl border border-paper-300 p-8 shadow-soft"
                >
                  <span className="font-display italic text-leaf-600 text-base">
                    Dettagli progetto
                  </span>
                  <h3 className="font-display text-2xl text-forest-950 mt-1 mb-6">
                    Informazioni
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-paper-300 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-forest-800" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60">
                          Luogo
                        </p>
                        <p className="font-body text-forest-900">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-paper-300 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-forest-800" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60">
                          Regione
                        </p>
                        <p className="font-body text-forest-900">
                          {project.region}
                        </p>
                      </div>
                    </div>

                    {project.area_mq && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-paper-300 flex items-center justify-center">
                          <Ruler className="w-4 h-4 text-forest-800" />
                        </div>
                        <div>
                          <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60">
                            Superficie
                          </p>
                          <p className="font-body text-forest-900">
                            {project.area_mq.toLocaleString("it-IT")} mq
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-paper-300 flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-forest-800" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60">
                          Tipologia
                        </p>
                        <p className="font-body text-forest-900">
                          {project.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Tags */}
                {project.tags.length > 0 && (
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.25}
                    className="bg-paper-100 rounded-2xl p-8"
                  >
                    <h3 className="font-display text-xl text-forest-950 mb-4">
                      Categorie
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/progetti?tag=${tag}`}
                          className="px-3 py-1.5 rounded-full bg-white text-forest-800 text-sm font-sans hover:bg-leaf-100 hover:text-leaf-700 transition-colors border border-paper-300"
                        >
                          {formatTag(tag)}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.3}
                  className="bg-forest-950 rounded-2xl p-8 text-paper-50"
                >
                  <span className="font-display italic text-leaf-400 text-base">
                    Ti piace questo progetto?
                  </span>
                  <h3 className="font-display text-2xl text-paper-50 mt-1 mb-3">
                    Realizziamo il tuo
                  </h3>
                  <p className="font-body text-paper-300/80 leading-relaxed mb-6">
                    Contattaci per una consulenza gratuita e un preventivo
                    personalizzato.
                  </p>

                  <Link href="/contatti" className="block mb-4">
                    <Button className="w-full" size="lg">
                      Contattaci Ora
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>

                  <a href="tel:+393714821825" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-paper-400/30 text-paper-100 hover:bg-paper-100/10"
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Chiama Ora
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NAVIGATION BETWEEN PROJECTS
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-paper-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-paper-300">
            {/* Previous */}
            <div className="py-8 lg:py-12 pr-0 md:pr-8">
              {prevProject ? (
                <Link
                  href={`/progetti/${prevProject.slug}`}
                  className="group flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all flex-shrink-0">
                    <ArrowLeft className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                      Precedente
                    </p>
                    <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link href="/progetti" className="group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all flex-shrink-0">
                    <ArrowLeft className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                      Torna a
                    </p>
                    <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                      Tutti i Progetti
                    </p>
                  </div>
                </Link>
              )}
            </div>

            {/* Next */}
            <div className="py-8 lg:py-12 pl-0 md:pl-8">
              {nextProject ? (
                <Link
                  href={`/progetti/${nextProject.slug}`}
                  className="group flex items-center justify-end gap-4 text-right"
                >
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                      Successivo
                    </p>
                    <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                      {nextProject.title}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                  </div>
                </Link>
              ) : (
                <Link
                  href="/progetti"
                  className="group flex items-center justify-end gap-4 text-right"
                >
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                      Esplora
                    </p>
                    <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                      Tutti i Progetti
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 bg-forest-950 text-paper-50 overflow-hidden">
        <div className="absolute inset-0">
          {project.hero_image && (
            <Image src={project.hero_image} alt="" fill className="object-cover opacity-10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>

        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-sun-400/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-leaf-500/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <span className="font-display italic text-leaf-400 text-lg">
            Preventivo gratuito
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-paper-50 mt-4 mb-6 leading-tight">
            Vuoi un progetto simile per il tuo
            <span className="block italic text-leaf-400">spazio verde?</span>
          </h2>
          <p className="font-body text-lg text-paper-300/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contattaci per una consulenza senza impegno. Ogni progetto nasce
            dall&apos;ascolto delle tue esigenze.
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
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={lightboxPhotos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
