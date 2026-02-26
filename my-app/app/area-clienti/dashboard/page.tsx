"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { FadeIn, SlideUp } from "../../components/animations";
import { useClientAuthContext } from "../ClientAuthContext";
import {
  ClipboardList,
  FileImage,
  Camera,
  Phone,
  ArrowRight,
  Sprout,
} from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

export default function ClientDashboardPage() {
  const { account } = useClientAuthContext();

  const counts = useQuery(
    api.gardenMedia.getCounts,
    account?._id ? { clientAccountId: account._id as Id<"clientAccounts"> } : "skip"
  );

  const lead = useQuery(
    api.leads.getByScorecard,
    account?.scorecardId ? { scorecardId: account.scorecardId } : "skip"
  );

  if (!account) return null;

  const profileMap: Record<number, string> = {
    1: "Contemplativo",
    2: "Sostenibile",
    3: "Familiare",
    4: "Rappresentativo",
  };

  let resultProfile: string | null = null;
  if (lead) {
    const buckets: Record<string, number> = {};
    for (const a of lead.quizAnswers) {
      const p = profileMap[a.score];
      if (p) buckets[p] = (buckets[p] ?? 0) + 1;
    }
    resultProfile =
      Object.entries(buckets).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  }

  const cards = [
    {
      href: "/area-clienti/report",
      icon: <ClipboardList className="w-7 h-7 text-leaf-500" />,
      title: "Il Tuo Report",
      description: resultProfile
        ? `Profilo: ${resultProfile}`
        : "Visualizza il tuo profilo verde personale",
      badge: resultProfile ? (
        <Badge className="bg-leaf-500/10 text-leaf-700 border-leaf-500/20">
          {resultProfile}
        </Badge>
      ) : null,
    },
    {
      href: "/area-clienti/il-mio-giardino",
      icon: <FileImage className="w-7 h-7 text-leaf-500" />,
      title: "Rendering",
      description:
        counts && counts.renderingCount > 0
          ? `${counts.renderingCount} rendering disponibil${counts.renderingCount === 1 ? "e" : "i"}`
          : "Andrea sta preparando il tuo rendering personalizzato",
      badge:
        counts && counts.renderingCount > 0 ? (
          <Badge className="bg-sun-400/10 text-sun-600 border-sun-400/20">
            {counts.renderingCount} nuov{counts.renderingCount === 1 ? "o" : "i"}
          </Badge>
        ) : null,
    },
    {
      href: "/area-clienti/il-mio-giardino",
      icon: <Camera className="w-7 h-7 text-leaf-500" />,
      title: "Le Tue Foto",
      description:
        counts && counts.photoCount > 0
          ? `${counts.photoCount} foto caricat${counts.photoCount === 1 ? "a" : "e"}`
          : "Carica le foto del tuo giardino per la progettazione",
      badge: null,
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <FadeIn>
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-forest-950 mb-2">
            Benvenuto,{" "}
            <span className="italic font-light text-leaf-700">
              {account.name?.split(" ")[0] || ""}
            </span>
          </h1>
          <p className="text-forest-800/60 font-body">
            La tua area riservata per il progetto del giardino.
          </p>
        </div>
      </FadeIn>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card, i) => (
          <SlideUp key={i} delay={0.1 * (i + 1)}>
            <Link href={card.href} className="group block">
              <Card className="bg-white border-paper-200/50 rounded-[20px] shadow-soft hover:shadow-floating transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-leaf-500/10 flex items-center justify-center">
                      {card.icon}
                    </div>
                    {card.badge}
                  </div>
                  <h2 className="font-display text-xl text-forest-950 mb-2 group-hover:text-leaf-700 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-forest-800/60 font-body text-sm leading-relaxed">
                    {card.description}
                  </p>
                  <div className="mt-4 flex items-center text-leaf-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Apri</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </SlideUp>
        ))}
      </div>

      {/* CTA */}
      <SlideUp delay={0.4}>
        <Card className="bg-forest-950 text-white rounded-[24px] overflow-hidden relative">
          <div className="absolute top-0 -right-10 w-48 h-48 bg-leaf-500/10 rounded-full blur-3xl" />
          <CardContent className="p-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-leaf-500/20 flex items-center justify-center shrink-0">
                <Sprout className="w-7 h-7 text-leaf-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl mb-1">
                  Hai bisogno di assistenza?
                </h3>
                <p className="text-paper-300 font-body text-sm">
                  Contatta Andrea per una consulenza gratuita sul tuo progetto.
                </p>
              </div>
              <div className="flex gap-3">
                <a href="tel:+393714821825">
                  <button className="flex items-center gap-2 bg-sun-400 hover:bg-sun-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors">
                    <Phone className="w-4 h-4" />
                    Chiama
                  </button>
                </a>
                <Link href="/contatti">
                  <button className="flex items-center gap-2 border border-paper-300/30 text-paper-200 hover:bg-white/10 px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-colors">
                    Scrivi
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
