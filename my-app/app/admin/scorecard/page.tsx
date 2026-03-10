"use client";

import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Textarea } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { SlideUp } from "../../components/animations";
import { cn } from "../../lib/utils";
import {
  Leaf,
  TreeDeciduous,
  Users,
  Star,
  Save,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Eye,
  Edit3,
  X,
  CheckCircle,
  AlertCircle,
  Sprout,
  Phone,
} from "lucide-react";
import {
  scorecardProfiles,
  type ScorecardProfile,
} from "../../lib/barbara-scorecard";

// ── Types ──

type ProfileType =
  | "contemplativo"
  | "sostenibile"
  | "familiare"
  | "rappresentativo";

interface EditableProfile {
  id: ProfileType;
  name: string;
  description: string;
  strengths: string[];
  improvements: string[];
  ctaText: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

// ── Constants ──

const profileMeta: Record<
  ProfileType,
  {
    icon: React.ReactNode;
    color: string;
    title: string;
    subtitle: string;
  }
> = {
  contemplativo: {
    icon: <Leaf className="w-6 h-6" />,
    color: "leaf",
    title: "Il Contemplativo",
    subtitle: "Il tuo giardino e un rifugio di pace",
  },
  sostenibile: {
    icon: <TreeDeciduous className="w-6 h-6" />,
    color: "leaf",
    title: "Il Sostenibile",
    subtitle: "Il tuo giardino e un ecosistema vivo",
  },
  familiare: {
    icon: <Users className="w-6 h-6" />,
    color: "sun",
    title: "Il Familiare",
    subtitle: "Il tuo giardino e il cuore della casa",
  },
  rappresentativo: {
    icon: <Star className="w-6 h-6" />,
    color: "sun",
    title: "Il Rappresentativo",
    subtitle: "Il tuo giardino e un biglietto da visita",
  },
};

function toEditable(profile: ScorecardProfile): EditableProfile {
  return {
    id: profile.id as ProfileType,
    name: profile.name,
    description: profile.description,
    strengths: [...profile.strengths],
    improvements: [...profile.improvements],
    ctaText: profile.ctaText,
  };
}

function initProfiles(): EditableProfile[] {
  return scorecardProfiles.map(toEditable);
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
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium",
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          )}
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

// ── Score Gauge (mini preview) ──

function MiniGauge({ score, maxScore }: { score: number; maxScore: number }) {
  const percentage = Math.round((score / maxScore) * 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-paper-200"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          className="text-leaf-500 transition-all duration-500"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-bold text-forest-950">
          {score}
        </span>
        <span className="text-[10px] text-forest-800/60">/ {maxScore}</span>
      </div>
    </div>
  );
}

// ── Live Preview Panel ──

