"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/Badge";
import TiltedCard from "./TiltedCard";

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

  return (
    <Link href={`/servizi/${slug}`} className="block h-full group">
      <div className="h-full bg-white rounded-2xl border border-cream-200 overflow-hidden transition-all duration-500 hover:shadow-floating hover:border-cream-300 hover:-translate-y-1">
        <TiltedCard
          imageSrc={image}
          altText={title}
          captionText={title}
          containerHeight="220px"
          containerWidth="100%"
          imageHeight="220px"
          imageWidth="100%"
          scaleOnHover={1.03}
          rotateAmplitude={8}
          showTooltip={true}
          className="rounded-t-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <Badge
              className={`bg-gradient-to-r ${gradientClass} text-white border-0 text-xs`}
            >
              {tagline}
            </Badge>
          </div>
        </TiltedCard>

        <div className="p-6">
          <span className="font-sans text-xs tracking-widest text-charcoal-300 font-medium">
            {(index + 1).toString().padStart(2, "0")}
          </span>

          <h3 className="font-display text-xl text-charcoal-800 mb-3 leading-snug group-hover:text-moss-800 transition-colors duration-300 mt-2">
            {title}
          </h3>

          <p className="font-body text-charcoal-500 leading-relaxed mb-4 text-sm">
            {shortDescription}
          </p>

          <div className="flex items-center text-terracotta-600 font-sans text-sm tracking-wide uppercase">
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Scopri
            </span>
            <ArrowRight className="w-4 h-4 ml-1 -translate-x-4 group-hover:translate-x-0 transition-transform duration-300" />
          </div>
        </div>

        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-terracotta-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </Link>
  );
}
