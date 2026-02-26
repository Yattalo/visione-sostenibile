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
  User,
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
            <Button className="bg-sun-400 hover:bg-sun-500 text-white font-bold uppercase tracking-wider px-8 py-3 rounded-xl shadow-medium">
              Rifai il Quiz
            </Button>
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
      <section className="relative bg-forest-950 text-white py-20 md:py-28 overflow-hidden">
        {/* Decorative organic blobs */}
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-leaf-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-sun-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <Image src="/VS_logo_monogramma_bianco.svg" alt="Visione Sostenibile" width={40} height={40} className="opacity-80" />
            </div>
            <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-8 px-6 py-2 text-sm tracking-widest uppercase">
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
            <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-4 text-balance">
              {profile.title.split(" ")[0]}{" "}
              <span className="italic text-leaf-400">
                {profile.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-paper-300 max-w-2xl mx-auto font-body leading-relaxed">
              {profile.subtitle}
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
        {/* Score + Description */}
        <SlideUp delay={0.3}>
          <Card className="bg-white shadow-floating border-paper-100 rounded-[30px] mb-8">
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
                <ScoreGauge score={lead.totalScore} maxScore={maxScore} />
                <div>
                  <span className="text-micro text-leaf-600 block mb-3">
                    Il tuo profilo
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl text-forest-950 mb-4 uppercase tracking-tight">
                    {profile.title}
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
          <Card className="bg-white border-paper-200/50 rounded-[30px] shadow-soft mb-8">
            <CardContent className="p-8 md:p-10">
              <span className="text-micro text-leaf-600 block mb-3">
                Le tue caratteristiche
              </span>
              <h2 className="font-display text-2xl text-forest-950 mb-8 uppercase tracking-tight">
                Cosa ti <span className="italic font-light">contraddistingue</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {profile.traits.map((trait, i) => (
                  <div key={i} className="flex items-start gap-4 bg-paper-50 rounded-2xl p-5">
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
          <Card className="bg-white border-paper-200/50 rounded-[30px] shadow-soft mb-8">
            <CardContent className="p-8 md:p-10">
              <span className="text-micro text-sun-500 block mb-3">
                I nostri consigli
              </span>
              <h2 className="font-display text-2xl text-forest-950 mb-8 uppercase tracking-tight">
                Ideale <span className="italic font-light">per te</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {profile.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-4 bg-sun-50/50 rounded-2xl p-5">
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
          <div className="relative bg-forest-950 rounded-[40px] p-10 md:p-14 text-center text-white mb-12 overflow-hidden">
            {/* Decorative blobs inside CTA */}
            <div className="absolute top-0 -right-10 w-48 h-48 bg-leaf-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-10 w-40 h-40 bg-sun-400/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <span className="text-micro text-leaf-400 block mb-4">
                Prossimo passo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-light mb-4 uppercase tracking-tight leading-tight">
                Trasforma il tuo giardino
                <span className="block italic text-leaf-400 font-light">
                  in realtà
                </span>
              </h2>
              <p className="text-paper-300 font-body max-w-xl mx-auto mb-10 leading-relaxed">
                Prenota una consulenza gratuita con Andrea. Analizzeremo insieme
                le possibilità per il tuo spazio verde, basandoci sul tuo profilo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+393714821825">
                  <Button className="bg-sun-400 hover:bg-sun-500 text-white px-8 py-4 font-bold uppercase tracking-wider rounded-xl shadow-deep hover:scale-105 transition-all duration-300">
                    <Phone className="w-5 h-5 mr-2" />
                    Chiama Ora
                  </Button>
                </a>
                <Link href="/contatti">
                  <Button
                    variant="outline"
                    className="border-paper-300/40 text-paper-100 hover:bg-white/10 px-8 py-4 uppercase tracking-wider rounded-xl"
                  >
                    Richiedi Consulenza
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScaleIn>

        {/* Area Clienti CTA */}
        <SlideUp delay={0.7}>
          <div className="bg-white border border-leaf-500/20 rounded-[30px] p-8 md:p-10 text-center mb-8 shadow-soft">
            <div className="w-14 h-14 rounded-full bg-leaf-500/10 flex items-center justify-center mx-auto mb-5">
              <User className="w-7 h-7 text-leaf-600" />
            </div>
            <h3 className="font-display text-2xl text-forest-950 mb-3 uppercase tracking-tight">
              La tua Area{" "}
              <span className="italic font-light text-leaf-700">
                Clienti Gratuita
              </span>
            </h3>
            <p className="text-forest-800/60 font-body max-w-lg mx-auto mb-6 leading-relaxed">
              Rivedi il tuo report quando vuoi, ricevi rendering
              personalizzati del tuo giardino e condividi le foto del tuo
              spazio verde — tutto gratuitamente.
            </p>
            <Link
              href={`/area-clienti?email=${encodeURIComponent(lead.email)}`}
            >
              <Button className="bg-leaf-600 hover:bg-leaf-700 text-white px-8 py-4 font-bold uppercase tracking-wider rounded-xl shadow-medium hover:scale-105 transition-all duration-300">
                Accedi all&apos;Area Clienti
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SlideUp>

        {/* Share */}
        <div className="text-center pb-16">
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
