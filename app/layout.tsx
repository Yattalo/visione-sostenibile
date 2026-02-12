import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4b562e",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Visione Sostenibile",
    default: "Visione Sostenibile - Il Verde che Vive",
  },
  description:
    "Progettazione e realizzazione di giardini straordinari. Trasformiamo i tuoi spazi in opere d'arte vegetali.",
  keywords: [
    "giardini",
    "progettazione paesaggistica",
    "design verde",
    "realizzazione giardini",
    "Roma",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.visionesostenibile.it",
    siteName: "Visione Sostenibile",
    title: "Visione Sostenibile - Il Verde che Vive",
    description:
      "Progettazione e realizzazione di giardini straordinari.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-cream-gradient">
        <ConvexClientProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
