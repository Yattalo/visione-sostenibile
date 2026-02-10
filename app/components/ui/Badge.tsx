import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "earth" | "success" | "warning" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const badgeVariants = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300",
  earth: "bg-earth-100 text-earth-700 dark:bg-earth-900 dark:text-earth-300",
  success: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  outline: "border border-border text-foreground bg-transparent",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
