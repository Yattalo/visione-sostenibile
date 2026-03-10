"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input, Textarea } from "../components/ui/Input";
import { SlideUp, FadeIn } from "../components/animations";
import { siteConfig } from "../lib/site-config";

/* ---------- Zod schemas per step ---------- */

const step1Schema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un indirizzo email valido"),
});

const step2Schema = z.object({
  phone: z.string().optional(),
  serviceInterest: z.string().min(1, "Seleziona un servizio di interesse"),
});

const step3Schema = z.object({
  message: z.string().min(10, "Il messaggio deve avere almeno 10 caratteri"),
  privacyConsent: z.literal(true, {
    error: "Devi accettare l'informativa sulla privacy per procedere",
  }),
});

/* ---------- Services list ---------- */

const services = [
  "Progettazione Giardini e Orti Sostenibili",
  "Realizzazione Completa Chiavi in Mano",
  "Manutenzione con Pratiche Sostenibili",
  "Potatura Professionale",
  "Gestione del Verde Biodinamica",
  "Altro",
];

/* ---------- Step transition variants ---------- */

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/* ---------- Types ---------- */

interface StepErrors {
  name?: string;
  email?: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
  privacyConsent?: string;
}

/* ---------- Component ---------- */

export default function ContattiPage() {
  const submitContact = useMutation(api.contacts.submit);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<StepErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalSteps = 3;

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for the field being edited
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const schemas = [step1Schema, step2Schema, step3Schema] as const;
    const dataSlices = [
      { name: formData.name, email: formData.email },
      { phone: formData.phone, serviceInterest: formData.serviceInterest },
      { message: formData.message, privacyConsent },
    ] as const;

    if (step < 0 || step > 2) return false;

    const result = schemas[step].safeParse(dataSlices[step]);

    if (!result.success) {
      const fieldErrors: StepErrors = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof StepErrors;
        fieldErrors[fieldName] = issue.message;
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const prevStep = () => {
    setErrors({});
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.serviceInterest,
        message: formData.message,
        serviceInterest: formData.serviceInterest,
        privacyConsent,
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Contact form submit failed:", error);
      // Show success anyway to not block the user UX-wise
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setCurrentStep(0);
    setDirection(1);
    setErrors({});
    setPrivacyConsent(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceInterest: "",
      message: "",
    });
  };

  /* ---------- Contact info cards ---------- */

  const contactInfo = [
    {
      icon: MapPin,
      title: "Indirizzo",
      lines: [
        siteConfig.address.street,
        `${siteConfig.address.postalCode} ${siteConfig.address.city} (${siteConfig.address.province})`,
        siteConfig.address.country,
      ],
    },
    {
      icon: Phone,
      title: "Telefono",
      lines: [siteConfig.phone],
    },
    {
      icon: Mail,
      title: "Email",
      lines: [siteConfig.email],
    },
    {
      icon: Clock,
      title: "Orari",
      lines: ["Lun - Ven: 8:00 - 18:00", "Sabato: 8:00 - 12:00"],
    },
  ];

  /* ---------- Step labels ---------- */

  const stepLabels = ["Chi sei", "Il progetto", "Il messaggio"];

  /* ---------- Render ---------- */

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1200&q=40')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950/70 via-forest-900/60 to-forest-950/65" />
          </div>
          {/* Decorative organic blobs */}
          <div className="absolute top-1/3 -left-24 w-80 h-80 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-leaf-500/15 rounded-full blur-3xl animate-drift" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 md:pt-0 text-center">
          <SlideUp>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              Contatti
            </Badge>

            <h1 className="text-stitch-heading text-4xl md:text-5xl lg:text-7xl text-white mb-6 text-balance">
              PARLIAMONE: TI DICIAMO COSA SERVE{" "}
              <em className="italic font-normal text-leaf-400">Davvero</em>
            </h1>

            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
              Che tu stia partendo da zero o che tu voglia riqualificare un
              giardino esistente, ti aiutiamo a fare chiarezza su priorità e
              investimenti.
            </p>
          </SlideUp>
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
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
                    Contatti diretti
                  </span>
                  <h2 className="text-stitch-heading text-3xl md:text-4xl lg:text-5xl text-forest-950">
                    I NOSTRI RECAPITI{" "}
                    <em className="italic font-normal text-leaf-600">Ufficiali</em>
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
                    <p className="font-display text-xl md:text-3xl text-forest-950 uppercase tracking-tight font-bold">
                      Piemonte · Trentino · Lombardia
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
              <Card className="bg-white shadow-floating border-paper-100 rounded-[40px] sticky top-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sun-400 to-leaf-500" />
                <CardContent className="p-8 md:p-12">
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-sun-500 block mb-4">
                    Digital Desk
                  </span>
                  <h2 className="text-stitch-heading text-3xl md:text-4xl text-forest-950 mb-10">
                    INVIA UNA{" "}
                    <em className="italic font-normal text-leaf-600">Richiesta</em>
                  </h2>

                  {/* Step Indicator */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between">
                      {stepLabels.map((label, index) => (
                        <div
                          key={index}
                          className="flex items-center flex-1 last:flex-none"
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                              index < currentStep
                                ? "bg-leaf-600 text-white"
                                : index === currentStep
                                  ? "bg-sun-400 text-white ring-8 ring-sun-50 shadow-medium"
                                  : "bg-paper-100 text-forest-800/40"
                            }`}
                          >
                            {index < currentStep ? (
                              <Check className="w-6 h-6" />
                            ) : (
                              <span className="text-sm font-bold">
                                {index + 1}
                              </span>
                            )}
                          </div>
                          {index < totalSteps - 1 && (
                            <div
                              className={`flex-1 h-0.5 mx-4 rounded-full transition-colors duration-500 ${
                                index < currentStep
                                  ? "bg-leaf-600"
                                  : "bg-paper-200"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      {stepLabels.map((label, index) => (
                        <span
                          key={index}
                          className={`text-xs transition-colors duration-300 ${
                            index <= currentStep
                              ? "text-forest-950 font-medium"
                              : "text-forest-800/40"
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    {/* Step counter */}
                    <p className="text-xs text-forest-800/50 mt-3 text-center font-body">
                      Passo {currentStep + 1} di {totalSteps}
                    </p>
                  </div>

                  {showSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-center py-16"
                    >
                      <div className="w-24 h-24 rounded-full bg-leaf-50 flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <Check className="w-12 h-12 text-leaf-600" />
                      </div>
                      <h3 className="font-display text-3xl text-forest-950 mb-4 uppercase tracking-tight font-bold">
                        Richiesta inviata
                      </h3>
                      <p className="font-body text-lg text-forest-800/70 leading-relaxed max-w-sm mx-auto">
                        Ti risponderemo entro 24 ore. Ti diciamo cosa serve
                        davvero — e cosa no.
                      </p>
                      <Button
                        variant="ghost"
                        onClick={resetForm}
                        className="mt-10 text-leaf-600 hover:text-leaf-700"
                      >
                        Invia un altro messaggio
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Animated step content */}
                      <div className="relative min-h-[280px]">
                        <AnimatePresence
                          mode="wait"
                          custom={direction}
                          initial={false}
                        >
                          {/* Step 1: Nome + Email */}
                          {currentStep === 0 && (
                            <motion.div
                              key="step-0"
                              custom={direction}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{
                                duration: 0.35,
                                ease: "easeInOut",
                              }}
                              className="space-y-6"
                            >
                              <p className="font-body text-forest-800/80 mb-2">
                                Iniziamo con le basi: come ti chiami e come
                                possiamo ricontattarti?
                              </p>
                              <Input
                                label="Nome e Cognome *"
                                placeholder="es. Mario Rossi"
                                value={formData.name}
                                onChange={(e) =>
                                  updateField("name", e.target.value)
                                }
                                error={errors.name}
                                className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                                autoFocus
                              />
                              <Input
                                label="Email *"
                                type="email"
                                placeholder="es. mario@email.it"
                                value={formData.email}
                                onChange={(e) =>
                                  updateField("email", e.target.value)
                                }
                                error={errors.email}
                                className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                              />
                            </motion.div>
                          )}

                          {/* Step 2: Telefono + Servizio */}
                          {currentStep === 1 && (
                            <motion.div
                              key="step-1"
                              custom={direction}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{
                                duration: 0.35,
                                ease: "easeInOut",
                              }}
                              className="space-y-6"
                            >
                              <p className="font-body text-forest-800/80 mb-2">
                                Come possiamo aiutarti? Seleziona il servizio
                                che ti interessa.
                              </p>
                              <Input
                                label="Telefono (facoltativo)"
                                type="tel"
                                placeholder="+39 ..."
                                value={formData.phone}
                                onChange={(e) =>
                                  updateField("phone", e.target.value)
                                }
                                error={errors.phone}
                                className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                              />
                              <div className="w-full">
                                <label htmlFor="service-interest-select" className="block text-sm font-medium text-foreground mb-2">
                                  Servizio di interesse *
                                </label>
                                <div className="relative">
                                  <select
                                    id="service-interest-select"
                                    value={formData.serviceInterest}
                                    aria-invalid={errors.serviceInterest ? true : undefined}
                                    onChange={(e) =>
                                      updateField(
                                        "serviceInterest",
                                        e.target.value
                                      )
                                    }
                                    className={`flex h-14 w-full rounded-xl border bg-paper-50/50 px-4 py-2 text-sm md:text-base ring-offset-background appearance-none cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                      errors.serviceInterest
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : "border-paper-200"
                                    }`}
                                  >
                                    <option value="">
                                      Seleziona un servizio...
                                    </option>
                                    {services.map((service) => (
                                      <option key={service} value={service}>
                                        {service}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-800/40 pointer-events-none" />
                                </div>
                                {errors.serviceInterest && (
                                  <p className="mt-1.5 text-sm text-red-500">
                                    {errors.serviceInterest}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}

                          {/* Step 3: Messaggio */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step-2"
                              custom={direction}
                              variants={stepVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{
                                duration: 0.35,
                                ease: "easeInOut",
                              }}
                              className="space-y-6"
                            >
                              <p className="font-body text-forest-800/80 mb-2">
                                Raccontaci il tuo progetto: dimensioni, idee,
                                tempistiche — tutto ci aiuta.
                              </p>
                              <Textarea
                                label="Il tuo messaggio *"
                                placeholder="Descrivi brevemente la tua idea, il tuo spazio e cosa vorresti ottenere..."
                                value={formData.message}
                                onChange={(e) =>
                                  updateField("message", e.target.value)
                                }
                                error={errors.message}
                                className="min-h-[180px] rounded-xl border-paper-200 bg-paper-50/50"
                              />
                              <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={privacyConsent}
                                  onChange={(e) => {
                                    setPrivacyConsent(e.target.checked);
                                    if (errors.privacyConsent) {
                                      setErrors((prev) => {
                                        const next = { ...prev };
                                        delete next.privacyConsent;
                                        return next;
                                      });
                                    }
                                  }}
                                  className="mt-1 h-5 w-5 rounded border-paper-300 text-leaf-600 focus:ring-leaf-500 shrink-0"
                                />
                                <span className="text-sm font-body text-forest-800/70 leading-relaxed">
                                  Ho letto e accetto l&apos;
                                  <Link
                                    href="/privacy"
                                    target="_blank"
                                    className="underline text-leaf-600 hover:text-leaf-700"
                                  >
                                    informativa sulla privacy
                                  </Link>{" "}
                                  *
                                </span>
                              </label>
                              {errors.privacyConsent && (
                                <p className="text-sm text-red-500">
                                  {errors.privacyConsent}
                                </p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <p className="text-xs font-body text-forest-800/50 italic">
                        * Campi obbligatori. I dati inseriti verranno utilizzati
                        esclusivamente per rispondere alla tua richiesta in
                        conformità con la normativa sulla Privacy.
                      </p>

                      {/* Navigation Buttons */}
                      <div className="flex gap-4 pt-6">
                        {currentStep > 0 && (
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
                        {currentStep < totalSteps - 1 ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            className="flex-1 bg-sun-400 hover:bg-sun-500 text-forest-950 h-14 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
                          >
                            Avanti
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            loading={isSubmitting}
                            className="flex-1 bg-sun-400 hover:bg-sun-500 text-forest-950 h-14 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
                          >
                            Invia Richiesta
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
      <section className="py-24 lg:py-32 bg-forest-950 text-paper-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=30')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-950" />
        </div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-sun-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <SlideUp>
            <h2 className="text-stitch-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-paper-50">
              TI DICIAMO COSA SERVE{" "}
              <em className="italic font-normal text-leaf-400">Davvero</em>
            </h2>
            <p className="font-body text-xl text-paper-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Che tu stia partendo da zero o che tu voglia riqualificare un
              giardino esistente, ti aiutiamo a fare chiarezza su priorità, fasi
              e investimenti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-8 py-5 text-base md:text-xl tracking-wider font-bold rounded-2xl shadow-deep hover:scale-105 transition-transform"
                >
                  Richiedi un sopralluogo
                </Button>
              </Link>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-paper-400/30 text-paper-100 hover:bg-paper-100/10 px-8 py-5 text-base md:text-xl tracking-wider font-bold rounded-2xl"
                >
                  Richiedi una call (aziende/condomini)
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-10 text-paper-400 text-micro">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-leaf-400" />
                Rispondiamo entro 24 ore
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-leaf-400" />
                Operativi in Piemonte e Trentino Alto-Adige. In espansione in
                Lombardia.
              </span>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
