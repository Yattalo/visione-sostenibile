"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { staticReviews } from "../lib/static-data";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input, Textarea } from "../components/ui/Input";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";

export default function RecensioniPage() {
  const reviews = staticReviews;
  
  const [formData, setFormData] = useState({
    authorName: "",
    authorLocation: "",
    rating: 5,
    text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <SlideUp>
        <section className="bg-earth-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="primary" className="mb-4">
              Recensioni
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Cosa Dicono i Nostri Clienti
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-semibold">4.9/5</span>
              <span className="text-earth-300">basato su {reviews.length} recensioni</span>
            </div>
          </div>
        </section>
      </SlideUp>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <StaggerItem key={review._id} delay={index * 0.1}>
                  <Card variant="outline" className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {renderStars(review.rating)}
                      </div>
                      <blockquote className="text-muted-foreground italic mb-6">
                        &ldquo;{review.text}&rdquo;
                      </blockquote>
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-earth-400 flex items-center justify-center text-white font-bold">
                          {review.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {review.authorName}
                          </p>
                          {review.authorLocation && (
                            <p className="text-sm text-muted-foreground">
                              {review.authorLocation}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <div className="text-center mb-8">
              <Badge variant="earth" className="mb-4">
                La Tua Opinione
              </Badge>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Lascia la Tua Recensione
              </h2>
              <p className="text-muted-foreground">
                La tua opinione è importante per noi e aiuta altri clienti a conoscerci.
              </p>
            </div>
            
            <Card variant="elevated">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nome *"
                      placeholder="Il tuo nome"
                      required
                    />
                    <Input
                      label="Città"
                      placeholder="La tua città"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Valutazione
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= 5
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label="La tua recensione *"
                    placeholder="Condividi la tua esperienza con noi..."
                    required
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Invia Recensione
                  </Button>
                </form>
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
