import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authHelpers";

/**
 * Editorial calendar queries and mutations.
 * Operates on the blogPosts table using the optional `status` and `scheduledAt` fields.
 */

// Get posts for a given month (year + month, 1-indexed)
export const getByMonth = query({
  args: {
    year: v.number(),
    month: v.number(), // 1-12
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    // Calculate month boundaries in UTC
    const startOfMonth = new Date(Date.UTC(args.year, args.month - 1, 1)).getTime();
    const startOfNextMonth = new Date(Date.UTC(args.year, args.month, 1)).getTime();

    const allPosts = await ctx.db
      .query("blogPosts")
      .order("desc")
      .collect();

    // Filter posts that fall within this month.
    // Use scheduledAt if set, otherwise fall back to publishedAt.
    return allPosts
      .filter((post) => {
        const dateToCheck = post.scheduledAt ?? post.publishedAt;
        return dateToCheck >= startOfMonth && dateToCheck < startOfNextMonth;
      })
      .map((post) => ({
        _id: post._id,
        slug: post.slug,
        title: post.title,
        category: post.category,
        status: post.status ?? (post.isPublished ? "published" : "draft") as "draft" | "scheduled" | "published",
        scheduledAt: post.scheduledAt,
        publishedAt: post.publishedAt,
        isPublished: post.isPublished,
        updatedAt: post.updatedAt,
      }));
  },
});

// Update schedule: set scheduledAt and status to "scheduled"
export const updateSchedule = mutation({
  args: {
    id: v.id("blogPosts"),
    scheduledAt: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Articolo non trovato");
    }

    await ctx.db.patch(args.id, {
      scheduledAt: args.scheduledAt,
      status: "scheduled",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Publish now: set status to "published", publishedAt to now, mark isPublished
export const publishNow = mutation({
  args: {
    id: v.id("blogPosts"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Articolo non trovato");
    }

    await ctx.db.patch(args.id, {
      status: "published",
      publishedAt: Date.now(),
      isPublished: true,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Revert to draft: clear scheduledAt, set status to "draft"
export const revertToDraft = mutation({
  args: {
    id: v.id("blogPosts"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new Error("Articolo non trovato");
    }

    await ctx.db.patch(args.id, {
      status: "draft",
      scheduledAt: undefined,
      isPublished: false,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
