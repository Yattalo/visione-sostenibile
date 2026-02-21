import { internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const DEFAULT_TEMPLATES = [
  {
    key: "transactional-contact-admin",
    name: "Nuovo contatto - Admin",
    category: "transactional",
    subject: "[Visione Sostenibile] Nuova richiesta da {{name}}",
    html: `
<h2>Nuova richiesta contatto</h2>
<p><strong>Nome:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Telefono:</strong> {{phone}}</p>
<p><strong>Servizio:</strong> {{serviceInterest}}</p>
<p><strong>Oggetto:</strong> {{subject}}</p>
<hr />
<p>{{message}}</p>
`,
    text: "Nuova richiesta da {{name}} ({{email}}) - {{subject}}",
    isSystem: true,
  },
  {
    key: "transactional-contact-customer",
    name: "Conferma contatto - Cliente",
    category: "transactional",
    subject: "Abbiamo ricevuto la tua richiesta, {{name}}",
    html: `
<h2>Ciao {{name}}, grazie per averci scritto.</h2>
<p>Abbiamo ricevuto la tua richiesta e il team Visione Sostenibile ti rispondera a breve.</p>
<p><strong>Riepilogo:</strong> {{subject}}</p>
<p>{{message}}</p>
`,
    text: "Abbiamo ricevuto la tua richiesta e ti risponderemo a breve.",
    isSystem: true,
  },
  {
    key: "transactional-quiz-admin",
    name: "Quiz completato - Admin",
    category: "transactional",
    subject: "[Visione Sostenibile] Quiz completato da {{name}}",
    html: `
<h2>Nuovo lead da quiz</h2>
<p><strong>Nome:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Telefono:</strong> {{phone}}</p>
<p><strong>Profilo:</strong> {{resultProfile}}</p>
<p><strong>Scorecard:</strong> {{scorecardUrl}}</p>
`,
    text: "Quiz completato da {{name}} ({{email}}), profilo {{resultProfile}}",
    isSystem: true,
  },
  {
    key: "transactional-quiz-customer",
    name: "Conferma quiz - Cliente",
    category: "transactional",
    subject: "La tua scorecard verde e pronta",
    html: `
<h2>Ciao {{name}}, ecco il tuo risultato.</h2>
<p>Il tuo profilo e <strong>{{resultProfile}}</strong>.</p>
<p>Apri la tua scorecard personale:</p>
<p><a href="{{scorecardUrl}}">{{scorecardUrl}}</a></p>
`,
    text: "La tua scorecard: {{scorecardUrl}}",
    isSystem: true,
  },
  {
    key: "transactional-oneoff-standard",
    name: "Messaggio one-shot standard",
    category: "transactional",
    subject: "Aggiornamento da Visione Sostenibile",
    html: `
<h2>{{headline}}</h2>
<p>{{body}}</p>
`,
    text: "{{headline}} - {{body}}",
    isSystem: true,
  },
  {
    key: "newsletter-standard",
    name: "Newsletter standard",
    category: "newsletter",
    subject: "Novita da Visione Sostenibile",
    html: `
<h2>{{headline}}</h2>
<p>{{body}}</p>
<p><a href="{{ctaUrl}}">{{ctaLabel}}</a></p>
`,
    text: "{{headline}} - {{body}}",
    isSystem: true,
  },
] as const;

export const ensureDefaults = mutation({
  args: {},
  handler: async (ctx) => {
    let created = 0;
    for (const tmpl of DEFAULT_TEMPLATES) {
      const existing = await ctx.db
        .query("emailTemplates")
        .withIndex("by_key", (q) => q.eq("key", tmpl.key))
        .first();

      if (!existing) {
        await ctx.db.insert("emailTemplates", {
          ...tmpl,
          isActive: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        created += 1;
      }
    }

    return { created, total: DEFAULT_TEMPLATES.length };
  },
});

export const list = query({
  args: {
    category: v.optional(v.string()),
    includeInactive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("emailTemplates")
      .withIndex("by_updated")
      .order("desc")
      .take(300);

    return rows.filter((row) => {
      if (!args.includeInactive && !row.isActive) return false;
      if (args.category && row.category !== args.category) return false;
      return true;
    });
  },
});

export const getByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const key = normalizeKey(args.key);
    return await ctx.db
      .query("emailTemplates")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
  },
});

export const getByKeyInternal = internalQuery({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const key = normalizeKey(args.key);
    return await ctx.db
      .query("emailTemplates")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
  },
});

export const upsert = mutation({
  args: {
    key: v.string(),
    name: v.string(),
    category: v.string(),
    subject: v.string(),
    html: v.string(),
    text: v.optional(v.string()),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const key = normalizeKey(args.key);
    if (!key) {
      throw new Error("Chiave template non valida");
    }

    const existing = await ctx.db
      .query("emailTemplates")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();

    const payload = {
      key,
      name: args.name.trim(),
      category: args.category.trim().toLowerCase(),
      subject: args.subject,
      html: args.html,
      text: args.text,
      isActive: args.isActive,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, payload);
      return existing._id;
    }

    return await ctx.db.insert("emailTemplates", {
      ...payload,
      isSystem: false,
      createdAt: Date.now(),
    });
  },
});

export const toggleActive = mutation({
  args: {
    id: v.id("emailTemplates"),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isActive: args.isActive,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const remove = mutation({
  args: { id: v.id("emailTemplates") },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.id);
    if (!template) return { success: false };
    if (template.isSystem) {
      throw new Error("I template di sistema non possono essere eliminati");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
