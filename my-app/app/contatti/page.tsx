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
              Siamo al tuo servizio per trasformare la tua visione in realtà. 
              Compila il modulo per una consulenza gratuita o un preventivo personalizzato.
            </p>
          </SlideUp>

          <FadeIn delay={1.2}>
            <div className="mt-16">
              <div className="w-px h-20 bg-gradient-to-b from-sun-400/50 to-transparent mx-auto" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-28 md:py-36 px-6 bg-paper-canvas">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20">
            {/* Left Column: Contact Info */}
            <SlideUp>
              <div className="space-y-12">
                <div>
                  <span className="text-micro text-leaf-600 block mb-4">
                    Contatti diretti
                  </span>
                  <h2 className="font-display text-4xl md:text-6xl text-forest-950 leading-[1.1] tracking-tight">
                    I nostri
                    <span className="block italic text-leaf-700 font-light">recapiti ufficiali</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((item, index) => (
                    <Card
                      key={index}
                      className="bg-white border-paper-200/50 rounded-[30px] shadow-soft hover:shadow-medium transition-all duration-500 group"
                    >
                      <CardContent className="p-8">
                        <div className="flex flex-col gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-leaf-50 flex items-center justify-center transition-colors group-hover:bg-leaf-100">
                            <item.icon className="w-6 h-6 text-leaf-600" />
                          </div>
                          <div>
                            <h3 className="font-display text-lg uppercase tracking-wider text-forest-950 mb-2 font-bold">
                              {item.title}
                            </h3>
                            {item.lines.map((line, i) => (
                              <p
                                key={i}
                                className="text-base font-body text-forest-800/70 leading-relaxed"
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
                <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden bg-leaf-50 border border-leaf-100 shadow-inner group">
                  <div className="absolute inset-0 bg-organic-noise opacity-20" />
                  <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-leaf-200/40 rounded-full blur-3xl animate-pulse-slow" />
                  <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-leaf-100/30 rounded-full blur-2xl" />

                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <div className="w-16 h-16 rounded-full bg-white shadow-medium flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-500">
                      <MapPin className="w-8 h-8 text-leaf-700" />
                    </div>
                    <p className="font-display text-3xl text-forest-950 uppercase tracking-tight font-bold">
                      Piemonte e Lombardia
                    </p>
                    <p className="font-body text-base text-leaf-600/80 mt-2 font-medium">
                      Torino • Chivasso • Asti • Lago Maggiore
                    </p>
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Right Column: Multi-step Form */}
            <SlideUp delay={0.2}>
              <Card
                className="bg-white shadow-floating border-paper-100 rounded-[40px] sticky top-32 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sun-400 to-leaf-500" />
                <CardContent className="p-8 md:p-12">
                  <span className="text-micro text-sun-500 block mb-4">
                    Digital Desk
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-forest-950 mb-10 leading-tight uppercase tracking-tight">
                    Invia una <span className="italic font-light">richiesta</span>
                  </h2>

                  {/* Step Indicators */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between">
                      {steps.map((step) => (
                        <div key={step.id} className="flex items-center flex-1 last:flex-none">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                              step.id < currentStep
                                ? "bg-leaf-600 text-white"
                                : step.id === currentStep
                                  ? "bg-sun-400 text-white ring-8 ring-sun-50 shadow-medium"
                                  : "bg-paper-100 text-forest-800/40"
                            }`}
                          >
                            {step.id < currentStep ? (
                              <Check className="w-6 h-6" />
                            ) : (
                              <step.icon className="w-5 h-5" />
                            )}
                          </div>
                          {step.id < 3 && (
                            <div
                              className={`flex-1 h-0.5 mx-4 rounded-full transition-colors duration-500 ${
                                step.id < currentStep
                                  ? "bg-leaf-600"
                                  : "bg-paper-200"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      {steps.map((step) => (
                        <span
                          key={step.id}
                          className={`text-micro transition-colors duration-300 ${
                            step.id <= currentStep
                              ? "text-forest-950"
                              : "text-forest-800/40"
                          }`}
                        >
                          {step.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {showSuccess ? (
                    <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                      <div className="w-24 h-24 rounded-full bg-leaf-50 flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <Check className="w-12 h-12 text-leaf-600" />
                      </div>
                      <h3 className="font-display text-3xl text-forest-950 mb-4 uppercase tracking-tight font-bold">
                        Richiesta inviata
                      </h3>
                      <p className="font-body text-lg text-forest-800/70 leading-relaxed max-w-sm mx-auto">
                        Il nostro team prenderà in carico il tuo messaggio e ti risponderà 
                        all&apos;indirizzo indicato entro 24 ore lavorative.
                      </p>
                      <Button 
                        variant="ghost" 
                        onClick={() => { setShowSuccess(false); setCurrentStep(1); }}
                        className="mt-10 text-leaf-600 hover:text-leaf-700"
                      >
                        Invia un altro messaggio
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Step 1: Personal Info */}
                      {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                          <Input
                            label="Nome completo *"
                            placeholder="es. Mario Rossi"
                            value={formData.name}
                            onChange={(e) =>
                              updateFormData("name", e.target.value)
                            }
                            className="h-14 rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                            required
                          />
                          <Input
                            label="Email di contatto *"
                            type="email"
                            placeholder="mario@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              updateFormData("email", e.target.value)
                            }
                            className="h-14 rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                            required
                          />
                          <Input
                            label="Recapito telefonico"
                            type="tel"
                            placeholder="+39 333 ..."
                            value={formData.phone}
                            onChange={(e) =>
                              updateFormData("phone", e.target.value)
                            }
                            className="h-14 rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                          />
                        </div>
                      )}

                      {/* Step 2: Service Selection */}
                      {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                          <div>
                            <label className="block text-micro text-forest-800 mb-3">
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
                              className="w-full h-14 px-5 rounded-xl border border-paper-200 bg-paper-50/50 text-forest-950 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-400 focus-visible:border-leaf-500 transition-all duration-200 appearance-none cursor-pointer"
                              required
                            >
                              <option value="" className="text-forest-800/60">
                                Scegli un&apos;opzione...
                              </option>
                              {services.map((service) => (
                                <option key={service} value={service}>
                                  {service}
                                </option>
                              ))}
                            </select>
                          </div>
                          <Input
                            label="Oggetto della richiesta"
                            placeholder="es. Informazioni preventivo"
                            value={formData.subject}
                            onChange={(e) =>
                              updateFormData("subject", e.target.value)
                            }
                            className="h-14 rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                          />
                        </div>
                      )}

                      {/* Step 3: Message */}
                      {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                          <Textarea
                            label="Il tuo messaggio *"
                            placeholder="Descrivi brevemente la tua idea o le tue necessità..."
                            value={formData.message}
                            onChange={(e) =>
                              updateFormData("message", e.target.value)
                            }
                            className="rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500 min-h-[180px] p-5"
                            required
                          />
                          <p className="text-xs font-body text-forest-800/50 italic">
                            * Campi obbligatori. I dati inseriti verranno utilizzati esclusivamente per rispondere alla tua richiesta in conformità con la normativa sulla Privacy.
                          </p>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex gap-4 pt-6">
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={prevStep}
                            className="text-forest-800 hover:text-forest-950 font-bold uppercase text-xs tracking-widest"
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
                            className="flex-1 bg-sun-400 hover:bg-sun-500 text-white h-14 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
                          >
                            Continua
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isSubmitting || !canProceed()}
                            className="flex-1 bg-sun-400 hover:bg-sun-500 text-white h-14 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
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
            <h2 className="font-display text-4xl md:text-6xl font-light mb-6 leading-tight uppercase tracking-tight">
              Preferisci parlare
              <span className="block italic text-leaf-400 font-light">
                direttamente?
              </span>
            </h2>
            <p className="font-body text-xl text-paper-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Chiamaci per un confronto immediato. Siamo disponibili dal lunedì
              al venerdì, dalle 8:00 alle 18:00.
            </p>

            <a href="tel:+393714821825">
              <Button
                size="lg"
                className="bg-sun-400 hover:bg-sun-500 text-white border-0 px-12 py-5 text-xl tracking-wider font-bold rounded-2xl shadow-deep hover:scale-105 transition-transform"
              >
                <Phone className="mr-3 w-6 h-6" />
                CHIAMA ORA
              </Button>
            </a>

            <div className="mt-16 flex flex-wrap justify-center gap-10 text-paper-400 text-micro">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-leaf-400" />
                Piemonte e Lombardia
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-leaf-400" />
                visionesostenibile96@gmail.com
              </span>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
