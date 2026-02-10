"use client";

import Link from "next/link";
import { staticServices } from "../../lib/static-data";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SlideUp } from "../../components/animations";
import { useParams } from "next/navigation";
import { ArrowLeft, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const service = staticServices.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Servizio non trovato
          </h1>
          <Link href="/servizi" className="text-primary-600 hover:underline">
            Torna ai servizi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlideUp>
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-muted-foreground hover:text-primary-600">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/servizi" className="text-muted-foreground hover:text-primary-600">
              Servizi
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{service.title}</span>
          </nav>
        </SlideUp>

        <SlideUp delay={0.1}>
          <section className="bg-earth-900 text-white py-16 rounded-3xl mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-earth-900/90 to-earth-800/90" />
            <div className="relative z-10 max-w-3xl px-8 pt-8">
              <Badge variant="primary" className="mb-4">
                Servizio
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-earth-200">
                {service.shortDescription}
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-primary-500/10 to-transparent" />
          </section>
        </SlideUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <SlideUp delay={0.2}>
              <Card variant="default" className="mb-8">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-primary-100 to-earth-100 h-80 rounded-2xl mb-8 flex items-center justify-center">
                    <span className="text-8xl">🌿</span>
                  </div>
                  
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Descrizione del Servizio
                  </h2>
                  <div className="prose prose-lg text-muted-foreground">
                    <p>
                      Offriamo un servizio professionale di {service.title.toLowerCase()}{" "}
                      con la massima cura dei dettagli e l&apos;utilizzo di tecniche all&apos;avanguardia. 
                      Il nostro team di esperti è a tua disposizione per realizzare il tuo progetto 
                      con professionalità e passione.
                    </p>
                    <p className="mt-4">
                      Utilizziamo solo materiali di alta qualità e tecniche sostenibili 
                      per garantire risultati duraturi nel tempo nel rispetto dell&apos;ambiente.
                    </p>
                  </div>

                  <h3 className="font-display text-xl font-bold text-foreground mt-8 mb-4">
                    Caratteristiche del Servizio
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Personale qualificato e esperto",
                      "Materiali di prima qualità",
                      "Tecniche eco-sostenibili",
                      "Preventivo gratuito e personalizzato",
                      "Garanzia sui lavori",
                      "Supporto post-intervento",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </SlideUp>
          </div>

          <div className="lg:col-span-1">
            <SlideUp delay={0.3}>
              <Card variant="elevated" className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Richiedi Informazioni
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Vuoi saperne di più su questo servizio? Contattaci per una 
                    consulenza gratuita e un preventivo personalizzato.
                  </p>
                  <Link href="/contatti" className="block mb-6">
                    <Button className="w-full" size="lg">
                      Contattaci Ora
                    </Button>
                  </Link>
                  <div className="space-y-4 pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-500" />
                      <span className="text-foreground">+39 06 1234567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary-500" />
                      <span className="text-foreground">info@visionesostenibile.it</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <span className="text-foreground">Lun-Ven: 8:00-18:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          </div>
        </div>
      </div>
    </div>
  );
}
