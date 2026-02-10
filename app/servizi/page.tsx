import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { staticServices } from "../lib/static-data";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/animations";

export const metadata: Metadata = {
  title: "I Nostri Servizi",
  description:
    "Scopri tutti i nostri servizi di giardinaggio: progettazione, realizzazione e manutenzione giardini. Soluzioni complete per il tuo spazio verde.",
};

export default function ServiziPage() {
  const services = staticServices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <SlideUp>
        <section className="bg-earth-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="primary" className="mb-4">
              I Nostri Servizi
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Servizi Professionali per il Tuo Verde
            </h1>
            <p className="text-xl text-earth-200 max-w-3xl">
              Dalla progettazione alla manutenzione, offriamo soluzioni complete
              per valorizzare i tuoi spazi esterni con professionalità e passione.
            </p>
          </div>
        </section>
      </SlideUp>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service, index) => (
                <StaggerItem key={service._id} delay={index * 0.1}>
                  <Link href={`/servizi/${service.slug}`}>
                    <Card variant="elevated" hover className="h-full group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-earth-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="relative z-10">
                        <div className="bg-gradient-to-br from-primary-100 to-earth-100 h-48 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <span className="text-5xl">🌿</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl font-bold text-primary-600">
                            {(index + 1).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {service.shortDescription}
                        </p>
                        <span className="inline-flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                          Scopri di più
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SlideUp>
            <Badge variant="earth" className="mb-4">
              Preventivo Gratuito
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              Hai Bisogno di un Preventivo Personalizzato?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contattaci per una consulenza gratuita. Saremo lieti di ascoltare
              le tue esigenze e proporti la soluzione migliore per il tuo spazio verde.
            </p>
            <Link href="/contatti">
              <Button size="lg">
                Richiedi Preventivo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
