import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get approved reviews
export const getApproved = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    return await ctx.db
      .query("reviews")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .order("asc")
      .take(limit);
  },
});

// Get featured reviews (highest rating)
export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    return await ctx.db
      .query("reviews")
      .withIndex("by_rating", (q) =>
        q.eq("isApproved", true).gte("rating", 4)
      )
      .order("desc")
      .take(limit);
  },
});

// Submit new review (needs approval)
export const submit = mutation({
  args: {
    authorName: v.string(),
    authorLocation: v.optional(v.string()),
    rating: v.number(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reviews", {
      ...args,
      date: new Date().toISOString(),
      isApproved: false, // require moderation
      createdAt: Date.now(),
    });
  },
});

// Approve review (admin)
export const approve = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reviewId, { isApproved: true });
    return { success: true };
  },
});

// Get all reviews for admin
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews").order("desc").take(200);
  },
});
