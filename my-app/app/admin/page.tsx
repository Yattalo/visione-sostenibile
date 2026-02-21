"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import {
  FileText,
  Image,
  MessageSquare,
  Mail,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { SlideUp } from "../components/animations";
import { api } from "../../convex/_generated/api";

export default function AdminDashboard() {
  const services = useQuery(api.services.getAll) ?? [];
  const gallery = useQuery(api.gallery.getAll) ?? [];
  const reviews = useQuery(api.reviews.getAll) ?? [];
  const contacts = useQuery(api.contacts.getAll) ?? [];
  const crmContacts = useQuery(api.crm.listContacts, { limit: 500 }) ?? [];
  const deliveries = useQuery(api.emails.listDeliveries, { limit: 500 }) ?? [];

  const approvedReviews = reviews.filter((review) => review.isApproved);
  const pendingReviews = reviews.filter((review) => !review.isApproved);
  const recentContacts = contacts.slice(0, 3);
  const recentReviews = reviews.slice(0, 2);

  const stats = [
    {
      title: "Servizi Attivi",
      value: services.length.toString(),
      icon: FileText,
      color: "from-leaf-500 to-leaf-600",
      href: "/admin/services",
    },
    {
      title: "Immagini Galleria",
      value: gallery.length.toString(),
      icon: Image,
      color: "from-leaf-500 to-leaf-600",
      href: "/admin/gallery",
    },
    {
      title: "Recensioni Approvate",
      value: approvedReviews.length.toString(),
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      href: "/admin/reviews",
    },
    {
      title: "Messaggi Ricevuti",
      value: contacts.length.toString(),
      icon: MessageSquare,
      color: "from-blue-500 to-blue-600",
      href: "/admin/contacts",
    },
    {
      title: "Contatti CRM",
      value: crmContacts.length.toString(),
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
      href: "/admin/crm",
    },
    {
      title: "Email Tracciate",
      value: deliveries.length.toString(),
      icon: Mail,
      color: "from-indigo-500 to-indigo-600",
      href: "/admin/emails",
    },
  ];

  const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

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
          {stats.map((stat) => (
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
                  <div className="flex items-center gap-1 mt-4 text-leaf-600 text-sm">
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
                <MessageSquare className="w-5 h-5 text-leaf-600" />
                Richieste Recenti
              </CardTitle>
              <Link href="/admin/contacts">
                <Badge variant="outline" className="cursor-pointer hover:bg-leaf-50">
                  Vedi tutti
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Badge>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts.slice(0, 3).map((contact) => (
                  <div
                    key={contact._id}
                    className={`p-4 rounded-lg border ${
                      contact.isRead
                        ? "bg-white border-border"
                        : "bg-leaf-50 border-leaf-200"
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
                            {contact.serviceInterest || "Generico"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(contact.createdAt)}
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
                <Badge variant="outline" className="cursor-pointer hover:bg-leaf-50">
                  Vedi tutti
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Badge>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.authorName}</span>
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
                        <button className="px-3 py-1 text-sm bg-sun-500 text-white rounded-lg opacity-60 cursor-not-allowed">
                          Approva
                        </button>
                        <button className="px-3 py-1 text-sm border border-border rounded-lg opacity-60 cursor-not-allowed">
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
                  { label: "Gestisci Servizi", href: "/admin/services", icon: FileText },
                  { label: "Gestisci Galleria", href: "/admin/gallery", icon: Image },
                  { label: "Rispondi ai Messaggi", href: "/admin/contacts", icon: MessageSquare },
                  { label: "Apri CRM", href: "/admin/crm", icon: Users },
                  { label: "Template Email", href: "/admin/emails", icon: Mail },
                  { label: `Modera Recensioni (${pendingReviews.length})`, href: "/admin/reviews", icon: Star },
                ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-leaf-50 border border-border hover:border-leaf-200 transition-all group"
                >
                  <action.icon className="w-6 h-6 text-leaf-600 group-hover:scale-110 transition-transform" />
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
