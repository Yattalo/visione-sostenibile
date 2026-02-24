"use client";

import { cn } from "../lib/utils";

interface ProcessStepsProps {
  steps: string[];
  subtitle?: string;
  className?: string;
}

export function ProcessSteps({
  steps,
  subtitle = "Dall\u2019idea alla realizzazione",
  className,
}: ProcessStepsProps) {
  return (
    <section className={cn("py-24 lg:py-32 bg-paper-50", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-4 mb-16 lg:mb-0">
            <h2 className="font-display text-5xl md:text-6xl text-leaf-600 uppercase tracking-tight leading-none">
              <span className="font-light block">Processo in</span>
              <span className="font-bold block">{steps.length} Fasi</span>
            </h2>
            <p className="mt-6 text-micro text-forest-800/40">{subtitle}</p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="step-card bg-white p-6 md:p-10 rounded-[20px] flex gap-6 md:gap-10 items-center min-h-[160px]"
                >
                  <span className="text-7xl md:text-8xl font-display text-paper-200/50 font-black leading-none shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-base md:text-lg text-forest-900 leading-snug font-medium">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
