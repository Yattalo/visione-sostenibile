"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NextImage from "next/image";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  MessageCircle,
  Mail,
  Star,
  Settings,
  Users,
  Menu,
  X,
  ExternalLink,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Servizi", icon: FileText },
  { href: "/admin/gallery", label: "Galleria", icon: Image },
  { href: "/admin/contacts", label: "Contatti", icon: MessageSquare },
  { href: "/admin/crm", label: "CRM", icon: Users },
  { href: "/admin/emails", label: "Email", icon: Mail },
  { href: "/admin/reviews", label: "Recensioni", icon: Star },
  { href: "/admin/comments", label: "Commenti", icon: MessageCircle },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/scorecard", label: "Scorecard", icon: ClipboardCheck },
  { href: "/admin/settings", label: "Impostazioni", icon: Settings },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            aria-label="Chiudi sidebar"
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

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 h-16 bg-paper-50/90 backdrop-blur-md border-b border-paper-300 flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-forest-800 hover:text-forest-950"
            aria-label="Apri menu"
          >
            <Menu className="w-6 h-6" />
          </button>

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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
