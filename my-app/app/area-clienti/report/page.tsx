"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { FadeIn, SlideUp, ScaleIn } from "../../components/animations";
import { useClientAuthContext } from "../ClientAuthContext";
import { cn } from "../../lib/utils";
import {
  Leaf,
  TreeDeciduous,
  Users,
  Star,
  CheckCircle2,
  Sprout,
  ArrowRight,
  Camera,
} from "lucide-react";

type ProfileType =
  | "Contemplativo"
  | "Sostenibile"
  | "Familiare"
  | "Rappresentativo";

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
    subtitle: "Il tuo giardino è un rifugio per l'anima",
    description:
      "Ami gli spazi verdi come luoghi di pace e meditazione. Il tuo giardino ideale è un santuario dove il tempo rallenta, con elementi naturali che invitano alla contemplazione e al benessere interiore.",
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
    subtitle: "Il tuo giardino è un ecosistema vivo",
    description:
      "Per te il giardino è molto più di un elemento estetico: è un ecosistema che rispetta e nutre la biodiversità. Il tuo approccio è biodinamico, consapevole e in armonia con i cicli naturali.",
    icon: <TreeDeciduous className="w-10 h-10" />,
    color: "leaf",
    traits: [
      "Scegli piante autoctone e biodiversità",
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
    subtitle: "Il tuo giardino è il cuore della casa",
    description:
      "Per te lo spazio verde è un'estensione della casa, un luogo dove la famiglia si riunisce, i bambini giocano e si creano ricordi. Funzionalità e sicurezza sono le tue priorità.",
    icon: <Users className="w-10 h-10" />,
    color: "sun",
    traits: [
      "Cerchi spazi pratici e versatili",
      "La sicurezza dei bambini è fondamentale",
      "Vuoi zone diverse per attività diverse",
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
    subtitle: "Il tuo giardino è un biglietto da visita",
    description:
      "Per te il giardino è un elemento di prestigio che comunica eleganza e cura del dettaglio. Ogni pianta, ogni percorso, ogni luce è scelto per creare un impatto visivo memorabile.",
    icon: <Star className="w-10 h-10" />,
    color: "sun",
    traits: [
      "Curi l'estetica in ogni dettaglio",
      "Vuoi un giardino che impressioni gli ospiti",
      "Apprezzi il design contemporaneo o classico",
      "Investi nella qualità dei materiali",
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

export default function ClientReportPage() {
  const { account } = useClientAuthContext();

  const lead = useQuery(
    api.leads.getByScorecard,
    account?.scorecardId ? { scorecardId: account.scorecardId } : "skip"
  );

  if (!account?.scorecardId) {
    return (
      <FadeIn>
        <div className="text-center py-16">
          <Sprout className="w-12 h-12 text-leaf-500/40 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-forest-950 mb-3">
            Nessun report disponibile
          </h1>
          <p className="text-forest-800/60 font-body mb-6">
            Completa il quiz per scoprire il tuo profilo verde.
          </p>
          <Link href="/quiz">
            <Button className="bg-leaf-600 hover:bg-leaf-700 text-white font-bold uppercase tracking-wider px-8 py-3 rounded-xl">
              Fai il Quiz
            </Button>
          </Link>
        </div>
      </FadeIn>
    );
  }

  if (lead === undefined) {
    return (
      <div className="flex items-center justify-center py-16">
        <Sprout className="w-12 h-12 text-leaf-500 animate-pulse" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-16">
        <h1 className="font-display text-2xl text-forest-950 mb-3">
          Report non trovato
        </h1>
        <p className="text-forest-800/60 font-body">
          Si è verificato un errore nel caricamento del report.
        </p>
      </div>
    );
  }

  // Compute profile
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
    const p = scoreMap[a.score];
    if (p) profileScores[p]++;
  });

  const resultProfile = Object.entries(profileScores).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0] as ProfileType;

  const profile = profileData[resultProfile];
  const maxScore = lead.quizAnswers.length * 4;

  return (
    <div>
      {/* Header */}
      <FadeIn>
        <div className="flex items-center gap-3 mb-8">
          <Badge className="bg-leaf-500/10 text-leaf-700 border-leaf-500/20 px-4 py-1.5 text-sm">
            Il Tuo Profilo
          </Badge>
        </div>
      </FadeIn>

      {/* Score + Profile */}
      <SlideUp delay={0.1}>
        <Card className="bg-white shadow-floating border-paper-100 rounded-[24px] mb-6">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
              <ScoreGauge score={lead.totalScore} maxScore={maxScore} />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      profile.color === "leaf"
                        ? "bg-leaf-500/10 text-leaf-600"
                        : "bg-sun-500/10 text-sun-600"
                    )}
                  >
                    {profile.icon}
                  </div>
                  <div>
                    <h1 className="font-display text-3xl text-forest-950 uppercase tracking-tight">
                      {profile.title}
                    </h1>
                    <p className="text-forest-800/60 font-body text-sm">
                      {profile.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-forest-800/70 font-body leading-relaxed">
                  {profile.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Traits */}
      <SlideUp delay={0.2}>
        <Card className="bg-white border-paper-200/50 rounded-[24px] shadow-soft mb-6">
          <CardContent className="p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-leaf-600 block mb-3">
              Le tue caratteristiche
            </span>
            <h2 className="font-display text-2xl text-forest-950 mb-6 uppercase tracking-tight">
              Cosa ti <span className="italic font-light">contraddistingue</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.traits.map((trait, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-paper-50 rounded-2xl p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-leaf-500 mt-0.5 shrink-0" />
                  <span className="text-forest-800 font-body text-sm">
                    {trait}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Recommendations */}
      <SlideUp delay={0.3}>
        <Card className="bg-white border-paper-200/50 rounded-[24px] shadow-soft mb-6">
          <CardContent className="p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-sun-500 block mb-3">
              I nostri consigli
            </span>
            <h2 className="font-display text-2xl text-forest-950 mb-6 uppercase tracking-tight">
              Ideale <span className="italic font-light">per te</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-sun-50/50 rounded-2xl p-4"
                >
                  <Sprout className="w-5 h-5 text-sun-500 mt-0.5 shrink-0" />
                  <span className="text-forest-800 font-body text-sm">
                    {rec}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* CTA to garden */}
      <ScaleIn delay={0.4}>
        <Card className="bg-forest-950 text-white rounded-[24px] overflow-hidden relative">
          <div className="absolute top-0 -right-10 w-48 h-48 bg-leaf-500/10 rounded-full blur-3xl" />
          <CardContent className="p-8 relative z-10 text-center">
            <Camera className="w-10 h-10 text-leaf-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl mb-2">
              Vuoi un rendering{" "}
              <span className="italic text-leaf-400">gratuito?</span>
            </h2>
            <p className="text-paper-300 font-body max-w-lg mx-auto mb-6 text-sm leading-relaxed">
              Carica le foto del tuo giardino e Andrea preparerà un rendering
              personalizzato basato sul tuo profilo.
            </p>
            <Link href="/area-clienti/il-mio-giardino">
              <Button className="bg-sun-400 hover:bg-sun-500 text-white font-bold uppercase tracking-wider px-8 py-3 rounded-xl shadow-medium">
                Carica Foto
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </ScaleIn>
    </div>
  );
}
