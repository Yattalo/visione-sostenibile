"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { FadeIn, SlideUp } from "../../components/animations";
import { useClientAuthContext } from "../ClientAuthContext";
import {
  FileImage,
  Camera,
  Upload,
  Trash2,
  Download,
  Sprout,
  X,
  Image as ImageIcon,
} from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

export default function IlMioGiardinoPage() {
  const { account } = useClientAuthContext();
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const addPhoto = useMutation(api.gardenMedia.addPhoto);
  const removePhoto = useMutation(api.gardenMedia.removePhoto);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const accountId = account?._id as Id<"clientAccounts"> | undefined;

  const renderings = useQuery(
    api.gardenMedia.listRenderings,
    accountId ? { clientAccountId: accountId } : "skip"
  );

  const photos = useQuery(
    api.gardenMedia.listPhotos,
    accountId ? { clientAccountId: accountId } : "skip"
  );

  if (!account) return null;

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files || !accountId) return;

    setUploading(true);
    setUploadError("");

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          setUploadError("Solo file immagine sono supportati.");
          continue;
        }
        if (file.size > 10 * 1024 * 1024) {
          setUploadError("File troppo grande (max 10 MB).");
          continue;
        }

        const uploadUrl = await generateUploadUrl({});
        const uploadResult = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        const payload = (await uploadResult.json()) as {
          storageId?: string;
        };
        if (!payload.storageId) throw new Error("Upload fallito");

        await addPhoto({
          clientAccountId: accountId,
          storageId: payload.storageId as Id<"_storage">,
          mimeType: file.type,
          fileName: file.name,
          sizeBytes: file.size,
        });
      }
    } catch {
      setUploadError("Errore durante il caricamento. Riprova.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemovePhoto = async (id: Id<"gardenPhotos">) => {
    if (confirm("Vuoi eliminare questa foto?")) {
      await removePhoto({ id });
    }
  };

  return (
    <div>
      {/* Header */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="font-display text-3xl text-forest-950 mb-2">
            Il Mio{" "}
            <span className="italic font-light text-leaf-700">Giardino</span>
          </h1>
          <p className="text-forest-800/60 font-body">
            Visualizza i rendering e carica le foto del tuo spazio verde.
          </p>
        </div>
      </FadeIn>

      {/* Renderings Section */}
      <SlideUp delay={0.1}>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <FileImage className="w-5 h-5 text-leaf-600" />
            <h2 className="font-display text-xl text-forest-950">
              Rendering
            </h2>
            {renderings && renderings.length > 0 && (
              <Badge className="bg-leaf-500/10 text-leaf-700 border-leaf-500/20">
                {renderings.length}
              </Badge>
            )}
          </div>

          {renderings === undefined ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-paper-100 rounded-2xl h-48 animate-pulse"
                />
              ))}
            </div>
          ) : renderings.length === 0 ? (
            <Card className="bg-paper-50 border-paper-200/50 rounded-2xl border-dashed">
              <CardContent className="p-8 text-center">
                <Sprout className="w-10 h-10 text-leaf-500/30 mx-auto mb-3" />
                <p className="text-forest-800/50 font-body">
                  Andrea sta preparando il tuo rendering personalizzato.
                </p>
                <p className="text-forest-800/40 font-body text-sm mt-1">
                  Ti avviseremo via email quando sarà pronto!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderings.map((rendering) => (
                <Card
                  key={rendering._id}
                  className="bg-white border-paper-200/50 rounded-2xl shadow-soft overflow-hidden group"
                >
                  {rendering.url && (
                    <button
                      onClick={() => setPreviewImage(rendering.url)}
                      className="block w-full"
                    >
                      <div className="aspect-[4/3] bg-paper-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rendering.url}
                          alt={rendering.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </button>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-display text-sm text-forest-950 mb-1">
                      {rendering.title}
                    </h3>
                    {rendering.description && (
                      <p className="text-forest-800/50 text-xs font-body">
                        {rendering.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-forest-800/40">
                        {new Date(rendering.createdAt).toLocaleDateString(
                          "it-IT"
                        )}
                      </span>
                      {rendering.url && (
                        <a
                          href={rendering.url}
                          download={rendering.fileName}
                          className="text-leaf-600 hover:text-leaf-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SlideUp>

      {/* Photos Section */}
      <SlideUp delay={0.2}>
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-leaf-600" />
              <h2 className="font-display text-xl text-forest-950">
                Le Tue Foto
              </h2>
              {photos && photos.length > 0 && (
                <Badge className="bg-leaf-500/10 text-leaf-700 border-leaf-500/20">
                  {photos.length}
                </Badge>
              )}
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-leaf-600 hover:bg-leaf-700 text-white font-bold uppercase tracking-wider px-5 py-2 rounded-xl text-sm disabled:opacity-50"
            >
              {uploading ? (
                "Caricamento..."
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Carica Foto
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handlePhotoUpload(e.target.files)}
            />
          </div>

          {uploadError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
              {uploadError}
            </div>
          )}

          {photos === undefined ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-paper-100 rounded-xl aspect-square animate-pulse"
                />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <Card className="bg-paper-50 border-paper-200/50 rounded-2xl border-dashed">
              <CardContent className="p-8 text-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-leaf-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-leaf-500/20 transition-colors">
                    <ImageIcon className="w-8 h-8 text-leaf-500/50 group-hover:text-leaf-600 transition-colors" />
                  </div>
                  <p className="text-forest-800/60 font-body">
                    Carica le foto del tuo giardino
                  </p>
                  <p className="text-forest-800/40 font-body text-sm mt-1">
                    Ci aiuteranno a progettare il rendering perfetto
                  </p>
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className="relative group rounded-xl overflow-hidden bg-paper-100 aspect-square"
                >
                  {photo.url && (
                    <button
                      onClick={() => setPreviewImage(photo.url)}
                      className="block w-full h-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={photo.caption ?? photo.fileName}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <button
                      onClick={() =>
                        handleRemovePhoto(photo._id as Id<"gardenPhotos">)
                      }
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500/90 text-white p-2 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* Add more button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border-2 border-dashed border-paper-300 aspect-square flex flex-col items-center justify-center hover:border-leaf-500 hover:bg-leaf-500/5 transition-colors group"
              >
                <Upload className="w-6 h-6 text-paper-400 group-hover:text-leaf-500 mb-1" />
                <span className="text-xs text-paper-400 group-hover:text-leaf-600">
                  Aggiungi
                </span>
              </button>
            </div>
          )}
        </div>
      </SlideUp>

      {/* Full-screen image preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setPreviewImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
