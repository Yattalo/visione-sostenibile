import type { Metadata } from "next";
import { Shield, Mail, Phone, Lock, FileText, Database, Scale, Clock, UserCheck } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { SlideUp, FadeIn } from "../components/animations";

export const metadata: Metadata = {
  title: "Privacy Policy | Visione Sostenibile",
  description:
    "Informativa sulla privacy e trattamento dei dati personali di Visione Sostenibile. Scopri come gestiamo i tuoi dati.",
};

const sections = [
  {
    icon: FileText,
    number: "1",
    title: "Titolare del Trattamento",
    content: (
      <p className="font-body text-charcoal-500 leading-relaxed">
        Il titolare del trattamento dei dati personali è Visione Sostenibile S.r.l.,
        con sede in via del Verde, 123 - 00100 Roma (RM), P.IVA 12345678901.
      </p>
    ),
  },
  {
    icon: Database,
    number: "2",
    title: "Dati Raccolti",
    content: (
      <>
        <p className="font-body text-charcoal-500 leading-relaxed mb-4">
          Raccogliamo i seguenti dati personali:
        </p>
        <ul className="space-y-3 pl-0 list-none">
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Dati identificativi (nome, cognome)</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Dati di contatto (indirizzo email, numero di telefono)</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Dati forniti volontariamente tramite i form di contatto</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    number: "3",
    title: "Finalità del Trattamento",
    content: (
      <>
        <p className="font-body text-charcoal-500 leading-relaxed mb-4">
          I dati personali sono trattati per le seguenti finalità:
        </p>
        <ul className="space-y-3 pl-0 list-none">
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Rispondere alle richieste di contatto</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Inviare preventivi e informazioni sui servizi</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Gestire le richieste di supporto</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Adempiere agli obblighi di legge</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Scale,
    number: "4",
    title: "Base Giuridica",
    content: (
      <p className="font-body text-charcoal-500 leading-relaxed">
        Il trattamento dei dati si basa sul consenso dell&apos;interessato (art. 6, par. 1, lett. a)
        del GDPR) per le attività di marketing, e sull&apos;esecuzione di un contratto o di
        misure precontrattuali (art. 6, par. 1, lett. b) del GDPR) per la risposta alle richieste.
      </p>
    ),
  },
  {
    icon: Clock,
    number: "5",
    title: "Conservazione dei Dati",
    content: (
      <p className="font-body text-charcoal-500 leading-relaxed">
        I dati personali sono conservati per il tempo necessario al conseguimento delle
        finalità per cui sono stati raccolti, o in conformità con gli obblighi di legge.
      </p>
    ),
  },
  {
    icon: UserCheck,
    number: "6",
    title: "Diritti dell'Interessato",
    content: (
      <>
        <p className="font-body text-charcoal-500 leading-relaxed mb-4">
          In qualità di interessato, hai il diritto di:
        </p>
        <ul className="space-y-3 pl-0 list-none">
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Accedere ai tuoi dati personali</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Richiedere la rettifica o la cancellazione degli stessi</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Richiedere la limitazione del trattamento</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Opporsi al trattamento</span>
          </li>
          <li className="flex items-start gap-3 text-charcoal-500">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400 mt-2.5 shrink-0" />
            <span>Richiedere la portabilità dei dati</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Mail,
    number: "7",
    title: "Contatti",
    content: (
      <p className="font-body text-charcoal-500 leading-relaxed">
        Per esercitare i tuoi diritti o per qualsiasi informazione sul trattamento dei dati,
        puoi contattarci all&apos;indirizzo email: <strong className="text-charcoal-700">privacy@visionesostenibile.it</strong>
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* ═══════════════════════════════════════════════════
          HERO SECTION
          Matches site-wide organic aesthetic: dark moss bg,
          Shield icon, decorative blobs, serif heading
      ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-moss-900 pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Background texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-moss-900/95 via-moss-800/85 to-charcoal-900/90" />
        </div>

        {/* Organic decorative blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-terracotta-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-moss-500/20 rounded-full blur-3xl animate-drift" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-500/5 rounded-full blur-3xl" />

        {/* Thin decorative accent line */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-terracotta-400/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center mb-8">
              <Shield className="w-8 h-8 text-terracotta-300" />
            </div>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-cream-50 leading-tight max-w-4xl mb-8">
              Privacy
              <span className="block italic text-terracotta-300">Policy</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="font-body text-xl md:text-2xl text-cream-200/80 max-w-2xl leading-relaxed">
              Informazioni sul trattamento dei dati personali e sulla tutela
              della tua privacy.
            </p>
          </SlideUp>

          {/* Scroll indicator */}
          <SlideUp delay={0.5}>
            <div className="mt-16">
              <div className="w-px h-16 bg-gradient-to-b from-cream-300/50 to-transparent mx-0" />
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          LEGAL CONTENT
          Structured sections with icons and proper typography
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28">
        {/* Subtle top gradient blending hero into content */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-moss-900/5 to-transparent" />

        {/* Decorative background blob */}
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-terracotta-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-0">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <SlideUp key={section.number} delay={index * 0.05}>
                  <div className="relative py-10 first:pt-0 last:pb-0">
                    {/* Separator line between sections */}
                    {index > 0 && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-cream-200" />
                    )}

                    <div className="flex gap-6">
                      {/* Icon column */}
                      <div className="hidden sm:flex shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-terracotta-100 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-terracotta-600" />
                        </div>
                      </div>

                      {/* Content column */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-sans text-xs font-medium text-terracotta-500 uppercase tracking-widest">
                            Art. {section.number}
                          </span>
                        </div>
                        <h2 className="font-display text-2xl lg:text-3xl font-normal text-charcoal-800 mb-5">
                          {section.title}
                        </h2>
                        <div className="font-body text-base leading-relaxed">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </SlideUp>
              );
            })}
          </div>

          {/* Last updated */}
          <SlideUp delay={0.4}>
            <div className="mt-16 pt-8 border-t border-cream-200">
              <p className="font-sans text-sm text-charcoal-400">
                Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTACT CARD
          CTA card for privacy-related inquiries
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SlideUp>
            <Card variant="elevated" className="p-0 overflow-hidden">
              <CardContent className="p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-terracotta-100 flex items-center justify-center shrink-0">
                    <Shield className="w-7 h-7 text-terracotta-600" />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-normal text-charcoal-800 mb-2">
                      Hai Domande sulla Privacy?
                    </h3>
                    <p className="font-body text-charcoal-500 mb-6 leading-relaxed">
                      Il nostro team è a tua disposizione per qualsiasi
                      chiarimento sul trattamento dei tuoi dati personali.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      <a
                        href="mailto:privacy@visionesostenibile.it"
                        className="inline-flex items-center gap-2.5 text-terracotta-600 hover:text-terracotta-700 transition-colors font-sans text-sm font-medium group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-terracotta-100 flex items-center justify-center group-hover:bg-terracotta-200 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        privacy@visionesostenibile.it
                      </a>
                      <span className="inline-flex items-center gap-2.5 text-charcoal-500 font-sans text-sm">
                        <div className="w-9 h-9 rounded-lg bg-cream-200 flex items-center justify-center">
                          <Phone className="w-4 h-4" />
                        </div>
                        +39 06 1234567
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
