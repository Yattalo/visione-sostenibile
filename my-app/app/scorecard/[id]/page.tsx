"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { FadeIn, SlideUp, ScaleIn } from "../../components/animations";
import { cn } from "../../lib/utils";
import { BLUR_DATA_URL } from "../../lib/image-utils";
import {
  Leaf,
  TreeDeciduous,
  Users,
  Star,
  Phone,
  ArrowRight,
  Share2,
  CheckCircle2,
  Sprout,
  AlertTriangle,
  TrendingUp,
  Printer,
} from "lucide-react";
import { scorecardProfiles } from "../../lib/barbara-scorecard";

type ProfileType = "Contemplativo" | "Sostenibile" | "Familiare" | "Rappresentativo";

// Profile display data uses barbara-scorecard for professional content
const profileIcons: Record<ProfileType, { icon: React.ReactNode; color: string }> = {
  Contemplativo: { icon: <Leaf className="w-10 h-10" />, color: "leaf" },
  Sostenibile: { icon: <TreeDeciduous className="w-10 h-10" />, color: "leaf" },
  Familiare: { icon: <Users className="w-10 h-10" />, color: "sun" },
  Rappresentativo: { icon: <Star className="w-10 h-10" />, color: "sun" },
};

const profileTitles: Record<ProfileType, { title: string; subtitle: string }> = {
  Contemplativo: {
    title: "Il Contemplativo",
    subtitle: "Il tuo giardino è un rifugio di pace",
  },
  Sostenibile: {
    title: "Il Sostenibile",
    subtitle: "Il tuo giardino è un ecosistema vivo",
  },
  Familiare: {
    title: "Il Familiare",
    subtitle: "Il tuo giardino è il cuore della casa",
  },
  Rappresentativo: {
    title: "Il Rappresentativo",
    subtitle: "Il tuo giardino è un biglietto da visita",
  },
};

function ScoreGauge({ score, maxScore }: { score: number; maxScore: number }) {
  const percentage = Math.round((score / maxScore) * 100);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-paper-200"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          className="text-leaf-500 transition-all duration-1000"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-forest-950">
          {score}
        </span>
        <span className="text-xs text-forest-800/60">/ {maxScore}</span>
      </div>
    </div>
  );
}

