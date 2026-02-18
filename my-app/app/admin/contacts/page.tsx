"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import {
  Search,
  Mail,
  Phone,
  Trash2,
  EyeOff,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { SlideUp } from "../../components/animations";
import { api } from "../../../convex/_generated/api";

export default function AdminContactsPage() {
  const contacts = useQuery(api.contacts.getAll) ?? [];
  const markAsRead = useMutation(api.contacts.markAsRead);
  const [filter, setFilter] = useState<"all" | "unread" | "replied">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.subject ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !contact.isRead) ||
      (filter === "replied" && contact.isReplied);
    return matchesSearch && matchesFilter;
  });

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <SlideUp>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Contatti
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestisci le richieste di contatto
            </p>
          </div>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            {([
              { key: "all", label: "Tutte" },
              { key: "unread", label: "Non lette" },
              { key: "replied", label: "Risposte" },
            ] as const).map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === f.key
                    ? "bg-sun-500 text-white"
                    : "bg-white border border-border hover:bg-muted"
                }`}
              >
                {f.label}
                {f.key === "unread" && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                    {contacts.filter((c) => !c.isRead).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <Input
              placeholder="Cerca messaggi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="grid gap-4">
          {filteredContacts.map((contact) => (
            <Card
              key={contact._id}
              variant="default"
              className={contact.isRead ? "" : "border-leaf-200 bg-leaf-50/30"}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leaf-400 to-leaf-500 flex items-center justify-center text-white font-bold">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold">{contact.name}</span>
                        {!contact.isRead && (
                          <Badge variant="primary" size="sm" className="ml-2">
                            Nuovo
                          </Badge>
                        )}
                        {contact.isReplied && (
                          <Badge variant="success" size="sm" className="ml-2">
                            Risposto
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${contact.email}`} className="hover:text-leaf-600">
                          {contact.email}
                        </a>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${contact.phone}`} className="hover:text-leaf-600">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    <Badge variant="earth" size="sm" className="mb-3">
                      {contact.serviceInterest || "Generico"}
                    </Badge>

                    <p className="text-foreground">
                      <span className="font-medium">{contact.subject}</span>
                      <br />
                      <span className="text-muted-foreground">{contact.message}</span>
                    </p>

                    <p className="text-xs text-muted-foreground mt-4">
                      Ricevuto il {formatDate(contact.createdAt)}
                    </p>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    {!contact.isReplied && (
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Rispondi
                      </Button>
                    )}
                    {!contact.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          markAsRead({ submissionId: contact._id })
                        }
                      >
                        <EyeOff className="w-4 h-4 mr-1" />
                        Segna come letto
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Elimina
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SlideUp>
    </div>
  );
}
