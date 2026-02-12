"use client";

import { Award, CheckCircle, Shield, Star, Leaf, Users, Clock, Target } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";

const certifications = [
  {
    icon: Shield,
    title: "Certificazione ISO 9001",
    description: "Sistema di gestione della qualità certificato per garantire standard elevati in ogni progetto.",
    issuedBy: "Bureau Veritas",
    year: "2020",
  },
  {
    icon: Leaf,
    title: "Certificazione Ambientale",
    description: "Impegno concreto per la sostenibilità con pratiche eco-friendly in tutti i nostri servizi.",
    issuedBy: "Associazione Verde Italia",
    year: "2019",
  },
  {
    icon: Award,
    title: "Premio Excellence Giardinaggio",
    description: "Riconoscimento regionale per l'eccellenza nella progettazione di spazi verdi urbani.",
    issuedBy: "Regione Lazio",
    year: "2023",
  },
  {
    icon: CheckCircle,
    title: "Abilitazione Professionale",
    description: "Team di professionisti abilitati e qualificati con certificazioni specifiche del settore.",
    issuedBy: "Ordine Agronomi Lazio",
    year: "2015",
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

const stats = [
  { value: "15+", label: "Anni di esperienza" },
  { value: "500+", label: "Clienti soddisfatti" },
  { value: "100%", label: "Professionisti certificati" },
  { value: "98%", label: "Progetti completati in tempo" },
];

export default function QualitaPage() {
  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      {/* Hero */}
      <section className="relative py-32 px-6 bg-moss-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-terracotta-500/30 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SlideUp>
            <Badge className="bg-terracotta-500/20 border-terracotta-400/30 text-terracotta-200 mb-6">
              Qualità Certificata
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">
              Il Nostro Impegno per
              <span className="block italic text-terracotta-300">l&apos;Eccellenza</span>
            </h1>
            <p className="font-body text-lg text-cream-200 max-w-2xl mx-auto leading-relaxed">
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
              <Badge className="bg-moss-100 text-moss-700 mb-4">
                Le Nostre Certificazioni
              </Badge>
              <h2 className="font-display text-4xl text-charcoal-800">
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
                      <div className="w-16 h-16 rounded-2xl bg-terracotta-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <cert.icon className="w-8 h-8 text-terracotta-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl text-charcoal-800">
                            {cert.title}
                          </h3>
                          <Badge variant="primary" size="sm">
                            {cert.year}
                          </Badge>
                        </div>
                        <p className="font-body text-charcoal-600 mb-2">
                          {cert.description}
                        </p>
                        <p className="font-body text-sm text-cream-500">
                          <span className="font-medium">Rilasciato da:</span> {cert.issuedBy}
                        </p>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-moss-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <SlideUp>
            <div className="text-center mb-12">
              <Badge className="bg-terracotta-500/20 border-terracotta-400/30 text-terracotta-200 mb-4">
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
                  <p className="font-display text-5xl text-terracotta-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-sm uppercase tracking-widest text-cream-300">
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
              <Badge className="bg-cream-200 text-charcoal-700 mb-4">
                I Nostri Valori
              </Badge>
              <h2 className="font-display text-4xl text-charcoal-800">
                Cosa Ci Guida
              </h2>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((commitment, index) => (
              <StaggerItem key={commitment.title} delay={index * 0.1}>
                <Card variant="outline" className="h-full text-center group hover:border-terracotta-300 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-moss-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-terracotta-100 transition-colors duration-300">
                    <commitment.icon className="w-7 h-7 text-moss-700 group-hover:text-terracotta-600 transition-colors" />
                  </div>
                  <h3 className="font-display text-lg text-charcoal-800 mb-2">
                    {commitment.title}
                  </h3>
                  <p className="font-body text-sm text-charcoal-600">
                    {commitment.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-cream-100">
        <div className="max-w-2xl mx-auto text-center">
          <SlideUp>
            <Badge className="bg-terracotta-100 text-terracotta-700 mb-4">
              Garanzia
            </Badge>
            <h2 className="font-display text-4xl text-charcoal-800 mb-6">
              La Tua Tranquillità è la Nostra Priorità
            </h2>
            <p className="font-body text-lg text-charcoal-600 mb-8">
              Ogni servizio è coperto da garanzia. Il nostro team è sempre a tua disposizione
              per qualsiasi necessità post-intervento.
            </p>
            <Button className="bg-moss-700 hover:bg-moss-600 text-white">
              Contattaci per una Consulenza
            </Button>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
