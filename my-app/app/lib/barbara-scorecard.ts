export interface ScorecardProfile {
  id: string;
  name: string;
  description: string;
  strengths: string[];
  improvements: string[];
  recommendedServices: string[];
  ctaText: string;
}

export const scorecardProfiles: ScorecardProfile[] = [
  {
    id: "contemplativo",
    name: "Contemplativo",
    description:
      "Cerchi uno spazio calmo, con ritmo lento e poca manutenzione quotidiana. Per funzionare davvero servono scelte semplici su suolo, ombra e irrigazione, perche la tranquillita si costruisce con un sistema stabile.",
    strengths: [
      "Sensibilita per il comfort e la qualita degli spazi",
      "Buona predisposizione a scegliere meno elementi ma migliori",
      "Uso regolare del giardino in momenti di pausa reale",
    ],
    improvements: [
      "Ridurre aree ad alta sete nelle zone piu esposte",
      "Creare un piano di manutenzione minimo ma costante",
      "Riorganizzare i percorsi per usare meglio ombra e ventilazione",
    ],
    recommendedServices: [
      "progettazione-giardini",
      "rigenerazione-suolo",
      "irrigazione-smart",
      "manutenzione-programmata",
    ],
    ctaText:
      "Partiamo da un check-up e ti mostriamo quali due interventi semplificano subito gestione e consumi.",
  },
  {
    id: "sostenibile",
    name: "Sostenibile",
    description:
      "Vuoi ridurre sprechi idrici e interventi inutili, senza perdere qualita estetica. Il profilo e forte, ma per consolidarlo servono misure tecniche e monitoraggio, perche i buoni intenti da soli non stabilizzano il giardino.",
    strengths: [
      "Attenzione a biodiversita e qualita del suolo",
      "Disponibilita a investire in soluzioni durevoli",
      "Interesse per decisioni motivate e trasparenti",
    ],
    improvements: [
      "Misurare consumi e resa dell'irrigazione per zone",
      "Pianificare interventi stagionali con priorita tecniche",
      "Evitare acquisti spot di piante non coerenti col microclima",
    ],
    recommendedServices: [
      "rigenerazione-suolo",
      "irrigazione-smart",
      "manutenzione-programmata",
      "biopiscine",
    ],
    ctaText:
      "Richiedi una diagnosi tecnica: definiamo cosa mantenere, cosa correggere e con che ordine operativo.",
  },
  {
    id: "familiare",
    name: "Familiare",
    description:
      "Lo spazio esterno deve essere sicuro, pratico e pronto all'uso ogni settimana. Questo richiede percorsi solidi, ombre utili e manutenzione prevedibile, perche con bambini o animali le soluzioni fragili diventano presto un problema.",
    strengths: [
      "Visione concreta sull'uso quotidiano del giardino",
      "Priorita chiare su sicurezza e comfort",
      "Disponibilita a lavorare per fasi se il risultato e affidabile",
    ],
    improvements: [
      "Separare zone gioco, relax e passaggio per evitare conflitti",
      "Inserire illuminazione funzionale per uso serale",
      "Ridurre superfici difficili da mantenere in autonomia",
    ],
    recommendedServices: [
      "realizzazione-riqualificazione",
      "pavimentazioni-percorsi",
      "illuminazione-esterna",
      "manutenzione-programmata",
    ],
    ctaText:
      "Ti proponiamo un piano a step che mette prima sicurezza e fruibilita, poi estetica e dettagli.",
  },
  {
    id: "rappresentativo",
    name: "Rappresentativo",
    description:
      "Il verde deve comunicare cura e affidabilita verso ospiti, clienti o residenti. Per ottenere questo risultato serve regia unica e continuita operativa, perche l'immagine si perde quando i fornitori lavorano senza coordinamento.",
    strengths: [
      "Attenzione elevata alla qualita percepita",
      "Capacita di pianificare investimenti su obiettivi chiari",
      "Interesse per standard e controllo dei tempi",
    ],
    improvements: [
      "Definire responsabilita unica su progetto e manutenzione",
      "Stabilire KPI semplici: ordine, sicurezza, continuita",
      "Programmare interventi specialistici prima dei picchi stagionali",
    ],
    recommendedServices: [
      "progettazione-giardini",
      "realizzazione-riqualificazione",
      "potature-tree-climbing",
      "arredi-outdoor",
      "piscine",
    ],
    ctaText:
      "Prenota una call operativa: impostiamo priorita, cronoprogramma e responsabilita in un unico flusso.",
  },
];
