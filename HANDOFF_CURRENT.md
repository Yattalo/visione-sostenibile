# Handoff - Visione Sostenibile

**Data:** 12 febbraio 2026 | **Stato generale:** ~75% completato

---

## Stato del Progetto in Sintesi

Il sito showcase per Visione Sostenibile (azienda giardinaggio, Roma) ha una base tecnica solida ma manca il collegamento tra frontend e backend, e il contenuto non riflette ancora pienamente l'identita del brand raccolta dal cliente.

### Stack

Next.js 16 + Convex + Tailwind v4 + Framer Motion + React 19 (con React Compiler). Package manager: pnpm. App in `my-app/`.

---

## Cosa Funziona

| Area | Stato |
|------|-------|
| Design system (4 palette, tipografia, animazioni) | Completo |
| 17 pagine pubbliche + 7 admin | UI completa |
| Backend Convex (7 tabelle, tutte le CRUD) | Completo |
| Form contatti multi-step | Connesso a Convex |
| Admin dashboard + listing | Connesso a Convex |
| Deploy config (Vercel mil1 + Convex cloud) | Pronto |

## Cosa NON Funziona Ancora

| Area | Problema |
|------|----------|
| Pagine pubbliche (servizi, blog, recensioni) | Usano dati statici hardcoded, NON Convex |
| Admin CRUD (crea/modifica/elimina) | Bottoni mock, mutations non collegate |
| Autenticazione admin | Inesistente |
| Upload immagini | Non implementato |
| SEO (meta tags) | Quasi vuoti |
| Email notifiche contatti | Non implementato |
| 7 file modificati non committati | Lint fixes in sospeso |
| Repo nidificate (.git in root E in my-app/) | Da unificare |

---

## Analisi Questionario Brand vs Sito Attuale

Ho verificato il CSV del questionario identita visiva compilato dal cliente. Ecco il confronto:

### RECEPITO nel sito

| Richiesta cliente | Implementazione |
|---|---|
| **Verde nelle sue declinazioni** | Palette `moss` (#4b562e) come colore brand primario, declinata in 11 sfumature |
| **Rete di professionisti specializzati** (differenziatore) | Pagina Chi Siamo menziona "agronomi, architetti del paesaggio, giardinieri esperti e tecnici specializzati" |
| **Biodinamica** | Badge "Biodinamica Certificata" nell'hero, certificazione nella pagina Qualita |
| **Target 45-65+, status medio-alto** | Tipografia elegante (Cormorant Garamond), toni caldi, design raffinato coerente col target |
| **Stile equilibrato** (voto 6/10) | Il design bilancia editoriale/classico con elementi moderni |

### PARZIALMENTE RECEPITO

| Richiesta cliente | Problema |
|---|---|
| **4 elementi biodinamici (Fuoco, Acqua, Aria, Terra)** | Homepage ha solo 3 filosofie: "Luce", "Acqua", "Biodiversita". Mancano Fuoco, Aria, Terra. Il concept non e quello richiesto |
| **Cura dei dettagli e competenza** (differenziatore) | Comunicato in modo generico, mai come USP esplicita |

### NON RECEPITO - Gap Critici

| Richiesta cliente | Stato nel sito |
|---|---|
| **Payoff/slogan** - "Si, assolutamente" ne vuole uno | **ASSENTE.** "Il Verde che Vive" nell'hero e un titolo, non un payoff deliberato e validato col cliente |
| **Parole chiave: Innovazione, Sostenibilita, Creativita, Qualita, Affidabilita** | "Innovazione" non appare MAI nel sito. "Modernita" e "Solidita" (emozioni richieste) idem |
| **Logo con 4 elementi biodinamici** | Nessun logo creato/integrato. Il vecchio concept (Fuoco, Acqua, Aria, Terra) non e stato ripreso |
| **"Che sia visibile e non passi inosservato"** (mission del logo) | Nessun lavoro sul logo |
| **Certificazioni reali** (PDF gia caricati su Drive) | Pagina Qualita usa dati PLACEHOLDER inventati (ISO 9001 Bureau Veritas, Premio Regione Lazio ecc.) |

---

## Decisioni Architetturali Pendenti

1. **Strategia Convex**: Collegare tutte le pagine pubbliche a Convex o mantenere l'approccio ibrido statico?
2. **Scope Admin**: Produzione con auth reale o demo-only?
3. **Struttura repo**: Unificare i due .git o monorepo?

## Prossimi Passi Prioritari

### P0 - Bloccanti per il cliente

1. **Definire il payoff** con il cliente e integrarlo nell'hero
2. **Recuperare le certificazioni reali** dal Drive e sostituire i placeholder nella pagina Qualita
3. **Riallineare i 4 elementi biodinamici** (Fuoco, Acqua, Aria, Terra) nella sezione filosofia della homepage
4. **Inserire le keyword brand** (Innovazione, Affidabilita, ecc.) nei copy delle pagine chiave

### P1 - Tecnici

5. Collegare le pagine pubbliche a Convex (le query backend esistono gia)
6. Collegare le mutations CRUD nell'admin
7. Committare i lint fixes pendenti
8. Implementare auth admin (anche basica)

### P2 - Polish

9. SEO meta tags per tutte le pagine
10. Email notifiche per form contatti
11. Upload immagini
12. Unificare la struttura repo

---

## File Chiave

| File | Descrizione |
|------|-------------|
| `my-app/app/page.tsx` | Homepage (501 righe, sezione filosofia da riallineare) |
| `my-app/app/qualita/page.tsx` | Certificazioni PLACEHOLDER da sostituire |
| `my-app/app/chi-siamo/page.tsx` | Pagina Chi Siamo (parzialmente allineata) |
| `my-app/app/globals.css` | Design system tokens |
| `my-app/app/lib/static-data.ts` | Dati statici fallback (12 servizi, 5 recensioni) |
| `my-app/convex/schema.ts` | Schema completo, 7 tabelle |

---

*Il sito ha un'architettura solida e un design curato. Il gap principale non e tecnico ma di contenuto: il brand del cliente non e ancora stato tradotto fedelmente nel sito.*
