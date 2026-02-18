import { mutation } from "./_generated/server";
import { blogPosts } from "../app/lib/blog";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    let seededCount = 0;
    let skippedCount = 0;

    for (const post of blogPosts) {
      const existing = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", post.slug))
        .first();

      if (existing) {
        skippedCount++;
        continue;
      }

      const publishedAtDate = new Date(post.publishedAt);
      const publishedAtTimestamp = publishedAtDate.getTime();

      await ctx.db.insert("blogPosts", {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        author: post.author,
        publishedAt: publishedAtTimestamp,
        readTime: post.readTime,
        isPublished: true,
        updatedAt: Date.now(),
      });

      seededCount++;
    }

    return {
      success: true,
      seeded: seededCount,
      skipped: skippedCount,
      total: blogPosts.length,
    };
  },
});
