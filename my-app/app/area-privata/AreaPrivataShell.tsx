"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NextImage from "next/image";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { cn } from "../lib/utils";
import { BLUR_DATA_URL } from "../lib/image-utils";

const navItems = [
  { href: "/area-privata", label: "Dashboard", icon: LayoutDashboard },
  { href: "/area-privata/progetti", label: "I Miei Progetti", icon: FolderKanban },
  { href: "/area-privata/preventivi", label: "Preventivi", icon: FileText },
];

interface AreaPrivataShellProps {
  children: React.ReactNode;
  userName: string;
  userImageUrl?: string | null;
}

export function AreaPrivataShell({
  children,
  userName,
  userImageUrl,
}: AreaPrivataShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActivePath = (href: string) => {
    if (href === "/area-privata") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-paper-100 pt-20">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-forest-950 text-white transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-forest-900">
          <Link href="/area-privata" className="flex items-center gap-2">
            <NextImage
              src="/VS_logo_monogramma_bianco.svg"
              alt="VS"
              width={24}
              height={24}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
            <span className="font-display text-lg">Area</span>
            <span className="text-leaf-400 font-sans text-sm">Privata</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-paper-500 hover:text-white"
            aria-label="Chiudi sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-forest-900">
          <div className="flex items-center gap-3">
            {userImageUrl ? (
              <NextImage
                src={userImageUrl}
                alt={userName}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-leaf-700 flex items-center justify-center text-sm font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-paper-100 truncate">
                {userName}
              </p>
              <p className="text-xs text-paper-500">Cliente</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const active = isActivePath(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  active
                    ? "bg-leaf-700 text-white"
                    : "text-paper-300 hover:bg-forest-900 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-forest-900">
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-4 py-3 text-paper-300 hover:text-white hover:bg-forest-900 rounded-lg transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Torna al Sito</span>
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 h-16 bg-paper-50/90 backdrop-blur-md border-b border-paper-300 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-forest-800 hover:text-forest-950"
            aria-label="Apri menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Breadcrumb-style title */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-paper-600">
            <Link href="/area-privata" className="hover:text-forest-800 transition-colors">
              Area Privata
            </Link>
            {pathname !== "/area-privata" && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-forest-900 font-medium">
                  {navItems.find((item) => isActivePath(item.href))?.label ?? ""}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
