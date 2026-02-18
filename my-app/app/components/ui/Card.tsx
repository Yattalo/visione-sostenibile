"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "elevated" | "outline";
  hover?: boolean;
  children: React.ReactNode;
}

const cardVariants = {
  default: "bg-paper-50 border border-leaf-700/20 shadow-soft",
  elevated: "bg-paper-50 border border-leaf-700/20 shadow-floating",
  outline: "bg-transparent border border-leaf-600 hover:border-leaf-500",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      children,
      whileHover = hover ? { y: -4 } : undefined,
      transition = { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={whileHover}
        transition={transition}
        className={cn(
          "relative rounded-2xl p-6",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-400",
          hover && "hover-germoglio",
          cardVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({ className, as: Tag = "h3", children, ...props }: CardTitleProps) {
  return (
    <Tag
      className={cn(
        "font-display text-xl md:text-2xl font-bold text-forest-950",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p className={cn("text-forest-800/70 text-sm md:text-base", className)} {...props}>
      {children}
    </p>
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function CardFooter({
  className,
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn("mt-6 pt-4 border-t border-paper-300 flex items-center gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
