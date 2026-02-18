import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const login = mutation({
  args: { password: v.string() },
  handler: async (ctx, { password }) => {
    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    if (!storedHash) throw new Error("Admin password not configured");

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (hashHex !== storedHash) {
      throw new Error("Password non valida");
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await ctx.db.insert("adminSessions", {
      token,
      createdAt: Date.now(),
      expiresAt,
      isActive: true,
    });

    return { token, expiresAt };
  },
});

export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    if (!token) return { valid: false };

    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (!session || !session.isActive || session.expiresAt < Date.now()) {
      return { valid: false };
    }

    return { valid: true };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", token))
      .first();

    if (session) {
      await ctx.db.patch(session._id, { isActive: false });
    }
  },
});
