import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "earth" | "success" | "warning" | "outline" | "eco" | "biodynamic";
  size?: "sm" | "md";
  className?: string;
}

const badgeVariants = {
  default: "bg-paper-300 text-forest-900",
  primary: "bg-leaf-100 text-leaf-700",
  earth: "bg-leaf-100 text-leaf-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  outline: "border border-paper-400 text-forest-900 bg-transparent",
  eco: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  biodynamic: "bg-amber-100 text-amber-700 border border-amber-200",
};

const badgeSizes = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
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
        "inline-flex items-center font-sans uppercase tracking-wider font-medium rounded-full",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
