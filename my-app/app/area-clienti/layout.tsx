import ClientShell from "./ClientShell";
import { ClientAuthProvider } from "./ClientAuthContext";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Area Clienti — Visione Sostenibile",
  description:
    "Accedi alla tua area riservata per vedere il report del quiz, i rendering del tuo giardino e caricare foto.",
};

export default function AreaClientiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientAuthProvider>
      <ClientShell>{children}</ClientShell>
    </ClientAuthProvider>
  );
}
