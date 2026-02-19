import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Analytics } from "./components/Analytics";
import { CookieConsent } from "./components/CookieConsent";
import localFont from "next/font/local";

const walkway = localFont({
  src: [
    { path: "../public/walkway/Walkway SemiBold.ttf", weight: "400", style: "normal" },
    { path: "../public/walkway/Walkway SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/walkway/Walkway Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/walkway/Walkway Black.ttf", weight: "900", style: "normal" },
    { path: "../public/walkway/Walkway Oblique.ttf", weight: "400", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Bold.ttf", weight: "700", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Black.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-walkway",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1E0E",
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
    "Torino",
    "Piemonte",
  ],
  metadataBase: new URL("https://www.visionesostenibile.it"),
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.visionesostenibile.it",
    siteName: "Visione Sostenibile",
    title: "Visione Sostenibile - Il Verde che Vive",
    description:
      "Progettazione e realizzazione di giardini straordinari.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Visione Sostenibile - Giardini Biodinamici a Torino",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${walkway.variable} antialiased min-h-screen flex flex-col bg-paper-gradient`}>
        <ConvexClientProvider>
          <Navbar />
          <Analytics />
          <main className="flex-grow">{children}</main>
          <Footer />
          <CookieConsent />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
