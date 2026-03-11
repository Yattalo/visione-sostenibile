"use client";

import { Star } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent } from "./ui/Card";
import { cn } from "../lib/utils";

interface Review {
  _id: string;
  authorName: string;
  authorLocation?: string;
  rating: number;
  text: string;
  category?: "client" | "partner";
  serviceSlug?: string;
  isApproved: boolean;
}

interface ReviewsWidgetProps {
  reviews?: Review[];
  title?: string;
  subtitleHeading?: string;
  subtitle?: string;
  showLoadMore?: boolean;
  maxReviews?: number;
  variant?: "grid" | "carousel" | "featured";
  filterByService?: string;
  filterByCategory?: "client" | "partner";
  className?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating
              ? "fill-sun-400 text-leaf-500"
              : "text-paper-400"
          )}
        />
      ))}
    </div>
  );
}

export function ReviewsWidget({
  reviews: reviewsProp,
  title = "Cosa dicono i nostri clienti",
  subtitleHeading,
  subtitle,
  maxReviews = 6,
  variant = "grid",
  filterByService,
  filterByCategory,
  className,
}: ReviewsWidgetProps) {
  const convexReviews = useQuery(api.reviews.getFeatured, { limit: maxReviews });
  const reviews = reviewsProp ?? (convexReviews as Review[] | undefined) ?? [];
  const filteredReviews = reviews.filter((r) => {
    if (filterByService && r.serviceSlug !== filterByService) return false;
    if (filterByCategory && r.category !== filterByCategory) return false;
    return true;
  });

  const displayReviews = filteredReviews.slice(0, maxReviews);

  if (displayReviews.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-24", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {(title || subtitleHeading || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="font-display text-4xl md:text-5xl text-forest-950 mb-4">
                {title}
              </h2>
            )}
            {subtitleHeading && (
              <p className="font-display text-xl md:text-2xl italic text-leaf-700 mb-3">
                {subtitleHeading}
              </p>
            )}
            {subtitle && (
              <p className="font-body text-lg md:text-xl text-forest-800/70 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {variant === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayReviews.map((review) => (
              <Card key={review._id} variant="default" className="h-full bg-paper-50 border-paper-200">
                <CardContent className="p-8">
                  <Stars rating={review.rating} />
                  <p className="font-body text-forest-800 leading-relaxed mt-6 mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="border-t border-paper-100 pt-4 mt-auto">
                    <p className="font-sans text-sm font-bold uppercase tracking-widest text-forest-900">
                      {review.authorName}
                    </p>
                    <p className="font-body text-xs text-forest-800/60 uppercase tracking-wide mt-1">
                      {review.authorLocation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {variant === "featured" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayReviews.slice(0, 2).map((review) => (
              <Card
                key={review._id}
                variant="default"
                className="h-full bg-paper-50 border-l-4 border-l-leaf-500 border-paper-200"
              >
                <CardContent className="p-10">
                  <Stars rating={review.rating} />
                  <p className="font-body text-xl text-forest-800 leading-relaxed mt-6 mb-8 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-leaf-100 flex items-center justify-center">
                      <span className="font-display text-lg font-medium text-leaf-700">
                        {review.authorName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-bold uppercase tracking-widest text-forest-900">
                        {review.authorName}
                      </p>
                      <p className="font-body text-xs text-forest-800/60 uppercase tracking-wide">
                        {review.authorLocation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {variant === "carousel" && (
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-hide">
            {displayReviews.map((review) => (
              <div key={review._id} className="snap-center shrink-0 w-[85vw] md:w-[450px]">
                <Card variant="default" className="h-full bg-paper-50 border-paper-200">
                  <CardContent className="p-8">
                    <Stars rating={review.rating} />
                    <p className="font-body text-forest-800 leading-relaxed mt-6 mb-6 italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="border-t border-paper-100 pt-4 mt-auto">
                      <p className="font-sans text-sm font-bold uppercase tracking-widest text-forest-900">
                        {review.authorName}
                      </p>
                      <p className="font-body text-xs text-forest-800/60 uppercase tracking-wide mt-1">
                        {review.authorLocation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
