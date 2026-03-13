"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Loader2, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  SlideUp,
  StaggerContainer,
} from "../components/animations";
import { blogPosts as staticBlogPosts } from "../lib/blog";
import { BLUR_DATA_URL } from "../lib/image-utils";

function EmptyState() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
      <p className="font-body text-forest-800/70">Nessun articolo pubblicato.</p>
    </div>
  );
}

export default function BlogPage() {
  const siteUrl = "https://www.visionesostenibile.it";
  const convexPosts = useQuery(api.blog.getAll);
  const hasConvexConfig = Boolean(
    process.env.NEXT_PUBLIC_CONVEX_URL &&
      !process.env.NEXT_PUBLIC_CONVEX_URL.includes("placeholder")
  );
  const posts = hasConvexConfig ? convexPosts ?? [] : staticBlogPosts;

  const [activeCategory, setActiveCategory] = useState<string>("Tutti");

  const resolveCoverImage = (coverImage?: string, fallback?: string) =>
    coverImage && coverImage.trim().length > 0
      ? coverImage
      : fallback ?? "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600";

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return ["Tutti", ...cats.sort()];
  }, [posts]);

  // Featured post is always the first post (regardless of filter)
  const featuredPost = posts.length > 0 ? posts[0] : null;

  // Remaining posts (everything except the featured), filtered by category
  const filteredPosts = useMemo(() => {
    const remaining = posts.slice(1);
    if (activeCategory === "Tutti") return remaining;
    return remaining.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  // Count for the active filter (includes featured if it matches)
  const activeCount = useMemo(() => {
    if (activeCategory === "Tutti") return posts.length;
    return posts.filter((p) => p.category === activeCategory).length;
  }, [posts, activeCategory]);

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
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  if (hasConvexConfig && convexPosts === undefined) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 text-forest-800/70">
          <Loader2 className="w-5 h-5 animate-spin" />
          Caricamento articoli dal CMS...
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-paper-50">
        <section className="relative flex items-center justify-center overflow-hidden bg-forest-950 py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-leaf-900/30 via-forest-950 to-forest-950" />
            <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-sun-400/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-leaf-500/15 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-stitch-heading text-4xl md:text-5xl lg:text-7xl text-paper-50 mb-8 text-balance">
              ARTICOLI E{" "}
              <em className="italic font-normal text-leaf-400">Ispirazioni</em>
            </h1>
            <p className="text-hero-subtitle text-lg md:text-xl text-paper-200/90 max-w-2xl mx-auto">
              Consigli, tendenze e approfondimenti
              dal mondo del giardinaggio sostenibile.
            </p>
          </div>
        </section>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* ═══════════════════════════════════════════════════
          HERO SECTION — Stitch design language
          Dark background with radial gradient, uppercase
          heading with italic accent, wide tracking
      ═══════════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden bg-forest-950 py-24 md:py-32 lg:py-40">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-leaf-900/30 via-forest-950 to-forest-950" />
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-sun-400/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-leaf-500/15 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <SlideUp>
            <h1 className="text-stitch-heading text-4xl md:text-5xl lg:text-7xl text-paper-50 mb-8 text-balance">
              ARTICOLI E{" "}
              <em className="italic font-normal text-leaf-400">Ispirazioni</em>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-hero-subtitle text-lg md:text-xl text-paper-200/90 max-w-2xl mx-auto">
              Consigli, tendenze e approfondimenti
              dal mondo del giardinaggio sostenibile.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED POST
          Large horizontal card for the first article,
          creating visual hierarchy and editorial weight
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32">
        {/* Subtle top gradient blending hero into content */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-forest-950/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {featuredPost && (
            <SlideUp>
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <Card
                  variant="elevated"
                  hover
                  className="overflow-hidden p-0 hover:-translate-y-1.5 hover:shadow-floating transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden rounded-[30px]">
                      <Image
                        src={
                          resolveCoverImage(
                            featuredPost.coverImage,
                            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
                          )
                        }
                        alt={featuredPost.title}
                        width={800}
                        height={600}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
                      <div className="absolute top-6 left-6">
                        <Badge variant="primary" size="sm">
                          {featuredPost.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="font-sans text-xs uppercase tracking-widest text-leaf-500 mb-4">
                        Articolo in evidenza
                      </span>
                      <h2 className="text-stitch-heading text-2xl md:text-3xl lg:text-4xl text-forest-950 mb-4 leading-snug group-hover:text-leaf-700 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="font-body text-forest-800/70 text-lg leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-forest-800/60 mb-8">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.publishedAt).toLocaleDateString(
                            "it-IT",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-leaf-600 group-hover:text-leaf-700 transition-colors">
                        Leggi l&apos;articolo
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </SlideUp>
          )}

          {/* ═══════════════════════════════════════════════════
              CATEGORY FILTERS
              Pill-style filter bar with post count
          ═══════════════════════════════════════════════════ */}
          <SlideUp delay={0.15} className="mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-2 text-forest-800/60">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-sans text-sm uppercase tracking-widest font-light">
                  Filtra per categoria
                </span>
              </div>
              <p className="font-body text-sm text-forest-800/50">
                {activeCount} {activeCount === 1 ? "articolo" : "articoli"}
                {activeCategory !== "Tutti" && (
                  <> in <span className="font-medium text-forest-800/70">{activeCategory}</span></>
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`
                      relative px-5 py-2.5 rounded-full font-sans text-sm font-medium
                      transition-all duration-300 cursor-pointer
                      ${
                        isActive
                          ? "bg-forest-950 text-paper-50 shadow-md"
                          : "border border-paper-200/50 bg-paper-50/80 backdrop-blur-sm text-forest-800/70 hover:bg-paper-100 hover:text-forest-900 hover:border-leaf-200"
                      }
                    `}
                  >
                    {cat}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-forest-950 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </SlideUp>

          {/* ═══════════════════════════════════════════════════
              REMAINING POSTS GRID
              Animated cards filtered by category
          ═══════════════════════════════════════════════════ */}
          <div className="mt-12">
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center"
              >
                <p className="font-body text-forest-800/50 text-lg">
                  Nessun articolo in questa categoria.
                </p>
                <button
                  onClick={() => setActiveCategory("Tutti")}
                  className="mt-4 font-sans text-sm text-leaf-600 hover:text-leaf-700 underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Mostra tutti gli articoli
                </button>
              </motion.div>
            ) : (
              <StaggerContainer delay={0.1} className="mt-0">
                <AnimatePresence mode="popLayout">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.slug}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                      >
                        <Link href={`/blog/${post.slug}`} className="group block h-full">
                          <Card
                            variant="elevated"
                            hover
                            className="h-full overflow-hidden p-0 hover:-translate-y-1.5 hover:shadow-floating transition-all duration-300"
                          >
                            {/* Image */}
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[30px]">
                              <Image
                                src={resolveCoverImage(post.coverImage)}
                                alt={post.title}
                                width={600}
                                height={375}
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                placeholder="blur"
                                blurDataURL={BLUR_DATA_URL}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/25 to-transparent" />
                              <div className="absolute top-4 left-4">
                                <Badge variant="earth" size="sm">
                                  {post.category}
                                </Badge>
                              </div>
                            </div>

                            {/* Content */}
                            <CardContent className="p-6">
                              <h3 className="font-display text-lg lg:text-xl font-light uppercase tracking-wide text-forest-950 mb-2.5 leading-snug group-hover:text-leaf-700 transition-colors duration-300 line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="font-body text-forest-800/65 text-sm leading-relaxed mb-5 line-clamp-3">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between pt-4 border-t border-paper-200/50">
                                <div className="flex items-center gap-3 text-xs text-forest-800/55">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(post.publishedAt).toLocaleDateString(
                                      "it-IT",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {post.readTime}
                                  </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-forest-700/40 group-hover:text-leaf-500 transition-all duration-300 group-hover:translate-x-1" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
