"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Lock } from "lucide-react";
import { cn } from "../lib/utils";

interface NavbarAuthButtonsProps {
  useDarkText: boolean;
  onClose?: () => void;
  variant: "desktop" | "mobile";
}

export default function NavbarAuthButtons({ useDarkText, onClose, variant }: NavbarAuthButtonsProps) {
  if (variant === "mobile") {
    return (
      <div className="mt-3 grid gap-2">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button
              type="button"
              className="inline-flex items-center justify-center w-full h-11 px-6 rounded-full border border-paper-300 text-forest-900 font-sans text-xs uppercase tracking-[0.14em] font-semibold hover:border-leaf-500 hover:text-leaf-600 transition-colors"
              onClick={onClose}
            >
              Accedi
            </button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <Link
            href="/area-privata"
            className="inline-flex items-center justify-center gap-2 w-full h-11 px-6 rounded-full border border-leaf-500/30 text-leaf-700 font-sans text-xs uppercase tracking-[0.14em] font-semibold hover:bg-leaf-50 transition-colors"
            onClick={onClose}
          >
            <Lock className="w-3.5 h-3.5" />
            Area Privata
          </Link>
          <div className="flex justify-center py-2">
            <UserButton />
          </div>
        </Show>
      </div>
    );
  }

  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            className={cn(
              "px-4 py-2 rounded-full font-sans text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors border",
              useDarkText
                ? "border-forest-950/15 text-forest-900 hover:border-leaf-500 hover:text-leaf-600"
                : "border-paper-50/30 text-paper-50 hover:border-paper-50/60"
            )}
          >
            Accedi
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <Link
          href="/area-privata"
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-[11px] uppercase tracking-[0.14em] font-semibold transition-colors border",
            useDarkText
              ? "border-leaf-500/30 text-leaf-700 hover:bg-leaf-50 hover:border-leaf-500"
              : "border-paper-50/30 text-paper-50 hover:border-paper-50/60"
          )}
        >
          <Lock className="w-3 h-3" />
          Area Privata
        </Link>
        <UserButton />
      </Show>
    </>
  );
}
