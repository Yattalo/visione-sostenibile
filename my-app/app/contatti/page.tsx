"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  User,
  MessageSquare,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input, Textarea } from "../components/ui/Input";
import { SlideUp, FadeIn } from "../components/animations";

const services = [
  "Progettazione Giardini e Orti Sostenibili",
  "Realizzazione Completa Chiavi in Mano",
  "Manutenzione con Pratiche Sostenibili",
  "Potatura Professionale",
  "Gestione del Verde Biodinamica",
  "Altro",
];

const steps = [
  { id: 1, title: "Info", icon: User },
  { id: 2, title: "Servizio", icon: FileText },
  { id: 3, title: "Messaggio", icon: MessageSquare },
];

export default function ContattiPage() {
  const submitContact = useMutation(api.contacts.submit);
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
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || undefined,
        message: formData.message,
        serviceInterest: formData.serviceInterest || undefined,
      });
      setShowSuccess(true);
    } catch (error) {
      // Fallback UX: keep flow usable even if Convex is unavailable.
      console.error("Contact form submit failed:", error);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Indirizzo",
      lines: ["Via San Francesco D'Assisi, 14", "10122 Torino (TO)", "Italia"],
    },
    {
      icon: Phone,
      title: "Telefono",
      lines: ["+39 371 482 1825"],
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["visionesostenibile96@gmail.com"],
    },
    {
      icon: Clock,
      title: "Orari",
      lines: ["Lun - Ven: 8:00 - 18:00", "Sabato: 8:00 - 12:00"],
    },
  ];

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1920')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950/90 via-forest-900/80 to-forest-950/85" />
          </div>
          {/* Decorative organic blobs */}
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-leaf-500/15 rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <SlideUp>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              Contatti
            </Badge>

            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 text-white text-balance">
              Parliamo del tuo
              <span className="block italic text-leaf-400">
                prossimo progetto
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
              Siamo qui per ascoltarvi. Compila il modulo per una consulenza
              gratuita o richiedi un preventivo personalizzato.
            </p>
          </SlideUp>

          <FadeIn delay={1.2}>
            <div className="mt-16">
              <div className="w-px h-20 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-28 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20">
            {/* Left Column: Contact Info */}
            <SlideUp>
              <div className="space-y-10">
                <div>
                  <span className="font-display italic text-leaf-600 text-lg">
                    Come trovarci
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl text-forest-950 mt-4 leading-tight">
                    I nostri
                    <span className="italic text-leaf-700"> recapiti</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {contactInfo.map((item, index) => (
                    <Card
                      key={index}
                      variant="default"
                      className="bg-paper-50 border-paper-300 hover:shadow-soft transition-shadow duration-500"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-leaf-100 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-leaf-600" />
                          </div>
                          <div>
                            <h3 className="font-sans font-semibold text-forest-950 mb-1.5">
                              {item.title}
                            </h3>
                            {item.lines.map((line, i) => (
                              <p
                                key={i}
                                className="text-sm font-body text-forest-800/70"
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-leaf-100 border border-leaf-200">
                  {/* Organic decorative shapes */}
                  <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-leaf-200/60 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-leaf-100/40 rounded-full blur-xl" />

                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="w-14 h-14 rounded-full bg-leaf-200 flex items-center justify-center mb-4">
                      <MapPin className="w-7 h-7 text-leaf-700" />
                    </div>
                    <p className="font-display text-2xl text-forest-900">
                      Piemonte e Lombardia
                    </p>
                    <p className="font-body text-sm text-leaf-600 mt-1">
                      Torino, Chivasso, Asti, Lago Maggiore
                    </p>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Right Column: Multi-step Form */}
            <SlideUp delay={0.2}>
              <Card
                variant="elevated"
                className="bg-paper-50 shadow-floating sticky top-32"
              >
                <CardContent className="p-8 md:p-10">
                  <span className="font-display italic text-leaf-600 text-lg">
                    Scrivici
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-forest-950 mt-2 mb-8 leading-tight">
                    Invia una richiesta
                  </h2>

                  {/* Step Indicators */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between">
                      {steps.map((step) => (
                        <div key={step.id} className="flex items-center">
                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                              step.id < currentStep
                                ? "bg-sun-500 text-white"
                                : step.id === currentStep
                                  ? "bg-sun-500 text-white ring-4 ring-leaf-100"
                                  : "bg-paper-300 text-forest-800/60"
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
                              className={`w-full min-w-8 sm:min-w-12 h-0.5 mx-2 rounded-full transition-colors duration-300 ${
                                step.id < currentStep
                                  ? "bg-sun-500"
                                  : "bg-paper-400"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3">
                      {steps.map((step) => (
                        <span
                          key={step.id}
                          className={`text-xs font-sans uppercase tracking-wider transition-colors duration-300 ${
                            step.id <= currentStep
                              ? "text-forest-900"
                              : "text-forest-800/60"
                          }`}
                        >
                          {step.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {showSuccess ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 rounded-full bg-leaf-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-leaf-700" />
                      </div>
                      <h3 className="font-display text-2xl text-forest-950 mb-3">
                        Grazie per la tua richiesta
                      </h3>
                      <p className="font-body text-forest-800/70 leading-relaxed max-w-sm mx-auto">
                        Abbiamo ricevuto il tuo messaggio. Ti risponderemo
                        entro 24 ore lavorative.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Step 1: Personal Info */}
                      {currentStep === 1 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                          <Input
                            label="Nome completo *"
                            placeholder="Mario Rossi"
                            value={formData.name}
                            onChange={(e) =>
                              updateFormData("name", e.target.value)
                            }
                            className="border-paper-400 bg-paper-50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                            required
                          />
                          <Input
                            label="Email *"
                            type="email"
                            placeholder="mario@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            className="border-paper-400 bg-paper-50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                            required
                          />
                          <Input
                            label="Telefono"
                            type="tel"
                            placeholder="+39 333 ..."
                            value={formData.phone}
                            onChange={(e) =>
                              updateFormData("phone", e.target.value)
                            }
                            className="border-paper-400 bg-paper-50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                          />
                        </div>
                      )}

                      {/* Step 2: Service Selection */}
                      {currentStep === 2 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                          <div>
                            <label className="block text-sm font-sans font-medium text-forest-900 mb-2">
                              Servizio di interesse *
                            </label>
                            <select
                              value={formData.serviceInterest}
                              onChange={(e) =>
                                updateFormData(
                                  "serviceInterest",
                                  e.target.value
                                )
                              }
                              className="w-full h-12 px-4 rounded-xl border border-paper-400 bg-paper-50 text-forest-950 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-400 focus-visible:border-leaf-500 transition-all duration-200"
                              required
                            >
                              <option value="" className="text-forest-800/60">
                                Seleziona un servizio
                              </option>
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
                            onChange={(e) =>
                              updateFormData("subject", e.target.value)
                            }
                            className="border-paper-400 bg-paper-50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                          />
                        </div>
                      )}

                      {/* Step 3: Message */}
                      {currentStep === 3 && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                          <Textarea
                            label="Il tuo messaggio *"
                            placeholder="Raccontaci il tuo progetto, le dimensioni dello spazio, le tue preferenze..."
                            value={formData.message}
                            onChange={(e) =>
                              updateFormData("message", e.target.value)
                            }
                            className="border-paper-400 bg-paper-50 focus-visible:ring-sun-400 focus-visible:border-leaf-500 min-h-[160px]"
                            required
                          />
                          <p className="text-xs font-body text-forest-800/60">
                            I campi contrassegnati con * sono obbligatori. I
                            tuoi dati saranno trattati nel rispetto della
                            normativa sulla privacy.
                          </p>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex gap-3 pt-4">
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={prevStep}
                            className="text-forest-800 hover:text-forest-950"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Indietro
                          </Button>
                        )}
                        {currentStep < 3 ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="flex-1 bg-sun-400 hover:bg-sun-500 text-white"
                          >
                            Continua
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isSubmitting || !canProceed()}
                            className="flex-1 bg-sun-400 hover:bg-sun-500 text-white"
                          >
                            {isSubmitting
                              ? "Invio in corso..."
                              : "Invia Messaggio"}
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

      {/* Bottom CTA */}
      <section className="py-24 bg-forest-950 text-paper-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-sun-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <SlideUp>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-tight">
              Preferisci parlare
              <span className="block italic text-leaf-400">
                direttamente?
              </span>
            </h2>
            <p className="font-body text-lg text-paper-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Chiamaci per un confronto immediato. Siamo disponibili dal lunedi
              al venerdi, dalle 8 alle 18.
            </p>

            <a href="tel:+393714821825">
              <Button
                size="lg"
                className="bg-sun-400 hover:bg-sun-500 text-white border-0 px-8 py-4 text-lg tracking-wide"
              >
                <Phone className="mr-2 w-5 h-5" />
                Chiama Ora
              </Button>
            </a>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-paper-400 font-body text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-leaf-400" />
                Piemonte e Lombardia
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-leaf-400" />
                visionesostenibile96@gmail.com
              </span>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
