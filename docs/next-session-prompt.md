# Session Handoff — Visione Sostenibile

## Stato attuale (fine 2026-03-10)
- **Branch**: `feature/vs-wave16-copy` = main (synced at `3327f1f`)
- **Task System**: 109 task — 95 done (87%), 4 todo (human), 7 backlog, 3 cancelled
- **Build**: `pnpm build` OK. Run from `my-app/`
- **170 commit** su main, 16 sessioni, 47 just recipes

## Completato in questa sessione

1. **MON-03** `97576c9` — CRM/Email smoke test: explicit payloads fix, GDPR checkbox, loading states
2. **MON-08** `5707715` — Email operational runbook (`docs/runbook-email.md`)
3. **MON-04** `a580e76` — Gallery seed: 24 entries from public assets (`convex/gallerySeed.ts`)
4. **FE3** (verified) — Admin CRUD audit: all 6 pages already functional
5. **MON-06** (verified) — Admin regression check: confirmed via FE3 audit
6. **VS-H5** (human) — Clerk JWT env var set on Convex Dashboard
7. **GE1** `3327f1f` — Service detail page restored to Stitch design (reverted SEO regressions)
8. **Tooling** — `tools/task-filter.py` + 6 just recipes per orchestrator
9. **Cleanup** — TS4 cancelled (wrong project), VS-36/VS-40 cancelled (premature), AI chain → backlog

## Prossimi passi (prioritized)

| # | Cosa | Perche | Effort |
|---|------|--------|--------|
| 1 | **Browser audit**: walkthrough 33 rotte | Errori in browser segnalati, regressioni da cicli automatici | 2h |
| 2 | **Git history**: cronologia 170 commit | Capire dove/quando le regressioni sono state introdotte | 1h |
| 3 | **VS-H4**: DNS Setup (human) | Go-live dominio | human |
| 4 | **VS-PROD1**: Env vars produzione | Serve dopo DNS | 30min |
| 5 | **VS-H1**: Logo Redesign (Guglielmo) | Brand identity | human |
| 6 | **VS-H2**: Barbara B2B Copy | Testi formali | human |
| 7 | **VS-H3**: Client Approval pricing | Business model AI | human |

## Prompt audit pronti

Due agenti da lanciare in parallelo nella prossima sessione:

### AUDIT 1 — Browser Walkthrough
Aprire OGNI pagina (16 pubbliche, 12 admin, 5 auth) su `localhost:3000`.
Per ciascuna: rendering, console errors, layout, immagini, form, responsive 375px.
Output: report markdown con tabella problemi per severità.
**Rotte**: `/`, `/chi-siamo`, `/servizi`, `/servizi/[slug]`, `/progetti`, `/progetti/[slug]`,
`/blog`, `/blog/[slug]`, `/contatti`, `/qualita`, `/quiz`, `/collabora`, `/partner`,
`/privacy`, `/termini`, `/accessibilita`, `/admin` (12 sub-routes), `/area-privata` (3 sub-routes),
`/sign-in`, `/sign-up`

### AUDIT 2 — Git History Cronologia
Analizzare tutti i 170 commit: fasi del progetto, regressioni (grep fix/revert/restore),
file più modificati (instabilità), score per sessione (valore reale vs complessità).
Output: timeline con regression markers + lezioni apprese.

## Contesto per il prossimo agente

### Regressione nota più recente
`3327f1f` ha ripristinato `/servizi/[slug]` — i commit SEO (C21-C23, FE5, P7) avevano
sovrascritto il design Stitch approvato con layout content-heavy. Questo è un esempio
del pattern: cicli automatici che toccano file stabili senza verificare il design.

### Architettura
- **Next.js 16** + Convex + Tailwind v4 + Framer Motion + React 19
- `proxy.ts` (NOT middleware.ts) per Clerk auth
- `template.tsx` usa CSS animation (non Framer Motion)
- pnpm, app in `my-app/`

### Comandi utili
```bash
cd my-app && pnpm dev              # Dev server localhost:3000
just task-actionable               # Task filtrate (attualmente: 0 agent, 4 human)
just task-stats-full               # Stats complete
just task-detail VS-H4             # Dettaglio singola task
```

### Preferenze utente
- Onestà > diplomazia nei report
- `just` recipes per operazioni ripetute (mai Python inline)
- Handoff a fine ciclo, clear e fresh context
- Non lanciare task automatiche senza verificare allineamento alla visione
