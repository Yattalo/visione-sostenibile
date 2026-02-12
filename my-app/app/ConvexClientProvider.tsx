"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useRef } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const clientRef = useRef<ConvexReactClient | null>(null);

  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    return <>{children}</>;
  }

  if (!clientRef.current) {
    clientRef.current = new ConvexReactClient(url);
  }

  return <ConvexProvider client={clientRef.current}>{children}</ConvexProvider>;
}
