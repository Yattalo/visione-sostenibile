import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";

export const metadata: Metadata = {
  title: pageSeo.progetti.title,
  description: pageSeo.progetti.description,
};

export default function ProgettiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
