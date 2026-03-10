import type { Metadata } from "next";
import { buildMetadata } from "../lib/seo-metadata";
import { siteConfig } from "../lib/site-config";
import CollaboraClient from "./CollaboraClient";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Collabora con Noi — Partner e Fornitori",
    description:
      "Diventa partner di Visione Sostenibile: cerchiamo fornitori, subappaltatori e consulenti per crescere insieme nel verde sostenibile a Torino e Piemonte.",
    path: "/collabora",
  }),
};

export default function CollaboraPage() {
  const siteUrl = siteConfig.siteUrl;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collabora con Noi",
        item: `${siteUrl}/collabora`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CollaboraClient />
    </>
  );
}
