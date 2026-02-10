import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { blogPosts } from "../lib/blog";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-primary-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alla Home
            </Link>
            <Badge variant="primary" className="mb-4">
              Blog
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Il Nostro Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Consigli, tendenze e novità dal mondo del giardinaggio e della
              progettazione del verde.
            </p>
          </div>
        </SlideUp>

        <StaggerContainer delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <StaggerItem key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <Card
                    variant="elevated"
                    hover
                    className="h-full group overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-earth-100 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-earth-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl">🌿</span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="primary" size="sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent>
                      <h2 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
}
