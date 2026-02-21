// Dashboard: driftEvents module — not yet implemented
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const stats = query({
  args: { projectId: v.optional(v.string()) },
  handler: async () => ({ total: 0, open: 0, byType: {}, bySeverity: {} }),
});

export const list = query({
  args: { projectId: v.optional(v.string()) },
  handler: async () => [],
});

export const create = mutation({
  args: { agent: v.string(), type: v.string(), severity: v.string(), description: v.string(), projectId: v.optional(v.string()) },
  handler: async () => null,
});

export const acknowledge = mutation({
  args: { eventId: v.string(), by: v.optional(v.string()) },
  handler: async () => null,
});

export const resolve = mutation({
  args: { eventId: v.string(), by: v.optional(v.string()), resolution: v.optional(v.string()) },
  handler: async () => null,
});

export const dismiss = mutation({
  args: { eventId: v.string(), by: v.optional(v.string()) },
  handler: async () => null,
});
