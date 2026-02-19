import type { Metadata } from "next";
import { ServiziClient } from "./ServiziClient";

export const metadata: Metadata = {
  title: "I Nostri Servizi | Visione Sostenibile",
  description:
    "Scopri tutti i nostri servizi di giardinaggio sostenibile: progettazione, realizzazione e manutenzione giardini e orti a impatto zero. Piemonte e Lombardia.",
};

export default function ServiziPage() {
  return <ServiziClient />;
}
