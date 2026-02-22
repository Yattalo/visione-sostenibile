import type { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { getBlogPost } from "../../lib/blog";
import { buildMetadata } from "../../lib/seo-metadata";
import { BlogPostClient } from "../BlogPostClient";
import { api } from "@/convex/_generated/api";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

async function queryConvexPostBySlug(slug: string) {
  if (!CONVEX_URL) return null;
  try {
    const client = new ConvexHttpClient(CONVEX_URL);
    return await client.query(api.blog.getBySlug, { slug });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const { blogPosts } = await import("../../lib/blog");
  const fallbackParams = blogPosts.map((post) => ({
    slug: post.slug,
  }));

  if (!CONVEX_URL) return fallbackParams;

  try {
    const client = new ConvexHttpClient(CONVEX_URL);
    const convexPosts = await client.query(api.blog.getAll, {});
    const mergedSlugs = Array.from(
      new Set([...convexPosts.map((post) => post.slug), ...fallbackParams.map((post) => post.slug)])
    );
    return mergedSlugs.map((slug) => ({ slug }));
  } catch {
    return fallbackParams;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const convexPost = await queryConvexPostBySlug(slug);
  const post = convexPost ?? getBlogPost(slug);

  if (!post) {
    return buildMetadata({
      title: "Articolo non trovato | Blog",
      description:
        "L'articolo richiesto non e disponibile. Esplora il blog di Visione Sostenibile per altri contenuti.",
      path: `/blog/${slug}`,
    });
  }

  const hasStorageCover =
    typeof post === "object" &&
    post !== null &&
    "coverStorageId" in post &&
    Boolean((post as { coverStorageId?: string }).coverStorageId);

  return buildMetadata({
    title: `${post.title} | Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: hasStorageCover ? undefined : post.coverImage,
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
