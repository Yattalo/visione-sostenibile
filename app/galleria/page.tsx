"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";
import Image from "next/image";

const categories = [
  { id: "all", label: "Tutte" },
  { id: "giardini", label: "Giardini" },
  { id: "piante", label: "Piante" },
  { id: "lavori", label: "Lavori" },
];

const galleryImages = [
  { _id: "1", title: "Giardino Moderno", category: "giardini", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" },
  { _id: "2", title: "Progettazione Verde", category: "giardini", imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800" },
  { _id: "3", title: "Piante Ornamentali", category: "piante", imageUrl: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800" },
  { _id: "4", title: "Irrigazione", category: "lavori", imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800" },
  { _id: "5", title: "Giardino Zen", category: "giardini", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" },
  { _id: "6", title: "Siepi e Cespugli", category: "piante", imageUrl: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800" },
  { _id: "7", title: "Terrazza Verde", category: "giardini", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" },
  { _id: "8", title: "Aiuole Fiorite", category: "piante", imageUrl: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=800" },
];

export default function GalleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  
  const filteredImages = selectedCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <SlideUp>
        <section className="bg-earth-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="primary" className="mb-4">
              Galleria
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              I Nostri Progetti
            </h1>
            <p className="text-xl text-earth-200 max-w-3xl">
              Scopri alcuni dei nostri progetti e lavori realizzati. Ogni giardino
              è unico, come ogni cliente.
            </p>
          </div>
        </section>
      </SlideUp>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                      : "bg-white text-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </SlideUp>

          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <StaggerItem key={image._id} delay={index * 0.05}>
                  <div
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold">{image.title}</p>
                        <p className="text-sm text-white/70 capitalize">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
              priority
            />
            <p className="text-white text-center mt-4 text-lg">{selectedImage.title}</p>
          </div>
        </div>
      )}

      <section className="py-20 bg-earth-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <Badge variant="primary" className="mb-4">
              Vuoi Vederne Altri?
            </Badge>
            <h2 className="font-display text-3xl font-bold mb-6">
              Realizza il Tuo Progetto
            </h2>
            <p className="text-earth-200 text-lg mb-8">
              Contattaci per vedere altri progetti o per discutere del tuo giardino dei sogni.
            </p>
            <Button size="lg" className="bg-white text-earth-900 hover:bg-earth-100">
              Contattaci
            </Button>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
