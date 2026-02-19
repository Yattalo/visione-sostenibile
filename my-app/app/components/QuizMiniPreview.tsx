"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";

const FIRST_QUESTION = {
  label: "Qual è il tuo rapporto ideale con il giardino?",
  options: [
    { id: "contemplativo", label: "Un luogo di pace e contemplazione", emoji: "🧘" },
    { id: "sostenibile", label: "Un ecosistema sostenibile", emoji: "🌱" },
    { id: "familiare", label: "Uno spazio per la famiglia", emoji: "👨‍👩‍👧‍👦" },
    { id: "rappresentativo", label: "Un biglietto da visita elegante", emoji: "✨" },
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
    <div className={cn("max-w-2xl mx-auto", className)}>
      <p className="text-micro text-leaf-600 text-center mb-8">
        {FIRST_QUESTION.label}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FIRST_QUESTION.options.map((option) => (
          <button
            key={option.id}
            onClick={handleOptionClick}
            className="bg-white border border-paper-200/50 rounded-[30px] p-7 text-left
                       step-card hover-germoglio cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-leaf-50 flex items-center justify-center
                              text-2xl shrink-0 transition-colors group-hover:bg-leaf-100">
                {option.emoji}
              </div>
              <span className="text-base font-medium text-forest-950 pt-2 leading-snug">
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
