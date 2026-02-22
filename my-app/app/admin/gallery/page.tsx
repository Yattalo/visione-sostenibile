"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  Video,
  UploadCloud,
  Link2,
  HardDrive,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { SlideUp, StaggerItem } from "../../components/animations";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// ─── Types ──────────────────────────────────────────────────────────────────

interface GalleryImage {
  _id: Id<"gallery">;
  _creationTime: number;
  title: string;
  description?: string;
  imageUrl: string;
  mediaType?: "image" | "video";
  storageId?: Id<"_storage">;
  mimeType?: string;
  fileName?: string;
  sizeBytes?: number;
  category?: string;
  serviceId?: Id<"services">;
  order: number;
  isActive: boolean;
  createdAt?: number;
}

interface GalleryFormData {
  title: string;
  description: string;
  imageUrl: string;
  mediaType: "image" | "video";
  storageId: string;
  mimeType: string;
  fileName: string;
  sizeBytes: number;
  category: string;
  serviceId: string;
  order: number;
  isActive: boolean;
}

const EMPTY_FORM: GalleryFormData = {
  title: "",
  description: "",
  imageUrl: "",
  mediaType: "image",
  storageId: "",
  mimeType: "",
  fileName: "",
  sizeBytes: 0,
  category: "",
  serviceId: "",
  order: 0,
  isActive: true,
};

// ─── Notification ───────────────────────────────────────────────────────────

type NotificationType = "success" | "error";

interface Notification {
  type: NotificationType;
  message: string;
}

