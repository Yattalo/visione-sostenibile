import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Analytics } from "./components/Analytics";
import { CookieConsent } from "./components/CookieConsent";
import { pageSeo } from "./lib/seo-data";
import { buildMetadata, SITE_URL } from "./lib/seo-metadata";
import localFont from "next/font/local";

const walkway = localFont({
  src: [
    { path: "../public/walkway/Walkway SemiBold.ttf", weight: "300", style: "normal" },
    { path: "../public/walkway/Walkway SemiBold.ttf", weight: "400", style: "normal" },
    { path: "../public/walkway/Walkway SemiBold.ttf", weight: "500", style: "normal" },
    { path: "../public/walkway/Walkway SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/walkway/Walkway Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/walkway/Walkway Black.ttf", weight: "800", style: "normal" },
    { path: "../public/walkway/Walkway Black.ttf", weight: "900", style: "normal" },
    { path: "../public/walkway/Walkway Oblique.ttf", weight: "300", style: "italic" },
    { path: "../public/walkway/Walkway Oblique.ttf", weight: "400", style: "italic" },
    { path: "../public/walkway/Walkway Oblique.ttf", weight: "500", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Bold.ttf", weight: "600", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Bold.ttf", weight: "700", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Black.ttf", weight: "800", style: "italic" },
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
  ...buildMetadata({
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    path: "/",
    image: "/og-image.png",
    type: "website",
  }),
  keywords: [
    "giardini",
    "progettazione paesaggistica",
    "design verde",
    "realizzazione giardini",
    "Torino",
    "Piemonte",
  ],
  metadataBase: new URL(SITE_URL),
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
