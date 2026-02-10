"use client";

import Link from "next/link";
import {
  FileText,
  Image,
  MessageSquare,
  Star,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp } from "../components/animations";

const stats = [
  {
    title: "Servizi Attivi",
    value: "12",
    icon: FileText,
    color: "from-primary-500 to-primary-600",
    href: "/admin/services",
  },
  {
    title: "Immagini Galleria",
    value: "48",
    icon: Image,
    color: "from-earth-500 to-earth-600",
    href: "/admin/gallery",
  },
  {
    title: "Recensioni Approvate",
    value: "24",
    icon: Star,
    color: "from-yellow-500 to-yellow-600",
    href: "/admin/reviews",
  },
  {
    title: "Messaggi Ricevuti",
    value: "8",
    icon: MessageSquare,
    color: "from-blue-500 to-blue-600",
    href: "/admin/contacts",
  },
];

const recentContacts = [
  {
    id: "1",
    name: "Marco Rossi",
    email: "marco@email.com",
    subject: "Richiesta preventivo giardino",
    service: "Progettazione Giardini",
    date: "10 Feb 2026",
    isRead: false,
  },
  {
    id: "2",
    name: "Laura Bianchi",
    email: "laura@email.com",
    subject: "Informazioni manutenzione",
    service: "Manutenzioni",
    date: "9 Feb 2026",
    isRead: false,
  },
  {
    id: "3",
    name: "Giuseppe Verdi",
    email: "giuseppe@email.com",
    subject: "Richiesta.call",
    service: "Illuminazione Esterni",
    date: "8 Feb 2026",
    isRead: true,
  },
];

const recentReviews = [
  {
    id: "1",
    author: "Anna M.",
    rating: 5,
    text: "Servizio eccellente, molto professionali!",
    isApproved: false,
  },
  {
    id: "2",
    author: "Paolo L.",
    rating: 5,
    text: "Ottimo lavoro, giardino splendente!",
    isApproved: true,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <SlideUp>
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Panoramica del tuo sito web
          </p>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link key={stat.title} href={stat.href}>
              <Card variant="elevated" hover className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="font-display text-3xl font-bold text-foreground mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4 text-primary-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% questo mese</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </SlideUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SlideUp delay={0.2}>
          <Card variant="default">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary-600" />
                Richieste Recenti
              </CardTitle>
              <Link href="/admin/contacts">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary-50">
                  Vedi tutti
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Badge>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts.slice(0, 3).map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg border ${
                      contact.isRead
                        ? "bg-white border-border"
                        : "bg-primary-50 border-primary-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {contact.name}
                          </span>
                          {!contact.isRead && (
                            <Badge variant="primary" size="sm">
                              Nuovo
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.subject}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="earth" size="sm">
                            {contact.service}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {contact.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SlideUp>

        <SlideUp delay={0.3}>
          <Card variant="default">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Recensioni da Moderare
              </CardTitle>
              <Link href="/admin/reviews">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary-50">
                  Vedi tutti
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Badge>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>
                      {review.isApproved ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    {!review.isApproved && (
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-500 transition-colors">
                          Approva
                        </button>
                        <button className="px-3 py-1 text-sm border border-border rounded-lg hover:bg-muted transition-colors">
                          Rifiuta
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </SlideUp>
      </div>

      <SlideUp delay={0.4}>
        <Card variant="default">
          <CardHeader>
            <CardTitle>Azioni Rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Aggiungi Servizio", href: "/admin/services/new", icon: FileText },
                { label: "Aggiungi Foto", href: "/admin/gallery/new", icon: Image },
                { label: "Rispondi ai Messaggi", href: "/admin/contacts", icon: MessageSquare },
                { label: "Modera Recensioni", href: "/admin/reviews", icon: Star },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-primary-50 border border-border hover:border-primary-200 transition-all group"
                >
                  <action.icon className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </SlideUp>
    </div>
  );
}
