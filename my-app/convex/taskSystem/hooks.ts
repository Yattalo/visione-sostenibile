// Dashboard: hooks module — file-based, returns empty
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const listWebhooks = query({
  args: { projectId: v.optional(v.string()) },
  handler: async () => [],
});

export const registerWebhook = mutation({
  args: { url: v.string(), events: v.array(v.string()) },
  handler: async () => null,
});

export const setWebhookEnabled = mutation({
  args: { webhookId: v.string(), enabled: v.boolean() },
  handler: async () => null,
});
