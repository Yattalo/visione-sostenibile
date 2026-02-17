# CONTEXT INJECTION & TASK PLANNING PROMPT

**Role:** Senior Full Stack Architect & Tech Lead

**Context:** Progetto \"Visione Sostenibile\" - Evoluzione verso
piattaforma Premium.

## 1. MISSIONE

Il tuo obiettivo è analizzare i documenti di design, l\'attuale codebase
e lo storico git per generare un piano di task atomiche e
interdipendenti. Devi colmare il gap tra il prototipo esistente e la
nuova visione \"High-Contrast Nature\".

## 2. DOCUMENTAZIONE DI RIFERIMENTO (Sorgenti di Verità)

Analizza i seguenti file nel workspace per allinearti alla visione:

- docs/project-brief-visione-sostenibile.md: Visione strategica e KPI.

- docs/prd-visione-sostenibile.md: Requisiti funzionali (Auth,
  Web-Scorecard, Convex Migration).

- docs/ux-spec-visione-sostenibile.md: Design System (Walkway Font,
  Paper Canvas #F2F0EC, Sun Accent #EAB831).

- docs/brand-vision-design-direction.md: Filosofia \"Natura Progettata\"
  e tono di voce.

- docs/frontend-architecture-visione-sostenibile.md: Stack tecnico
  (Next.js 16, Convex, Tailwind v4, Web-to-Print).

## 3. ANALISI STATO ATTUALE

Prima di proporre task:

1.  **Codebase Scan:** Esamina la struttura delle cartelle, i componenti
    esistenti e i file di configurazione (Tailwind, Next.js).

2.  **Git History Scan:** Analizza i commit degli ultimi 7 giorni per
    capire quali componenti sono stati toccati, quali bug sono stati
    risolti e cosa è rimasto \"in sospeso\" o \"hardcoded\".

3.  **Task Audit:** Leggi il file delle task attuali (es. tasks.json o
    .todo) e confrontalo con il nuovo PRD.

## 4. PRINCIPI ARCHITETTURALI MANDATORI

- **KISS & DRY:** Evita over-engineering. Per la Scorecard usa CSS Print
  Media, non server-side PDF generators.

- **Convex First:** Rimuovi ogni dipendenza da file statici/JSON locali
  per Blog e Progetti.

- **Tailwind v4 tokens:** Implementa i nuovi colori e la Walkway Family
  come variabili CSS core.

## 5. OUTPUT RICHIESTO

Genera una lista di Task strutturata secondo questo formato:

### \[ID-TASK\] Titolo Task

- **Descrizione:** Cosa fare tecnicamente.

- **Interdipendenze:** Quali task devono essere completate prima (es.
  \"Richiede migrazione Schema Convex\").

- **File Coinvolti:** Lista dei file da creare o modificare.

- **Alignment Check:** Come questa task rispetta la \"Brand Vision\"
  (es. \"Uso di Walkway Oblique per enfasi\").

- **Priorità:** (P0: Bloccante, P1: Evolutivo, P2: Refinement).

## 6. AZIONE IMMEDIATA

Inizia eseguendo uno scan dei commit dell\'ultima settimana e riassumi
brevemente cosa è stato fatto, poi procedi con la generazione del
backlog. Non iniziare a scrivere codice finché non hai confermato la
comprensione del flusso \"Web-to-Print\" per la scorecard.
