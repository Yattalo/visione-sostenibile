import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submit = mutation({
  args: {
    answers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
      })
    ),
    resultProfile: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quizSubmissions", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("quizSubmissions")
      .withIndex("by_date")
      .order("desc")
      .take(100);
  },
});
