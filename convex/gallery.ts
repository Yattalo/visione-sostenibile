import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all active gallery images
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("gallery")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc")
      .take(200);
  },
});

// Get gallery by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("gallery")
      .withIndex("by_category", (q) =>
        q.eq("category", args.category).eq("isActive", true)
      )
      .order("asc")
      .take(100);
  },
});

// Get gallery for a specific service
export const getByService = query({
  args: { serviceId: v.id("services") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("gallery")
      .withIndex("by_service", (q) => q.eq("serviceId", args.serviceId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .take(50);
  },
});

// Add gallery image (admin)
export const add = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    category: v.optional(v.string()),
    serviceId: v.optional(v.id("services")),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("gallery", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});
