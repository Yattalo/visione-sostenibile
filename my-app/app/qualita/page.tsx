"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle, Shield, Star, Leaf, Users, Clock, Target, FileDown, Eye, FileText, Download, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";

const certifications = [
  {
    icon: Leaf,
    title: "Biodinamica Certificata",
    description: "Metodologia certificata secondo i principi dell'agricoltura biodinamica di Rudolf Steiner. Andrea Giordano pratica la biodinamica da oltre 20 anni.",
    issuedBy: "Associazione per l'Agricoltura Biodinamica",
    year: "",
    category: "biodynamic",
  },
  {
    icon: Shield,
    title: "Giardinaggio a Impatto Zero",
    description: "Compensazione totale delle emissioni CO₂ attraverso pratiche sostenibili e riforestazione. Garantiamo un impatto ambientale netto pari a zero.",
    issuedBy: "Visione Sostenibile",
    year: "",
    category: "eco",
  },
  {
    icon: CheckCircle,
    title: "Zero Prodotti Chimici",
    description: "Utilizzo esclusivo di prodotti naturali e biologici per la cura del verde. Eliminazione totale del rischio di intossicazione per persone e animali.",
    issuedBy: "Visione Sostenibile",
    year: "",
    category: "eco",
  },
];

const commitments = [
  {
    icon: Star,
    title: "Eccellenza Garantita",
    description: "Ogni progetto è curato nei minimi dettagli con standard qualitativi elevati.",
  },
  {
    icon: Users,
    title: "Professionisti Qualificati",
    description: "Team di esperti con formazione continua e certificazioni aggiornate.",
  },
  {
    icon: Clock,
    title: "Puntualità Assicurata",
    description: "Rispetto dei tempi concordati con comunicazione trasparente.",
  },
  {
    icon: Target,
    title: "Soddisfazione Garantita",
    description: "Garanzia su tutti i lavori con supporto post-intervento dedicato.",
  },
];

const attestati = [
  {
    title: "Formazione Generale Sicurezza",
    description: "Attestato di formazione generale obbligatoria per lavoratori — D.Lgs. 81/08.",
    file: "/attestato-formazione-generale.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "Formazione 16 Ore",
    description: "Corso di formazione sicurezza sui luoghi di lavoro — 16 ore di aggiornamento.",
    file: "/attestato-formazione-16h.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "Antincendio",
    description: "Attestato di idoneità tecnica per addetto antincendio — rischio basso/medio.",
    file: "/attestato-antincendio.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "Preposto",
    description: "Formazione specifica per preposto — vigilanza e coordinamento del personale.",
    file: "/attestato-preposto.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "RLS — Rappresentante Lavoratori",
    description: "Formazione specifica per Rappresentante dei Lavoratori per la Sicurezza.",
    file: "/attestato-rls.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "RSPP / DDL",
    description: "Responsabile del Servizio di Prevenzione e Protezione — Datore di Lavoro.",
    file: "/attestato-rspp-ddl.pdf",
    persona: "Giordano Umberto",
  },
];

const stats = [
  { value: "20+", label: "Anni in biodinamica" },
  { value: "10+", label: "Anni di giardinaggio" },
  { value: "100%", label: "Impatto zero" },
  { value: "0", label: "Prodotti chimici" },
];

