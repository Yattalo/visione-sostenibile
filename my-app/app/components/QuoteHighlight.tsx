import { Quote } from "lucide-react";
import { cn } from "../lib/utils";

type QuoteHighlightProps = {
  quote: string;
  eyebrow?: string;
  className?: string;
};

export function QuoteHighlight({
  quote,
  eyebrow = "La voce di Andrea",
  className,
}: QuoteHighlightProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[32px] border border-leaf-200/80 bg-gradient-to-br from-leaf-50 via-white to-paper-50 p-8 shadow-soft md:p-10",
        className
      )}
    >
      <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-leaf-200/40 blur-3xl" />
      <div className="absolute -bottom-12 right-0 h-32 w-32 rounded-full bg-sun-200/25 blur-3xl" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white/80 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-leaf-700 backdrop-blur-sm">
          <Quote className="h-3.5 w-3.5" />
          {eyebrow}
        </span>

        <div className="relative mt-6">
          <Quote className="absolute -left-1 -top-2 h-10 w-10 text-leaf-300 md:h-12 md:w-12" />
          <blockquote className="pl-7 pr-2 font-body text-[1.45rem] italic leading-[1.7] text-forest-900 md:pl-10 md:text-[1.9rem]">
            {quote}
          </blockquote>
          <Quote className="absolute bottom-0 right-0 h-8 w-8 rotate-180 text-leaf-200 md:h-10 md:w-10" />
        </div>
      </div>
    </div>
  );
}