export default function ScorecardPage() {
  const params = useParams();
  const scorecardId = params.id as string;
  const lead = useQuery(api.leads.getByScorecard, { scorecardId });

  if (lead === undefined) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <div className="text-center">
          <Sprout className="w-12 h-12 text-leaf-500 animate-pulse mx-auto mb-4" />
          <p className="text-forest-800/70 font-body">Caricamento scorecard...</p>
        </div>
      </div>
    );
  }

  if (lead === null) {
    return (
      <div className="min-h-screen bg-paper-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="font-display text-3xl text-forest-950 mb-4 uppercase tracking-tight">
            Scorecard non trovata
          </h1>
          <p className="text-forest-800/70 font-body mb-8">
            Il link potrebbe essere errato o la scorecard potrebbe essere scaduta.
          </p>
          <Link href="/quiz">
            <Button className="bg-sun-400 hover:bg-sun-500 text-forest-950 font-bold uppercase tracking-wider px-8 py-3 rounded-xl shadow-medium">
              Rifai il Quiz
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Use stored profile if available, else recompute from scores (backward compat)
  let resultProfile: ProfileType;
  if (lead.resultProfile && ["Contemplativo", "Sostenibile", "Familiare", "Rappresentativo"].includes(lead.resultProfile)) {
    resultProfile = lead.resultProfile as ProfileType;
  } else {
    const profileScores: Record<ProfileType, number> = {
      Contemplativo: 0,
      Sostenibile: 0,
      Familiare: 0,
      Rappresentativo: 0,
    };
    const scoreMap: Record<number, ProfileType> = {
      1: "Contemplativo",
      2: "Sostenibile",
      3: "Familiare",
      4: "Rappresentativo",
    };
    lead.quizAnswers.forEach((a) => {
      const profile = scoreMap[a.score];
      if (profile) {
        profileScores[profile]++;
      }
    });
    resultProfile = Object.entries(profileScores).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0] as ProfileType;
  }

  const profileDisplay = profileTitles[resultProfile];
  const profileIcon = profileIcons[resultProfile];
  const barbaraProfile = scorecardProfiles.find((p) => p.id === resultProfile.toLowerCase());
  const maxScore = lead.quizAnswers.length * 4;

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Print Header (visible only in print) */}
      <div className="print-header print-only">
        <Image src="/VS_logo_monogramma_colori.svg" alt="Visione Sostenibile" width={28} height={28} />
        <div>
          <strong style={{ fontSize: "11pt" }}>Visione Sostenibile</strong>
          <span style={{ fontSize: "9pt", color: "#7D776C", marginLeft: "8pt" }}>
            Scorecard Giardino Sostenibile
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="scorecard-hero relative bg-forest-950 text-white py-20 md:py-28 overflow-hidden">
        {/* Decorative organic blobs */}
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-leaf-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-sun-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <Image src="/VS_logo_monogramma_bianco.svg" alt="Logo Visione Sostenibile" width={40} height={40} placeholder="blur" blurDataURL={BLUR_DATA_URL} className="opacity-80" />
            </div>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
              La tua Scorecard Personale
            </Badge>
          </FadeIn>
          <SlideUp delay={0.1}>
            <div
              className={cn(
                "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center",
                profileIcon.color === "leaf"
                  ? "bg-leaf-500/20 text-leaf-400"
                  : "bg-sun-500/20 text-sun-400"
              )}
            >
              {profileIcon.icon}
            </div>
          </SlideUp>
          <SlideUp delay={0.2}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-light leading-tight mb-4 text-balance">
              {profileDisplay.title.split(" ")[0]}{" "}
              <span className="italic text-leaf-400">
                {profileDisplay.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-paper-300 max-w-2xl mx-auto font-body leading-relaxed">
              {profileDisplay.subtitle}
            </p>
          </SlideUp>

          <FadeIn delay={1}>
            <div className="mt-14">
              <div className="w-px h-16 bg-gradient-to-b from-leaf-400/50 to-transparent mx-auto" />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-10">
        {/* Print Button (visible only on screen) */}
        <div className="no-print flex justify-end mb-4 -mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-2"
          >
            <Printer className="w-4 h-4" />
            Stampa / Scarica PDF
          </Button>
        </div>

        {/* Score + Description */}
        <SlideUp delay={0.3}>
          <Card className="scorecard-score-card bg-white shadow-floating border-paper-100 rounded-[30px] mb-8">
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                <ScoreGauge score={lead.totalScore} maxScore={maxScore} />
                <div>
                  <span className="text-micro text-leaf-600 block mb-3">
                    Il tuo profilo
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl text-forest-950 mb-4 uppercase tracking-tight">
                    {profileDisplay.title}
                  </h2>
                  <p className="text-forest-800/70 font-body leading-relaxed">
                    {barbaraProfile?.description || profileDisplay.subtitle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        {/* Strengths (Punti di forza) */}
        <SlideUp delay={0.4}>
          <Card className="scorecard-strengths bg-white border-paper-200/50 rounded-[30px] shadow-soft mb-8">
            <CardContent className="p-8 md:p-10">
              <span className="text-micro text-leaf-600 block mb-3">
                I tuoi punti di forza
              </span>
              <h2 className="font-display text-2xl text-forest-950 mb-8 uppercase tracking-tight">
                Cosa <span className="italic font-light">funziona già</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {(barbaraProfile?.strengths || []).map((strength, i) => (
                  <div key={i} className="flex items-start gap-4 bg-paper-50 rounded-2xl p-5">
                    <CheckCircle2 className="w-5 h-5 text-leaf-500 mt-0.5 shrink-0" />
                    <span className="text-forest-800 font-body">{strength}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        {/* Improvements (Dove migliorare) */}
        <SlideUp delay={0.5}>
          <Card className="scorecard-improvements bg-white border-paper-200/50 rounded-[30px] shadow-soft mb-8">
            <CardContent className="p-8 md:p-10">
              <span className="text-micro text-sun-500 block mb-3">
                Dove intervenire
              </span>
              <h2 className="font-display text-2xl text-forest-950 mb-8 uppercase tracking-tight">
                I prossimi <span className="italic font-light">passi concreti</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {(barbaraProfile?.improvements || []).map((improvement, i) => (
                  <div key={i} className="flex items-start gap-4 bg-sun-50/50 rounded-2xl p-5">
                    <TrendingUp className="w-5 h-5 text-sun-500 mt-0.5 shrink-0" />
                    <span className="text-forest-800 font-body">{improvement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        {/* CTA Section — uses Barbara's profile-specific CTA */}
        <ScaleIn delay={0.6}>
          <div className="scorecard-cta relative bg-forest-950 rounded-[40px] p-10 md:p-14 text-center text-white mb-12 overflow-hidden">
            <div className="absolute top-0 -right-10 w-48 h-48 bg-leaf-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-10 w-40 h-40 bg-sun-400/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="text-micro text-leaf-400 block mb-4">
                Prossimo passo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-light mb-4 uppercase tracking-tight leading-tight">
                Vuoi sapere cosa fare prima
                <span className="block italic text-leaf-400 font-light">
                  (e cosa evitare)?
                </span>
              </h2>
              <p className="text-paper-300 font-body max-w-xl mx-auto mb-6 leading-relaxed">
                {barbaraProfile?.ctaText || "Prenota una consulenza gratuita con Andrea. Analizzeremo insieme le possibilità per il tuo spazio verde."}
              </p>
              <p className="text-paper-400 font-body text-sm max-w-lg mx-auto mb-10 italic">
                Con il Check-up Sostenibile ti lasciamo un micro-piano in step: priorità, errori da evitare e range per fasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contatti?from=scorecard&profile={resultProfile}">
                  <Button className="bg-sun-400 hover:bg-sun-500 text-white px-8 py-4 font-bold uppercase tracking-wider rounded-xl shadow-deep hover:scale-105 transition-all duration-300">
                    <Sprout className="w-5 h-5 mr-2" />
                    Prenota il Check-up Sostenibile
                  </Button>
                </Link>
                <a href="tel:+393714821825">
                  <Button
                    variant="outline"
                    className="border-paper-300/40 text-paper-100 hover:bg-white/10 px-8 py-4 uppercase tracking-wider rounded-xl"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Chiama Ora
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Share */}
        <div className="scorecard-share text-center pb-16">
          <p className="text-micro text-forest-800/40 mb-5">
            Condividi la scorecard
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className="border-paper-300 text-forest-800/70 hover:text-forest-950 hover:border-leaf-500 rounded-xl transition-all duration-300"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Scorecard Giardino - ${profileDisplay.title}`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Condividi
            </Button>
          </div>
        </div>

        {/* Print Footer (visible only in print) */}
        <div className="print-footer print-only">
          <p>visione-sostenibile.it &mdash; Giardinaggio Biodinamico a Torino</p>
          <p style={{ fontSize: "8pt", marginTop: "4pt" }}>
            Scorecard generata il {new Date().toLocaleDateString("it-IT")}
          </p>
        </div>
      </div>
    </div>
  );
}
