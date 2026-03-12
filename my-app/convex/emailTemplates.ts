import { internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authHelpers";

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
    subject: "[VS] Nuovo lead: {{name}} — profilo {{resultProfile}}",
    html: `
<h2 style="color:#0B1E0E;">Nuovo lead dal quiz</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;width:120px;">Nome</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">{{name}}</td></tr>
  <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;"><a href="mailto:{{email}}">{{email}}</a></td></tr>
  <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;">Telefono</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">{{phone}}</td></tr>
  <tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:bold;">Profilo</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;"><strong style="color:#22582C;">{{resultProfile}}</strong></td></tr>
</table>
{{photoSection}}
<p style="margin-top:16px;"><a href="{{scorecardUrl}}" style="display:inline-block;padding:10px 20px;background:#22582C;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Vedi Scorecard</a></p>
<p style="font-size:12px;color:#6b7280;margin-top:16px;">Rispondi entro 48h con il rendering personalizzato.</p>
`,
    text: "Nuovo lead: {{name}} ({{email}}), tel: {{phone}}, profilo {{resultProfile}}. Scorecard: {{scorecardUrl}}",
    isSystem: true,
  },
  {
    key: "transactional-quiz-customer",
    name: "Conferma quiz - Cliente",
    category: "transactional",
    subject: "{{name}}, la tua scorecard verde e pronta",
    html: `
<h2 style="color:#0B1E0E;">Ciao {{name}},</h2>
<p>Grazie per aver completato il quiz. Il tuo profilo verde e <strong style="color:#22582C;">{{resultProfile}}</strong>.</p>
<p>Abbiamo preparato una scorecard personalizzata con:</p>
<ul>
  <li>I tuoi punti di forza</li>
  <li>Le priorita su cui intervenire</li>
  <li>I servizi consigliati per il tuo spazio verde</li>
</ul>
<p style="margin-top:16px;"><a href="{{scorecardUrl}}" style="display:inline-block;padding:12px 24px;background:#EAB831;color:#0B1E0E;text-decoration:none;border-radius:8px;font-weight:bold;">Apri la tua Scorecard</a></p>
<p style="font-size:13px;color:#6b7280;margin-top:20px;">Vuoi fare il passo successivo? Prenota un <strong>Check-up Sostenibile</strong> gratuito: analizziamo il tuo giardino e ti lasciamo 3 priorita concrete.</p>
<p><a href="https://www.visionesostenibile.it/contatti" style="color:#22582C;font-weight:bold;">Prenota il Check-up</a></p>
`,
    text: "Ciao {{name}}, il tuo profilo e {{resultProfile}}. Apri la tua scorecard: {{scorecardUrl}}",
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

/**
 * One-time migration: refresh system templates with latest content from code.
 * Run manually: npx convex run emailTemplates:refreshSystemTemplates '{}'
 * Safe to re-run — only updates isSystem templates that differ.
 */
export const refreshSystemTemplates = mutation({
  args: {},
  handler: async (ctx) => {
    let updated = 0;
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
      } else if (existing.isSystem) {
        // Update only if content actually changed
        if (
          existing.subject !== tmpl.subject ||
          existing.html !== tmpl.html ||
          existing.text !== tmpl.text ||
          existing.name !== tmpl.name
        ) {
          await ctx.db.patch(existing._id, {
            subject: tmpl.subject,
            html: tmpl.html,
            text: tmpl.text,
            name: tmpl.name,
            updatedAt: Date.now(),
          });
          updated += 1;
        }
      }
      // Skip non-system templates (user-customized)
    }

    return { updated, created, total: DEFAULT_TEMPLATES.length };
  },
});

export const list = query({
  args: {
    category: v.optional(v.string()),
    includeInactive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
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
    await requireAdmin(ctx);
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
    await requireAdmin(ctx);
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
    await requireAdmin(ctx);
    const template = await ctx.db.get(args.id);
    if (!template) return { success: false };
    if (template.isSystem) {
      throw new Error("I template di sistema non possono essere eliminati");
    }
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
