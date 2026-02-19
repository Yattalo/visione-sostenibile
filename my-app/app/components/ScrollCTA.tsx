"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Sprout } from "lucide-react";
import { Button } from "./ui/Button";

export function ScrollCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("scroll_cta_dismissed")) {
      setDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.6) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("scroll_cta_dismissed", "1");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-4 right-4 z-40 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-paper-200 p-5 relative">
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 text-forest-800/40 hover:text-forest-800"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-leaf-50 flex items-center justify-center shrink-0">
                <Sprout className="w-5 h-5 text-leaf-500" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-forest-950 mb-1">
                  Scopri il tuo giardino ideale
                </p>
                <p className="text-xs text-forest-800/60 mb-3">
                  6 domande per un profilo personalizzato
                </p>
                <Link href="/quiz">
                  <Button variant="primary" size="sm">
                    Fai il Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
