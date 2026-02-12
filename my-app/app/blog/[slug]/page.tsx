import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { getBlogPost, getRelatedPosts } from "../../lib/blog";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SlideUp, FadeIn } from "../../components/animations";
import { notFound } from "next/navigation";

const coverImages: Record<string, string> = {
  "come-mantenere-giardino-autunno":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
  "tendenze-giardini-2024":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  "piante-pendio":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
};

const thumbImages: Record<string, string> = {
  "come-mantenere-giardino-autunno":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
  "tendenze-giardini-2024":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  "piante-pendio":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
};

export async function generateStaticParams() {
  const { blogPosts } = await import("../../lib/blog");
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog Visione Sostenibile`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ═══════════════════════════════════════════════════
          ARTICLE HEADER
          Elegant back link, category, title, meta info
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-moss-900 pt-32 pb-16 lg:pt-40 lg:pb-20">
        {/* Background texture */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url('${coverImages[post.slug] ?? "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        {/* Organic decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-moss-500/20 rounded-full blur-3xl animate-drift" />

        {/* Thin decorative accent line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/30 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cream-300 hover:text-terracotta-300 transition-colors duration-300 mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-sans text-sm tracking-wide">
                Torna al Blog
              </span>
            </Link>
          </FadeIn>

          <SlideUp>
            <Badge variant="primary" size="sm" className="mb-6">
              {post.category}
            </Badge>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-cream-50 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="font-body text-xl text-cream-200/80 mb-10 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-cream-300/70 pt-8 border-t border-cream-100/10">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} di lettura
              </span>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          COVER IMAGE
          Full-width image with rounded corners,
          overlapping the hero for depth
      ═══════════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 -mt-1">
        <SlideUp delay={0.1}>
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-deep">
            <Image
              src={
                coverImages[post.slug] ??
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
              }
              alt={post.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/10 to-transparent" />
          </div>
        </SlideUp>
      </div>

      {/* ═══════════════════════════════════════════════════
          ARTICLE BODY
          Properly typeset content with font-body,
          consistent spacing, and heading hierarchy
      ═══════════════════════════════════════════════════ */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <SlideUp delay={0.2}>
          <div className="font-body text-lg text-charcoal-700 leading-relaxed">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="font-display text-2xl lg:text-3xl font-normal text-charcoal-800 mt-14 mb-6 first:mt-0"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="font-display text-xl lg:text-2xl font-normal text-charcoal-800 mt-10 mb-4"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul
                    key={index}
                    className="my-6 space-y-3 pl-0 list-none"
                  >
                    {paragraph.split("\n").map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-charcoal-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
                        <span>{item.replace("- ", "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.trim().startsWith("1. ")) {
                return (
                  <ol
                    key={index}
                    className="my-6 space-y-3 pl-0 list-none counter-reset-item"
                  >
                    {paragraph.split("\n").map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-charcoal-600"
                      >
                        <span className="font-sans text-sm font-medium text-terracotta-500 mt-0.5 shrink-0 w-5">
                          {i + 1}.
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^\d+\.\s*/, "")
                              .replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="font-semibold text-charcoal-800">$1</strong>'
                              ),
                          }}
                        />
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="mb-6 text-charcoal-600">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </SlideUp>
      </article>

      {/* ═══════════════════════════════════════════════════
          RELATED POSTS
          Elegant side-by-side cards with thumbnail images
      ═══════════════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-cream-200 bg-cream-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <SlideUp>
              <h2 className="font-display text-3xl lg:text-4xl font-light text-charcoal-800 mb-12">
                Articoli <span className="italic text-moss-700">Correlati</span>
              </h2>
            </SlideUp>

            <SlideUp delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block"
                  >
                    <Card
                      variant="elevated"
                      hover
                      className="h-full overflow-hidden p-0"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={
                            thumbImages[relatedPost.slug] ??
                            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                          }
                          alt={relatedPost.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="earth" size="sm">
                            {relatedPost.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-light text-charcoal-800 mb-2 group-hover:text-moss-700 transition-colors duration-300 leading-snug">
                          {relatedPost.title}
                        </h3>
                        <p className="font-body text-sm text-charcoal-500 line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-terracotta-600 group-hover:text-terracotta-700 transition-colors">
                          Leggi
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </SlideUp>
          </div>
        </section>
      )}
    </div>
  );
}
