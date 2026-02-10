import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Submit contact form
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    serviceInterest: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactSubmissions", {
      ...args,
      isRead: false,
      isReplied: false,
      createdAt: Date.now(),
    });
  },
});

// Get all submissions (admin)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contactSubmissions").order("desc").take(100);
  },
});

// Mark as read (admin)
export const markAsRead = mutation({
  args: { submissionId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.submissionId, { isRead: true });
    return { success: true };
  },
});
