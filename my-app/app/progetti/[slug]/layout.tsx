import type { Metadata } from "next";
import { getProjectBySlug } from "../../lib/progetti-data";
import { buildMetadata } from "../../lib/seo-metadata";

function toMetaDescription(description: string): string {
  if (description.length <= 155) {
    return description;
  }

  return `${description.slice(0, 152).trimEnd()}...`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Progetto non trovato",
      description:
        "Il progetto richiesto non e disponibile. Scopri il portfolio giardini di Visione Sostenibile.",
      path: `/progetti/${slug}`,
    });
  }

  return buildMetadata({
    title: `${project.title} | Progetti`,
    description: toMetaDescription(project.description),
    path: `/progetti/${slug}`,
    image: project.thumbnail ?? project.hero_image ?? undefined,
  });
}

export default function ProgettiDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
