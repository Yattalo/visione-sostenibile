"use client";

import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { cn } from "@/app/lib/utils";

interface QuizCTAProps {
  variant?: "sidebar" | "inline" | "compact";
  className?: string;
}

export function QuizCTA({ variant = "sidebar", className }: QuizCTAProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Link
          href="/quiz"
          className="group inline-flex items-center gap-2.5 rounded-full border border-leaf-700/25 bg-paper-50/85 px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-leaf-600/45 hover:bg-leaf-50"
        >
          <Sprout className="h-4 w-4 text-leaf-500 transition-colors group-hover:text-leaf-700" />
          Inizia il quiz completo
          <ArrowRight className="h-3.5 w-3.5 text-leaf-500/80 transition-all group-hover:translate-x-0.5 group-hover:text-leaf-700" />
        </Link>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn(
        "bg-white border border-paper-200/50 rounded-[30px] p-8 flex flex-col md:flex-row items-center gap-6",
        "shadow-soft hover:shadow-medium transition-all duration-500",
        className
      )}>
        <div className="shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-leaf-50 flex items-center justify-center">
            <Sprout className="w-7 h-7 text-leaf-600" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display text-xl font-bold text-forest-950 uppercase tracking-tight mb-1">
            Che giardino fa per te?
          </h3>
          <p className="text-sm text-forest-800/70 font-body">
            Rispondi a 6 domande e scopri il tuo profilo verde
          </p>
        </div>
        <Link href="/quiz">
          <Button className="bg-sun-400 hover:bg-sun-500 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300">
            Fai il Quiz
          </Button>
        </Link>
      </div>
    );
  }

  // sidebar (default)
  return (
    <Card className={cn(
      "bg-white border-paper-200/50 rounded-[30px] shadow-soft hover:shadow-medium transition-all duration-500 overflow-hidden",
      className
    )}>
      <CardContent className="p-8 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-leaf-50 flex items-center justify-center mx-auto">
          <Sprout className="w-7 h-7 text-leaf-600" />
        </div>
        <h3 className="font-display text-lg font-bold text-forest-950 uppercase tracking-tight">
          Che giardino fa per te?
        </h3>
        <p className="text-sm text-forest-800/70 font-body">
          6 domande per scoprire il tuo stile di giardino ideale
        </p>
        <Link href="/quiz" className="block">
          <Button className="w-full bg-sun-400 hover:bg-sun-500 text-white font-bold uppercase tracking-wider text-xs py-3 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300">
            Fai il Quiz
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
