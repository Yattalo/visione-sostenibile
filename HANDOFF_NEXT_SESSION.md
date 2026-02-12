# Handoff Prompt — Prossima Sessione

> Copia questo prompt all'inizio della prossima sessione Claude Code.

---

## Contesto Rapido

Sto lavorando su **Visione Sostenibile** (`/Users/luckyluke/projects/active/visione_sostenibile/my-app/`), sito vetrina Next.js 16 + Convex + Tailwind v4 per azienda di giardinaggio romana.

### Cosa e stato fatto nella sessione precedente (12 feb 2026)

1. **Analisi completa repo**: git-historian ha analizzato tutti i 9+1 commit. Report in TEAM_SYNC.md
2. **13 task create** con dipendenze: vedi `TaskList` per stato aggiornato
3. **Quality gate fixato**: `pnpm lint` passa 0 errori 0 warning (fix in ServiceCard, TiltedCard, servizi/page, next.config.ts)
4. **Build verificato**: `pnpm build` compila 20 pagine statiche correttamente
5. **TEAM_SYNC.md creato**: documento di allineamento team umani-AI nella root
6. **Scoperta chiave**: il working directory aveva 25 file di integrazione Convex gia fatti ma non committati. Ora committati in `19557a9`

### File di riferimento da leggere

- `TEAM_SYNC.md` — stato progetto, task, dipendenze, pipeline discovery
- `HANDOFF.md` — analisi architetturale dettagliata (11 feb)
- `CLAUDE.md` — convenzioni progetto

### Stato working directory

4 file modificati (lint fixes non ancora committati):
- `app/components/ServiceCard.tsx` — rimosso import Image inutilizzato
- `app/components/TiltedCard.tsx` — rimosso param showMobileWarning inutilizzato
- `app/servizi/page.tsx` — rimosso import ArrowLeft inutilizzato
- `next.config.ts` — rimosso import path/dirname inutilizzati

1 file untracked: `nixpacks.toml`

`package-lock.json` in root da rimuovere manualmente (hook sicurezza blocca rm).

### Task completate

- [x] #1 Fix ESLint (0 errori, 0 warning)
- [x] #2 Lockfile consolidato (build ok, rm manuale pending)
- [x] #4 Route inconsistenti risolte (tutte le pagine esistono nel build)
- [x] #5 Contact form gia collegato a Convex
- [x] #13 TEAM_SYNC.md creato

### Task pronte per la prossima sessione

**Eseguibili subito:**
- **#3** Committare lint fixes + push a origin (i 7 commit precedenti + 19557a9 + lint fixes)
- **#12** Aggiornare README.md e DEPLOYMENT.md (allineare a stato reale: 20 route, niente /galleria /recensioni, Convex parzialmente integrato)

**Bloccate da decisione team:**
- **#7** DECISIONE: Convex end-to-end vs static-first (serve input umano)
- **#6** Connettere servizi/blog a Convex (dopo #7)
- **#8** Completare admin CRUD mutations (dopo #7)

**Bloccate da input cliente:**
- **#9** Elaborare risposte Client Discovery (prompt chain 7 step)
- **#10** Integrare certificazioni PDF
- **#11** Aggiornare brand identity post-discovery

### Pipeline Client Discovery (quando arrivano le risposte)

Il collega sta raccogliendo dal cliente: identita brand (payoff, parola chiave, differenziazione, mission), target (clienti ideali, emozione), stile visivo (loghi ispiratori, colori, minimal/dettagliato), vincoli legali, certificazioni PDF.

Elaborazione con Prompt Chain adattata al progetto sito web:
1. Normalizzazione risposte grezze
2. Competitor Intel (giardinaggio Roma)
3. Target & Mercati
4. Go-to-Market (SEO locale, social, referral)
5. Focus Prodotto & USP
6. Brief Unico
7. Generazione agents.md

### Integrazione Convex — Stato reale

| Area | Stato | Cosa manca |
|------|-------|-----------|
| Schema (7 tabelle) | Completo | - |
| CRUD functions | Completo | - |
| ConvexClientProvider | Montato | - |
| Contact form | Collegato | - |
| Admin listing queries | Collegati | Mancano mutations (create/update/delete) |
| Homepage servizi | Static fallback | Serve useQuery(api.services.getFeatured) |
| Servizi listing | Static fallback | Serve useQuery(api.services.getAll) |
| Blog | Static fallback | Serve useQuery(api.blog.getAll) |
| Reviews widget | Static fallback | Serve useQuery(api.reviews.getFeatured) |

### Decisioni architetturali pending

1. **Convex strategy**: end-to-end (Convex SOT) vs static-first + admin-only Convex vs rimuovere Convex
2. **Admin scope**: produzione con auth vs demo interno
3. **Repository**: unificare .git annidati (root + my-app)
