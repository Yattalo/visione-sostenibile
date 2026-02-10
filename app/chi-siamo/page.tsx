import type { Metadata } from "next";
import { CheckCircle2, Award, Leaf, Users, Clock, Globe } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "Scopri Visione Sostenibile: passione per il verde, professionalità e sostenibilità. Dal 2009 creiamo giardini unici.",
};

const values = [
  {
    icon: Leaf,
    title: "Sostenibilità",
    description: "Utilizziamo tecniche e materiali eco-friendly per un futuro più verde.",
  },
  {
    icon: Award,
    title: "Qualità",
    description: "Ogni progetto è curato nei minimi dettagli con materiali di prima scelta.",
  },
  {
    icon: Users,
    title: "Professionalità",
    description: "Team di esperti qualificati con anni di esperienza nel settore.",
  },
  {
    icon: Clock,
    title: "Affidabilità",
    description: "Rispetto dei tempi e delle promesse fatte ai nostri clienti.",
  },
];

const stats = [
  { value: "15+", label: "Anni di esperienza" },
  { value: "500+", label: "Clienti soddisfatti" },
  { value: "1000+", label: "Progetti realizzati" },
  { value: "50+", label: "Tipologie servizi" },
];

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <SlideUp>
        <section className="bg-earth-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="primary" className="mb-4">
              Chi Siamo
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Passione per il Verde dal 2009
            </h1>
            <p className="text-xl text-earth-200 max-w-3xl">
              Visione Sostenibile nasce dalla passione per il verde e dalla volontà
              di creare spazi esterni che armonizzino bellezza estetica e rispetto
              per l&apos;ambiente.
            </p>
          </div>
        </section>
      </SlideUp>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideUp>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-earth-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-gradient-to-br from-primary-100 to-earth-100 rounded-3xl p-8 aspect-[4/3] flex items-center justify-center">
                  <span className="text-8xl">🌿</span>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <Badge variant="earth" className="mb-4">
                La Nostra Storia
              </Badge>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Creiamo Spazi Verdi che Ispirano
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  Da oltre 15 anni operiamo nel settore del giardinaggio e della
                  progettazione del paesaggio, trasformando giardini, terrazze e spazi
                  esterni in luoghi unici e rigogliosi.
                </p>
                <p className="text-lg leading-relaxed">
                  Il nostro team è composto da professionisti qualificati: agronomi,
                  architetti del paesaggio, giardinieri esperti e tecnici specializzati
                  nelle diverse aree dell&apos;ingegneria naturalistica.
                </p>
                <p className="text-lg leading-relaxed">
                  Crediamo fermamente che ogni spazio verde debba essere progettato
                  considerando l&apos;equilibrio naturale, la sostenibilità ambientale e le
                  esigenze specifiche di chi lo vivrà.
                </p>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      <section className="py-20 bg-earth-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <SlideUp key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <p className="font-display text-4xl md:text-5xl font-bold text-primary-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-earth-300">{stat.label}</p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">
                I Nostri Valori
              </Badge>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Cosa Ci Guida
              </h2>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <StaggerItem key={value.title} delay={index * 0.1}>
                  <Card variant="outline" className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-7 h-7 text-primary-600" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-earth-100 dark:bg-earth-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <Badge variant="earth" className="mb-4">
              Contattaci
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Vuoi Conoscerci Meglio?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Siamo sempre disponibili per una consulenza o per mostrarti alcuni
              dei nostri progetti dal vivo.
            </p>
            <Link href="/contatti">
              <Button size="lg">
                Contattaci Ora
              </Button>
            </Link>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
