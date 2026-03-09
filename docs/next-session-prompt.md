# Session Handoff — Visione Sostenibile

## Stato attuale (fine 2026-03-10)
- **Branch**: `feature/vs-wave16-copy` — 44 commit ahead di origin/main, NON pushato
- **Task System**: 109 task totali, 69 done (63%), 19 todo, 17 blocked
- **Build**: `npx tsc --noEmit` OK su tutti i commit
- **Working mode**: orchestratore + subagenti paralleli

## Completato in questa sessione (4 task)

1. **P6** `e6efef9` — SEO metadata: 12 keywords Torino/Piemonte in layout.tsx, sitemap.ts e robots.ts ora usano siteConfig.siteUrl, robots.txt disallow /admin /api /scorecard
2. **P7** `9d0d36b` — Image optimization: BLUR_DATA_URL Leaf Green (#22582C) in image-utils.ts, placeholder="blur" su 23 Image components in 14 file, alt text descrittivi in italiano
3. **C24** `fecd3da` — Blog audit: fallback H2 cambiato in formato domanda, excerpt checkup-sostenibile trimmato a 151 chars. Tutti i 4 blog post superano checklist SEO completa
4. **C23** `ca5c0db` — Service audit: 7 nuove entry serviceContents (impianti-irrigazione, camminamenti-pietra, illuminazione-esterni, arredamento-esterni, ingegneria-naturalistica, scelta-piante, trattamenti-piante) con questionH2, quickAnswer, deliverables, process, results, faqs. Aggiunto HowTo JSON-LD per tutti i servizi con process steps. Tutti i 12 servizi superano checklist SEO

## Cumulativo branch (21 task in 7 sessioni)

| Sessione | Task |
|----------|------|
| 1 (seo-team) | VS-11 reviews category, VS-24 blog SEO, VS-10 team bios, C20 blog H2 questions + VS-6 copy (7 commit) |
| 2 (seo-snippet) | C21 quick answers 40-60w, C22 question H2s services+blog, MON-05 site-config |
| 3 (page-ux-bmad) | C16 blog quiz CTAs, P1 contatti multi-step, P2 chi-siamo BMAD |
| 4 (bmad-pages) | FE4 homepage BMAD, FE5 servizi redesign, P3 qualita content |
| 5 (seo-filters) | P4 JSON-LD structured data, FE6 projects multi-filter, FE7 blog category filters |
| 6 (fix-metadata-robots-sitemap) | P6 SEO metadata+sitemap+robots, P7 image blur placeholders+alt |
| 7 (seo-audit-services-blog) | C23 service audit + HowTo JSON-LD, C24 blog audit + H2 fix |

## Modifiche non committate
```
 M docs/next-session-prompt.md   (questo handoff)
?? Barbara_quiz_copy/            (doc originali Barbara — lasciare fuori da git)
```

## Prossimi passi (prioritized)

| # | Cosa | Perche | Effort |
|---|------|--------|--------|
| 1 | **MON-04**: Popolare libreria media Convex | Asset foto/video per gallery e servizi, script import | 4h |
| 2 | **D1**: Responsive QA all breakpoints | Test 375/768/1024/1440px tutte le pagine | 4h |
| 3 | **D2**: Accessibility audit WCAG 2.1 AA | Compliance check su tutte le pagine | 4h |
| 4 | **SD10**: Align homepage with Stitch design | Stitch design language integration | 4h |
| 5 | **VS-20**: Collabora con Noi page + form | Partner recruiting, feature richiesta dal cliente | 6h |
| 6 | **SD11/SD12**: Align blog + remaining pages with Stitch | Design consistency cross-pages | 4h each |

## Contesto per il prossimo agente

### Strategia branch
- **NON pushare su main**. Tutto resta su `feature/vs-wave16-copy`
- Merge fast-forward quando l'utente da OK per staging
- Main allineato a origin/main

### Pagine aggiornate in 7 sessioni
- `/` (homepage) — Dual CTA hero, TrustNumbers component, BMAD palette (FE4), blur placeholders (P7)
- `/servizi` — Benefit-driven cards con outcome text, Sun Accent CTAs (FE5), blur placeholders (P7)
- `/servizi/[slug]` — Rich detail: hero, benefits, process, FAQ, related, CTA (FE5), blur placeholders (P7), 12/12 servizi con content completo + HowTo JSON-LD (C23)
- `/qualita` — 7 sezioni: standards, biodinamica, certifications, guarantees (P3), blur placeholders (P7)
- `/blog` — Category filter pills, 3-col grid, AnimatePresence transitions (FE7), blur placeholders (P7)
- `/blog/[slug]` — H2 domande, quick answers ≤60w, JSON-LD (Article, Breadcrumb, FAQ, HowTo), quiz CTAs, blur placeholders (P7), audit completo (C24)
- `/progetti` — Multi-filter: region, type, tag with cross-counts (FE6), blur placeholders (P7)
- `/progetti/[slug]` — Full gallery, lightbox, sidebar info, CTA, blur placeholders (P7)
- `/contatti` — Multi-step wizard 3 fasi con Zod v4 + AnimatePresence
- `/chi-siamo` — 4 pillar BMAD, founder bio siteConfig, outcomes, dark story section, blur placeholders (P7)
- Tutte le pagine copy allineate a doc Barbara (VS-6)
- Layout: JSON-LD Organization/LocalBusiness + SEO keywords Torino/Piemonte (P4, P6)
- Sitemap e robots.ts: URL dinamici da siteConfig, admin/api/scorecard disallowed (P6)

### Componenti nuovi/modificati
- `JsonLd` — reusable JSON-LD script renderer (P4)
- `json-ld.ts` — helpers: organizationJsonLd, articleJsonLd, serviceJsonLd, breadcrumbJsonLd (P4)
- `image-utils.ts` — BLUR_DATA_URL Leaf Green placeholder constant (P7)
- `TrustNumbers` — reusable dark/light variant (FE4)
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
| `my-app/app/layout.tsx` | Root layout con JsonLd + SEO keywords (P4, P6) |
| `my-app/app/lib/image-utils.ts` | BLUR_DATA_URL Leaf Green placeholder (P7) |
| `my-app/app/lib/json-ld.ts` | Schema helpers: org, article, service, breadcrumb (P4) |
| `my-app/app/sitemap.ts` | Dynamic sitemap con siteConfig.siteUrl (P6) |
| `my-app/app/robots.ts` | Robots con disallow admin/api/scorecard (P6) |
| `my-app/app/servizi/[slug]/page.tsx` | Detail: 12 servizi completi, HowTo JSON-LD (C23) |
| `my-app/app/blog/BlogPostClient.tsx` | Quiz CTAs, JSON-LD, audit completo (C24) |
| `my-app/app/lib/blog.ts` | Blog data, excerpt ≤160ch (C24) |
| `my-app/app/progetti/page.tsx` | Multi-filter portfolio: region, type, tag (FE6) |
| `my-app/app/blog/page.tsx` | Category filters + 3-col grid (FE7) |
| `my-app/app/page.tsx` | Homepage BMAD con dual CTA + TrustNumbers (FE4) |
| `my-app/app/servizi/ServiziClient.tsx` | Listing benefit-driven cards (FE5) |
| `my-app/app/qualita/page.tsx` | 7 sezioni reali qualita (P3) |
| `my-app/app/contatti/page.tsx` | Multi-step wizard 3 fasi (P1) |
| `my-app/app/chi-siamo/page.tsx` | BMAD 4 pillar + founder bio (P2) |
| `my-app/app/lib/site-config.ts` | Dati centralizzati azienda (MON-05) |
| `docs/next-session-prompt.md` | Questo file |
