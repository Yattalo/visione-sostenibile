"use client";

import { SkeletonCard, SkeletonHero, SkeletonStats, SkeletonGallery, SkeletonReview, SkeletonForm } from "./ui/Skeleton";

interface LoadingStateProps {
  variant?: "default" | "hero" | "stats" | "gallery" | "reviews" | "form" | "cards";
  count?: number;
}

export function LoadingState({ variant = "default", count = 6 }: LoadingStateProps) {
  switch (variant) {
    case "hero":
      return (
        <section className="py-20 bg-forest-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SkeletonHero />
          </div>
        </section>
      );
    case "stats":
      return (
        <section className="py-12 bg-forest-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SkeletonStats />
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SkeletonGallery count={count} />
          </div>
        </section>
      );
    case "reviews":
      return (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(count)].map((_, i) => (
                <SkeletonReview key={i} />
              ))}
            </div>
          </div>
        </section>
      );
    case "form":
      return (
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <SkeletonForm />
          </div>
        </section>
      );
    case "cards":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(count)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
    default:
      return (
        <div className="space-y-4">
          {[...Array(count)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      );
  }
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-paper-50 to-white py-24">
      <LoadingState variant="hero" />
      <LoadingState variant="cards" count={3} />
      <LoadingState variant="stats" />
      <LoadingState variant="reviews" count={3} />
    </div>
  );
}
