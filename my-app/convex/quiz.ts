import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { findUserForIdentity } from "./userHelpers";

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
    privacyConsent: v.optional(v.boolean()),
    marketingConsent: v.optional(v.boolean()),
    source: v.string(),
    guestSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const authenticatedUser = identity ? await findUserForIdentity(ctx, identity) : null;
    return await ctx.db.insert("quizSubmissions", {
      ...args,
      email: args.email?.trim().toLowerCase(),
      userId: authenticatedUser?._id,
      claimedAt: authenticatedUser ? Date.now() : undefined,
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
