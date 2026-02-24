"use client";

import { useState, useRef, useCallback } from "react";
import { useMutation } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import Link from "next/link";
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
  Home,
  Calendar,
  Star,
  Upload,
  X,
  File,
  Building2,
  Briefcase,
  Layers,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input, Textarea, Checkbox, RadioGroup, CheckboxGroup } from "../components/ui/Input";
import { SlideUp, FadeIn } from "../components/animations";

interface UploadedFile {
  storageId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  previewUrl?: string;
}

const services = [
  "Progettazione Giardini e Orti Sostenibili",
  "Realizzazione Completa Chiavi in Mano",
  "Manutenzione con Pratiche Sostenibili",
  "Potatura Professionale",
  "Gestione del Verde Biodinamica",
  "Altro",
];

const projectTypeOptions = [
  { value: "nuova_costruzione", label: "Nuova Costruzione" },
  { value: "restyling", label: "Restyling" },
];

const projectFeatureOptions = [
  { value: "piscina", label: "Piscina" },
  { value: "strutture_ombreggianti", label: "Strutture Ombreggianti" },
  { value: "giochi_acqua", label: "Giochi d'acqua" },
  { value: "altre_opere", label: "Altre opere architettoniche" },
];

const referralOptions = [
  { value: "google", label: "Google" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "passaparola", label: "Passaparola" },
  { value: "gia_cliente", label: "Sono già cliente" },
  { value: "altro", label: "Altro" },
];

const countries = [
  "Italia",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua e Barbuda", "Arabia Saudita", "Argentina", "Armenia", "Australia", "Austria", "Azerbaigian",
  "Bahamas", "Bahrein", "Bangladesh", "Barbados", "Belgio", "Belize", "Benin", "Bhutan", "Bielorussia", "Bolivia", "Bosnia Erzegovina", "Botswana", "Brasile", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambogia", "Camerun", "Canada", "Capo Verde", "Ciad", "Cile", "Cina", "Cipro", "Colombia", "Comore", "Corea del Nord", "Corea del Sud", "Costa Rica", "Costa d'Avorio", "Croazia", "Cuba",
  "Danimarca", "Dominicana",
  "Ecuador", "Egitto", "El Salvador", "Emirati Arabi Uniti", "Eritrea", "Estonia", "Etiopia",
  "Figi", "Filippine", "Finlandia", "Francia",
  "Gabon", "Gambia", "Georgia", "Germania", "Ghana", "Giamaica", "Giappone", "Gibuti", "Giordania", "Grecia", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guinea Equatoriale", "Guyana",
  "Haiti", "Honduras",
  "India", "Indonesia", "Iran", "Iraq", "Irlanda", "Islanda", "Isole Cook", "Isole Marshall", "Isole Salomon", "Israele",
  "Kazakistan", "Kenya", "Kirghizistan", "Kiribati", "Kuwait",
  "Laos", "Lesotho", "Lettonia", "Libano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Lussemburgo",
  "Macedonia del Nord", "Madagascar", "Malawi", "Maldive", "Malesia", "Mali", "Malta", "Marocco", "Mauritania", "Messico", "Micronesia", "Moldavia", "Monaco", "Mongolia", "Montenegro", "Mozambico", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Nicaragua", "Niger", "Nigeria", "Norvegia", "Nuova Zelanda",
  "Oman", "Paesi Bassi", "Pakistan", "Palau", "Panama", "Papua Nuova Guinea", "Paraguay", "Perù", "Polonia", "Portogallo",
  "Qatar",
  "Regno Unito", "Repubblica Centrafricana", "Repubblica Ceca", "Repubblica Democratica del Congo", "Repubblica di Congo", "Repubblica Dominicana", "Romania", "Ruanda", "Russia",
  "Saint Kitts e Nevis", "Saint Lucia", "Saint Vincent e Grenadine", "Salvador", "Samoa", "San Marino", "Santa Sede", "São Tomé e Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Siria", "Slovacchia", "Slovenia", "Somalia", "Spagna", "Sri Lanka", "Stati Uniti", "Sud Africa", "Sudan", "Sud Sudan", "Svezia", "Svizzera",
  "Tagikistan", "Taiwan", "Tanzania", "Thailandia", "Timor Est", "Togo", "Trinidad e Tobago", "Tunisia", "Turchia", "Turkmenistan", "Tuvalu",
  "Uganda", "Ucraina", "Ungheria", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe",
];