export default function QualitaPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[50vh] flex items-center justify-center bg-forest-950 text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
            alt="Qualità certificata"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/60 via-forest-900/40 to-forest-950/50 z-10" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-20 px-6 pt-12">
          <SlideUp>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              Qualità Certificata
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 uppercase tracking-tight">
              Il Nostro Impegno per
              <span className="block italic text-leaf-400 font-light lowercase">l&apos;Eccellenza</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed font-light">
              Ogni progetto è realizzato con professionalità, competenza e passione.
              Scopri le nostre certificazioni e gli standard che ci guidano.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge className="bg-leaf-100 text-leaf-700 mb-4">
                Le Nostre Certificazioni
              </Badge>
              <h2 className="font-display text-4xl text-forest-950">
                Standard di Eccellenza
              </h2>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <StaggerItem key={cert.title} delay={index * 0.1}>
                  <Card variant="elevated" className="h-full group hover:shadow-floating transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-leaf-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <cert.icon className="w-8 h-8 text-leaf-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl text-forest-950">
                            {cert.title}
                          </h3>
                          <Badge
                            variant={cert.category === "eco" || cert.category === "biodynamic" ? "eco" : "primary"}
                            size="sm"
                          >
                            {cert.year}
                          </Badge>
                        </div>
                        <p className="font-body text-forest-800 mb-2">
                          {cert.description}
                        </p>
                        <p className="font-body text-sm text-paper-500 mb-4">
                          <span className="font-medium">Rilasciato da:</span> {cert.issuedBy}
                        </p>
                        <a
                          href="#"
                          className="text-sm text-leaf-700 hover:text-leaf-600 flex items-center gap-1.5 font-medium transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Visualizza Certificato
                        </a>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>

            <SlideUp delay={0.4}>
              <div className="mt-16 text-center">
                <Button className="bg-leaf-700 hover:bg-leaf-600 text-white px-8 py-6 rounded-full text-lg shadow-lg transition-transform hover:scale-105">
                  <Download className="mr-2 w-5 h-5" />
                  Richiedi Documentazione Completa
                </Button>
              </div>
            </SlideUp>
          </StaggerContainer>

          {/* Download/View Buttons */}
          <SlideUp delay={0.5}>
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-forest-950 text-white hover:bg-forest-900 px-8 py-6 rounded-2xl flex items-center gap-3 shadow-deep"
              >
                <FileDown className="w-5 h-5 text-sun-400" />
                <span className="flex flex-col items-start text-left">
                  <span className="text-xs uppercase tracking-widest opacity-60">Scarica ora</span>
                  <span className="text-sm font-bold">Brochure Qualità .PDF</span>
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-forest-200 text-forest-900 hover:bg-forest-50 px-8 py-6 rounded-2xl flex items-center gap-3"
              >
                <Eye className="w-5 h-5 text-leaf-600" />
                <span className="flex flex-col items-start text-left">
                  <span className="text-xs uppercase tracking-widest opacity-60">Visualizza</span>
                  <span className="text-sm font-bold">Certificazioni Complete</span>
                </span>
              </Button>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Attestati di Sicurezza */}
      <section className="py-24 px-6 bg-paper-100">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge className="bg-leaf-100 text-leaf-700 mb-4">
                Sicurezza sul Lavoro
              </Badge>
              <h2 className="font-display text-4xl text-forest-950">
                Attestati e Qualifiche
              </h2>
              <p className="font-body text-forest-700 mt-4 max-w-xl mx-auto">
                Tutta la documentazione di sicurezza è aggiornata e verificabile.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {attestati.map((att, index) => (
                <StaggerItem key={att.file} delay={index * 0.08}>
                  <Card variant="elevated" className="h-full flex flex-col gap-3 group hover:shadow-floating transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-leaf-100 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-leaf-700" />
                      </div>
                      <div>
                        <h3 className="font-display text-base text-forest-950 leading-tight">{att.title}</h3>
                        <p className="text-xs text-paper-500 mt-0.5">{att.persona}</p>
                      </div>
                    </div>
                    <p className="font-body text-sm text-forest-700 flex-1">{att.description}</p>
                    <div className="flex gap-2 pt-2 border-t border-paper-200">
                      <button
                        type="button"
                        onClick={() => setPreviewUrl(att.file)}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-leaf-700 hover:text-leaf-600 py-2 px-3 rounded-lg hover:bg-leaf-50 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Visualizza
                      </button>
                      <a
                        href={att.file}
                        download
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-forest-700 hover:text-forest-900 py-2 px-3 rounded-lg hover:bg-paper-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Scarica
                      </a>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* PDF Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-paper-200">
              <span className="font-display text-sm text-forest-950">Anteprima Attestato</span>
              <button
                type="button"
                aria-label="Chiudi anteprima"
                onClick={() => setPreviewUrl(null)}
                className="w-8 h-8 rounded-full hover:bg-paper-100 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-forest-700" />
              </button>
            </div>
            <iframe
              src={previewUrl}
              className="flex-1 w-full"
              title="Anteprima attestato"
            />
            <div className="px-5 py-3 border-t border-paper-200 flex justify-end">
              <a
                href={previewUrl}
                download
                className="flex items-center gap-2 text-sm font-medium text-leaf-700 hover:text-leaf-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Scarica PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <section className="py-20 bg-forest-950 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <SlideUp>
            <div className="text-center mb-12">
              <Badge className="bg-sun-400/20 border-leaf-500/30 text-leaf-300 mb-4">
                I Nostri Numeri
              </Badge>
              <h2 className="font-display text-4xl">
                Risultati che Parlano
              </h2>
            </div>
          </SlideUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <SlideUp key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="font-display text-5xl text-leaf-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm uppercase tracking-widest text-paper-400">
                    {stat.label}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge className="bg-paper-300 text-forest-900 mb-4">
                I Nostri Valori
              </Badge>
              <h2 className="font-display text-4xl text-forest-950">
                Cosa Ci Guida
              </h2>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((commitment, index) => (
              <StaggerItem key={commitment.title} delay={index * 0.1}>
                <Card variant="outline" className="h-full text-center group hover:border-leaf-500 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-leaf-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-leaf-100 transition-colors duration-300">
                    <commitment.icon className="w-7 h-7 text-leaf-700 group-hover:text-leaf-600 transition-colors" />
                  </div>
                  <h3 className="font-display text-lg text-forest-950 mb-2">
                    {commitment.title}
                  </h3>
                  <p className="font-body text-sm text-forest-800">
                    {commitment.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-paper-100">
        <div className="max-w-2xl mx-auto text-center">
          <SlideUp>
            <Badge className="bg-leaf-100 text-leaf-700 mb-4">
              Garanzia
            </Badge>
            <h2 className="font-display text-4xl text-forest-950 mb-6">
              La Tua Tranquillità è la Nostra Priorità
            </h2>
            <p className="font-body text-lg text-forest-800 mb-8">
              Ogni servizio è coperto da garanzia. Il nostro team è sempre a tua disposizione
              per qualsiasi necessità post-intervento.
            </p>
            <Button className="bg-leaf-700 hover:bg-leaf-600 text-white">
              Contattaci per una Consulenza
            </Button>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
