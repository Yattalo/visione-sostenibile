# Session Handoff — Visione Sostenibile

## Stato attuale (fine 2026-03-09)
- **Branch**: `feature/vs-wave16-copy` — 25 commit ahead di origin/main, NON pushato (utente vuole merge fast-forward dopo review)
- **Task System**: 109 task totali, 54 done (50%), 38 todo, 17 blocked
- **Build**: `pnpm build` OK, `npx tsc --noEmit` OK (tutti i commit type-checked)
- **Cron loop attivo**: job `925f4230` ogni 10min ("pick next todo task, work on it, commit")

## Completato in questa sessione (4 task)

1. **VS-11** `ca085d1` — Reviews: aggiunto campo `category` (client|partner) + filtro admin + seed data
2. **VS-24** `1e7177f` — Blog SEO: metaTitle/metaDescription in schema + enhanced JSON-LD (publisher, wordCount, inLanguage)
3. **VS-10** `dee8033` — Team: competenze tags + personalStatement su ProfileCard wrapper
4. **C20** `471bc15` — Blog H2: 24 heading ristrutturati da statement a domande italiane (featured snippet optimization)

## Modifiche non committate
```
?? Barbara_quiz_copy/    (doc originali Barbara, non tracciati — lasciare fuori)
```

## Prossimi passi (prioritized)

| # | Cosa | Perche | Effort |
|---|------|--------|--------|
| 1 | **C21**: Quick answers / FAQ schema markup | SEO: position 0 nei risultati Google | 1h |
| 2 | **C22**: Service page H2 restructuring (question format) | Stessa ottimizzazione SEO fatta per blog | 1h |
| 3 | **MON-05**: Centralize settings (company info, social links) | DRY: dati duplicati in 5+ file | 3h |
| 4 | **VS-20**: Partner recruiting page | Feature richiesta dal cliente | 6h |
| 5 | **VS-12**: B2C/B2B branching UX | Differenziare percorsi utente | 4h |

## Contesto per il prossimo agente

### Strategia branch
- **NON pushare su main**. Tutto resta su `feature/vs-wave16-copy`
- Merge sarà fast-forward quando l'utente dà OK per staging
- Main è allineato a origin/main (reset fatto in questa sessione)

### Decisioni architetturali
- Reviews `category` field è `v.optional()` — safe additive migration, no backfill needed
- Blog metaTitle/metaDescription con fallback: `metaTitle || "${title} | Blog"`
- Team bios: dati aggiunti fuori da ProfileCard (wrapper `<article>` con tags sotto)
- H2 in formato domanda: pattern italiano "Come [verbo]...?", "Quando [verbo]...?", "Perché [verbo]...?"

### Gotcha
- `npx convex dev --once` fallisce senza `CLERK_JWT_ISSUER_DOMAIN` su Convex Dashboard
- Badge component non supporta `onClick` — wrappare in `<button>`
- Zsh richiede quoting per path con brackets: `'app/blog/[slug]/page.tsx'`
- Build ha warning pre-esistente su `/_not-found` (useSearchParams senza Suspense) — non nostro

### Preferenze utente
- "Non procedere al push su main, manteniamoci sul branch"
- Task una alla volta, commit quando finita
- Vuole review prima del merge su main

## File chiave

| File | Scopo |
|------|-------|
| `my-app/convex/schema.ts` | Schema con reviews category + blog metaTitle/metaDescription |
| `my-app/convex/reviews.ts` | Query con filtro category + mutation setCategory |
| `my-app/app/admin/reviews/page.tsx` | Admin con filtri Tutti/Clienti/Partner |
| `my-app/app/components/TeamSection.tsx` | 18 membri con competenze + personalStatement |
| `my-app/app/blog/BlogPostClient.tsx` | JSON-LD Article enhanced |
| `my-app/app/blog/[slug]/page.tsx` | generateMetadata con metaTitle/metaDescription |
| `my-app/app/lib/blog.ts` | 4 articoli con H2 in formato domanda |
