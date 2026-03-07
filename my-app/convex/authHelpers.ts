import type { MutationCtx, QueryCtx } from "./_generated/server";

type AdminCtx = QueryCtx | MutationCtx;

function parseEmailList(input?: string): string[] {
  if (!input) return [];
  return input
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function normalizeEmail(value?: string | null): string {
  return value?.trim().toLowerCase() ?? "";
}

export function getAdminEmailAllowlist(): Set<string> {
  return new Set([
    ...parseEmailList(process.env.ADMIN_EMAILS),
    ...parseEmailList(process.env.ADMIN_NOTIFICATION_EMAIL),
  ]);
}

export function isAllowlistedAdminEmail(email?: string | null): boolean {
  const normalized = normalizeEmail(email);
  if (!normalized) return false;
  return getAdminEmailAllowlist().has(normalized);
}

async function hasBootstrapAdminWindow(ctx: AdminCtx): Promise<boolean> {
  const allowlist = getAdminEmailAllowlist();
  if (allowlist.size > 0) {
    return false;
  }

  const existingAdmin = await ctx.db
    .query("users")
    .withIndex("by_role", (q) => q.eq("role", "admin"))
    .take(1);

  return existingAdmin.length === 0;
}

export async function requireAdmin(ctx: AdminCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Autenticazione richiesta");
  }

  const email = normalizeEmail(identity.email);
  const existingUser = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .first();

  if (existingUser?.role === "admin") {
    return { identity, email, user: existingUser };
  }

  if (email) {
    const byEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (byEmail?.role === "admin") {
      return { identity, email, user: byEmail };
    }
  }

  if (isAllowlistedAdminEmail(email) || await hasBootstrapAdminWindow(ctx)) {
    return { identity, email, user: existingUser ?? null };
  }

  throw new Error("Accesso admin non autorizzato");
}
