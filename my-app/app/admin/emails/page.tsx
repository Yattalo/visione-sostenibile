"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Plus, Save, Send, Trash2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Input, Textarea } from "@/app/components/ui/Input";
import { RichHtmlEditor } from "@/app/admin/components/RichHtmlEditor";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type Draft = {
  key: string;
  name: string;
  category: string;
  subject: string;
  html: string;
  text: string;
  isActive: boolean;
};

type EmailTemplate = {
  _id: Id<"emailTemplates">;
  key: string;
  name: string;
  category: string;
  subject: string;
  html: string;
  text?: string;
  isSystem: boolean;
  isActive: boolean;
};

type EmailDelivery = {
  _id: string;
  to: string;
  subject: string;
  status: string;
  error?: string;
  createdAt: number;
};

const emptyDraft: Draft = {
  key: "",
  name: "",
  category: "transactional",
  subject: "",
  html: "<p></p>",
  text: "",
  isActive: true,
};

const defaultVariables = `{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "phone": "+39 333 1234567",
  "subject": "Richiesta informazioni",
  "message": "Vorrei maggiori dettagli sui servizi.",
  "serviceInterest": "Progettazione giardini",
  "resultProfile": "Sostenibile",
  "scorecardUrl": "https://www.visionesostenibile.it/scorecard/sc_demo"
}`;