function ScorecardPreview({
  profile,
  simulatedScore,
}: {
  profile: EditableProfile;
  simulatedScore: number;
}) {
  const meta = profileMeta[profile.id];
  const maxScore = 40;

  return (
    <div className="bg-paper-50 rounded-2xl border border-paper-200 overflow-hidden">
      {/* Mini Hero */}
      <div className="bg-forest-950 text-white px-6 py-8 text-center">
        <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-paper-100 mb-4 px-4 py-1.5 text-xs tracking-widest uppercase">
          Anteprima Scorecard
        </Badge>
        <div
          className={cn(
            "w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center",
            meta.color === "leaf"
              ? "bg-leaf-500/20 text-leaf-400"
              : "bg-sun-500/20 text-sun-400"
          )}
        >
          {meta.icon}
        </div>
        <h3 className="font-display text-2xl font-light mb-1">
          {meta.title.split(" ")[0]}{" "}
          <span className="italic text-leaf-400">
            {meta.title.split(" ").slice(1).join(" ")}
          </span>
        </h3>
        <p className="text-sm text-paper-300 font-body">{meta.subtitle}</p>
      </div>

      {/* Score + Description */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-6 mb-6">
          <MiniGauge score={simulatedScore} maxScore={maxScore} />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-leaf-600 block mb-1">
              Il tuo profilo
            </span>
            <h4 className="font-display text-lg text-forest-950 uppercase tracking-tight mb-2">
              {meta.title}
            </h4>
            <p className="text-sm text-forest-800/70 font-body leading-relaxed line-clamp-3">
              {profile.description}
            </p>
          </div>
        </div>

        {/* Strengths */}
        <div className="mb-5">
          <span className="text-[10px] uppercase tracking-widest text-leaf-600 block mb-2">
            Punti di forza
          </span>
          <div className="space-y-2">
            {profile.strengths.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-paper-100 rounded-xl p-3"
              >
                <CheckCircle2 className="w-4 h-4 text-leaf-500 mt-0.5 shrink-0" />
                <span className="text-xs text-forest-800 font-body">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div className="mb-5">
          <span className="text-[10px] uppercase tracking-widest text-sun-500 block mb-2">
            Dove intervenire
          </span>
          <div className="space-y-2">
            {profile.improvements.map((imp, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-sun-50/50 rounded-xl p-3"
              >
                <TrendingUp className="w-4 h-4 text-sun-500 mt-0.5 shrink-0" />
                <span className="text-xs text-forest-800 font-body">{imp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-forest-950 rounded-2xl p-5 text-center text-white">
          <span className="text-[10px] uppercase tracking-widest text-leaf-400 block mb-2">
            Prossimo passo
          </span>
          <p className="text-xs text-paper-300 font-body mb-4 leading-relaxed">
            {profile.ctaText}
          </p>
          <div className="flex gap-2 justify-center">
            <span className="inline-flex items-center gap-1.5 bg-sun-400 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl">
              <Sprout className="w-3.5 h-3.5" />
              Check-up Sostenibile
            </span>
            <span className="inline-flex items-center gap-1.5 border border-paper-300/40 text-paper-100 px-4 py-2 text-xs uppercase tracking-wider rounded-xl">
              <Phone className="w-3.5 h-3.5" />
              Chiama
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Profile Editor Panel ──

function ProfileEditor({
  profile,
  onChange,
}: {
  profile: EditableProfile;
  onChange: (updated: EditableProfile) => void;
}) {
  const meta = profileMeta[profile.id];

  const updateField = <K extends keyof EditableProfile>(
    field: K,
    value: EditableProfile[K]
  ) => {
    onChange({ ...profile, [field]: value });
  };

  const updateStrength = (index: number, value: string) => {
    const updated = [...profile.strengths];
    updated[index] = value;
    updateField("strengths", updated);
  };

  const addStrength = () => {
    updateField("strengths", [...profile.strengths, ""]);
  };

  const removeStrength = (index: number) => {
    updateField(
      "strengths",
      profile.strengths.filter((_, i) => i !== index)
    );
  };

  const updateImprovement = (index: number, value: string) => {
    const updated = [...profile.improvements];
    updated[index] = value;
    updateField("improvements", updated);
  };

  const addImprovement = () => {
    updateField("improvements", [...profile.improvements, ""]);
  };

  const removeImprovement = (index: number) => {
    updateField(
      "improvements",
      profile.improvements.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="flex items-center gap-3 pb-4 border-b border-paper-200">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            meta.color === "leaf"
              ? "bg-leaf-100 text-leaf-700"
              : "bg-sun-100 text-sun-600"
          )}
        >
          {meta.icon}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-forest-950">
            {meta.title}
          </h3>
          <p className="text-sm text-forest-800/60">{meta.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <Textarea
        label="Descrizione profilo"
        value={profile.description}
        onChange={(e) => updateField("description", e.target.value)}
        rows={3}
      />

      {/* Strengths */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Punti di forza
        </label>
        <div className="space-y-2">
          {profile.strengths.map((strength, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-leaf-500 shrink-0" />
              <Input
                value={strength}
                onChange={(e) => updateStrength(i, e.target.value)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => removeStrength(i)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Rimuovi"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={addStrength}
          className="mt-2"
        >
          + Aggiungi punto di forza
        </Button>
      </div>

      {/* Improvements */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Dove intervenire
        </label>
        <div className="space-y-2">
          {profile.improvements.map((improvement, i) => (
            <div key={i} className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sun-500 shrink-0" />
              <Input
                value={improvement}
                onChange={(e) => updateImprovement(i, e.target.value)}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => removeImprovement(i)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Rimuovi"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={addImprovement}
          className="mt-2"
        >
          + Aggiungi miglioramento
        </Button>
      </div>

      {/* CTA Text */}
      <Textarea
        label="Testo Call-to-Action"
        value={profile.ctaText}
        onChange={(e) => updateField("ctaText", e.target.value)}
        rows={2}
      />
    </div>
  );
}

// ── Main Component ──

export default function AdminScorecardPage() {
  const [profiles, setProfiles] = useState<EditableProfile[]>(initProfiles);
  const [activeProfileId, setActiveProfileId] =
    useState<ProfileType>("contemplativo");
  const [simulatedScore, setSimulatedScore] = useState(28);
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">(
    "split"
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  const activeProfile = useMemo(
    () => profiles.find((p) => p.id === activeProfileId)!,
    [profiles, activeProfileId]
  );

  // ── Toast helpers ──
  const addToast = useCallback(
    (message: string, type: "success" | "error") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Handlers ──
  const handleProfileChange = (updated: EditableProfile) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Sei sicuro di voler ripristinare tutti i profili ai valori originali?"
    );
    if (!confirmed) return;
    setProfiles(initProfiles());
    addToast("Profili ripristinati ai valori originali", "success");
  };

  const handleSave = () => {
    // Client-side only for now -- actual Convex save can be added later
    addToast("Salvato! Le modifiche sono state applicate.", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Scorecard Editor
            </h1>
            <p className="text-muted-foreground mt-1">
              Modifica i testi e le descrizioni dei profili scorecard con
              anteprima live
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Ripristina
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Salva
            </Button>
          </div>
        </div>
      </SlideUp>

      {/* Profile Tabs */}
      <SlideUp delay={0.1}>
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Profile selector */}
              <div className="flex gap-2 flex-wrap flex-1">
                {profiles.map((profile) => {
                  const meta = profileMeta[profile.id];
                  const isActive = profile.id === activeProfileId;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setActiveProfileId(profile.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? meta.color === "leaf"
                            ? "bg-leaf-100 text-leaf-700 border border-leaf-300"
                            : "bg-sun-100 text-sun-700 border border-sun-300"
                          : "bg-paper-100 text-forest-800/70 border border-transparent hover:bg-paper-200"
                      )}
                    >
                      {meta.icon}
                      <span className="hidden sm:inline">{profile.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* View mode toggle */}
              <div className="flex gap-1 bg-paper-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("editor")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    viewMode === "editor"
                      ? "bg-white text-forest-950 shadow-sm"
                      : "text-forest-800/60 hover:text-forest-800"
                  )}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    viewMode === "split"
                      ? "bg-white text-forest-950 shadow-sm"
                      : "text-forest-800/60 hover:text-forest-800"
                  )}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Split
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    viewMode === "preview"
                      ? "bg-white text-forest-950 shadow-sm"
                      : "text-forest-800/60 hover:text-forest-800"
                  )}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Anteprima
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Score Simulator */}
      <SlideUp delay={0.15}>
        <Card variant="default">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-forest-800 whitespace-nowrap">
                Punteggio simulato
              </label>
              <input
                type="range"
                min={0}
                max={40}
                value={simulatedScore}
                onChange={(e) =>
                  setSimulatedScore(parseInt(e.target.value, 10))
                }
                className="flex-1 h-2 bg-paper-200 rounded-full appearance-none cursor-pointer accent-leaf-500"
              />
              <Badge variant="primary" size="sm">
                {simulatedScore} / 40
              </Badge>
            </div>
          </CardContent>
        </Card>
      </SlideUp>

      {/* Editor + Preview */}
      <SlideUp delay={0.2}>
        <div
          className={cn(
            "grid gap-6",
            viewMode === "split"
              ? "lg:grid-cols-2"
              : "grid-cols-1"
          )}
        >
          {/* Editor Panel */}
          {(viewMode === "split" || viewMode === "editor") && (
            <Card variant="default">
              <CardContent className="p-6">
                <ProfileEditor
                  profile={activeProfile}
                  onChange={handleProfileChange}
                />
              </CardContent>
            </Card>
          )}

          {/* Preview Panel */}
          {(viewMode === "split" || viewMode === "preview") && (
            <div
              className={cn(
                viewMode === "preview" && "max-w-lg mx-auto w-full"
              )}
            >
              <ScorecardPreview
                profile={activeProfile}
                simulatedScore={simulatedScore}
              />
            </div>
          )}
        </div>
      </SlideUp>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
