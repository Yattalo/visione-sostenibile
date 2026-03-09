/**
 * Image optimization utilities for Visione Sostenibile.
 *
 * Provides a shared Leaf Green (#22582C) blur placeholder for next/image
 * components, ensuring a branded loading experience across the site.
 */

/**
 * Leaf Green (#22582C) 4x4 pixel blur placeholder for next/image.
 *
 * This is a tiny SVG-based data URL that renders as a solid Leaf Green
 * rectangle. When used with `placeholder="blur"`, Next.js applies a
 * gaussian blur that creates a pleasant branded shimmer while the real
 * image loads.
 */
export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMyMjU4MkMiLz48L3N2Zz4=";
// Decodes to: <svg width="4" height="4" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="4" fill="#22582C"/></svg>
