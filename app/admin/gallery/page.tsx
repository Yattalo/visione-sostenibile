"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Image as ImageIcon,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../../components/animations";

const mockGallery = [
  {
    _id: "1",
    title: "Giardino Moderno Roma",
    category: "giardini",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    isActive: true,
    createdAt: Date.now(),
  },
  {
    _id: "2",
    title: "Progettazione Verde",
    category: "giardini",
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400",
    isActive: true,
    createdAt: Date.now() - 86400000,
  },
  {
    _id: "3",
    title: "Piante Ornamentali",
    category: "piante",
    imageUrl: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400",
    isActive: true,
    createdAt: Date.now() - 172800000,
  },
  {
    _id: "4",
    title: "Irrigazione",
    category: "lavori",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    isActive: false,
    createdAt: Date.now() - 259200000,
  },
];

const categories = ["all", "giardini", "piante", "lavori"];

export default function AdminGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGallery = mockGallery.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Galleria
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestisci le immagini della galleria
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi Immagine
          </Button>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary-600 text-white"
                        : "bg-white border border-border hover:bg-muted"
                    }`}
                  >
                    {cat === "all" ? "Tutte" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Cerca immagini..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item, index) => (
            <StaggerItem key={item._id} delay={index * 0.05}>
              <Card variant="default" className="overflow-hidden group">
                <div className="aspect-square relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {!item.isActive && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="warning" size="sm">
                        Bozza
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="font-medium truncate">{item.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="earth" size="sm">
                      {item.category}
                    </Badge>
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                    </button>
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
