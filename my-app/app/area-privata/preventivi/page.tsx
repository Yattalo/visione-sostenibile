import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowRight, Leaf } from "lucide-react";

type QuoteStatus = "richiesto" | "in_lavorazione" | "inviato" | "approvato";

interface Quote {
  id: string;
  title: string;
  status: QuoteStatus;
  requestDate: string;
  amount?: string;
}

const quoteStatusConfig: Record<
  QuoteStatus,
  { label: string; className: string }
> = {
  richiesto: {
    label: "Richiesto",
    className: "bg-sun-100 text-sun-700 border-sun-300",
  },
  in_lavorazione: {
    label: "In Lavorazione",
    className: "bg-leaf-100 text-leaf-700 border-leaf-300",
  },
  inviato: {
    label: "Inviato",
    className: "bg-forest-100 text-forest-700 border-forest-300",
  },
  approvato: {
    label: "Approvato",
    className: "bg-leaf-50 text-leaf-800 border-leaf-400",
  },
};

export default async function PreventiviPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Placeholder: will be replaced with Convex query filtered by userId
  const quotes: Quote[] = [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-forest-950">
            Preventivi
          </h1>
          <p className="mt-1 text-paper-600">
            Le tue richieste di preventivo e stime
          </p>
        </div>
      </div>

      {quotes.length > 0 ? (
        <div className="space-y-4">
          {quotes.map((quote) => {
            const status = quoteStatusConfig[quote.status];
            return (
              <div
                key={quote.id}
                className="bg-paper-50 border border-paper-200 rounded-xl p-5 hover-germoglio"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-forest-950">
                        {quote.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-paper-600">
                      <span>Richiesto il {quote.requestDate}</span>
                      {quote.amount && (
                        <span className="font-semibold text-forest-900">
                          {quote.amount}
                        </span>
                      )}
                    </div>
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
      <div className="mx-auto w-16 h-16 rounded-2xl bg-sun-50 flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-sun-500" />
      </div>
      <h3 className="text-lg font-semibold text-forest-950 mb-2">
        Nessun preventivo ancora
      </h3>
      <p className="text-paper-600 mb-6 max-w-md mx-auto">
        Richiedi un preventivo gratuito per il tuo giardino.
        Ti risponderemo entro 48 ore con una stima personalizzata.
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
