import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ── Public: approved comments for a blog post ──

export const getApprovedByPost = query({
  args: { postSlug: v.string() },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("blogComments")
      .withIndex("by_post_slug", (q) =>
        q.eq("postSlug", args.postSlug).eq("status", "approved")
      )
      .order("desc")
      .take(100);
    return comments;
  },
});

// ── Public: submit a new comment (pending moderation) ──

export const submit = mutation({
  args: {
    postSlug: v.string(),
    authorName: v.string(),
    authorEmail: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate author name length
    const name = args.authorName.trim();
    if (name.length < 2 || name.length > 50) {
      throw new Error("Il nome deve essere tra 2 e 50 caratteri.");
    }

    // Validate content length
    const content = args.content.trim();
    if (content.length < 5 || content.length > 500) {
      throw new Error("Il commento deve essere tra 5 e 500 caratteri.");
    }

    // Validate email format
    const email = args.authorEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Inserisci un indirizzo email valido.");
    }

    // Rate limiting: max 3 comments per email per post
    const existingComments = await ctx.db
      .query("blogComments")
      .withIndex("by_post_slug", (q) => q.eq("postSlug", args.postSlug))
      .filter((q) => q.eq(q.field("authorEmail"), email))
      .collect();

    if (existingComments.length >= 3) {
      throw new Error("Hai raggiunto il limite di commenti per questo articolo.");
    }

    return await ctx.db.insert("blogComments", {
      postSlug: args.postSlug,
      authorName: name,
      authorEmail: email,
      content,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

// ── Admin: get all comments with optional status filter ──

export const getAllForAdmin = query({
  args: { status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"))) },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("blogComments")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .take(200);
    }
    return await ctx.db
      .query("blogComments")
      .order("desc")
      .take(200);
  },
});

// ── Admin: moderate a comment (approve / reject) ──

export const moderate = mutation({
  args: {
    commentId: v.id("blogComments"),
    status: v.union(v.literal("approved"), v.literal("rejected")),
    moderatedBy: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.commentId);
    if (!existing) {
      throw new Error("Commento non trovato.");
    }

    await ctx.db.patch(args.commentId, {
      status: args.status,
      moderatedAt: Date.now(),
      moderatedBy: args.moderatedBy,
    });

    return { success: true };
  },
});
