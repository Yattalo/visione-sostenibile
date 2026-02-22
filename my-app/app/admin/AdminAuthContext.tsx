"use client";

import { createContext, useContext } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

type AdminAuthState = ReturnType<typeof useAdminAuth>;

const AdminAuthContext = createContext<AdminAuthState | null>(null);

/**
 * Provides a single shared instance of useAdminAuth to all admin components.
 * This prevents the redirect loop caused by multiple independent hook instances
 * (AdminShell + AdminLoginPage) each with their own token state.
 */
export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAdminAuth();
  return (
    <AdminAuthContext.Provider value={auth}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuthContext(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuthContext must be used inside AdminAuthProvider");
  }
  return ctx;
}
