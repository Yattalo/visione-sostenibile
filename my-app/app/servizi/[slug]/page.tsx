"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Sprout,
  ChevronDown,
  Check,
} from "lucide-react";
import { api } from "../../../convex/_generated/api";
import {
  normalizeServiceSlug,
  staticServices,
  serviceImages,
} from "../../lib/static-data";
import { siteConfig } from "../../lib/site-config";
import { Button } from "../../components/ui/Button";
import { serviceDetailCopyBySlug } from "../../lib/service-detail-copy";

type ServiceItem = (typeof staticServices)[number];

const SITE_URL = "https://www.visionesostenibile.it";

const galleryFallbacks = [
  "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
];

function HeroSection({
  service,
  imageUrl,
  summary,
}: {
  service: ServiceItem;
  imageUrl: string;
  summary: string;
}) {
  return (
    <section className="relative h-[62vh] overflow-hidden">
      <Image
        src={imageUrl}
        alt={service.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/75" />

      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pb-16 md:pb-24">
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-paper-300 mb-4">
            I nostri servizi
          </p>
          <h1 className="text-stitch-heading text-4xl md:text-6xl lg:text-7xl text-paper-50 max-w-4xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-2xl text-hero-subtitle text-lg md:text-xl text-paper-200/90">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
}

function IntroSection({
  service,
  content,
}: {
  service: ServiceItem;
  content: (typeof serviceDetailCopyBySlug)[string];
}) {
  return (
    <section className="py-20 lg:py-28 bg-paper-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <p className="font-display italic text-leaf-700 text-lg">
              {service.title}
            </p>
            <h2 className="mt-4 text-stitch-heading text-4xl md:text-5xl text-forest-950">
              {content.introTitle}
            </h2>
            {content.introSubtitle && (
              <p className="mt-4 font-sans text-sm uppercase tracking-[0.2em] text-leaf-700">
                {content.introSubtitle}
              </p>
            )}
          </div>

          <div className="space-y-6">
            {content.introParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-lg leading-relaxed text-forest-800/80"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualBreak({
  service,
  imageUrl,
}: {
  service: ServiceItem;
  imageUrl: string;
}) {
  return (
    <section className="px-6 pb-8 lg:px-8 lg:pb-12 bg-paper-50">
      <div className="max-w-7xl mx-auto">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[36px] shadow-floating">
          <Image
            src={imageUrl}
            alt={`${service.title} — Visione Sostenibile`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/45 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}

function ServiceContentSection({
  content,
}: {
  content: (typeof serviceDetailCopyBySlug)[string];
}) {
  const hasSummaryCard = Boolean(content.primarySubtitle);

  return (
    <section className="py-20 lg:py-28 bg-paper-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`mb-10 grid gap-6 ${
            hasSummaryCard
              ? "lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end"
              : ""
          }`}
        >
          <div className="max-w-3xl">
            <h2 className="text-stitch-heading text-4xl md:text-5xl text-forest-950">
              {content.primaryTitle}
            </h2>
          </div>

          {content.primarySubtitle && (
            <div className="rounded-[28px] border border-paper-200 bg-white px-6 py-5 shadow-soft lg:justify-self-end">
              <span className="font-display text-5xl font-light leading-none text-leaf-300">
                {content.primaryItems.length.toString().padStart(2, "0")}
              </span>
              <p className="mt-3 font-sans text-sm uppercase tracking-[0.2em] text-leaf-700">
                {content.primarySubtitle}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {content.primaryItems.map((item, index) => (
            <div
              key={item}
              className="rounded-[24px] border border-paper-200 bg-white p-5 sm:p-6 shadow-soft"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-leaf-50 font-sans text-sm font-bold text-leaf-700">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-paper-200" />
              </div>
              <p className="font-body text-lg text-forest-800/85 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        {content.panels && content.panels.length > 0 && (
          <div
            className={`mt-8 grid gap-6 ${
              content.panels.length > 1 ? "lg:grid-cols-2" : "max-w-4xl"
            }`}
          >
            {content.panels.map((panel) => (
              <div
                key={panel.title}
                className="rounded-[28px] border border-paper-200 bg-white p-7 shadow-soft"
              >
                <h3 className="font-display text-2xl text-forest-950">
                  {panel.title}
                </h3>
                {panel.subtitle && (
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-leaf-700">
                    {panel.subtitle}
                  </p>
                )}
                {panel.items && (
                  <ul className="mt-5 space-y-3">
                    {panel.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 font-body text-forest-800/80 leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-leaf-600 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {panel.paragraphs && (
                  <div className="mt-5 space-y-3">
                    {panel.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-body text-forest-800/80 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-[30px] bg-forest-950 p-8 md:p-10 text-paper-50 shadow-deep lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p className="font-body text-lg leading-relaxed">
              {content.microCta}
            </p>
            {content.closingLine && (
              <p className="mt-5 font-display italic text-xl text-leaf-300">
                {content.closingLine}
              </p>
            )}
          </div>

          <div className="mt-6 lg:mt-0 lg:shrink-0">
            <Link href="/contatti">
              <Button
                size="lg"
                className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8"
              >
                Contattaci
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion({
  faqs,
}: {
  faqs?: { question: string; answer: string }[];
}) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-28 bg-paper-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-leaf-700">
            FAQ
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-[20px] border border-paper-200 bg-white overflow-hidden shadow-soft group"
            >
              <summary className="flex cursor-pointer items-center justify-between p-6 font-body text-lg text-forest-950">
                <span>{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-leaf-700 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-paper-100 px-6 pb-6 pt-4 font-body leading-relaxed text-forest-800/80">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrevNextNav({
  prevService,
  nextService,
}: {
  prevService: ServiceItem | null;
  nextService: ServiceItem | null;
}) {
  return (
    <section className="border-t border-paper-300 bg-paper-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-paper-300">
          <div className="py-8 lg:py-12 pr-0 md:pr-8">
            {prevService ? (
              <Link
                href={`/servizi/${prevService.slug}`}
                className="group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowLeft className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                    Precedente
                  </p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    {prevService.title}
                  </p>
                </div>
              </Link>
            ) : (
              <Link href="/servizi" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowLeft className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                </div>
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                    Torna a
                  </p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    Tutti i Servizi
                  </p>
                </div>
              </Link>
            )}
          </div>

          <div className="py-8 lg:py-12 pl-0 md:pl-8">
            {nextService ? (
              <Link
                href={`/servizi/${nextService.slug}`}
                className="group flex items-center justify-end gap-4 text-right"
              >
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                    Successivo
                  </p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    {nextService.title}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowRight className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                </div>
              </Link>
            ) : (
              <Link
                href="/servizi"
                className="group flex items-center justify-end gap-4 text-right"
              >
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-forest-800/60 mb-1">
                    Esplora
                  </p>
                  <p className="font-display text-lg text-forest-900 group-hover:text-leaf-600 transition-colors">
                    Tutti i Servizi
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-paper-400 flex items-center justify-center group-hover:border-leaf-500 group-hover:bg-leaf-50 transition-all">
                  <ArrowRight className="w-5 h-5 text-forest-800/60 group-hover:text-leaf-600 transition-colors" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const trackShareEvent = useMutation(api.shareEvents.track);
  const landingTrackedRef = useRef(false);
  const [shareState, setShareState] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const slug = normalizeServiceSlug(params.slug as string);
  const service = staticServices.find((item) => item.slug === slug);
  const serviceIndex = staticServices.findIndex((item) => item.slug === slug);
  const nextService =
    serviceIndex >= 0 && serviceIndex < staticServices.length - 1
      ? staticServices[serviceIndex + 1]
      : null;
  const prevService = serviceIndex > 0 ? staticServices[serviceIndex - 1] : null;

  useEffect(() => {
    if (!service || landingTrackedRef.current) return;
    if (searchParams.get("ref") !== "wa-share") return;

    landingTrackedRef.current = true;
    void trackShareEvent({
      eventName: "share_landing",
      serviceSlug: service.slug,
      channel: searchParams.get("utm_source") ?? "whatsapp",
      pagePath: window.location.pathname,
    });
  }, [searchParams, service, trackShareEvent]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-50">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-paper-300 flex items-center justify-center mx-auto mb-6">
            <Sprout className="w-10 h-10 text-forest-800/60" />
          </div>
          <h1 className="font-display text-3xl text-forest-950 mb-4">
            Servizio non trovato
          </h1>
          <p className="font-body text-forest-800/70 mb-8">
            Il servizio che stai cercando non esiste o potrebbe essere stato
            rimosso.
          </p>
          <Link href="/servizi">
            <Button variant="secondary">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Torna ai Servizi
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const content = serviceDetailCopyBySlug[service.slug];
  const imageUrl =
    serviceImages[service.slug] ??
    galleryFallbacks[serviceIndex % galleryFallbacks.length];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: content.summary,
    provider: {
      "@type": "LocalBusiness",
      name: "Visione Sostenibile",
      areaServed: "Piemonte e Lombardia",
    },
    url: `${SITE_URL}/servizi/${service.slug}`,
  };

  const faqJsonLd =
    content.faqs && content.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const handleShare = async () => {
    const shareUrl = new URL(`${window.location.origin}${window.location.pathname}`);
    shareUrl.searchParams.set("ref", "wa-share");
    shareUrl.searchParams.set("utm_source", "whatsapp");
    shareUrl.searchParams.set("utm_medium", "share");
    shareUrl.searchParams.set("utm_campaign", "service_referral");

    try {
      await trackShareEvent({
        eventName: "share_clicked",
        serviceSlug: service.slug,
        channel: "whatsapp",
        pagePath: window.location.pathname,
      });
    } catch (error) {
      console.error("Share tracking failed:", error);
    }

    const message = `Guarda questo servizio di Visione Sostenibile: ${service.title} - ${shareUrl.toString()}`;
    const popup = window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    if (!popup) {
      setShareState("error");
      return;
    }

    setShareState("success");
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <HeroSection service={service} imageUrl={imageUrl} summary={content.summary} />
      <IntroSection service={service} content={content} />
      <VisualBreak service={service} imageUrl={imageUrl} />
      <ServiceContentSection content={content} />
      <FaqAccordion faqs={content.faqs} />

      <section className="relative py-24 lg:py-32 bg-forest-950 text-paper-50 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/92 to-forest-950" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-leaf-300">
            Parliamone
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-paper-50 mt-4 mb-6">
            Ti diciamo cosa serve davvero
          </h2>
          <p className="font-body text-lg text-paper-300/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partiamo dal tuo spazio e dai tuoi obiettivi: così definiamo insieme
            priorità, fasi e scelte più sensate per {service.title.toLowerCase()}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteConfig.phoneRaw}`}>
              <Button
                size="lg"
                className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8"
              >
                <Phone className="mr-2 w-5 h-5" />
                Chiama ora
              </Button>
            </a>
            <Link href="/contatti">
              <Button
                size="lg"
                variant="outline"
                className="border-paper-400/30 text-paper-100 hover:bg-paper-100/10 hover:border-paper-400/50 px-8"
              >
                Richiedi preventivo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-paper-400/80 flex flex-col sm:flex-row justify-center gap-4">
            <span className="inline-flex items-center gap-2 justify-center">
              <MapPin className="w-4 h-4" />
              Piemonte e Lombardia
            </span>
            <span className="inline-flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4" />
              Lun-Ven: 8:00-18:00
            </span>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleShare}
          className="bg-leaf-600 hover:bg-leaf-700 text-white rounded-full p-4 shadow-deep transition-all hover:scale-110"
          aria-label="Condividi su WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        {shareState === "success" && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-medium px-4 py-2 text-sm text-forest-800 whitespace-nowrap flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-leaf-500" />
            WhatsApp aperto
          </div>
        )}
      </div>

      <PrevNextNav prevService={prevService} nextService={nextService} />
    </div>
  );
}
