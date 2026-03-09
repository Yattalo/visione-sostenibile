/**
 * JSON-LD structured data generators.
 * All business data sourced from site-config.ts — never hardcoded.
 */
import { siteConfig } from "./site-config";

/* -------------------------------------------------------------------------- */
/*  Organization + LocalBusiness (global, rendered in layout.tsx)              */
/* -------------------------------------------------------------------------- */

export function organizationJsonLd(): Record<string, unknown> {
  const { socialLinks, address } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: siteConfig.companyName,
    legalName: siteConfig.companyLegalName,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    areaServed: siteConfig.areaServed as unknown as string[],
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    foundingDate: siteConfig.foundingDate,
    sameAs: [
      socialLinks.instagram,
      socialLinks.facebook,
      socialLinks.linkedin,
      socialLinks.youtube,
    ],
  };
}

/* -------------------------------------------------------------------------- */
/*  Article (blog posts)                                                       */
/* -------------------------------------------------------------------------- */

export function articleJsonLd(opts: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    author: {
      "@type": "Person",
      name: opts.author ?? siteConfig.founder,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.companyName,
      url: siteConfig.siteUrl,
    },
    ...(opts.image && { image: opts.image }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Service                                                                    */
/* -------------------------------------------------------------------------- */

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url?: string;
  image?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.companyName,
      url: siteConfig.siteUrl,
    },
    areaServed: siteConfig.areaServed as unknown as string[],
    ...(opts.url && { url: opts.url }),
    ...(opts.image && { image: opts.image }),
  };
}

/* -------------------------------------------------------------------------- */
/*  BreadcrumbList                                                             */
/* -------------------------------------------------------------------------- */

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
