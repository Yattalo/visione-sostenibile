import type { Metadata } from "next";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp } from "../components/animations";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sulla privacy e trattamento dei dati personali di Visione Sostenibile. Scopri come gestiamo i tuoi dati.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <SlideUp>
        <section className="bg-earth-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="primary" className="mb-4">
              Privacy
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-earth-200 max-w-3xl">
              Informazioni sul trattamento dei dati personali e sulla privacy.
            </p>
          </div>
        </section>
      </SlideUp>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <SlideUp>
              <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                1. Titolare del Trattamento
              </h2>
              <p className="text-muted-foreground">
                Il titolare del trattamento dei dati personali è Visione Sostenibile S.r.l., 
                con sede in via del Verde, 123 - 00100 Roma (RM), P.IVA 12345678901.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                2. Dati Raccolti
              </h2>
              <p className="text-muted-foreground mb-4">
                Raccogliamo i seguenti dati personali:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Dati identificativi (nome, cognome)</li>
                <li>Dati di contatto (indirizzo email, numero di telefono)</li>
                <li>Dati forniti volontariamente tramite i form di contatto</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                3. Finalità del Trattamento
              </h2>
              <p className="text-muted-foreground mb-4">
                I dati personali sono trattati per le seguenti finalità:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Rispondere alle richieste di contatto</li>
                <li>Inviare preventivi e informazioni sui servizi</li>
                <li>Gestire le richieste di supporto</li>
                <li>Adempiere agli obblighi di legge</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                4. Base Giuridica
              </h2>
              <p className="text-muted-foreground">
                Il trattamento dei dati si basa sul consenso dell&apos;interessato (art. 6, par. 1, lett. a) 
                del GDPR) per le attività di marketing, e sull&apos;esecuzione di un contratto o di 
                misure precontrattuali (art. 6, par. 1, lett. b) del GDPR) per la risposta alle richieste.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                5. Conservazione dei Dati
              </h2>
              <p className="text-muted-foreground">
                I dati personali sono conservati per il tempo necessario al conseguimento delle 
                finalità per cui sono stati raccolti, o in conformità con gli obblighi di legge.
              </p>

              <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                6. Diritti dell&apos;Interessato
              </h2>
              <p className="text-muted-foreground mb-4">
                In qualità di interessato, hai il diritto di:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Accedere ai tuoi dati personali</li>
                <li>Richiedere la rettifica o la cancellazione degli stessi</li>
                <li>Richiedere la limitazione del trattamento</li>
                <li>Opporsi al trattamento</li>
                <li>Richiedere la portabilità dei dati</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-foreground mt-12 mb-4">
                7. Contatti
              </h2>
              <p className="text-muted-foreground">
                Per esercitare i tuoi diritti o per qualsiasi informazione sul trattamento dei dati, 
                puoi contattarci all&apos;indirizzo email: <strong>privacy@visionesostenibile.it</strong>
              </p>

              <p className="mt-12 text-sm text-muted-foreground">
                Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
              </p>
            </SlideUp>
          </div>
        </div>
      </section>

      <section className="py-20 bg-earth-100 dark:bg-earth-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <Card variant="elevated">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Hai Domande sulla Privacy?
                    </h3>
                    <p className="text-muted-foreground">
                      Il nostro team è a tua disposizione
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6">
                  <a href="mailto:privacy@visionesostenibile.it" className="flex items-center gap-2 text-primary-600 hover:underline">
                    <Mail className="w-5 h-5" />
                    privacy@visionesostenibile.it
                  </a>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-5 h-5" />
                    +39 06 1234567
                  </span>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
