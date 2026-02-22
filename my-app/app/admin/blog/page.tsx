"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Globe,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  UploadCloud,
  HardDrive,
  Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { SlideUp, StaggerItem } from "../../components/animations";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// ── Types ──

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverStorageId: string;
  coverMimeType: string;
  coverFileName: string;
  coverSizeBytes: number;
  category: string;
  author: string;
  readTime: string;
}

type FilterType = "all" | "published" | "draft";

interface Notice {
  type: "success" | "error";
  message: string;
}

interface GalleryAsset {
  _id: Id<"gallery">;
  title: string;
  imageUrl: string;
  mediaType?: "image" | "video";
  storageId?: Id<"_storage">;
  mimeType?: string;
  fileName?: string;
  sizeBytes?: number;
  category?: string;
  isActive: boolean;
}

// ── Helpers ──

const emptyForm: BlogPostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  coverStorageId: "",
  coverMimeType: "",
  coverFileName: "",
  coverSizeBytes: 0,
  category: "",
  author: "Team Visione Sostenibile",
  readTime: "5 min",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Component ──

export default function AdminBlogPage() {
  const posts = useQuery(api.blog.getAllAdmin);
  const galleryAssetsQuery = useQuery(api.gallery.getAllAdmin);
  const createPost = useMutation(api.blog.create);
  const updatePost = useMutation(api.blog.update);
  const togglePublish = useMutation(api.blog.togglePublish);
  const removePost = useMutation(api.blog.remove);
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<Id<"blogPosts"> | null>(null);
  const [editingIsPublished, setEditingIsPublished] = useState(false);
  const [form, setForm] = useState<BlogPostForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaSearchQuery, setMediaSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<Id<"blogPosts"> | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

  // ── Notice ──

  const showNotice = useCallback((type: Notice["type"], message: string) => {
    setNotice({ type, message });
    setTimeout(() => setNotice(null), 4000);
  }, []);

  const clearBlobPreview = useCallback(() => {
    setCoverPreviewUrl((prev) => {
      if (prev?.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
  }, []);

  // ── Form field update ──

  const updateField = useCallback(
    <K extends keyof BlogPostForm>(key: K, value: BlogPostForm[K]) => {
      setForm((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "title") {
          next.slug = slugify(value as string);
        }
        return next;
      });
    },
    []
  );

  const handleCoverUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        showNotice("error", "Carica un file immagine valido.");
        return;
      }

      setUploadingCover(true);
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
          throw new Error("Upload cover fallito");
        }

        const payload = (await uploadResult.json()) as { storageId?: string };
        if (!payload.storageId) {
          throw new Error("Risposta upload non valida");
        }

        clearBlobPreview();
        const localPreview = URL.createObjectURL(file);
        setCoverPreviewUrl(localPreview);

        setForm((prev) => ({
          ...prev,
          coverStorageId: payload.storageId ?? "",
          coverMimeType: file.type || "",
          coverFileName: file.name,
          coverSizeBytes: file.size,
          // Prefer storage as source of truth after upload.
          coverImage: "",
          title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
        }));
        showNotice("success", "Cover caricata su Convex Storage.");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Errore sconosciuto";
        showNotice("error", `Upload cover fallito: ${message}`);
      } finally {
        setUploadingCover(false);
      }
    },
    [clearBlobPreview, generateUploadUrl, showNotice]
  );

  // ── Modal: open for create ──

  const openCreate = useCallback(() => {
    clearBlobPreview();
    setEditingId(null);
    setEditingIsPublished(false);
    setIsMediaPickerOpen(false);
    setMediaSearchQuery("");
    setForm(emptyForm);
    setIsModalOpen(true);
  }, [clearBlobPreview]);

  // ── Modal: open for edit ──

  const openEdit = useCallback(
    (post: NonNullable<typeof posts>[number]) => {
      clearBlobPreview();
      setEditingId(post._id);
      setEditingIsPublished(post.isPublished);
      setIsMediaPickerOpen(false);
      setMediaSearchQuery("");
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverStorageId ? "" : post.coverImage ?? "",
        coverStorageId: post.coverStorageId ?? "",
        coverMimeType: post.coverMimeType ?? "",
        coverFileName: post.coverFileName ?? "",
        coverSizeBytes: post.coverSizeBytes ?? 0,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
      });
      setCoverPreviewUrl(post.coverStorageId ? post.coverImage ?? null : null);
      setIsModalOpen(true);
    },
    [clearBlobPreview]
  );

  const handleSelectCoverFromLibrary = useCallback(
    (asset: GalleryAsset) => {
      if (!asset.imageUrl?.trim()) {
        showNotice("error", "Asset selezionato senza URL valido.");
        return;
      }

      clearBlobPreview();
      setCoverPreviewUrl(asset.imageUrl);
      setForm((prev) => ({
        ...prev,
        coverImage: asset.storageId ? "" : asset.imageUrl,
        coverStorageId: asset.storageId ?? "",
        coverMimeType: asset.mimeType ?? "",
        coverFileName: asset.fileName ?? asset.title,
        coverSizeBytes: asset.sizeBytes ?? 0,
        title: prev.title || asset.title,
      }));
      setIsMediaPickerOpen(false);
      setMediaSearchQuery("");
      showNotice("success", `Cover selezionata: ${asset.title}`);
    },
    [clearBlobPreview, showNotice]
  );

  // ── Save (create or update) ──

  const handleSave = useCallback(async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      showNotice("error", "Titolo, slug e contenuto sono obbligatori.");
      return;
    }

    setSaving(true);
    try {
      const useStorageCover = !!form.coverStorageId && !form.coverImage.trim();
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content,
        coverImage: form.coverImage.trim() || undefined,
        coverStorageId: useStorageCover
          ? (form.coverStorageId as Id<"_storage">)
          : undefined,
        coverMimeType: useStorageCover ? form.coverMimeType || undefined : undefined,
        coverFileName: useStorageCover ? form.coverFileName || undefined : undefined,
        coverSizeBytes: useStorageCover && form.coverSizeBytes > 0 ? form.coverSizeBytes : undefined,
        category: form.category.trim() || "Generale",
        author: form.author.trim() || "Team Visione Sostenibile",
        readTime: form.readTime.trim() || "5 min",
      };

      if (editingId) {
        await updatePost({
          id: editingId,
          ...payload,
          isPublished: editingIsPublished,
        });
        showNotice("success", "Articolo aggiornato con successo.");
      } else {
        await createPost(payload);
        showNotice("success", "Articolo creato come bozza.");
      }

      setIsModalOpen(false);
      setEditingId(null);
      clearBlobPreview();
      setForm(emptyForm);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Errore durante il salvataggio.";
      showNotice("error", message);
    } finally {
      setSaving(false);
    }
  }, [
    form,
    editingId,
    editingIsPublished,
    createPost,
    updatePost,
    showNotice,
    clearBlobPreview,
  ]);

  // ── Toggle publish ──

  const handleTogglePublish = useCallback(
    async (id: Id<"blogPosts">, currentlyPublished: boolean) => {
      try {
        await togglePublish({ id, isPublished: !currentlyPublished });
        showNotice(
          "success",
          currentlyPublished
            ? "Articolo impostato come bozza."
            : "Articolo pubblicato."
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Errore durante l'operazione.";
        showNotice("error", message);
      }
    },
    [togglePublish, showNotice]
  );

  // ── Delete ──

  const handleDelete = useCallback(
    async (id: Id<"blogPosts">) => {
      try {
        await removePost({ id });
        showNotice("success", "Articolo eliminato.");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Errore durante l'eliminazione.";
        showNotice("error", message);
      } finally {
        setDeletingId(null);
      }
    },
    [removePost, showNotice]
  );

  // ── Filtered posts ──

  const filteredPosts = (posts ?? []).filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "published" && post.isPublished) ||
      (filter === "draft" && !post.isPublished);
    return matchesSearch && matchesFilter;
  });

  const publishedCount = (posts ?? []).filter((p) => p.isPublished).length;
  const draftCount = (posts ?? []).filter((p) => !p.isPublished).length;
  const effectiveCoverPreview = coverPreviewUrl ?? form.coverImage.trim();
  const galleryAssets = (galleryAssetsQuery ?? []) as GalleryAsset[];
  const imageAssets = galleryAssets.filter(
    (asset) => (asset.mediaType ?? "image") === "image"
  );
  const filteredImageAssets = imageAssets.filter((asset) =>
    `${asset.title} ${asset.fileName ?? ""} ${asset.category ?? ""}`
      .toLowerCase()
      .includes(mediaSearchQuery.toLowerCase())
  );

  // ── Loading state ──

  if (posts === undefined) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-leaf-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Notice Banner ── */}
      {notice && (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
            notice.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {notice.message}
        </div>
      )}

      {/* ── Header ── */}
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Blog
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestisci gli articoli del blog &middot; {posts.length} articol
              {posts.length === 1 ? "o" : "i"}
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Nuovo Articolo
          </Button>
        </div>
      </SlideUp>

      {/* ── Filters + Search ── */}
      <SlideUp delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            {(
              [
                { key: "all" as const, label: "Tutti", count: posts.length },
                {
                  key: "published" as const,
                  label: "Pubblicati",
                  count: publishedCount,
                },
                { key: "draft" as const, label: "Bozze", count: draftCount },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  filter === f.key
                    ? "bg-sun-500 text-white"
                    : "bg-white border border-border hover:bg-muted"
                }`}
              >
                {f.label}{" "}
                <span className="opacity-60">({f.count})</span>
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

      {/* ── Empty state ── */}
      {filteredPosts.length === 0 && (
        <SlideUp delay={0.2}>
          <div className="text-center py-16">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-lg">
              {posts.length === 0
                ? "Nessun articolo ancora. Crea il primo!"
                : "Nessun articolo corrisponde ai filtri."}
            </p>
          </div>
        </SlideUp>
      )}

      {/* ── Post List ── */}
      <SlideUp delay={0.2}>
        <div className="grid gap-4">
          {filteredPosts.map((post, index) => (
            <StaggerItem key={post._id} delay={index * 0.05}>
              <Card
                variant="default"
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* ── Post Info ── */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="primary" size="sm">
                          {post.category}
                        </Badge>
                        <Badge
                          variant={post.isPublished ? "success" : "warning"}
                          size="sm"
                        >
                          {post.isPublished ? "Pubblicato" : "Bozza"}
                        </Badge>
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2 truncate">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
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

                    {/* ── Actions ── */}
                    <div className="flex lg:flex-col gap-2 shrink-0">
                      {/* Publish / Unpublish */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleTogglePublish(post._id, post.isPublished)
                        }
                        className={
                          post.isPublished
                            ? "text-yellow-600 hover:bg-yellow-50"
                            : "text-green-600 hover:bg-green-50"
                        }
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        {post.isPublished ? "Bozza" : "Pubblica"}
                      </Button>

                      {/* View (only published) */}
                      {post.isPublished && (
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Visualizza
                          </Button>
                        </Link>
                      )}

                      {/* Edit */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(post)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Modifica
                      </Button>

                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => setDeletingId(post._id)}
                      >
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

      {/* ── Create / Edit Modal ── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (!saving) {
            clearBlobPreview();
            setIsModalOpen(false);
            setEditingId(null);
            setForm(emptyForm);
          }
        }}
        title={editingId ? "Modifica Articolo" : "Nuovo Articolo"}
        size="xl"
      >
        <div className="space-y-5">
          {/* Title */}
          <Input
            label="Titolo *"
            placeholder="Es. Come curare il giardino in primavera"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          {/* Slug (auto-generated, editable) */}
          <Input
            label="Slug (URL)"
            placeholder="come-curare-il-giardino-in-primavera"
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
          />

          {/* Excerpt */}
          <Textarea
            label="Estratto"
            placeholder="Breve descrizione dell'articolo (visibile nella lista e nei social)"
            rows={3}
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
          />

          {/* Content */}
          <Textarea
            label="Contenuto (Markdown) *"
            placeholder="Scrivi il contenuto dell'articolo in formato Markdown..."
            rows={12}
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
          />

          {/* Cover Preview */}
          {effectiveCoverPreview && (
            <div className="relative w-full h-52 rounded-xl overflow-hidden bg-paper-200">
              <img
                src={effectiveCoverPreview}
                alt="Anteprima cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Category */}
          <Input
            label="Categoria"
            placeholder="Es. Manutenzione, Progettazione"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          />

          {/* Cover upload + URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload cover su Convex Storage
              </label>
              <label className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 text-sm cursor-pointer hover:bg-muted/40 transition-colors">
                <UploadCloud className="w-4 h-4" />
                <span>{uploadingCover ? "Caricamento..." : "Seleziona immagine"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleCoverUpload(file);
                    e.currentTarget.value = "";
                  }}
                  disabled={uploadingCover}
                />
              </label>
            </div>

            <Input
              label="Cover URL (opzionale, sovrascrive storage)"
              placeholder="https://... oppure /images/blog/..."
              value={form.coverImage}
              onChange={(e) => updateField("coverImage", e.target.value)}
              icon={<ImageIcon className="w-4 h-4" />}
            />
          </div>

          <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Libreria Media Convex
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Seleziona una cover gi&agrave; presente in galleria.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMediaPickerOpen(true)}
                disabled={galleryAssetsQuery === undefined}
              >
                {galleryAssetsQuery === undefined
                  ? "Caricamento..."
                  : `Scegli da Libreria (${imageAssets.length})`}
              </Button>
            </div>
          </div>

          {(form.coverStorageId || form.coverFileName) && (
            <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm space-y-1">
              <p className="font-medium flex items-center gap-2">
                <HardDrive className="w-4 h-4" />
                Cover su Convex Storage
              </p>
              {form.coverFileName && <p>File: {form.coverFileName}</p>}
              {form.coverMimeType && <p>MIME: {form.coverMimeType}</p>}
              {form.coverSizeBytes > 0 && <p>Dimensione: {Math.round(form.coverSizeBytes / 1024)} KB</p>}
              <button
                type="button"
                className="text-xs text-red-600 hover:text-red-700 underline mt-1"
                onClick={() =>
                  {
                    clearBlobPreview();
                    setForm((prev) => ({
                      ...prev,
                      coverStorageId: "",
                      coverMimeType: "",
                      coverFileName: "",
                      coverSizeBytes: 0,
                    }));
                  }
                }
              >
                Rimuovi cover da storage (usa URL manuale)
              </button>
            </div>
          )}

          {/* Two-column row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Author */}
            <Input
              label="Autore"
              placeholder="Team Visione Sostenibile"
              value={form.author}
              onChange={(e) => updateField("author", e.target.value)}
            />

            {/* Read Time */}
            <Input
              label="Tempo di lettura"
              placeholder="5 min"
              value={form.readTime}
              onChange={(e) => updateField("readTime", e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                clearBlobPreview();
                setIsModalOpen(false);
                setEditingId(null);
                setForm(emptyForm);
              }}
              disabled={saving}
            >
              Annulla
            </Button>
            <Button onClick={handleSave} loading={saving || uploadingCover} disabled={uploadingCover}>
              {editingId ? "Salva Modifiche" : "Crea Articolo"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* ── Media Picker Modal ── */}
      <Modal
        isOpen={isMediaPickerOpen}
        onClose={() => {
          setIsMediaPickerOpen(false);
          setMediaSearchQuery("");
        }}
        title="Seleziona cover dalla Libreria Media"
        size="xl"
      >
        <div className="space-y-4">
          <Input
            placeholder="Cerca per titolo, file o categoria..."
            value={mediaSearchQuery}
            onChange={(e) => setMediaSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />

          {galleryAssetsQuery === undefined ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Caricamento libreria...
            </div>
          ) : filteredImageAssets.length === 0 ? (
            <div className="rounded-xl border border-border bg-muted/20 px-4 py-8 text-center text-sm text-muted-foreground">
              Nessuna immagine trovata con questi filtri.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {filteredImageAssets.map((asset) => (
                <button
                  key={asset._id}
                  type="button"
                  onClick={() => handleSelectCoverFromLibrary(asset)}
                  className="group text-left rounded-xl border border-border bg-white overflow-hidden hover:border-leaf-300 hover:shadow-sm transition-all"
                >
                  <div className="relative h-36 bg-paper-200">
                    <img
                      src={asset.imageUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-sm text-foreground truncate">
                      {asset.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {asset.fileName || "Senza nome file"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge size="sm" variant="outline">
                        {asset.category || "Generico"}
                      </Badge>
                      {asset.storageId && (
                        <Badge size="sm" variant="earth">
                          Storage
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>

      {/* ── Delete Confirmation Modal ── */}
      <Modal
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        title="Conferma Eliminazione"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Sei sicuro di voler eliminare questo articolo? Questa azione non
            pu&ograve; essere annullata.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              Annulla
            </Button>
            <Button
              variant="primary"
              className="bg-red-500! hover:bg-red-600! text-white!"
              onClick={() => {
                if (deletingId) {
                  handleDelete(deletingId);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Elimina
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
