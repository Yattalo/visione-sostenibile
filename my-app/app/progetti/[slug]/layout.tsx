import type { Metadata } from "next";
import { getProjectBySlug } from "../../lib/progetti-data";

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
    return {
      title: "Progetto non trovato | Visione Sostenibile",
      description:
        "Il progetto richiesto non e disponibile. Scopri il portfolio giardini di Visione Sostenibile.",
    };
  }

  return {
    title: `${project.title} | Progetti Visione Sostenibile`,
    description: toMetaDescription(project.description),
  };
}

export default function ProgettiDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
