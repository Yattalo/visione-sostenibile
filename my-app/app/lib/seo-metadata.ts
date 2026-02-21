import type { Metadata } from "next";

export const SITE_URL = "https://www.visionesostenibile.it";
export const DEFAULT_OG_IMAGE = "/og-image.png";

type OpenGraphType = "website" | "article";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: OpenGraphType;
};

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: BuildMetadataArgs): Metadata {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath}`;

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
      title,
      description,
      url,
      type,
      locale: "it_IT",
      siteName: "Visione Sostenibile",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
