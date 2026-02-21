import type { Metadata } from "next";
import { ServiziClient } from "./ServiziClient";
import { pageSeo } from "../lib/seo-data";

export const metadata: Metadata = {
  title: pageSeo.servizi.title,
  description: pageSeo.servizi.description,
};

export default function ServiziPage() {
  return <ServiziClient />;
}
