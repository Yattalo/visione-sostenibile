"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { AuthSessionSync } from "./AuthSessionSync";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);

export default function AuthProviders({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthSessionSync />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