export default function AdminEmailsPage() {
  const templates = (useQuery(api.emailTemplates.list, {
    includeInactive: true,
  }) ?? []) as EmailTemplate[];
  const deliveries = (useQuery(api.emails.listDeliveries, { limit: 40 }) ?? []) as EmailDelivery[];

  const ensureDefaults = useMutation(api.emailTemplates.ensureDefaults);
  const upsertTemplate = useMutation(api.emailTemplates.upsert);
  const deleteTemplate = useMutation(api.emailTemplates.remove);
  const sendWithTemplate = useMutation(api.emailDispatch.sendWithTemplate);

  const hasBootstrapped = useRef(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [previewVariables, setPreviewVariables] = useState(defaultVariables);
  const [testEmail, setTestEmail] = useState("");
  const [notice, setNotice] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;
    void ensureDefaults({});
  }, [ensureDefaults]);

  useEffect(() => {
    if (!selectedKey && templates.length > 0) {
      setSelectedKey(templates[0].key);
    }
  }, [templates, selectedKey]);

  const selectedTemplate = useMemo(
    () => templates.find((row) => row.key === selectedKey) ?? null,
    [templates, selectedKey]
  );

  useEffect(() => {
    if (selectedTemplate) {
      setDraft({
        key: selectedTemplate.key,
        name: selectedTemplate.name,
        category: selectedTemplate.category,
        subject: selectedTemplate.subject,
        html: selectedTemplate.html,
        text: selectedTemplate.text ?? "",
        isActive: selectedTemplate.isActive,
      });
      return;
    }

    if (selectedKey === "__new__") {
      setDraft(emptyDraft);
    }
  }, [selectedTemplate, selectedKey]);

  const preview = useQuery(api.emails.previewFromTemplate, {
    subject: draft.subject || "Template senza oggetto",
    html: draft.html || "<p></p>",
    variablesJson: previewVariables,
    templateName: draft.name || "Anteprima template",
  });

  const onSave = async () => {
    if (!draft.key || !draft.name || !draft.subject) {
      setNotice("Compila key, nome e subject prima di salvare.");
      return;
    }
    setSaving(true);
    setNotice("");
    try {
      await upsertTemplate({
        key: draft.key,
        name: draft.name,
        category: draft.category,
        subject: draft.subject,
        html: draft.html,
        text: draft.text || undefined,
        isActive: draft.isActive,
      });
      setSelectedKey(draft.key);
      setNotice("Template salvato.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Errore salvataggio template");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!selectedTemplate || selectedTemplate.isSystem) return;
    try {
      await deleteTemplate({ id: selectedTemplate._id });
      setSelectedKey(null);
      setNotice("Template eliminato.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Errore eliminazione template");
    }
  };

  const onSendTest = async () => {
    if (!testEmail || !draft.key) {
      setNotice("Inserisci email test e template valido.");
      return;
    }

    setSending(true);
    setNotice("");
    try {
      await sendWithTemplate({
        to: testEmail.trim().toLowerCase(),
        templateKey: draft.key,
        variablesJson: previewVariables,
      });
      setNotice("Email di test messa in coda.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Errore invio test");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Email & Template</h1>
          <p className="text-muted-foreground mt-1">
            Template centralizzati per transazionali e newsletter con preview HTML.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedKey("__new__");
            setDraft(emptyDraft);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuovo template
        </Button>
      </div>

      {notice && (
        <div className="rounded-xl border border-leaf-200 bg-leaf-50 text-forest-900 px-4 py-3 text-sm">
          {notice}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Template disponibili</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {templates.map((template) => (
              <button
                key={template._id}
                onClick={() => setSelectedKey(template.key)}
                className={`w-full text-left rounded-xl border p-3 transition-colors ${
                  selectedKey === template.key
                    ? "border-leaf-500 bg-leaf-50"
                    : "border-border bg-white hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm text-foreground">{template.name}</p>
                  <Badge variant={template.isActive ? "success" : "warning"} size="sm">
                    {template.isActive ? "Attivo" : "Disattivo"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{template.key}</p>
                <div className="mt-2">
                  <Badge variant="earth" size="sm">
                    {template.category}
                  </Badge>
                  {template.isSystem && (
                    <Badge variant="outline" size="sm" className="ml-2">
                      Sistema
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Editor template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Key template"
                  value={draft.key}
                  onChange={(e) => setDraft((prev) => ({ ...prev, key: e.target.value }))}
                  disabled={Boolean(selectedTemplate?.isSystem)}
                  placeholder="es. transactional-order-confirmation"
                />
                <Input
                  label="Nome"
                  value={draft.name}
                  onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome visualizzato in admin"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Categoria</label>
                  <select
                    value={draft.category}
                    onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm"
                  >
                    <option value="transactional">transactional</option>
                    <option value="newsletter">newsletter</option>
                    <option value="custom">custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Stato</label>
                  <select
                    value={draft.isActive ? "active" : "inactive"}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, isActive: e.target.value === "active" }))
                    }
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm"
                  >
                    <option value="active">Attivo</option>
                    <option value="inactive">Disattivo</option>
                  </select>
                </div>
              </div>

              <Input
                label="Subject"
                value={draft.subject}
                onChange={(e) => setDraft((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Oggetto email con token {{name}}"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Body HTML (rich editor)</label>
                <RichHtmlEditor
                  value={draft.html}
                  onChange={(next) => setDraft((prev) => ({ ...prev, html: next }))}
                />
              </div>

              <Textarea
                label="Versione testo (opzionale)"
                value={draft.text}
                onChange={(e) => setDraft((prev) => ({ ...prev, text: e.target.value }))}
                placeholder="Fallback testo semplice"
                rows={5}
              />

              <div className="flex flex-wrap gap-3">
                <Button onClick={onSave} loading={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Salva template
                </Button>

                {selectedTemplate && !selectedTemplate.isSystem && (
                  <Button variant="ghost" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Elimina
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Anteprima e invio test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                label="Variabili JSON"
                value={previewVariables}
                onChange={(e) => setPreviewVariables(e.target.value)}
                rows={8}
              />

              <div className="flex flex-col md:flex-row gap-3">
                <Input
                  label="Email test"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="nome@dominio.it"
                />
                <div className="md:self-end">
                  <Button onClick={onSendTest} loading={sending}>
                    <Send className="w-4 h-4 mr-2" />
                    Invia test
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-2 border-b border-border bg-muted/40">
                  <p className="text-sm text-foreground">
                    <strong>Subject preview:</strong> {preview?.subject || "..."}
                  </p>
                </div>
                <iframe
                  title="Anteprima HTML"
                  className="w-full h-[380px] bg-white"
                  srcDoc={preview?.html || "<html><body><p>Anteprima non disponibile</p></body></html>"}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Storico invii recenti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {deliveries.map((delivery) => (
                <div
                  key={delivery._id}
                  className="rounded-lg border border-border bg-white px-3 py-2 text-sm flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground truncate">{delivery.subject}</p>
                    <p className="text-muted-foreground truncate">{delivery.to}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(delivery.createdAt).toLocaleString("it-IT")}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant={
                        delivery.status === "sent"
                          ? "success"
                          : delivery.status === "queued"
                            ? "earth"
                            : "warning"
                      }
                      size="sm"
                    >
                      {delivery.status}
                    </Badge>
                    {delivery.error && (
                      <button
                        type="button"
                        className="text-xs text-red-600 hover:underline"
                        title={delivery.error}
                      >
                        dettaglio
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Aggiorna
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
