import path from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

type BlogPost = {
  _id: Id<"blogPosts">;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverStorageId?: Id<"_storage">;
  coverMimeType?: string;
  coverFileName?: string;
  coverSizeBytes?: number;
  category: string;
  author: string;
  readTime: string;
  isPublished: boolean;
};

type GalleryAsset = {
  _id: Id<"gallery">;
  title: string;
  imageUrl: string;
  storageId?: Id<"_storage">;
  mimeType?: string;
  fileName?: string;
  sizeBytes?: number;
  category?: string;
};

function extractFileName(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    return path.basename(parsed.pathname).toLowerCase();
  } catch {
    const clean = trimmed.split("?")[0]?.split("#")[0] ?? trimmed;
    return path.basename(clean).toLowerCase();
  }
}

async function main() {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL non impostata");
  }

  const client = new ConvexHttpClient(convexUrl);
  const [posts, gallery] = await Promise.all([
    client.query(api.blog.getAllAdmin, {}) as Promise<BlogPost[]>,
    client.query(api.gallery.getAllAdmin, {}) as Promise<GalleryAsset[]>,
  ]);

  const assetsByFileName = new Map<string, GalleryAsset[]>();
  for (const asset of gallery) {
    if (!asset.storageId || !asset.fileName) continue;
    const key = asset.fileName.toLowerCase().trim();
    const bucket = assetsByFileName.get(key) ?? [];
    bucket.push(asset);
    assetsByFileName.set(key, bucket);
  }

  let linked = 0;
  let skippedAlreadyLinked = 0;
  let skippedNoCover = 0;
  let skippedNoMatch = 0;

  for (const post of posts) {
    if (post.coverStorageId) {
      skippedAlreadyLinked += 1;
      continue;
    }

    if (!post.coverImage) {
      skippedNoCover += 1;
      continue;
    }

    const fileName = extractFileName(post.coverImage);
    if (!fileName) {
      skippedNoMatch += 1;
      continue;
    }

    const candidates = assetsByFileName.get(fileName) ?? [];
    const selected =
      candidates.find((asset) => asset.category === "Blog") ?? candidates[0];

    if (!selected?.storageId) {
      skippedNoMatch += 1;
      continue;
    }

    await client.mutation(api.blog.update, {
      id: post._id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      coverStorageId: selected.storageId,
      coverMimeType: selected.mimeType,
      coverFileName: selected.fileName,
      coverSizeBytes: selected.sizeBytes,
      category: post.category,
      author: post.author,
      readTime: post.readTime,
      isPublished: post.isPublished,
    });

    linked += 1;
  }

  console.log(
    JSON.stringify(
      {
        linked,
        skippedAlreadyLinked,
        skippedNoCover,
        skippedNoMatch,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
