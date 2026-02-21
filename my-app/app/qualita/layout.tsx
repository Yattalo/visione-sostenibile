import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.qualita.title,
    description: pageSeo.qualita.description,
    path: "/qualita",
  }),
};

export default function QualitaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
