// Dashboard: agents module — derives agent info from agentTasks
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

const TABLE = "agentTasks" as const;
const PID = "visione-sostenibile" as const;

export const stats = query({
  args: { projectId: v.optional(v.string()) },
  handler: async (ctx, { projectId }) => {
    const scope = projectId ?? PID;
    const all = await ctx.db.query(TABLE).withIndex("by_projectId", (q) => q.eq("projectId", scope)).collect();
    const agents: Record<string, { total: number; done: number; inProgress: number; blocked: number; todo: number }> = {};
    for (const t of all) {
      if (!agents[t.agent]) agents[t.agent] = { total: 0, done: 0, inProgress: 0, blocked: 0, todo: 0 };
      agents[t.agent].total++;
      if (t.status === "done") agents[t.agent].done++;
      if (t.status === "in_progress") agents[t.agent].inProgress++;
      if (t.status === "blocked") agents[t.agent].blocked++;
      if (t.status === "todo") agents[t.agent].todo++;
    }
    return { agents };
  },
});

export const list = query({
  args: { projectId: v.optional(v.string()) },
  handler: async (ctx, { projectId }) => {
    const scope = projectId ?? PID;
    const all = await ctx.db.query(TABLE).withIndex("by_projectId", (q) => q.eq("projectId", scope)).collect();
    const agentNames = [...new Set(all.map((t) => t.agent))];
    return agentNames.map((name) => {
      const tasks = all.filter((t) => t.agent === name);
      const done = tasks.filter((t) => t.status === "done").length;
      return {
        agent: name,
        agentId: name,
        status: tasks.some((t) => t.status === "in_progress") ? "active" : "idle",
        total: tasks.length,
        done,
        inProgress: tasks.filter((t) => t.status === "in_progress").length,
        blocked: tasks.filter((t) => t.status === "blocked").length,
        percentComplete: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
      };
    });
  },
});

export const updateStatus = mutation({
  args: { agent: v.string(), status: v.string() },
  handler: async () => ({ ok: true }),
});
