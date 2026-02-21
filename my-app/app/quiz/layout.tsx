import type { Metadata } from "next";
import { pageSeo } from "../lib/seo-data";

export const metadata: Metadata = {
  title: pageSeo.quiz.title,
  description: pageSeo.quiz.description,
};

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
