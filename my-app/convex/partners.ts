import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Submit partner form
export const submit = mutation({
  args: {
    companyName: v.string(),
    contactName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    partnershipType: v.string(),
    message: v.string(),
    privacyConsent: v.boolean(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = args.email.trim().toLowerCase();

    const partnerId = await ctx.db.insert("partners", {
      companyName: args.companyName.trim(),
      contactName: args.contactName.trim(),
      email: normalizedEmail,
      phone: args.phone?.trim(),
      partnershipType: args.partnershipType,
      message: args.message.trim(),
      privacyConsent: args.privacyConsent,
      isRead: false,
      isContacted: false,
      createdAt: Date.now(),
    });

    return partnerId;
  },
});

// Get all partner submissions (admin)
export const getAllForAdmin = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("partners")
      .order("desc")
      .take(100);
  },
});
