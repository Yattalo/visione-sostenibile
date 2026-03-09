# Session Handoff — Visione Sostenibile

## Stato attuale (fine 2026-03-09)
- **Branch**: `feature/vs-wave16-copy` — 28 commit ahead di origin/main, NON pushato
- **Task System**: 109 task totali, 56 done (51%), 32 todo, 17 blocked
- **Build**: `npx tsc --noEmit` OK su tutti i commit
- **Working mode**: orchestratore + subagenti paralleli (utente richiede questo pattern)

## Completato in questa sessione (2 task)

1. **C21** `298168b` — Quick answers: 7 su 9 espanse a 40-60 parole (blog 2 + servizi 5)
2. **C22** `80da3a9` — Question H2: nuova `QuickAnswerSection` nei servizi + `quickAnswerH2s` map nel blog

## Cumulativo branch (8 task in 2 sessioni)
VS-11 (reviews category), VS-24 (blog SEO), VS-10 (team bios), C20 (blog H2 questions), C21 (quick answers 40-60w), C22 (service+blog question H2s) + copy alignment VS-6 (7 commit) + task definitions wave 16-20

## Modifiche non committate
```
?? Barbara_quiz_copy/    (doc originali Barbara — lasciare fuori da git)
```

## Prossimi passi (prioritized)

| # | Cosa | Perche | Effort |
|---|------|--------|--------|
| 1 | **MON-05**: Centralizzare settings sito (Convex) | DRY: company info, social links duplicati in 5+ file | 3h |
| 2 | **MON-04**: Popolare libreria media Convex | Asset foto/video servono per gallery e servizi | 2h |
| 3 | **VS-20**: Partner recruiting page + form | Feature richiesta dal cliente | 6h |
| 4 | **VS-12**: B2C/B2B branching UX | Differenziare percorsi utente | 4h |
| 5 | **VS-23**: Area Privata Utente (Clerk auth) | Core feature, dipende da VS-H5 (Clerk env) | 8h |

## Contesto per il prossimo agente

### Strategia branch
- **NON pushare su main**. Tutto resta su `feature/vs-wave16-copy`
- Merge fast-forward quando l'utente da OK per staging
- Main allineato a origin/main

### Pattern SEO completato
- Blog H2: 24 heading in formato domanda italiana (C20)
- Quick answers: tutti 40-60 parole per Google paragraph snippets (C21)
- Question H2 su quick answer boxes: blog (4 slug) + servizi (5 slug) con fallback "Risposta rapida" (C22)
- Servizi: nuova `QuickAnswerSection` component tra hero e editorial intro

### Working mode richiesto dall'utente
- Usare **subagenti in parallelo** per task indipendenti
- Orchestratore (main agent) conosce il piano dall'alto
- A fine ciclo: `/session-handoff` -> commit -> tag -> clear -> fresh context

### Gotcha
- `npx convex dev --once` fallisce senza `CLERK_JWT_ISSUER_DOMAIN` su Convex Dashboard (VS-H5, human task)
- Badge non supporta `onClick` — wrappare in `<button>`
- Zsh: quotare path con brackets `'app/blog/[slug]/page.tsx'`
- Task list JSON da Convex e >65K chars — serve recovery parser con `rfind`
- Build warning su `/_not-found` (useSearchParams senza Suspense) — pre-esistente, non nostro

### Preferenze utente
- NO push su main, restare sul branch
- Vuole subagenti paralleli, orchestratore dall'alto
- Handoff a fine ciclo, poi clear e fresh context

## File chiave

| File | Scopo |
|------|-------|
| `my-app/app/servizi/[slug]/page.tsx` | QuickAnswerSection + questionH2 per 5 servizi |
| `my-app/app/blog/BlogPostClient.tsx` | quickAnswerH2s map + JSON-LD Article enhanced |
| `my-app/app/lib/blog.ts` | 4 articoli con H2 in formato domanda |
| `my-app/convex/schema.ts` | Schema con reviews category + blog metaTitle/metaDescription |
| `my-app/app/components/TeamSection.tsx` | 18 membri con competenze + personalStatement |
| `docs/next-session-prompt.md` | Questo file |
