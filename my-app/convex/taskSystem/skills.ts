// Dashboard: skills module — file-based, returns empty
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const listSkills = query({
  args: { projectId: v.optional(v.string()) },
  handler: async () => [],
});

export const listAgentSkills = query({
  args: { agentId: v.optional(v.string()), projectId: v.optional(v.string()) },
  handler: async () => [],
});

export const toggleAgentSkill = mutation({
  args: { skillId: v.string(), agent: v.string(), enabled: v.boolean() },
  handler: async () => null,
});
