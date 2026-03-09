"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle,
  Shield,
  Leaf,
  Target,
  Eye,
  FileText,
  Download,
  X,
  Droplets,
  TreeDeciduous,
  Recycle,
  CalendarCheck,
  Search,
  BarChart3,
  Bug,
  Flower2,
  ClipboardCheck,
  Timer,
  Wrench,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";
import { siteConfig } from "../lib/site-config";
import { BLUR_DATA_URL } from "../lib/image-utils";

/* ─── Quality Standards ─── */

const qualityStandards = [
  {
    icon: Leaf,
    title: "Materiali certificati e tracciabili",
    description:
      "Ogni materiale utilizzato — terricci, ammendanti, pacciamature, piante — proviene da fornitori selezionati con filiera documentata. Sappiamo da dove arriva, come è stato prodotto e perché lo abbiamo scelto.",
    badge: "Filiera",
  },
  {
    icon: Shield,
    title: "Personale formato e aggiornato",
    description:
      "Tutti i collaboratori seguono percorsi di formazione continua su sicurezza (D.Lgs. 81/08), tecniche di potatura, gestione fitosanitaria biologica e pratiche biodinamiche. Aggiornamenti annuali garantiti.",
    badge: "Formazione",
  },
  {
    icon: CheckCircle,
    title: "Protocolli di sicurezza cantiere",
    description:
      "Ogni intervento segue procedure operative standardizzate: DPI adeguati, segnaletica, gestione attrezzature, coperture assicurative complete. Il cliente non si assume mai rischi legati al nostro lavoro.",
    badge: "Sicurezza",
  },
  {
    icon: Recycle,
    title: "Gestione responsabile dei rifiuti verdi",
    description:
      "Sfalci, potature e materiale organico vengono gestiti secondo le normative vigenti: compostaggio in loco quando possibile, conferimento a impianti autorizzati, nessuno smaltimento improprio.",
    badge: "Ambiente",
  },
];

/* ─── Biodinamica Methodology ─── */

const methodology = [
  {
    icon: Search,
    title: "Analisi preventiva del suolo e microclima",
    description:
      "Prima di progettare qualsiasi intervento, studiamo il terreno: pH, struttura, drenaggio, esposizione, ventilazione. Ogni scelta parte dai dati reali del luogo, non da soluzioni standardizzate.",
    step: "01",
  },
  {
    icon: TreeDeciduous,
    title: "Selezione piante autoctone e resistenti",
    description:
      "Privilegiamo specie native del Piemonte e dell'arco alpino, adattate al clima locale. Richiedono meno acqua, meno trattamenti e si integrano nell'ecosistema esistente senza forzature.",
    step: "02",
  },
  {
    icon: CalendarCheck,
    title: "Calendario biodinamico per interventi",
    description:
      "Pianifichiamo potature, trapianti e semine seguendo i ritmi naturali e il calendario biodinamico. Non è misticismo: è rispetto dei cicli biologici che migliorano radicamento e crescita.",
    step: "03",
  },
  {
    icon: BarChart3,
    title: "Monitoraggio post-intervento",
    description:
      "Ogni progetto viene seguito nei mesi successivi con sopralluoghi programmati. Verifichiamo attecchimento, sviluppo radicale, equilibrio idrico e interveniamo preventivamente se necessario.",
    step: "04",
  },
];

/* ─── Environmental Certifications ─── */

const environmentalCommitments = [
  {
    icon: Target,
    title: "Impatto zero: compensazione CO2",
    description:
      "Calcoliamo l'impronta carbonica di ogni cantiere — trasporti, attrezzature, materiali — e compensiamo attraverso la piantumazione di alberi autoctoni sul territorio piemontese.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Bug,
    title: "Zero pesticidi chimici",
    description:
      "Utilizziamo esclusivamente trattamenti biologici e preparati biodinamici. Lotta integrata, macerati vegetali, insetti utili: proteggiamo le piante senza avvelenare il suolo.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Droplets,
    title: "Gestione idrica sostenibile",
    description:
      "Impianti di irrigazione a basso consumo, sensori di umidità, raccolta acqua piovana quando possibile. Ogni goccia è gestita con precisione, non per abbondanza.",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: Flower2,
    title: "Biodiversità: habitat per impollinatori",
    description:
      "Progettiamo aree fiorite, siepi miste e zone rifugio per api, farfalle e insetti benefici. Un giardino sano è un ecosistema completo, non solo una superficie curata.",
    color: "bg-amber-100 text-amber-700",
  },
];

/* ─── Operational Guarantees ─── */

