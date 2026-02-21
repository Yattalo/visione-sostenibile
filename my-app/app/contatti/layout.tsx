import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";

export const metadata: Metadata = {
  title: pageSeo.contatti.title,
  description: pageSeo.contatti.description,
};

export default function ContattiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