const steps = [
  { id: 0, title: "Tipo", icon: User },
  { id: 1, title: "Info", icon: User },
  { id: 2, title: "Dettagli", icon: Home },
  { id: 3, title: "Richiesta", icon: MessageSquare },
  { id: 4, title: "Referente", icon: Sparkles },
];

const teamData = [
  { name: "Andrea Giordano", title: "Fondatore", role: "Progettazione e direzione lavori", image: "/images/team/andrea.jpg" },
  { name: "Bogdan", title: "Tree Climbing", role: "Abbattimenti e potature in quota", image: "/images/team/bogdan.jpg" },
  { name: "Daniele", title: "Dottore Forestale", role: "Analisi fitosanitaria e forestale", image: "/images/team/daniele.jpg" },
  { name: "Moreno", title: "Fitoiatra", role: "Entomologia e cura piante", image: "/images/team/moreno.jpg" },
  { name: "Besnik", title: "Allestimento Verde", role: "Realizzazione giardini e irrigazione", image: "/images/team/besnik.jpg" },
  { name: "Michele", title: "Posa Prato", role: "Specialista prato sintetico", image: "/images/team/michele.avif" },
  { name: "Nicolò", title: "Terrazzi e Attici", role: "Specialista spazi pensili", image: "/images/team/nicolo.jpg" },
  { name: "Agi", title: "Manutenzione", role: "Cura periodica e potature siepi", image: "/images/team/agi.jpg" },
  { name: "Flavio", title: "Antizanzare", role: "Impianti antizanzare omologati", image: "/images/team/flavio.jpg" },
  { name: "Danilo", title: "Robot Tagliaerba", role: "Automazione e assistenza", image: "/images/team/danilo.jpg" },
  { name: "Francesca", title: "Floral Designer", role: "Arredamento floreale", image: "/images/team/francesca.jpg" },
  { name: "Paolo e Dario", title: "Illuminazione", role: "Luci da esterno", image: "/images/team/paolo-dario.jpg" },
  { name: "Roberto", title: "Irrigazione", role: "Impianti idrici e posa prato", image: "/images/team/roberto.jpg" },
  { name: "Lleshi", title: "Pietra e Cubetti", role: "Pavimentazioni esterne in pietra", image: "/images/team/lleshi.jpg" },
  { name: "Claudio", title: "Pietra Arenaria", role: "Lavorazioni in pietra di Langa", image: "/images/team/claudio.jpg" },
  { name: "Fabrizio", title: "Giardini Giapponesi", role: "Specialista Zen e orientali", image: "/images/team/fabrizio.jpg" },
  { name: "Ercole", title: "Recinzioni", role: "Opere in legno e staccionate", image: "/images/team/ercole.jpg" },
  { name: "Carlo", title: "Manutenzione", role: "Cura giardini e aree verdi", image: "/images/team/carlo.jpg" },
];