const guarantees = [
  {
    icon: ClipboardCheck,
    title: "Preventivo dettagliato entro 48 ore",
    description:
      "Dopo il sopralluogo, ricevi un preventivo chiaro e completo: voci di costo trasparenti, materiali specificati, tempistiche realistiche. Nessuna sorpresa.",
    highlight: "48h",
  },
  {
    icon: Timer,
    title: "Rispetto tempistiche concordate",
    description:
      "Le date di inizio e fine lavori vengono concordate per iscritto. Se un imprevisto richiede variazioni, lo comunichiamo subito con soluzioni alternative.",
    highlight: "100%",
  },
  {
    icon: Wrench,
    title: "Garanzia su impianti e materiali",
    description:
      "Tutti gli impianti di irrigazione e i materiali strutturali sono coperti da garanzia. Se qualcosa non funziona come previsto, interveniamo senza costi aggiuntivi.",
    highlight: "Inclusa",
  },
  {
    icon: HeadphonesIcon,
    title: "Assistenza post-intervento inclusa",
    description:
      "Al termine di ogni progetto, offriamo un periodo di assistenza per verificare che tutto proceda correttamente. Consigli di manutenzione, sopralluoghi di controllo e supporto telefonico.",
    highlight: "Sempre",
  },
];

/* ─── Attestati ─── */

const attestati = [
  {
    title: "Formazione Generale Sicurezza",
    description:
      "Attestato di formazione generale obbligatoria per lavoratori — D.Lgs. 81/08.",
    file: "/attestato-formazione-generale.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "Formazione 16 Ore",
    description:
      "Corso di formazione sicurezza sui luoghi di lavoro — 16 ore di aggiornamento.",
    file: "/attestato-formazione-16h.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "Antincendio",
    description:
      "Attestato di idoneità tecnica per addetto antincendio — rischio basso/medio.",
    file: "/attestato-antincendio.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "Preposto",
    description:
      "Formazione specifica per preposto — vigilanza e coordinamento del personale.",
    file: "/attestato-preposto.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "RLS — Rappresentante Lavoratori",
    description:
      "Formazione specifica per Rappresentante dei Lavoratori per la Sicurezza.",
    file: "/attestato-rls.pdf",
    persona: "Andrea Giordano",
  },
  {
    title: "RSPP / DDL",
    description:
      "Responsabile del Servizio di Prevenzione e Protezione — Datore di Lavoro.",
    file: "/attestato-rspp-ddl.pdf",
    persona: "Giordano Umberto",
  },
];

/* ─── Stats ─── */

const stats = [
  { value: `Dal ${siteConfig.foundingDate}`, label: "Approccio biodinamico" },
  { value: "0", label: "Pesticidi chimici" },
  { value: "100%", label: "Materiali tracciabili" },
  { value: "48h", label: "Per il preventivo" },
];

/* ─── Component ─── */

