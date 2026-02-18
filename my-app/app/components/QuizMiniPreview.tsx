"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
      <p className="text-sm text-forest-800/60 text-center mb-6 font-medium">{FIRST_QUESTION.label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIRST_QUESTION.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={handleOptionClick}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-paper-50 border border-leaf-700/20 rounded-xl p-5 text-left hover-germoglio transition-all cursor-pointer"
          >
            <span className="text-2xl mb-2 block">{option.emoji}</span>
            <span className="text-sm font-medium text-forest-950">{option.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
