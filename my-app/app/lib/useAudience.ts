"use client";

import { useState, useEffect, useCallback } from "react";

export type Audience = "b2c" | "b2b";

const STORAGE_KEY = "vs-audience";

/**
 * Reads and persists audience preference (B2C/B2B) via localStorage.
 * Default: "b2c". The quiz auto-sets "b2b" when it detects a business user.
 */
export function useAudience() {
  const [audience, setAudienceState] = useState<Audience>("b2c");
  const [isHydrated, setIsHydrated] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "b2b" || stored === "b2c") {
        setAudienceState(stored);
      }
    } catch {
      // localStorage unavailable (SSR, private browsing)
    }
    setIsHydrated(true);
  }, []);

  const setAudience = useCallback((value: Audience) => {
    setAudienceState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const isB2B = audience === "b2b";

  return { audience, setAudience, isB2B, isHydrated } as const;
}
