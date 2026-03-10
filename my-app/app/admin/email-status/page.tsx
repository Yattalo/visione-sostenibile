"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import {
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { SlideUp } from "../../components/animations";
import { api } from "../../../convex/_generated/api";

// ── Types ──

type StatusFilter = "all" | "sent" | "failed" | "queued" | "skipped";

interface Dispatch {
  _id: string;
  to: string;
  subject: string;
  templateKey?: string;
  status: string;
  error?: string;
  provider?: string;
  createdAt: number;
  sentAt?: number;
}

interface EmailStats {
  total: number;
  sent: number;
  failed: number;
  queued: number;
  skipped: number;
  successRate: number;
}

interface ProviderStatus {
  hasResendApiKey: boolean;
  hasEmailFrom: boolean;
  emailFrom: string;
  adminRecipientsCount: number;
  hasAdminRecipients: boolean;
  canSend: boolean;
}

// ── Helpers ──

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// ── Filter Tabs ──

const filterTabs: { label: string; value: StatusFilter; icon: React.ReactNode }[] = [
  { label: "Tutti", value: "all", icon: <Mail className="w-4 h-4" /> },
  { label: "Inviati", value: "sent", icon: <CheckCircle className="w-4 h-4" /> },
  { label: "Falliti", value: "failed", icon: <XCircle className="w-4 h-4" /> },
  { label: "In Coda", value: "queued", icon: <Clock className="w-4 h-4" /> },
  { label: "Saltati", value: "skipped", icon: <AlertTriangle className="w-4 h-4" /> },
];

// ── Main Component ──

