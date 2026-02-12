"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Leaf,
} from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Servizi", icon: FileText },
  { href: "/admin/gallery", label: "Galleria", icon: Image },
  { href: "/admin/contacts", label: "Contatti", icon: MessageSquare },
  { href: "/admin/reviews", label: "Recensioni", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/settings", label: "Impostazioni", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream-100">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-charcoal-900 text-white transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-charcoal-700">
          <Link href="/admin" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-terracotta-400" />
            <span className="font-display text-lg">Admin</span>
            <span className="text-terracotta-400 font-sans text-sm">Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-charcoal-400 hover:text-white"
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
                    ? "bg-terracotta-600 text-white"
                    : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-charcoal-700">
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-4 py-3 text-charcoal-300 hover:text-white hover:bg-charcoal-800 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Torna al Sito</span>
          </Link>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 h-16 bg-white/90 backdrop-blur-md border-b border-cream-200 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-charcoal-600 hover:text-charcoal-900"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-charcoal-500">Benvenuto, Admin</span>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-cream-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-moss-700 flex items-center justify-center text-white font-sans font-semibold text-sm">
                A
              </div>
              <ChevronDown className="w-4 h-4 text-charcoal-500" />
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
