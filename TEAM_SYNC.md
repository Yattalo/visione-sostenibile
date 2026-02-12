# Team Sync — Visione Sostenibile

Data: 12 febbraio 2026 | Aggiornato automaticamente

---

## 1. Stato Progetto

| Area | Completamento | Note |
|------|:---:|------|
| **Design System** | 95% | Tailwind v4, palette, animazioni Framer Motion. Potrebbe cambiare post-discovery cliente |
| **Frontend Pubblico** | 80% | 8 route attive. Mancano /termini, /galleria e /recensioni rimosse (ora widget) |
| **Homepage** | 90% | Hero, ReviewsWidget featured, CTA. Manca contenuto reale cliente |
| **Servizi** | 85% | Listing con TiltedCard 3D + detail page. Dati statici, non Convex |
| **Blog** | 75% | Listing + detail con 3 post statici. Non connesso a Convex |
| **Contatti** | 90% | Form multi-step completo. Submit GIA collegato a Convex (api.contacts.submit) |
| **Qualita** | 60% | Pagina presente, mancano certificazioni PDF reali |
| **Admin Panel** | 65% | 6 pagine CRUD + gallery + settings. Queries Convex GIA attive per listing. Mancano mutations CRUD |
| **Backend Convex** | 70% | Schema 7 tabelle + CRUD functions. Form contatti e admin listing GIA collegati |
| **Integrazione end-to-end** | 35% | Contatti + admin listing funzionano. Homepage/servizi/blog/reviews ancora static |
| **Client Discovery** | 0% | In attesa risposte dal cliente |

---

## 2. Mappa Dipendenze Task

```
LANE 1: TECH DEBT (eseguibili subito)
=========================================
[1] Fix ESLint Card.tsx ─────┐
                              ├──> [3] Push 7 commit a origin
[2] Consolidare lockfile ────┘
[4] Fix route inconsistenti (indipendente)
[12] Aggiornare docs README/DEPLOYMENT (indipendente)

LANE 2: INTEGRAZIONE CONVEX (bloccata da decisione)
=========================================
[7] DECISIONE: Convex end-to-end vs static-first
        │
        ├──> [5] Connettere Contact Form a Convex
        ├──> [6] Connettere listing servizi/blog a Convex
        └──> [8] Connettere Admin CRUD a Convex

LANE 3: CLIENT DISCOVERY (bloccata da input esterno)
=========================================
[9] Elaborare risposte Client Discovery ◄── IN ATTESA COLLEGA
        │
        ├──> [10] Integrare certificazioni PDF
        ├──> [11] Aggiornare brand identity post-discovery
        └──> [13] Documento allineamento definitivo
```

---

## 3. Task Eseguibili ORA (nessun blocco)

| # | Task | Effort | Chi |
|---|------|--------|-----|
| **1** | Fix ESLint Card.tsx (`no-empty-object-type`) | 5 min | AI Agent |
| **2** | Rimuovere package-lock.json root | 5 min | AI Agent |
| **4** | Risolvere route inconsistenti | 2h | AI Agent + decisione umana |
| **12** | Aggiornare README/DEPLOYMENT | 1h | AI Agent |

## 4. Task Bloccate — In Attesa Decisione Umana

| # | Task | Bloccata da | Decisore |
|---|------|------------|----------|
| **7** | Strategia Convex | Nessuno (serve decisione) | Team Lead / Cliente |
| **5, 6, 8** | Integrazione Convex | Task 7 | - |

## 5. Task Bloccate — In Attesa Input Cliente

| # | Task | Bloccata da | Chi porta input |
|---|------|------------|-----------------|
| **9** | Client Discovery | Collega raccoglie risposte | Collega sul campo |
| **10** | Certificazioni PDF | Task 9 | - |
| **11** | Brand identity update | Task 9 | - |

---

## 6. Decisioni Architetturali

### Prese

| Decisione | Data | Commit | Rationale |
|-----------|------|--------|-----------|
| Widget vs Page (gallery/reviews) | 12 feb | 1692d09 | Componenti riusabili > pagine dedicate |
| Tailwind v4 con @theme tokens | 10 feb | 7c10942 | Design system custom con palette cream/moss/terracotta/charcoal |
| React 19 + React Compiler | 10 feb | 7c10942 | Performance automatica |
| pnpm come package manager | 10 feb | 7c10942 | Faster, strict by default |

### Pending

| Decisione | Opzioni | Impatto | Urgenza |
|-----------|---------|---------|---------|
| Convex end-to-end vs static-first | A: Convex SOT / B: Static + Convex admin-only / C: Rimuovere Convex | Blocca 3 task di integrazione | ALTA |
| Pagine mancanti: creare o rimuovere link? | A: Creare /termini, /admin/gallery, /admin/settings / B: Rimuovere riferimenti | Routing coerenza | MEDIA |
| Admin in produzione o solo demo? | A: Produzione con auth / B: Solo dev/demo | Security, scope | MEDIA |
| Repository: unificare .git annidati | A: Mono-repo / B: Mantieni struttura attuale | DevOps | BASSA |

