import type { Metadata } from "next";
import { getBlogPost } from "../../lib/blog";
import { buildMetadata } from "../../lib/seo-metadata";
import { BlogPostClient } from "../BlogPostClient";

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
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Articolo non trovato | Blog",
      description:
        "L'articolo richiesto non e disponibile. Esplora il blog di Visione Sostenibile per altri contenuti.",
      path: `/blog/${slug}`,
    });
  }

  return buildMetadata({
    title: `${post.title} | Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ template?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  return (
    <BlogPostClient
      slug={slug}
      template={query.template}
    />
  );
}
