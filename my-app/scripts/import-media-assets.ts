import path from "node:path";
import { promises as fs } from "node:fs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

type ServiceDoc = {
  _id: Id<"services">;
  slug: string;
};

const MIME_BY_EXT: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m4v": "video/x-m4v",
};

const SUPPORTED_EXTENSIONS = new Set(Object.keys(MIME_BY_EXT));

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  progettazione: "progettazione-giardini",
  realizzazione: "realizzazione-giardini",
  "scelta-piante": "scelta-piante",
  trattamenti: "trattamenti-piante",
  "impianti-irrigazione": "impianti-irrigazione",
  camminamenti: "camminamenti-pietra",
  "camminamenti-pietra": "camminamenti-pietra",
  illuminazione: "illuminazione-esterni",
  "illuminazione-esterni": "illuminazione-esterni",
  ingegneria: "ingegneria-naturalistica",
  "ingegneria-naturalistica": "ingegneria-naturalistica",
  arredamento: "arredamento-esterni",
  "arredamento-esterni": "arredamento-esterni",
  potatura: "potature",
  potature: "potature",
  rigenerazione: "rigenerazione-terreni",
  "rigenerazione-terreni": "rigenerazione-terreni",
  manutenzione: "manutenzioni",
  manutenzioni: "manutenzioni",
};

function toTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractServiceSlugCandidate(fileBaseName: string): string | null {
  const normalized = fileBaseName
    .replace(/\.[^/.]+$/, "")
    .replace(/-(cover|thumb|inline)$/i, "")
    .toLowerCase();

  if (SERVICE_SLUG_ALIASES[normalized]) {
    return SERVICE_SLUG_ALIASES[normalized];
  }

  return normalized;
}

async function walkFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  let entries: import("node:fs").Dirent[] = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      return out;
    }
    throw error;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("._")) {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walkFiles(full)));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function categoryFromRelPath(relPath: string): string {
  if (relPath.startsWith("images/blog/")) return "Blog";
  if (relPath.startsWith("images/servizi/")) return "Servizi";
  if (relPath.startsWith("images/chi-siamo/")) return "Chi siamo";
  if (relPath.startsWith("images/team/")) return "Team";
  if (relPath.startsWith("videos/")) return "Video";
  return "Generico";
}

function mediaTypeFromExt(ext: string): "image" | "video" {
  return ext === ".mp4" || ext === ".webm" || ext === ".mov" ? "video" : "image";
}

async function uploadFileToConvexStorage(
  client: ConvexHttpClient,
  absPath: string,
  mimeType: string
): Promise<string> {
  const uploadUrl = await client.mutation(api.media.generateUploadUrl, {});
  const content = await fs.readFile(absPath);
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      "Content-Type": mimeType,
    },
    body: content,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Upload fallito (${res.status}): ${body}`);
  }
  const payload = (await res.json()) as { storageId?: string };
  if (!payload.storageId) {
    throw new Error("Upload riuscito ma storageId mancante");
  }
  return payload.storageId;
}

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL non impostata");
  }

  const client = new ConvexHttpClient(convexUrl);
  const projectRoot = path.resolve(process.cwd());
  const publicRoot = path.join(projectRoot, "public");

  const [imageFiles, videoFiles, existingRows, services] = await Promise.all([
    walkFiles(path.join(publicRoot, "images")),
    walkFiles(path.join(publicRoot, "videos")),
    client.query(api.gallery.getAllAdmin, {}),
    client.query(api.services.getAllAdmin, {}) as Promise<ServiceDoc[]>,
  ]);

  const existingByFileName = new Set(
    existingRows
      .map((row) => row.fileName?.toLowerCase().trim())
      .filter((v): v is string => Boolean(v))
  );
  const existingByUrl = new Set(
    existingRows
      .map((row) => row.imageUrl?.trim())
      .filter((v): v is string => Boolean(v))
  );
  let nextOrder =
    existingRows.length > 0
      ? Math.max(...existingRows.map((r) => r.order)) + 1
      : 1;

  const serviceIdBySlug = new Map(services.map((s) => [s.slug, s._id]));

  const allFiles = [...imageFiles, ...videoFiles].sort((a, b) =>
    a.localeCompare(b)
  );

  let inserted = 0;
  let skipped = 0;
  let skippedUnsupported = 0;

  for (const absPath of allFiles) {
    const relFromPublic = path.relative(publicRoot, absPath).replace(/\\/g, "/");
    const publicUrl = `/${relFromPublic}`;
    const fileName = path.basename(absPath);
    const ext = path.extname(fileName).toLowerCase();

    if (!SUPPORTED_EXTENSIONS.has(ext)) {
      skippedUnsupported += 1;
      continue;
    }

    const mimeType = MIME_BY_EXT[ext];
    const mediaType = mediaTypeFromExt(ext);

    if (
      existingByFileName.has(fileName.toLowerCase()) ||
      existingByUrl.has(publicUrl)
    ) {
      skipped += 1;
      continue;
    }

    const category = categoryFromRelPath(relFromPublic);
    const fileBaseName = fileName.replace(/\.[^/.]+$/, "");
    const serviceSlugCandidate = extractServiceSlugCandidate(fileBaseName);
    const serviceId =
      category === "Servizi" && serviceSlugCandidate
        ? serviceIdBySlug.get(serviceSlugCandidate)
        : undefined;

    const storageId = await uploadFileToConvexStorage(client, absPath, mimeType);
    const stats = await fs.stat(absPath);

    await client.mutation(api.gallery.add, {
      title: toTitleFromFilename(fileName),
      description: `Import automatico da ${publicUrl}`,
      mediaType,
      storageId: storageId as Id<"_storage">,
      mimeType,
      fileName,
      sizeBytes: stats.size,
      category,
      serviceId,
      order: nextOrder,
    });

    nextOrder += 1;
    inserted += 1;

    if (inserted % 10 === 0) {
      console.log(`Inseriti ${inserted} asset...`);
    }
  }

  console.log(
    `Import completato. Inseriti: ${inserted}. Skippati (gia presenti): ${skipped}. Skippati (estensione non supportata): ${skippedUnsupported}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