---

## 7. Pipeline Client Discovery

### Stato: IN ATTESA INPUT

Il collega sta raccogliendo le risposte dal cliente usando questo questionario:

**Identita del brand**
1. Ci vuole un payoff (slogan)?
2. Che parola vuole che il pubblico associ subito all'azienda?
3. Cosa differenzia la sua azienda dai competitor diretti?
4. Qual e la vision o mission precisa?

**Target e percezione**
1. Chi sono i clienti ideali? Eta, interessi, dove abitano?
2. Che emozione o sensazione deve dare il logo/sito?

**Stile e preferenze visive**
1. Ha dei loghi che gli piacciono?
2. Quali colori vuole assolutamente e quali vuole evitare?
3. Vuole un logo/sito piu minimal o piu dettagliato?

**Aspetti pratici**
1. Ci sono vincoli legali o marchi registrati?

**Certificazioni**
- File PDF originali delle certificazioni

### Prompt Chain da eseguire post-ricezione

Una volta ricevute le risposte grezze, verranno elaborate sequenzialmente:

| Step | Prompt | Input | Output |
|------|--------|-------|--------|
| 1 | **Normalizzazione** | Risposte grezze dal cliente | Dati strutturati e puliti |
| 2 | **Competitor Intel** | Dati normalizzati + contesto settore giardinaggio Roma | Mappa competitiva, differenziazione |
| 3 | **Target & Mercati** | Dati normalizzati + risposte target | Profilo cliente ideale, segmentazione |
| 4 | **Go-to-Market** | Target + competitor | Strategia canali per sito vetrina (SEO locale, social, referral) |
| 5 | **Focus Prodotto & USP** | Dati servizi + differenziazione | Proposta unica di valore per ogni servizio |
| 6 | **Brief Unico** | Output prompt 1-5 | Brief di progetto unificato per sito web |
| 7 | **Generazione agents.md** | Brief + contesto tecnico progetto | File agents.md con direttive per tutti gli agenti AI |

**Quality Gate per ogni step**: L'output deve essere validato prima di passare al successivo.

---

## 8. Ruoli: Umani vs Agenti AI

### Umani
- **Decisioni strategiche**: Convex strategy, scope admin, budget
- **Raccolta input cliente**: Questionario discovery, certificazioni PDF
- **Validazione contenuti**: Copy finale, immagini reali, dati azienda
- **Deploy e monitoring**: Push a production, monitoraggio post-launch
- **Approvazione design**: Palette colori, logo, layout definitivo

### Agenti AI
- **Tech debt**: Fix lint, consolidamento lockfile, pulizia route
- **Integrazione Convex**: Collegamento frontend-backend (post-decisione)
- **Elaborazione discovery**: Prompt chain sulle risposte cliente
- **Generazione docs**: README, DEPLOYMENT, agents.md, TEAM_SYNC
- **Coding features**: Admin CRUD, form contatti, nuove pagine
- **Code review**: Verifica coerenza, best practices, accessibility

---

## 9. Statistiche Repository

| Metrica | Valore |
|---------|--------|
| Totale commit | 9 |
| Commit non pushati | 7 |
| Giorni di sviluppo | 4 (9-12 feb 2026) |
| File nel progetto | ~60+ (app + convex + config) |
| Linee di codice stimate | ~7,500+ |
| Contributor | 1 (Yattalo) |
| Branch attivi | 1 (main) |
| Working directory | 25 file modificati + 3 dir untracked |

### Stack Tecnico

| Layer | Tecnologia | Versione |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Backend | Convex | 1.31.7 |
| Styling | Tailwind CSS | v4 |
| Animations | Framer Motion | 12.34.0 |
| Icons | Lucide React | 0.563.0 |
| Package Manager | pnpm | latest |
| Deploy Frontend | Vercel | mil1 region |
| Deploy Backend | Convex Cloud | - |

---

## 10. Prossimi Passi Immediati

### Oggi (12 feb) — AI Agent puo fare subito:
1. Fix ESLint Card.tsx
2. Rimuovere package-lock.json
3. Verificare build passa
4. Push commit a origin
5. Aggiornare README/DEPLOYMENT

### In attesa decisione team:
6. Decidere strategia Convex
7. Decidere su route mancanti

### In attesa input cliente:
8. Ricezione risposte discovery
9. Elaborazione prompt chain
10. Aggiornamento brand identity e contenuti

---

*Questo documento viene aggiornato ad ogni sessione di lavoro. Ultima modifica: 12 febbraio 2026.*
