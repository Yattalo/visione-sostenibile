# Session Handoff — Visione Sostenibile

## Stato attuale (fine 2026-03-09)
- **Branch**: `feature/vs-wave16-copy` — 33 commit ahead di origin/main, NON pushato
- **Task System**: 109 task totali, 59 done (54%), 29 todo, 17 blocked
- **Build**: `npx tsc --noEmit` OK su tutti i commit
- **Working mode**: orchestratore + subagenti paralleli

## Completato in questa sessione (3 task)

1. **C16** `3eef28c` — Quiz CTAs nel blog: `QuizCTA variant="inline"` mid-article + `variant="banner"` end-article, linkano a /quiz
2. **P1** `18f5a93` — Contatti multi-step wizard: 3 step (chi sei → progetto → messaggio), Zod v4 per-step validation, AnimatePresence directional slides, step indicator, success state "24 ore"
3. **P2** `3b3e7dc` — Chi Siamo BMAD: 4 pillar (sostenibilita/biodinamica/qualita/passione), founder bio con siteConfig, outcomes section "cosa cambia", dark story section con stats

## Cumulativo branch (11 task in 3 sessioni)

| Sessione | Task |
|----------|------|
| 1 (seo-team) | VS-11 reviews category, VS-24 blog SEO, VS-10 team bios, C20 blog H2 questions + VS-6 copy (7 commit) |
| 2 (seo-snippet) | C21 quick answers 40-60w, C22 question H2s services+blog, MON-05 site-config |
| 3 (page-ux-bmad) | C16 blog quiz CTAs, P1 contatti multi-step, P2 chi-siamo BMAD |

## Modifiche non committate
```
 M docs/next-session-prompt.md   (questo handoff)
?? Barbara_quiz_copy/            (doc originali Barbara — lasciare fuori da git)
```

## Prossimi passi (prioritized)

| # | Cosa | Perche | Effort |
|---|------|--------|--------|
| 1 | **FE4**: Redesign Homepage BMAD | Critical priority. Hero + trust numbers + outcome service cards + CTA quiz | 8h |
| 2 | **FE5**: Redesign Services pages | Benefit-driven cards listing + rich detail page (hero, FAQ, gallery) | 6h |
| 3 | **P3**: Qualita page content reale | Certificazioni, trust badges, garanzie operative | 3h |
| 4 | **MON-04**: Popolare libreria media Convex | Asset foto/video per gallery e servizi, script import | 2h |
| 5 | **FE6**: Redesign Projects portfolio | Filtri categoria, card progetto migliorate | 5h |
| 6 | **VS-20**: Collabora con Noi page + form | Partner recruiting, feature richiesta dal cliente | 6h |

## Contesto per il prossimo agente

### Strategia branch
- **NON pushare su main**. Tutto resta su `feature/vs-wave16-copy`
- Merge fast-forward quando l'utente da OK per staging
- Main allineato a origin/main

### Pagine aggiornate in 3 sessioni
- `/blog/[slug]` — H2 domande, quick answers 40-60w, QuickAnswerSection, quiz CTAs inline+banner
- `/servizi/[slug]` — QuickAnswerSection + questionH2 per 5 servizi
- `/contatti` — multi-step wizard 3 fasi con Zod v4 + AnimatePresence (sostituisce vecchio form 5-step)
- `/chi-siamo` — 4 pillar BMAD, founder bio siteConfig, outcomes, dark story section
- Tutte le pagine copy allineate a doc Barbara (VS-6)

### Componenti nuovi/modificati
- `QuizCTA` — 4 varianti (sidebar, inline, compact, banner)
- `QuickAnswerSection` — box quick answer con H2 domanda
- `TeamSection` — 18 membri con competenze + personalStatement
- `site-config.ts` — dati centralizzati azienda (MON-05)

### Gotcha
- `npx convex dev --once` fallisce senza `CLERK_JWT_ISSUER_DOMAIN` su Convex Dashboard (VS-H5, human task)
- Badge non supporta `onClick` — wrappare in `<button>`
- Zsh: quotare path con brackets `'app/blog/[slug]/page.tsx'`
- Task list JSON da Convex >65K chars — serve recovery parser con `rfind`
- Build warning su `/_not-found` (useSearchParams senza Suspense) — pre-esistente

### Preferenze utente
- NO push su main, restare sul branch
- Vuole subagenti paralleli, orchestratore dall'alto
- Handoff a fine ciclo, poi clear e fresh context

## File chiave

| File | Scopo |
|------|-------|
| `my-app/app/contatti/page.tsx` | Multi-step wizard 3 fasi (P1) |
| `my-app/app/chi-siamo/page.tsx` | BMAD 4 pillar + founder bio (P2) |
| `my-app/app/blog/BlogPostClient.tsx` | Quiz CTAs + quickAnswerH2s + JSON-LD (C16) |
| `my-app/app/components/QuizCTA.tsx` | 4 varianti: sidebar, inline, compact, banner |
| `my-app/app/servizi/[slug]/page.tsx` | QuickAnswerSection + questionH2 |
| `my-app/app/lib/site-config.ts` | Dati centralizzati azienda (MON-05) |
| `docs/next-session-prompt.md` | Questo file |
