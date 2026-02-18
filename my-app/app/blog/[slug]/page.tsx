import { getBlogPost } from "../../lib/blog";
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
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog Visione Sostenibile`,
    description: post.excerpt,
  };
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
