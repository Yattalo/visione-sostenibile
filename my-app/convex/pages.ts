import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get page by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
  },
});

// Get all active pages
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("pages")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc")
      .take(100);
  },
});

// Create/update page (admin)
export const upsert = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    metaDescription: v.optional(v.string()),
    content: v.optional(v.string()),
    heroTitle: v.optional(v.string()),
    heroSubtitle: v.optional(v.string()),
    heroImage: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    const data = {
      ...args,
      isActive: true,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    } else {
      return await ctx.db.insert("pages", data);
    }
  },
});
