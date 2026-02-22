import { query, mutation, type QueryCtx, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

async function hasBlogStorageReference(
  ctx: MutationCtx,
  storageId: Id<"_storage">,
  excludePostId?: Id<"blogPosts">
): Promise<boolean> {
  const rows = await ctx.db
    .query("blogPosts")
    .filter((q) => q.eq(q.field("coverStorageId"), storageId))
    .collect();

  if (!excludePostId) {
    return rows.length > 0;
  }

  return rows.some((row) => row._id !== excludePostId);
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
  storageId: Id<"_storage">,
  excludePostId?: Id<"blogPosts">
): Promise<boolean> {
  const [referencedByBlog, referencedByGallery] = await Promise.all([
    hasBlogStorageReference(ctx, storageId, excludePostId),
    hasGalleryStorageReference(ctx, storageId),
  ]);

  if (referencedByBlog || referencedByGallery) {
    return false;
  }

  await ctx.storage.delete(storageId);
  return true;
}

async function resolveCoverImages<
  T extends {
    coverImage?: string;
    coverStorageId?: Id<"_storage">;
  },
>(ctx: QueryCtx, rows: T[]): Promise<(T & { coverImage: string })[]> {
  return await Promise.all(
    rows.map(async (row) => {
      const storageUrl = row.coverStorageId
        ? await ctx.storage.getUrl(row.coverStorageId)
        : null;
      return {
        ...row,
        coverImage: storageUrl ?? row.coverImage ?? "",
      };
    })
  );
}

// Get all published blog posts
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .order("desc")
      .take(100);
    return await resolveCoverImages(ctx, rows);
  },
});

// Get published posts by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("blogPosts")
      .withIndex("by_category", (q) =>
        q.eq("category", args.category).eq("isPublished", true)
      )
      .order("desc")
      .take(50);
    return await resolveCoverImages(ctx, rows);
  },
});

// Get single post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .first();
    if (!post) return null;
    const [resolved] = await resolveCoverImages(ctx, [post]);
    return resolved;
  },
});

// Get related posts (same category, excluding current)
export const getRelated = query({
  args: { slug: v.string(), category: v.string() },
  handler: async (ctx, args) => {
    const allPosts = await ctx.db
      .query("blogPosts")
      .withIndex("by_category", (q) =>
        q.eq("category", args.category).eq("isPublished", true)
      )
      .take(10);

    const related = allPosts.filter((post) => post.slug !== args.slug).slice(0, 2);
    return await resolveCoverImages(ctx, related);
  },
});

// Create new blog post (admin)
export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    coverStorageId: v.optional(v.id("_storage")),
    coverMimeType: v.optional(v.string()),
    coverFileName: v.optional(v.string()),
    coverSizeBytes: v.optional(v.number()),
    category: v.string(),
    author: v.string(),
    readTime: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.coverStorageId) {
      const storageUrl = await ctx.storage.getUrl(args.coverStorageId);
      if (!storageUrl) {
        throw new Error("Cover image non trovata nello storage Convex");
      }
    }

    return await ctx.db.insert("blogPosts", {
      ...args,
      isPublished: false,
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update blog post (admin)
export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    coverStorageId: v.optional(v.id("_storage")),
    coverMimeType: v.optional(v.string()),
    coverFileName: v.optional(v.string()),
    coverSizeBytes: v.optional(v.number()),
    category: v.string(),
    author: v.string(),
    readTime: v.string(),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    if (args.coverStorageId) {
      const storageUrl = await ctx.storage.getUrl(args.coverStorageId);
      if (!storageUrl) {
        throw new Error("Cover image non trovata nello storage Convex");
      }
    }

    const { id, ...data } = args;
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Articolo non trovato");
    }

    const previousStorageId = existing.coverStorageId;

    await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });

    if (previousStorageId && previousStorageId !== data.coverStorageId) {
      await deleteStorageIfUnreferenced(ctx, previousStorageId);
    }
    return { success: true };
  },
});

// Publish/unpublish post (admin)
export const togglePublish = mutation({
  args: { id: v.id("blogPosts"), isPublished: v.boolean() },
  handler: async (ctx, args) => {
    const publishedAt = args.isPublished ? Date.now() : undefined;
    await ctx.db.patch(args.id, {
      isPublished: args.isPublished,
      publishedAt,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

// Delete blog post (admin)
export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    await ctx.db.delete(args.id);
    if (existing?.coverStorageId) {
      await deleteStorageIfUnreferenced(ctx, existing.coverStorageId);
    }
    return { success: true };
  },
});

// Get all posts (admin - including drafts)
export const getAllAdmin = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("blogPosts").order("desc").take(100);
    return await resolveCoverImages(ctx, rows);
  },
});

// Seed sample blog posts
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const posts = [
      {
        slug: "come-mantenere-giardino-autunno",
        title: "Come Mantenere il Giardino in Autunno: Guida Completa",
        excerpt: "Scopri tutti i consigli per preparare il tuo giardino all'autunno e proteggerlo durante i mesi più freddi.",
        content: `L'autunno è una stagione cruciale per la cura del giardino.

## Pulizia e Manutenzione

Il primo passo è una pulizia accurata del giardino:
- Rimuovi le foglie secche accumulate sui prati
- Potatura delle piante perenni
- Elimina i fiori appassiti

## Protezione dal Freddo

Per proteggere le piante più delicate:
- Utilizza teli traspiranti per coprire le piante sensibili
- Aggiungi pacciame alla base delle piante

## Piantumazione Autunnale

L'autunno è il momento ideale per piantare bulbi a fioritura primaverile.`,
        category: "Manutenzione",
        author: "Team Visione Sostenibile",
        readTime: "5 min",
        isPublished: true,
      },
      {
        slug: "tendenze-giardini-2024",
        title: "Tendenze Giardini 2024: Le Novità del Verde",
        excerpt: "Scopri le tendenze più hot per il 2024 nel mondo del giardinaggio.",
        content: `Il 2024 porta con sé nuove tendenze nel mondo del giardinaggio.

## 1. Giardini a Bassa Manutenzione

La tendenza principale è verso spazi verdi che richiedano meno interventi.

## 2. Biodiversità

Aumenta l'attenzione verso giardini che favoriscano la biodiversità.

## 3. Spazi Living Esterni

Il giardino diventa una vera stanza all'aperto.`,
        category: "Tendenze",
        author: "Marco Verde",
        readTime: "4 min",
        isPublished: true,
      },
      {
        slug: "piante-pendio",
        title: "Le Migliori Piante per Terreni in Pendio",
        excerpt: "Hai un terreno in pendio? Scopri quali piante scegliere.",
        content: `I terreni in pendio rappresentano una sfida particolare.

## Perché Scegliere Piante Adeguate

Le piante sui pendii devono:
- Avere apparati radicali profondi
- Essere resistenti alla siccità

## Piante Consigliate

### Per pendii soleggiati
- Lavanda
- Rosmarino
- Salvia

## Consigli di Installazione

1. Impianto a terrazze
2. Geotessili per stabilizzare`,
        category: "Progettazione",
        author: "Laura Fiori",
        readTime: "6 min",
        isPublished: true,
      },
    ];

    for (const post of posts) {
      const existing = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", post.slug))
        .first();

      if (!existing) {
        await ctx.db.insert("blogPosts", {
          ...post,
          publishedAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    }

    return { success: true, count: posts.length };
  },
});
