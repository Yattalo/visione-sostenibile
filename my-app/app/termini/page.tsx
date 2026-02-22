import type { Metadata } from "next";
import { Badge } from "../components/ui/Badge";
import { buildMetadata } from "../lib/seo-metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Termini e Condizioni",
    description: "Termini e condizioni di utilizzo del sito Visione Sostenibile.",
    path: "/termini",
  }),
};

export default function TerminiPage() {
  return (
    <div className="min-h-screen bg-paper-50 pt-24 pb-20">
      <section className="max-w-4xl mx-auto px-6">
        <Badge className="bg-leaf-100 text-leaf-700 mb-4">Termini</Badge>
        <h1 className="font-display text-4xl text-forest-950 mb-8">
          Termini e Condizioni
        </h1>

        <div className="space-y-8 font-body text-forest-800 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl text-forest-950 mb-3">
              1. Oggetto
            </h2>
            <p>
              I presenti termini disciplinano l&apos;uso del sito web di Visione
              Sostenibile e l&apos;accesso ai contenuti informativi relativi ai
              servizi offerti.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-forest-950 mb-3">
              2. Uso del sito
            </h2>
            <p>
              L&apos;utente si impegna a utilizzare il sito in modo lecito e nel
              rispetto della normativa vigente, senza arrecare danni al servizio
              o ad altri utenti.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-forest-950 mb-3">
              3. Proprietà intellettuale
            </h2>
            <p>
              Contenuti, testi, marchi, grafiche e materiali presenti sul sito
              sono di proprietà di Visione Sostenibile o dei rispettivi titolari
              e non possono essere riutilizzati senza autorizzazione.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-forest-950 mb-3">
              4. Limitazione di responsabilità
            </h2>
            <p>
              Le informazioni pubblicate sono fornite a scopo informativo.
              Visione Sostenibile non risponde di eventuali danni derivanti
              dall&apos;uso improprio del sito o da indisponibilità temporanee.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-forest-950 mb-3">
              5. Contatti
            </h2>
            <p>
              Per informazioni sui presenti termini:{" "}
              <a
                href="mailto:info@visionesostenibile.it"
                className="text-leaf-600 hover:text-leaf-700"
              >
                info@visionesostenibile.it
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
