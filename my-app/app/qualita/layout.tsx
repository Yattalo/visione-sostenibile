import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";

export const metadata: Metadata = {
  title: pageSeo.qualita.title,
  description: pageSeo.qualita.description,
};

export default function QualitaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
