import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Centralized media upload endpoint for all admin surfaces.
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Resolve storage URL for previews or external consumers.
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
