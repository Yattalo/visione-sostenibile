"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sprout,
  Leaf,
  Heart,
  Star,
  Home,
  TreeDeciduous,
  Flower2,
  Trees,
  Sofa,
  Utensils,
  Waves,
  Users,
  Gamepad2,
  Shovel,
  Waves as Nature,
  Building2,
  Castle,
  Warehouse,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { BLUR_DATA_URL } from "../lib/image-utils";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Checkbox, Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { SlideUp, FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "../components/animations";
import PhotoUploadStep from "../components/PhotoUploadStep";
import { trackLead, trackQuizComplete } from "../lib/analytics";
import { getOrCreateGuestSessionId } from "../lib/guest-session";
import { cn } from "../lib/utils";

type ProfileType = "Contemplativo" | "Sostenibile" | "Familiare" | "Rappresentativo";
type PercorsoType = "checkup" | "progetto-fasi" | "manutenzione" | "chiavi-in-mano";

interface QuizAnswer {
  questionId: string;
  answer: string;
}

interface QuestionOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  profile?: ProfileType;
  profileWeight?: number;
  percorso?: PercorsoType;
  isB2B?: boolean;
}

interface Question {
  id: number;
  label: string;
  options: QuestionOption[];
}

// ── PERCORSO CONSIGLIATO definitions ──
const percorsoDescriptions: Record<PercorsoType, { title: string; description: string; cta: string }> = {
  checkup: {
    title: "Check-up Sostenibile",
    description: "Diagnosi + piano in step: ti lasciamo 3 priorità, 3 errori da evitare e un percorso chiaro.",
    cta: "Prenota il Check-up Sostenibile",
  },
  "progetto-fasi": {
    title: "Progetto a Fasi",
    description: "Definiamo insieme un progetto strutturato con priorità, tempi e budget chiari per ogni fase.",
    cta: "Richiedi un progetto a fasi",
  },
  manutenzione: {
    title: "Manutenzione Programmata",
    description: "Piano stagionale di interventi mirati: sai cosa succede e quando, senza sorprese.",
    cta: "Richiedi un piano manutentivo",
  },
  "chiavi-in-mano": {
    title: "Regia Completa",
    description: "Coordinamento unico di progetto, realizzazione e manutenzione per spazi complessi.",
    cta: "Prenota una call operativa",
  },
};

