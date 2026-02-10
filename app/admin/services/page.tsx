"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { SlideUp } from "../../components/animations";

const mockServices = [
  {
    _id: "1",
    title: "Progettazione Giardini",
    slug: "progettazione-giardini",
    shortDescription: "Progetti personalizzati per il tuo spazio verde",
    order: 1,
    isActive: true,
  },
  {
    _id: "2",
    title: "Realizzazione Giardini",
    slug: "realizzazione-giardini",
    shortDescription: "Trasformiamo i progetti in realtà",
    order: 2,
    isActive: true,
  },
  {
    _id: "3",
    title: "Manutenzioni",
    slug: "manutenzioni",
    shortDescription: "Servizi di manutenzione programmata",
    order: 12,
    isActive: true,
  },
];

export default function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredServices = mockServices.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredServices.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredServices.map((s) => s._id));
    }
  };

  return (
    <div className="space-y-6">
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Servizi
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestisci i servizi del tuo sito
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi Servizio
          </Button>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Cerca servizi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
              {selectedItems.length > 0 && (
                <div className="flex gap-2">
                  <Button variant="outline" size="md">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Elimina ({selectedItems.length})
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      <SlideUp delay={0.2}>
        <Card variant="default">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredServices.length && filteredServices.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-border"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Ordine
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Servizio
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">
                      Slug
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Stato
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredServices.map((service) => (
                    <tr
                      key={service._id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(service._id)}
                          onChange={() => toggleSelect(service._id)}
                          className="rounded border-border"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <ArrowUp className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded transition-colors">
                            <ArrowDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <span className="ml-2 text-sm font-medium">
                            {service.order}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-medium">{service.title}</span>
                          <p className="text-sm text-muted-foreground md:hidden">
                            {service.slug}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {service.slug}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={service.isActive ? "success" : "warning"}>
                          {service.isActive ? "Attivo" : "Disattivo"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/servizi/${service.slug}`}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Visualizza"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </Link>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Modifica"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-2 hover:bg-muted rounded-lg transition-colors text-red-500"
                            title="Elimina"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
