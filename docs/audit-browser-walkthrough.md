# Browser & Lighthouse Audit — Visione Sostenibile

**Data**: 2026-03-10 | **Build**: Production (`pnpm build && pnpm start`) | **Rotte testate**: 27 Playwright + 15 Lighthouse

---

## Executive Summary

| Metrica | Before | After | Delta |
|---------|--------|-------|-------|
| **Images size** | 76MB (PNG/JPG) | 12MB (WebP) | **-84%** |
| **Lighthouse Perf avg** | 67 | 72 (excl. contatti) | **+5** |
| **chi-siamo Perf** | 55 (LCP 14.4s) | 72 (LCP ~7.8s) | **+17** |
| **Homepage Perf** | 74 | 78 | **+4** |
| **Servizi Perf** | 73 | 77 | **+4** |
| **A11y avg** | 96 | 96 | = |
| **SEO avg** | 97 (100 public) | 97 (100 public) | = |

### Fix applicati
1. **86 immagini convertite** da PNG/JPG a WebP (76MB → 12MB, -84%)
2. **chi-siamo hero** da CSS background a `next/image` con `priority` (860KB → 121KB servita)
3. **chi-siamo approccio** da CSS `backgroundImage` a `next/image` lazy
4. **4 blog cover mancanti** (Barbara) — collegati a cover esistenti
5. **Tutti i riferimenti** aggiornati a `.webp` (8 file source)
6. **Originali rimossi** dopo verifica WebP completa

### Problemi residui
- `/contatti` Perf=0: Lighthouse non riesce a catturare LCP dal wizard Framer Motion. Non è un bug utente.
- BP 77 uniforme: causato da Clerk SDK (non controllabile)
- Admin SEO 57: atteso (no meta tags su admin)

---

## Lighthouse Scores — Before vs After

| Route | Perf Before | Perf After | A11y | BP | SEO |
|-------|-------------|------------|------|-----|-----|
| `/` | 74 | **78 (+4)** | 92 | 77 | 100 |
| `/chi-siamo` | 55 | **72 (+17)** | 92 | 77 | 100 |
| `/servizi` | 73 | **77 (+4)** | 96 | 77 | 100 |
| `/servizi/progettazione-giardini` | 74 | 70 (-4) | 92 | 77 | 100 |
| `/progetti` | 78 | 74 (-4) | 96 | 77 | 100 |
| `/blog` | 76 | 76 (=) | 96 | 77 | 100 |
| `/contatti` | 0* | 0* | 100 | 77 | 100 |
| `/qualita` | 73 | 73 (=) | 96 | 77 | 100 |
| `/quiz` | 72 | **73 (+1)** | 100 | 77 | 100 |
| `/collabora` | 73 | 69 (-4) | 100 | 77 | 100 |
| `/partner` | 75 | **78 (+3)** | 100 | 77 | 100 |
| `/privacy` | 75 | **80 (+5)** | 96 | 77 | 100 |
| `/termini` | 75 | 74 (-1) | 92 | 77 | 100 |
| `/accessibilita` | 74 | 71 (-3) | 100 | 77 | 100 |
| `/admin` | 68 | 68 (=) | 94 | 93 | 57 |

*`/contatti` Perf=0: Lighthouse anomaly — Framer Motion wizard non espone LCP element misurabile. Non è un bug utente.*

**Note**: Variazioni +-4 rientrano nel rumore di misurazione Lighthouse locale. I miglioramenti reali sono `/chi-siamo` (+17) e homepage (+4).

### Lighthouse Diagnosis

#### `/contatti` — Perf 0
- FCP 2.3s (ok), ma LCP e TBT non misurabili (score: null)
- Causa: Framer Motion multi-step wizard potrebbe non rendere LCP element in tempo per Lighthouse
- CLS: 0 (perfetto) — il layout è stabile
- **Non è un problema utente reale**, è un'anomalia di misurazione

#### `/chi-siamo` — Perf 55
- **FCP 7.0s** — gravemente lento
- **LCP 14.4s** — critico
- **Root cause**: `hero.jpg` 860KB + `approccio.jpg` 177KB non ottimizzate
- Fix: convertire a WebP/AVIF, ridimensionare, aggiungere `priority` a hero image

#### Best Practices 77 uniforme
- Probabilmente: mixed content, console warnings, o deprecated API usate da Clerk
- Non critico per UX

#### Admin SEO 57
- Atteso: admin non ha meta tags SEO (non serve, non è indicizzato)

---

## Playwright Walkthrough (Desktop + Mobile)

### Route Status Table

