import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all settings as key-value map
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("settings").take(100);
    const map: Record<string, unknown> = {};
    for (const row of rows) {
      map[row.key] = row.value;
    }
    return map;
  },
});

// Get single setting by key
export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return row?.value ?? null;
  },
});

// Upsert a setting (admin)
export const upsert = mutation({
  args: {
    key: v.string(),
    value: v.any(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("settings", {
      key: args.key,
      value: args.value,
      updatedAt: Date.now(),
    });
  },
});

// Bulk upsert multiple settings at once (admin)
export const bulkUpsert = mutation({
  args: {
    settings: v.array(
      v.object({
        key: v.string(),
        value: v.any(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    for (const { key, value } of args.settings) {
      const existing = await ctx.db
        .query("settings")
        .withIndex("by_key", (q) => q.eq("key", key))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { value, updatedAt: now });
      } else {
        await ctx.db.insert("settings", { key, value, updatedAt: now });
      }
    }
    return { success: true };
  },
});
