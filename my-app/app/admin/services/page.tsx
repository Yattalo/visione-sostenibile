"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowUp,
  ArrowDown,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { SlideUp } from "../../components/animations";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// ── Types ──

interface ServiceFormData {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  order: number;
  features: string;
  metaTitle: string;
  metaDescription: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

type ServiceDoc = {
  _id: Id<"services">;
  _creationTime: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon?: string;
  image?: string;
  gallery?: string[];
  features?: string[];
  order: number;
  isActive: boolean;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: number;
};

// ── Helpers ──

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyForm: ServiceFormData = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  image: "",
  order: 1,
  features: "",
  metaTitle: "",
  metaDescription: "",
};

// ── Toast Component ──

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-right ${
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="ml-2 p-0.5 rounded hover:bg-black/10 transition-colors"
            aria-label="Chiudi notifica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ──

export default function AdminServicesPage() {
  // ── Convex data ──
  const services = useQuery(api.services.getAllAdmin) ?? [];
  const upsertService = useMutation(api.services.upsert);
  const removeService = useMutation(api.services.remove);
  const toggleActiveService = useMutation(api.services.toggleActive);
  const updateOrderService = useMutation(api.services.updateOrder);

  // ── Local state ──
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Id<"services">[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceDoc | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ServiceFormData, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ── Derived data ──
  const sortedServices = useMemo(
    () => [...services].sort((a, b) => a.order - b.order),
    [services]
  );

  const filteredServices = useMemo(
    () =>
      sortedServices.filter(
        (service) =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.slug.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [sortedServices, searchQuery]
  );

  // ── Toast helpers ──
  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Selection ──
  const toggleSelect = (id: Id<"services">) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredServices.length && filteredServices.length > 0) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredServices.map((s) => s._id));
    }
  };

  // ── Form validation ──
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ServiceFormData, string>> = {};

    if (!formData.title.trim()) {
      errors.title = "Il titolo e' obbligatorio";
    }
    if (!formData.slug.trim()) {
      errors.slug = "Lo slug e' obbligatorio";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.slug = "Lo slug puo' contenere solo lettere minuscole, numeri e trattini";
    }
    if (!formData.shortDescription.trim()) {
      errors.shortDescription = "La descrizione breve e' obbligatoria";
    }
    if (formData.order < 0) {
      errors.order = "L'ordine deve essere un numero positivo";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Modal open/close ──
  const openCreateModal = () => {
    setEditingService(null);
    const nextOrder =
      services.length > 0
        ? Math.max(...services.map((s) => s.order)) + 1
        : 1;
    setFormData({ ...emptyForm, order: nextOrder });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceDoc) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription ?? "",
      image: service.image ?? "",
      order: service.order,
      features: (service.features ?? []).join(", "),
      metaTitle: service.metaTitle ?? "",
      metaDescription: service.metaDescription ?? "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData(emptyForm);
    setFormErrors({});
  };

  // ── Form field handlers ──
  const updateField = <K extends keyof ServiceFormData>(
    field: K,
    value: ServiceFormData[K]
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title only when creating (not editing)
      if (field === "title" && !editingService) {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
    // Clear field error on change
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // ── CRUD handlers ──
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const featuresArray = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        slug: formData.slug,
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription || undefined,
        image: formData.image || undefined,
        order: formData.order,
        features: featuresArray.length > 0 ? featuresArray : undefined,
        metaTitle: formData.metaTitle || undefined,
        metaDescription: formData.metaDescription || undefined,
      };

      if (editingService) {
        await upsertService({
          id: editingService._id,
          ...payload,
        });
      } else {
        await upsertService(payload);
      }

      addToast(
        editingService
          ? `Servizio "${formData.title}" aggiornato con successo`
          : `Servizio "${formData.title}" creato con successo`,
        "success"
      );
      closeModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore sconosciuto";
      addToast(`Errore nel salvataggio: ${message}`, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (service: ServiceDoc) => {
    const confirmed = window.confirm(
      `Sei sicuro di voler eliminare "${service.title}"?\nQuesta azione non e' reversibile.`
    );
    if (!confirmed) return;

    try {
      await removeService({ id: service._id });
      setSelectedItems((prev) => prev.filter((id) => id !== service._id));
      addToast(`Servizio "${service.title}" eliminato`, "success");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore sconosciuto";
      addToast(`Errore nell'eliminazione: ${message}`, "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;

    const confirmed = window.confirm(
      `Sei sicuro di voler eliminare ${selectedItems.length} servizi?\nQuesta azione non e' reversibile.`
    );
    if (!confirmed) return;

    try {
      await Promise.all(
        selectedItems.map((id) => removeService({ id }))
      );
      addToast(
        `${selectedItems.length} servizi eliminati con successo`,
        "success"
      );
      setSelectedItems([]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore sconosciuto";
      addToast(`Errore nell'eliminazione: ${message}`, "error");
    }
  };

  const handleToggleActive = async (service: ServiceDoc) => {
    try {
      await toggleActiveService({
        id: service._id,
        isActive: !service.isActive,
      });
      addToast(
        service.isActive
          ? `"${service.title}" disattivato`
          : `"${service.title}" attivato`,
        "success"
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore sconosciuto";
      addToast(`Errore nel cambio stato: ${message}`, "error");
    }
  };

  const handleReorder = async (
    service: ServiceDoc,
    direction: "up" | "down"
  ) => {
    const currentIndex = sortedServices.findIndex(
      (s) => s._id === service._id
    );
    const neighborIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (neighborIndex < 0 || neighborIndex >= sortedServices.length) return;

    const neighbor = sortedServices[neighborIndex];

    try {
      // Swap order values between the two services
      await Promise.all([
        updateOrderService({ id: service._id, order: neighbor.order }),
        updateOrderService({ id: neighbor._id, order: service.order }),
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore sconosciuto";
      addToast(`Errore nel riordino: ${message}`, "error");
    }
  };

  // ── Render ──
  return (
    <div className="space-y-6">
      {/* Header */}
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Servizi
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestisci i servizi del tuo sito ({services.length} totali)
            </p>
          </div>
          <Button onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Nuovo servizio
          </Button>
        </div>
      </SlideUp>

      {/* Search & Bulk Actions */}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Elimina ({selectedItems.length})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItems([])}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Deseleziona
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Services Table */}
      <SlideUp delay={0.2}>
        <Card variant="default">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left" aria-label="Seleziona tutti">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.length === filteredServices.length &&
                          filteredServices.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="rounded border-border"
                        aria-label="Seleziona tutti i servizi"
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
                  {filteredServices.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-muted-foreground"
                      >
                        {searchQuery
                          ? "Nessun servizio trovato per la ricerca."
                          : "Nessun servizio presente. Crea il primo!"}
                      </td>
                    </tr>
                  )}
                  {filteredServices.map((service, index) => (
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
                          aria-label={`Seleziona ${service.title}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleReorder(service, "up")}
                            disabled={index === 0}
                            className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Sposta su"
                          >
                            <ArrowUp className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReorder(service, "down")}
                            disabled={index === filteredServices.length - 1}
                            className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Sposta giu'"
                          >
                            <ArrowDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <span className="ml-2 text-sm font-medium tabular-nums">
                            {service.order}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="font-medium">{service.title}</span>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {service.shortDescription}
                          </p>
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
                        <button
                          type="button"
                          onClick={() => handleToggleActive(service)}
                          title={
                            service.isActive
                              ? "Clicca per disattivare"
                              : "Clicca per attivare"
                          }
                          className="cursor-pointer"
                        >
                          <Badge
                            variant={service.isActive ? "success" : "warning"}
                            size="sm"
                          >
                            {service.isActive ? (
                              <ToggleRight className="w-3.5 h-3.5 mr-1" />
                            ) : (
                              <ToggleLeft className="w-3.5 h-3.5 mr-1" />
                            )}
                            {service.isActive ? "Attivo" : "Disattivo"}
                          </Badge>
                        </button>
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
                            type="button"
                            onClick={() => openEditModal(service)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            title="Modifica"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(service)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors text-red-500 hover:text-red-600"
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

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingService ? "Modifica servizio" : "Nuovo servizio"}
        description={
          editingService
            ? `Modifica i dettagli di "${editingService.title}"`
            : "Compila i campi per creare un nuovo servizio"
        }
        size="lg"
      >
        <div className="space-y-5">
          {/* Row: Title + Order */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4">
            <Input
              label="Titolo *"
              placeholder="Es: Progettazione Giardini"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              error={formErrors.title}
            />
            <Input
              label="Ordine *"
              type="number"
              min={0}
              value={String(formData.order)}
              onChange={(e) =>
                updateField("order", parseInt(e.target.value, 10) || 0)
              }
              error={formErrors.order}
            />
          </div>

          {/* Slug */}
          <Input
            label="Slug *"
            placeholder="progettazione-giardini"
            value={formData.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            error={formErrors.slug}
          />
          {!editingService && formData.title && (
            <p className="text-xs text-muted-foreground -mt-3">
              Generato automaticamente dal titolo. Puoi modificarlo.
            </p>
          )}

          {/* Short Description */}
          <Input
            label="Descrizione breve *"
            placeholder="Una frase che descrive il servizio"
            value={formData.shortDescription}
            onChange={(e) => updateField("shortDescription", e.target.value)}
            error={formErrors.shortDescription}
          />

          {/* Full Description */}
          <Textarea
            label="Descrizione completa"
            placeholder="Descrizione dettagliata del servizio..."
            value={formData.fullDescription}
            onChange={(e) => updateField("fullDescription", e.target.value)}
            rows={4}
          />

          {/* Image URL */}
          <Input
            label="URL Immagine"
            placeholder="/images/servizi/nome-servizio.png"
            value={formData.image}
            onChange={(e) => updateField("image", e.target.value)}
          />

          {/* Features */}
          <Input
            label="Caratteristiche (separate da virgola)"
            placeholder="Consulenza, Progettazione 3D, Preventivo gratuito"
            value={formData.features}
            onChange={(e) => updateField("features", e.target.value)}
          />

          {/* SEO Fields */}
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-3">
              SEO (opzionale)
            </p>
            <div className="space-y-4">
              <Input
                label="Meta Title"
                placeholder="Titolo per i motori di ricerca"
                value={formData.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
              />
              <Textarea
                label="Meta Description"
                placeholder="Descrizione per i motori di ricerca (max 160 caratteri)"
                value={formData.metaDescription}
                onChange={(e) =>
                  updateField("metaDescription", e.target.value)
                }
                rows={2}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={closeModal}>
              Annulla
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={isSaving}
              disabled={isSaving}
            >
              {editingService ? "Salva modifiche" : "Crea servizio"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
