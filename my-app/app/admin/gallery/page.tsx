"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { Image as ImageIcon, Search, Trash2 } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { SlideUp } from "../../components/animations";
import { api } from "../../../convex/_generated/api";

export default function AdminGalleryPage() {
  const gallery = useQuery(api.gallery.getAll) ?? [];
  const [query, setQuery] = useState("");

  const filtered = gallery.filter((item) =>
    `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SlideUp>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Galleria
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestione immagini e categorie
          </p>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <Input
          placeholder="Cerca immagini..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="grid gap-4">
          {filtered.map((item) => (
            <Card key={item._id}>
              <CardContent className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-moss-100 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-moss-700" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge size="sm" variant="earth">
                        {item.category || "Generico"}
                      </Badge>
                      <Badge size="sm" variant={item.isActive ? "success" : "warning"}>
                        {item.isActive ? "Attiva" : "Disattiva"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <button className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </SlideUp>
    </div>
  );
}
