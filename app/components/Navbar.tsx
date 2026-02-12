"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "../lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/servizi", label: "Servizi" },
  { href: "/blog", label: "Blog" },
  { href: "/qualita", label: "Qualità" },
  { href: "/contatti", label: "Contatti" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-charcoal-900/80 via-charcoal-800/60 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Leaf
                className={cn(
                  "w-7 h-7 transition-colors duration-300",
                  scrolled ? "text-terracotta-500" : "text-white"
                )}
              />
            </motion.div>
            <span
              className={cn(
                "font-display text-xl tracking-wide transition-colors duration-300",
                scrolled ? "text-charcoal-800" : "text-white"
              )}
            >
              Visione<span className={cn("italic", scrolled ? "text-terracotta-500" : "text-terracotta-300")}>Sostenibile</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -2 }}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-sans text-sm uppercase tracking-widest transition-colors relative py-2",
                    scrolled
                      ? "text-charcoal-600 hover:text-terracotta-500"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-0 left-0 w-0 h-px bg-terracotta-400"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <Link
              href="/contatti"
              className={cn(
                "px-6 py-2.5 rounded-full font-sans text-sm uppercase tracking-wider transition-all",
                scrolled
                  ? "bg-moss-700 text-white hover:bg-moss-600"
                  : "bg-white text-moss-900 hover:bg-white/90"
              )}
            >
              Preventivo
            </Link>
          </motion.div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-charcoal-800" : "text-white"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-cream-200"
          >
            <nav className="px-6 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 font-sans text-charcoal-700 hover:text-terracotta-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
