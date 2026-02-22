"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Leaf, Sparkles, Users, Waves } from "lucide-react";
import { cn } from "@/app/lib/utils";

const FIRST_QUESTION = {
  label: "Qual è il tuo rapporto ideale con il giardino?",
  options: [
    { id: "contemplativo", label: "Un luogo di pace e contemplazione", icon: Waves },
    { id: "sostenibile", label: "Un ecosistema sostenibile", icon: Leaf },
    { id: "familiare", label: "Uno spazio per la famiglia", icon: Users },
    { id: "rappresentativo", label: "Un biglietto da visita elegante", icon: Sparkles },
  ],
};

interface QuizMiniPreviewProps {
  className?: string;
}

export function QuizMiniPreview({ className }: QuizMiniPreviewProps) {
  const router = useRouter();

  const handleOptionClick = () => {
    router.push("/quiz?start=2");
  };

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="relative overflow-hidden rounded-[36px] border border-paper-300/70 bg-paper-50/90 p-4 md:p-5 shadow-floating">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-leaf-50/40" />

        <p className="relative mb-4 text-center text-micro text-leaf-700 md:mb-5">
          {FIRST_QUESTION.label}
        </p>

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FIRST_QUESTION.options.map((option) => (
            <button
              key={option.id}
              onClick={handleOptionClick}
              aria-label={`Seleziona "${option.label}" e inizia il quiz`}
              className="group relative overflow-hidden rounded-[24px] border border-paper-300/70 bg-white px-5 py-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-leaf-500/40 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-400 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-leaf-50/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-700 transition-all duration-300 group-hover:bg-leaf-100 group-hover:text-leaf-800">
                  <option.icon className="h-5 w-5" />
                </div>
                <div className="relative min-w-0 flex-1">
                  <span className="block pr-5 font-body text-[17px] leading-snug text-forest-950">
                    {option.label}
                  </span>
                  <ArrowRight className="absolute right-0 top-0.5 h-4 w-4 text-leaf-500/55 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-leaf-700" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="relative mt-5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-800/45">
          Tocca una risposta per iniziare
        </p>
      </div>
    </div>
  );
}
