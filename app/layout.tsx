import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15803d",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Visione Sostenibile",
    default: "Visione Sostenibile - Giardinaggio e Progettazione Verde",
  },
  description:
    "Servizi professionali di giardinaggio, progettazione e realizzazione giardini. Trasformiamo i tuoi spazi verdi in opere d'arte naturali.",
  keywords: [
    "giardinaggio",
    "progettazione giardini",
    "manutenzione giardini",
    "realizzazione giardini",
    "potature",
    "Roma",
  ],
  authors: [{ name: "Visione Sostenibile" }],
  creator: "Visione Sostenibile",
  publisher: "Visione Sostenibile",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.visionesostenibile.it",
    siteName: "Visione Sostenibile",
    title: "Visione Sostenibile - Giardinaggio e Progettazione Verde",
    description:
      "Servizi professionali di giardinaggio, progettazione e realizzazione giardini.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Visione Sostenibile - Giardini Professionali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visione Sostenibile - Giardinaggio Professionale",
    description:
      "Servizi professionali di giardinaggio, progettazione e realizzazione giardini.",
    images: ["/og-image.jpg"],
    creator: "@visionesostenibile",
  },
  alternates: {
    canonical: "https://www.visionesostenibile.it",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.visionesostenibile.it/#organization",
      name: "Visione Sostenibile",
      url: "https://www.visionesostenibile.it",
      logo: "https://www.visionesostenibile.it/logo.png",
      description:
        "Servizi professionali di giardinaggio, progettazione e realizzazione giardini.",
      foundingDate: "2009",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via del Verde, 123",
        addressLocality: "Roma",
        postalCode: "00100",
        addressCountry: "IT",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+39-06-1234567",
        contactType: "customer service",
        availableLanguage: ["Italian"],
      },
      sameAs: [
        "https://www.facebook.com/visionesostenibile",
        "https://www.instagram.com/visionesostenibile",
        "https://www.linkedin.com/company/visionesostenibile",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.visionesostenibile.it/#localbusiness",
      name: "Visione Sostenibile",
      url: "https://www.visionesostenibile.it",
      logo: "https://www.visionesostenibile.it/logo.png",
      image: "https://www.visionesostenibile.it/immagini/giardino.jpg",
      telephone: "+39-06-1234567",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via del Verde, 123",
        addressLocality: "Roma",
        postalCode: "00100",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.9028,
        longitude: 12.4964,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "08:00",
          closes: "13:00",
        },
      ],
      priceRange: "€€",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      areaServed: {
        "@type": "Place",
        name: "Roma e provincia, Lazio",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.visionesostenibile.it/#professionalservice",
      name: "Visione Sostenibile",
      description:
        "Servizi professionali di giardinaggio, progettazione e realizzazione giardini.",
      provider: {
        "@type": "Organization",
        name: "Visione Sostenibile",
      },
    },
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ConvexClientProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
