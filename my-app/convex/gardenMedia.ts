/* eslint-disable @typescript-eslint/no-explicit-any */
import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// ── Resolve storage URLs ──
async function resolveStorageUrl(
  ctx: any,
  storageId: any
): Promise<string | null> {
  return await ctx.storage.getUrl(storageId);
}

// ── Renderings (admin uploads for clients) ──

export const addRendering = mutation({
  args: {
    clientAccountId: v.id("clientAccounts"),
    title: v.string(),
    description: v.optional(v.string()),
    storageId: v.id("_storage"),
    mimeType: v.string(),
    fileName: v.string(),
    sizeBytes: v.number(),
    notifyClient: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const account = await ctx.db.get(args.clientAccountId);
    if (!account) throw new Error("Account cliente non trovato");

    const renderingId = await ctx.db.insert("gardenRenderings", {
      clientAccountId: args.clientAccountId,
      title: args.title,
      description: args.description,
      storageId: args.storageId,
      mimeType: args.mimeType,
      fileName: args.fileName,
      sizeBytes: args.sizeBytes,
      uploadedBy: "admin",
      createdAt: Date.now(),
    });

    // Notify client via email if requested
    if (args.notifyClient !== false) {
      await ctx.scheduler.runAfter(
        0,
        internal.gardenMedia.notifyRenderingReady,
        {
          clientAccountId: args.clientAccountId,
          renderingTitle: args.title,
        }
      );
    }

    return renderingId;
  },
});

export const listRenderings = query({
  args: { clientAccountId: v.id("clientAccounts") },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("gardenRenderings")
      .withIndex("by_client", (q) =>
        q.eq("clientAccountId", args.clientAccountId)
      )
      .order("desc")
      .take(100);

    return await Promise.all(
      rows.map(async (row) => ({
        ...row,
        url: await resolveStorageUrl(ctx, row.storageId),
      }))
    );
  },
});

export const removeRendering = mutation({
  args: { id: v.id("gardenRenderings") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) return { success: false };

    await ctx.db.delete(args.id);
    await ctx.storage.delete(existing.storageId);
    return { success: true };
  },
});

// ── Photos (client uploads) ──

export const addPhoto = mutation({
  args: {
    clientAccountId: v.id("clientAccounts"),
    caption: v.optional(v.string()),
    storageId: v.id("_storage"),
    mimeType: v.string(),
    fileName: v.string(),
    sizeBytes: v.number(),
  },
  handler: async (ctx, args) => {
    const account = await ctx.db.get(args.clientAccountId);
    if (!account) throw new Error("Account non trovato");

    return await ctx.db.insert("gardenPhotos", {
      clientAccountId: args.clientAccountId,
      caption: args.caption,
      storageId: args.storageId,
      mimeType: args.mimeType,
      fileName: args.fileName,
      sizeBytes: args.sizeBytes,
      uploadedBy: "client",
      createdAt: Date.now(),
    });
  },
});

export const listPhotos = query({
  args: { clientAccountId: v.id("clientAccounts") },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("gardenPhotos")
      .withIndex("by_client", (q) =>
        q.eq("clientAccountId", args.clientAccountId)
      )
      .order("desc")
      .take(100);

    return await Promise.all(
      rows.map(async (row) => ({
        ...row,
        url: await resolveStorageUrl(ctx, row.storageId),
      }))
    );
  },
});

export const removePhoto = mutation({
  args: { id: v.id("gardenPhotos") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) return { success: false };

    await ctx.db.delete(args.id);
    await ctx.storage.delete(existing.storageId);
    return { success: true };
  },
});

// ── Counts (for dashboard) ──

export const getCounts = query({
  args: { clientAccountId: v.id("clientAccounts") },
  handler: async (ctx, args) => {
    const renderings = await ctx.db
      .query("gardenRenderings")
      .withIndex("by_client", (q) =>
        q.eq("clientAccountId", args.clientAccountId)
      )
      .collect();

    const photos = await ctx.db
      .query("gardenPhotos")
      .withIndex("by_client", (q) =>
        q.eq("clientAccountId", args.clientAccountId)
      )
      .collect();

    return {
      renderingCount: renderings.length,
      photoCount: photos.length,
    };
  },
});

// ── Internal: notify client that rendering is ready ──

export const notifyRenderingReady = internalMutation({
  args: {
    clientAccountId: v.id("clientAccounts"),
    renderingTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const account = await ctx.db.get(args.clientAccountId);
    if (!account) return;

    const siteUrl =
      process.env.SITE_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.visionesostenibile.it";

    await ctx.scheduler.runAfter(0, internal.emails.deliverRaw, {
      to: account.email,
      subject: `Il tuo rendering "${args.renderingTitle}" è pronto! — Visione Sostenibile`,
      html: `
<h2>Ciao ${account.name},</h2>
<p>Andrea ha preparato un nuovo rendering per il tuo giardino: <strong>${args.renderingTitle}</strong></p>
<p>Accedi alla tua Area Clienti per visualizzarlo:</p>
<p style="text-align:center;margin:32px 0;">
  <a href="${siteUrl}/area-clienti" style="display:inline-block;padding:14px 32px;background:#22582C;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:bold;font-size:16px;">
    Visualizza il Rendering
  </a>
</p>
<p style="font-size:13px;color:#6b7280;">
  Non dimenticare di caricare le foto del tuo giardino attuale per aiutarci nella progettazione!
</p>
`,
      text: `Il tuo rendering "${args.renderingTitle}" è pronto. Accedi: ${siteUrl}/area-clienti`,
      relatedType: "clientAccount",
      relatedId: String(args.clientAccountId),
      createdBy: "system",
      wrapBrand: true,
    });
  },
});
