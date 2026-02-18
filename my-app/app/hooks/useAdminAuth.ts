"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect, useCallback } from "react";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    setToken(stored);
    setIsLoading(false);
  }, []);

  const sessionValid = useQuery(
    api.adminAuth.validateSession,
    token ? { token } : "skip"
  );

  const loginMutation = useMutation(api.adminAuth.login);
  const logoutMutation = useMutation(api.adminAuth.logout);

  const login = useCallback(
    async (password: string) => {
      const result = await loginMutation({ password });
      localStorage.setItem("admin_token", result.token);
      setToken(result.token);
      return result;
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    if (token) {
      await logoutMutation({ token });
    }
    localStorage.removeItem("admin_token");
    setToken(null);
  }, [token, logoutMutation]);

  const isAuthenticated = !isLoading && !!token && sessionValid?.valid === true;
  const isCheckingAuth = isLoading || (!!token && sessionValid === undefined);

  return { isAuthenticated, isCheckingAuth, login, logout, token };
}
