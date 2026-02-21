// Dashboard: contextEntries module — not yet implemented
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const stats = query({
  args: { projectId: v.optional(v.string()) },
  handler: async () => ({ total: 0, byTier: { draft: 0, reviewed: 0, curated: 0 }, byType: {} }),
});

export const list = query({
  args: { projectId: v.optional(v.string()) },
  handler: async () => [],
});

export const create = mutation({
  args: { type: v.string(), content: v.string(), tier: v.optional(v.string()), author: v.optional(v.string()), projectId: v.optional(v.string()) },
  handler: async () => null,
});

export const promote = mutation({
  args: { entryId: v.string(), by: v.optional(v.string()), reason: v.optional(v.string()) },
  handler: async () => null,
});

export const addValidation = mutation({
  args: { entryId: v.string(), validation: v.string() },
  handler: async () => null,
});

export const updateSummary = mutation({
  args: { entryId: v.string(), summary: v.string() },
  handler: async () => null,
});