export default function ContattiPage() {
  const submitContact = useMutation(api.contacts.submit);
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    clientType: "" as "b2c" | "b2b" | "",
    name: "",
    companyName: "",
    email: "",
    phone: "",
    vatNumber: "",
    serviceInterest: "",
    subject: "",
    message: "",
    address: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "Italia",
    },
    spaceType: "", // for B2C (giardino small, terrace, etc) or B2B (condominio, hotel, etc)
    projectType: "" as "" | "nuova_costruzione" | "restyling",
    projectFeatures: [] as string[],
    projectStartDate: "",
    budget: "",
    referralSource: "",
    privacyConsent: false,
    marketingConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddress = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getAssignedReferents = () => {
    const features = formData.projectFeatures;
    if (features.length === 0) return [teamData[0]]; // Andrea as default

    const selectedPros: typeof teamData = [];

    // Mapping logic
    if (features.some(f => f.includes("Progettazione") || f.includes("direzione"))) selectedPros.push(teamData.find(t => t.name === "Andrea Giordano")!);
    if (features.includes("Potatura alberi") || features.includes("Tree climbing")) selectedPros.push(teamData.find(t => t.name === "Bogdan")!);
    if (features.includes("Analisi fitosanitaria")) selectedPros.push(teamData.find(t => t.name === "Moreno")!);
    if (features.includes("Analisi forestale")) selectedPros.push(teamData.find(t => t.name === "Daniele")!);
    if (features.some(f => f.includes("Allestimento") || f.includes("Irrigazione"))) selectedPros.push(teamData.find(t => t.name === "Besnik")!);
    if (features.includes("Prato sintetico")) selectedPros.push(teamData.find(t => t.name === "Michele")!);
    if (features.includes("Terrazzo / Attico")) selectedPros.push(teamData.find(t => t.name === "Nicolò")!);
    if (features.includes("Manutenzione periodica") || features.includes("Manutenzione programmata")) selectedPros.push(teamData.find(t => t.name === "Agi")!);
    if (features.includes("Antizanzare")) selectedPros.push(teamData.find(t => t.name === "Flavio")!);
    if (features.includes("Robot tagliaerba")) selectedPros.push(teamData.find(t => t.name === "Danilo")!);
    if (features.includes("Arredo floreale")) selectedPros.push(teamData.find(t => t.name === "Francesca")!);
    if (features.includes("Illuminazione")) selectedPros.push(teamData.find(t => t.name === "Paolo e Dario")!);
    if (features.includes("Pavimentazione pietra")) selectedPros.push(teamData.find(t => t.name.includes("Lleshi")) || teamData.find(t => t.name === "Lleshi")!);
    if (features.includes("Pietra Arenaria")) selectedPros.push(teamData.find(t => t.name === "Claudio")!);
    if (features.includes("Giardino giapponese")) selectedPros.push(teamData.find(t => t.name === "Fabrizio")!);
    if (features.includes("Recinzioni legno")) selectedPros.push(teamData.find(t => t.name === "Ercole")!);

    // Unique pros
    const uniquePros = Array.from(new Set(selectedPros.map(p => p.name)))
      .map(name => selectedPros.find(p => p.name === name)!);

    if (uniquePros.length > 1) {
      const andrea = teamData[0];
      return [andrea, ...uniquePros.filter(p => p.name !== andrea.name)];
    }

    return uniquePros.length > 0 ? uniquePros : [teamData[0]];
  };

  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 20 * 1024 * 1024; // 20MB
    const maxFiles = 5;
    const currentSize = uploadedFiles.reduce((acc, f) => acc + f.sizeBytes, 0);

    const newFiles: File[] = [];
    for (const file of Array.from(files)) {
      if (!allowedTypes.includes(file.type)) continue;
      if (file.size > maxSize) continue;
      if (uploadedFiles.length + newFiles.length >= maxFiles) break;
      if (currentSize + file.size > maxSize * maxFiles) break;
      newFiles.push(file);
    }

    if (newFiles.length === 0) return;

    setUploading(true);
    try {
      for (const file of newFiles) {
        const uploadUrl = await generateUploadUrl({});
        const uploadResult = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!uploadResult.ok) continue;

        const payload = await uploadResult.json() as { storageId?: string };
        if (!payload.storageId) continue;

        const isImage = file.type.startsWith("image/");
        const previewUrl = isImage ? URL.createObjectURL(file) : undefined;

        setUploadedFiles(prev => [...prev, {
          storageId: payload.storageId!,
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
          previewUrl,
        }]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  }, [generateUploadUrl, uploadedFiles]);

  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => {
      const file = prev[index];
      if (file.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const totalSize = uploadedFiles.reduce((acc, f) => acc + f.sizeBytes, 0);
  const canAddMoreFiles = uploadedFiles.length < 5 && totalSize < 100 * 1024 * 1024;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.clientType !== "";
      case 1:
        return formData.clientType === "b2b"
          ? formData.companyName && formData.email
          : formData.name && formData.email;
      case 2:
        return formData.spaceType !== "";
      case 3:
        return formData.projectFeatures.length > 0 && formData.message;
      case 4:
        return formData.privacyConsent;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const detailedMessage = `
--- DETTAGLI QUESTIONARIO ---
Tipo Cliente: ${formData.clientType === "b2b" ? "Azienda (" + formData.companyName + ")" : "Privato"}
Spazio: ${formData.spaceType}
Servizi: ${formData.projectFeatures.join(", ")}
Inizio: ${formData.projectStartDate || "Non specificato"}
Budget: ${formData.budget || "Non specificato"}
P.IVA: ${formData.vatNumber || "N/A"}
Referente suggerito: ${getAssignedReferents().map(p => p.name).join(", ")}

--- MESSAGGIO UTENTE ---
${formData.message}
    `.trim();

    try {
      await submitContact({
        name: formData.clientType === "b2b" ? formData.companyName : formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: `${formData.clientType.toUpperCase()} - ${formData.spaceType} - ${formData.projectFeatures[0] || "Richiesta"}`,
        message: detailedMessage,
        serviceInterest: formData.projectFeatures[0],
        address: formData.address.street || formData.address.city
          ? {
            street: formData.address.street,
            city: formData.address.city,
            province: formData.address.province,
            postalCode: formData.address.postalCode,
            country: formData.address.country,
          }
          : undefined,
        projectType: formData.projectType || undefined,
        projectFeatures: formData.projectFeatures.length > 0 ? formData.projectFeatures : undefined,
        projectStartDate: formData.projectStartDate || undefined,
        referralSource: formData.referralSource || undefined,
        privacyConsent: formData.privacyConsent,
        marketingConsent: formData.marketingConsent || undefined,
        attachments: uploadedFiles.length > 0
          ? uploadedFiles.map(f => ({
            storageId: f.storageId as Id<"_storage">,
            fileName: f.fileName,
            mimeType: f.mimeType,
            sizeBytes: f.sizeBytes,
          }))
          : undefined,
      });
      setShowSuccess(true);
    } catch (error) {
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
      <section className="relative h-[70vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1920')] bg-cover bg-center">
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

            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6 text-white text-balance">
              Parliamone:
              <span className="block italic text-leaf-400">
                ti diciamo cosa serve davvero
              </span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed">
              Che tu stia partendo da zero o che tu voglia riqualificare un giardino esistente, ti aiutiamo a fare chiarezza su priorità e investimenti.
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
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${step.id < currentStep
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
                          {step.id < 4 && (
                            <div
                              className={`flex-1 h-0.5 mx-4 rounded-full transition-colors duration-500 ${step.id < currentStep
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
                          className={`text-xs transition-colors duration-300 ${step.id <= currentStep
                            ? "text-forest-950 font-medium"
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
                        Ti rispondiamo entro 48 ore lavorative. Ti diciamo cosa serve davvero — e cosa no.
                      </p>
                      <Button
                        variant="ghost"
                        onClick={() => { setShowSuccess(false); setCurrentStep(0); }}
                        className="mt-10 text-leaf-600 hover:text-leaf-700"
                      >
                        Invia un altro messaggio
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Step 0: Client Type Selection */}
                      {currentStep === 0 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                          <p className="font-body text-center text-forest-800 mb-8">
                            Per iniziare, dicci chi sei per offrirti il miglior percorso di progettazione.
                          </p>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div
                              onClick={() => { updateFormData("clientType", "b2c"); nextStep(); }}
                              className={`bg-paper-50 hover:bg-leaf-50 border-2 rounded-2xl p-8 cursor-pointer transition-all text-center group ${formData.clientType === "b2c" ? "border-leaf-500 bg-leaf-50/30" : "border-paper-200 hover:border-leaf-500"}`}
                            >
                              <div className="w-16 h-16 rounded-full bg-white shadow-soft flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Home className="w-8 h-8 text-leaf-700" />
                              </div>
                              <h3 className="font-display text-xl text-forest-950 mb-2">Privato</h3>
                              <p className="font-body text-sm text-forest-800/70">Per il tuo giardino di casa, terrazzo o orto bio.</p>
                            </div>

                            <div
                              onClick={() => { updateFormData("clientType", "b2b"); nextStep(); }}
                              className={`bg-paper-50 hover:bg-leaf-50 border-2 rounded-2xl p-8 cursor-pointer transition-all text-center group ${formData.clientType === "b2b" ? "border-leaf-500 bg-leaf-50/30" : "border-paper-200 hover:border-leaf-500"}`}
                            >
                              <div className="w-16 h-16 rounded-full bg-white shadow-soft flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Building2 className="w-8 h-8 text-sun-600" />
                              </div>
                              <h3 className="font-display text-xl text-forest-950 mb-2">Azienda / Professionista</h3>
                              <p className="font-body text-sm text-forest-800/70">Per condomini, hotel, enti pubblici o imprese edili.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 1: Info (Conditional B2B/B2C) */}
                      {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                          {formData.clientType === "b2b" ? (
                            <>
                              <Input
                                label="Ragione Sociale *"
                                placeholder="Ragione Sociale"
                                value={formData.companyName}
                                onChange={(e) => updateFormData("companyName", e.target.value)}
                                className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                                required
                              />
                              <Input
                                label="P.IVA / Codice Fiscale (Opzionale)"
                                placeholder="P.IVA o Codice Fiscale"
                                value={formData.vatNumber}
                                onChange={(e) => updateFormData("vatNumber", e.target.value)}
                                className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                              />
                            </>
                          ) : (
                            <Input
                              label="Nome completo *"
                              placeholder="Nome e Cognome"
                              value={formData.name}
                              onChange={(e) => updateFormData("name", e.target.value)}
                              className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                              required
                            />
                          )}
                          <Input
                            label="Email di contatto *"
                            type="email"
                            placeholder="esempio@azienda.it"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                            required
                          />
                          <Input
                            label="Recapito telefonico"
                            type="tel"
                            placeholder="+39 ..."
                            value={formData.phone}
                            onChange={(e) => updateFormData("phone", e.target.value)}
                            className="h-14 rounded-xl border-paper-200 bg-paper-50/50"
                          />
                        </div>
                      )}

                      {/* Step 2: Space Type */}
                      {currentStep === 2 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                          <label className="block text-micro text-forest-800 mb-3">
                            Che tipo di {formData.clientType === "b2b" ? "settore" : "spazio"} hai? *
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(formData.clientType === "b2b"
                              ? ["Verde condominiale", "Hotel / Struttura ricettiva", "Ente pubblico", "Impresa edile", "Uffici / Sede aziendale"]
                              : ["Giardino piccolo (< 200 mq)", "Giardino medio (200-500 mq)", "Giardino grande (> 500 mq)", "Terrazzo / Attico", "Orto"]
                            ).map((option) => (
                              <div
                                key={option}
                                onClick={() => updateFormData("spaceType", option)}
                                className={`px-6 py-4 rounded-xl border-2 cursor-pointer transition-all ${formData.spaceType === option ? "border-leaf-500 bg-leaf-50" : "border-paper-200 hover:border-leaf-200 bg-paper-50/50"}`}
                              >
                                {option}
                              </div>
                            ))}
                          </div>

                          <div className="pt-6 border-t border-paper-200">
                            <span className="text-micro text-leaf-600 block mb-4 flex items-center gap-2">
                              <Home className="w-4 h-4" />
                              Dove si trova il progetto? (facoltativo)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Input
                                label="Città"
                                placeholder="es. Torino"
                                value={formData.address.city}
                                onChange={(e) => updateAddress("city", e.target.value)}
                                className="h-12 rounded-xl border-paper-200 bg-paper-50/50"
                              />
                              <div className="relative">
                                <label className="block text-sm font-medium text-forest-800 mb-2">Nazione</label>
                                <select
                                  value={formData.address.country}
                                  onChange={(e) => updateAddress("country", e.target.value)}
                                  className="w-full h-12 px-4 rounded-xl border border-paper-200 bg-paper-50/50"
                                >
                                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Requirements & Message */}
                      {currentStep === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                          <CheckboxGroup
                            label="Di cosa hai bisogno? (Seleziona uno o più)"
                            options={formData.clientType === "b2b" ? [
                              { value: "Progettazione e direzione lavori", label: "Progettazione e Direzione Lavori" },
                              { value: "Realizzazione completa", label: "Realizzazione Completa Chiavi in Mano" },
                              { value: "Manutenzione programmata", label: "Manutenzione Programmata" },
                              { value: "Potatura professionale", label: "Potatura Professionale / Tree climbing" },
                              { value: "Analisi fitosanitaria", label: "Analisi Fitosanitaria" },
                              { value: "Irrigazione larga scala", label: "Impianti Irrigazione Large Scale" }
                            ] : [
                              { value: "Progettazione da zero", label: "Progettazione da Zero" },
                              { value: "Restyling giardino", label: "Restyling Giardino Esistente" },
                              { value: "Manutenzione periodica", label: "Manutenzione Periodica" },
                              { value: "Potatura alberi", label: "Potatura Alberi" },
                              { value: "Impianto irrigazione", label: "Impianto Irrigazione" },
                              { value: "Robot tagliaerba", label: "Robot Tagliaerba" },
                              { value: "Antizanzare", label: "Impianto Antizanzare" }
                            ]}
                            value={formData.projectFeatures}
                            onChange={(vals) => updateFormData("projectFeatures", vals)}
                          />

                          <div className="grid sm:grid-cols-2 gap-6">
                            <Input
                              label="Budget indicativo (fac.)"
                              placeholder="es. 5.000€ - 10.000€"
                              value={formData.budget}
                              onChange={(e) => updateFormData("budget", e.target.value)}
                              className="h-12 rounded-xl border-paper-200 bg-paper-50/50"
                            />
                            <Input
                              label="Quando vuoi iniziare?"
                              placeholder="es. Primavera 2026"
                              value={formData.projectStartDate}
                              onChange={(e) => updateFormData("projectStartDate", e.target.value)}
                              className="h-12 rounded-xl border-paper-200 bg-paper-50/50"
                            />
                          </div>

                          <Textarea
                            label="Parlaci del tuo progetto *"
                            placeholder="Descrivi brevemente la tua idea..."
                            value={formData.message}
                            onChange={(e) => updateFormData("message", e.target.value)}
                            className="min-h-[140px] rounded-xl border-paper-200 bg-paper-50/50"
                            required
                          />

                          <div>
                            <span className="text-micro text-forest-800 block mb-3">Allegati (foto dello spazio, planimetrie)</span>
                            <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" onChange={(e) => handleFileUpload(e.target.files)} className="hidden" />
                            <div
                              onClick={() => canAddMoreFiles && fileInputRef.current?.click()}
                              className="border-2 border-dashed border-paper-300 rounded-xl p-6 text-center hover:border-leaf-500 hover:bg-leaf-50 cursor-pointer"
                            >
                              <Upload className="w-8 h-8 mx-auto mb-2 text-forest-800/40" />
                              <p className="text-sm text-forest-800/70">Clicca per aggiungere foto o file</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 4: Referral & Final Summary */}
                      {currentStep === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                          <div className="bg-leaf-50 border border-leaf-100 rounded-2xl p-6 mb-8 text-center ring-4 ring-leaf-50 shadow-soft">
                            <div className="flex justify-center -space-x-4 mb-4">
                              {getAssignedReferents().map((pro, i) => (
                                <div key={pro.name}
                                  className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-medium relative"
                                  style={{ zIndex: 10 - i }}
                                >
                                  <img src={pro.image} alt={pro.name} className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                            <h3 className="font-display text-2xl text-forest-950 mb-2">Il tuo Referente: {getAssignedReferents()[0].name}</h3>
                            <p className="font-body text-sm text-leaf-800 leading-relaxed italic">
                              {getAssignedReferents().length > 1
                                ? `Sarà affiancato da un team di ${getAssignedReferents().length - 1} specialisti per i servizi richiesti.`
                                : "Uno specialista dedicato seguirà il tuo progetto dalla A alla Z."}
                            </p>
                          </div>

                          <div className="space-y-4">
                            <label className="block text-micro text-forest-800">Come mi hai conosciuto? *</label>
                            <select
                              value={formData.referralSource}
                              onChange={(e) => updateFormData("referralSource", e.target.value)}
                              className="w-full h-14 px-5 rounded-xl border border-paper-200 bg-paper-50/50"
                              required
                            >
                              <option value="">Scegli un'opzione...</option>
                              {referralOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                          </div>

                          <div className="space-y-4 pt-4 border-t border-paper-200">
                            <Checkbox
                              checked={formData.privacyConsent}
                              onChange={(e) => setFormData(prev => ({ ...prev, privacyConsent: e.target.checked }))}
                              label={<span className="text-sm">Accetto l'informativa sulla privacy (art. 13 GDPR). *</span>}
                              required
                            />
                            <p className="text-xs font-body text-forest-800/50 italic">
                              I tuoi dati sono al sicuro. Ti ricontatteremo entro 48 ore lavorative.
                            </p>
                          </div>
                        </div>
                      )}

                      <p className="text-xs font-body text-forest-800/50 italic">
                        * Campi obbligatori. I dati inseriti verranno utilizzati esclusivamente per rispondere alla tua richiesta in conformità con la normativa sulla Privacy.
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
                            Precedente
                          </Button>
                        )}
                        {currentStep < 4 ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!canProceed()}
                            className="flex-1 bg-sun-400 hover:bg-sun-500 text-white h-14 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
                          >
                            Avanti
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
                              : "Invia Richiesta"}
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
              Ti diciamo cosa serve
              <span className="block italic text-leaf-400 font-light">
                davvero
              </span>
            </h2>
            <p className="font-body text-xl text-paper-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Che tu stia partendo da zero o che tu voglia riqualificare un giardino esistente, ti aiutiamo a fare chiarezza su priorità, fasi e investimenti.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="bg-sun-400 hover:bg-sun-500 text-forest-950 border-0 px-12 py-5 text-xl tracking-wider font-bold rounded-2xl shadow-deep hover:scale-105 transition-transform"
                >
                  Richiedi un sopralluogo
                </Button>
              </Link>
              <Link href="/contatti">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-paper-400/30 text-paper-100 hover:bg-paper-100/10 px-12 py-5 text-xl tracking-wider font-bold rounded-2xl"
                >
                  Richiedi una call (aziende/condomini)
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-10 text-paper-400 text-micro">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-leaf-400" />
                Rispondiamo entro 48 ore lavorative
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-leaf-400" />
                Operativi in Piemonte e Trentino Alto-Adige. In espansione in Lombardia.
              </span>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
