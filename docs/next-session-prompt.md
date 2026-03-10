# Session Handoff — Visione Sostenibile

> ULTRATHINK: Leggi ogni task prompt e ragiona in profondità prima di agire.

## Stato attuale (fine 2026-03-10)
- **Branch**: `feature/vs-wave16-copy` — 2 commit ahead of main
- **Task System**: 109 task totali, 95 done (87%), 4 human-only todo, 7 backlog, 3 cancelled
- **Build**: `pnpm build` OK — tutti i commit. Run from `my-app/`
- **170 commit totali** su main — 16 sessioni di lavoro, 50+ commit di feature
- **Problema segnalato**: errori in browser, regressioni potenziali da cicli automatici

## Cosa fare in questa sessione: 2 AUDIT PARALLELI

Lanciare due agenti in parallelo. Output combinato = report definitivo del progetto.

---

### AUDIT 1: Browser Walkthrough — Regression Report

**Obiettivo**: Aprire OGNI pagina del sito in browser, verificare che funzioni, documentare errori.

**Prompt per l'agente**:

> Sei un QA tester per il sito Visione Sostenibile (Next.js 16 + Convex).
> Il sito è in locale su `http://localhost:3000`. Serve `pnpm dev` in `my-app/`.
>
> **Istruzioni**: Visita OGNI rotta elencata sotto. Per ciascuna:
> 1. Apri la pagina in browser
> 2. Controlla: rendering OK, no errori console JS, no layout rotti, no testo mancante
> 3. Controlla: link funzionanti, immagini visibili, form funzionanti
> 4. Controlla: mobile responsive (resize a 375px)
> 5. Documenta OGNI problema trovato con screenshot se possibile
>
> **Rotte pubbliche (16)**:
> | # | Rotta | Cosa verificare |
> |---|-------|----------------|
> | 1 | `/` | Hero video, TrustNumbers, servizi cards, reviews, CTA |
> | 2 | `/chi-siamo` | 4 pillars, founder bio, team section |
> | 3 | `/servizi` | Video hero, 3 livelli servizi, ServiceCard grid, B2B toggle |
> | 4 | `/servizi/[slug]` | Detail page per almeno 2 servizi, breadcrumb, CTA |
> | 5 | `/progetti` | Portfolio grid, filtri regione/tipo/tag, cross-counts |
> | 6 | `/progetti/[slug]` | Detail con gallery, renders, features |
> | 7 | `/blog` | Category pills, 3-col grid, cards con immagini |
> | 8 | `/blog/[slug]` | Articolo, comments section, quiz CTA mid/end |
> | 9 | `/contatti` | Multi-step wizard (3 step), Zod validation, privacy checkbox |
> | 10 | `/qualita` | Standards, biodinamica, certifications, guarantees |
> | 11 | `/quiz` | Flow completo: step 1-4, invio, photo upload opzionale |
> | 12 | `/collabora` | Hero, value props, form partner con Zod |
> | 13 | `/partner` | Directory partner, filtri tipo, cards |
> | 14 | `/privacy` | Pagina statica, testo leggibile |
> | 15 | `/termini` | Pagina statica |
> | 16 | `/accessibilita` | Pagina statica |
>
> **Rotte admin (12)** — richiedono Clerk auth:
> | # | Rotta | Cosa verificare |
> |---|-------|----------------|
> | 17 | `/admin` | Dashboard, stats cards, quick actions |
> | 18 | `/admin/services` | CRUD: lista, create, edit, toggle, reorder, delete |
> | 19 | `/admin/blog` | CRUD: lista, create, edit, publish/unpublish, delete |
> | 20 | `/admin/gallery` | Lista, add, edit, delete, toggle active, upload |
> | 21 | `/admin/reviews` | Approve, reject, delete, category toggle |
> | 22 | `/admin/contacts` | Lista, mark read, delete |
> | 23 | `/admin/crm` | CRM entries, timeline |
> | 24 | `/admin/emails` | Email template management |
> | 25 | `/admin/email-status` | Stats cards, dispatch log, filtri |
> | 26 | `/admin/editorial` | Calendar mensile, scheduling, publish/revert |
> | 27 | `/admin/comments` | Moderation: pending/approved/rejected tabs |
> | 28 | `/admin/scorecard` | Editor, live preview, score simulator |
>
> **Rotte auth** (Clerk):
> | # | Rotta | Cosa verificare |
> |---|-------|----------------|
> | 29 | `/sign-in` | Clerk sign-in form |
> | 30 | `/sign-up` | Clerk sign-up form |
> | 31 | `/area-privata` | Redirect se non autenticato, dashboard se autenticato |
> | 32 | `/area-privata/progetti` | Lista progetti utente |
> | 33 | `/area-privata/preventivi` | Lista preventivi utente |
>
> **Output richiesto**: Un report markdown con questa struttura:
> ```markdown
> # Browser Audit Report — Visione Sostenibile
> ## Data: [oggi]
> ## Sommario: X/33 rotte OK, Y con problemi, Z non testabili
>
> ## Problemi trovati
> | # | Rotta | Severità | Problema | Console errors? | Screenshot |
> |---|-------|----------|----------|-----------------|------------|
>
> ## Rotte OK (nessun problema)
> [lista]
>
> ## Note generali
> [performance, UX, accessibilità]
> ```
>
> **IMPORTANTE**: Non fixare nulla. Solo documentare. Il report serve per decidere cosa fixare.

