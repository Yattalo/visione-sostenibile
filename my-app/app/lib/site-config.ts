/**
 * Centralised site configuration — single source of truth for business data
 * that was previously hardcoded across multiple components.
 *
 * NOTE: seo-metadata.ts re-exports SITE_URL and SITE_NAME from here so that
 * existing imports continue to work without changes.
 */

export const siteConfig = {
  companyName: "Visione Sostenibile",
  companyLegalName: "Visione Sostenibile di Andrea Giordano",
  phone: "+39 371 482 1825",
  /** Raw international format for tel: links and JSON-LD */
  phoneRaw: "+393714821825",
  phoneDisplay: "371 482 1825",
  email: "visionesostenibile96@gmail.com",
  address: {
    street: "Via San Francesco D'Assisi, 14",
    city: "Torino",
    postalCode: "10122",
    province: "TO",
    region: "Piemonte",
    country: "Italia",
    countryCode: "IT",
  },
  socialLinks: {
    instagram: "https://www.instagram.com/visionesostenibile",
    facebook:
      "https://www.facebook.com/visionesostenibilegiardinieortisostenibili",
    linkedin: "https://www.linkedin.com/in/andrea-giordano-16810626a",
    youtube: "https://www.youtube.com/@AndreaGiordano-vk8el",
  },
  siteUrl: "https://www.visionesostenibile.it",
  claim: "Il verde che hai sempre desiderato",
  founder: "Andrea Giordano",
  foundingDate: "2009",
  areaServed: ["Torino", "Piemonte", "Trentino Alto-Adige", "Lombardia"],
} as const;

export type SiteConfig = typeof siteConfig;
