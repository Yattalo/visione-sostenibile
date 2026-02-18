"use client";

import Link from "next/link";
import { FadeIn } from "@/app/components/animations";
import { cn } from "@/app/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  cta?: { label: string; href: string };
  className?: string;
}

export function PageHero({ eyebrow, title, intro, cta, className }: PageHeroProps) {
  return (
    <section className={cn("section-padding bg-paper-gradient", className)}>
      <FadeIn>
        <div className="max-w-4xl mx-auto text-center">
          {eyebrow && (
            <p className="text-micro text-leaf-500 mb-4">{eyebrow}</p>
          )}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-forest-950 leading-[1.1] tracking-[-0.02em] mb-6">
            {title}
          </h1>
          {intro && (
            <p className="font-body text-lg text-forest-800/70 max-w-2xl mx-auto">
              {intro}
            </p>
          )}
          {cta && (
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center h-12 px-7 rounded-full font-sans text-sm uppercase tracking-[0.12em] font-medium bg-sun-400 text-forest-950 hover-sun mt-8"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
