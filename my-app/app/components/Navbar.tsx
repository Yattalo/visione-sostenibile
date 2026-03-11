"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === "true";

// Lazy-load Clerk auth buttons — saves ~100KB when auth is disabled
const NavbarAuthButtons = AUTH_ENABLED
  ? dynamic(() => import("./NavbarAuthButtons"), { ssr: false })
  : null;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/progetti", label: "Progetti" },
  { href: "/blog", label: "Blog" },
  { href: "/qualita", label: "Qualità" },
  { href: "/contatti", label: "Contatti" },
];

// Pages that do NOT have a dark hero at top
const lightTopPages = ["/termini", "/privacy"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const hasLightTop = lightTopPages.includes(pathname);
  // On light pages OR when scrolled → use dark text with opaque bg
  const useDarkText = hasLightTop || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide public navbar on admin and area-privata routes (they have their own shell)
  if (pathname.startsWith("/admin") || pathname.startsWith("/area-privata")) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-header w-[94%] max-w-6xl"
    >
      <nav
        aria-label="Navigazione principale"
        className={cn(
          "rounded-full transition-all duration-500",
          useDarkText
            ? "bg-paper-50/95 backdrop-blur-md shadow-medium border border-paper-300/80"
            : "glass-nav"
        )}
      >
        <div className="px-5 sm:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="relative flex items-center gap-2.5 group shrink-0">
              <span
                className={cn(
                  "absolute -inset-2 rounded-2xl blur-lg transition-opacity duration-500 pointer-events-none",
                  useDarkText
                    ? "bg-sun-400/0"
                    : "bg-sun-400/15"
                )}
                aria-hidden
              />
              <Image
                src={useDarkText ? "/VS_logo_monogramma_colori.svg" : "/VS_logo_monogramma_bianco.svg"}
                alt="Visione Sostenibile — torna alla homepage"
                width={40}
                height={40}
                className="relative h-9 w-auto drop-shadow-[0_0_8px_rgba(234,184,49,0.25)]"
                priority
                unoptimized
              />
            </Link>

            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors relative py-1 whitespace-nowrap",
                    isActivePath(link.href)
                      ? useDarkText
                        ? "text-leaf-500"
                        : "text-sun-400"
                      : useDarkText
                        ? "text-forest-800 hover:text-leaf-500"
                        : "text-paper-50/90 hover:text-paper-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {AUTH_ENABLED && NavbarAuthButtons && (
                <Suspense fallback={null}>
                  <NavbarAuthButtons useDarkText={useDarkText} variant="desktop" />
                </Suspense>
              )}
              <Link
                href="/contatti"
                className="px-5 py-2 rounded-full font-sans text-[11px] uppercase tracking-[0.14em] font-semibold bg-sun-400 text-forest-950 hover-sun"
              >
                Preventivo
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
              className={cn(
                "lg:hidden p-2 transition-colors",
                useDarkText ? "text-forest-950" : "text-paper-50"
              )}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile dropdown — floating panel, fully rounded, spring */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="lg:hidden absolute top-full left-0 right-0 mt-3 bg-paper-50/98 backdrop-blur-xl rounded-2xl shadow-floating border border-paper-200/70 overflow-hidden"
          >
            <div className="px-5 py-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 32, delay: index * 0.035 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center py-3 px-2 font-sans text-xs uppercase tracking-widest rounded-xl transition-colors",
                      isActivePath(link.href)
                        ? "text-leaf-600 bg-leaf-50"
                        : "text-forest-800 hover:text-leaf-600 hover:bg-paper-100"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {AUTH_ENABLED && NavbarAuthButtons && (
                <Suspense fallback={null}>
                  <NavbarAuthButtons
                    useDarkText={true}
                    onClose={() => setIsOpen(false)}
                    variant="mobile"
                  />
                </Suspense>
              )}
              <div className="mt-3 pt-3 border-t border-paper-200">
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center w-full h-11 px-6 rounded-full bg-sun-400 text-forest-950 font-sans text-xs uppercase tracking-[0.14em] font-semibold hover-sun"
                  onClick={() => setIsOpen(false)}
                >
                  Richiedi Preventivo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
