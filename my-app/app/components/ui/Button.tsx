"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  loading?: boolean;
}

const buttonVariants = {
  primary: "bg-terracotta-500 text-white hover:bg-terracotta-600 border border-transparent",
  secondary: "bg-moss-700 text-white hover:bg-moss-600 border border-transparent",
  outline: "border border-charcoal-300 text-charcoal-700 hover:bg-charcoal-100 hover:border-charcoal-400",
  ghost: "text-charcoal-600 hover:text-terracotta-600 border border-transparent hover:bg-terracotta-50/50",
};

const buttonSizes = {
  sm: "h-10 px-5 text-xs",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
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
    const isDisabled = loading || disabled;

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        whileHover={isDisabled ? undefined : { scale: variant === "primary" ? 1.05 : 1.01 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full",
          "font-sans uppercase tracking-[0.12em] font-medium whitespace-nowrap",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "primary" && "hover-sun",
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
                strokeWidth="3"
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
      </motion.button>
    );
  }
);

Button.displayName = "Button";