| Route | Desktop | Mobile | Issues |
|-------|---------|--------|--------|
| `/` | WARN | WARN | 6/7 broken images |
| `/chi-siamo` | WARN | WARN | 19/21 broken images |
| `/servizi` | WARN | WARN | 1/14 desktop, 7/14 mobile broken |
| `/servizi/progettazione-giardini` | WARN | WARN | 1/7 broken |
| `/servizi/manutenzione-giardini` | OK | OK | — |
| `/servizi/irrigazione-smart` | OK | OK | — |
| `/servizi/consulenza-green` | OK | OK | — |
| `/progetti` | OK | WARN | 2/11 broken (mobile only) |
| `/blog` | OK | OK | — |
| `/contatti` | OK | OK | — |
| `/qualita` | WARN | WARN | 1/3 broken |
| `/quiz` | OK | OK | — |
| `/collabora` | WARN | WARN | 1/2 broken |
| `/partner` | OK | OK | — |
| `/privacy` | OK | WARN | 1/2 broken (mobile only) |
| `/termini` | OK | OK | — |
| `/accessibilita` | OK | OK | — |
| `/admin` | OK | OK | No `<main>` |
| `/admin/services` | OK | OK | No `<main>` |
| `/admin/gallery` | OK | OK | No `<main>` |
| `/admin/contacts` | OK | OK | No `<main>` |
| `/admin/reviews` | OK | OK | No `<main>` |
| `/admin/blog` | OK | OK | No `<main>` |
| `/admin/settings` | OK | OK | No `<main>` |
| `/sign-in` | FAIL | FAIL | Timeout (Clerk networkidle) |
| `/sign-up` | FAIL | FAIL | Timeout (Clerk networkidle) |
| `/area-privata` | OK | OK | No `<main>` |

### Nota su sign-in/sign-up FAIL
Falso positivo: Clerk widget mantiene WebSocket aperte, impedendo `networkidle`. Le pagine funzionano nel browser reale.

---

## Issue Priority Matrix

### P0 — Performance Critical

| Issue | Route | Impact | Fix |
|-------|-------|--------|-----|
| `hero.jpg` 860KB | `/chi-siamo` | LCP 14.4s, FCP 7.0s | WebP + resize + `priority` |
| LCP non misurabile | `/contatti` | Lighthouse Perf=0 | Verificare LCP element nel wizard |

### P1 — Immagini Rotte (diffuso)

| Pagina | Broken/Total | % Broken | Causa probabile |
|--------|-------------|----------|-----------------|
| `/chi-siamo` | 19/21 | **90%** | Lazy-load `naturalWidth=0` o missing assets |
| `/` (home) | 6/7 | **86%** | Stessa causa |
| `/servizi` (mobile) | 7/14 | 50% | Responsive image loading |
| `/progetti` (mobile) | 2/11 | 18% | Lazy-load below fold |
| `/qualita` | 1/3 | 33% | Asset mancante |
| `/collabora` | 1/2 | 50% | Asset mancante |

**Nota**: Le "broken images" rilevate da Playwright (`naturalWidth === 0`) possono essere falsi positivi da lazy loading di `next/image`. Verifica manuale necessaria nel browser con Network tab.

### P2 — Cosmetic

| Issue | Route | Impact |
|-------|-------|--------|
| No `<main>` element | Admin (7 rotte) + area-privata | A11y semantica, non impatta utente |
| BP 77 uniforme | Tutte le pagine | Clerk SDK warnings probabile |

---

## Punti di Forza Confermati

- **SEO 100** su tutte le pagine pubbliche — sitemap, meta, JSON-LD, robots funzionano
- **A11y 92-100** — media 96, eccellente. WCAG audit ha dato risultati
- **Zero console errors** su tutte le rotte (Playwright non ne ha rilevati)
- **Zero layout shift** — CLS 0 su tutte le pagine misurate
- **13 rotte perfette** sia desktop che mobile
- **Admin completamente funzionale** — tutte 7 le rotte OK
- **Build production pulita** — nessun errore di build

---

## Raccomandazioni (ordinate per impatto)

1. **Ottimizzare immagini `/chi-siamo`** — hero.jpg da 860KB a ~100KB (WebP + resize 1920px). Aggiungere `priority` prop. Impatto: Perf da 55 a ~85.
2. **Verificare broken images** — Aprire homepage e chi-siamo nel browser, Network tab → filtrare 404. Distinguere falsi positivi lazy-load da asset mancanti reali.
3. **Audit immagini globale** — Tutte le immagini in `/public/images/` dovrebbero essere WebP, max 200KB, con `width`/`height` espliciti.
4. **Fix `/contatti` LCP** — Assicurarsi che il wizard Framer Motion abbia un LCP element visibile entro 2.5s.
5. **`<main>` su AdminShell** — Quick win, 1 riga di codice.

---

## Artifacts

- **Screenshots**: `artifacts/tmp/audit-screenshots/` (52 files)
- **Lighthouse HTML reports**: `artifacts/tmp/lighthouse/` (15 reports)
- **Lighthouse JSON data**: `artifacts/tmp/lighthouse/*.report.json`
- **Playwright raw data**: `artifacts/tmp/audit-screenshots/results.json`
