import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AppProvider } from "./components/AppProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Analytics } from "./components/Analytics";
import { CookieConsent } from "./components/CookieConsent";
import { CookiePreferences } from "./components/CookiePreferences";
import { pageSeo } from "./lib/seo-data";
import { buildMetadata, SITE_URL, SITE_NAME } from "./lib/seo-metadata";
import { JsonLd } from "./components/JsonLd";
import { organizationJsonLd } from "./lib/json-ld";
import localFont from "next/font/local";

const walkway = localFont({
  src: [
    { path: "../public/walkway/Walkway SemiBold.woff2", weight: "300 600", style: "normal" },
    { path: "../public/walkway/Walkway Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/walkway/Walkway Black.woff2", weight: "800 900", style: "normal" },
    { path: "../public/walkway/Walkway Oblique.woff2", weight: "300 500", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Bold.woff2", weight: "600 700", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Black.woff2", weight: "800 900", style: "italic" },
  ],
  variable: "--font-walkway",
  display: "swap",
  preload: true,
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
  title: {
    template: "%s | Visione Sostenibile",
    default: `${pageSeo.home.title} | ${SITE_NAME}`,
  },
  metadataBase: new URL(SITE_URL),
  keywords: [
    "giardinaggio biodinamico",
    "giardini Torino",
    "giardiniere Torino",
    "progettazione giardini Piemonte",
    "manutenzione giardini Torino",
    "potatura alberi Torino",
    "irrigazione giardino",
    "giardino sostenibile",
    "verde biodinamico",
    "piante autoctone Piemonte",
    "realizzazione giardini chiavi in mano",
    "giardinaggio sostenibile Torino",
  ],
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
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Clerk frontend API — prefetch only when auth is enabled */}
        {process.env.NEXT_PUBLIC_AUTH_ENABLED === "true" && (
          <link rel="dns-prefetch" href="https://clerk.clerk.accounts.dev" />
        )}
        {/* Preconnect to Convex backend */}
        {process.env.NEXT_PUBLIC_CONVEX_URL && (
          <link
            rel="preconnect"
            href={new URL(process.env.NEXT_PUBLIC_CONVEX_URL).origin}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${walkway.variable} antialiased min-h-screen flex flex-col bg-paper-gradient`}>
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:bg-sun-400 focus:text-forest-950 focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:outline-none"
        >
          Vai al contenuto principale
        </a>
        <AppProvider>
          <Navbar />
          <Suspense fallback={null}><Analytics /></Suspense>
          <main id="main-content" className="grow">{children}</main>
          <Footer />
          <CookieConsent />
          <CookiePreferences />
        </AppProvider>
      </body>
    </html>
  );
}
