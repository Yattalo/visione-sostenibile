import type { Doc } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { getAdminEmailAllowlist, isAllowlistedAdminEmail, normalizeEmail } from "./authHelpers";

type UserCtx = QueryCtx | MutationCtx;
type IdentityLike = {
  subject: string;
  email?: string | null;
};

export async function findUserForIdentity(
  ctx: UserCtx,
  identity: IdentityLike
): Promise<Doc<"users"> | null> {
  const byClerkId = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();

  if (byClerkId) {
    return byClerkId;
  }

  const email = normalizeEmail(identity.email);
  if (!email) {
    return null;
  }

  return await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", email))
    .first();
}

async function shouldBootstrapAdmin(ctx: MutationCtx): Promise<boolean> {
  if (getAdminEmailAllowlist().size > 0) {
    return false;
  }

  const existingAdmin = await ctx.db
    .query("users")
    .withIndex("by_role", (q) => q.eq("role", "admin"))
    .take(1);

  return existingAdmin.length === 0;
}

export async function upsertUserForIdentity(
  ctx: MutationCtx,
  identity: IdentityLike,
  profile?: {
    name?: string;
    imageUrl?: string;
  }
): Promise<Doc<"users">> {
  const email = normalizeEmail(identity.email);
  if (!email) {
    throw new Error("Email utente non disponibile");
  }

  const existing = await findUserForIdentity(ctx, identity);
  const bootstrapAdmin = !existing && await shouldBootstrapAdmin(ctx);
  const nextRole =
    existing?.role ??
    (isAllowlistedAdminEmail(email) || bootstrapAdmin ? "admin" : "client");

  if (existing) {
    const patch = {
      clerkId: identity.subject,
      email,
      name: profile?.name ?? existing.name,
      imageUrl: profile?.imageUrl ?? existing.imageUrl,
      role: existing.role === "admin" || nextRole === "admin" ? "admin" : "client",
      lastSignInAt: Date.now(),
    } as const;

    await ctx.db.patch(existing._id, patch);
    return {
      ...existing,
      ...patch,
    };
  }

  const now = Date.now();
  const user = {
    clerkId: identity.subject,
    email,
    name: profile?.name,
    imageUrl: profile?.imageUrl,
    role: nextRole,
    createdAt: now,
    lastSignInAt: now,
  } as const;

  const userId = await ctx.db.insert("users", user);
  return {
    _id: userId,
    _creationTime: now,
    ...user,
  };
}
