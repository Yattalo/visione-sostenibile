import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const track = mutation({
  args: {
    eventName: v.union(v.literal("share_clicked"), v.literal("share_landing")),
    serviceSlug: v.string(),
    channel: v.optional(v.string()),
    pagePath: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("shareEvents", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getRecent = query({
  args: {
    limit: v.optional(v.number()),
    eventName: v.optional(
      v.union(v.literal("share_clicked"), v.literal("share_landing"))
    ),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 100, 200);

    if (args.eventName) {
      return await ctx.db
        .query("shareEvents")
        .withIndex("by_event_date", (q) => q.eq("eventName", args.eventName!))
        .order("desc")
        .take(limit);
    }

    return await ctx.db.query("shareEvents").order("desc").take(limit);
  },
});
