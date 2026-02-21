import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.blog.title,
    description: pageSeo.blog.description,
    path: "/blog",
    image: "/images/blog/tendenze-cover.png",
  }),
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
