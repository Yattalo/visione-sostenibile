import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
    const existing = await ctx.db
      .query("services")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    const data = {
      ...args,
      isActive: true,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    } else {
      return await ctx.db.insert("services", data);
    }
  },
});

// Seed initial services data
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const services = [
      {
        slug: "progettazione-giardini",
        title: "Progettazione Giardini",
        shortDescription: "Progetti personalizzati per il tuo spazio verde",
        image: "/images/servizi/progettazione-giardini-cover.png",
        order: 1,
      },
      {
        slug: "realizzazione-giardini",
        title: "Realizzazione Giardini",
        shortDescription: "Trasformiamo i progetti in realtà",
        image: "/images/servizi/realizzazione-giardini-cover.png",
        order: 2,
      },
      {
        slug: "scelta-piante",
        title: "Ampia Scelta di Piante",
        shortDescription: "Vasta selezione di piante per ogni esigenza",
        image: "/images/servizi/scelta-piante-cover.png",
        order: 3,
      },
      {
        slug: "trattamenti-piante",
        title: "Trattamenti Curativi e Nutrizionali",
        shortDescription: "Cure specializzate per la salute delle tue piante",
        image: "/images/servizi/trattamenti-piante-cover.png",
        order: 4,
      },
      {
        slug: "impianti-irrigazione",
        title: "Impianti di Irrigazione",
        shortDescription: "Sistemi efficienti per l'irrigazione automatica",
        image: "/images/servizi/impianti-irrigazione-cover.png",
        order: 5,
      },
      {
        slug: "camminamenti-pietra",
        title: "Posa Camminamenti e Muretti in Pietra",
        shortDescription: "Elementi in pietra per arricchire il tuo giardino",
        image: "/images/servizi/camminamenti-pietra-cover.png",
        order: 6,
      },
      {
        slug: "illuminazione-esterni",
        title: "Illuminazione per Esterni",
        shortDescription: "Soluzioni luminose per valorizzare gli spazi outdoor",
        image: "/images/servizi/illuminazione-esterni-cover.png",
        order: 7,
      },
      {
        slug: "ingegneria-naturalistica",
        title: "Ingegneria Naturalistica",
        shortDescription: "Tecniche sostenibili per la conservazione del territorio",
        image: "/images/servizi/ingegneria-naturalistica-cover.png",
        order: 8,
      },
      {
        slug: "arredamento-esterni",
        title: "Arredamento per Esterni",
        shortDescription: "Mobili e accessori per completare il tuo outdoor",
        image: "/images/servizi/arredamento-esterni-cover.png",
        order: 9,
      },
      {
        slug: "potature",
        title: "Potature e Abbattimenti in Quota",
        shortDescription: "Interventi specializzati con personale qualificato",
        image: "/images/servizi/potature-cover.png",
        order: 10,
      },
      {
        slug: "rigenerazione-terreni",
        title: "Rigenerazione dei Terreni",
        shortDescription: "Recupero e bonifica di suoli degradati",
        image: "/images/servizi/rigenerazione-terreni-cover.png",
        order: 11,
      },
      {
        slug: "manutenzioni",
        title: "Manutenzioni",
        shortDescription: "Servizi di manutenzione programmata ordinaria e straordinaria",
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
