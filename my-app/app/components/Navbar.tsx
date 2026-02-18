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

  const hasDarkHeroAtTop =
    pathname === "/" ||
    pathname.startsWith("/servizi") ||
    pathname.startsWith("/progetti") ||
    pathname.startsWith("/blog") ||
    pathname === "/chi-siamo" ||
    pathname === "/qualita" ||
    pathname === "/contatti";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparentHeader = hasDarkHeroAtTop && !scrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-header transition-all duration-500",
        transparentHeader
          ? "bg-gradient-to-b from-forest-950/70 via-forest-950/40 to-transparent"
          : "bg-paper-50/95 backdrop-blur-md shadow-sm border-b border-paper-300/80"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Leaf
                className={cn(
                  "w-7 h-7 transition-colors duration-300",
                  transparentHeader ? "text-paper-100" : "text-leaf-500"
                )}
              />
            </div>
            <span
              className={cn(
                "font-display text-xl tracking-wide transition-colors duration-300",
                transparentHeader ? "text-paper-50" : "text-forest-950"
              )}
            >
              Visione
              <span
                className={cn(
                  "italic",
                  transparentHeader ? "text-leaf-400" : "text-leaf-500"
                )}
              >
                Sostenibile
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-sans text-xs uppercase tracking-[0.16em] transition-colors relative py-2 border-b",
                    isActivePath(link.href)
                      ? "border-leaf-500 text-leaf-500"
                      : cn(
                          "border-transparent",
                          transparentHeader
                            ? "text-paper-50/90 hover:text-paper-50"
                            : "text-forest-800 hover:text-leaf-500"
                        )
                  )}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <Link
              href="/contatti"
              className="px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-[0.14em] font-medium bg-sun-400 text-forest-950 hover-sun"
            >
              Richiedi Preventivo
            </Link>
          </motion.div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            className={cn(
              "lg:hidden p-2 transition-colors",
              transparentHeader ? "text-paper-50" : "text-forest-950"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="lg:hidden bg-paper-50 border-t border-paper-300 shadow-medium"
          >
            <nav className="px-6 py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 font-sans text-sm uppercase tracking-widest transition-colors border-b border-paper-200",
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
              <div className="pt-4">
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center w-full h-11 px-6 rounded-full bg-sun-400 text-forest-950 font-sans text-xs uppercase tracking-[0.14em] font-medium hover-sun"
                  onClick={() => setIsOpen(false)}
                >
                  Richiedi Preventivo
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
