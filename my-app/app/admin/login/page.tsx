"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { useAdminAuthContext } from "../AdminAuthContext";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, isCheckingAuth } = useAdminAuthContext();

  // Redirect to dashboard if already authenticated (must be in useEffect, not during render)
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);

  if (isCheckingAuth || isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper-canvas flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Leaf className="w-10 h-10 text-leaf-500" />
          <p className="text-forest-800/60 font-sans text-sm">
            {isCheckingAuth ? "Verifica sessione..." : "Reindirizzamento..."}
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore di autenticazione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper-canvas flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-paper-50 rounded-2xl shadow-floating border border-leaf-700/20 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-leaf-50 flex items-center justify-center mb-4">
              <Leaf className="w-7 h-7 text-leaf-500" />
            </div>
            <h1 className="text-forest-950 font-display font-bold text-2xl">
              Accesso Admin
            </h1>
            <p className="text-forest-800/60 font-body text-sm mt-1">
              Visione Sostenibile
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-sans font-medium text-forest-950 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-paper-300 bg-paper-50
                             text-forest-950 font-body placeholder:text-paper-500
                             focus:outline-none focus:border-leaf-500 focus:ring-2 focus:ring-leaf-500/20
                             transition-colors"
                  placeholder="Inserisci la password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-500 hover:text-forest-800 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full h-12 rounded-full bg-sun-400 text-forest-950 font-sans text-sm
                         uppercase tracking-[0.12em] font-medium hover-sun
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300"
            >
              {loading ? "Accesso in corso..." : "Accedi"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
