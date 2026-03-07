import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { normalizeEmail } from "./authHelpers";
import { upsertUserForIdentity } from "./userHelpers";

export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    return user;
  },
});

export const syncCurrentUser = mutation({
  args: {
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Autenticazione richiesta");
    }

    const user = await upsertUserForIdentity(ctx, identity, args);
    return user._id;
  },
});

export const claimGuestRecords = mutation({
  args: {
    guestSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Autenticazione richiesta");
    }

    const user = await upsertUserForIdentity(ctx, identity);
    const normalizedEmail = normalizeEmail(user.email);
    const now = Date.now();

    const leadsByEmail = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .collect();
    const leadsByGuest = args.guestSessionId
      ? await ctx.db
          .query("leads")
          .withIndex("by_guest_session", (q) => q.eq("guestSessionId", args.guestSessionId!))
          .collect()
      : [];

    const quizByEmail = await ctx.db
      .query("quizSubmissions")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .collect();
    const quizByGuest = args.guestSessionId
      ? await ctx.db
          .query("quizSubmissions")
          .withIndex("by_guest_session", (q) => q.eq("guestSessionId", args.guestSessionId!))
          .collect()
      : [];

    const seenLeadIds = new Set<string>();
    let claimedLeads = 0;
    for (const lead of [...leadsByEmail, ...leadsByGuest]) {
      const key = String(lead._id);
      if (seenLeadIds.has(key)) continue;
      seenLeadIds.add(key);

      if (lead.userId === user._id && lead.claimedAt) continue;

      await ctx.db.patch(lead._id, {
        userId: user._id,
        claimedAt: now,
      });
      claimedLeads += 1;
    }

    const seenQuizIds = new Set<string>();
    let claimedQuizSubmissions = 0;
    for (const submission of [...quizByEmail, ...quizByGuest]) {
      const key = String(submission._id);
      if (seenQuizIds.has(key)) continue;
      seenQuizIds.add(key);

      if (submission.userId === user._id && submission.claimedAt) continue;

      await ctx.db.patch(submission._id, {
        userId: user._id,
        claimedAt: now,
      });
      claimedQuizSubmissions += 1;
    }

    const contact = await ctx.db
      .query("crmContacts")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (contact && contact.userId !== user._id) {
      await ctx.db.patch(contact._id, {
        userId: user._id,
        updatedAt: now,
      });
    }

    return {
      userId: user._id,
      claimedLeads,
      claimedQuizSubmissions,
      linkedContact: Boolean(contact),
    };
  },
});
