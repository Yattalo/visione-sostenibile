"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
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
import {
  progettiProjects,
  getProjectBySlug,
  formatTag,
} from "../../lib/progetti-data";
import type { ProgettiPhoto } from "../../lib/progetti-data";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { cn } from "../../lib/utils";

/* ─── Lightbox Component ─── */

function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: ProgettiPhoto[];
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
      className="fixed inset-0 z-[100] bg-charcoal-950/95 flex items-center justify-center"
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
          <p className="font-body text-white/80 text-center text-sm bg-charcoal-900/60 backdrop-blur-sm px-6 py-2 rounded-full">
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
  const project = getProjectBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<ProgettiPhoto[]>([]);

  const projectIndex = progettiProjects.findIndex((p) => p.slug === slug);
  const nextProject = projectIndex < progettiProjects.length - 1
    ? progettiProjects[projectIndex + 1]
    : null;
  const prevProject = projectIndex > 0 ? progettiProjects[projectIndex - 1] : null;

  const openLightbox = (photos: ProgettiPhoto[], index: number) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-charcoal-400" />
          </div>
          <h1 className="font-display text-3xl text-charcoal-800 mb-4">
            Progetto non trovato
          </h1>
          <p className="font-body text-charcoal-500 mb-8">
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

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-moss-900 pt-28 pb-20 lg:pt-36 lg:pb-28">
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
            <div className="absolute inset-0 bg-moss-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-moss-500/15 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm mb-10 lg:mb-14"
          >
            <Link href="/" className="font-sans text-cream-400 hover:text-cream-200 transition-colors tracking-wide">
              Home
            </Link>
            <span className="text-cream-600">/</span>
            <Link href="/progetti" className="font-sans text-cream-400 hover:text-cream-200 transition-colors tracking-wide">
              Progetti
            </Link>
            <span className="text-cream-600">/</span>
            <span className="font-sans text-cream-200 tracking-wide">
              {project.title}
            </span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-cream-200 mb-6 px-5 py-1.5 text-xs tracking-widest uppercase">
                {project.type}
              </Badge>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream-50 leading-tight mb-6">
                {project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-cream-300/80">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-terracotta-400" />
                  <span className="font-body">{project.location}</span>
                </span>
                <span className="font-body text-cream-500">
                  {project.region}
                </span>
                {project.area_mq && (
                  <span className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-moss-400" />
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
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-moss-900/20 to-transparent z-10" />
          <div
            className="relative w-full aspect-[16/9] cursor-pointer group"
            onClick={() => openLightbox(allViewablePhotos, 0)}
          >
            <Image
              src={project.hero_image}
              alt={project.hero_alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-5 h-5 text-charcoal-700" />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-terracotta-100/30 rounded-full blur-3xl pointer-events-none" />

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
                <p className="font-body text-xl lg:text-2xl text-charcoal-700 leading-relaxed mb-8">
                  {project.description}
                </p>
                <div className="w-16 h-px bg-terracotta-400 mb-12" />
              </motion.div>

              {/* Features */}
              {project.features.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.1}
                  className="bg-cream-100 rounded-2xl p-8 lg:p-10 mb-12"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-moss-600 to-moss-800 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl text-charcoal-800">
                      Caratteristiche
                    </h2>
                  </div>

                  <ul className="space-y-4">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-4 group">
                        <span className="mt-1.5 w-5 h-5 rounded-full bg-moss-700 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="font-body text-charcoal-600 text-lg leading-relaxed group-hover:text-charcoal-800 transition-colors">
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
                  <h2 className="font-display text-2xl lg:text-3xl text-charcoal-800 mb-8">
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
                        <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <figcaption className="font-body text-sm text-white/90">
                            {photo.caption}
                          </figcaption>
                        </div>
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-charcoal-700" />
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
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 flex items-center justify-center">
                      <PenTool className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl text-charcoal-800">
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
                        <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors" />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-terracotta-500/90 text-white border-0 text-xs">
                            Render
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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
                  className="bg-white rounded-2xl border border-cream-200 p-8 shadow-soft"
                >
                  <span className="font-display italic text-terracotta-600 text-base">
                    Dettagli progetto
                  </span>
                  <h3 className="font-display text-2xl text-charcoal-800 mt-1 mb-6">
                    Informazioni
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-charcoal-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Luogo
                        </p>
                        <p className="font-body text-charcoal-700">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-charcoal-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Regione
                        </p>
                        <p className="font-body text-charcoal-700">
                          {project.region}
                        </p>
                      </div>
                    </div>

                    {project.area_mq && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
                          <Ruler className="w-4 h-4 text-charcoal-600" />
                        </div>
                        <div>
                          <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                            Superficie
                          </p>
                          <p className="font-body text-charcoal-700">
                            {project.area_mq.toLocaleString("it-IT")} mq
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-charcoal-600" />
                      </div>
                      <div>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400">
                          Tipologia
                        </p>
                        <p className="font-body text-charcoal-700">
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
                    className="bg-cream-100 rounded-2xl p-8"
                  >
                    <h3 className="font-display text-xl text-charcoal-800 mb-4">
                      Categorie
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/progetti?tag=${tag}`}
                          className="px-3 py-1.5 rounded-full bg-white text-charcoal-600 text-sm font-sans hover:bg-moss-100 hover:text-moss-700 transition-colors border border-cream-200"
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
                  className="bg-moss-900 rounded-2xl p-8 text-cream-50"
                >
                  <span className="font-display italic text-terracotta-300 text-base">
                    Ti piace questo progetto?
                  </span>
                  <h3 className="font-display text-2xl text-cream-50 mt-1 mb-3">
                    Realizziamo il tuo
                  </h3>
                  <p className="font-body text-cream-200/80 leading-relaxed mb-6">
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
                      className="w-full border-cream-400/30 text-cream-100 hover:bg-cream-100/10"
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
      <section className="border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-cream-200">
            {/* Previous */}
            <div className="py-8 lg:py-12 pr-0 md:pr-8">
              {prevProject ? (
                <Link
                  href={`/progetti/${prevProject.slug}`}
                  className="group flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all flex-shrink-0">
                    <ArrowLeft className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Precedente
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link href="/progetti" className="group flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all flex-shrink-0">
                    <ArrowLeft className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Torna a
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
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
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Successivo
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                      {nextProject.title}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                </Link>
              ) : (
                <Link
                  href="/progetti"
                  className="group flex items-center justify-end gap-4 text-right"
                >
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal-400 mb-1">
                      Esplora
                    </p>
                    <p className="font-display text-lg text-charcoal-700 group-hover:text-terracotta-600 transition-colors">
                      Tutti i Progetti
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-cream-300 flex items-center justify-center group-hover:border-terracotta-400 group-hover:bg-terracotta-50 transition-all flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-charcoal-400 group-hover:text-terracotta-600 transition-colors" />
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
      <section className="relative py-24 lg:py-32 bg-moss-900 text-cream-50 overflow-hidden">
        <div className="absolute inset-0">
          {project.hero_image && (
            <Image src={project.hero_image} alt="" fill className="object-cover opacity-10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-moss-900 via-moss-800/90 to-moss-900" />
        </div>

        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-terracotta-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terracotta-500/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center"
        >
          <span className="font-display italic text-terracotta-300 text-lg">
            Preventivo gratuito
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream-50 mt-4 mb-6 leading-tight">
            Vuoi un progetto simile per il tuo
            <span className="block italic text-terracotta-300">spazio verde?</span>
          </h2>
          <p className="font-body text-lg text-cream-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contattaci per una consulenza senza impegno. Ogni progetto nasce
            dall&apos;ascolto delle tue esigenze.
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
