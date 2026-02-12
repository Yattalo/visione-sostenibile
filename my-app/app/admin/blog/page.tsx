"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { SlideUp, StaggerItem } from "../../components/animations";
import { blogPosts } from "../../lib/blog";

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const posts = blogPosts.map((post) => ({
    ...post,
    isPublished: true,
    publishedAt: Date.parse(post.publishedAt),
  }));

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "published" && post.isPublished) ||
      (filter === "draft" && !post.isPublished);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Blog
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestisci gli articoli del blog
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuovo Articolo
          </Button>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            {([
              { key: "all", label: "Tutti" },
              { key: "published", label: "Pubblicati" },
              { key: "draft", label: "Bozze" },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f.key
                    ? "bg-terracotta-600 text-white"
                    : "bg-white border border-border hover:bg-muted"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <Input
              placeholder="Cerca articoli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="grid gap-4">
          {filteredPosts.map((post, index) => (
            <StaggerItem key={post.slug} delay={index * 0.05}>
              <Card variant="default" className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="primary" size="sm">
                          {post.category}
                        </Badge>
                        <Badge
                          variant={post.isPublished ? "success" : "warning"}
                        >
                          {post.isPublished ? "Pubblicato" : "Bozza"}
                        </Badge>
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.publishedAt
                            ? formatDate(post.publishedAt)
                            : "Non pubblicato"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <div className="flex lg:flex-col gap-2">
                      {post.isPublished && (
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Visualizza
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifica
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Elimina
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </div>
      </SlideUp>
    </div>
  );
}
