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
  serviceSlug?: string;
  isApproved: boolean;
}

interface ReviewsWidgetProps {
  reviews?: Review[];
  title?: string;
  subtitle?: string;
  showLoadMore?: boolean;
  maxReviews?: number;
  variant?: "grid" | "carousel" | "featured";
  filterByService?: string;
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
  subtitle,
  maxReviews = 6,
  variant = "grid",
  filterByService,
  className,
}: ReviewsWidgetProps) {
  const convexReviews = useQuery(api.reviews.getFeatured, { limit: maxReviews });
  const reviews = reviewsProp ?? (convexReviews as Review[] | undefined) ?? [];
  const filteredReviews = filterByService
    ? reviews.filter((r) => r.serviceSlug === filterByService)
    : reviews;

  const displayReviews = filteredReviews.slice(0, maxReviews);

  if (displayReviews.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-16", className)}>
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && (
            <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-3">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="font-body text-lg text-forest-800/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {variant === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <Card key={review._id} variant="default" className="h-full bg-paper-50">
              <CardContent>
                <Stars rating={review.rating} />
                <p className="font-body text-forest-800 leading-relaxed mt-4 mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-paper-100 pt-3 mt-3">
                  <p className="font-sans text-sm uppercase tracking-wider text-forest-900">
                    {review.authorName}
                  </p>
                  <p className="font-body text-sm text-forest-800/60">
                    {review.authorLocation}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {variant === "featured" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {displayReviews.slice(0, 2).map((review) => (
            <Card
              key={review._id}
              variant="default"
              className="h-full bg-paper-50 border-l-4 border-l-leaf-500"
            >
              <CardContent>
                <Stars rating={review.rating} />
                <p className="font-body text-lg text-forest-800 leading-relaxed mt-4 mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center">
                    <span className="font-sans text-sm font-medium text-leaf-700">
                      {review.authorName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans text-sm uppercase tracking-wider text-forest-900">
                      {review.authorName}
                    </p>
                    <p className="font-body text-sm text-forest-800/60">
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
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
          {displayReviews.map((review) => (
            <div key={review._id} className="snap-start shrink-0 w-full md:w-[400px]">
              <Card variant="default" className="h-full bg-paper-50">
                <CardContent>
                  <Stars rating={review.rating} />
                  <p className="font-body text-forest-800 leading-relaxed mt-4 mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="border-t border-paper-100 pt-3 mt-3">
                    <p className="font-sans text-sm uppercase tracking-wider text-forest-900">
                      {review.authorName}
                    </p>
                    <p className="font-body text-sm text-forest-800/60">
                      {review.authorLocation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
