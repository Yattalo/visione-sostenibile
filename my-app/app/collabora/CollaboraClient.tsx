"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import Link from "next/link";
import {
  Handshake,
  Leaf,
  Shield,
  TrendingUp,
  Users,
  Check,
  ChevronDown,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input, Textarea, Checkbox } from "../components/ui/Input";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "../components/animations";

/* ---------- Zod validation ---------- */

const partnerFormSchema = z.object({
  companyName: z.string().min(2, "Il nome azienda deve avere almeno 2 caratteri"),
  contactName: z.string().min(2, "Il nome referente deve avere almeno 2 caratteri"),
  email: z.string().email("Inserisci un indirizzo email valido"),
  phone: z.string().optional(),
  partnershipType: z.string().min(1, "Seleziona un tipo di collaborazione"),
  message: z.string().min(10, "Il messaggio deve avere almeno 10 caratteri"),
  privacyConsent: z.literal(true, { message: "Devi accettare l'informativa sulla privacy" }),
});

type FormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  partnershipType: string;
  message: string;
  privacyConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

/* ---------- Partnership types ---------- */

const partnershipTypes = [
  { value: "fornitore", label: "Fornitore" },
  { value: "subappaltatore", label: "Subappaltatore" },
  { value: "consulente", label: "Consulente" },
  { value: "altro", label: "Altro" },
];

/* ---------- Value propositions ---------- */

const valueProps = [
  {
    icon: Leaf,
    title: "Valori Condivisi",
    description:
      "Cerchiamo partner che credano nella sostenibilita e nel rispetto della natura. Chi lavora con noi condivide una visione, non solo un contratto.",
  },
  {
    icon: TrendingUp,
    title: "Crescita Reciproca",
    description:
      "Costruiamo relazioni durature: progetti stabili, pagamenti puntuali e un flusso di lavoro costante per chi dimostra affidabilita.",
  },
  {
    icon: Shield,
    title: "Qualita e Sicurezza",
    description:
      "Standard elevati su ogni cantiere: formazione condivisa, protocolli chiari e attenzione ai dettagli. Il nostro nome e anche il tuo.",
  },
  {
    icon: Users,
    title: "Rete Multidisciplinare",
    description:
      "Entri in una rete di specialisti verticali: dal tree climbing alla fitoiatria, dall'illuminazione all'ingegneria naturalistica.",
  },
];

/* ---------- Component ---------- */

