"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, Shield, Star, Leaf, Users, Clock, Target, Eye, FileText, Download, X, Droplets, TreeDeciduous, Recycle, Heart } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";

const qualityBoxes = [
  {
    icon: Leaf,
    title: "Il nostro standard parte dal suolo",
    description: "Il verde dura quando il suolo è vivo. Lavoriamo per rigenerarlo e mantenerlo fertile con pratiche coerenti con un approccio biodinamico certificato.",
  },
  {
    icon: Target,
    title: "Impatto zero è un criterio, non uno slogan",
    description: "Riduciamo sprechi e interventi inutili: acqua gestita con criterio, scelte progettuali che semplificano la manutenzione, materiali e soluzioni che reggono nel tempo.",
  },
  {
    icon: TreeDeciduous,
    title: "Piante autoctone e scelte coerenti col contesto",
    description: "Selezioniamo specie autoctone o pienamente adatte al territorio: richiedono meno risorse, si ammalano meno, restano equilibrate più a lungo.",
  },
  {
    icon: Droplets,
    title: "Acqua: precisione, non abbondanza",
    description: "L\u2019irrigazione non è \u201Cpiù acqua = più verde\u201D. È gestione. Un impianto ben regolato riduce sprechi, previene problemi e protegge le piante.",
  },
  {
    icon: Clock,
    title: "Manutenzione che previene, non che rincorre",
    description: "Preferiamo una manutenzione sostenibile e programmata: osservazione, piccoli interventi al momento giusto, correzioni mirate.",
  },
  {
    icon: Shield,
    title: "Sicurezza: lavoriamo protetti, tu sei protetto",
    description: "Ogni collaboratore opera con procedure corrette e dispositivi adeguati. Coperture assicurative regolari: se succede un imprevisto, il danno non è mai a carico del cliente.",
  },
  {
    icon: Heart,
    title: "Rispetto del luogo e di chi lo vive",
    description: "Il verde è un ambiente quotidiano. Lavoriamo con attenzione a tempi, rumori, pulizia e convivenza degli spazi.",
  },
  {
    icon: FileText,
    title: "Tracciabilità e trasparenza: te lo spieghiamo prima",
    description: "Ogni scelta importante viene motivata: cosa facciamo, perché lo facciamo, cosa aspettarsi nel tempo. La qualità è comprensibile e verificabile.",
  },
  {
    icon: Users,
    title: "Per B2B e condomìni: standard e responsabilità",
    description: "In contesti condivisi, la qualità include gestione del rischio, responsabilità e continuità del servizio.",
  },
  {
    icon: Recycle,
    title: "Gestione sostenibile degli scarti verdi",
    description: "La sostenibilità non finisce quando si taglia o si pota: continua in come si gestisce ciò che si produce.",
  },
];

const commitments = [
  {
    icon: Leaf,
    title: "Suolo vivo prima di tutto",
    description: "Rigeneriamo e proteggiamo la base: senza un terreno sano, nulla dura davvero.",
  },
  {
    icon: Droplets,
    title: "Acqua gestita con precisione",
    description: "Impianti e regolazioni pensati per ridurre sprechi e stress alle piante.",
  },
  {
    icon: TreeDeciduous,
    title: "Piante autoctone o pienamente adatte",
    description: "Specie coerenti col territorio: meno problemi, più equilibrio, più durata.",
  },
  {
    icon: Target,
    title: "Impatto zero come criterio operativo",
    description: "Meno sprechi, meno interventi inutili, soluzioni progettate per reggere nel tempo.",
  },
  {
    icon: Clock,
    title: "Manutenzione programmata, non correttiva",
    description: "Interveniamo al momento giusto, con continuità: così la qualità si conserva.",
  },
  {
    icon: Shield,
    title: "Sicurezza totale e tutela del cliente",
    description: "Squadre formate, procedure corrette e polizze in regola: se succede un imprevisto, il danno non ricade sul cliente.",
  },
  {
    icon: Star,
    title: "Educazione e un bel sorriso",
    description: "Il nostro modo di intendere la qualità: scelte chiare, responsabilità, risultati che durano.",
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

        <div className="max-w-4xl mx-auto text-center relative z-20 px-6 pt-20 md:pt-0">
          <SlideUp>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              Qualità Certificata
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 uppercase tracking-tight">
              Il nostro patto
              <span className="block italic text-leaf-400 font-light lowercase">di Qualità</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed font-light">
              Per noi qualità non si traduce solo in un giardino bello. È uno standard che si misura nel tempo e si riconosce nelle scelte: suolo, acqua, piante, manutenzione e sicurezza totale.
            </p>
            <p className="font-body text-sm text-leaf-400/80 mt-6 max-w-xl mx-auto">
              Prima realtà a certificare il lavoro SOSTENIBILE Agri Bio Dinamica — Cert. N° 54/23 del 11-06-2023
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
                I Nostri Standard
              </Badge>
              <h2 className="font-display text-4xl text-forest-950">
                Cosa garantiamo, concretamente
              </h2>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {qualityBoxes.map((box, index) => (
                <StaggerItem key={box.title} delay={index * 0.1}>
                  <Card variant="elevated" className="h-full group hover:shadow-floating transition-all duration-500">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-leaf-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <box.icon className="w-8 h-8 text-leaf-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl text-forest-950 mb-2">
                          {box.title}
                        </h3>
                        <p className="font-body text-forest-800">
                          {box.description}
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
                In sintesi
              </Badge>
              <h2 className="font-display text-4xl text-forest-950">
                I nostri Standard di Eccellenza in 7 punti
              </h2>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              Prossimo passo
            </Badge>
            <h2 className="font-display text-4xl text-forest-950 mb-6">
              Vuoi raggiungere questo standard?
            </h2>
            <p className="font-body text-lg text-forest-800 mb-8">
              Parliamone: valutiamo insieme il contesto e la soluzione più sostenibile per il tuo spazio verde.
            </p>
            <Link href="/contatti">
              <Button className="bg-sun-400 hover:bg-sun-500 text-white">
                Parliamone
              </Button>
            </Link>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
