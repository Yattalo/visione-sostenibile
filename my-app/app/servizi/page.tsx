import type { Metadata } from "next";
import { ServiziClient } from "./ServiziClient";
import { pageSeo } from "../lib/seo-data";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: pageSeo.servizi.title,
    description: pageSeo.servizi.description,
    path: "/servizi",
    image: "/images/servizi/progettazione-giardini-cover.png",
  }),
};

export default function ServiziPage() {
  return <ServiziClient />;
}
