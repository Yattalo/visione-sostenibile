import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

function generateScorecardId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "sc_";
  for (let i = 0; i < 16; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

// Submit quiz lead (public — micro-funnel completion)
export const submit = mutation({
  args: {
    quizAnswers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
        score: v.number(),
      })
    ),
    totalScore: v.number(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const scorecardId = generateScorecardId();
    await ctx.db.insert("leads", {
      ...args,
      scorecardId,
      createdAt: Date.now(),
      isContacted: false,
    });
    return { scorecardId };
  },
});

// Get lead by scorecard ID (public — scorecard page /scorecard/[id])
export const getByScorecard = query({
  args: { scorecardId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_scorecardId", (q) => q.eq("scorecardId", args.scorecardId))
      .first();
  },
});

// Get all leads ordered by date (admin)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("leads")
      .withIndex("by_date")
      .order("desc")
      .take(200);
  },
});

// Mark lead as contacted (admin)
export const markContacted = mutation({
  args: { leadId: v.id("leads") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, { isContacted: true });
    return { success: true };
  },
});

// Add notes to a lead (admin)
export const addNotes = mutation({
  args: {
    leadId: v.id("leads"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, { notes: args.notes });
    return { success: true };
  },
});
