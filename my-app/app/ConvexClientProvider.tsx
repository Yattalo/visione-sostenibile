"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const url =
    process.env.NEXT_PUBLIC_CONVEX_URL ??
    "https://placeholder-convex-instance.convex.cloud";
  const client = useMemo(
    () => new ConvexReactClient(url),
    [url]
  );

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
