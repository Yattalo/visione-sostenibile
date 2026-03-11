"use client";

import { ReactNode, lazy, Suspense } from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";

const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === "true";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Lazy-load the auth providers (Clerk + Convex-with-Clerk) only when
 * NEXT_PUBLIC_AUTH_ENABLED is "true". This avoids loading ~100KB+ of
 * Clerk SDK on public pages when auth is disabled.
 */
const AuthProviders = AUTH_ENABLED
  ? lazy(() => import("./AuthProviders"))
  : null;

function NoAuthProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

export function AppProvider({ children }: { children: ReactNode }) {
  if (AUTH_ENABLED && AuthProviders) {
    return (
      <Suspense fallback={<NoAuthProvider>{children}</NoAuthProvider>}>
        <AuthProviders>{children}</AuthProviders>
      </Suspense>
    );
  }
  return <NoAuthProvider>{children}</NoAuthProvider>;
}
