"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import {
  Handshake,
  Globe,
  Leaf,
  Users,
  ExternalLink,
  Search,
  ArrowRight,
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

/* ---------- Partnership type config ---------- */

const partnershipTypeLabels: Record<string, string> = {
  fornitore: "Fornitore",
  subappaltatore: "Subappaltatore",
  consulente: "Consulente",
  altro: "Altro",
};

const partnershipTypeBadgeVariant: Record<
  string,
  "primary" | "earth" | "eco" | "biodynamic"
> = {
  fornitore: "primary",
  subappaltatore: "eco",
  consulente: "earth",
  altro: "biodynamic",
};

const filterOptions = [
  { value: "tutti", label: "Tutti" },
  { value: "fornitore", label: "Fornitori" },
  { value: "subappaltatore", label: "Subappaltatori" },
  { value: "consulente", label: "Consulenti" },
];

/* ---------- Component ---------- */

export default function PartnerShowcaseClient() {
  const partners = useQuery(api.partners.getApprovedPartners);
  const [activeFilter, setActiveFilter] = useState("tutti");

  const filteredPartners =
    partners?.filter(
      (p) => activeFilter === "tutti" || p.partnershipType === activeFilter
    ) ?? [];

  const isLoading = partners === undefined;

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-forest-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=40"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/80 via-forest-900/60 to-forest-950/70" />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-leaf-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sun-400/15 rounded-full blur-3xl animate-drift" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 px-4 py-1.5 text-xs tracking-widest uppercase">
                <Users className="w-3 h-3 mr-1.5 inline" />
                La Nostra Rete
              </Badge>
              <Badge
                variant="eco"
                className="px-4 py-1.5 text-xs tracking-widest uppercase"
              >
                <Handshake className="w-3 h-3 mr-1.5 inline" />
                Partner Selezionati
              </Badge>
            </div>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-paper-50 leading-tight max-w-4xl mb-8">
              I NOSTRI{" "}
              <span className="block italic text-leaf-400">Partner</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.1}>
            <p className="font-body text-lg text-paper-300/80 max-w-2xl mb-6">
              Una rete di professionisti selezionati che condividono i nostri
              valori di qualita, sostenibilita e attenzione al dettaglio.
            </p>
            <p className="font-body text-lg italic text-leaf-400 max-w-2xl">
              Ogni partner e scelto per competenza e affidabilita.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* Filter + Partners Grid */}
      <section className="py-24 lg:py-32 px-6 bg-paper-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-leaf-100/20 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section heading */}
          <SlideUp>
            <div className="text-center mb-12">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
                Directory partner approvati
              </span>
              <h2 className="text-stitch-heading text-3xl md:text-4xl lg:text-5xl text-forest-950 mt-4">
                PROFESSIONISTI DEL{" "}
                <em className="italic font-normal text-leaf-600">Verde</em>
              </h2>
            </div>
          </SlideUp>

          {/* Filter pills */}
          <SlideUp delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {filterOptions.map((option) => {
                const isActive = activeFilter === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setActiveFilter(option.value)}
                    className={`
                      px-6 py-2.5 rounded-full text-sm font-sans uppercase tracking-wider
                      transition-all duration-300 cursor-pointer
                      ${
                        isActive
                          ? "bg-forest-950 text-paper-50 shadow-medium"
                          : "border border-paper-200/50 bg-paper-50/80 backdrop-blur-sm text-forest-800 hover:border-leaf-300 hover:bg-paper-50"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </SlideUp>

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border border-paper-100 bg-paper-50 rounded-[30px] p-8 animate-pulse"
                >
                  <div className="h-6 bg-paper-200 rounded-full w-3/4 mb-4" />
                  <div className="h-4 bg-paper-200 rounded-full w-1/3 mb-6" />
                  <div className="space-y-3">
                    <div className="h-4 bg-paper-200 rounded-full w-full" />
                    <div className="h-4 bg-paper-200 rounded-full w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredPartners.length === 0 && (
            <SlideUp>
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-paper-200 flex items-center justify-center mx-auto mb-8">
                  <Search className="w-10 h-10 text-paper-400" />
                </div>
                <h3 className="font-display text-2xl text-forest-950 mb-3">
                  {activeFilter === "tutti"
                    ? "Nessun partner ancora pubblicato"
                    : `Nessun ${partnershipTypeLabels[activeFilter]?.toLowerCase() ?? "partner"} ancora pubblicato`}
                </h3>
                <p className="font-body text-forest-800/60 max-w-md mx-auto">
                  La nostra rete di partner e in continua crescita. Torna presto
                  per scoprire i professionisti selezionati.
                </p>
              </div>
            </SlideUp>
          )}

          {/* Partners grid */}
          {!isLoading && filteredPartners.length > 0 && (
            <StaggerContainer delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPartners.map((partner, index) => (
                  <StaggerItem key={partner._id} delay={index * 0.08}>
                    <div className="group h-full border border-paper-100 bg-paper-50 rounded-[30px] p-8 transition-all duration-300 hover:border-leaf-200 hover:-translate-y-1.5 hover:shadow-floating">
                      {/* Header: company name + type badge */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          {partner.logo ? (
                            <img
                              src={partner.logo}
                              alt={`Logo ${partner.companyName}`}
                              className="w-12 h-12 rounded-xl object-contain bg-paper-100 p-1 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center shrink-0">
                              <Leaf className="w-6 h-6 text-leaf-700" />
                            </div>
                          )}
                          <h3 className="font-display text-xl text-forest-950 leading-tight truncate">
                            {partner.companyName}
                          </h3>
                        </div>
                      </div>

                      {/* Partnership type badge */}
                      <div className="mb-5">
                        <Badge
                          variant={
                            partnershipTypeBadgeVariant[
                              partner.partnershipType
                            ] ?? "default"
                          }
                          size="sm"
                        >
                          {partnershipTypeLabels[partner.partnershipType] ??
                            partner.partnershipType}
                        </Badge>
                      </div>

                      {/* Description */}
                      {partner.publicDescription && (
                        <p className="font-body text-forest-800/70 leading-relaxed mb-5 line-clamp-3">
                          {partner.publicDescription}
                        </p>
                      )}

                      {/* Specialties tags */}
                      {partner.specialties && partner.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {partner.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="inline-block px-3 py-1 text-xs font-sans uppercase tracking-wider text-leaf-700 bg-leaf-50 border border-leaf-200/50 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Website link */}
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-sans text-leaf-600 hover:text-leaf-700 transition-colors duration-200 group/link"
                        >
                          <Globe className="w-4 h-4" />
                          <span className="group-hover/link:underline">
                            Visita il sito web
                          </span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-forest-950 text-paper-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=30"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-leaf-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <SlideUp>
            <h2 className="text-stitch-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-paper-50">
              VUOI FAR PARTE DELLA{" "}
              <em className="italic font-normal text-leaf-400">Rete?</em>
            </h2>
            <p className="font-body text-xl text-paper-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Cerchiamo fornitori, subappaltatori e consulenti che condividano i
              nostri valori di sostenibilita e qualita. Proponi una
              collaborazione.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collabora">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-12 py-5 text-xl tracking-wider font-bold rounded-2xl shadow-deep hover:scale-105 transition-transform"
                >
                  <Handshake className="w-5 h-5 mr-2" />
                  Proponi una Collaborazione
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-10 text-paper-400 text-micro">
              <span className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-leaf-400" />
                Rispondiamo entro 48 ore
              </span>
              <span className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-leaf-400" />
                Processo di selezione trasparente
              </span>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
