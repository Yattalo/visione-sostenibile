import { mutation } from "./_generated/server";
import { progettiProjects } from "../app/lib/progetti-data";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    let seededCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < progettiProjects.length; i++) {
      const project = progettiProjects[i];
      
      const existing = await ctx.db
        .query("projects")
        .withIndex("by_slug", (q) => q.eq("slug", project.slug))
        .first();

      if (existing) {
        skippedCount++;
        continue;
      }

      await ctx.db.insert("projects", {
        slug: project.slug,
        title: project.title,
        location: project.location,
        region: project.region,
        area_mq: project.area_mq ?? undefined,
        type: project.type,
        tags: project.tags,
        has_photos: project.has_photos,
        has_renders: project.has_renders,
        photo_count: project.photo_count,
        render_count: project.render_count,
        hero_image: project.hero_image ?? undefined,
        hero_alt: project.hero_alt ?? undefined,
        thumbnail: project.thumbnail ?? undefined,
        photos: project.photos,
        renders: project.renders,
        features: project.features,
        description: project.description,
        order: i,
        isActive: true,
        updatedAt: Date.now(),
      });

      seededCount++;
    }

    return {
      success: true,
      seeded: seededCount,
      skipped: skippedCount,
      total: progettiProjects.length,
    };
  },
});
