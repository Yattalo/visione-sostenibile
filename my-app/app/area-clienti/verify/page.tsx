"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import NextImage from "next/image";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useClientAuthContext } from "../ClientAuthContext";
import { CheckCircle2, XCircle, Sprout } from "lucide-react";

export default function VerifyMagicLinkPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setSession } = useClientAuthContext();
  const verifyMutation = useMutation(api.clientAuth.verifyMagicLink);

  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setErrorMessage("Link non valido — token mancante.");
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const result = await verifyMutation({ token: token! });

        if (cancelled) return;

        if (result.success && result.token) {
          setSession(result.token);
          setStatus("success");
          // Redirect to dashboard after brief success feedback
          setTimeout(() => {
            if (!cancelled) router.replace("/area-clienti/dashboard");
          }, 1500);
        } else {
          setStatus("error");
          setErrorMessage(
            result.error ?? "Verifica fallita. Richiedi un nuovo link."
          );
        }
      } catch {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage("Errore durante la verifica. Riprova.");
        }
      }
    }

    verify();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-paper-50">
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

      <div className="max-w-md mx-auto px-6 py-20">
        <Card className="bg-white shadow-floating border-paper-100 rounded-[24px]">
          <CardContent className="p-8 text-center">
            {status === "verifying" && (
              <>
                <Sprout className="w-12 h-12 text-leaf-500 animate-pulse mx-auto mb-5" />
                <h1 className="font-display text-2xl text-forest-950 mb-3">
                  Verifica in corso...
                </h1>
                <p className="text-forest-800/60 font-body">
                  Stiamo verificando il tuo link di accesso.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="w-16 h-16 rounded-full bg-leaf-500/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-leaf-600" />
                </div>
                <h1 className="font-display text-2xl text-forest-950 mb-3">
                  Accesso riuscito!
                </h1>
                <p className="text-forest-800/60 font-body">
                  Benvenuto nella tua Area Clienti. Reindirizzamento...
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="font-display text-2xl text-forest-950 mb-3">
                  Link non valido
                </h1>
                <p className="text-forest-800/60 font-body mb-6">
                  {errorMessage}
                </p>
                <Link href="/area-clienti">
                  <Button className="bg-leaf-600 hover:bg-leaf-700 text-white font-bold uppercase tracking-wider px-8 py-3 rounded-xl shadow-medium">
                    Richiedi nuovo link
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