export default function EmailStatusPage() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");

  const stats = useQuery(api.emails.getEmailStats) as EmailStats | undefined;
  const provider = useQuery(api.emails.getProviderStatus) as ProviderStatus | undefined;
  const dispatches = useQuery(
    api.emails.getRecentDispatches,
    activeFilter === "all" ? { limit: 50 } : { status: activeFilter, limit: 50 }
  ) as Dispatch[] | undefined;

  const isLoading = stats === undefined || dispatches === undefined;

  const summaryCards = useMemo(() => {
    if (!stats) return [];
    return [
      {
        title: "Totale Inviate",
        value: stats.total.toString(),
        icon: Mail,
        color: "from-indigo-500 to-indigo-600",
      },
      {
        title: "Invii Riusciti",
        value: stats.sent.toString(),
        icon: CheckCircle,
        color: "from-leaf-500 to-leaf-600",
      },
      {
        title: "Fallite",
        value: stats.failed.toString(),
        icon: XCircle,
        color: "from-red-500 to-red-600",
      },
      {
        title: "In Coda",
        value: stats.queued.toString(),
        icon: Clock,
        color: "from-sun-400 to-sun-500",
      },
      {
        title: "Tasso Successo",
        value: `${stats.successRate}%`,
        icon: TrendingUp,
        color:
          stats.successRate >= 90
            ? "from-leaf-500 to-leaf-600"
            : stats.successRate >= 70
              ? "from-yellow-500 to-yellow-600"
              : "from-red-500 to-red-600",
      },
    ];
  }, [stats]);

  // ── Status badge variant ──
  function statusBadge(status: string) {
    switch (status) {
      case "sent":
        return (
          <Badge variant="success" size="sm">
            Inviata
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="warning" size="sm" className="!bg-red-100 !text-red-700">
            Fallita
          </Badge>
        );
      case "queued":
        return (
          <Badge variant="biodynamic" size="sm">
            In Coda
          </Badge>
        );
      case "skipped":
        return (
          <Badge variant="outline" size="sm">
            Saltata
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" size="sm">
            {status}
          </Badge>
        );
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Caricamento stato email...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SlideUp>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Email Status
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitoraggio provider email e log invii
          </p>
        </div>
      </SlideUp>

      {/* Provider status alert */}
      {provider && !provider.canSend && (
        <SlideUp delay={0.05}>
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Invio email disattivato: configura{" "}
            {!provider.hasResendApiKey && <code className="bg-red-100 px-1 rounded">RESEND_API_KEY</code>}
            {!provider.hasResendApiKey && !provider.hasEmailFrom && " e "}
            {!provider.hasEmailFrom && <code className="bg-red-100 px-1 rounded">EMAIL_FROM</code>}
            {" "}nelle environment variables Convex.
          </div>
        </SlideUp>
      )}

      {provider && provider.canSend && (
        <SlideUp delay={0.05}>
          <div className="rounded-xl border border-leaf-200 bg-leaf-50 text-forest-900 px-4 py-3 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-leaf-600" />
            Provider Resend attivo &mdash; mittente:{" "}
            <code className="bg-leaf-100 px-1.5 py-0.5 rounded text-xs font-mono">
              {provider.emailFrom}
            </code>
            {provider.hasAdminRecipients && (
              <span className="text-muted-foreground ml-1">
                ({provider.adminRecipientsCount} admin destinatari)
              </span>
            )}
          </div>
        </SlideUp>
      )}

      {/* Summary Cards */}
      <SlideUp delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {summaryCards.map((card) => (
            <Card key={card.title} variant="elevated" className="h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {card.title}
                    </p>
                    <p className="font-display text-2xl font-bold text-foreground mt-1">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}
                  >
                    <card.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SlideUp>

      {/* Filter Tabs */}
      <SlideUp delay={0.15}>
        <Card variant="default">
          <CardContent className="p-2">
            <div className="flex gap-1 overflow-x-auto">
              {filterTabs.map((tab) => {
                const count =
                  stats && tab.value !== "all"
                    ? stats[tab.value as keyof Pick<EmailStats, "sent" | "failed" | "queued" | "skipped">]
                    : stats?.total;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveFilter(tab.value)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      activeFilter === tab.value
                        ? "bg-forest-950 text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                        activeFilter === tab.value
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Dispatch Log */}
      <SlideUp delay={0.2}>
        <Card variant="default">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Mail className="w-5 h-5 text-leaf-600" />
              Log invii recenti
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dispatches && dispatches.length === 0 ? (
              <div className="p-12 text-center">
                <Mail className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  {activeFilter === "all"
                    ? "Nessun invio email registrato."
                    : `Nessun invio con stato "${activeFilter}".`}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-3 pr-4 font-medium text-muted-foreground">Data</th>
                        <th className="pb-3 pr-4 font-medium text-muted-foreground">Destinatario</th>
                        <th className="pb-3 pr-4 font-medium text-muted-foreground">Oggetto</th>
                        <th className="pb-3 pr-4 font-medium text-muted-foreground">Stato</th>
                        <th className="pb-3 font-medium text-muted-foreground">Errore</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispatches?.map((dispatch, index) => (
                        <tr
                          key={dispatch._id}
                          className={`border-b border-border/50 ${
                            index % 2 === 0 ? "bg-transparent" : "bg-muted/20"
                          }`}
                        >
                          <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                            {formatDate(dispatch.createdAt)}
                          </td>
                          <td className="py-3 pr-4">
                            <span className="font-medium text-foreground">
                              {truncate(dispatch.to, 30)}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            <span className="text-foreground">
                              {truncate(dispatch.subject, 40)}
                            </span>
                          </td>
                          <td className="py-3 pr-4">{statusBadge(dispatch.status)}</td>
                          <td className="py-3">
                            {dispatch.error ? (
                              <span
                                className="text-xs text-red-600 cursor-help"
                                title={dispatch.error}
                              >
                                {truncate(dispatch.error, 40)}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">&mdash;</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card list */}
                <div className="md:hidden space-y-3">
                  {dispatches?.map((dispatch) => (
                    <div
                      key={dispatch._id}
                      className="rounded-xl border border-border bg-white p-4 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground text-sm truncate">
                            {dispatch.subject}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {dispatch.to}
                          </p>
                        </div>
                        {statusBadge(dispatch.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(dispatch.createdAt)}
                      </p>
                      {dispatch.error && (
                        <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2">
                          <p className="text-xs text-red-700 break-words">{dispatch.error}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
