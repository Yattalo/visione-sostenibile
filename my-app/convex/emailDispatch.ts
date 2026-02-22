import { mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

function ensureEmailProviderConfigured() {
  const missing: string[] = [];
  if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (!process.env.EMAIL_FROM) missing.push("EMAIL_FROM");

  if (missing.length > 0) {
    throw new Error(
      `Configurazione email mancante: ${missing.join(", ")}`
    );
  }
}

export const sendOneOff = mutation({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.optional(v.string()),
    crmContactId: v.optional(v.id("crmContacts")),
    relatedType: v.optional(v.string()),
    relatedId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    ensureEmailProviderConfigured();

    await ctx.scheduler.runAfter(0, internal.emails.deliverRaw, {
      to: args.to.trim().toLowerCase(),
      subject: args.subject,
      html: args.html,
      text: args.text,
      crmContactId: args.crmContactId,
      relatedType: args.relatedType,
      relatedId: args.relatedId,
      createdBy: "admin-manual",
      wrapBrand: true,
    });

    return { queued: true };
  },
});

export const sendWithTemplate = mutation({
  args: {
    to: v.string(),
    templateKey: v.string(),
    variablesJson: v.optional(v.string()),
    crmContactId: v.optional(v.id("crmContacts")),
    relatedType: v.optional(v.string()),
    relatedId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    ensureEmailProviderConfigured();

    await ctx.scheduler.runAfter(0, internal.emails.deliverTemplate, {
      to: args.to.trim().toLowerCase(),
      templateKey: args.templateKey.trim(),
      variablesJson: args.variablesJson,
      crmContactId: args.crmContactId,
      relatedType: args.relatedType,
      relatedId: args.relatedId,
      createdBy: "admin-template",
    });

    return { queued: true };
  },
});
