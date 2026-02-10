"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  variant?: "default" | "elevated" | "outline" | "glass";
  hover?: boolean;
  children: React.ReactNode;
}

const cardVariants = {
  default: "bg-card text-card-foreground border border-border",
  elevated: "bg-card text-card-foreground shadow-card hover:shadow-card-hover",
  outline: "bg-transparent text-foreground border-2 border-border hover:border-primary-500",
  glass: "bg-white/80 dark:bg-earth-900/80 backdrop-blur-xl text-foreground border border-white/20",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      children,
      whileHover = hover ? { y: -8 } : undefined,
      transition = { type: "spring", stiffness: 300, damping: 20 },
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
          "rounded-2xl p-6",
          "transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
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
        "font-display text-xl md:text-2xl font-bold text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, children, ...props }: CardDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground text-sm md:text-base", className)} {...props}>
      {children}
    </p>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("mt-6 pt-4 border-t border-border/50 flex items-center gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
