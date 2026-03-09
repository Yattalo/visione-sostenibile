# Session Handoff — Visione Sostenibile

## Stato attuale (fine 2026-03-09)
- **Git**: 20 commit ahead di origin/main (NON pushati), 2 file uncommitted (taskDefinitions.ts + justfile)
- **Task System**: 109 task totali, 50 done, 38 todo, 17 blocked, 23 nuove create in questa sessione
- **Justfile**: 38 recipes attive (dev, build, convex, task-system, gws, deploy)
- **Convex deploy bloccato**: manca `CLERK_JWT_ISSUER_DOMAIN` env var su Convex Dashboard (task VS-H5)

## Completato in questa sessione

### 1. Copy alignment Barbara Favaro (VS-6) — 7 commit
- Homepage, Chi Siamo, Servizi, Qualita, Progetti, Scorecard allineati a `Barbara_quiz_copy/Copy Visione Sostenibile_definitivo.md`
- Qualita: riscrittura completa (10 BOX + 7 Standard di Eccellenza + Cert. N° 54/23)
- PhilosophySection: Fuoco → Luce

### 2. Task backlog completo da meeting notes cliente — 23 task create
- **Wave 16** (Quick wins): VS-10 team bios, VS-11 partner reviews, VS-12 B2C/B2B branching
- **Wave 17** (Core): VS-20 partner recruiting, VS-21 blog comments, VS-22 editorial calendar, VS-23 area privata, VS-24 blog SEO
- **Wave 18** (AI Pipeline): VS-30 quiz photo upload, VS-31 Vision API, VS-32 render gen (HF/Gemini), VS-32-PRE AI Studio scaffold, VS-33 async queue 48h, VS-34 credit system, VS-35 admin AI dashboard
- **Wave 19** (Nice-to-have): VS-40 media blog, VS-41 partner showcase
- **Wave 20** (Human + Infra): VS-H1 logo Guglielmo, VS-H2 Barbara B2B copy, VS-H3 pricing approval, VS-H4 DNS setup, VS-H5 Clerk env var, VS-36 SMTP fallback

### 3. AI Studio prompt per render pipeline
- `artifacts/ai-studio/vs-render-prompt.txt` (15KB) — prompt completo per AI Studio "Build with Gemini"
- `artifacts/ai-studio/vs-render-followups.txt` (18KB) — 5 follow-up prompts per raffinamento iterativo
- Architettura: 3 moduli (gardenVision.ts, gardenRender.ts, pipeline.ts) con interfacce TypeScript identiche al quiz system esistente

### 4. Justfile con 38 recipes
- `justfile` alla root del progetto (non my-app/)
- Include: dev, build, lint, convex, task-system, gws CLI, deploy, utilities
- gws recipes con comandi reali da gwsclitest (drive, calendar, gmail, sheets, schema)

### 5. Cost model AI Pipeline
- Costo raw per lead: EUR 0.12-0.28 (Vision + Gemini + render)
- Pricing: max EUR 1.00/lead (Starter 10/mo EUR 10, Pro 30/mo EUR 25, Business 100/mo EUR 80)
- Modelli open-source via HF Inference o nano-banana-2 per minimizzare costi

## Modifiche non committate
```
M  my-app/convex/taskSystem/taskDefinitions.ts  (+584 lines, 23 nuove task definitions)
?? Barbara_quiz_copy/                            (documenti originali Barbara, non tracciati)
?? justfile                                       (nuovo, 38 recipes)
```

## Prossimi passi (prioritized)

| # | Cosa | Perche | Effort |
|---|------|--------|--------|
| 0 | **VS-H5**: Settare CLERK_JWT_ISSUER_DOMAIN su Convex Dashboard | Blocca deploy Convex e seed task | 10min (human) |
| 0 | **Push 20 commit** a origin/main | Tutto il lavoro VS-6 + task defs è locale | 1min |
| 0 | **Commit** taskDefinitions.ts + justfile | File uncommitted | 2min |
| 1 | **VS-32-PRE**: Usare AI Studio prompt (già in clipboard/artifacts) per scaffoldare render pipeline | Prerequisito per VS-31/32, massimo leverage AI Studio | 2h |
| 2 | **Wave 16**: VS-10 (team bios), VS-11 (partner reviews), VS-12 (B2C/B2B) | Quick wins, bassa complessità | 4-6h |
| 3 | **Wave 17**: VS-20 (partner form), VS-23 (area privata Clerk) | Core features richieste dal cliente | 8-14h |
| 4 | **Wave 18**: Integrazione moduli AI Studio in Convex | Premium feature, dipende da VS-32-PRE | 6-10h |
| 5 | **VS-H1/H2**: Logo (Guglielmo) + B2B copy (Barbara) | Umano, parallelo al dev | ongoing |

## Contesto per il prossimo agente

### Decisioni architetturali
- **AI Pipeline via AI Studio**: Invece di scrivere da zero, scaffoldiamo una mini-app React con AI Studio che contiene i 3 moduli core (Vision, Render, Pipeline). Poi estraiamo le funzioni e le wrappiamo in Convex internalAction. Riduce ~14h a ~5h.
- **HF Inference > DALL-E 3**: Utente preferisce modelli open-source via HuggingFace. `@huggingface/inference` già in package.json, `HF_TOKEN` configurato, script generate-images.ts come pattern.
- **Pricing ridotto**: Non 800% markup. Target EUR 0.20 costo, EUR 1.00 max vendita. Tiers: 10/25/80 EUR.
- **Resend + SMTP fallback**: Tenere Resend (free tier 3K/mo copre), ma preparare Nodemailer come backup (VS-36, backlog).
- **DNS**: Netlify per hosting, Siteground per dominio + mail.

### Gotcha
- `npx convex dev --once` fallisce se `CLERK_JWT_ISSUER_DOMAIN` non è settato su Convex Dashboard
- Le task con `agent: "human"` non sono supportate dallo schema (solo claude/gemini/codex) — create con agent=claude + tag `human-task`
- Il build ha un errore pre-esistente su `/_not-found` (useSearchParams senza Suspense) — NON correlato al nostro lavoro
- `Barbara_quiz_copy/` contiene il doc definitivo (778KB) — troppo grande per Read in un colpo, usare offset/limit o grep

### Preferenze utente espresse
- "Ignora totalmente le task sul logo, se ne occupa Guglielmo"
- "Sistemi diversi diventano nodi di un sistema più grande, la chiave è l'AI come collante intelligente"
- Vuole usare AI Studio per lo scaffolding generativo, non scrivere tutto a mano
- Vuole gws integrato nel progetto per Google Workspace automation

## File chiave

| File | Scopo |
|------|-------|
| `CLAUDE.md` | Project context, stack, routes, commands |
| `my-app/convex/taskSystem/taskDefinitions.ts` | 109 task definitions (23 nuove) |
| `justfile` | 38 recipes (dev, convex, task, gws, deploy) |
| `artifacts/ai-studio/vs-render-prompt.txt` | Prompt AI Studio per render pipeline (15KB) |
| `artifacts/ai-studio/vs-render-followups.txt` | 5 follow-up prompts per AI Studio (18KB) |
| `Barbara_quiz_copy/Copy Visione Sostenibile_definitivo.md` | Source of truth copy Barbara |
| `my-app/app/quiz/page.tsx` | Quiz system (687 righe, 6 domande, 4 profili) |
| `my-app/convex/schema.ts` | Schema Convex (15 tabelle + task system) |
| `my-app/convex/leads.ts` | Lead submission + CRM + email pipeline |
| `my-app/app/lib/barbara-scorecard.ts` | 4 profili scorecard con contenuti Barbara |
