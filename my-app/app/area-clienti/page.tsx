"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import NextImage from "next/image";
import Link from "next/link";
import { api } from "../../convex/_generated/api";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { FadeIn, SlideUp } from "../components/animations";
import { useClientAuthContext } from "./ClientAuthContext";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Image as ImageIcon,
  ClipboardList,
  Sprout,
} from "lucide-react";

export default function AreaClientiLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, isCheckingAuth } = useClientAuthContext();
  const requestMagicLink = useMutation(api.clientAuth.requestMagicLink);

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/area-clienti/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    try {
      await requestMagicLink({ email: email.trim() });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (isCheckingAuth) return null;

  const features = [
    {
      icon: <ClipboardList className="w-6 h-6 text-leaf-500" />,
      title: "Il tuo Report Personale",
      desc: "Rivedi il profilo verde risultante dal quiz quando vuoi",
    },
    {
      icon: <ImageIcon className="w-6 h-6 text-leaf-500" />,
      title: "Rendering del Giardino",
      desc: "Ricevi gratuitamente rendering personalizzati da Andrea",
    },
    {
      icon: <Sprout className="w-6 h-6 text-leaf-500" />,
      title: "Foto del Tuo Giardino",
      desc: "Carica le foto per aiutarci nella progettazione",
    },
  ];

  return (
    <div className="min-h-screen bg-paper-50">
      {/* Header */}
      <div className="bg-forest-950 text-white">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center gap-3">
          <Link href="/">
            <NextImage
              src="/VS_logo_monogramma_bianco.svg"
              alt="VS"
              width={28}
              height={28}
            />
          </Link>
          <div className="w-px h-6 bg-forest-800" />
          <span className="font-display text-sm tracking-wide">
            Area Clienti
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Hero */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-leaf-500/10 flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-8 h-8 text-leaf-600" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-forest-950 mb-4 uppercase tracking-tight">
              La tua Area{" "}
              <span className="italic font-light text-leaf-700">
                Clienti
              </span>
            </h1>
            <p className="text-forest-800/70 font-body text-lg max-w-xl mx-auto leading-relaxed">
              Accedi gratuitamente per rivedere il tuo report, ricevere rendering
              personalizzati del tuo giardino e condividere le foto dello spazio
              verde.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Login Form */}
          <SlideUp delay={0.1}>
            <Card className="bg-white shadow-floating border-paper-100 rounded-[24px]">
              <CardContent className="p-8">
                {status === "sent" ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-leaf-500/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-leaf-600" />
                    </div>
                    <h2 className="font-display text-2xl text-forest-950 mb-3">
                      Controlla la tua email
                    </h2>
                    <p className="text-forest-800/70 font-body leading-relaxed">
                      Ti abbiamo inviato un link di accesso a{" "}
                      <strong className="text-forest-950">{email}</strong>.
                      Clicca il link nell&apos;email per accedere.
                    </p>
                    <p className="text-sm text-forest-800/50 mt-4">
                      Il link è valido per 30 minuti.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-leaf-600 hover:text-leaf-700 text-sm mt-6 underline"
                    >
                      Usa un&apos;altra email
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl text-forest-950 mb-2">
                      Accedi
                    </h2>
                    <p className="text-forest-800/60 font-body text-sm mb-6">
                      Inserisci l&apos;email usata per il quiz. Ti invieremo un
                      link di accesso.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-forest-800 mb-1.5"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest-800/30" />
                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="la-tua-email@esempio.it"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-paper-300 bg-paper-50 text-forest-950 placeholder:text-forest-800/30 focus:outline-none focus:ring-2 focus:ring-leaf-500/40 focus:border-leaf-500 transition-colors"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={status === "sending" || !email.trim()}
                        className="w-full bg-leaf-600 hover:bg-leaf-700 text-white font-bold uppercase tracking-wider px-8 py-3 rounded-xl shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "sending" ? (
                          "Invio in corso..."
                        ) : (
                          <>
                            Invia Link di Accesso
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>

                      {status === "error" && (
                        <p className="text-red-600 text-sm text-center">
                          Si è verificato un errore. Riprova.
                        </p>
                      )}
                    </form>

                    <p className="text-xs text-forest-800/40 mt-6 text-center">
                      Nessuna password necessaria. Riceverai un link sicuro via
                      email.
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </SlideUp>

          {/* Features */}
          <SlideUp delay={0.2}>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="bg-white border-paper-200/50 rounded-2xl shadow-soft"
                >
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-leaf-500/10 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-forest-950 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-forest-800/60 font-body text-sm leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SlideUp>
        </div>

        {/* Bottom note */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <p className="text-sm text-forest-800/50">
              Non hai ancora fatto il quiz?{" "}
              <Link
                href="/quiz"
                className="text-leaf-600 hover:text-leaf-700 underline"
              >
                Scopri il tuo profilo verde
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
