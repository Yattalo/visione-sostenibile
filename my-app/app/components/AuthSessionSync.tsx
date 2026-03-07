"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect, useRef } from "react";
import { api } from "../../convex/_generated/api";
import { getGuestSessionId } from "../lib/guest-session";

export function AuthSessionSync() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const syncCurrentUser = useMutation(api.users.syncCurrentUser);
  const claimGuestRecords = useMutation(api.users.claimGuestRecords);
  const syncedUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    if (syncedUserRef.current === userId) return;

    syncedUserRef.current = userId;

    void (async () => {
      await syncCurrentUser({
        name: user?.fullName ?? undefined,
        imageUrl: user?.imageUrl ?? undefined,
      });

      await claimGuestRecords({
        guestSessionId: getGuestSessionId() ?? undefined,
      });
    })();
  }, [claimGuestRecords, isLoaded, syncCurrentUser, user?.fullName, user?.imageUrl, userId]);

  return null;
}
