import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.contatti.title,
    description: pageSeo.contatti.description,
    path: "/contatti",
  }),
};

export default function ContattiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
