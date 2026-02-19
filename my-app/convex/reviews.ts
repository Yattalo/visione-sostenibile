import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get approved reviews
export const getApproved = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    return await ctx.db
      .query("reviews")
      .withIndex("by_approved", (q) => q.eq("isApproved", true))
      .order("asc")
      .take(limit);
  },
});

// Get featured reviews (highest rating)
export const getFeatured = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    return await ctx.db
      .query("reviews")
      .withIndex("by_rating", (q) =>
        q.eq("isApproved", true).gte("rating", 4)
      )
      .order("desc")
      .take(limit);
  },
});

// Submit new review (needs approval)
export const submit = mutation({
  args: {
    authorName: v.string(),
    authorLocation: v.optional(v.string()),
    rating: v.number(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reviews", {
      ...args,
      date: new Date().toISOString(),
      isApproved: false, // require moderation
      createdAt: Date.now(),
    });
  },
});

// Approve review (admin)
export const approve = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.reviewId, { isApproved: true });
    return { success: true };
  },
});

// Reject review (admin) — deletes the review
export const reject = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.reviewId);
    return { success: true };
  },
});

// Delete review (admin)
export const remove = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.reviewId);
    return { success: true };
  },
});

// Seed reviews (admin — one-time use)
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("reviews").take(1);
    if (existing.length > 0) {
      return { seeded: 0, message: "Reviews already exist" };
    }

    const reviews = [
      {
        authorName: "Marco Bianchi",
        authorLocation: "Torino",
        rating: 5,
        text: "Andrea ha trasformato il nostro giardino in un'oasi di pace. La sua conoscenza delle piante biodinamiche è straordinaria. Il progetto ha superato ogni aspettativa.",
        date: "2025-11-15",
        isApproved: true,
        createdAt: Date.now() - 86400000 * 90,
      },
      {
        authorName: "Francesca Rossi",
        authorLocation: "Moncalieri",
        rating: 5,
        text: "Professionalità e passione incredibili. Il giardino che ci ha realizzato è bellissimo e richiede pochissima manutenzione. I vicini ci fermano sempre per farci i complimenti!",
        date: "2025-12-02",
        isApproved: true,
        createdAt: Date.now() - 86400000 * 75,
      },
      {
        authorName: "Giuseppe Ferretti",
        authorLocation: "Rivoli",
        rating: 5,
        text: "Avevamo uno spazio abbandonato e Andrea lo ha rigenerato completamente. Ora è il nostro angolo preferito della casa. Approccio biodinamico serio e risultati visibili.",
        date: "2026-01-10",
        isApproved: true,
        createdAt: Date.now() - 86400000 * 40,
      },
      {
        authorName: "Laura Conti",
        authorLocation: "Chieri",
        rating: 4,
        text: "Ottimo lavoro di progettazione. Andrea ascolta davvero le esigenze del cliente. Il sistema di irrigazione che ha installato è efficientissimo e ci fa risparmiare acqua.",
        date: "2026-01-25",
        isApproved: true,
        createdAt: Date.now() - 86400000 * 25,
      },
      {
        authorName: "Alessandro Moretti",
        authorLocation: "Collegno",
        rating: 5,
        text: "Dalla potatura alla manutenzione stagionale, Visione Sostenibile è il partner perfetto per chi ama il proprio giardino. Competenza e puntualità sempre al top.",
        date: "2026-02-05",
        isApproved: true,
        createdAt: Date.now() - 86400000 * 14,
      },
      {
        authorName: "Elena Giordano",
        authorLocation: "Venaria Reale",
        rating: 5,
        text: "Ho scelto Andrea per il mio terrazzo in centro a Torino. Ha creato un giardino pensile meraviglioso con piante autoctone. Ogni mattina mi sembra di essere in campagna!",
        date: "2026-02-12",
        isApproved: true,
        createdAt: Date.now() - 86400000 * 7,
      },
    ];

    for (const review of reviews) {
      await ctx.db.insert("reviews", review);
    }
    return { seeded: reviews.length, message: "Reviews seeded successfully" };
  },
});

// Get all reviews for admin
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews").order("desc").take(200);
  },
});
