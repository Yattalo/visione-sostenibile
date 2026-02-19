"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-header w-[92%] max-w-5xl"
    >
      <nav
        className={cn(
          "rounded-full transition-all duration-500",
          useDarkText
            ? "bg-paper-50/95 backdrop-blur-md shadow-medium border border-paper-300/80"
            : "glass-nav"
        )}
      >
        <div className="px-4 sm:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Leaf
                className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  useDarkText ? "text-leaf-500" : "text-paper-100"
                )}
              />
              <span
                className={cn(
                  "font-display text-lg tracking-tighter transition-colors duration-300",
                  useDarkText ? "text-forest-950" : "text-paper-50"
                )}
              >
                Visione
                <span
                  className={cn(
                    "italic",
                    useDarkText ? "text-leaf-500" : "text-leaf-400"
                  )}
                >
                  Sostenibile
                </span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors relative py-1",
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

            <div className="hidden lg:block">
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-paper-50 rounded-b-3xl border-t border-paper-300 overflow-hidden"
            >
              <div className="px-6 py-5 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-2.5 font-sans text-xs uppercase tracking-widest transition-colors border-b border-paper-200",
                        isActivePath(link.href)
                          ? "text-leaf-500"
                          : "text-forest-800 hover:text-leaf-500"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3">
                  <Link
                    href="/contatti"
                    className="inline-flex items-center justify-center w-full h-10 px-6 rounded-full bg-sun-400 text-forest-950 font-sans text-xs uppercase tracking-[0.14em] font-semibold hover-sun"
                    onClick={() => setIsOpen(false)}
                  >
                    Richiedi Preventivo
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
