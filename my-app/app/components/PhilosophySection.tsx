"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Flower2, Droplets, Wind, Sun, type LucideIcon } from "lucide-react";

/*
 * VIDEO PROMPTS per AI Video Generation (Runway Gen-3 / Kling / Sora)
 * ====================================================================
 *
 * TERRA:
 *   "Macro cinematografica di terra scura e fertile, radici che crescono
 *    in time-lapse, lombrichi che attraversano il suolo, luce ambrata calda
 *    dall'alto, profondità di campo ridotta, toni terra e ambra, 4K, loop"
 *
 * ACQUA:
 *   "Gocce d'acqua in slow motion che cadono su foglie verde scuro,
 *    creano increspature, rugiada mattutina che scivola su superfici
 *    vegetali, color grading teal/ciano, macro fotografia, mood sereno, 4K, loop"
 *
 * ARIA:
 *   "Brezza gentile che muove graminacee ornamentali alte, luce soffusa
 *    filtrata, particelle di polline che fluttuano nell'aria, atmosfera
 *    eterea e sognante, slow motion, toni azzurro cielo e argento, 4K, loop"
 *
 * FUOCO:
 *   "Golden hour, raggi di sole che filtrano attraverso chioma di alberi,
 *    lens flare caldi, ombre che danzano sul terreno, time-lapse del sole
 *    che attraversa un giardino, toni arancio caldo e ambra, 4K, loop"
 */

interface ElementConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  bgGradient: string;
  accentColor: string;
  glowColor: string;
  iconKeyframes: Record<string, number[]>;
}

const ELEMENTS: ElementConfig[] = [
  {
    icon: Flower2,
    title: "Terra",
    description:
      "Rigeneriamo il suolo con pratiche biodinamiche che aumentano fertilita, vita microbica e stabilita.",
    bgGradient:
      "linear-gradient(135deg, #1a1a1a 0%, #351716 40%, #1f1f1f 100%)",
    accentColor: "#cb6a56",
    glowColor: "rgba(203, 106, 86, 0.12)",
    iconKeyframes: { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] },
  },
  {
    icon: Droplets,
    title: "Acqua",
    description:
      "Gestione idrica efficiente per ridurre sprechi e mantenere il verde sano durante tutto l'anno.",
    bgGradient:
      "linear-gradient(135deg, #0f0f0f 0%, #1a2112 40%, #1a1a1a 100%)",
    accentColor: "#95a668",
    glowColor: "rgba(149, 166, 104, 0.10)",
    iconKeyframes: { y: [0, -8, 0], rotate: [0, 3, -3, 0] },
  },
  {
    icon: Wind,
    title: "Aria",
    description:
      "Progettiamo spazi aperti e vitali che migliorano il microclima e il benessere delle persone.",
    bgGradient:
      "linear-gradient(135deg, #1a1a1a 0%, #262626 40%, #1f1f1f 100%)",
    accentColor: "#e4d4b8",
    glowColor: "rgba(228, 212, 184, 0.06)",
    iconKeyframes: { x: [0, 8, -8, 0], rotate: [0, 10, -5, 0] },
  },
  {
    icon: Sun,
    title: "Fuoco",
    description:
      "Luce, energia e cicli naturali guidano ogni scelta progettuale per un equilibrio duraturo.",
    bgGradient:
      "linear-gradient(135deg, #1f1f1f 0%, #32281a 40%, #1a1a1a 100%)",
    accentColor: "#d98876",
    glowColor: "rgba(217, 136, 118, 0.12)",
    iconKeyframes: { scale: [1, 1.08, 1], rotate: [0, 15, -15, 0] },
  },
];

