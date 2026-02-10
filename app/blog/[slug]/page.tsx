import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react";
import { getBlogPost, getRelatedPosts } from "../../lib/blog";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SlideUp } from "../../components/animations";
import { notFound } from "next/navigation";

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
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna al Blog
          </Link>
        </SlideUp>

        <SlideUp delay={0.1}>
          <header className="mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge variant="primary">{post.category}</Badge>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
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
          </header>
        </SlideUp>

        <SlideUp delay={0.2}>
          <div className="aspect-video bg-gradient-to-br from-primary-100 to-earth-100 rounded-2xl mb-12 flex items-center justify-center">
            <span className="text-8xl">🌿</span>
          </div>
        </SlideUp>

        <SlideUp delay={0.3}>
          <div className="prose prose-lg prose-green max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="font-display text-2xl font-bold mt-12 mb-6">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={index} className="list-disc pl-6 my-6 space-y-2">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </SlideUp>

        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Articoli Correlati
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                >
                  <Card variant="outline" hover className="h-full">
                    <CardContent className="p-6">
                      <Badge variant="earth" size="sm" className="mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 hover:text-primary-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
