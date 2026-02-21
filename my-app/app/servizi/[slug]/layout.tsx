import type { Metadata } from "next";
import { getServiceSeo } from "../../lib/seo-data";
import { normalizeServiceSlug, staticServices } from "../../lib/static-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeServiceSlug(rawSlug);
  const service = staticServices.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Servizio non trovato | Visione Sostenibile",
      description:
        "Il servizio richiesto non e disponibile. Esplora tutti i servizi di giardinaggio sostenibile di Visione Sostenibile.",
    };
  }

  const seo = getServiceSeo(slug, service.title);

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default function ServiceDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
