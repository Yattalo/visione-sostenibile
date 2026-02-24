"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface AccordionFAQProps {
  faqs: FaqItem[];
  title?: string;
  className?: string;
}

export function AccordionFAQ({ faqs, title = "FAQ", className }: AccordionFAQProps) {
  return (
    <section className={cn("py-24 lg:py-32 bg-paper-50", className)}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-leaf-600 uppercase tracking-tight">
            {title}
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="faq-card bg-white rounded-xl overflow-hidden shadow-sm group border border-paper-200/30"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-forest-900">
                <span className="text-lg">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-leaf-600 transition-transform duration-500 group-open:rotate-180 shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-6 text-forest-800/70 leading-relaxed text-lg border-t border-paper-50 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
