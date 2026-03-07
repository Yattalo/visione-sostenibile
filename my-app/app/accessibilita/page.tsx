import type { Metadata } from "next";
import Link from "next/link";
import { Accessibility, CircleCheck, Mail, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Accessibilita",
    description:
      "Dichiarazione di accessibilita, standard di riferimento e canale di segnalazione di Visione Sostenibile.",
    path: "/accessibilita",
  }),
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-paper-50">
      <section className="bg-forest-950 px-6 pb-20 pt-32 text-paper-50">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
            <Accessibility className="h-8 w-8 text-leaf-400" />
          </div>
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-leaf-400">
            Accessibilita
          </p>
          <h1 className="mt-3 font-display text-5xl leading-tight md:text-6xl">
            Dichiarazione di accessibilita
          </h1>
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-paper-300">
            Lavoriamo per rendere il sito comprensibile, navigabile da tastiera e
            fruibile con tecnologie assistive. Il riferimento operativo adottato e
            WCAG 2.1 livello AA, come recepito dallo standard europeo EN 301 549.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Card className="rounded-[28px] border-paper-200 bg-white">
            <CardContent className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-100">
                <CircleCheck className="h-6 w-6 text-leaf-700" />
              </div>
              <h2 className="font-display text-2xl text-forest-950">Cosa stiamo facendo</h2>
              <ul className="mt-5 space-y-3 font-body text-sm leading-relaxed text-forest-800/75">
                <li>Controllo del contrasto dei testi e degli elementi interattivi.</li>
                <li>Gestione del focus tastiera per form, menu e modali.</li>
                <li>Etichette leggibili per moduli, pulsanti e controlli di consenso.</li>
                <li>Riduzione del contenuto dipendente da sola animazione o solo colore.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-paper-200 bg-white">
            <CardContent className="p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sun-100">
                <TriangleAlert className="h-6 w-6 text-sun-700" />
              </div>
              <h2 className="font-display text-2xl text-forest-950">Stato attuale</h2>
              <p className="mt-5 font-body text-sm leading-relaxed text-forest-800/75">
                La conformita non e ancora certificata con audit indipendente completo. Questa
                pagina descrive l&apos;impegno corrente e serve anche come canale di feedback per
                segnalare eventuali barriere.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <Card className="rounded-[32px] border-paper-200 bg-paper-100">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                  <Mail className="h-5 w-5 text-leaf-700" />
                </div>
                <div>
                  <h2 className="font-display text-2xl text-forest-950">Segnala un problema</h2>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-forest-800/75">
                    Se incontri una barriera di accessibilita, scrivici indicando pagina,
                    problema riscontrato, tecnologia assistiva o dispositivo usato. Risponderemo
                    appena possibile con una soluzione o un contenuto alternativo.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4">
                    <a
                      href="mailto:visionesostenibile96@gmail.com?subject=Segnalazione%20accessibilita"
                      className="inline-flex items-center rounded-full bg-forest-950 px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-paper-50 transition-colors hover:bg-forest-900"
                    >
                      Scrivi a visionesostenibile96@gmail.com
                    </a>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center rounded-full border border-forest-950/15 px-5 py-3 font-sans text-xs uppercase tracking-[0.14em] text-forest-950 transition-colors hover:border-leaf-600 hover:text-leaf-700"
                    >
                      Privacy e dati personali
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
