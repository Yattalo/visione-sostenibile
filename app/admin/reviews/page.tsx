"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../../components/animations";

const mockReviews = [
  {
    _id: "1",
    authorName: "Marco Rossi",
    authorLocation: "Roma",
    rating: 5,
    text: "Servizio eccellente, molto professionali! Hanno trasformato il mio giardino in un paradiso verde.",
    isApproved: false,
    createdAt: Date.now(),
  },
  {
    _id: "2",
    authorName: "Laura Bianchi",
    authorLocation: "Fiumicino",
    rating: 5,
    text: "Ottimo lavoro, giardino splendente! Consigliatissimi.",
    isApproved: true,
    createdAt: Date.now() - 86400000,
  },
  {
    _id: "3",
    authorName: "Giuseppe Verdi",
    rating: 4,
    text: "Buon servizio, professionali e puntuali.",
    isApproved: true,
    createdAt: Date.now() - 172800000,
  },
];

export default function AdminReviewsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch =
      review.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && !review.isApproved) ||
      (filter === "approved" && review.isApproved);
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="space-y-6">
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Recensioni
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestisci le recensioni dei clienti
            </p>
          </div>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            {(["all", "pending", "approved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f
                    ? "bg-primary-600 text-white"
                    : "bg-white border border-border hover:bg-muted"
                }`}
              >
                {f === "all" ? "Tutte" : f === "pending" ? "In attesa" : "Approvate"}
                {f === "pending" && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-white rounded-full">
                    {mockReviews.filter((r) => !r.isApproved).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <Input
              placeholder="Cerca recensioni..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="grid gap-4">
          {filteredReviews.map((review) => (
            <Card key={review._id} variant="default">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-earth-400 flex items-center justify-center text-white font-bold">
                        {review.authorName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold">{review.authorName}</span>
                        {review.authorLocation && (
                          <span className="text-muted-foreground ml-2">
                            - {review.authorLocation}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <Badge variant={review.isApproved ? "success" : "warning"}>
                        {review.isApproved ? "Approvata" : "In attesa"}
                      </Badge>
                    </div>
                    <p className="text-foreground">&ldquo;{review.text}&rdquo;</p>
                  </div>
                  <div className="flex lg:flex-col gap-2">
                    {!review.isApproved && (
                      <>
                        <Button variant="outline" size="sm">
                          <Check className="w-4 h-4 mr-1" />
                          Approva
                        </Button>
                        <Button variant="outline" size="sm">
                          <X className="w-4 h-4 mr-1" />
                          Rifiuta
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Elimina
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SlideUp>
    </div>
  );
}
