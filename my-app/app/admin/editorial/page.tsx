"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  FileText,
  Clock,
  Send,
  Undo2,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { SlideUp } from "../../components/animations";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// ── Types ──

interface CalendarPost {
  _id: Id<"blogPosts">;
  slug: string;
  title: string;
  category: string;
  status: "draft" | "scheduled" | "published";
  scheduledAt?: number;
  publishedAt: number;
  isPublished: boolean;
  updatedAt: number;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

// ── Constants ──

const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"] as const;

const MONTHS_IT = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
] as const;

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

function getCalendarDays(year: number, month: number) {
  // month is 1-indexed
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();

  // getDay() returns 0=Sun, we want 0=Mon
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const days: Array<{ day: number; isCurrentMonth: boolean }> = [];

  // Previous month fill
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
  for (let i = startDow - 1; i >= 0; i--) {
    days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ day: d, isCurrentMonth: true });
  }

  // Next month fill (to complete 6 rows max = 42 cells, or at least fill the last row)
  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      days.push({ day: d, isCurrentMonth: false });
    }
  }

  return days;
}

function isToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return now.getFullYear() === year && now.getMonth() + 1 === month && now.getDate() === day;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateShort(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
  });
}

function getPostDay(post: CalendarPost): number {
  const ts = post.scheduledAt ?? post.publishedAt;
  return new Date(ts).getUTCDate();
}

const statusConfig = {
  draft: { label: "Bozza", variant: "outline" as const, dotClass: "bg-gray-400" },
  scheduled: { label: "Programmato", variant: "warning" as const, dotClass: "bg-sun-400" },
  published: { label: "Pubblicato", variant: "success" as const, dotClass: "bg-leaf-500" },
};

// ── Main Component ──

