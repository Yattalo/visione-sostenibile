"use client";

import { createContext, useContext } from "react";
import { useClientAuth } from "../hooks/useClientAuth";

type ClientAuthState = ReturnType<typeof useClientAuth>;

const ClientAuthContext = createContext<ClientAuthState | null>(null);

export function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useClientAuth();
  return (
    <ClientAuthContext.Provider value={auth}>
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuthContext(): ClientAuthState {
  const ctx = useContext(ClientAuthContext);
  if (!ctx) {
    throw new Error(
      "useClientAuthContext must be used inside ClientAuthProvider"
    );
  }
  return ctx;
}