export default function QualitaPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-paper-50">
      {/* ── Hero ── */}
      <section className="relative h-[70vh] md:h-[50vh] flex items-center justify-center bg-forest-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
            alt="Giardino curato con attenzione alla qualità e ai dettagli naturali"
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/60 via-forest-900/40 to-forest-950/50 z-10" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-20 px-6 pt-20 md:pt-0">
          <SlideUp>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              I Nostri Standard
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 uppercase tracking-tight">
              La Nostra
              <span className="block italic text-leaf-400 font-light lowercase">
                Qualità
              </span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed font-light">
              Ogni intervento di {siteConfig.companyName} segue standard
              operativi precisi: dalla scelta dei materiali alla sicurezza in
              cantiere, dalla metodologia biodinamica alle garanzie
              post-intervento.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-16 bg-forest-950 text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <SlideUp key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="font-display text-4xl md:text-5xl text-leaf-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-paper-400">
                    {stat.label}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality Standards ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">
                Standard Operativi
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-4">
                Cosa garantiamo, concretamente
              </h2>
              <p className="font-body text-lg text-forest-700 max-w-2xl mx-auto">
                Non promesse generiche, ma criteri operativi verificabili che
                applichiamo in ogni cantiere.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {qualityStandards.map((standard, index) => (
                <StaggerItem key={standard.title} delay={index * 0.1}>
                  <Card
                    variant="elevated"
                    className="h-full group hover:shadow-floating transition-all duration-500"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-leaf-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <standard.icon className="w-7 h-7 text-leaf-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl text-forest-950">
                            {standard.title}
                          </h3>
                          <Badge
                            variant="eco"
                            size="sm"
                            className="hidden sm:inline-flex"
                          >
                            {standard.badge}
                          </Badge>
                        </div>
                        <p className="font-body text-forest-800 leading-relaxed">
                          {standard.description}
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

      {/* ── Methodology (Biodinamica) ── */}
      <section className="py-24 px-6 bg-paper-100">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge variant="biodynamic" className="mb-4">
                Metodo Biodinamico
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-4">
                Il nostro approccio, passo per passo
              </h2>
              <p className="font-body text-lg text-forest-700 max-w-2xl mx-auto">
                Un metodo che parte dall&apos;osservazione del luogo e segue i
                ritmi naturali — non li forza.
              </p>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {methodology.map((step, index) => (
              <SlideUp key={step.title} delay={index * 0.15}>
                <div className="bg-white rounded-2xl shadow-soft border border-paper-100 p-8 h-full group hover:shadow-floating transition-all duration-500">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <span className="font-display text-5xl font-light text-leaf-300 group-hover:text-leaf-400 transition-colors duration-300">
                        {step.step}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center mb-4">
                        <step.icon className="w-6 h-6 text-leaf-600" />
                      </div>
                      <h3 className="font-display text-xl text-forest-950 mb-3">
                        {step.title}
                      </h3>
                      <p className="font-body text-forest-800 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Environmental Certifications ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge variant="eco" className="mb-4">
                Impegno Ambientale
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-4">
                I nostri impegni per l&apos;ambiente
              </h2>
              <p className="font-body text-lg text-forest-700 max-w-2xl mx-auto">
                La sostenibilità non è un argomento di marketing. È il criterio
                con cui prendiamo ogni decisione operativa.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {environmentalCommitments.map((commitment, index) => (
                <StaggerItem key={commitment.title} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl shadow-soft border border-paper-100 p-6 h-full text-center group hover:shadow-floating transition-all duration-500">
                    <div
                      className={`w-16 h-16 rounded-full ${commitment.color.split(" ")[0]} flex items-center justify-center mx-auto mb-5`}
                    >
                      <commitment.icon
                        className={`w-8 h-8 ${commitment.color.split(" ")[1]}`}
                      />
                    </div>
                    <h3 className="font-display text-lg text-forest-950 mb-3">
                      {commitment.title}
                    </h3>
                    <p className="font-body text-sm text-forest-800 leading-relaxed">
                      {commitment.description}
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-leaf-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Impegno attivo
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ── Operational Guarantees ── */}
      <section className="py-24 px-6 bg-forest-950 text-white">
        <div className="max-w-6xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge className="bg-sun-400/20 border-leaf-500/30 text-leaf-300 mb-4">
                Garanzie Operative
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Quello che puoi aspettarti da noi
              </h2>
              <p className="font-body text-lg text-paper-400 max-w-2xl mx-auto">
                Impegni concreti, non clausole generiche. Ogni garanzia si
                applica a tutti i nostri interventi.
              </p>
            </div>
          </SlideUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {guarantees.map((guarantee, index) => (
              <SlideUp key={guarantee.title} delay={index * 0.12}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 h-full group hover:bg-white/10 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-leaf-500/20 flex items-center justify-center">
                        <guarantee.icon className="w-7 h-7 text-leaf-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-display text-xl text-white">
                          {guarantee.title}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sun-400/20 text-sun-300 border border-sun-400/30">
                          {guarantee.highlight}
                        </span>
                      </div>
                      <p className="font-body text-paper-400 leading-relaxed">
                        {guarantee.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Attestati di Sicurezza ── */}
      <section className="py-24 px-6 bg-paper-100">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">
                Sicurezza sul Lavoro
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-4">
                Attestati e qualifiche
              </h2>
              <p className="font-body text-forest-700 mt-2 max-w-xl mx-auto">
                Tutta la documentazione di sicurezza è aggiornata e
                verificabile. Formazione continua per tutto il team.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {attestati.map((att, index) => (
                <StaggerItem key={att.file} delay={index * 0.08}>
                  <Card
                    variant="elevated"
                    className="h-full flex flex-col gap-3 group hover:shadow-floating transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-leaf-100 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-leaf-700" />
                      </div>
                      <div>
                        <h3 className="font-display text-base text-forest-950 leading-tight">
                          {att.title}
                        </h3>
                        <p className="text-xs text-paper-500 mt-0.5">
                          {att.persona}
                        </p>
                      </div>
                    </div>
                    <p className="font-body text-sm text-forest-700 flex-1">
                      {att.description}
                    </p>
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

      {/* ── PDF Preview Modal ── */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-paper-200">
              <span className="font-display text-sm text-forest-950">
                Anteprima Attestato
              </span>
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

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-paper-50">
        <div className="max-w-2xl mx-auto text-center">
          <SlideUp>
            <Badge variant="primary" className="mb-4">
              Prossimo Passo
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-6">
              Vuoi saperne di più?
            </h2>
            <p className="font-body text-lg text-forest-800 mb-8 leading-relaxed">
              Contattaci per un sopralluogo gratuito: valutiamo insieme il tuo
              spazio e ti spieghiamo come applichiamo questi standard al tuo
              progetto.
            </p>
            <Link href="/contatti">
              <Button variant="primary" size="lg">
                Parliamone
              </Button>
            </Link>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