export default function AdminEditorialPage() {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [schedulePostId, setSchedulePostId] = useState<Id<"blogPosts"> | null>(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Convex queries/mutations
  const posts = useQuery(api.editorial.getByMonth, {
    year: currentYear,
    month: currentMonth,
  });

  const updateSchedule = useMutation(api.editorial.updateSchedule);
  const publishNow = useMutation(api.editorial.publishNow);
  const revertToDraft = useMutation(api.editorial.revertToDraft);

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

  // ── Calendar data ──

  const calendarDays = useMemo(
    () => getCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const postsByDay = useMemo(() => {
    const map = new Map<number, CalendarPost[]>();
    if (!posts) return map;
    for (const post of posts) {
      const day = getPostDay(post as CalendarPost);
      const existing = map.get(day) ?? [];
      existing.push(post as CalendarPost);
      map.set(day, existing);
    }
    return map;
  }, [posts]);

  const selectedDayPosts = useMemo(() => {
    if (selectedDay === null) return [];
    return postsByDay.get(selectedDay) ?? [];
  }, [selectedDay, postsByDay]);

  // ── Navigation ──

  const goToPrevMonth = useCallback(() => {
    setSelectedDay(null);
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    setSelectedDay(null);
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setSelectedDay(today.getDate());
  }, []);

  // ── Actions ──

  const handlePublishNow = useCallback(
    async (id: Id<"blogPosts">) => {
      try {
        await publishNow({ id });
        addToast("Articolo pubblicato con successo", "success");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Errore sconosciuto";
        addToast(`Errore: ${msg}`, "error");
      }
    },
    [publishNow, addToast]
  );

  const handleRevertToDraft = useCallback(
    async (id: Id<"blogPosts">) => {
      try {
        await revertToDraft({ id });
        addToast("Articolo riportato a bozza", "success");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Errore sconosciuto";
        addToast(`Errore: ${msg}`, "error");
      }
    },
    [revertToDraft, addToast]
  );

  const openScheduleModal = useCallback((id: Id<"blogPosts">) => {
    setSchedulePostId(id);
    // Default to tomorrow at 09:00
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setScheduleDate(tomorrow.toISOString().split("T")[0]);
    setScheduleTime("09:00");
  }, []);

  const handleSchedule = useCallback(async () => {
    if (!schedulePostId || !scheduleDate) return;

    try {
      const [hours, minutes] = scheduleTime.split(":").map(Number);
      const scheduledAt = new Date(scheduleDate);
      scheduledAt.setHours(hours, minutes, 0, 0);

      await updateSchedule({
        id: schedulePostId,
        scheduledAt: scheduledAt.getTime(),
      });
      addToast(
        `Articolo programmato per ${formatDateShort(scheduledAt.getTime())}`,
        "success"
      );
      setSchedulePostId(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Errore sconosciuto";
      addToast(`Errore: ${msg}`, "error");
    }
  }, [schedulePostId, scheduleDate, scheduleTime, updateSchedule, addToast]);

  // ── Stats ──

  const stats = useMemo(() => {
    if (!posts) return { draft: 0, scheduled: 0, published: 0, total: 0 };
    const typedPosts = posts as CalendarPost[];
    return {
      draft: typedPosts.filter((p) => p.status === "draft").length,
      scheduled: typedPosts.filter((p) => p.status === "scheduled").length,
      published: typedPosts.filter((p) => p.status === "published").length,
      total: typedPosts.length,
    };
  }, [posts]);

  // ── Loading ──

  if (posts === undefined) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="w-8 h-8 animate-spin text-leaf-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Calendario Editoriale
            </h1>
            <p className="text-muted-foreground mt-1">
              Pianifica e gestisci la pubblicazione degli articoli
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={goToToday}>
            <CalendarDays className="w-4 h-4 mr-1" />
            Oggi
          </Button>
        </div>
      </SlideUp>

      {/* Stats */}
      <SlideUp delay={0.1}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card variant="default">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                Totale
              </p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-500">{stats.draft}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                Bozze
              </p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-sun-500">{stats.scheduled}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                Programmati
              </p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-leaf-600">{stats.published}</p>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                Pubblicati
              </p>
            </CardContent>
          </Card>
        </div>
      </SlideUp>

      {/* Calendar Navigation */}
      <SlideUp delay={0.15}>
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goToPrevMonth}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Mese precedente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-display text-xl font-bold text-foreground">
                {MONTHS_IT[currentMonth - 1]} {currentYear}
              </h2>
              <button
                type="button"
                onClick={goToNextMonth}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Mese successivo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Calendar Grid — Desktop */}
      <SlideUp delay={0.2}>
        <div className="hidden md:block">
          <Card variant="default">
            <CardContent className="p-4">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-2">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-px bg-border rounded-xl overflow-hidden">
                {calendarDays.map((cell, idx) => {
                  const dayPosts = cell.isCurrentMonth
                    ? postsByDay.get(cell.day) ?? []
                    : [];
                  const isTodayCell =
                    cell.isCurrentMonth && isToday(currentYear, currentMonth, cell.day);
                  const isSelected =
                    cell.isCurrentMonth && selectedDay === cell.day;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (cell.isCurrentMonth) {
                          setSelectedDay(
                            selectedDay === cell.day ? null : cell.day
                          );
                        }
                      }}
                      disabled={!cell.isCurrentMonth}
                      className={`
                        relative min-h-24 p-2 text-left transition-colors
                        ${cell.isCurrentMonth ? "bg-paper-50 hover:bg-paper-100 cursor-pointer" : "bg-paper-200/50 cursor-default"}
                        ${isSelected ? "ring-2 ring-inset ring-sun-400" : ""}
                      `}
                    >
                      <span
                        className={`
                          inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium
                          ${!cell.isCurrentMonth ? "text-muted-foreground/40" : ""}
                          ${isTodayCell ? "bg-leaf-600 text-white" : ""}
                          ${isSelected && !isTodayCell ? "bg-sun-100 text-sun-700" : ""}
                        `}
                      >
                        {cell.day}
                      </span>

                      {/* Post indicators */}
                      {dayPosts.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {dayPosts.slice(0, 2).map((post) => {
                            const cfg = statusConfig[post.status];
                            return (
                              <div
                                key={post._id}
                                className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-paper-200/80 truncate"
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dotClass}`}
                                />
                                <span className="text-xs truncate text-foreground">
                                  {post.title}
                                </span>
                              </div>
                            );
                          })}
                          {dayPosts.length > 2 && (
                            <span className="text-xs text-muted-foreground pl-1">
                              +{dayPosts.length - 2} altri
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </SlideUp>

      {/* Calendar — Mobile (list view) */}
      <SlideUp delay={0.2}>
        <div className="md:hidden space-y-3">
          {posts.length === 0 ? (
            <Card variant="default">
              <CardContent className="p-8 text-center">
                <CalendarDays className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Nessun articolo per {MONTHS_IT[currentMonth - 1]} {currentYear}
                </p>
              </CardContent>
            </Card>
          ) : (
            (posts as CalendarPost[]).map((post) => {
              const cfg = statusConfig[post.status];
              const dateTs = post.scheduledAt ?? post.publishedAt;
              return (
                <Card key={post._id} variant="default">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <Badge variant={cfg.variant} size="sm">
                            {cfg.label}
                          </Badge>
                          <Badge variant="primary" size="sm">
                            {post.category}
                          </Badge>
                        </div>
                        <p className="font-medium text-foreground text-sm truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDateShort(dateTs)}
                        </p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        {post.status !== "published" && (
                          <button
                            type="button"
                            onClick={() => handlePublishNow(post._id)}
                            className="p-1.5 rounded-lg text-leaf-600 hover:bg-leaf-50 transition-colors"
                            title="Pubblica ora"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        {post.status !== "draft" && (
                          <button
                            type="button"
                            onClick={() => handleRevertToDraft(post._id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
                            title="Riporta a bozza"
                          >
                            <Undo2 className="w-4 h-4" />
                          </button>
                        )}
                        {post.status === "draft" && (
                          <button
                            type="button"
                            onClick={() => openScheduleModal(post._id)}
                            className="p-1.5 rounded-lg text-sun-600 hover:bg-sun-50 transition-colors"
                            title="Programma"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </SlideUp>

      {/* Selected Day Panel — Desktop */}
      {selectedDay !== null && (
        <SlideUp delay={0}>
          <Card variant="default">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-foreground">
                  {selectedDay} {MONTHS_IT[currentMonth - 1]} {currentYear}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                  aria-label="Chiudi dettaglio giorno"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedDayPosts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nessun articolo per questo giorno
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDayPosts.map((post) => {
                    const cfg = statusConfig[post.status];
                    const dateTs = post.scheduledAt ?? post.publishedAt;

                    return (
                      <div
                        key={post._id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-paper-100/50"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <Badge variant={cfg.variant} size="sm">
                              {cfg.label}
                            </Badge>
                            <Badge variant="primary" size="sm">
                              {post.category}
                            </Badge>
                          </div>
                          <p className="font-medium text-foreground truncate">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(dateTs)}
                          </p>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          {post.status === "draft" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openScheduleModal(post._id)}
                              >
                                <Clock className="w-4 h-4 mr-1" />
                                Programma
                              </Button>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handlePublishNow(post._id)}
                              >
                                <Send className="w-4 h-4 mr-1" />
                                Pubblica
                              </Button>
                            </>
                          )}
                          {post.status === "scheduled" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRevertToDraft(post._id)}
                              >
                                <Undo2 className="w-4 h-4 mr-1" />
                                Bozza
                              </Button>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handlePublishNow(post._id)}
                              >
                                <Send className="w-4 h-4 mr-1" />
                                Pubblica ora
                              </Button>
                            </>
                          )}
                          {post.status === "published" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRevertToDraft(post._id)}
                            >
                              <Undo2 className="w-4 h-4 mr-1" />
                              Riporta a bozza
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </SlideUp>
      )}

      {/* Schedule Modal */}
      <Modal
        isOpen={schedulePostId !== null}
        onClose={() => setSchedulePostId(null)}
        title="Programma Pubblicazione"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Scegli data e ora per la pubblicazione programmata.
          </p>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Data
            </label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sun-400 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Ora
            </label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sun-400 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setSchedulePostId(null)}>
              Annulla
            </Button>
            <Button onClick={handleSchedule} disabled={!scheduleDate}>
              <Clock className="w-4 h-4 mr-1" />
              Programma
            </Button>
          </div>
        </div>
      </Modal>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
