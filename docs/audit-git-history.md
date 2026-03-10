# Git History Audit — Visione Sostenibile

**Data**: 2026-03-10 | **Commits**: 179 | **Periodo**: 2026-02-12 → 2026-03-10 (27 giorni)

---

## 1. Project Timeline

### Phase 1: Foundation (Feb 12-13) — 25 commits
Initial commit + rapid UI iteration. Homepage, servizi, blog, portfolio→progetti rename, Stitch-inspired cards, Convex integration, deploy fixes (4 Dokploy attempts).

### Phase 2: BMAD Foundation (Feb 17-18) — 17 commits
Walkway fonts, BMAD palette, task system setup, Wave 1-3 (palette, fonts, leads schema, Paper Canvas texture, core components, admin auth). Stitch design tokens + static data fallback.

### Phase 3: Brand Integration (Feb 19) — 25 commits
Biggest single-day push. Logo integration (6 commits), quiz page, scorecard, SEO, cookie consent, analytics, shadcn/ui, comprehensive UI refresh, GE1 service detail Stitch design.

### Phase 4: Barbara Content + SEO Sprint (Feb 20-21) — 19 commits
Barbara narrative architecture, CRM/email pipeline, SEO sprint (structured data, OG tags, sitemap, robots.txt, local keywords, meta descriptions). QA screenshot baseline.

### Phase 5: CMS + Polish (Feb 22-24) — 19 commits
Convex media library, blog covers, admin centralization, hydration fixes, font optimization, mobile menu redesign, a11y fixes.

### Phase 6: Auth Migration (Mar 7) — 6 commits
Clerk + Convex auth migration. GDPR consent. Quiz enhancements. Clean cutover.

### Phase 7: Wave 16-20 Blitz (Mar 9) — 27 commits
Massive: Barbara copy, quiz scoring, task definitions, reviews/blog SEO, team bios, question H2s, quick answers, chi-siamo BMAD, contatti wizard, blog quiz CTAs, benefit-driven servizi (FE5), homepage BMAD, portfolio filters, blog category pills, JSON-LD.

### Phase 8: Stabilization + Feature Push (Mar 10) — 36 commits
SEO keywords, blur placeholders, service/blog audit, **2x servizi restore**, Stitch alignment (homepage, blog, chi-siamo, contatti, qualita), scorecard print, a11y WCAG, B2C/B2B toggle, blog comments, quiz photo upload, collabora page, partner page, area-privata, admin editorial calendar, Lighthouse optimization, CRM smoke test, gallery seed, tooling.

---

## 2. Regression Analysis

### Regressions trovate: 37 fix commits (21% del totale)

| Commit | Data | Cosa | Causa | Severity |
|--------|------|------|-------|----------|
| `3327f1f` | Mar 10 | **Restore servizi/[slug] Stitch design (2nd time)** | SEO commits (P7, C23) overwrote design | **CRITICAL** |
| `e22755c` | Mar 10 | **Restore servizi/[slug] Stitch design (1st time)** | FE5 (021303d) replaced approved design | **CRITICAL** |
| `4c27b12` | Mar 10 | Analytics Suspense build fix | Missing Suspense boundary | Medium |
| `b6ec5f4` | Mar 10 | QA fixes across all public pages | Stitch alignment pass revealed issues | Medium |
| `e5d425a` | Mar 10 | sun-400 button text color | Stitch palette incomplete | Low |
| `97576c9` | Mar 10 | CRM/email explicit payloads, GDPR | Smoke test revealed missing fields | Medium |
| `c544d69` | Feb 24 | Mobile menu, logo size, hero nav overlap | Post-launch QA | Medium |
| `88e0b6c` | Feb 24 | a11y buttons, Tailwind classes | Accessibility audit | Low |
| `7897dc9` | Feb 23 | JSX tags, merge markers in projects | Bad merge | **HIGH** |
| `274f91f` | Feb 22 | CRM dead-click sends | Provider errors not surfaced | Medium |
| `171666b` | Feb 22 | Hydration mismatch from multiline classNames | React 19 strict mode | Medium |
| `489838c` | Feb 22 | H1 hidden by CSS | SEO sprint side-effect | Low |
| `7aab250` | Feb 21 | Convex id typing errors | Schema changes without type update | Medium |
| `e4f7a17` | Feb 21 | Placeholder phone number still in code | Missed cleanup | Low |
| `9dcc6c1`→`02824ce` | Feb 13 | **4 deploy fixes** (nixpacks cycle) | Dokploy monorepo config trial-and-error | **HIGH** |
| `eb32138` | Feb 19 | Navbar wrong logo variant | Used full logo instead of monogramma | Low |

### Pattern Analysis

| Pattern | Count | % | Examples |
|---------|-------|---|---------|
| **Design conflict** (automated overwrites approved design) | 3 | 8% | FE5→restore, SEO→restore, merge markers |
| **Deploy config trial-and-error** | 4 | 11% | nixpacks cycle |
| **SEO side-effects** (breaks layout/visibility) | 4 | 11% | H1 hidden, CLS, duplicate titles |
| **Missing validation** (smoke test reveals bugs) | 5 | 14% | CRM, GDPR, typing, placeholder |
| **Styling/a11y cleanup** (post-hoc QA) | 8 | 22% | Mobile menu, buttons, hydration |
| **Content churn** (copy updates cascade) | 3 | 8% | Barbara copy x4 commits same files |

