"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
    window.location.reload();
  };

  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-forest-950 text-white rounded-2xl p-6 shadow-2xl border border-forest-900">
        <p className="font-body text-sm text-paper-300 mb-4">
          Utilizziamo cookie tecnici e di analisi per migliorare la tua esperienza.
          I cookie analitici (Google Analytics, Meta Pixel) vengono attivati solo con il tuo consenso.{" "}
          <Link href="/privacy" className="underline text-leaf-400 hover:text-leaf-300">
            Privacy Policy
          </Link>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={accept}
          >
            Accetta tutto
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={reject}
            className="border-paper-500 text-paper-300 hover:bg-white/10"
          >
            Solo necessari
          </Button>
        </div>
      </div>
    </div>
  );
}
