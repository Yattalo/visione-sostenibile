import type { Metadata } from "next";
import { buildMetadata } from "../lib/seo-metadata";
import { siteConfig } from "../lib/site-config";
import PartnerShowcaseClient from "./PartnerShowcaseClient";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "I Nostri Partner — Rete di Professionisti del Verde",
    description:
      "Scopri la rete di fornitori, subappaltatori e consulenti approvati da Visione Sostenibile. Professionisti selezionati per qualita e sostenibilita a Torino e Piemonte.",
    path: "/partner",
  }),
};

export default function PartnerPage() {
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
        name: "I Nostri Partner",
        item: `${siteUrl}/partner`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PartnerShowcaseClient />
    </>
  );
}