// ── QUESTIONS ──
// Q1, Q4, Q5, Q6 → determinano il PROFILO (pesati: Q1×3, Q5×2, Q4×2, Q6×1)
// Q2, Q3 → determinano il PERCORSO consigliato (non influenzano il profilo)
const questions: Question[] = [
  {
    id: 1,
    label: "Qual è il tuo rapporto ideale con il giardino?",
    options: [
      { id: "contemplativo", label: "Un luogo di pace e contemplazione", icon: <Waves className="w-6 h-6" />, profile: "Contemplativo", profileWeight: 3 },
      { id: "sostenibile", label: "Un ecosistema sostenibile", icon: <Leaf className="w-6 h-6" />, profile: "Sostenibile", profileWeight: 3 },
      { id: "familiare", label: "Uno spazio per la famiglia", icon: <Users className="w-6 h-6" />, profile: "Familiare", profileWeight: 3 },
      { id: "rappresentativo", label: "Un biglietto da visita elegante", icon: <Star className="w-6 h-6" />, profile: "Rappresentativo", profileWeight: 3 },
    ],
  },
  {
    id: 2,
    label: "Qual è la difficoltà più comune del tuo spazio verde?",
    options: [
      { id: "acqua", label: "In estate soffre: acqua sempre un dubbio", icon: <Waves className="w-6 h-6" />, percorso: "checkup" },
      { id: "disordine", label: "Cresce troppo e non resta ordinato", icon: <Sprout className="w-6 h-6" />, percorso: "manutenzione" },
      { id: "stanchezza", label: "È stanco: piante in difficoltà, zone spente", icon: <TreeDeciduous className="w-6 h-6" />, percorso: "progetto-fasi" },
      { id: "gestione", label: "La gestione è complicata (fornitori, tempi, costi)", icon: <Building2 className="w-6 h-6" />, percorso: "chiavi-in-mano" },
    ],
  },
  {
    id: 3,
    label: "Dove si trova il tuo spazio verde?",
    options: [
      { id: "privato", label: "Giardino privato", icon: <Home className="w-6 h-6" />, percorso: "checkup" },
      { id: "terrazzo", label: "Terrazzo o attico", icon: <Flower2 className="w-6 h-6" />, percorso: "checkup" },
      { id: "condominio", label: "Condominio", icon: <Building2 className="w-6 h-6" />, percorso: "chiavi-in-mano", isB2B: true },
      { id: "azienda", label: "Azienda o struttura ricettiva", icon: <Castle className="w-6 h-6" />, percorso: "chiavi-in-mano", isB2B: true },
    ],
  },
  {
    id: 4,
    label: "Cosa non può mancare nel tuo giardino?",
    options: [
      { id: "fiori", label: "Fiori colorati e profumati", icon: <Flower2 className="w-6 h-6" />, profile: "Contemplativo", profileWeight: 2 },
      { id: "alberi", label: "Alberi e piante autoctone", icon: <TreeDeciduous className="w-6 h-6" />, profile: "Sostenibile", profileWeight: 2 },
      { id: "orto", label: "Un orto per la famiglia", icon: <Utensils className="w-6 h-6" />, profile: "Familiare", profileWeight: 2 },
      { id: "arredamento", label: "Arredamento di design", icon: <Sofa className="w-6 h-6" />, profile: "Rappresentativo", profileWeight: 2 },
    ],
  },
  {
    id: 5,
    label: "Come ti piace vivere il tuo giardino?",
    options: [
      { id: "relax", label: "Rilassarmi in tranquillità", icon: <Waves className="w-6 h-6" />, profile: "Contemplativo", profileWeight: 2 },
      { id: "intrattenere", label: "Accogliere amici e ospiti", icon: <Star className="w-6 h-6" />, profile: "Rappresentativo", profileWeight: 2 },
      { id: "giocare", label: "Far giocare i bambini", icon: <Gamepad2 className="w-6 h-6" />, profile: "Familiare", profileWeight: 2 },
      { id: "lavorare", label: "Coltivare e sperimentare", icon: <Shovel className="w-6 h-6" />, profile: "Sostenibile", profileWeight: 2 },
    ],
  },
  {
    id: 6,
    label: "Quale stile ti attrae di più?",
    options: [
      { id: "naturale", label: "Naturale e selvaggio", icon: <Nature className="w-6 h-6" />, profile: "Sostenibile", profileWeight: 1 },
      { id: "moderno", label: "Moderno e minimal", icon: <Building2 className="w-6 h-6" />, profile: "Rappresentativo", profileWeight: 1 },
      { id: "classico", label: "Classico ed elegante", icon: <Castle className="w-6 h-6" />, profile: "Rappresentativo", profileWeight: 1 },
      { id: "rustico", label: "Rustico e accogliente", icon: <Warehouse className="w-6 h-6" />, profile: "Familiare", profileWeight: 1 },
    ],
  },
];

const profileDescriptions: Record<ProfileType, { title: string; description: string }> = {
  Contemplativo: {
    title: "Giardino Contemplativo",
    description: "Il tuo giardino ideale è un rifugio di pace, dove ogni elemento invita alla riflessione e al relax. Un'oasi di serenità dove ritrovare l'armonia con la natura.",
  },
  Sostenibile: {
    title: "Giardino Sostenibile",
    description: "Per te il giardino è un ecosistema vivo. Valorizzi le piante autoctone, il risparmio idrico e la biodiversità. Un approccio responsabile che rispetta l'ambiente.",
  },
  Familiare: {
    title: "Giardino Familiare",
    description: "Il tuo spazio verde è pensato per la famiglia: aree gioco, orto condiviso e angoli conviviali. Un giardino che cresce insieme ai tuoi cari.",
  },
  Rappresentativo: {
    title: "Giardino Rappresentativo",
    description: "Il tuo giardino è un biglietto da visita. Eleganza, design e cura del dettaglio creano uno spazio che impressiona e accoglie con stile.",
  },
};

const leadSteps = [
  { id: 1, title: "Nome", icon: User },
  { id: 2, title: "Email", icon: Mail },
  { id: 3, title: "Invio", icon: Check },
];

