import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { requireAdmin } from "./authHelpers";

// Submit contact form
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    serviceInterest: v.optional(v.string()),
    address: v.optional(v.object({
      street: v.string(),
      city: v.string(),
      province: v.string(),
      postalCode: v.string(),
      country: v.string(),
    })),
    projectType: v.optional(v.union(v.literal("nuova_costruzione"), v.literal("restyling"))),
    projectFeatures: v.optional(v.array(v.string())),
    projectStartDate: v.optional(v.string()),
    referralSource: v.optional(v.string()),
    privacyConsent: v.boolean(),
    marketingConsent: v.optional(v.boolean()),
    attachments: v.optional(v.array(v.object({
      storageId: v.id("_storage"),
      fileName: v.string(),
      mimeType: v.string(),
      sizeBytes: v.number(),
    }))),
  },
  handler: async (ctx, args) => {
    if (!args.privacyConsent) {
      throw new Error("Il consenso alla privacy è obbligatorio");
    }

    const normalizedEmail = args.email.trim().toLowerCase();
    const submissionId = await ctx.db.insert("contactSubmissions", {
      name: args.name,
      email: normalizedEmail,
      phone: args.phone,
      subject: args.subject,
      message: args.message,
      serviceInterest: args.serviceInterest,
      address: args.address,
      projectType: args.projectType,
      projectFeatures: args.projectFeatures,
      projectStartDate: args.projectStartDate,
      referralSource: args.referralSource,
      attachments: args.attachments,
      privacyConsent: args.privacyConsent,
      marketingConsent: args.marketingConsent,
      isRead: false,
      isReplied: false,
      createdAt: Date.now(),
    });

    // Build scheduler payloads with only the fields each function expects
    const crmPayload = {
      name: args.name,
      email: normalizedEmail,
      phone: args.phone,
      subject: args.subject,
      message: args.message,
      serviceInterest: args.serviceInterest,
      submissionId: String(submissionId),
    };

    const emailPayload = {
      submissionId: String(submissionId),
      name: args.name,
      email: normalizedEmail,
      phone: args.phone,
      subject: args.subject,
      message: args.message,
      serviceInterest: args.serviceInterest,
    };

    await ctx.scheduler.runAfter(0, internal.crm.upsertFromContactSubmission, crmPayload);
    await ctx.scheduler.runAfter(0, internal.emails.sendContactFormNotifications, emailPayload);

    return submissionId;
  },
});

// Get all submissions (admin)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_date")
      .order("desc")
      .take(100);
  },
});

// Mark as read (admin)
export const markAsRead = mutation({
  args: { submissionId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.submissionId, { isRead: true });
    return { success: true };
  },
});

// Delete contact submission (admin)
export const remove = mutation({
  args: { submissionId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.submissionId);
    return { success: true };
  },
});
