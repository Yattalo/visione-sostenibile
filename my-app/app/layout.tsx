import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Analytics } from "./components/Analytics";
import { CookieConsent } from "./components/CookieConsent";
import { pageSeo } from "./lib/seo-data";
import { buildMetadata, SITE_URL, SITE_NAME } from "./lib/seo-metadata";
import localFont from "next/font/local";

const walkway = localFont({
  src: [
    { path: "../public/walkway/Walkway SemiBold.woff2", weight: "300", style: "normal" },
    { path: "../public/walkway/Walkway SemiBold.woff2", weight: "400", style: "normal" },
    { path: "../public/walkway/Walkway SemiBold.woff2", weight: "500", style: "normal" },
    { path: "../public/walkway/Walkway SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/walkway/Walkway Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/walkway/Walkway Black.woff2", weight: "800", style: "normal" },
    { path: "../public/walkway/Walkway Black.woff2", weight: "900", style: "normal" },
    { path: "../public/walkway/Walkway Oblique.woff2", weight: "300", style: "italic" },
    { path: "../public/walkway/Walkway Oblique.woff2", weight: "400", style: "italic" },
    { path: "../public/walkway/Walkway Oblique.woff2", weight: "500", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Bold.woff2", weight: "600", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Bold.woff2", weight: "700", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Black.woff2", weight: "800", style: "italic" },
    { path: "../public/walkway/Walkway Oblique Black.woff2", weight: "900", style: "italic" },
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
  title: {
    template: "%s | Visione Sostenibile",
    default: `${pageSeo.home.title} | ${SITE_NAME}`,
  },
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Visione Sostenibile",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  foundingDate: "2009",
  founder: {
    "@type": "Person",
    name: "Andrea Giordano",
  },
  areaServed: ["Piemonte", "Lombardia", "Trentino-Alto Adige"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+39-371-482-1825",
    contactType: "customer service",
    availableLanguage: "Italian",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Visione Sostenibile",
  url: SITE_URL,
  telephone: "+393714821825",
  email: "visionesostenibile96@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via San Francesco D'Assisi 14",
    addressLocality: "Torino",
    addressRegion: "Piemonte",
    postalCode: "10121",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.0703,
    longitude: 7.6869,
  },
  priceRange: "€€",
  knowsAbout: [
    "Progettazione giardini",
    "Manutenzione verde",
    "Potature",
    "Irrigazione",
    "Gestione biodinamica",
    "Ingegneria naturalistica",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
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