export default function CollaboraClient() {
  const submitPartner = useMutation(api.partners.submit);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
    privacyConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = partnerFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof FormErrors;
        fieldErrors[fieldName] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitPartner({
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone || undefined,
        partnershipType: formData.partnershipType,
        message: formData.message,
        privacyConsent: true,
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Partner form submit failed:", error);
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setErrors({});
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      partnershipType: "",
      message: "",
      privacyConsent: false,
    });
  };

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-forest-950 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=40')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-forest-950/75 via-forest-900/55 to-forest-950/65" />
        </div>

        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-leaf-500/20 rounded-full blur-3xl animate-drift" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-8">
              <Badge className="bg-white/10 backdrop-blur-sm border border-white/15 text-paper-300 px-4 py-1.5 text-xs tracking-widest uppercase">
                Partnership
              </Badge>
              <Badge variant="eco" className="px-4 py-1.5 text-xs tracking-widest uppercase">
                <Handshake className="w-3 h-3 mr-1.5 inline" />
                Cresciamo Insieme
              </Badge>
            </div>
          </FadeIn>

          <SlideUp>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-paper-50 leading-tight max-w-4xl mb-8">
              COLLABORA CON{" "}
              <span className="block italic text-leaf-400">Noi</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.1}>
            <p className="font-body text-lg text-paper-300/80 max-w-2xl mb-6">
              Cerchiamo fornitori, subappaltatori e consulenti che condividano i
              nostri valori di sostenibilita e qualita.
            </p>
            <p className="font-body text-lg italic text-leaf-400 max-w-2xl mb-10">
              Non cerchiamo chi costa meno. Cerchiamo chi lavora meglio.
            </p>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <a href="#form-partner">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-6 py-3"
                >
                  <Handshake className="w-4 h-4 mr-2" />
                  Proponi una Collaborazione
                </Button>
              </a>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 lg:py-32 px-6 bg-paper-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-leaf-100/30 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SlideUp>
            <div className="text-center mb-20">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
                Perche collaborare con noi
              </span>
              <h2 className="text-stitch-heading text-3xl md:text-4xl lg:text-5xl text-forest-950 mt-4">
                UNA RETE CHE CRESCE CON{" "}
                <em className="italic font-normal text-leaf-600">Qualita</em>
              </h2>
              <p className="mt-6 text-lg text-forest-800 max-w-2xl mx-auto font-body">
                Non siamo solo un committente. Siamo un partner che investe
                nelle relazioni e nella crescita reciproca.
              </p>
            </div>
          </SlideUp>

          <StaggerContainer delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueProps.map((prop, index) => (
                <StaggerItem key={prop.title} delay={index * 0.1}>
                  <Card
                    variant="default"
                    className="h-full text-center border border-paper-100 bg-paper-50 hover:border-leaf-200 hover:shadow-soft hover:-translate-y-1.5 hover:shadow-floating transition-all duration-300"
                  >
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-leaf-100 flex items-center justify-center mx-auto mb-6">
                        <prop.icon className="w-8 h-8 text-leaf-700" />
                      </div>
                      <h3 className="font-display text-2xl text-forest-950 mb-1">
                        {prop.title}
                      </h3>
                      <p className="font-body text-forest-800/70 leading-relaxed mt-4">
                        {prop.description}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-20 md:py-28 px-6 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920')",
            }}
          />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-leaf-500/40 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <SlideUp>
            <Badge
              variant="eco"
              className="mb-8 bg-white/5 border-white/10 text-leaf-300"
            >
              <Users className="w-3 h-3 mr-1.5 inline" />
              Chi cerchiamo
            </Badge>
            <h2 className="text-stitch-heading text-3xl md:text-5xl text-paper-50 mb-8">
              PROFESSIONISTI CHE FANNO LA{" "}
              <em className="italic font-normal text-leaf-400">Differenza</em>
            </h2>
          </SlideUp>

          <SlideUp delay={0.15}>
            <div className="font-body text-lg md:text-xl text-paper-300/90 leading-relaxed max-w-3xl mx-auto space-y-6">
              <p>
                Cerchiamo <strong className="text-paper-100">fornitori di materiali</strong>{" "}
                naturali e sostenibili, <strong className="text-paper-100">subappaltatori</strong>{" "}
                specializzati in tree climbing, impianti elettrici per esterni e
                movimentazione terra.
              </p>
              <p>
                Cerchiamo anche <strong className="text-paper-100">consulenti</strong>{" "}
                in fitoiatria, ingegneria naturalistica, progettazione
                illuminotecnica e architettura del paesaggio.
              </p>
              <p>
                Se lavori bene, rispetti i tempi e condividi la nostra
                attenzione per la qualita, vogliamo conoscerti.
              </p>
            </div>
          </SlideUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { value: "Fornitori", label: "Materiali naturali" },
              { value: "Subappaltatori", label: "Competenze verticali" },
              { value: "Consulenti", label: "Expertise tecnica" },
              { value: "Partner", label: "Visione condivisa" },
            ].map((stat, index) => (
              <SlideUp key={stat.label} delay={0.2 + index * 0.08}>
                <div className="text-center">
                  <p className="font-display text-2xl md:text-3xl font-light text-leaf-400 mb-2">
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs uppercase tracking-widest text-paper-400">
                    {stat.label}
                  </p>
                </div>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section id="form-partner" className="py-28 md:py-36 px-6 bg-paper-canvas scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20">
            {/* Left Column: Info */}
            <SlideUp>
              <div className="space-y-12">
                <div>
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-forest-800/60 mb-4 block">
                    Proponi una collaborazione
                  </span>
                  <h2 className="text-stitch-heading text-3xl md:text-4xl lg:text-5xl text-forest-950">
                    RACCONTACI DI{" "}
                    <em className="italic font-normal text-leaf-600">Te</em>
                  </h2>
                  <p className="font-body text-lg text-forest-800/80 mt-6 leading-relaxed">
                    Compila il modulo e raccontaci chi sei, cosa fai e come
                    potremmo lavorare insieme. Ti ricontatteremo entro 48 ore
                    lavorative.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: "Cosa succede dopo?",
                      text: "Valutiamo ogni candidatura con attenzione. Se il profilo e in linea, organizziamo un incontro conoscitivo per capire come integrarti nella nostra rete.",
                    },
                    {
                      title: "Requisiti minimi",
                      text: "Partita IVA attiva, assicurazione professionale, referenze verificabili. Per subappaltatori: documentazione sicurezza e formazione aggiornata.",
                    },
                    {
                      title: "Zone operative",
                      text: "Operiamo principalmente in Piemonte, Trentino Alto-Adige e Lombardia. Cerchiamo partner attivi in queste aree geografiche.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="border border-paper-100 bg-paper-50 rounded-[30px] p-6 transition-all duration-300 hover:border-leaf-200 hover:shadow-soft"
                    >
                      <h3 className="font-display text-lg text-forest-950 mb-2">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-forest-800/70 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SlideUp>

            {/* Right Column: Form */}
            <SlideUp delay={0.2}>
              <Card className="bg-white shadow-floating border-paper-100 rounded-[40px] sticky top-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sun-400 to-leaf-500" />
                <CardContent className="p-8 md:p-12">
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-sun-500 block mb-4">
                    Modulo Partner
                  </span>
                  <h2 className="text-stitch-heading text-3xl md:text-4xl text-forest-950 mb-10">
                    INVIA LA TUA{" "}
                    <em className="italic font-normal text-leaf-600">
                      Candidatura
                    </em>
                  </h2>

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
                        Candidatura inviata
                      </h3>
                      <p className="font-body text-lg text-forest-800/70 leading-relaxed max-w-sm mx-auto">
                        Grazie per il tuo interesse. Valuteremo la tua
                        candidatura e ti ricontatteremo entro 48 ore lavorative.
                      </p>
                      <Button
                        variant="ghost"
                        onClick={resetForm}
                        className="mt-10 text-leaf-600 hover:text-leaf-700"
                      >
                        Invia un&apos;altra candidatura
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Input
                        label="Nome Azienda *"
                        placeholder="es. Verde Piemonte Srl"
                        value={formData.companyName}
                        onChange={(e) =>
                          updateField("companyName", e.target.value)
                        }
                        error={errors.companyName}
                        className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                      />

                      <Input
                        label="Nome Referente *"
                        placeholder="es. Mario Rossi"
                        value={formData.contactName}
                        onChange={(e) =>
                          updateField("contactName", e.target.value)
                        }
                        error={errors.contactName}
                        className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Input
                          label="Email *"
                          type="email"
                          placeholder="es. info@azienda.it"
                          value={formData.email}
                          onChange={(e) =>
                            updateField("email", e.target.value)
                          }
                          error={errors.email}
                          className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                        />

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
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="partnership-type-select"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Tipo di Collaborazione *
                        </label>
                        <div className="relative">
                          <select
                            id="partnership-type-select"
                            value={formData.partnershipType}
                            aria-invalid={
                              errors.partnershipType ? true : undefined
                            }
                            onChange={(e) =>
                              updateField("partnershipType", e.target.value)
                            }
                            className={`flex h-14 w-full rounded-xl border bg-paper-50/50 px-4 py-2 text-sm md:text-base ring-offset-background appearance-none cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                              errors.partnershipType
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-paper-200"
                            }`}
                          >
                            <option value="">
                              Seleziona il tipo di collaborazione...
                            </option>
                            {partnershipTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-800/40 pointer-events-none" />
                        </div>
                        {errors.partnershipType && (
                          <p className="mt-1.5 text-sm text-red-500">
                            {errors.partnershipType}
                          </p>
                        )}
                      </div>

                      <Textarea
                        label="Messaggio *"
                        placeholder="Raccontaci la tua azienda, le tue competenze e come pensi di poter collaborare con noi..."
                        value={formData.message}
                        onChange={(e) =>
                          updateField("message", e.target.value)
                        }
                        error={errors.message}
                        className="min-h-[160px] rounded-xl border-paper-200 bg-paper-50/50"
                      />

                      <Checkbox
                        checked={formData.privacyConsent}
                        onChange={(e) =>
                          updateField(
                            "privacyConsent",
                            (e.target as HTMLInputElement).checked
                          )
                        }
                        error={errors.privacyConsent}
                        label={
                          <>
                            Ho letto e accetto l&apos;
                            <Link
                              href="/privacy"
                              className="text-leaf-600 hover:text-leaf-700 underline"
                              target="_blank"
                            >
                              informativa sulla privacy
                            </Link>{" "}
                            *
                          </>
                        }
                      />

                      <p className="text-xs font-body text-forest-800/50 italic">
                        * Campi obbligatori. I dati inseriti verranno utilizzati
                        esclusivamente per valutare la collaborazione in
                        conformita con la normativa sulla Privacy.
                      </p>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          loading={isSubmitting}
                          className="w-full bg-sun-400 hover:bg-sun-500 text-forest-950 h-14 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Invia Candidatura
                        </Button>
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
              COSTRUIAMO QUALCOSA DI{" "}
              <em className="italic font-normal text-leaf-400">Grande</em>
            </h2>
            <p className="font-body text-xl text-paper-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Il futuro del verde si costruisce insieme. Se condividi i nostri
              valori di sostenibilita e qualita, iniziamo a parlarne.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#form-partner">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-12 py-5 text-xl tracking-wider font-bold rounded-2xl shadow-deep hover:scale-105 transition-transform"
                >
                  Proponi una collaborazione
                </Button>
              </a>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-paper-400/30 text-paper-100 hover:bg-paper-100/10 px-12 py-5 text-xl tracking-wider font-bold rounded-2xl"
                >
                  Contattaci direttamente
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-10 text-paper-400 text-micro">
              <span className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-leaf-400" />
                Rispondiamo entro 48 ore
              </span>
              <span className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-leaf-400" />
                Piemonte, Trentino Alto-Adige e Lombardia
              </span>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
