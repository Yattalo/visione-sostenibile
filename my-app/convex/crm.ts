/* eslint-disable @typescript-eslint/no-explicit-any */
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

type UpsertInput = {
  name: string;
  email: string;
  phone?: string;
  source: string;
};

async function upsertContact(ctx: any, data: UpsertInput) {
  const email = normalizeEmail(data.email);
  const now = Date.now();

  const existing = await ctx.db
    .query("crmContacts")
    .withIndex("by_email", (q: any) => q.eq("email", email))
    .first();

  if (existing) {
    await ctx.db.patch(existing._id, {
      name: data.name || existing.name,
      phone: data.phone || existing.phone,
      source: existing.source || data.source,
      lastInteractionAt: now,
      updatedAt: now,
    });
    return existing._id;
  }

  return await ctx.db.insert("crmContacts", {
    name: data.name,
    email,
    phone: data.phone,
    source: data.source,
    status: "new",
    tags: [],
    lastInteractionAt: now,
    createdAt: now,
    updatedAt: now,
  });
}

async function createActivity(
  ctx: any,
  contactId: any,
  type: string,
  title: string,
  description?: string,
  payload?: Record<string, unknown>,
  createdBy?: string
) {
  const now = Date.now();
  await ctx.db.insert("crmActivities", {
    contactId,
    type,
    title,
    description,
    payload: payload ? JSON.stringify(payload) : undefined,
    createdBy,
    createdAt: now,
  });

  await ctx.db.patch(contactId, {
    lastInteractionAt: now,
    updatedAt: now,
  });
}

export const upsertFromContactSubmission = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    serviceInterest: v.optional(v.string()),
    submissionId: v.string(),
  },
  handler: async (ctx, args) => {
    const contactId = await upsertContact(ctx, {
      name: args.name,
      email: args.email,
      phone: args.phone,
      source: "contact_form",
    });

    await createActivity(
      ctx,
      contactId,
      "contact_form",
      "Form contatti compilato",
      args.subject,
      {
        submissionId: args.submissionId,
        serviceInterest: args.serviceInterest,
        message: args.message,
      }
    );

    return { contactId };
  },
});

export const upsertFromQuizLead = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    resultProfile: v.string(),
    scorecardId: v.string(),
    leadId: v.string(),
  },
  handler: async (ctx, args) => {
    const contactId = await upsertContact(ctx, {
      name: args.name,
      email: args.email,
      phone: args.phone,
      source: "quiz",
    });

    await createActivity(
      ctx,
      contactId,
      "quiz_completion",
      "Quiz completato",
      `Profilo: ${args.resultProfile}`,
      {
        leadId: args.leadId,
        scorecardId: args.scorecardId,
      }
    );

    return { contactId };
  },
});

export const logEmailActivity = internalMutation({
  args: {
    contactId: v.optional(v.id("crmContacts")),
    email: v.optional(v.string()),
    title: v.string(),
    description: v.optional(v.string()),
    payload: v.optional(v.string()),
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let contactId = args.contactId;

    if (!contactId && args.email) {
      const byEmail = await ctx.db
        .query("crmContacts")
        .withIndex("by_email", (q) => q.eq("email", normalizeEmail(args.email!)))
        .first();
      contactId = byEmail?._id;
    }

    if (!contactId) {
      return { success: false };
    }

    await createActivity(
      ctx,
      contactId,
      "email_sent",
      args.title,
      args.description,
      args.payload ? JSON.parse(args.payload) : undefined,
      args.createdBy
    );

    return { success: true, contactId };
  },
});

export const listContacts = query({
  args: {
    search: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 200, 500);
    const rows = await ctx.db
      .query("crmContacts")
      .withIndex("by_last_interaction")
      .order("desc")
      .take(limit);

    const search = args.search?.trim().toLowerCase();

    return rows.filter((row) => {
      if (args.status && row.status !== args.status) return false;
      if (!search) return true;
      return (
        row.name.toLowerCase().includes(search) ||
        row.email.toLowerCase().includes(search) ||
        (row.phone ?? "").toLowerCase().includes(search)
      );
    });
  },
});

export const getContactDetail = query({
  args: { contactId: v.id("crmContacts") },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.contactId);
    if (!contact) return null;

    const activities = await ctx.db
      .query("crmActivities")
      .withIndex("by_contact_date", (q) => q.eq("contactId", args.contactId))
      .order("desc")
      .take(100);

    const submissions = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_email_date", (q) => q.eq("email", contact.email))
      .order("desc")
      .take(50);

    const leads = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", contact.email))
      .take(50);

    const deliveries = await ctx.db
      .query("emailDeliveries")
      .withIndex("by_to_date", (q) => q.eq("to", contact.email))
      .order("desc")
      .take(50);

    return {
      contact,
      activities,
      submissions,
      leads,
      deliveries,
    };
  },
});

export const updateContact = mutation({
  args: {
    contactId: v.id("crmContacts"),
    name: v.string(),
    phone: v.optional(v.string()),
    status: v.string(),
    notes: v.optional(v.string()),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.contactId, {
      name: args.name,
      phone: args.phone,
      status: args.status,
      notes: args.notes,
      tags: args.tags,
      updatedAt: Date.now(),
    });

    await createActivity(
      ctx,
      args.contactId,
      "note",
      "Scheda cliente aggiornata",
      "Aggiornamento manuale dati CRM",
      { status: args.status, tags: args.tags }
    );

    return { success: true };
  },
});

export const addNote = mutation({
  args: {
    contactId: v.id("crmContacts"),
    note: v.string(),
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await createActivity(
      ctx,
      args.contactId,
      "note",
      "Nota CRM",
      args.note,
      undefined,
      args.createdBy
    );

    const contact = await ctx.db.get(args.contactId);
    if (contact) {
      const joined = [contact.notes, args.note].filter(Boolean).join("\n\n");
      await ctx.db.patch(args.contactId, {
        notes: joined,
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});
