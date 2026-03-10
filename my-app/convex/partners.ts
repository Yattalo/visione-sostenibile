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

// Get approved partners for public showcase
export const getApprovedPartners = query({
  args: {},
  handler: async (ctx) => {
    const partners = await ctx.db
      .query("partners")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .order("desc")
      .collect();

    // Return only public-safe fields (no email, phone, message)
    return partners.map((p) => ({
      _id: p._id,
      companyName: p.companyName,
      partnershipType: p.partnershipType,
      publicDescription: p.publicDescription,
      website: p.website,
      logo: p.logo,
      specialties: p.specialties,
      createdAt: p.createdAt,
    }));
  },
});

// Admin: approve a partner for public display
export const approvePartner = mutation({
  args: {
    partnerId: v.id("partners"),
    publicDescription: v.optional(v.string()),
    website: v.optional(v.string()),
    logo: v.optional(v.string()),
    specialties: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const partner = await ctx.db.get(args.partnerId);
    if (!partner) throw new Error("Partner not found");

    await ctx.db.patch(args.partnerId, {
      isApproved: true,
      ...(args.publicDescription !== undefined && {
        publicDescription: args.publicDescription,
      }),
      ...(args.website !== undefined && { website: args.website }),
      ...(args.logo !== undefined && { logo: args.logo }),
      ...(args.specialties !== undefined && {
        specialties: args.specialties,
      }),
    });
  },
});

// Admin: revoke a partner's public approval
export const revokeApproval = mutation({
  args: {
    partnerId: v.id("partners"),
  },
  handler: async (ctx, args) => {
    const partner = await ctx.db.get(args.partnerId);
    if (!partner) throw new Error("Partner not found");

    await ctx.db.patch(args.partnerId, {
      isApproved: false,
    });
  },
});
