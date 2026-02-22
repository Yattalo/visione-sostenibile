import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

function generateScorecardId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "sc_";
  for (let i = 0; i < 16; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function computeProfileFromScore(scores: number[]): string {
  const buckets: Record<string, number> = {
    Contemplativo: 0,
    Sostenibile: 0,
    Familiare: 0,
    Rappresentativo: 0,
  };

  const map: Record<number, keyof typeof buckets> = {
    1: "Contemplativo",
    2: "Sostenibile",
    3: "Familiare",
    4: "Rappresentativo",
  };

  for (const score of scores) {
    const profile = map[score];
    if (profile) buckets[profile] += 1;
  }

  return Object.entries(buckets).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Sostenibile";
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
    const normalizedEmail = args.email.trim().toLowerCase();
    const scorecardId = generateScorecardId();
    const resultProfile = computeProfileFromScore(args.quizAnswers.map((a) => a.score));
    const leadId = await ctx.db.insert("leads", {
      ...args,
      email: normalizedEmail,
      scorecardId,
      createdAt: Date.now(),
      isContacted: false,
    });

    await ctx.scheduler.runAfter(0, internal.crm.upsertFromQuizLead, {
      leadId: String(leadId),
      scorecardId,
      name: args.name,
      email: normalizedEmail,
      phone: args.phone,
      resultProfile,
    });

    await ctx.scheduler.runAfter(0, internal.emails.sendQuizNotifications, {
      leadId: String(leadId),
      scorecardId,
      name: args.name,
      email: normalizedEmail,
      phone: args.phone,
      resultProfile,
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
