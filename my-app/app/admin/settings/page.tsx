"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { Save, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input, Textarea } from "../../components/ui/Input";
import { SlideUp } from "../../components/animations";
import { api } from "../../../convex/_generated/api";

export default function AdminSettingsPage() {
  const settings = useQuery(api.settings.getAll) as Record<string, string> | undefined;
  const bulkUpsert = useMutation(api.settings.bulkUpsert);

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [heroClaim, setHeroClaim] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!settings) return;
    setCompanyName(settings.companyName ?? "Visione Sostenibile");
    setCompanyEmail(settings.companyEmail ?? "info@visionesostenibile.it");
    setCompanyPhone(settings.companyPhone ?? "");
    setHeroClaim(settings.heroClaim ?? "Il Verde che Vive");
    setCompanyAddress(settings.companyAddress ?? "");
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    setNotice(null);
    try {
      await bulkUpsert({
        settings: [
          { key: "companyName", value: companyName },
          { key: "companyEmail", value: companyEmail },
          { key: "companyPhone", value: companyPhone },
          { key: "heroClaim", value: heroClaim },
          { key: "companyAddress", value: companyAddress },
        ],
      });
      setNotice({ type: "success", message: "Impostazioni salvate con successo." });
    } catch (err) {
      setNotice({
        type: "error",
        message: err instanceof Error ? err.message : "Errore nel salvataggio.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (settings === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-muted-foreground text-sm">Caricamento impostazioni...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SlideUp>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Impostazioni
          </h1>
          <p className="text-muted-foreground mt-1">
            Configurazioni generali del sito
          </p>
        </div>
      </SlideUp>

      {notice && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm flex items-center gap-2 ${
            notice.type === "success"
              ? "border-leaf-200 bg-leaf-50 text-forest-900"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-leaf-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
          {notice.message}
        </div>
      )}

      <SlideUp delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle>Dati aziendali</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Nome azienda"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
            <Input
              label="Telefono"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
            />
            <Input
              label="Indirizzo"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
            <Textarea
              label="Claim homepage"
              value={heroClaim}
              onChange={(e) => setHeroClaim(e.target.value)}
            />
            <Button onClick={handleSave} loading={saving}>
              <Save className="w-4 h-4 mr-2" />
              Salva impostazioni
            </Button>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
