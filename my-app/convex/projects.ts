import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .take(100);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("isActive"), true))
      .first();
  },
});

export const getWithPhotos = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db
      .query("projects")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .take(100);
    return all.filter((p) => p.has_photos);
  },
});

export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 4;
    const all = await ctx.db
      .query("projects")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .take(100);
    return all.filter((p) => p.has_photos).slice(0, limit);
  },
});

const photoValidator = v.object({
  src: v.string(),
  thumb: v.string(),
  alt: v.string(),
  caption: v.string(),
  type: v.union(v.literal("hero"), v.literal("gallery"), v.literal("render")),
  dimensions: v.optional(v.string()),
});

export const upsert = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    location: v.string(),
    region: v.string(),
    area_mq: v.optional(v.number()),
    type: v.string(),
    tags: v.array(v.string()),
    has_photos: v.boolean(),
    has_renders: v.boolean(),
    photo_count: v.number(),
    render_count: v.number(),
    hero_image: v.optional(v.string()),
    hero_alt: v.optional(v.string()),
    thumbnail: v.optional(v.string()),
    photos: v.array(photoValidator),
    renders: v.array(photoValidator),
    features: v.array(v.string()),
    description: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        isActive: true,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("projects", {
      ...args,
      isActive: true,
      updatedAt: Date.now(),
    });
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("projects").take(1);
    if (existing.length > 0) {
      return "Projects already seeded";
    }

    const projects = [
      {
        slug: "baveno-lago-maggiore",
        title: "Baveno – Lago Maggiore",
        location: "Baveno, VB",
        region: "Piemonte",
        area_mq: 2800,
        type: "Realizzazione parco",
        tags: ["parco", "irrigazione", "robot-tagliaerba", "alto-fusto", "aiuole"],
        has_photos: true,
        has_renders: false,
        photo_count: 4,
        render_count: 0,
        hero_image: "/portfolio/photos/baveno-lago-maggiore/baveno-lago-maggiore_hero.jpg",
        hero_alt: "Baveno – Lago Maggiore – Visione Sostenibile",
        thumbnail: "/portfolio/photos/baveno-lago-maggiore/baveno-lago-maggiore_hero_thumb.jpg",
        photos: [] as Array<{ src: string; thumb: string; alt: string; caption: string; type: "hero" | "gallery" | "render"; }>,
        renders: [] as Array<{ src: string; thumb: string; alt: string; caption: string; type: "hero" | "gallery" | "render"; }>,
        features: ["Parco completo 2.800 mq con vista lago", "Impianto irrigazione professionale", "Robot tagliaerba autonomo"],
        description: "Realizzazione completa di un parco di 2.800 mq con vista sul Lago Maggiore.",
        order: 0,
      },
      {
        slug: "agriturismo-durando-portacomaro",
        title: "Agriturismo Durando – Portacomaro",
        location: "Portacomaro, AT",
        region: "Piemonte – Monferrato",
        area_mq: 1800,
        type: "Realizzazione parco completo",
        tags: ["agriturismo", "irrigazione-wifi", "anti-zanzare", "robot-gps", "solare", "officinali"],
        has_photos: true,
        has_renders: false,
        photo_count: 7,
        render_count: 0,
        hero_image: "/portfolio/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero.jpg",
        hero_alt: "Agriturismo Durando – Portacomaro – Visione Sostenibile",
        thumbnail: "/portfolio/photos/agriturismo-durando-portacomaro/agriturismo-durando-portacomaro_hero_thumb.jpg",
        photos: [] as Array<{ src: string; thumb: string; alt: string; caption: string; type: "hero" | "gallery" | "render"; }>,
        renders: [] as Array<{ src: string; thumb: string; alt: string; caption: string; type: "hero" | "gallery" | "render"; }>,
        features: ["Parco 1.800 mq chiavi in mano", "Irrigazione Wi-Fi con stazione meteo", "45 essenze officinali a km/0"],
        description: "Realizzazione completa del parco dell'Agriturismo Terra D'Origine nel Monferrato.",
        order: 1,
      },
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", {
        ...project,
        isActive: true,
        updatedAt: Date.now(),
      });
    }

    return `Seeded ${projects.length} sample projects`;
  },
});