function Toast({ notification, onDismiss }: { notification: Notification; onDismiss: () => void }) {
  const isSuccess = notification.type === "success";
  return (
    <div
      role="alert"
      className={`fixed bottom-6 right-6 z-60 flex items-center gap-3 rounded-xl px-5 py-3 shadow-lg border transition-all ${
        isSuccess
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600 shrink-0" />
      )}
      <span className="text-sm font-medium">{notification.message}</span>
      <button onClick={onDismiss} className="ml-2 text-current opacity-60 hover:opacity-100" aria-label="Chiudi notifica">
        &times;
      </button>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AdminGalleryPage() {
  // ── Data ──────────────────────────────────────────────────────────────────
  const galleryQuery = useQuery(api.gallery.getAllAdmin);
  const servicesQuery = useQuery(api.services.getAllAdmin);
  const gallery = useMemo(() => galleryQuery ?? [], [galleryQuery]);
  const services = useMemo(() => servicesQuery ?? [], [servicesQuery]);

  const addImage = useMutation(api.gallery.add);
  const updateImage = useMutation(api.gallery.update);
  const removeImage = useMutation(api.gallery.remove);
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);

  // ── UI State ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [mediaFilter, setMediaFilter] = useState<"all" | "image" | "video">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState<GalleryFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  // ── Derived ───────────────────────────────────────────────────────────────
  const categories = Array.from(
    new Set(gallery.map((img) => img.category).filter(Boolean))
  ) as string[];

  const imageCount = gallery.filter((item) => (item.mediaType ?? "image") === "image").length;
  const videoCount = gallery.filter((item) => (item.mediaType ?? "image") === "video").length;

  const filtered = gallery.filter((item) => {
    const matchesSearch = `${item.title} ${item.description ?? ""} ${item.category ?? ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const itemType = item.mediaType ?? "image";
    const matchesType = mediaFilter === "all" || itemType === mediaFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  // ── Helpers ───────────────────────────────────────────────────────────────
  const notify = useCallback((type: NotificationType, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const openAddModal = useCallback(() => {
    setEditingImage(null);
    const nextOrder =
      gallery.length > 0 ? Math.max(...gallery.map((img) => img.order)) + 1 : 1;
    setForm({ ...EMPTY_FORM, order: nextOrder });
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setModalOpen(true);
  }, [gallery, previewUrl]);

  const openEditModal = useCallback((image: GalleryImage) => {
    setEditingImage(image);
    setForm({
      title: image.title,
      description: image.description ?? "",
      imageUrl: image.storageId ? "" : image.imageUrl,
      mediaType: image.mediaType ?? "image",
      storageId: image.storageId ?? "",
      mimeType: image.mimeType ?? "",
      fileName: image.fileName ?? "",
      sizeBytes: image.sizeBytes ?? 0,
      category: image.category ?? "",
      serviceId: image.serviceId ?? "",
      order: image.order,
      isActive: image.isActive,
    });
    setPreviewUrl(image.storageId ? image.imageUrl : null);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingImage(null);
    setForm(EMPTY_FORM);
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  }, [previewUrl]);

  const updateField = useCallback(
    <K extends keyof GalleryFormData>(key: K, value: GalleryFormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const uploadUrl = await generateUploadUrl({});
        const uploadResult = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
          body: file,
        });

        if (!uploadResult.ok) {
          throw new Error("Upload su Convex Storage fallito");
        }

        const payload = (await uploadResult.json()) as { storageId?: string };
        if (!payload.storageId) {
          throw new Error("Risposta upload non valida");
        }

        if (previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        const localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);

        setForm((prev) => ({
          ...prev,
          storageId: payload.storageId ?? "",
          imageUrl: prev.imageUrl.trim(),
          mediaType: file.type.startsWith("video/") ? "video" : "image",
          mimeType: file.type || "",
          fileName: file.name,
          sizeBytes: file.size,
          title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
        }));

        notify("success", "Asset caricato su Convex Storage");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Errore sconosciuto";
        notify("error", `Upload fallito: ${message}`);
      } finally {
        setUploading(false);
      }
    },
    [generateUploadUrl, notify, previewUrl]
  );

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!form.title.trim()) {
      notify("error", "Il titolo e' obbligatorio");
      return;
    }
    if (!form.imageUrl.trim() && !form.storageId) {
      notify("error", "Inserisci un URL o carica un file su Convex Storage");
      return;
    }

    setSaving(true);
    try {
      const baseArgs = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
        mediaType: form.mediaType,
        storageId: form.storageId
          ? (form.storageId as Id<"_storage">)
          : undefined,
        mimeType: form.mimeType.trim() || undefined,
        fileName: form.fileName.trim() || undefined,
        sizeBytes: form.sizeBytes > 0 ? form.sizeBytes : undefined,
        category: form.category.trim() || undefined,
        serviceId: form.serviceId
          ? (form.serviceId as Id<"services">)
          : undefined,
        order: form.order,
      };

      if (editingImage) {
        await updateImage({
          id: editingImage._id,
          ...baseArgs,
          isActive: form.isActive,
        });
        notify("success", "Immagine aggiornata con successo");
      } else {
        await addImage(baseArgs);
        notify("success", "Immagine aggiunta con successo");
      }
      closeModal();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Errore sconosciuto";
      notify("error", `Operazione fallita: ${message}`);
    } finally {
      setSaving(false);
    }
  }, [form, editingImage, addImage, updateImage, closeModal, notify]);

  const handleDelete = useCallback(
    async (image: GalleryImage) => {
      const confirmed = window.confirm(
        `Sei sicuro di voler eliminare "${image.title}"? Questa azione non puo' essere annullata.`
      );
      if (!confirmed) return;

      try {
        await removeImage({ id: image._id });
        notify("success", `"${image.title}" eliminata`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Errore sconosciuto";
        notify("error", `Eliminazione fallita: ${message}`);
      }
    },
    [removeImage, notify]
  );

  const handleToggleActive = useCallback(
    async (image: GalleryImage) => {
      try {
        await updateImage({
          id: image._id,
          title: image.title,
          description: image.description,
          imageUrl: image.storageId ? undefined : image.imageUrl || undefined,
          mediaType: image.mediaType ?? "image",
          storageId: image.storageId,
          mimeType: image.mimeType,
          fileName: image.fileName,
          sizeBytes: image.sizeBytes,
          category: image.category,
          serviceId: image.serviceId,
          order: image.order,
          isActive: !image.isActive,
        });
        notify(
          "success",
          `"${image.title}" ${image.isActive ? "disattivata" : "attivata"}`
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Errore sconosciuto";
        notify("error", `Aggiornamento fallito: ${message}`);
      }
    },
    [updateImage, notify]
  );

  // ── Render ────────────────────────────────────────────────────────────────
  const effectivePreviewUrl = previewUrl ?? form.imageUrl.trim();

  return (
    <div className="space-y-6">
      {/* Header */}
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Libreria Media
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestione asset foto e video &middot;{" "}
              <span className="font-medium">{gallery.length}</span> asset totali
              {" · "}
              <span className="font-medium">{imageCount}</span> foto
              {" · "}
              <span className="font-medium">{videoCount}</span> video
            </p>
          </div>
          <Button onClick={openAddModal}>
            <Plus className="w-4 h-4 mr-2" />
            Aggiungi asset
          </Button>
        </div>
      </SlideUp>

      {/* Filters */}
      <SlideUp delay={0.1}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {(
              [
                { key: "all" as const, label: "Tutti", count: gallery.length },
                { key: "image" as const, label: "Foto", count: imageCount },
                { key: "video" as const, label: "Video", count: videoCount },
              ] as const
            ).map((entry) => (
              <button
                key={entry.key}
                onClick={() => setMediaFilter(entry.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  mediaFilter === entry.key
                    ? "bg-forest-900 text-white"
                    : "bg-white border border-border hover:bg-muted"
                }`}
              >
                {entry.label} ({entry.count})
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                categoryFilter === "all"
                  ? "bg-sun-500 text-white"
                  : "bg-white border border-border hover:bg-muted"
              }`}
            >
              Tutte ({gallery.length})
            </button>
            {categories.map((cat) => {
              const count = gallery.filter((img) => img.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  categoryFilter === cat
                    ? "bg-sun-500 text-white"
                    : "bg-white border border-border hover:bg-muted"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
          </div>
          <div className="w-full sm:max-w-md">
            <Input
              placeholder="Cerca asset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>
      </SlideUp>

      {/* Gallery Grid */}
      <SlideUp delay={0.2}>
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Nessun asset trovato
              </p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                {searchQuery || categoryFilter !== "all"
                  ? "Prova a modificare i filtri di ricerca"
                  : "Aggiungi il primo asset alla libreria"}
              </p>
              {!searchQuery && categoryFilter === "all" && mediaFilter === "all" && (
                <Button onClick={openAddModal} size="sm" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Aggiungi asset
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item, index) => (
              <StaggerItem key={item._id} delay={index * 0.04}>
                <Card
                  variant="default"
                  className={`overflow-hidden transition-shadow hover:shadow-lg ${
                    !item.isActive ? "opacity-60" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-paper-200 overflow-hidden rounded-t-2xl -mt-6 -mx-6 mb-4">
                    {(item.mediaType ?? "image") === "video" ? (
                      <video
                        src={item.imageUrl}
                        className="w-full h-full object-cover"
                        controls={false}
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector(".fallback-icon")) {
                            const fallback = document.createElement("div");
                            fallback.className =
                              "fallback-icon absolute inset-0 flex items-center justify-center";
                            fallback.innerHTML =
                              '<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-muted-foreground/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    )}
                    {/* Status overlay */}
                    {!item.isActive && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="warning" size="sm">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Nascosta
                        </Badge>
                      </div>
                    )}
                    {/* Order badge */}
                    <div className="absolute top-3 right-3">
                      <span className="flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-lg">
                        <ArrowUpDown className="w-3 h-3" />
                        {item.order}
                      </span>
                    </div>
                  </div>

                  <CardContent className="pt-0">
                    {/* Info */}
                    <h3 className="font-display text-lg font-bold text-foreground truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Badge size="sm" variant="outline">
                        {(item.mediaType ?? "image") === "video" ? (
                          <>
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3 mr-1" />
                            Foto
                          </>
                        )}
                      </Badge>
                      <Badge size="sm" variant="earth">
                        {item.category || "Generico"}
                      </Badge>
                      {item.storageId && (
                        <Badge size="sm" variant="outline">
                          <HardDrive className="w-3 h-3 mr-1" />
                          Convex Storage
                        </Badge>
                      )}
                      <Badge size="sm" variant={item.isActive ? "success" : "warning"}>
                        {item.isActive ? "Attiva" : "Disattiva"}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(item)}
                        className="flex-1"
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Modifica
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(item)}
                        className="flex-1"
                      >
                        {item.isActive ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Disattiva
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Attiva
                          </>
                        )}
                      </Button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Elimina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        )}
      </SlideUp>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingImage ? "Modifica asset" : "Aggiungi asset"}
        description={
          editingImage
            ? "Modifica i dettagli dell'asset"
            : "Carica un file su Convex Storage o usa un URL esterno"
        }
        size="lg"
      >
        <div className="space-y-5">
          {/* Preview */}
          {effectivePreviewUrl && (
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-paper-200">
              {form.mediaType === "video" ? (
                <video
                  src={effectivePreviewUrl}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                />
              ) : (
                <img
                  src={effectivePreviewUrl}
                  alt="Anteprima"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo media
              </label>
              <select
                value={form.mediaType}
                onChange={(e) => updateField("mediaType", e.target.value as "image" | "video")}
                className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm md:text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
              >
                <option value="image">Foto</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload su Convex Storage
              </label>
              <label className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 text-sm cursor-pointer hover:bg-muted/40 transition-colors">
                <UploadCloud className="w-4 h-4" />
                <span>{uploading ? "Caricamento..." : "Seleziona file"}</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleUpload(file);
                    e.currentTarget.value = "";
                  }}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {(form.storageId || form.fileName) && (
            <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm space-y-1">
              <p className="font-medium flex items-center gap-2">
                <HardDrive className="w-4 h-4" />
                Asset su Convex Storage
              </p>
              {form.fileName && <p>File: {form.fileName}</p>}
              {form.mimeType && <p>MIME: {form.mimeType}</p>}
              {form.sizeBytes > 0 && <p>Dimensione: {Math.round(form.sizeBytes / 1024)} KB</p>}
            </div>
          )}

          <Input
            label="Titolo *"
            placeholder="Es. Giardino Villa Rossi / Drone cantiere"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          <Input
            label="URL media (opzionale se hai fatto upload)"
            placeholder="https://... oppure /images/... oppure /videos/..."
            value={form.imageUrl}
            onChange={(e) => updateField("imageUrl", e.target.value)}
            icon={<Link2 className="w-4 h-4" />}
          />

          <Textarea
            label="Descrizione"
            placeholder="Descrizione opzionale dell'asset..."
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Categoria"
              placeholder="Es. Giardini, Terrazzi, Piscine"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            />

            <Input
              label="Ordine"
              type="number"
              placeholder="0"
              value={String(form.order)}
              onChange={(e) => updateField("order", Number(e.target.value) || 0)}
            />
          </div>

          {/* Service Dropdown */}
          <div className="w-full">
            <label className="block text-sm font-medium text-foreground mb-2">
              Servizio collegato
            </label>
            <select
              value={form.serviceId}
              onChange={(e) => updateField("serviceId", e.target.value)}
              aria-label="Servizio collegato"
              className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm md:text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
            >
              <option value="">Nessuno</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          {/* Active Toggle (edit only) */}
          {editingImage && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-paper-200/50 border border-border">
              <div>
                <p className="font-medium text-sm">Visibilita</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Gli asset disattivati non sono visibili al pubblico
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateField("isActive", !form.isActive)}
                aria-label={form.isActive ? "Disattiva asset" : "Attiva asset"}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  form.isActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    form.isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" onClick={closeModal} disabled={saving}>
              Annulla
            </Button>
            <Button size="sm" onClick={handleSave} loading={saving || uploading} disabled={uploading}>
              {editingImage ? "Salva modifiche" : "Aggiungi asset"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {notification && (
        <Toast notification={notification} onDismiss={() => setNotification(null)} />
      )}
    </div>
  );
}
