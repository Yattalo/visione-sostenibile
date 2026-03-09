/**
 * Reusable JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> tag for SEO.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
