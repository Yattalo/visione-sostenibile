import type { Metadata } from "next";
import { getServiceSeo } from "../../lib/seo-data";
import { buildMetadata } from "../../lib/seo-metadata";
import { normalizeServiceSlug, serviceImages, staticServices } from "../../lib/static-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeServiceSlug(rawSlug);
  const service = staticServices.find((item) => item.slug === slug);

  if (!service) {
    return buildMetadata({
      title: "Servizio non trovato",
      description:
        "Il servizio richiesto non e disponibile. Esplora tutti i servizi di giardinaggio sostenibile di Visione Sostenibile.",
      path: `/servizi/${rawSlug}`,
    });
  }

  const seo = getServiceSeo(slug, service.title);

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/servizi/${slug}`,
    image: serviceImages[slug],
  });
}

export default function ServiceDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
