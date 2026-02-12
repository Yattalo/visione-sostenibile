"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/Badge";

interface ServiceCardProps {
  slug: string;
  title: string;
  category?: string;
  shortDescription: string;
  image: string;
  index: number;
}

const serviceTaglineMap: Record<string, string> = {
  "progettazione-giardini": "Progettazione",
  "realizzazione-giardini": "Realizzazione",
  "scelta-piante": "Selezione Piante",
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

const serviceAccentMap: Record<string, string> = {
  "progettazione-giardini": "from-moss-600 to-moss-800",
  "realizzazione-giardini": "from-terracotta-500 to-terracotta-700",
  "scelta-piante": "from-moss-500 to-moss-700",
  "trattamenti-piante": "from-terracotta-400 to-terracotta-600",
  "impianti-irrigazione": "from-moss-600 to-moss-800",
  "camminamenti-pietra": "from-terracotta-500 to-terracotta-700",
  "illuminazione-esterni": "from-terracotta-400 to-moss-600",
  "ingegneria-naturalistica": "from-moss-700 to-moss-900",
  "arredamento-esterni": "from-terracotta-500 to-terracotta-700",
  "potature": "from-moss-500 to-moss-700",
  "rigenerazione-terreni": "from-moss-600 to-terracotta-500",
  "manutenzioni": "from-moss-600 to-moss-800",
};

export function ServiceCard({
  slug,
  title,
  category,
  shortDescription,
  image,
  index,
}: ServiceCardProps) {
  const gradientClass = serviceAccentMap[slug] || "from-moss-600 to-moss-800";
  const tagline = category || serviceTaglineMap[slug] || "Servizio";
  const indexLabel = (index + 1).toString().padStart(2, "0");

  return (
    <Link href={`/servizi/${slug}`} className="block h-full group">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-cream-300 hover:shadow-floating">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-cream-100">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/45 via-charcoal-900/10 to-transparent" />
          <Badge
            className={`absolute left-4 top-4 border-0 bg-gradient-to-r ${gradientClass} text-[11px] text-white`}
          >
            {tagline}
          </Badge>
          <span className="absolute bottom-4 left-4 font-sans text-xs uppercase tracking-[0.16em] text-white/85">
            {indexLabel}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl leading-snug text-charcoal-800 transition-colors duration-300 group-hover:text-moss-800">
            {title}
          </h3>

          <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-500">
            {shortDescription}
          </p>

          <div className="mt-6 inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.14em] text-terracotta-600">
            Scopri servizio
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