export default function QuizPage() {
  const router = useRouter();
  const submitQuiz = useMutation(api.quiz.submit);
  const submitLead = useMutation(api.leads.submit);

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [resultProfile, setResultProfile] = useState<ProfileType | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    privacyConsent: false,
    marketingConsent: false,
  });
  const [percorso, setPercorso] = useState<PercorsoType | null>(null);
  const [isB2B, setIsB2B] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [photoStorageIds, setPhotoStorageIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getOrCreateGuestSessionId();
    const params = new URLSearchParams(window.location.search);
    if (params.get("start") === "2") {
      setStarted(true);
    }
  }, []);

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (optionId: string) => {
    const newAnswers = [...answers, { questionId: String(questions[currentQuestion].id), answer: optionId }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: QuizAnswer[]) => {
    // ── A) PROFILO: weighted scoring from Q1, Q4, Q5, Q6 only ──
    const profileScores: Record<ProfileType, number> = {
      Contemplativo: 0,
      Sostenibile: 0,
      Familiare: 0,
      Rappresentativo: 0,
    };

    // ── B) PERCORSO: from Q2, Q3 ──
    const percorsoScores: Record<PercorsoType, number> = {
      checkup: 0,
      "progetto-fasi": 0,
      manutenzione: 0,
      "chiavi-in-mano": 0,
    };

    let detectedB2B = false;

    finalAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === Number(answer.questionId));
      const option = question?.options.find((o) => o.id === answer.answer);
      if (!option) return;

      // Profile scoring (only Q1, Q4, Q5, Q6 have profile + profileWeight)
      if (option.profile && option.profileWeight) {
        profileScores[option.profile] += option.profileWeight;
      }

      // Percorso scoring (Q2, Q3 have percorso)
      if (option.percorso) {
        percorsoScores[option.percorso]++;
      }

      // B2B detection (Q3)
      if (option.isB2B) {
        detectedB2B = true;
      }
    });

    // Winner profile
    const profileWinner = Object.entries(profileScores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0] as ProfileType;

    // Winner percorso
    const percorsoWinner = Object.entries(percorsoScores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0] as PercorsoType;

    setResultProfile(profileWinner);
    setPercorso(percorsoWinner);
    setIsB2B(detectedB2B);

    // Persist audience preference for servizi page B2C/B2B branching
    if (detectedB2B) {
      try { localStorage.setItem("vs-audience", "b2b"); } catch { /* noop */ }
    }

    setShowPhotoUpload(true);
  };

  const handlePhotoComplete = (storageIds: string[]) => {
    setPhotoStorageIds(storageIds);
    setShowPhotoUpload(false);
    setShowResult(true);
  };

  const handlePhotoSkip = () => {
    setShowPhotoUpload(false);
    setShowResult(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email || !resultProfile || !leadForm.privacyConsent) return;

    setIsSubmitting(true);
    try {
      const profileScoreMap: Record<ProfileType, number> = {
        Contemplativo: 1,
        Sostenibile: 2,
        Familiare: 3,
        Rappresentativo: 4,
      };

      const quizAnswers = answers.map((a) => {
        const question = questions.find((q) => q.id === Number(a.questionId));
        const option = question?.options.find((o) => o.id === a.answer);
        return {
          questionId: a.questionId,
          answer: a.answer,
          score: option?.profile ? profileScoreMap[option.profile] : 1,
        };
      });

      const totalScore = quizAnswers.reduce((sum, a) => sum + a.score, 0);

      await submitQuiz({
        answers: quizAnswers.map((a) => ({ questionId: a.questionId, answer: a.answer })),
        resultProfile,
        email: leadForm.email || undefined,
        phone: leadForm.phone || undefined,
        privacyConsent: leadForm.privacyConsent,
        marketingConsent: leadForm.marketingConsent || undefined,
        source: "quiz",
        guestSessionId: getOrCreateGuestSessionId() || undefined,
      });

      const result = await submitLead({
        quizAnswers,
        totalScore,
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone || undefined,
        photoStorageIds: photoStorageIds.length > 0 ? photoStorageIds : undefined,
        privacyConsent: leadForm.privacyConsent,
        marketingConsent: leadForm.marketingConsent || undefined,
        guestSessionId: getOrCreateGuestSessionId() || undefined,
      });

      trackLead("quiz");
      trackQuizComplete(resultProfile);
      setSubmitted(true);
      setTimeout(() => {
        router.push(`/scorecard/${result.scorecardId}`);
      }, 1500);
    } catch (error) {
      console.error("Quiz submit failed:", error);
      setSubmitted(true);
      setTimeout(() => {
        router.push("/contatti");
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Total steps: 6 questions + 1 photo upload = 7
  const totalSteps = questions.length + 1;
  const currentStep = showPhotoUpload ? questions.length + 1 : currentQuestion + 1;
  const progress = (currentStep / totalSteps) * 100;

  // ── HERO / LANDING ──────────────────────────────────────
  if (!started) {
    return (
      <div className="min-h-screen bg-paper-50">
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1920')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-br from-forest-950/90 via-forest-900/80 to-forest-950/85" />
            </div>
            <div className="absolute top-1/3 -left-24 w-80 h-80 bg-sun-400/15 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-leaf-500/15 rounded-full blur-3xl animate-drift" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <SlideUp>
              <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
                Quiz Interattivo
              </Badge>

              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-light leading-tight mb-6 text-white text-balance">
                Che giardino
                <span className="block italic text-leaf-400">fa per te?</span>
              </h1>

              <p className="font-body text-xl md:text-2xl text-paper-300 max-w-2xl mx-auto leading-relaxed mb-12">
                Rispondi a 6 domande e scopri il tuo profilo verde ideale.
                Riceverai un report personalizzato con suggerimenti su misura per te.
              </p>

              <Button
                onClick={handleStart}
                className="bg-sun-400 hover:bg-sun-500 text-forest-950 px-12 py-5 text-lg tracking-wider font-bold rounded-2xl shadow-deep hover:scale-105 transition-all duration-300 uppercase"
              >
                Inizia il Quiz
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>

              <div className="mt-16 flex flex-wrap justify-center gap-8 text-paper-300 text-micro">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-leaf-400" />
                  6 domande
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-leaf-400" />
                  2 minuti
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-leaf-400" />
                  Report gratuito
                </span>
              </div>
            </SlideUp>

            <FadeIn delay={1.2}>
              <div className="mt-16">
                <div className="w-px h-20 bg-gradient-to-b from-sun-400/50 to-transparent mx-auto" />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    );
  }

  // ── PHOTO UPLOAD STEP ──────────────────────────────────
  if (showPhotoUpload && resultProfile) {
    return (
      <div className="min-h-screen bg-paper-canvas py-10 px-6 relative overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-80 h-80 bg-leaf-100/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 -left-20 w-64 h-64 bg-sun-100/20 rounded-full blur-3xl animate-drift" />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image src="/VS_logo_monogramma_colori.svg" alt="Logo Visione Sostenibile" width={48} height={48} loading="eager" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
          </div>

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-micro text-forest-800/60">
                Foto del giardino (facoltativo)
              </span>
              <span className="text-micro text-leaf-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sun-400 to-leaf-500 rounded-full"
                initial={{ width: `${((questions.length) / totalSteps) * 100}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <PhotoUploadStep
            onComplete={handlePhotoComplete}
            onSkip={handlePhotoSkip}
          />
        </div>
      </div>
    );
  }

  // ── RESULT + LEAD FORM ──────────────────────────────────
  if (showResult && resultProfile) {
    const profile = profileDescriptions[resultProfile];

    return (
      <div className="min-h-screen bg-paper-canvas py-16 px-6 relative overflow-hidden">
        {/* Decorative organic blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-leaf-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-sun-100/30 rounded-full blur-3xl" />

        <div className="max-w-2xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FadeIn>
                  <div className="text-center mb-12">
                    <span className="text-micro text-leaf-600 block mb-4">
                      Il tuo profilo
                    </span>
                    <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-forest-950 leading-[1.1] tracking-tight mb-6">
                      {profile.title.split(" ")[0]}
                      <span className="block italic text-leaf-700 font-light">
                        {profile.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h1>
                    <p className="text-lg text-forest-800/70 font-body leading-relaxed max-w-lg mx-auto mb-6">
                      {profile.description}
                    </p>
                    {percorso && (
                      <div className="inline-flex items-center gap-2 bg-sun-50 border border-sun-200 rounded-2xl px-5 py-3">
                        <Sprout className="w-4 h-4 text-sun-600" />
                        <span className="text-sm font-medium text-forest-800">
                          Percorso consigliato: <span className="text-sun-700 font-bold">{percorsoDescriptions[percorso].title}</span>
                          {isB2B && <span className="ml-1 text-xs text-leaf-600">(B2B)</span>}
                        </span>
                      </div>
                    )}
                  </div>
                </FadeIn>

                <ScaleIn delay={0.2}>
                  <Card className="bg-white shadow-floating border-paper-100 rounded-[40px] overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sun-400 to-leaf-500" />
                    <CardContent className="p-8 md:p-12 pt-10">
                      <span className="text-micro text-sun-500 block mb-4">
                        Ultimo passaggio
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl text-forest-950 mb-3 uppercase tracking-tight">
                        Ricevi il tuo <span className="italic font-light">report</span>
                      </h2>
                      <p className="text-sm text-forest-800/60 font-body mb-10">
                        Inserisci i tuoi dati per ricevere la scorecard completa
                      </p>

                      {/* Step indicators */}
                      <div className="mb-10">
                        <div className="flex items-center justify-between">
                          {leadSteps.map((step) => (
                            <div key={step.id} className="flex items-center flex-1 last:flex-none">
                              <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                                step.id === 3
                                  ? "bg-paper-100 text-forest-800/40"
                                  : "bg-sun-400 text-white ring-4 ring-sun-50 shadow-soft"
                              )}>
                                <step.icon className="w-4 h-4" />
                              </div>
                              {step.id < 3 && (
                                <div className="flex-1 h-0.5 mx-3 rounded-full bg-sun-200" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleLeadSubmit} className="space-y-6">
                        <Input
                          label="Nome completo *"
                          placeholder="es. Mario Rossi"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                          className="h-14 rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                          required
                        />
                        <Input
                          label="Email *"
                          type="email"
                          placeholder="mario@email.com"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                          className="h-14 rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                          required
                        />
                        <Input
                          label="Telefono (opzionale)"
                          type="tel"
                          placeholder="+39 333 ..."
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))}
                          className="h-14 rounded-xl border-paper-200 bg-paper-50/50 focus-visible:ring-sun-400 focus-visible:border-leaf-500"
                        />

                        <div className="space-y-4 rounded-2xl border border-paper-200 bg-paper-50/70 p-4">
                          <Checkbox
                            checked={leadForm.privacyConsent}
                            onChange={(e) =>
                              setLeadForm((prev) => ({
                                ...prev,
                                privacyConsent: e.target.checked,
                              }))
                            }
                            label={
                              <span>
                                Accetto l&apos;informativa privacy e il trattamento dei miei dati per
                                ricevere il report richiesto. *
                                {" "}
                                <a href="/privacy" className="underline text-leaf-700">
                                  Leggi la privacy policy
                                </a>
                              </span>
                            }
                            required
                          />
                          <Checkbox
                            checked={leadForm.marketingConsent}
                            onChange={(e) =>
                              setLeadForm((prev) => ({
                                ...prev,
                                marketingConsent: e.target.checked,
                              }))
                            }
                            label="Acconsento a ricevere aggiornamenti, contenuti e comunicazioni commerciali da Visione Sostenibile."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={
                            isSubmitting ||
                            !leadForm.name ||
                            !leadForm.email ||
                            !leadForm.privacyConsent
                          }
                          className="w-full bg-sun-400 hover:bg-sun-500 text-forest-950 h-14 rounded-xl shadow-medium hover:shadow-deep transition-all duration-300 uppercase font-bold tracking-wider"
                        >
                          {isSubmitting ? "Invio in corso..." : "Ricevi il tuo Report"}
                        </Button>

                        <p className="text-xs text-forest-800/50 text-center font-body italic">
                          Il report puo essere fruito da guest subito. Se poi crei un account, i
                          dati del report vengono associati al tuo profilo.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </ScaleIn>

                <div className="text-center mt-8">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowResult(false);
                      setShowPhotoUpload(false);
                      setResultProfile(null);
                      setPercorso(null);
                      setIsB2B(false);
                      setPhotoStorageIds([]);
                      setAnswers([]);
                      setCurrentQuestion(0);
                    }}
                    className="text-forest-800/60 hover:text-forest-950 font-bold uppercase text-xs tracking-widest"
                  >
                    Ripeti il Quiz
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-leaf-50 flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Check className="w-12 h-12 text-leaf-600" />
                </div>
                <h2 className="font-display text-3xl text-forest-950 mb-4 uppercase tracking-tight font-bold">
                  Report Inviato!
                </h2>
                <p className="text-forest-800/70 font-body">
                  Tra un istante verrai reindirizzato al tuo profilo...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ── QUESTIONS ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-paper-canvas py-10 px-6 relative overflow-hidden">
      {/* Decorative organic blobs */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-leaf-100/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 -left-20 w-64 h-64 bg-sun-100/20 rounded-full blur-3xl animate-drift" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/VS_logo_monogramma_colori.svg" alt="Logo Visione Sostenibile" width={48} height={48} loading="eager" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-micro text-forest-800/60">
              Domanda {currentQuestion + 1} di {questions.length}
            </span>
            <span className="text-micro text-leaf-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-paper-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sun-400 to-leaf-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-forest-950 text-center mb-10 leading-tight tracking-tight">
              {questions[currentQuestion].label}
            </h2>

            <StaggerContainer>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {questions[currentQuestion].options.map((option, index) => (
                  <StaggerItem key={option.id} delay={index * 0.1}>
                    <button
                      onClick={() => handleAnswer(option.id)}
                      className="w-full bg-white border border-paper-200/50 rounded-[30px] p-7 text-left step-card hover-germoglio cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-leaf-50 flex items-center justify-center text-leaf-600 shrink-0 transition-colors duration-300 group-hover:bg-leaf-100 group-hover:text-leaf-700">
                          {option.icon}
                        </div>
                        <span className="text-base font-medium text-forest-950 pt-2 leading-snug">
                          {option.label}
                        </span>
                      </div>
                    </button>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