**Root cause dominante**: Design conflict — automated task cycles (FE5, SEO) that modify files with approved designs without checking visual state. Accounted for 2 CRITICAL regressions requiring emergency restores.

---

## 3. File Instability Index

| # Mods | File | Stability | Notes |
|--------|------|-----------|-------|
| **27** | `page.tsx` (homepage) | **CRITICAL** | Reworked in every phase |
| **23** | `servizi/[slug]/page.tsx` | **CRITICAL** | 2x emergency restores |
| **22** | `layout.tsx` | HIGH | Expected (meta, fonts, providers) |
| **20** | `Navbar.tsx` | HIGH | Logo, auth, links changes |
| **18** | `qualita/page.tsx` | HIGH | Content rewrites |
| **18** | `Footer.tsx` | MEDIUM | Logo, links, layout changes |
| **17** | `schema.ts` | MEDIUM | Expected (new tables) |
| **17** | `BlogPostClient.tsx` | HIGH | Design + SEO + comments |
| **16** | `ServiziClient.tsx` | **CRITICAL** | Companion to servizi/[slug] |
| **16** | `chi-siamo/page.tsx` | HIGH | BMAD + Barbara content |
| **16** | `blog/page.tsx` | HIGH | Filters, grid, SEO |
| **15** | `progetti/page.tsx` | MEDIUM | Filters, content |
| **15** | `contatti/page.tsx` | HIGH | Wizard form, CRM |
| **14** | `AdminShell.tsx` | MEDIUM | Expected (new admin pages) |
| **13** | `globals.css` | MEDIUM | Palette migrations |

**Correlation**: The 2 CRITICAL regressions both involve `servizi/[slug]/page.tsx` (23 mods) and `ServiziClient.tsx` (16 mods). These are the most dangerous files in the project.

---

## 4. Session Scorecard

| Session | Date | Commits | Score | Reasoning |
|---------|------|---------|-------|-----------|
| Foundation | Feb 12-13 | 25 | **HIGH** | Solid base, despite deploy trial-and-error |
| BMAD Foundation | Feb 17-18 | 17 | **HIGH** | Clean architecture, design system, task system |
| Brand Integration | Feb 19 | 25 | **HIGH** | Massive value, logo + quiz + SEO in one day |
| Barbara + SEO | Feb 20-21 | 19 | **HIGH** | Content pipeline + SEO sprint, well-executed |
| CMS + Polish | Feb 22-24 | 19 | **MEDIUM** | Good features but introduced hydration bugs, merge markers |
| Auth Migration | Mar 7 | 6 | **HIGH** | Clean Clerk cutover, zero issues |
| Wave 16-20 Blitz | Mar 9 | 27 | **MEDIUM** | High output BUT FE5 broke approved servizi design |
| Stabilization | Mar 10 | 36 | **MEDIUM** | 14 features + 2x restore. Net positive but chaotic |

**Overall**: 6/8 sessions HIGH or solid MEDIUM. The project trajectory is positive despite the servizi regression pattern.

---

## 5. Lessons Learned

### Top 5 Patterns che hanno causato regressioni

1. **No design lock**: File con design approvato (Stitch) modificati da task automatiche senza visual check
2. **Deploy trial-and-error**: 4 commit per nixpacks config — docs-first avrebbe risolto in 1
3. **SEO side-effects**: Commit SEO che modificano layout senza verificare rendering
4. **Merge senza review**: Feb 23 merge con markers rimasti nel codice
5. **Content churn cascade**: 4 commit Barbara sugli stessi file in 1 ora (potevano essere 1)

### Top 5 Cose andate bene

1. **Clerk auth migration** — Zero regressioni, cutover pulito
2. **Stitch design system rollout** — SD1→SD13, approccio incrementale che ha funzionato
3. **SEO sprint execution** — Metodico, single-domain, 15+ commit coerenti
4. **Task system integration** — 95/109 completate (87%), orchestrazione efficace
5. **Recovery rapido** — Ogni regressione risolta nella stessa sessione (< 2 ore)

### Raccomandazioni

**Immediate (prima del prossimo sprint)**:
1. **Lock `servizi/[slug]/page.tsx`** — qualsiasi modifica richiede visual diff prima/dopo
2. **Squash content commits** — 4 commit Barbara → 1. Meno rumore, meno rischio
3. **Pre-commit visual check** — per file nella lista CRITICAL (>20 mods)

**Medio termine**:
4. **Branch strategy per dominio** — `seo/*`, `design/*`, `content/*` non toccano gli stessi file
5. **Screenshot baseline CI** — diff visivo automatico prima di merge su main

**Lungo termine**:
6. **Content layer separation** — Testi in Convex, non hardcoded in componenti React
7. **Design validation** — Stitch component checklist (palette, spacing, typography) come test

---

## Statistiche finali

| Metrica | Valore |
|---------|--------|
| Commit totali | 179 |
| Fix commits | 37 (21%) |
| Regressioni CRITICAL | 2 (entrambe su servizi/[slug]) |
| File con >15 modifiche | 15 |
| Giorni di sviluppo | 16 (su 27 di calendario) |
| Commit/giorno attivo | 11.2 |
| Task completate | 95/109 (87%) |
| Sessioni identificabili | 8 |
| Deploy fix cycles | 1 (4 commit, risolto) |
| Design restores | 2 (stesso file, stesso problema) |

**Verdetto**: Progetto solido con un problema specifico di coordinazione design/SEO. Non un codebase rotto — un workflow che necessita di guard rails sui file critici.
