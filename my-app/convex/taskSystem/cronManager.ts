// Dashboard: cronManager module — returns empty
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const listSchedules = query({
  args: { projectId: v.optional(v.string()) },
  handler: async () => [],
});

export const createSchedule = mutation({
  args: { name: v.string(), cronExpression: v.string(), action: v.string() },
  handler: async () => null,
});