---

### AUDIT 2: Git History — Cronologia Completa del Progetto

**Obiettivo**: Analizzare TUTTI i 170 commit su main, creare una cronologia che mostri l'evoluzione del progetto, identificare quando e perché sono state introdotte regressioni.

**Prompt per l'agente**:

> Sei uno storico del codice. Analizza la storia git completa del progetto Visione Sostenibile.
> Working dir: `/Users/luckyluke/projects/active/visione_sostenibile`
>
> **Step 1: Raccogli la storia**
> ```bash
> git log --oneline --reverse main              # tutti i 170 commit in ordine cronologico
> git log --format="%h %ai %s" --reverse main   # con date
> git shortlog -sn main                         # contributor stats
> ```
>
> **Step 2: Identifica le fasi del progetto**
> Raggruppa i commit in fasi logiche (setup iniziale, MVP, BMAD evolution, Stitch design,
> feature sprint, polish, ecc.). Per ogni fase:
> - Data inizio/fine
> - Numero commit
> - Cosa è stato costruito
> - File chiave creati/modificati
>
> **Step 3: Cerca regressioni**
> Per ogni commit che contiene "fix", "revert", "restore", "broken", "hotfix":
> ```bash
> git log --oneline --all --grep="fix\|revert\|restore\|broken" main
> ```
> Per ciascuno:
> - Quale commit precedente ha causato la regressione?
> - Perché è successo? (troppa velocità? file overlap? mancanza di test?)
> - È stato risolto completamente?
>
> **Step 4: Analisi file più modificati**
> ```bash
> git log --pretty=format: --name-only main | sort | uniq -c | sort -rn | head -30
> ```
> I file modificati più spesso sono indicatori di instabilità o di design non stabilizzato.
>
> **Step 5: Cerca pattern di regressione**
> - Commit che toccano >10 file contemporaneamente (rischio alto)
> - Commit subagente che modificano file non nel loro scope
> - Sessioni con >5 task parallele (overload)
>
> ```bash
> git log --format="%h %s" --shortstat main | head -200
> ```
>
> **Step 6: Timeline delle milestone**
> Per ogni sessione (1-16, vedi commit `handoff(...)`):
> - Task completate
> - Valore aggiunto (feature reali vs task cosmetiche)
> - Regressioni introdotte
> - Regressioni fixate
>
> **Output richiesto**: Un report markdown con questa struttura:
> ```markdown
> # Project History — Visione Sostenibile
> ## Data: [oggi]
> ## Sommario: 170 commit, X fasi, Y regressioni identificate
>
> ## Timeline per fasi
> | Fase | Periodo | Commit | Valore | Regressioni |
>
> ## Regressioni identificate
> | # | Commit causa | Commit fix | Cosa si è rotto | Perché | Risolto? |
>
> ## File instabili (più modificati)
> | File | Modifiche | Pattern |
>
> ## Sessioni per valore
> | Sessione | Task | Valore reale | Score |
> [Score 1-5: quanto valore reale ha portato vs complessità aggiunta]
>
> ## Lezioni apprese
> [Pattern ricorrenti di regressione e come prevenirli]
> ```
>
> **IMPORTANTE**: Sii onesto e critico. L'obiettivo è capire dove il processo automatico
> ha aggiunto valore e dove ha creato problemi. Non giustificare, documenta.

---

## Contesto per entrambi gli agenti

### Stack
- **Next.js 16** (App Router) + **Convex** + **Tailwind CSS v4** + **Framer Motion** + **React 19**
- Package manager: **pnpm**. App in `my-app/`
- Auth: **Clerk** via `proxy.ts` (NOT middleware.ts — Next.js 16)
- Backend: Convex con 9 domain tables + task system

### Comandi utili
```bash
cd my-app && pnpm dev              # Start dev server (localhost:3000)
cd my-app && pnpm build            # Production build
just task-stats-full               # Task system stats (95/109 done)
just task-actionable               # Actionable tasks (currently: 0 agent, 4 human)
```

### Regressioni già note (fixate)
- `contacts.submit` crash — `...args` spread passava extra fields a scheduler (fixed `97576c9`)
- `middleware.ts` + `proxy.ts` conflict — Next.js 16 usa solo proxy.ts (fixed `007fccb`)
- `.next/dev/types` stale cache — TypeScript phantom errors (workaround: `pnpm build`)
- Privacy checkbox mancante nel form contatti (fixed `97576c9`)
- `element-fuoco.mp4` rinominato in `element-luce.mp4` (fixed `1243a2d`)

### Preferenze utente
- Report in italiano
- Onestà > diplomazia — documentare problemi senza giustificarli
- Handoff a fine ciclo, poi clear e fresh context
