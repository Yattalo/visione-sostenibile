"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";
import { cn } from "../lib/utils";

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.6, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SlideUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
  threshold = 0.1,
}: SlideUpProps) {
  const { ref, controls } = useScrollAnimation(threshold);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SlideDownProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideDown({ children, delay = 0, duration = 0.5, className }: SlideDownProps) {
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  scale?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.4,
  className,
  scale = 0.95,
}: ScaleInProps) {
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({ children, className, delay = 0 }: StaggerContainerProps) {
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
}

export function StaggerItem({
  children,
  className,
  delay = 0,
  variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}: StaggerItemProps) {
  const { ref, controls } = useScrollAnimation(0.1);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypingText({ text, className, speed = 50, delay = 0 }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 ml-1 bg-sun-400 align-middle"
      />
    </span>
  );
}

interface BounceProps {
  children: React.ReactNode;
  className?: string;
}

export function Bounce({ children, className }: BounceProps) {
  return (
    <motion.span
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

interface GlowProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function Glow({ children, className, color = "rgba(34, 197, 94, 0.5)" }: GlowProps) {
  return (
    <motion.div
      className={cn("relative inline-block", className)}
      style={{ "--glow-color": color } as React.CSSProperties}
    >
      <motion.div
        className="absolute inset-0 blur-xl"
        style={{ background: color }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </motion.div>
  );
}
