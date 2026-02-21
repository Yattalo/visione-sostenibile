import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.progetti.title,
    description: pageSeo.progetti.description,
    path: "/progetti",
  }),
};

export default function ProgettiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
