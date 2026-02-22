import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

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
    const submissionId = await ctx.db.insert("contactSubmissions", {
      ...args,
      isRead: false,
      isReplied: false,
      createdAt: Date.now(),
    });

    const payload = {
      ...args,
      submissionId: String(submissionId),
    };

    await ctx.scheduler.runAfter(0, internal.crm.upsertFromContactSubmission, payload);
    await ctx.scheduler.runAfter(0, internal.emails.sendContactFormNotifications, payload);

    return submissionId;
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

// Delete contact submission (admin)
export const remove = mutation({
  args: { submissionId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.submissionId);
    return { success: true };
  },
});
