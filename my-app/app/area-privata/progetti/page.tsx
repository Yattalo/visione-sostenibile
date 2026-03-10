import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderKanban, ArrowRight, Leaf } from "lucide-react";

type ProjectStatus = "in_corso" | "completato" | "in_attesa" | "pianificato";

interface ClientProject {
  id: string;
  title: string;
  status: ProjectStatus;
  lastUpdate: string;
  description: string;
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  in_corso: {
    label: "In Corso",
    className: "bg-leaf-100 text-leaf-700 border-leaf-300",
  },
  completato: {
    label: "Completato",
    className: "bg-forest-100 text-forest-700 border-forest-300",
  },
  in_attesa: {
    label: "In Attesa",
    className: "bg-sun-100 text-sun-700 border-sun-300",
  },
  pianificato: {
    label: "Pianificato",
    className: "bg-paper-200 text-paper-700 border-paper-400",
  },
};

export default async function ProgettiPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Placeholder: will be replaced with Convex query filtered by userId
  const projects: ClientProject[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-forest-950">
            I Miei Progetti
          </h1>
          <p className="mt-1 text-paper-600">
            Tutti i progetti del tuo giardino
          </p>
        </div>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project) => {
            const status = statusConfig[project.status];
            return (
              <div
                key={project.id}
                className="bg-paper-50 border border-paper-200 rounded-xl p-5 hover-germoglio"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-forest-950">
                        {project.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-paper-600 mb-2">
                      {project.description}
                    </p>
                    <p className="text-xs text-paper-500">
                      Ultimo aggiornamento: {project.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-paper-50 border border-paper-200 rounded-xl p-12 text-center">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-leaf-50 flex items-center justify-center mb-4">
        <FolderKanban className="w-8 h-8 text-leaf-500" />
      </div>
      <h3 className="text-lg font-semibold text-forest-950 mb-2">
        Non hai ancora progetti attivi
      </h3>
      <p className="text-paper-600 mb-6 max-w-md mx-auto">
        Inizia richiedendo un preventivo gratuito per il tuo giardino.
        Ti guideremo in ogni fase del progetto.
      </p>
      <Link
        href="/contatti"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sun-400 text-forest-950 font-semibold text-sm uppercase tracking-wide hover-sun transition-all"
      >
        <Leaf className="w-4 h-4" />
        Richiedi Preventivo
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
