"use client";

import { useCallback, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, X, ImagePlus, AlertCircle, Loader2 } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { cn } from "../lib/utils";
import { FadeIn } from "./animations";
import { Button } from "./ui/Button";

const MAX_FILES = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface UploadedPhoto {
  storageId: string;
  previewUrl: string;
  fileName: string;
}

interface PhotoUploadStepProps {
  onComplete: (storageIds: string[]) => void;
  onSkip: () => void;
}

export default function PhotoUploadStep({ onComplete, onSkip }: PhotoUploadStepProps) {
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);

  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = MAX_FILES - photos.length;

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" non è un formato supportato. Usa JPG, PNG o WebP.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `"${file.name}" supera i 10 MB. Riduci le dimensioni e riprova.`;
    }
    return null;
  }, []);

  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;

      const available = MAX_FILES - photos.length;
      if (available <= 0) {
        setError("Hai già caricato il numero massimo di foto (3).");
        return;
      }

      const toUpload = files.slice(0, available);

      // Validate all files first
      for (const file of toUpload) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
      }

      setError(null);
      setUploading(true);

      try {
        const uploaded: UploadedPhoto[] = [];

        for (const file of toUpload) {
          const uploadUrl = await generateUploadUrl({});
          const result = await fetch(uploadUrl, {
            method: "POST",
            headers: { "Content-Type": file.type },
            body: file,
          });

          if (!result.ok) {
            throw new Error(`Upload fallito per "${file.name}"`);
          }

          const { storageId } = (await result.json()) as { storageId: string };
          uploaded.push({
            storageId,
            previewUrl: URL.createObjectURL(file),
            fileName: file.name,
          });
        }

        setPhotos((prev) => [...prev, ...uploaded]);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Upload fallito. Riprova.";
        setError(message);
      } finally {
        setUploading(false);
      }
    },
    [photos.length, validateFile, generateUploadUrl]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      void uploadFiles(files);
      // Reset input so the same file can be re-selected
      e.target.value = "";
    },
    [uploadFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      void uploadFiles(files);
    },
    [uploadFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => {
      const removed = prev[index];
      if (removed) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
    setError(null);
  }, []);

  const handleContinue = useCallback(() => {
    onComplete(photos.map((p) => p.storageId));
  }, [photos, onComplete]);

  return (
    <FadeIn>
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-leaf-50 flex items-center justify-center mx-auto mb-5">
          <Camera className="w-8 h-8 text-leaf-600" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-forest-950 leading-tight tracking-tight mb-3">
          Hai foto del tuo giardino?
        </h2>
        <p className="text-base text-forest-800/60 font-body max-w-md mx-auto">
          Carica fino a 3 foto per ricevere suggerimenti ancora più mirati.
          Questo passaggio è facoltativo.
        </p>
      </div>

      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => {
          if (remainingSlots > 0 && !uploading) {
            inputRef.current?.click();
          }
        }}
        className={cn(
          "relative border-2 border-dashed rounded-[30px] p-8 md:p-10 transition-all duration-300 cursor-pointer group",
          dragOver
            ? "border-leaf-500 bg-leaf-50/30 scale-[1.01]"
            : remainingSlots > 0
              ? "border-paper-300 hover:border-leaf-400 hover:bg-leaf-50/10"
              : "border-paper-200 bg-paper-50/50 cursor-default"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileChange}
          className="hidden"
          disabled={remainingSlots <= 0 || uploading}
        />

        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 className="w-10 h-10 text-leaf-500 animate-spin" />
          ) : remainingSlots > 0 ? (
            <div className="w-14 h-14 rounded-2xl bg-leaf-50 flex items-center justify-center group-hover:bg-leaf-100 transition-colors">
              <ImagePlus className="w-7 h-7 text-leaf-600" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-paper-100 flex items-center justify-center">
              <Camera className="w-7 h-7 text-forest-800/40" />
            </div>
          )}

          {uploading ? (
            <p className="text-sm text-forest-800/70 font-body">
              Caricamento in corso...
            </p>
          ) : remainingSlots > 0 ? (
            <>
              <p className="text-base font-medium text-forest-950">
                <span className="hidden sm:inline">Trascina qui le foto oppure </span>
                <span className="text-leaf-600 underline underline-offset-2">sfoglia</span>
              </p>
              <p className="text-xs text-forest-800/50 font-body">
                JPG, PNG o WebP — max 10 MB per foto
              </p>
            </>
          ) : (
            <p className="text-sm text-forest-800/50 font-body">
              Hai raggiunto il limite di {MAX_FILES} foto
            </p>
          )}
        </div>
      </div>

      {/* Photo counter */}
      <div className="flex items-center justify-center mt-4 mb-2">
        <span className="text-micro text-forest-800/50">
          {photos.length}/{MAX_FILES} foto caricate
        </span>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mt-3"
          >
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnails */}
      <AnimatePresence>
        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.storageId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-soft group/thumb"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.previewUrl}
                    alt={photo.fileName}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(index);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-forest-950/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity hover:bg-forest-950/80"
                    aria-label={`Rimuovi ${photo.fileName}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-forest-950/50 to-transparent p-2 sm:hidden">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(index);
                      }}
                      className="w-full text-center text-xs text-white font-medium"
                      aria-label={`Rimuovi ${photo.fileName}`}
                    >
                      Rimuovi
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {photos.length > 0 ? (
          <Button
            onClick={handleContinue}
            disabled={uploading}
            className="w-full sm:w-auto bg-sun-400 hover:bg-sun-500 text-forest-950 px-10 py-4 rounded-2xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
          >
            <Upload className="w-4 h-4 mr-2" />
            Continua con {photos.length} {photos.length === 1 ? "foto" : "foto"}
          </Button>
        ) : null}

        <button
          type="button"
          onClick={onSkip}
          disabled={uploading}
          className="text-forest-800/50 hover:text-forest-950 font-bold uppercase text-xs tracking-widest transition-colors disabled:opacity-50"
        >
          {photos.length > 0 ? "Salta questo passaggio" : "Salta — nessuna foto"}
        </button>
      </div>
    </FadeIn>
  );
}
