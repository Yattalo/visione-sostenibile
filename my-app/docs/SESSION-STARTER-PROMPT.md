# Session Starter — Visione Sostenibile Production Push

Copia questo prompt all'inizio di una nuova sessione Claude Code.

---

## Il Prompt

```
Sto lavorando su Visione Sostenibile — sito web per un'azienda di giardinaggio biodinamico di Torino.

## Setup UCA

Il progetto usa @yattalo/task-system v0.5.0. Le task vanno su Convex:

cd ~/projects/active/task-system-scaffold/apps/demo
npx convex run tasks:list '{}'  # per vedere task esistenti
npx convex run tasks:create '{"taskId":"VS1","projectId":"vs","agent":"claude",...}'
npx convex run tasks:updateStatus '{"taskId":"VS1","status":"in_progress","agent":"claude"}'

Per dispatch ad opencode: usa /agent-dispatch skill.
Per operazioni task: usa /task-system-ops skill.

## Stato attuale del sito

Stack: Next.js 16 + React 19 (compiler) + Convex + Tailwind v4 + Framer Motion
Deploy: Vercel (mil1) + Convex cloud
Working dir: ~/projects/active/visione_sostenibile/my-app/

### Cosa funziona
- 12 pagine pubbliche + 8 admin routes
- 12 servizi dettagliati (contenuto statico, non ancora in Convex)
- 3 blog post (statici)
- Portfolio progetti con filtri (statico)
- Form contatti 3-step → Convex contactSubmissions (funzionante)
- CTA telefono +39 371 482 1825 (hero + footer)
- Admin auth con SHA-256 + sessioni Convex 24h
- Animazioni Framer Motion su tutte le pagine
- Share tracking per servizi → Convex shareEvents

### BUG CRITICI
1. /quiz → 404 (QuizCTA.tsx e QuizMiniPreview.tsx linkano a /quiz ma la route NON ESISTE. Backend Convex pronto: quiz.ts, leads.ts, schema con quizSubmissions + leads)
2. /scorecard/[id] → non esiste (referenziato in leads.ts)
3. /admin/[resource] → directory vuota, 404
4. Admin review: bottoni Approve/Reject disabilitati (opacity-60 cursor-not-allowed, nessun handler)
5. No favicon.ico (metadata lo referenzia ma non esiste in public/)
6. staticReviews = [] → widget recensioni homepage non renderizza nulla

### LACUNE PRODUZIONE
- ZERO analytics (no GA, no Meta Pixel, no niente)
- No sitemap.xml (né statico né generato)
- No robots.txt
- No og:image su nessuna pagina
- No canonical URLs
- No JSON-LD structured data
- No cookie consent banner
- No newsletter signup
- No exit-intent popup / scroll-triggered lead capture
- Dati statici non migrati a Convex (services, blog, projects, reviews)

### CONTESTO BUSINESS
- Andrea Giordano, fondatore, approccio biodinamico
- Zona: Torino, Piemonte/Lombardia
- Ha già campagne Meta Ads attive che portano lead significativi
- Obiettivo: aumentare lead dal sito organico + riscaldare i lead da Facebook
- Il quiz lead magnet è la strategia principale (backend pronto, frontend mancante)

## Piano di lavoro (4 fasi)

### Fase 1: Bug Fix & Audit (VS-B1 → VS-B6)
Verificare che il sito sia bug-free. Task prefix: VS-B

VS-B1: Creare la pagina /quiz (frontend) — il backend Convex è GIÀ pronto
VS-B2: Creare la pagina /scorecard/[id] per visualizzare risultati quiz
VS-B3: Fix admin review buttons (aggiungere handler approve/reject)
VS-B4: Aggiungere favicon.ico
VS-B5: Seed reviews in Convex (almeno 5-6 recensioni reali)
VS-B6: Fix /admin/[resource] (redirect o rimuovere)

### Fase 2: Production Essentials (VS-P1 → VS-P8)
SEO, analytics, compliance. Task prefix: VS-P

VS-P1: Aggiungere Meta Pixel (FB) — evento PageView + Lead + CompleteRegistration
VS-P2: Aggiungere Google Analytics 4 (GA4)
VS-P3: Generare sitemap.xml dinamico (app/sitemap.ts)
VS-P4: Aggiungere robots.txt (app/robots.ts)
VS-P5: Aggiungere og:image per ogni pagina (generare con next/og o statiche)
VS-P6: Aggiungere canonical URLs a tutte le pagine
VS-P7: Aggiungere JSON-LD structured data (LocalBusiness + Service)
VS-P8: Cookie consent banner (GDPR compliance per Meta Pixel + GA4)

### Fase 3: Lead Generation (VS-L1 → VS-L6)
Aumentare conversioni dal sito. Task prefix: VS-L

VS-L1: Embeddare QuizCTA nelle pagine strategiche (homepage, servizi, blog)
VS-L2: Newsletter signup nel footer + popup exit-intent
VS-L3: Lead magnet download (guida PDF "5 errori nel giardino") con email gate
VS-L4: Scroll-triggered CTA dopo 60% di scroll sulle pagine servizio
VS-L5: Migrare dati statici a Convex (services, blog, projects) per gestione dinamica
VS-L6: Thank you page post-quiz con CTA consulenza gratuita

### Fase 4: Meta Ads Warming (VS-M1 → VS-M5)
Riscaldamento lead da Facebook. Task prefix: VS-M

VS-M1: Landing page dedicata per traffic Meta Ads (UTM tracking)
VS-M2: Pixel events personalizzati: ViewContent (servizio), InitiateCheckout (quiz start), Lead (quiz complete), Schedule (richiesta consulenza)
VS-M3: Retargeting audience: visitatori sito che non hanno completato quiz
VS-M4: Lookalike audience basata su lead qualificati (score > 70)
VS-M5: Sequenza email post-quiz (3 email in 7 giorni: risultati → case study → offerta)

## Dipendenze tra fasi

Fase 1 (bug fix) → sblocca Fase 2 e 3 in parallelo
Fase 2 (production) + Fase 3 (lead gen) → sbloccano Fase 4 (Meta warming)
VS-B1 (quiz page) sblocca VS-L1, VS-L6, VS-M2

## Come procedere

1. Crea tutte le task su Convex con le dipendenze
2. Parti dalla Fase 1 — dispatcha VS-B1 + VS-B4 + VS-B5 + VS-B6 a opencode (parallelo)
3. VS-B2 dipende da VS-B1 (stessa UI language)
4. VS-B3 lo fai tu (richiede lettura admin code)
5. Dopo Fase 1, dispatcha Fase 2 e 3 in parallelo

Per ogni task: in_progress → fai → verifica (git diff + build) → done
```
