"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { normalizeServiceSlug } from "../lib/static-data";

interface ServiceCardProps {
  slug: string;
  title: string;
  category?: string;
  shortDescription: string;
  image: string;
  index: number;
}

const serviceCategoryMap: Record<string, string> = {
  "progettazione-giardini": "Progettazione",
  "realizzazione-giardini": "Realizzazione",
  "scelta-piante": "Piante",
  "trattamenti-piante": "Cura Piante",
  "impianti-irrigazione": "Irrigazione",
  "camminamenti-pietra": "Hardscape",
  "illuminazione-esterni": "Illuminazione",
  "ingegneria-naturalistica": "Naturalistica",
  "arredamento-esterni": "Arredamento",
  "potature": "Potature",
  "rigenerazione-terreni": "Rigenerazione",
  "manutenzioni": "Manutenzione",
};

export function ServiceCard({
  slug,
  title,
  category,
  shortDescription,
  image,
  index,
}: ServiceCardProps) {
  const normalizedSlug = normalizeServiceSlug(slug);
  const tagline = category || serviceCategoryMap[normalizedSlug] || "Servizio";
  const indexLabel = (index + 1).toString().padStart(2, "0");

  return (
    <Link href={`/servizi/${normalizedSlug}`} className="block h-full group">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-paper-300/60 bg-paper-50
                    transition-all duration-500 hover:-translate-y-1.5 hover:border-leaf-500/50 hover:shadow-floating"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-forest-950/5 to-transparent" />
          <div className="absolute inset-0 bg-leaf-600/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-leaf-600/10" />

          {/* Editorial number */}
          <span className="absolute left-6 top-5 select-none font-display text-5xl font-light leading-none text-paper-50/30">
            {indexLabel}
          </span>

          {/* Category pill — frosted glass */}
          <span
            className="absolute right-5 top-5 rounded-full border border-paper-50/20 bg-paper-50/15 px-3 py-1
                        font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-paper-50/90 backdrop-blur-md"
          >
            {tagline}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-7">
          <h3
            className="font-display text-[22px] leading-tight text-forest-950 transition-colors duration-300
                        group-hover:text-leaf-600"
          >
            {title}
          </h3>

          <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-forest-800/70">
            {shortDescription}
          </p>

          {/* Separator + CTA */}
          <div className="mt-6 flex items-center justify-between border-t border-paper-300/80 pt-5">
            <span
              className="font-sans text-[11px] uppercase tracking-[0.16em] text-leaf-600 transition-colors
                          duration-300 group-hover:text-sun-500"
            >
              Scopri il servizio
            </span>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-paper-200
                          transition-all duration-300 group-hover:bg-sun-400"
            >
              <ArrowRight
                className="h-3.5 w-3.5 text-leaf-700 transition-all duration-300
                            group-hover:translate-x-0.5 group-hover:text-white"
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
