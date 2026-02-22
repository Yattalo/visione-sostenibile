"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";
import { blogPosts as staticBlogPosts } from "../lib/blog";

const coverImages: Record<string, string> = {
  "come-mantenere-giardino-autunno":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
  "tendenze-giardini-2026":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  "piante-pendio":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
};

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
  const posts = convexPosts ?? staticBlogPosts;
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

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-paper-50">
        <section className="relative overflow-hidden bg-forest-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-900/85 to-forest-950/90" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 mb-8 px-6 py-2 text-xs tracking-widest uppercase">
              Blog
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-paper-50 leading-tight max-w-4xl mb-8">
              Il Nostro
              <span className="block italic text-leaf-400">Blog</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-paper-300/80 max-w-2xl leading-relaxed">
              Consigli, tendenze e approfondimenti dal mondo del giardinaggio
              sostenibile e della progettazione del verde.
            </p>
          </div>
        </section>
        <EmptyState />
      </div>
    );
  }

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <div className="min-h-screen bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          Matches site-wide organic aesthetic: dark moss bg,
          decorative blobs, serif italic heading
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-forest-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Background texture */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/95 via-forest-900/85 to-forest-950/90" />
        </div>

        {/* Organic decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-leaf-500/20 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sun-400/5 rounded-full blur-3xl" />

        {/* Thin decorative accent line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-leaf-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 mb-8 px-6 py-2 text-xs tracking-widest uppercase">
              Blog
            </Badge>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-paper-50 leading-tight max-w-4xl mb-8">
              Il Nostro
              <span className="block italic text-leaf-400">Blog</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-paper-300/80 max-w-2xl leading-relaxed">
              Consigli, tendenze e approfondimenti dal mondo del giardinaggio
              sostenibile e della progettazione del verde.
            </p>
          </SlideUp>

          {/* Scroll indicator */}
          <SlideUp delay={0.5}>
            <div className="mt-16">
              <div className="w-px h-16 bg-gradient-to-b from-paper-400/50 to-transparent mx-0" />
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURED POST
          Large horizontal card for the first article,
          creating visual hierarchy and editorial weight
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28">
        {/* Subtle top gradient blending hero into content */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-forest-950/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SlideUp>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <Card
                variant="elevated"
                hover
                className="overflow-hidden p-0"
              >
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <Image
                      src={
                        coverImages[featuredPost.slug] ??
                        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
                      }
                      alt={featuredPost.title}
                      width={800}
                      height={600}
                      sizes="(max-width: 1024px) 100vw, 50vw"
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
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-forest-950 mb-4 leading-snug group-hover:text-leaf-700 transition-colors duration-300">
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

          {/* ═══════════════════════════════════════════════════
              REMAINING POSTS GRID
              Standard vertical cards for secondary articles
          ═══════════════════════════════════════════════════ */}
          <StaggerContainer delay={0.2} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingPosts.map((post, index) => (
                <StaggerItem key={post.slug} delay={index * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <Card
                      variant="elevated"
                      hover
                      className="h-full overflow-hidden p-0"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={
                            coverImages[post.slug] ??
                            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                          }
                          alt={post.title}
                          width={600}
                          height={375}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="earth" size="sm">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 lg:p-8">
                        <h2 className="font-display text-xl lg:text-2xl font-light text-forest-950 mb-3 leading-snug group-hover:text-leaf-700 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="font-body text-forest-800/70 text-base leading-relaxed mb-5 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-5 border-t border-paper-300">
                          <div className="flex items-center gap-4 text-xs text-forest-800/60">
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
                          <ArrowRight className="w-4 h-4 text-forest-700 group-hover:text-leaf-500 transition-all duration-300 group-hover:translate-x-1" />
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
    </div>
  );
}
