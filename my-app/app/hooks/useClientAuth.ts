"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect, useCallback } from "react";

export function useClientAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("client_token");
    setToken(stored);
    setIsLoading(false);
  }, []);

  const sessionData = useQuery(
    api.clientAuth.validateSession,
    token ? { token } : "skip"
  );

  const logoutMutation = useMutation(api.clientAuth.logout);

  const setSession = useCallback((newToken: string) => {
    localStorage.setItem("client_token", newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      await logoutMutation({ token });
    }
    localStorage.removeItem("client_token");
    setToken(null);
  }, [token, logoutMutation]);

  const isAuthenticated =
    !isLoading && !!token && sessionData?.valid === true;
  const isCheckingAuth =
    isLoading || (!!token && sessionData === undefined);

  return {
    isAuthenticated,
    isCheckingAuth,
    account: sessionData?.valid ? sessionData.account : null,
    setSession,
    logout,
    token,
  };
}
