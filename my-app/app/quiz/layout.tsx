import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.quiz.title,
    description: pageSeo.quiz.description,
    path: "/quiz",
  }),
};

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
