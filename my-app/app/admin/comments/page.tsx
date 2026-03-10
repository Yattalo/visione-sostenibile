"use client";

import { useState, useCallback, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { SlideUp } from "../../components/animations";
import { api } from "../../../convex/_generated/api";

// ── Types ──

type StatusFilter = "pending" | "approved" | "rejected" | undefined;

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

// ── Toast Component ──

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-right ${
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="ml-2 p-0.5 rounded hover:bg-black/10 transition-colors"
            aria-label="Chiudi notifica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
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

const tabs: { label: string; status: StatusFilter; icon: React.ReactNode }[] = [
  { label: "In Attesa", status: "pending", icon: <Clock className="w-4 h-4" /> },
  { label: "Approvati", status: "approved", icon: <CheckCircle className="w-4 h-4" /> },
  { label: "Rifiutati", status: "rejected", icon: <XCircle className="w-4 h-4" /> },
];

// ── Main Component ──

export default function AdminCommentsPage() {
  const [activeTab, setActiveTab] = useState<StatusFilter>("pending");
  const [toasts, setToasts] = useState<Toast[]>([]);

  const comments = useQuery(api.blogComments.getAllForAdmin, {
    status: activeTab,
  }) ?? [];

  const moderateComment = useMutation(api.blogComments.moderate);

  // ── Toast helpers ──
  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Counts per tab (from all-status query when no filter) ──
  const allComments = useQuery(api.blogComments.getAllForAdmin, {}) ?? [];
  const counts = useMemo(() => {
    return {
      pending: allComments.filter((c) => c.status === "pending").length,
      approved: allComments.filter((c) => c.status === "approved").length,
      rejected: allComments.filter((c) => c.status === "rejected").length,
    };
  }, [allComments]);

  // ── Moderate handler ──
  const handleModerate = async (
    commentId: typeof comments[number]["_id"],
    status: "approved" | "rejected"
  ) => {
    try {
      await moderateComment({
        commentId,
        status,
        moderatedBy: "admin",
      });
      addToast(
        status === "approved"
          ? "Commento approvato con successo"
          : "Commento rifiutato",
        "success"
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Errore sconosciuto";
      addToast(`Errore nella moderazione: ${message}`, "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SlideUp>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Commenti
          </h1>
          <p className="text-muted-foreground mt-1">
            Modera i commenti del blog ({allComments.length} totali)
          </p>
        </div>
      </SlideUp>

      {/* Tabs */}
      <SlideUp delay={0.1}>
        <Card variant="default">
          <CardContent className="p-2">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab.status)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.status
                      ? "bg-forest-950 text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.status && (
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.status
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {counts[tab.status]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Comments List */}
      <SlideUp delay={0.2}>
        <div className="space-y-4">
          {comments.length === 0 && (
            <Card variant="default">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  {activeTab === "pending"
                    ? "Nessun commento in attesa di moderazione."
                    : activeTab === "approved"
                      ? "Nessun commento approvato."
                      : "Nessun commento rifiutato."}
                </p>
              </CardContent>
            </Card>
          )}

          {comments.map((comment) => (
            <Card key={comment._id} variant="default">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Author + Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center shrink-0">
                        <span className="text-leaf-700 font-semibold text-sm">
                          {comment.authorName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-foreground text-sm">
                          {comment.authorName}
                        </span>
                        <span className="text-muted-foreground text-xs ml-2">
                          {comment.authorEmail}
                        </span>
                      </div>
                      <Badge
                        variant={
                          comment.status === "approved"
                            ? "success"
                            : comment.status === "rejected"
                              ? "warning"
                              : "outline"
                        }
                        size="sm"
                      >
                        {comment.status === "pending"
                          ? "In attesa"
                          : comment.status === "approved"
                            ? "Approvato"
                            : "Rifiutato"}
                      </Badge>
                    </div>

                    {/* Post slug */}
                    <p className="text-xs text-muted-foreground mb-2">
                      Articolo:{" "}
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                        {comment.postSlug}
                      </code>
                    </p>

                    {/* Comment content */}
                    <p className="text-foreground text-sm leading-relaxed mb-2">
                      {comment.content}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                      {comment.moderatedAt && (
                        <span>
                          {" "}
                          &middot; Moderato il {formatDate(comment.moderatedAt)}
                          {comment.moderatedBy && ` da ${comment.moderatedBy}`}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Actions (only for pending) */}
                  {comment.status === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleModerate(comment._id, "approved")}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approva
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleModerate(comment._id, "rejected")}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rifiuta
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SlideUp>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
