"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { Mail, Save, Send, UserRoundPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Input, Textarea } from "@/app/components/ui/Input";
import { RichHtmlEditor } from "@/app/admin/components/RichHtmlEditor";
import { api } from "@/convex/_generated/api";

const statusOptions = ["new", "contacted", "qualified", "archived"];

type CrmContact = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  tags: string[];
  notes?: string;
  lastInteractionAt: number;
};

type CrmActivity = {
  _id: string;
  type: string;
  title: string;
  description?: string;
  createdAt: number;
};

type ContactSubmission = {
  _id: string;
  subject?: string;
  message: string;
};

type LeadItem = {
  _id: string;
  totalScore: number;
  scorecardId: string;
};

type DeliveryItem = {
  _id: string;
  status: string;
  subject: string;
  createdAt: number;
};

type CrmContactDetail = {
  contact: CrmContact;
  activities: CrmActivity[];
  submissions: ContactSubmission[];
  leads: LeadItem[];
  deliveries: DeliveryItem[];
};

export default function AdminCrmPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const contacts = (useQuery(api.crm.listContacts, {
    search: search || undefined,
    status: status === "all" ? undefined : status,
    limit: 300,
  }) ?? []) as CrmContact[];

  useEffect(() => {
    if (!selectedContactId && contacts.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedContactId(contacts[0]._id);
    }
  }, [contacts, selectedContactId]);

  useEffect(() => {
    const requestedId = searchParams.get("contactId");
    const requestedEmail = searchParams.get("email")?.toLowerCase();

    if (requestedId) {
      const byId = contacts.find((contact) => String(contact._id) === requestedId);
      if (byId) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedContactId(byId._id);
        return;
      }
    }

    if (requestedEmail) {
      const byEmail = contacts.find((contact) => contact.email === requestedEmail);
      if (byEmail) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedContactId(byEmail._id);
      }
    }
  }, [contacts, searchParams]);

  const detail = useQuery(
    api.crm.getContactDetail,
    selectedContactId ? ({ contactId: selectedContactId } as { contactId: string }) : "skip"
  ) as CrmContactDetail | null | undefined;

  const templates = (useQuery(api.emailTemplates.list, {
    category: "transactional",
    includeInactive: false,
  }) ?? []) as Array<{ _id: string; key: string; name: string }>;

  const updateContact = useMutation(api.crm.updateContact);
  const addNote = useMutation(api.crm.addNote);
  const sendOneOff = useMutation(api.emailDispatch.sendOneOff);
  const sendWithTemplate = useMutation(api.emailDispatch.sendWithTemplate);

  const [editing, setEditing] = useState({
    name: "",
    phone: "",
    status: "new",
    tags: "",
    notes: "",
  });
  const [note, setNote] = useState("");
  const [manualSubject, setManualSubject] = useState("Aggiornamento da Visione Sostenibile");
  const [manualHtml, setManualHtml] = useState("<p>Ciao {{name}},</p><p>ti scriviamo per un aggiornamento sulla tua richiesta.</p>");
  const [selectedTemplateKey, setSelectedTemplateKey] = useState("");
  const [notice, setNotice] = useState("");

  const selectedContact = detail?.contact ?? null;

  useEffect(() => {
    if (!selectedContact) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditing({
      name: selectedContact.name ?? "",
      phone: selectedContact.phone ?? "",
      status: selectedContact.status ?? "new",
      tags: (selectedContact.tags ?? []).join(", "),
      notes: selectedContact.notes ?? "",
    });
    setManualSubject("Aggiornamento da Visione Sostenibile");
    setManualHtml(`<p>Ciao ${selectedContact.name},</p><p>ti scriviamo per un aggiornamento sulla tua richiesta.</p>`);
  }, [selectedContact?._id]);

  const timeline = useMemo<CrmActivity[]>(() => detail?.activities ?? [], [detail?.activities]);

  const saveCard = async () => {
    if (!selectedContact) return;
    setNotice("");
    try {
      await updateContact({
        contactId: selectedContact._id,
        name: editing.name,
        phone: editing.phone || undefined,
        status: editing.status,
        notes: editing.notes || undefined,
        tags: editing.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setNotice("Scheda cliente aggiornata.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Errore aggiornamento contatto");
    }
  };

  const addTimelineNote = async () => {
    if (!selectedContact || !note.trim()) return;
    setNotice("");
    try {
      await addNote({
        contactId: selectedContact._id,
        note: note.trim(),
        createdBy: "admin",
      });
      setNote("");
      setNotice("Nota aggiunta alla timeline.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Errore inserimento nota");
    }
  };

  const sendManualEmail = async () => {
    if (!selectedContact) return;
    setNotice("");
    try {
      await sendOneOff({
        to: selectedContact.email,
        subject: manualSubject,
        html: manualHtml,
        crmContactId: selectedContact._id,
        relatedType: "crmContact",
        relatedId: String(selectedContact._id),
      });
      setNotice("Email one-shot messa in coda.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Errore invio one-shot");
    }
  };

  const sendTemplateEmail = async () => {
    if (!selectedContact || !selectedTemplateKey) return;
    setNotice("");

    const variables = {
      name: selectedContact.name,
      email: selectedContact.email,
      phone: selectedContact.phone || "Non fornito",
      headline: "Aggiornamento dalla nostra squadra",
      body: "Stiamo lavorando alla tua richiesta. Ti contatteremo presto con tutti i dettagli.",
      ctaLabel: "Scopri i servizi",
      ctaUrl: "https://www.visionesostenibile.it/servizi",
    };

    try {
      await sendWithTemplate({
        to: selectedContact.email,
        templateKey: selectedTemplateKey,
        variablesJson: JSON.stringify(variables),
        crmContactId: selectedContact._id,
        relatedType: "crmContact",
        relatedId: String(selectedContact._id),
      });
      setNotice("Email da template messa in coda.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Errore invio da template");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">CRM</h1>
        <p className="text-muted-foreground mt-1">
          Schede cliente da form e quiz, timeline e invio email one-shot.
        </p>
      </div>

      {notice && (
        <div className="rounded-xl border border-leaf-200 bg-leaf-50 text-forest-900 px-4 py-3 text-sm">
          {notice}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Clienti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cerca nome, email o telefono"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm"
            >
              <option value="all">Tutti gli stati</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
              {contacts.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => setSelectedContactId(contact._id)}
                  className={`w-full text-left rounded-xl border p-3 transition-colors ${
                    selectedContactId === contact._id
                      ? "border-leaf-500 bg-leaf-50"
                      : "border-border bg-white hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <Badge variant="earth" size="sm">
                      {contact.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{contact.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Aggiornato {new Date(contact.lastInteractionAt).toLocaleString("it-IT")}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {!selectedContact ? (
            <Card>
              <CardContent className="py-14 text-center text-muted-foreground">
                <UserRoundPlus className="w-10 h-10 mx-auto mb-3 opacity-60" />
                Seleziona un cliente per aprire la scheda CRM.
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Scheda cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nome"
                      value={editing.name}
                      onChange={(e) => setEditing((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      label="Telefono"
                      value={editing.phone}
                      onChange={(e) => setEditing((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <div className="h-12 rounded-xl border border-input bg-muted/40 px-4 flex items-center text-sm">
                        <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                        {selectedContact.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Stato</label>
                      <select
                        value={editing.status}
                        onChange={(e) => setEditing((prev) => ({ ...prev, status: e.target.value }))}
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm"
                      >
                        {statusOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Tag (separati da virgola)"
                    value={editing.tags}
                    onChange={(e) => setEditing((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="es. preventivo, priorita-alta"
                  />

                  <Textarea
                    label="Note cumulative"
                    value={editing.notes}
                    onChange={(e) => setEditing((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={5}
                  />

                  <Button onClick={saveCard}>
                    <Save className="w-4 h-4 mr-2" />
                    Salva scheda
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Invio email dalla scheda cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Invia da template</label>
                      <select
                        value={selectedTemplateKey}
                        onChange={(e) => setSelectedTemplateKey(e.target.value)}
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm"
                      >
                        <option value="">Seleziona template</option>
                        {templates.map((template) => (
                          <option key={template._id} value={template.key}>
                            {template.name} ({template.key})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:self-end">
                      <Button variant="outline" onClick={sendTemplateEmail}>
                        <Send className="w-4 h-4 mr-2" />
                        Invia da template
                      </Button>
                    </div>
                  </div>

                  <Input
                    label="Subject one-shot"
                    value={manualSubject}
                    onChange={(e) => setManualSubject(e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Body one-shot (HTML rich)</label>
                    <RichHtmlEditor value={manualHtml} onChange={setManualHtml} minHeight={180} />
                  </div>

                  <Button onClick={sendManualEmail}>
                    <Send className="w-4 h-4 mr-2" />
                    Invia email one-shot
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Timeline attivita</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Aggiungi una nota operativa"
                    rows={3}
                  />
                  <Button variant="outline" onClick={addTimelineNote}>
                    Aggiungi nota
                  </Button>

                  <div className="space-y-2 pt-2">
                    {timeline.map((item) => (
                      <div key={item._id} className="rounded-lg border border-border bg-white px-3 py-2 text-sm">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-foreground">{item.title}</p>
                          <Badge variant="earth" size="sm">
                            {item.type}
                          </Badge>
                        </div>
                        {item.description && <p className="text-muted-foreground mt-1">{item.description}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(item.createdAt).toLocaleString("it-IT")}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Form ricevuti</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {(detail?.submissions ?? []).map((submission) => (
                      <div key={submission._id} className="rounded-lg border border-border p-2">
                        <p className="font-medium">{submission.subject || "Richiesta"}</p>
                        <p className="text-muted-foreground mt-1 line-clamp-3">{submission.message}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quiz/lead</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {(detail?.leads ?? []).map((lead) => (
                      <div key={lead._id} className="rounded-lg border border-border p-2">
                        <p className="font-medium">Score {lead.totalScore}</p>
                        <p className="text-muted-foreground mt-1">{lead.scorecardId}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email inviate</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {(detail?.deliveries ?? []).map((delivery) => (
                      <div key={delivery._id} className="rounded-lg border border-border p-2">
                        <p className="font-medium line-clamp-2">{delivery.subject}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant={delivery.status === "sent" ? "success" : "warning"} size="sm">
                            {delivery.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(delivery.createdAt).toLocaleString("it-IT")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
