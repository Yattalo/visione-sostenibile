"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  slug: string;
  title: string;
  category?: string;
  shortDescription: string;
  image: string;
  index: number;
}

const serviceCategoryMap: Record<string, string> = {
  "progettazione-giardini-orti": "Progettazione",
  "realizzazione-chiavi-in-mano": "Realizzazione",
  "ampia-scelta-piante": "Piante",
  "trattamenti-curativi-nutrizionali": "Cura Piante",
  "impianti-irrigazione": "Irrigazione",
  "camminamenti-muretti-pietra": "Hardscape",
  "illuminazione-esterni": "Illuminazione",
  "ingegneria-naturalistica": "Naturalistica",
  "arredamento-esterni": "Arredamento",
  "potatura-professionale": "Potature",
  "rigenerazione-terreni": "Rigenerazione",
  "manutenzione-sostenibile": "Manutenzione",
};

export function ServiceCard({
  slug,
  title,
  category,
  shortDescription,
  image,
  index,
}: ServiceCardProps) {
  const tagline = category || serviceCategoryMap[slug] || "Servizio";
  const indexLabel = (index + 1).toString().padStart(2, "0");

  return (
    <Link href={`/servizi/${slug}`} className="block h-full group">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200/60 bg-white
                    transition-all duration-500 hover:-translate-y-1.5 hover:border-terracotta-300/50 hover:shadow-floating"
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
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/5 to-transparent" />
          <div className="absolute inset-0 bg-terracotta-600/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-terracotta-600/10" />

          {/* Editorial number */}
          <span className="absolute left-6 top-5 select-none font-display text-5xl font-light leading-none text-white/30">
            {indexLabel}
          </span>

          {/* Category pill — frosted glass */}
          <span
            className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/15 px-3 py-1
                        font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 backdrop-blur-md"
          >
            {tagline}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-7">
          <h3
            className="font-display text-[22px] leading-tight text-charcoal-800 transition-colors duration-300
                        group-hover:text-moss-700"
          >
            {title}
          </h3>

          <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-charcoal-400">
            {shortDescription}
          </p>

          {/* Separator + CTA */}
          <div className="mt-6 flex items-center justify-between border-t border-cream-200/80 pt-5">
            <span
              className="font-sans text-[11px] uppercase tracking-[0.16em] text-moss-600 transition-colors
                          duration-300 group-hover:text-terracotta-600"
            >
              Scopri il servizio
            </span>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-100
                          transition-all duration-300 group-hover:bg-terracotta-500"
            >
              <ArrowRight
                className="h-3.5 w-3.5 text-moss-600 transition-all duration-300
                            group-hover:translate-x-0.5 group-hover:text-white"
              />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
