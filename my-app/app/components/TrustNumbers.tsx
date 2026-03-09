"use client";

import { motion } from "framer-motion";
import { Award, Clock } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface TrustNumbersProps {
  variant?: "dark" | "light";
  className?: string;
}

function Heart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

const stats = [
  {
    value: "250+",
    label: "Progetti Completati",
    icon: Award,
  },
  {
    value: "20+",
    label: "Esperienza sul campo",
    icon: Clock,
  },
  {
    value: "100%",
    label: "Impatto Zero",
    icon: Heart,
  },
];

export function TrustNumbers({ variant = "dark", className }: TrustNumbersProps) {
  const isDark = variant === "dark";

  return (
    <section className={cn("py-24 px-4 md:px-12", className)}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-deep"
      >
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-12",
            isDark ? "bg-forest-950" : "bg-paper-50"
          )}
        >
          {/* Left -- Title panel */}
          <div
            className={cn(
              "lg:col-span-5 p-10 md:p-16 flex flex-col justify-center relative",
              isDark ? "bg-forest-900" : "bg-paper-100"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 mix-blend-overlay",
                isDark ? "bg-leaf-700/10" : "bg-leaf-200/20"
              )}
            />
            <div className="relative z-10">
              <span
                className={cn(
                  "block font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4",
                  isDark ? "text-leaf-400" : "text-leaf-600"
                )}
              >
                I nostri numeri
              </span>
              <h2
                className={cn(
                  "font-display text-4xl md:text-5xl lg:text-6xl leading-tight mb-6",
                  isDark ? "text-white" : "text-forest-950"
                )}
              >
                Cosa abbiamo{" "}
                <span
                  className={cn(
                    "block italic",
                    isDark ? "text-paper-300" : "text-leaf-700"
                  )}
                >
                  fatto finora
                </span>
              </h2>
              <p
                className={cn(
                  "font-body text-sm md:text-base leading-relaxed max-w-md",
                  isDark ? "text-paper-400" : "text-forest-800/70"
                )}
              >
                Ogni numero rappresenta un passo avanti verso un futuro pi&ugrave;
                verde. La nostra dedizione alla sostenibilit&agrave; &egrave; misurabile e
                tangibile.
              </p>
            </div>
          </div>

          {/* Right -- Stats grid */}
          <div className="lg:col-span-7 p-10 md:p-16 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left group"
                  >
                    <div
                      className={cn(
                        "mb-4 transition-colors duration-300",
                        isDark
                          ? "text-white group-hover:text-leaf-400"
                          : "text-forest-950 group-hover:text-leaf-600"
                      )}
                    >
                      <Icon className="w-10 h-10" />
                    </div>
                    <span
                      className={cn(
                        "font-sans text-5xl md:text-6xl font-bold tracking-tighter mb-2",
                        isDark ? "text-white" : "text-forest-950"
                      )}
                    >
                      {stat.value}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold tracking-widest uppercase border-t pt-4 w-full",
                        isDark
                          ? "text-paper-400 border-paper-600/30"
                          : "text-forest-800/60 border-paper-300"
                      )}
                    >
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
