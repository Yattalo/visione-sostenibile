"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, Check, User, MessageSquare, FileText } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input, Textarea } from "../components/ui/Input";
import { SlideUp } from "../components/animations";

const services = [
  "Progettazione Giardini",
  "Realizzazione Giardini",
  "Scelta Piante",
  "Trattamenti Piante",
  "Impianti Irrigazione",
  "Camminamenti in Pietra",
  "Illuminazione Esterni",
  "Ingegneria Naturalistica",
  "Arredamento Esterni",
  "Potature",
  "Rigenerazione Terreni",
  "Manutenzioni",
  "Altro",
];

const steps = [
  { id: 1, title: "Informazioni", icon: User },
  { id: 2, title: "Servizio", icon: FileText },
  { id: 3, title: "Messaggio", icon: MessageSquare },
];

export default function ContattiPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterest: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.serviceInterest;
      case 3:
        return formData.message;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Indirizzo",
      lines: ["Via del Verde, 123", "00100 Roma (RM)", "Italia"],
    },
    {
      icon: Phone,
      title: "Telefono",
      lines: ["+39 06 1234567", "+39 333 1234567"],
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["info@visionesostenibile.it", "preventivi@visionesostenibile.it"],
    },
    {
      icon: Clock,
      title: "Orari",
      lines: ["Lun - Ven: 8:00 - 18:00", "Sabato: 8:00 - 12:00"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-earth-50 to-white py-24">
      <SlideUp>
        <section className="bg-earth-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge variant="primary" className="mb-4">
              Contatti
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Contattaci
            </h1>
            <p className="text-xl text-earth-200 max-w-3xl">
              Siamo qui per aiutarti. Compila il modulo per una consulenza gratuita
              o richiedi un preventivo personalizzato.
            </p>
          </div>
        </section>
      </SlideUp>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <SlideUp>
              <div className="space-y-8">
                <Badge variant="earth" className="mb-4">
                  Informazioni
                </Badge>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  I Nostri Contatti
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((item, index) => (
                    <Card key={index} variant="outline">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              {item.title}
                            </h3>
                            {item.lines.map((line, i) => (
                              <p key={i} className="text-sm text-muted-foreground">
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="aspect-[21/9] bg-gradient-to-br from-primary-100 to-earth-100 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🗺️</span>
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.2}>
              <Card variant="elevated">
                <CardContent className="p-8">
                  <Badge variant="primary" className="mb-4">
                    Invia Richiesta
                  </Badge>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Compila il Modulo
                  </h2>

                  <div className="mb-8">
                    <div className="flex items-center justify-between">
                      {steps.map((step) => (
                        <div key={step.id} className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              step.id < currentStep
                                ? "bg-primary-600 text-white"
                                : step.id === currentStep
                                ? "bg-primary-600 text-white ring-4 ring-primary-100"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {step.id < currentStep ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <step.icon className="w-5 h-5" />
                            )}
                          </div>
                          {step.id < 3 && (
                            <div
                              className={`w-12 h-1 mx-2 rounded ${
                                step.id < currentStep
                                  ? "bg-primary-600"
                                  : "bg-muted"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Info</span>
                      <span>Servizio</span>
                      <span>Messaggio</span>
                    </div>
                  </div>

                  {showSuccess ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2">
                        Grazie per la tua richiesta!
                      </h3>
                      <p className="text-muted-foreground">
                        Ti risponderemo al più presto.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {currentStep === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                          <Input
                            label="Nome *"
                            placeholder="Il tuo nome completo"
                            value={formData.name}
                            onChange={(e) => updateFormData("name", e.target.value)}
                            required
                          />
                          <Input
                            label="Email *"
                            type="email"
                            placeholder="tua@email.com"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            required
                          />
                          <Input
                            label="Telefono"
                            type="tel"
                            placeholder="+39 ..."
                            value={formData.phone}
                            onChange={(e) => updateFormData("phone", e.target.value)}
                          />
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Servizio di Interesse *
                            </label>
                            <select
                              value={formData.serviceInterest}
                              onChange={(e) => updateFormData("serviceInterest", e.target.value)}
                              className="w-full h-12 px-4 rounded-xl border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              required
                            >
                              <option value="">Seleziona un servizio</option>
                              {services.map((service) => (
                                <option key={service} value={service}>
                                  {service}
                                </option>
                              ))}
                            </select>
                          </div>
                          <Input
                            label="Oggetto"
                            placeholder="Richiesta informazioni"
                            value={formData.subject}
                            onChange={(e) => updateFormData("subject", e.target.value)}
                          />
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                          <Textarea
                            label="Messaggio *"
                            placeholder="Descrivi la tua richiesta in dettaglio..."
                            value={formData.message}
                            onChange={(e) => updateFormData("message", e.target.value)}
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            I campi contrassegnati con * sono obbligatori.
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                          >
                            Indietro
                          </Button>
                        )}
                        {currentStep < 3 ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="flex-1"
                          >
                            Continua
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isSubmitting || !canProceed()}
                            className="flex-1"
                          >
                            {isSubmitting ? "Invio..." : "Invia Messaggio"}
                          </Button>
                        )}
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </SlideUp>
          </div>
        </div>
      </section>
    </div>
  );
}