const ICON_RESET = { rotate: 0, scale: 1, x: 0, y: 0 };
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function PhilosophySection() {
  const stickyRef = useRef<HTMLElement>(null);
  const indexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(3, Math.floor(latest * 4));
    if (idx !== indexRef.current) {
      indexRef.current = idx;
      setActiveIndex(idx);
    }
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const active = ELEMENTS[activeIndex];

  return (
    <>
      {/* ── Intro text ───────────────────────────────────── */}
      <section className="py-32 px-6 relative bg-cream-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-display italic text-terracotta-600 text-lg">
              Metodo biodinamico
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 mt-4 mb-8 leading-tight">
              Terra, acqua, aria e fuoco.
              <span className="block text-moss-700">
                Un equilibrio reale, non solo estetico.
              </span>
            </h2>
            <p className="font-body text-lg text-charcoal-600 leading-relaxed max-w-2xl mx-auto">
              Ogni progetto nasce da un principio semplice: il giardino deve
              essere bello, sano e gestibile nel tempo. Per questo lavoriamo sui
              4 elementi biodinamici con soluzioni concrete, misurabili e
              sostenibili.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky scroll showcase ───────────────────────── */}
      <section
        ref={stickyRef}
        className="relative"
        style={{ height: "500vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* ▸ Background crossfade layers */}
          {ELEMENTS.map((el, i) => (
            <motion.div
              key={`bg-${el.title}`}
              className="absolute inset-0"
              animate={{ opacity: i === activeIndex ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              aria-hidden="true"
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: el.bgGradient, y: bgY }}
              />
            </motion.div>
          ))}

          {/* ▸ Atmospheric glow orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full
                       blur-[100px] md:blur-[150px] pointer-events-none
                       transition-colors duration-1000"
            style={{ backgroundColor: active.glowColor, y: bgY }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />

          {/* ▸ Film grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />

          {/* ▸ Video layer */}
          {ELEMENTS.map((el, i) => (
            <motion.div
              key={`vid-${el.title}`}
              className="absolute inset-0"
              animate={{ opacity: i === activeIndex ? 0.15 : 0 }}
              transition={{ duration: 1.2 }}
            >
              <video
                autoPlay loop muted playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src={`/videos/element-${el.title.toLowerCase()}.mp4`}
                  type="video/mp4"
                />
              </video>
            </motion.div>
          ))}

          {/* ▸ Content for each element */}
          {ELEMENTS.map((el, i) => {
            const show = i === activeIndex;
            return (
              <div
                key={`content-${el.title}`}
                className="absolute inset-0 flex items-center z-10"
                style={{ pointerEvents: show ? "auto" : "none" }}
              >
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-center">
                    {/* Left — text content */}
                    <div className="relative">
                      {/* Large decorative number */}
                      <motion.span
                        className="absolute -top-12 -left-2 md:-top-20 md:-left-6
                                   font-display text-[8rem] md:text-[14rem] font-bold
                                   leading-none text-white select-none pointer-events-none"
                        animate={{
                          opacity: show ? 0.03 : 0,
                          y: show ? 0 : 40,
                        }}
                        transition={{ duration: 0.8 }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>

                      {/* Element counter */}
                      <motion.span
                        className="relative font-sans text-xs md:text-sm
                                   tracking-[0.3em] uppercase mb-4 md:mb-6 block"
                        style={{ color: el.accentColor }}
                        animate={{
                          opacity: show ? 1 : 0,
                          y: show ? 0 : 15,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: show ? 0.1 : 0,
                          ease: EASE,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")} — 04
                      </motion.span>

                      {/* Title with blur reveal */}
                      <motion.h3
                        className="relative font-display text-6xl sm:text-7xl md:text-8xl
                                   lg:text-9xl font-light text-white mb-4 md:mb-6
                                   leading-[0.9]"
                        animate={{
                          opacity: show ? 1 : 0,
                          y: show ? 0 : 50,
                          filter: show ? "blur(0px)" : "blur(12px)",
                        }}
                        transition={{
                          duration: 0.9,
                          delay: show ? 0.15 : 0,
                          ease: EASE,
                        }}
                      >
                        {el.title}
                      </motion.h3>

                      {/* Accent line */}
                      <motion.div
                        className="relative h-[2px] w-24 mb-6 md:mb-8 origin-left"
                        style={{ backgroundColor: el.accentColor }}
                        animate={{
                          scaleX: show ? 1 : 0,
                          opacity: show ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: show ? 0.35 : 0,
                          ease: EASE,
                        }}
                        aria-hidden="true"
                      />

                      {/* Description */}
                      <motion.p
                        className="relative font-body text-lg md:text-xl
                                   text-white/60 leading-relaxed max-w-lg"
                        animate={{
                          opacity: show ? 1 : 0,
                          y: show ? 0 : 25,
                        }}
                        transition={{
                          duration: 0.6,
                          delay: show ? 0.45 : 0,
                          ease: EASE,
                        }}
                      >
                        {el.description}
                      </motion.p>
                    </div>

                    {/* Right — large icon (desktop only) */}
                    <div className="hidden lg:flex items-center justify-center">
                      <motion.div
                        className="relative"
                        animate={{
                          opacity: show ? 1 : 0,
                          scale: show ? 1 : 0.6,
                          rotate: show ? 0 : -15,
                        }}
                        transition={{
                          duration: 1,
                          delay: show ? 0.25 : 0,
                          ease: EASE,
                        }}
                      >
                        {/* Pulsing outer ring */}
                        <motion.div
                          className="absolute -inset-8 rounded-full border"
                          style={{ borderColor: el.accentColor }}
                          animate={
                            show
                              ? {
                                  scale: [1, 1.06, 1],
                                  opacity: [0.08, 0.18, 0.08],
                                }
                              : { scale: 1, opacity: 0 }
                          }
                          transition={{
                            duration: 3,
                            repeat: show ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                          aria-hidden="true"
                        />

                        {/* Breathing glow */}
                        <motion.div
                          className="absolute inset-0 rounded-full blur-3xl"
                          style={{ backgroundColor: el.glowColor }}
                          animate={
                            show
                              ? {
                                  scale: [1, 1.4, 1],
                                  opacity: [0.4, 0.8, 0.4],
                                }
                              : { scale: 1, opacity: 0 }
                          }
                          transition={{
                            duration: 4,
                            repeat: show ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                          aria-hidden="true"
                        />

                        {/* Icon container with element-specific animation */}
                        <motion.div
                          className="relative w-40 h-40 md:w-52 md:h-52 rounded-full
                                     border flex items-center justify-center backdrop-blur-sm"
                          style={{
                            borderColor: `${el.accentColor}25`,
                            backgroundColor: `${el.accentColor}08`,
                          }}
                          animate={
                            show ? el.iconKeyframes : ICON_RESET
                          }
                          transition={
                            show
                              ? {
                                  duration: 5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }
                              : { duration: 0.3 }
                          }
                        >
                          <el.icon
                            className="w-20 h-20 md:w-28 md:h-28"
                            style={{ color: el.accentColor }}
                            strokeWidth={1}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Mobile icon (below text) */}
                  <motion.div
                    className="lg:hidden flex justify-center mt-10"
                    animate={{
                      opacity: show ? 1 : 0,
                      scale: show ? 1 : 0.8,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: show ? 0.3 : 0,
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-full border flex items-center justify-center"
                      style={{
                        borderColor: `${el.accentColor}30`,
                        backgroundColor: `${el.accentColor}10`,
                      }}
                    >
                      <el.icon
                        className="w-10 h-10"
                        style={{ color: el.accentColor }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* ▸ Navigation dots (right side) */}
          <div
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20
                       flex flex-col gap-3 md:gap-4"
          >
            {ELEMENTS.map((el, i) => (
              <div
                key={`dot-${el.title}`}
                className="relative group flex items-center justify-end"
              >
                <span
                  className="absolute right-7 font-sans text-[10px] md:text-xs
                             tracking-wider uppercase text-white/0
                             group-hover:text-white/60 transition-all duration-300
                             whitespace-nowrap"
                >
                  {el.title}
                </span>
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{
                    scale: i === activeIndex ? 1.5 : 1,
                    backgroundColor:
                      i === activeIndex
                        ? active.accentColor
                        : "rgba(255,255,255,0.25)",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>

          {/* ▸ Scroll indicator */}
          <motion.div
            className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20
                       flex flex-col items-center gap-2"
            animate={{
              opacity: activeIndex < 3 ? 0.6 : 0,
              y: [0, 6, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/40">
              Scorri
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
