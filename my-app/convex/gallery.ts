import { query, mutation, type QueryCtx, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

const mediaTypeValidator = v.union(v.literal("image"), v.literal("video"));

function inferMediaType(mimeType?: string, url?: string): "image" | "video" {
  if (mimeType?.startsWith("video/")) return "video";
  if (mimeType?.startsWith("image/")) return "image";

  const normalized = (url ?? "").toLowerCase();
  if (
    normalized.endsWith(".mp4") ||
    normalized.endsWith(".webm") ||
    normalized.endsWith(".mov") ||
    normalized.endsWith(".m4v") ||
    normalized.endsWith(".avi")
  ) {
    return "video";
  }
  return "image";
}

async function resolveAssetUrls<
  T extends {
    imageUrl?: string;
    storageId?: Id<"_storage">;
    mediaType?: "image" | "video";
    mimeType?: string;
  },
>(ctx: QueryCtx, rows: T[]): Promise<(T & { imageUrl: string; mediaType: "image" | "video" })[]> {
  return await Promise.all(
    rows.map(async (row) => {
      const storageUrl = row.storageId
        ? await ctx.storage.getUrl(row.storageId)
        : null;

      return {
        ...row,
        imageUrl: storageUrl ?? row.imageUrl ?? "",
        mediaType: row.mediaType ?? inferMediaType(row.mimeType, row.imageUrl),
      };
    })
  );
}

async function hasBlogStorageReference(
  ctx: MutationCtx,
  storageId: Id<"_storage">
): Promise<boolean> {
  const row = await ctx.db
    .query("blogPosts")
    .filter((q) => q.eq(q.field("coverStorageId"), storageId))
    .first();
  return Boolean(row);
}

async function hasGalleryStorageReference(
  ctx: MutationCtx,
  storageId: Id<"_storage">
): Promise<boolean> {
  const row = await ctx.db
    .query("gallery")
    .filter((q) => q.eq(q.field("storageId"), storageId))
    .first();
  return Boolean(row);
}

async function deleteStorageIfUnreferenced(
  ctx: MutationCtx,
  storageId: Id<"_storage">
): Promise<boolean> {
  const [referencedByBlog, referencedByGallery] = await Promise.all([
    hasBlogStorageReference(ctx, storageId),
    hasGalleryStorageReference(ctx, storageId),
  ]);

  if (referencedByBlog || referencedByGallery) {
    return false;
  }

  await ctx.storage.delete(storageId);
  return true;
}

// Get all active gallery images
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("gallery")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("asc")
      .take(200);
    return await resolveAssetUrls(ctx, rows);
  },
});

// Get gallery by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("gallery")
      .withIndex("by_category", (q) =>
        q.eq("category", args.category).eq("isActive", true)
      )
      .order("asc")
      .take(100);
    return await resolveAssetUrls(ctx, rows);
  },
});

// Get gallery for a specific service
export const getByService = query({
  args: { serviceId: v.id("services") },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("gallery")
      .withIndex("by_service", (q) => q.eq("serviceId", args.serviceId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .take(50);
    return await resolveAssetUrls(ctx, rows);
  },
});

// Get all gallery including inactive (admin)
export const getAllAdmin = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("gallery").order("asc").take(500);
    return await resolveAssetUrls(ctx, rows);
  },
});

// Add gallery image (admin)
export const add = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    mediaType: v.optional(mediaTypeValidator),
    storageId: v.optional(v.id("_storage")),
    mimeType: v.optional(v.string()),
    fileName: v.optional(v.string()),
    sizeBytes: v.optional(v.number()),
    category: v.optional(v.string()),
    serviceId: v.optional(v.id("services")),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    if (!args.imageUrl && !args.storageId) {
      throw new Error("Fornire imageUrl o storageId");
    }

    if (args.storageId) {
      const storageUrl = await ctx.storage.getUrl(args.storageId);
      if (!storageUrl) {
        throw new Error("Asset non trovato nello storage Convex");
      }
    }

    return await ctx.db.insert("gallery", {
      ...args,
      mediaType: args.mediaType ?? inferMediaType(args.mimeType, args.imageUrl),
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

// Update gallery image (admin)
export const update = mutation({
  args: {
    id: v.id("gallery"),
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    mediaType: v.optional(mediaTypeValidator),
    storageId: v.optional(v.id("_storage")),
    mimeType: v.optional(v.string()),
    fileName: v.optional(v.string()),
    sizeBytes: v.optional(v.number()),
    category: v.optional(v.string()),
    serviceId: v.optional(v.id("services")),
    order: v.number(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    if (!args.imageUrl && !args.storageId) {
      throw new Error("Fornire imageUrl o storageId");
    }

    if (args.storageId) {
      const storageUrl = await ctx.storage.getUrl(args.storageId);
      if (!storageUrl) {
        throw new Error("Asset non trovato nello storage Convex");
      }
    }

    const { id, ...data } = args;
    await ctx.db.patch(id, {
      ...data,
      mediaType: data.mediaType ?? inferMediaType(data.mimeType, data.imageUrl),
    });
    return { success: true };
  },
});

// Delete gallery image (admin)
export const remove = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    await ctx.db.delete(args.id);

    let storageDeleted = false;
    if (existing?.storageId) {
      storageDeleted = await deleteStorageIfUnreferenced(ctx, existing.storageId);
    }

    return { success: true, storageDeleted };
  },
});
