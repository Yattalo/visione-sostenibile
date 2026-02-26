import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

// ── Magic Link: request ──
export const requestMagicLink = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const normalized = normalizeEmail(email);

    // Check that a lead or crm contact exists with this email
    const lead = await ctx.db
      .query("leads")
      .withIndex("by_email", (q) => q.eq("email", normalized))
      .first();

    const crmContact = await ctx.db
      .query("crmContacts")
      .withIndex("by_email", (q) => q.eq("email", normalized))
      .first();

    if (!lead && !crmContact) {
      // Don't reveal whether the email exists — silently succeed
      return { success: true };
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

    await ctx.db.insert("clientMagicLinks", {
      email: normalized,
      token,
      createdAt: Date.now(),
      expiresAt,
    });

    // Send magic link email via scheduled action
    await ctx.scheduler.runAfter(0, internal.clientAuth.sendMagicLinkEmail, {
      email: normalized,
      token,
      name: lead?.name ?? crmContact?.name ?? "",
    });

    return { success: true };
  },
});

// ── Magic Link: verify + create session ──
export const verifyMagicLink = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const magicLink = await ctx.db
      .query("clientMagicLinks")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!magicLink) {
      return { success: false, error: "Link non valido" };
    }

    if (magicLink.usedAt) {
      return { success: false, error: "Link già utilizzato" };
    }

    if (magicLink.expiresAt < Date.now()) {
      return { success: false, error: "Link scaduto" };
    }

    // Mark magic link as used
    await ctx.db.patch(magicLink._id, { usedAt: Date.now() });

    const email = magicLink.email;

    // Find or create client account
    let account = await ctx.db
      .query("clientAccounts")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!account) {
      // Auto-create from lead/crm data
      const lead = await ctx.db
        .query("leads")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      const crmContact = await ctx.db
        .query("crmContacts")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      const now = Date.now();
      const accountId = await ctx.db.insert("clientAccounts", {
        email,
        name: lead?.name ?? crmContact?.name ?? email,
        phone: lead?.phone ?? crmContact?.phone,
        crmContactId: crmContact?._id,
        leadId: lead?._id,
        scorecardId: lead?.scorecardId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });

      account = await ctx.db.get(accountId);
    } else if (!account.isActive) {
      // Reactivate
      await ctx.db.patch(account._id, {
        isActive: true,
        updatedAt: Date.now(),
      });
    }

    if (!account) {
      return { success: false, error: "Errore creazione account" };
    }

    // Create session (7 days)
    const sessionToken = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

    await ctx.db.insert("clientSessions", {
      accountId: account._id,
      token: sessionToken,
      createdAt: Date.now(),
      expiresAt,
      isActive: true,
    });

    return {
      success: true,
      token: sessionToken,
      expiresAt,
      account: {
        name: account.name,
        email: account.email,
        scorecardId: account.scorecardId,
      },
    };
  },
});

// ── Validate client session ──
export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    if (!token) return { valid: false, account: null };

    const session = await ctx.db
      .query("clientSessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session || !session.isActive || session.expiresAt < Date.now()) {
      return { valid: false, account: null };
    }

    const account = await ctx.db.get(session.accountId);
    if (!account || !account.isActive) {
      return { valid: false, account: null };
    }

    return {
      valid: true,
      account: {
        _id: account._id,
        name: account.name,
        email: account.email,
        phone: account.phone,
        scorecardId: account.scorecardId,
        leadId: account.leadId,
        crmContactId: account.crmContactId,
      },
    };
  },
});

// ── Logout ──
export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("clientSessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (session) {
      await ctx.db.patch(session._id, { isActive: false });
    }
  },
});

// ── Get account by email (admin helper) ──
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    return await ctx.db
      .query("clientAccounts")
      .withIndex("by_email", (q) => q.eq("email", normalizeEmail(email)))
      .first();
  },
});

// ── Get account by CRM contact (admin helper) ──
export const getByCrmContact = query({
  args: { crmContactId: v.id("crmContacts") },
  handler: async (ctx, { crmContactId }) => {
    return await ctx.db
      .query("clientAccounts")
      .withIndex("by_crmContact", (q) => q.eq("crmContactId", crmContactId))
      .first();
  },
});

// ── Create/invite client from admin CRM ──
export const inviteFromCrm = mutation({
  args: {
    crmContactId: v.id("crmContacts"),
  },
  handler: async (ctx, { crmContactId }) => {
    const contact = await ctx.db.get(crmContactId);
    if (!contact) throw new Error("Contatto CRM non trovato");

    const email = normalizeEmail(contact.email);

    // Check if account already exists
    let account = await ctx.db
      .query("clientAccounts")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!account) {
      // Find linked lead
      const lead = await ctx.db
        .query("leads")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      const now = Date.now();
      const accountId = await ctx.db.insert("clientAccounts", {
        email,
        name: contact.name,
        phone: contact.phone,
        crmContactId: contact._id,
        leadId: lead?._id,
        scorecardId: lead?.scorecardId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      account = await ctx.db.get(accountId);
    }

    // Generate magic link and send invitation
    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days for invitation

    await ctx.db.insert("clientMagicLinks", {
      email,
      token,
      createdAt: Date.now(),
      expiresAt,
    });

    await ctx.scheduler.runAfter(0, internal.clientAuth.sendMagicLinkEmail, {
      email,
      token,
      name: contact.name,
    });

    return { success: true, accountId: account?._id };
  },
});

// ── Internal: send magic link email ──
export const sendMagicLinkEmail = internalMutation({
  args: {
    email: v.string(),
    token: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const siteUrl =
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.visionesostenibile.it";

    const magicLinkUrl = `${siteUrl}/area-clienti/verify?token=${args.token}`;

    await ctx.scheduler.runAfter(0, internal.emails.deliverRaw, {
      to: args.email,
      subject: "Accedi alla tua Area Clienti — Visione Sostenibile",
      html: `
<h2>Ciao ${args.name || ""},</h2>
<p>Clicca il pulsante qui sotto per accedere alla tua Area Clienti personale:</p>
<p style="text-align:center;margin:32px 0;">
  <a href="${magicLinkUrl}" style="display:inline-block;padding:14px 32px;background:#22582C;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:bold;font-size:16px;">
    Accedi all'Area Clienti
  </a>
</p>
<p style="font-size:13px;color:#6b7280;">
  Il link è valido per 30 minuti. Se non hai richiesto l'accesso, ignora questa email.
</p>
`,
      text: `Accedi alla tua Area Clienti: ${magicLinkUrl}`,
      relatedType: "clientAccount",
      createdBy: "system",
      wrapBrand: true,
    });
  },
});
