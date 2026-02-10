"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "earth";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  loading?: boolean;
}

const buttonVariants = {
  primary: "bg-primary-600 text-white hover:bg-primary-500 focus-visible:ring-primary-500",
  secondary: "bg-earth-600 text-white hover:bg-earth-500 focus-visible:ring-earth-500",
  outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500",
  ghost: "text-foreground hover:bg-muted focus-visible:ring-foreground/50",
  earth: "bg-earth-500 text-white hover:bg-earth-400 focus-visible:ring-earth-500",
};

const buttonSizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        disabled={loading || disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "overflow-hidden relative",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </motion.span>
        )}
        <motion.span
          initial={{ opacity: loading ? 0 : 1 }}
          animate={{ opacity: loading ? 0 : 1 }}
          className="relative z-10"
        >
          {children}
        </motion.span>
        {variant === "primary" && (
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
