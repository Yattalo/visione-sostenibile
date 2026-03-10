import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  FolderKanban,
  FileText,
  Files,
  ArrowRight,
  Clock,
  Leaf,
  Camera,
} from "lucide-react";
import Link from "next/link";

export default async function AreaPrivataDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName ?? "Utente";

  // Placeholder data — will be replaced with Convex queries
  const stats = {
    activeProjects: 0,
    pendingQuotes: 0,
    recentDocuments: 0,
  };

  const recentActivity = [
    {
      id: "1",
      type: "account" as const,
      message: "Account creato con successo",
      date: new Date().toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-display font-bold text-forest-950">
          Bentornato, {firstName}
        </h1>
        <p className="mt-1 text-paper-600">
          Ecco un riepilogo della tua area privata
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          icon={FolderKanban}
          label="Progetti Attivi"
          value={stats.activeProjects}
          href="/area-privata/progetti"
          accent="leaf"
        />
        <SummaryCard
          icon={FileText}
          label="Preventivi in Corso"
          value={stats.pendingQuotes}
          href="/area-privata/preventivi"
          accent="sun"
        />
        <SummaryCard
          icon={Files}
          label="Documenti Recenti"
          value={stats.recentDocuments}
          href="/area-privata/documenti"
          accent="paper"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/contatti"
          className="group flex items-center gap-4 p-5 bg-paper-50 border border-paper-200 rounded-xl hover-germoglio"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-sun-100 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-sun-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-forest-950">Richiedi Preventivo</p>
            <p className="text-sm text-paper-600">
              Descrivici il tuo progetto per un preventivo personalizzato
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-paper-400 group-hover:text-leaf-500 transition-colors" />
        </Link>

        <Link
          href="/area-privata/documenti"
          className="group flex items-center gap-4 p-5 bg-paper-50 border border-paper-200 rounded-xl hover-germoglio"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-leaf-100 flex items-center justify-center">
            <Camera className="w-6 h-6 text-leaf-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-forest-950">Carica Foto</p>
            <p className="text-sm text-paper-600">
              Condividi foto del tuo giardino per una valutazione
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-paper-400 group-hover:text-leaf-500 transition-colors" />
        </Link>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-xl font-display font-bold text-forest-950 mb-4">
          Attivit&agrave; Recente
        </h2>
        <div className="bg-paper-50 border border-paper-200 rounded-xl divide-y divide-paper-200">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-leaf-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-leaf-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-forest-900">
                  {activity.message}
                </p>
                <p className="text-xs text-paper-500">{activity.date}</p>
              </div>
            </div>
          ))}
          {recentActivity.length === 0 && (
            <div className="p-8 text-center text-paper-500">
              Nessuna attivit&agrave; recente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  href: string;
  accent: "leaf" | "sun" | "paper";
}) {
  const accentStyles = {
    leaf: {
      bg: "bg-leaf-50",
      icon: "text-leaf-600",
      border: "border-leaf-200",
    },
    sun: {
      bg: "bg-sun-50",
      icon: "text-sun-600",
      border: "border-sun-200",
    },
    paper: {
      bg: "bg-paper-100",
      icon: "text-paper-600",
      border: "border-paper-300",
    },
  };

  const style = accentStyles[accent];

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-5 bg-paper-50 border border-paper-200 rounded-xl hover-germoglio"
    >
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center`}
      >
        <Icon className={`w-6 h-6 ${style.icon}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-forest-950">{value}</p>
        <p className="text-sm text-paper-600">{label}</p>
      </div>
    </Link>
  );
}
