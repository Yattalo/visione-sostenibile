import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./authHelpers";

// Get all active services ordered
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("services")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .take(100);
  },
});

// Get service by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("services")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
  },
});

// Get featured services (for homepage)
export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    return await ctx.db
      .query("services")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .take(limit);
  },
});

// Create/update service (admin)
export const upsert = mutation({
  args: {
    id: v.optional(v.id("services")),
    slug: v.string(),
    title: v.string(),
    shortDescription: v.string(),
    fullDescription: v.optional(v.string()),
    icon: v.optional(v.string()),
    image: v.optional(v.string()),
    gallery: v.optional(v.array(v.string())),
    features: v.optional(v.array(v.string())),
    order: v.number(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const { id, ...data } = args;
    const now = Date.now();

    // Explicit update path: preserve current active state and prevent slug collisions.
    if (id) {
      const current = await ctx.db.get(id);
      if (!current) {
        throw new Error("Servizio non trovato");
      }

      const slugOwner = await ctx.db
        .query("services")
        .withIndex("by_slug", (q) => q.eq("slug", data.slug))
        .first();

      if (slugOwner && slugOwner._id !== id) {
        throw new Error("Esiste gia' un servizio con questo slug");
      }

      await ctx.db.patch(id, {
        ...data,
        isActive: current.isActive,
        updatedAt: now,
      });
      return id;
    }

    // Legacy upsert-by-slug path (used by seed/import workflows).
    const existing = await ctx.db
      .query("services")
      .withIndex("by_slug", (q) => q.eq("slug", data.slug))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...data,
        isActive: existing.isActive,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("services", {
      ...data,
      isActive: true,
      updatedAt: now,
    });
  },
});

// Get all services including inactive (admin)
export const getAllAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.db.query("services").order("asc").take(200);
  },
});

// Delete service (admin)
export const remove = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Toggle active state (admin)
export const toggleActive = mutation({
  args: { id: v.id("services"), isActive: v.boolean() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { isActive: args.isActive, updatedAt: Date.now() });
    return { success: true };
  },
});

// Update order of a service (admin)
export const updateOrder = mutation({
  args: { id: v.id("services"), order: v.number() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, { order: args.order, updatedAt: Date.now() });
    return { success: true };
  },
});

// Seed initial services data
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const services = [
      {
        slug: "progettazione-giardini",
        title: "Progettazione giardini sostenibili",
        shortDescription: "Bellezza, gestione e durata su misura per te.",
        image: "/images/servizi/progettazione-giardini-cover.png",
        order: 1,
      },
      {
        slug: "realizzazione-giardini",
        title: "Realizzazione Giardini",
        shortDescription: "Uno per tutta la vita: dal progetto al cantiere, senza rimbalzi.",
        image: "/images/servizi/realizzazione-giardini-cover.png",
        order: 2,
      },
      {
        slug: "scelta-piante",
        title: "Selezione Piante e Vivaio Interno",
        shortDescription: "La pianta giusta al posto giusto.",
        image: "/images/servizi/scelta-piante-cover.png",
        order: 3,
      },
      {
        slug: "trattamenti-piante",
        title: "Trattamenti curativi e nutrizionali",
        shortDescription: "Prevenzione, diagnosi e interventi mirati per riportare equilibrio.",
        image: "/images/servizi/trattamenti-piante-cover.png",
        order: 4,
      },
      {
        slug: "impianti-irrigazione",
        title: "Impianti di irrigazione",
        shortDescription: "L’acqua è un bene prezioso: va gestita con intelligenza.",
        image: "/images/servizi/impianti-irrigazione-cover.png",
        order: 5,
      },
      {
        slug: "camminamenti-pietra",
        title: "Posa camminamenti e muretti in pietra",
        shortDescription: "La natura che arreda la natura: percorsi, contenimenti, scalinate.",
        image: "/images/servizi/camminamenti-pietra-cover.png",
        order: 6,
      },
      {
        slug: "illuminazione-esterni",
        title: "Illuminazione per esterni",
        shortDescription: "Creiamo atmosfera: luce che guida, accoglie e valorizza.",
        image: "/images/servizi/illuminazione-esterni-cover.png",
        order: 7,
      },
      {
        slug: "ingegneria-naturalistica",
        title: "Ingegneria naturalistica",
        shortDescription: "Sostituiamo il cemento con materiali naturali.",
        image: "/images/servizi/ingegneria-naturalistica-cover.png",
        order: 8,
      },
      {
        slug: "arredamento-esterni",
        title: "Arredi e outdoor living",
        shortDescription: "Il giardino da vivere, in solitudine, in famiglia, con gli amici.",
        image: "/images/servizi/arredamento-esterni-cover.png",
        order: 9,
      },
      {
        slug: "potature",
        title: "Potature e abbattimenti in quota",
        shortDescription: "La pianta si pota dall’interno: sicurezza e salute dell’albero.",
        image: "/images/servizi/potature-cover.png",
        order: 10,
      },
      {
        slug: "rigenerazione-terreni",
        title: "Rigenerazione del suolo",
        shortDescription: "La terra è viva: se il suolo sta bene, tutto il giardino lavora meglio.",
        image: "/images/servizi/rigenerazione-terreni-cover.png",
        order: 11,
      },
      {
        slug: "manutenzioni",
        title: "Manutenzione programmata del verde",
        shortDescription: "Pensaci una volta sola, poi ci pensiamo noi.",
        image: "/images/servizi/manutenzioni-cover.png",
        order: 12,
      },
    ];

    for (const svc of services) {
      const existing = await ctx.db
        .query("services")
        .withIndex("by_slug", (q) => q.eq("slug", svc.slug))
        .first();

      if (!existing) {
        await ctx.db.insert("services", {
          ...svc,
          fullDescription: "",
          icon: "",
          image: svc.image, // Use the image from seed data
          gallery: [],
          features: [],
          isActive: true,
          metaTitle: svc.title,
          metaDescription: svc.shortDescription,
          updatedAt: Date.now(),
        });
      }
    }

    return { success: true, count: services.length };
  },
});
