import type { Metadata } from "next";

export const SITE_URL = "https://www.visionesostenibile.it";
export const SITE_NAME = "Visione Sostenibile";
export const DEFAULT_OG_IMAGE = "/og-image.png";

type OpenGraphType = "website" | "article";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: OpenGraphType;
};

/**
 * Build page-specific metadata. The `title` param is the page-specific part
 * WITHOUT the brand suffix — the root layout template appends " | Visione Sostenibile".
 * OG/Twitter titles include the full branded version for social sharing.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: BuildMetadataArgs): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath}`;
  const ogTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        it: url,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type,
      locale: "it_IT",
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
