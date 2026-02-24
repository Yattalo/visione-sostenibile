"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "../lib/utils";

interface VideoShowcaseProps {
  imageUrl: string;
  alt: string;
  heading?: string;
  headingBold?: string;
  className?: string;
}

export function VideoShowcase({
  imageUrl,
  alt,
  heading = "Che cosa",
  headingBold = "Aspettarsi",
  className,
}: VideoShowcaseProps) {
  return (
    <section className={cn("py-12 lg:py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-[30px] md:rounded-[50px] overflow-hidden h-[400px] md:h-[600px] group cursor-pointer shadow-deep">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-stitch-heading text-4xl md:text-7xl text-white mb-10 drop-shadow-lg">
              {heading}
              <span className="block font-bold">{headingBold}</span>
            </h2>
            <div className="bg-white/90 backdrop-blur-md rounded-full p-6 md:p-8 transition-all duration-500 group-hover:scale-110 shadow-xl">
              <Play className="w-8 h-8 md:w-12 md:h-12 text-forest-900 fill-forest-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
