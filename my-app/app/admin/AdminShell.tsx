"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  Mail,
  Star,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useAdminAuth } from "../hooks/useAdminAuth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Servizi", icon: FileText },
  { href: "/admin/gallery", label: "Galleria", icon: Image },
  { href: "/admin/contacts", label: "Contatti", icon: MessageSquare },
  { href: "/admin/crm", label: "CRM", icon: Users },
  { href: "/admin/emails", label: "Email", icon: Mail },
  { href: "/admin/reviews", label: "Recensioni", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Impostazioni", icon: Settings },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isCheckingAuth, logout } = useAdminAuth();

  // Auth guard: redirect to login (must be before any early return to respect Rules of Hooks)
  useEffect(() => {
    if (!isAuthenticated && !isCheckingAuth && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isCheckingAuth, isLoginPage, router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  // Auth guard: loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-paper-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <NextImage src="/VS_logo_monogramma_colori.svg" alt="VS" width={40} height={40} />
          <p className="text-forest-800/60 font-sans text-sm">Caricamento...</p>
        </div>
      </div>
    );
  }

  // Allow login page to render even if not authenticated
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <NextImage src="/VS_logo_monogramma_colori.svg" alt="VS" width={40} height={40} />
          <p className="text-forest-800/60 font-sans text-sm">Reindirizzamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-100">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-forest-950 text-white transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-forest-900">
          <Link href="/admin" className="flex items-center gap-2">
            <NextImage src="/VS_logo_monogramma_bianco.svg" alt="VS" width={24} height={24} />
            <span className="font-display text-lg">Admin</span>
            <span className="text-leaf-400 font-sans text-sm">Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-paper-500 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-leaf-700 text-white"
                    : "text-paper-300 hover:bg-forest-900 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-forest-900 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-4 py-3 text-paper-300 hover:text-white hover:bg-forest-900 rounded-lg transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Torna al Sito</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-paper-300 hover:text-white hover:bg-forest-900 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 h-16 bg-paper-50/90 backdrop-blur-md border-b border-paper-300 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-forest-800 hover:text-forest-950"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-forest-800/60">Benvenuto, Admin</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-paper-200 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-leaf-700 flex items-center justify-center text-white font-sans font-semibold text-sm">
                A
              </div>
              <ChevronDown className="w-4 h-4 text-forest-800/60" />
            </button>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
