"use client";

import Link from "next/link";
import { Sprout } from "lucide-react";
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
      <div className={cn("flex items-center gap-3", className)}>
        <Sprout className="w-5 h-5 text-leaf-500" />
        <Link href="/quiz" className="text-sm font-medium text-leaf-700 hover:text-leaf-500 underline underline-offset-4">
          Scopri che giardino fa per te
        </Link>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn("bg-paper-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6", className)}>
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-leaf-50 flex items-center justify-center">
            <Sprout className="w-8 h-8 text-leaf-500" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display text-xl font-bold text-forest-950 mb-1">Che giardino fa per te?</h3>
          <p className="text-sm text-forest-800/70">Rispondi a 6 domande e scopri il tuo profilo verde</p>
        </div>
        <Link href="/quiz">
          <Button variant="primary" size="sm">Fai il Quiz</Button>
        </Link>
      </div>
    );
  }

  // sidebar (default)
  return (
    <Card variant="default" hover className={cn("overflow-hidden", className)}>
      <CardContent className="p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-leaf-50 flex items-center justify-center mx-auto">
          <Sprout className="w-7 h-7 text-leaf-500" />
        </div>
        <h3 className="font-display text-lg font-bold text-forest-950">Che giardino fa per te?</h3>
        <p className="text-xs text-forest-800/70">6 domande per scoprire il tuo stile di giardino ideale</p>
        <Link href="/quiz" className="block">
          <Button variant="primary" size="sm" className="w-full">Fai il Quiz</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
