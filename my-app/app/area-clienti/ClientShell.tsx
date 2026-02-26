"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import NextImage from "next/image";
import {
  LayoutDashboard,
  FileImage,
  ClipboardList,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useClientAuthContext } from "./ClientAuthContext";

const navItems = [
  { href: "/area-clienti/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/area-clienti/report", label: "Il Tuo Report", icon: ClipboardList },
  { href: "/area-clienti/il-mio-giardino", label: "Il Mio Giardino", icon: FileImage },
];

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isCheckingAuth, account, logout } =
    useClientAuthContext();

  const isPublicPage =
    pathname === "/area-clienti" || pathname === "/area-clienti/verify";

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated && !isCheckingAuth && !isPublicPage) {
      router.replace("/area-clienti");
    }
  }, [isAuthenticated, isCheckingAuth, isPublicPage, router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/area-clienti");
  };

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <NextImage
            src="/VS_logo_monogramma_colori.svg"
            alt="VS"
            width={40}
            height={40}
          />
          <p className="text-forest-800/60 font-sans text-sm">Caricamento...</p>
        </div>
      </div>
    );
  }

  // Public pages (login, verify) render without shell
  if (isPublicPage) {
    return <>{children}</>;
  }

  // Not authenticated — show redirect loader
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <NextImage
            src="/VS_logo_monogramma_colori.svg"
            alt="VS"
            width={40}
            height={40}
          />
          <p className="text-forest-800/60 font-sans text-sm">
            Reindirizzamento...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-forest-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <NextImage
                src="/VS_logo_monogramma_bianco.svg"
                alt="VS"
                width={24}
                height={24}
              />
            </Link>
            <div className="w-px h-6 bg-forest-800" />
            <span className="font-display text-sm tracking-wide">
              Area Clienti
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-paper-300">
              {account?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-paper-400 hover:text-white transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Esci</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-forest-900">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors",
                    isActive
                      ? "border-leaf-400 text-white"
                      : "border-transparent text-paper-400 hover:text-paper-200 hover:border-paper-600"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-paper-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-sm text-forest-800/50">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-forest-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna al sito
          </Link>
          <span>Visione Sostenibile — Torino</span>
        </div>
      </footer>
    </div>
  );
}
