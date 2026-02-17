# CLAUDE.md - Foundation Docs (Progressive Disclosure)

> Sintesi esecutiva dei 5 documenti BMAD per Visione Sostenibile.
> Per dettagli completi, leggere i rispettivi .md nella stessa cartella.

## Quick Reference

| Doc | Autore BMAD | File |
|-----|-------------|------|
| Project Brief | Mary (Analyst) | `Project Brief.md` |
| PRD | John (PM) | `PRD.md` |
| UI/UX Spec | Sally (UX Expert) | `UI_UX Specification.md` |
| Frontend Architecture | Winston (Architect) | `Frontend Architecture.md` |
| Prompt Claude Code | Sarah (PO) | `Prompt per Claude Code.md` |

## Visione Strategica

Trasformare il sito esistente in una **piattaforma di acquisizione lead premium** basata su fiducia e valore consulenziale. Approccio **evolutivo, non rivoluzionario**.

### KPI Target
- **+30% lead generation** (form contatti semplificato)
- **Brand Authority** allineata a benchmark True Green Eco Landscaping
- **Solidita tecnica**: eliminare placeholder, migrare dati statici su Convex

### Target Audience
- Proprietari di ville/agriturismi in **Piemonte/Lombardia**
- Amanti del design naturale e impatto zero

## Nuova Palette: High-Contrast Nature

La palette BMAD sostituisce la precedente con un sistema a layer materici:

| Layer | Nome | Hex | Uso |
|-------|------|-----|-----|
| 0 | Paper Canvas | `#F2F0EC` | Base sito, texture carta riciclata (noise SVG 3%) |
| 1 | Deep Forest | `#0B1E0E` | Tipografia bold, sfondi immersivi, autorita |
| 2a | Leaf Green | `#22582C` | Bordi card, icone |
| 2b | Leaf Green (bright) | `#4FA45A` | Hover states, accenti crescita |
| 3 | Sun Accent | `#EAB831` | **Solo CTA** - se e giallo, l'utente deve cliccare |

> **Nota**: La palette attuale (moss/terracotta/cream/charcoal) resta nel codice finche non viene migrata. La nuova palette High-Contrast Nature e il target.

## Nuova Tipografia: Walkway Family

Font files gia presenti in `public/walkway/`. Sostituisce Playfair Display + Quicksand.

| Elemento | Variante | Size | Dettagli |
|----------|----------|------|----------|
| H1 Hero | Extra Bold | 64-80px | line-height 1.1, letter-spacing -0.02em |
| H2 Sezioni | Bold | 48px | line-height 1.2 |
| H3 Card | Semi Bold | 24px | - |
| Body | Regular | 18px | line-height 1.6 per leggibilita su Paper Canvas |
| Micro-copy/Tags | Oblique Black | 12px | ALL CAPS |
| Enfasi/Citazioni | Oblique (Regular/Bold) | - | Suggerisce proiezione futura |

## Feature Chiave: Micro-funnel + Web-Scorecard

### Flusso
1. Quiz interattivo (tiles materiche, no radio/checkbox standard)
2. Progress bar Leaf Green (effetto "pianta che cresce")
3. Invio risposte a Convex al completamento
4. Generazione ID univoco scorecard
5. Invio link `/scorecard/[id]` via email (Resend)
6. Report page Next.js riutilizza componenti UI del sito
7. CSS `@media print` per "Salva come PDF" (approccio KISS, zero server-side PDF)

### Schema Dati Necessario
- Tabella `leads` in Convex: risposte quiz, contatto, scorecard ID
- Admin editor per testi consigli scorecard

## Componenti UI da Standardizzare

### Header Chameleon
- Trasparente con logo Paper Canvas inizialmente
- Dopo 80px scroll: Deep Forest (su sezioni chiare) o viceversa
- CTA header persistente ("Richiedi preventivo")

### Effetto Germoglio (Hover)
- Card: translateY(-4px) + ombra #22582C 10% opacity, 400ms cubic-bezier
- Button Sun Accent: scale(1.05) + bagliore interno luce solare

### Z-Index System
- Header: 100
- Modali Quiz: 200
- Tooltip: 300

### Spacing System
Multipli di 8px: 8, 16, 24, 48, 64, 96

## Architettura Dati

### Tabelle Convex Esistenti (9)
services, projects, blogPosts, reviews, contactSubmissions, gallery, pages, shareEvents, settings

### Tabelle da Aggiungere
- `leads` (risposte quiz + scorecard ID)

### Migrazione Necessaria
- Blog: da `app/lib/blog.ts` (statico) a tabella `blogPosts` (Convex)
- Progetti: da `app/lib/progetti-data.ts` (statico) a tabella `projects` (Convex)
- Le tabelle Convex **esistono gia nello schema** ma i dati vivono ancora nei file statici

## Admin Panel

### Lacuna Critica
**Nessuna autenticazione implementata.** Soluzione BMAD: Convex Auth.

### Funzionalita da Abilitare
- Moderazione recensioni (approve/reject)
- CRUD blog e progetti via Convex
- Editor testi scorecard con anteprima live
- Notifica real-time nuovi lead

## SEO & Performance

- JSON-LD strutturato per blog e progetti
- Lighthouse score > 90
- WCAG 2.1 AA (contrasti elevati su Paper Canvas)
- Immagini: next/image con placeholder Leaf Green
- Dark mode: non prevista (brand basato su solarita Paper Canvas)

## Roadmap (PRD Approvato)

1. **Sprint 1**: Setup Architettura, Auth, Design Tokens (Walkway + Palette)
2. **Sprint 2**: Migrazione dati statici su Convex, CRUD Admin
3. **Sprint 3**: Quiz interattivo + Web-Scorecard + CSS Print
4. **Sprint 4**: SEO, test usabilita, Go-Live

## Guardrail (NON rompere)

- Non cambiare linguaggio visuale (no look corporate freddo)
- Non basare leggibilita su hover (mobile-first)
- Non introdurre pattern diversi per pagina: un unico sistema
- Approccio evolutivo, non rivoluzionario
- KISS & DRY: CSS Print per Scorecard, non server-side PDF
- Convex First: eliminare dipendenze da file statici/JSON locali
