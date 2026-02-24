"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface ImageCarouselProps {
  images: string[];
  altPrefix?: string;
  className?: string;
}

export function ImageCarousel({ images, altPrefix = "foto", className }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-advance every 4s
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  // Positions: -1, 0 (center), +1
  const getOffset = (index: number) => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section className={cn("bg-paper-100 py-24 overflow-hidden", className)}>
      <div className="carousel-container max-w-5xl mx-auto px-6">
        <div className="relative h-[480px] flex items-center justify-center">
          {images.map((img, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);

            if (absOffset > 1) return null;

            const isCenter = offset === 0;
            const translateX = offset * 240;
            const scale = isCenter ? 1 : 0.85;
            const zIndex = isCenter ? 20 : 10;
            const opacity = isCenter ? 1 : 0.7;

            return (
              <div
                key={img}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                onClick={() => {
                  if (offset < 0) prev();
                  if (offset > 0) next();
                }}
              >
                <div
                  className={cn(
                    "relative w-64 md:w-80 aspect-[3.5/4.5] rounded-[40px] overflow-hidden transition-all duration-500",
                    isCenter ? "shadow-floating" : "shadow-medium"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${altPrefix} ${index + 1}`}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                  {!isCenter && <div className="absolute inset-0 bg-black/10" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2.5 mt-12">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Vai alla foto ${i + 1}`}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                i === current ? "bg-sun-400 w-8" : "bg-sun-200/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
