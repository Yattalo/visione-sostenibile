"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { FadeIn, SlideUp, ScaleIn } from "../../components/animations";
import { cn } from "../../lib/utils";
import {
  Leaf,
  TreeDeciduous,
  Users,
  Star,
  Phone,
  ArrowRight,
  Download,
  Share2,
  CheckCircle2,
  Sprout,
} from "lucide-react";

type ProfileType = "Contemplativo" | "Sostenibile" | "Familiare" | "Rappresentativo";

const profileData: Record<
  ProfileType,
  {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    traits: string[];
    recommendations: string[];
    idealServices: string[];
  }
> = {
  Contemplativo: {
    title: "Il Contemplativo",
    subtitle: "Il tuo giardino e un rifugio per l'anima",
    description:
      "Ami gli spazi verdi come luoghi di pace e meditazione. Il tuo giardino ideale e un santuario dove il tempo rallenta, con elementi naturali che invitano alla contemplazione e al benessere interiore.",
    icon: <Leaf className="w-10 h-10" />,
    color: "leaf",
    traits: [
      "Prediligi spazi raccolti e armoniosi",
      "Ami il suono dell'acqua e il canto degli uccelli",
      "Cerchi un rifugio dal caos quotidiano",
      "Apprezzi le piante perenni e a bassa manutenzione",
    ],
    recommendations: [
      "Giardino zen con elementi acquatici",
      "Angolo meditazione con piante aromatiche",
      "Pergolato con rampicanti fioriti",
      "Illuminazione soffusa per le sere d'estate",
    ],
    idealServices: [
      "progettazione-giardini",
      "irrigazione-smart",
      "illuminazione-paesaggistica",
    ],
  },
  Sostenibile: {
    title: "Il Sostenibile",
    subtitle: "Il tuo giardino e un ecosistema vivo",
    description:
      "Per te il giardino e molto piu di un elemento estetico: e un ecosistema che rispetta e nutre la biodiversita. Il tuo approccio e biodinamico, consapevole e in armonia con i cicli naturali.",
    icon: <TreeDeciduous className="w-10 h-10" />,
    color: "leaf",
    traits: [
      "Scegli piante autoctone e biodiversita",
      "Vuoi un giardino che produce (orto, frutteto)",
      "Riduci al minimo pesticidi e sprechi idrici",
      "Segui i ritmi delle stagioni",
    ],
    recommendations: [
      "Orto biodinamico con rotazione colturale",
      "Sistema di raccolta acqua piovana",
      "Compostiera e pacciamatura naturale",
      "Siepi miste per insetti impollinatori",
    ],
    idealServices: [
      "gestione-verde-biodinamica",
      "irrigazione-smart",
      "trattamenti-fitosanitari",
    ],
  },
  Familiare: {
    title: "Il Familiare",
    subtitle: "Il tuo giardino e il cuore della casa",
    description:
      "Per te lo spazio verde e un'estensione della casa, un luogo dove la famiglia si riunisce, i bambini giocano e si creano ricordi. Funzionalita e sicurezza sono le tue priorita.",
    icon: <Users className="w-10 h-10" />,
    color: "sun",
    traits: [
      "Cerchi spazi pratici e versatili",
      "La sicurezza dei bambini e fondamentale",
      "Vuoi zone diverse per attivita diverse",
      "Ami il barbecue e le cene all'aperto",
    ],
    recommendations: [
      "Prato calpestabile con area giochi",
      "Zona barbecue con pergolato ombreggiante",
      "Recinzione sicura con piante non tossiche",
      "Illuminazione per serate in giardino",
    ],
    idealServices: [
      "realizzazione-giardini",
      "arredamento-outdoor",
      "manutenzione-verde",
    ],
  },
  Rappresentativo: {
    title: "Il Rappresentativo",
    subtitle: "Il tuo giardino e un biglietto da visita",
    description:
      "Per te il giardino e un elemento di prestigio che comunica eleganza e cura del dettaglio. Ogni pianta, ogni percorso, ogni luce e scelto per creare un impatto visivo memorabile.",
    icon: <Star className="w-10 h-10" />,
    color: "sun",
    traits: [
      "Curi l'estetica in ogni dettaglio",
      "Vuoi un giardino che impressioni gli ospiti",
      "Apprezzi il design contemporaneo o classico",
      "Investi nella qualita dei materiali",
    ],
    recommendations: [
      "Design paesaggistico con punti focali",
      "Illuminazione scenografica notturna",
      "Ingresso imponente con viale alberato",
      "Materiali pregiati per camminamenti e bordi",
    ],
    idealServices: [
      "progettazione-giardini",
      "illuminazione-paesaggistica",
      "camminamenti-pavimentazioni",
    ],
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
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl font-bold text-forest-950 mb-4">
            Scorecard non trovata
          </h1>
          <p className="text-forest-800/70 font-body mb-6">
            Il link potrebbe essere errato o la scorecard potrebbe essere scaduta.
          </p>
          <Link href="/quiz">
            <Button variant="primary">Rifai il Quiz</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Determine profile from highest scoring category
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

  const resultProfile = Object.entries(profileScores).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0] as ProfileType;

  const profile = profileData[resultProfile];
  const maxScore = lead.quizAnswers.length * 4;

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Hero */}
      <section className="bg-forest-950 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <Badge variant="outline" className="mb-6 border-leaf-400 text-leaf-300">
              La tua Scorecard Personale
            </Badge>
          </FadeIn>
          <SlideUp delay={0.1}>
            <div
              className={cn(
                "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center",
                profile.color === "leaf"
                  ? "bg-leaf-500/20 text-leaf-400"
                  : "bg-sun-500/20 text-sun-400"
              )}
            >
              {profile.icon}
            </div>
          </SlideUp>
          <SlideUp delay={0.2}>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
              {profile.title}
            </h1>
            <p className="text-lg md:text-xl text-paper-300 max-w-2xl mx-auto">
              {profile.subtitle}
            </p>
          </SlideUp>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-8">
        {/* Score + Description */}
        <SlideUp delay={0.3}>
          <Card variant="default" className="bg-white shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                <ScoreGauge score={lead.totalScore} maxScore={maxScore} />
                <div>
                  <h2 className="font-display text-xl font-bold text-forest-950 mb-3">
                    Il tuo profilo
                  </h2>
                  <p className="text-forest-800/70 font-body leading-relaxed">
                    {profile.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        {/* Traits */}
        <SlideUp delay={0.4}>
          <Card variant="default" className="bg-white mb-8">
            <CardContent className="p-8">
              <h2 className="font-display text-xl font-bold text-forest-950 mb-6">
                Le tue caratteristiche
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.traits.map((trait, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-leaf-500 mt-0.5 shrink-0" />
                    <span className="text-forest-800 font-body">{trait}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        {/* Recommendations */}
        <SlideUp delay={0.5}>
          <Card variant="default" className="bg-white mb-8">
            <CardContent className="p-8">
              <h2 className="font-display text-xl font-bold text-forest-950 mb-6">
                I nostri consigli per te
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Sprout className="w-5 h-5 text-sun-500 mt-0.5 shrink-0" />
                    <span className="text-forest-800 font-body">{rec}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        {/* CTA Section */}
        <ScaleIn delay={0.6}>
          <div className="bg-forest-950 rounded-2xl p-8 md:p-12 text-center text-white mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Trasforma il tuo giardino in realta
            </h2>
            <p className="text-paper-300 font-body max-w-xl mx-auto mb-8">
              Prenota una consulenza gratuita con Andrea. Analizzeremo insieme
              le possibilita per il tuo spazio verde, basandoci sul tuo profilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+393714821825">
                <Button variant="primary" size="lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Chiama Ora
                </Button>
              </a>
              <Link href="/contatti">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-paper-300 text-paper-100 hover:bg-white/10"
                >
                  Richiedi Consulenza
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </ScaleIn>

        {/* Share */}
        <div className="text-center pb-16">
          <p className="text-forest-800/60 text-sm mb-4 font-body">
            Condividi la scorecard con chi stai progettando il giardino
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Scorecard Giardino - ${profile.title}`,
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
      </div>
    </div>
  );
}
