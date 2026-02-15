# Lead Magnets & Featured Snippets — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a quiz-based lead magnet system and optimize all existing pages for Google featured snippets.

**Architecture:** Quiz is a multi-step React component with Framer Motion, stored in Convex. Featured snippets optimization adds JSON-LD schemas and restructures headings/content across existing pages.

**Tech Stack:** Next.js 16 (App Router), Convex, Tailwind CSS v4, Framer Motion, React 19

---

## Phase 1: Foundation (Wave 1)

### Task C10: Add quizSubmissions table to Convex schema

**Files:**
- Modify: `convex/schema.ts:91-108` (after shareEvents, before blogPosts)
- Create: `convex/quiz.ts`

**Step 1: Add quizSubmissions table to schema**

In `convex/schema.ts`, add after the `shareEvents` table (line 91):

```typescript
quizSubmissions: defineTable({
  answers: v.array(
    v.object({
      questionId: v.string(),
      answer: v.string(),
    })
  ),
  resultProfile: v.string(),
  email: v.optional(v.string()),
  phone: v.optional(v.string()),
  source: v.string(),
  createdAt: v.number(),
})
  .index("by_date", ["createdAt"])
  .index("by_profile", ["resultProfile"]),
```

**Step 2: Create quiz mutation file**

Create `convex/quiz.ts`:

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submit = mutation({
  args: {
    answers: v.array(
      v.object({
        questionId: v.string(),
        answer: v.string(),
      })
    ),
    resultProfile: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quizSubmissions", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("quizSubmissions")
      .withIndex("by_date")
      .order("desc")
      .take(100);
  },
});
```

**Step 3: Verify Convex compiles**

Run: `cd my-app && npx convex dev --once`
Expected: Schema validated, no errors

**Step 4: Commit**

```bash
git add convex/schema.ts convex/quiz.ts
git commit -m "feat(convex): add quizSubmissions table and quiz mutations"
```

---

### Task C11: Create QuizGiardino component

**Files:**
- Create: `app/components/QuizGiardino.tsx`
- Reference: `app/components/ui/Button.tsx`, `app/components/ui/Modal.tsx`

**Step 1: Create quiz data and component**

Create `app/components/QuizGiardino.tsx` with:

- 6 questions array with questionId, label, options
- 4 result profiles with scoring logic
- Multi-step form with Framer Motion AnimatePresence transitions
- Progress bar (step indicator)
- Result screen with profile name, description, recommended services
- Email capture form post-result
- Convex mutation call on submit
- Props: `source: string` (homepage | servizi | blog), `onComplete?: () => void`

**Scoring logic per profile:**
- "Il Giardino Contemplativo": relax + poco tempo + sostenibilita
- "L'Orto Sostenibile": orto + sostenibilita
- "Il Parco Familiare": gioco + zero tempo + grande spazio
- "Il Verde Rappresentativo": rappresentanza/estetica

**Key implementation details:**
- Use `motion.div` with `key={currentStep}` for AnimatePresence transitions
- Each question renders as a grid of clickable option cards
- Progress bar: `w-[${(step/6)*100}%]` with moss-600 bg
- Result screen: cream-gradient background, profile icon, service links
- Email form: simple input + submit, uses `api.quiz.submit` mutation
- Portal-rendered modal variant available via `variant="modal"` prop

**Step 2: Verify component renders**

Import in a test page or Storybook-like setup to verify it renders without errors.

**Step 3: Commit**

```bash
git add app/components/QuizGiardino.tsx
git commit -m "feat: add QuizGiardino multi-step quiz component"
```

---

### Task C12: Create QuizCTA and QuizMiniPreview components

**Files:**
- Create: `app/components/QuizCTA.tsx`
- Create: `app/components/QuizMiniPreview.tsx`

**Step 1: Create QuizCTA**

A simple card/banner component that links to `/quiz`:
- Props: `variant?: "sidebar" | "inline" | "compact"`, `className?: string`
- Sidebar variant: vertical card with Sprout icon, title, description, CTA button
- Inline variant: horizontal banner full-width
- Compact variant: minimal text + link
- All link to `/quiz`
- Uses existing Button, Card components and design tokens

**Step 2: Create QuizMiniPreview**

Embedded component for homepage showing the first quiz question as a teaser:
- Shows "Che spazio hai?" with 4 clickable option cards
- On click, redirects to `/quiz?start=2` (skip first question, store answer)
- cream-gradient background with organic decorative elements
- Uses Framer Motion for hover/tap animations on option cards

**Step 3: Commit**

```bash
git add app/components/QuizCTA.tsx app/components/QuizMiniPreview.tsx
git commit -m "feat: add QuizCTA banner and QuizMiniPreview components"
```

---

### Task C13: Create /quiz page route

**Files:**
- Create: `app/quiz/page.tsx`

**Step 1: Create quiz page**

Server component wrapper for QuizGiardino:
- Export metadata: `title: "Che Giardino Fa Per Te? | Quiz", description: "Scopri..."`
- Renders `<QuizGiardino source="quiz-page" />` inside a full-screen centered layout
- Clean minimal page: moss-900 header with title + subtitle, cream-50 body with quiz
- Back link to homepage

**Step 2: Verify route works**

Run: `pnpm dev` and navigate to `http://localhost:3000/quiz`
Expected: Quiz renders, questions advance, result shows

**Step 3: Commit**

```bash
git add app/quiz/page.tsx
git commit -m "feat: add /quiz dedicated page route"
```

---

## Phase 2: Integration (Wave 2)

### Task C14: Integrate quiz into homepage

**Files:**
- Modify: `app/page.tsx:289` (after services section, before stats)

**Step 1: Add QuizMiniPreview section to homepage**

After the services section CTA button (line ~288, after `</section>` closing the services), add a new section:

```tsx
{/* Quiz — Discover your garden */}
<section className="py-24 md:py-32 bg-cream-100 relative overflow-hidden">
  <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-charcoal-400 mb-4 block">
        Scopri il tuo stile
      </span>
      <h2 className="font-display text-4xl md:text-5xl text-moss-700 mb-6">
        Che giardino fa per te?
      </h2>
      <p className="font-body text-lg text-charcoal-500 mb-12 max-w-2xl">
        Rispondi a 6 domande e scopri il profilo di giardino ideale per le tue esigenze.
      </p>
    </motion.div>
    <QuizMiniPreview />
  </div>
</section>
```

Import `QuizMiniPreview` at top of file.

**Step 2: Verify homepage renders**

Run: `pnpm dev`, check homepage scrolls correctly, quiz section appears between services and stats.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(homepage): add quiz discovery section"
```

---

### Task C15: Add QuizCTA sidebar to service pages (Template 1)

**Files:**
- Modify: `app/servizi/[slug]/page.tsx:383-428` (TemplateOne aside section)

**Step 1: Add QuizCTA to TemplateOne sidebar**

In the `TemplateOne` function, inside `<aside className="space-y-6">`, after the existing contact card and video card, add:

```tsx
<QuizCTA variant="sidebar" />
```

Import `QuizCTA` at top of file.

**Step 2: Verify service page Template 1**

Navigate to `/servizi/progettazione-giardini-orti?template=1`
Expected: Quiz CTA card visible in sidebar below the video card

**Step 3: Commit**

```bash
git add app/servizi/[slug]/page.tsx
git commit -m "feat(servizi): add quiz CTA to Template 1 sidebar"
```

---

### Task C16: Add quiz CTAs to blog posts

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: Create BlogQuizCTA inline component**

Add inside the blog page file (or import from QuizCTA):

**Mid-article CTA** — Insert between the quick answer section and the template section (after line ~381). Add a `<QuizCTA variant="inline" />` wrapped in a div with spacing.

**End-article CTA** — Insert after the FAQ section (after line ~477, before the related posts). Add a section:

```tsx
<section className="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
  <div className="bg-moss-50 rounded-2xl p-6 lg:p-8 text-center">
    <h3 className="font-display text-2xl text-charcoal-800 mb-3">
      Prossimo passo
    </h3>
    <p className="text-charcoal-600 mb-6">
      Scopri quale servizio fa per te con il nostro quiz gratuito.
    </p>
    <Link href="/quiz">
      <Button variant="secondary">
        Fai il quiz <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </Link>
  </div>
</section>
```

**Step 2: Verify blog page**

Navigate to a blog post. Check mid-article and end-article CTAs render correctly.

**Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat(blog): add quiz CTA mid-article and end-article"
```

---

## Phase 3: Featured Snippets — Schema (Wave 3)

### Task C17: Add Organization, LocalBusiness, WebSite schemas to layout

**Files:**
- Modify: `app/layout.tsx:48-58` (inside `<html>` before `<body>`)

**Step 1: Add global JSON-LD schemas**

Inside `RootLayout`, before `<body>`, add three `<script type="application/ld+json">` blocks:

**Organization:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Visione Sostenibile",
  "url": "https://www.visionesostenibile.it",
  "logo": "https://www.visionesostenibile.it/logo.png",
  "description": "Progettazione, realizzazione e manutenzione di giardini sostenibili con metodi biodinamici in Piemonte e Lombardia.",
  "foundingDate": "2009",
  "areaServed": ["Piemonte", "Lombardia"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+39-371-482-1825",
    "contactType": "customer service",
    "availableLanguage": "Italian"
  }
}
```

**LocalBusiness:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Visione Sostenibile",
  "description": "Giardinaggio sostenibile e biodinamico",
  "url": "https://www.visionesostenibile.it",
  "telephone": "+39-371-482-1825",
  "email": "visionesostenibile96@gmail.com",
  "areaServed": ["Piemonte", "Lombardia"],
  "priceRange": "$$",
  "knowsAbout": ["Giardinaggio biodinamico", "Progettazione giardini", "Manutenzione verde sostenibile"]
}
```

**WebSite with SearchAction:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Visione Sostenibile",
  "url": "https://www.visionesostenibile.it"
}
```

**Step 2: Validate with structured data testing tool**

Run dev server and check page source for valid JSON-LD.

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(seo): add Organization, LocalBusiness, WebSite JSON-LD schemas"
```

---

### Task C18: Add BreadcrumbList schema to service and blog pages

**Files:**
- Modify: `app/servizi/[slug]/page.tsx:674-699` (near existing JSON-LD blocks)
- Modify: `app/blog/[slug]/page.tsx:276-301` (near existing JSON-LD blocks)

**Step 1: Add BreadcrumbList to service pages**

After the existing `faqJsonLd` block in `ServiceDetailPage`, add:

```typescript
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "Servizi", "item": `${SITE_URL}/servizi` },
    { "@type": "ListItem", "position": 3, "name": service.title, "item": `${SITE_URL}/servizi/${service.slug}` },
  ],
};
```

Add corresponding `<script type="application/ld+json">` in the JSX.

**Step 2: Add BreadcrumbList to blog pages**

Similar pattern: Home > Blog > Post Title

**Step 3: Commit**

```bash
git add app/servizi/[slug]/page.tsx app/blog/[slug]/page.tsx
git commit -m "feat(seo): add BreadcrumbList JSON-LD to service and blog pages"
```

---

### Task C19: Add HowTo schema to blog posts

**Files:**
- Modify: `app/blog/[slug]/page.tsx:276-301` (JSON-LD section)

**Step 1: Create HowTo schema from articleSteps data**

The `articleSteps` data already contains step-by-step instructions. Create a HowTo schema:

```typescript
const howToJsonLd = steps.length > 0 ? {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": post.title,
  "description": post.excerpt,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "text": step,
  })),
} : null;
```

Add conditional `<script>` block in JSX only when `howToJsonLd` is not null.

**Step 2: Verify in page source**

Check that HowTo schema appears in page source for all 3 blog posts.

**Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat(seo): add HowTo JSON-LD schema to blog posts"
```

---

## Phase 4: Featured Snippets — Content (Wave 3)

### Task C20: Restructure blog H2 headings to question format

**Files:**
- Modify: `app/lib/blog.ts:19-166` (blog post content)

**Step 1: Update H2s in "come-mantenere-giardino-autunno"**

Change:
- `## Pulizia e Manutenzione` -> `## Come fare la pulizia del giardino in autunno?`
- `## Protezione dal Freddo` -> `## Come proteggere le piante dal freddo invernale?`
- `## Piantumazione Autunnale` -> `## Quali piante mettere a dimora in autunno?`
- `## Concimazione` -> `## Che concime usare prima dell'inverno?`

**Step 2: Update H2s in "tendenze-giardini-2024"**

Change:
- `## 1. Giardini a Bassa Manutenzione` -> `## Come creare un giardino a bassa manutenzione?`
- `## 2. Biodiversita` -> `## Come favorire la biodiversita in giardino?`
- `## 3. Spazi Living Esterni` -> `## Come progettare uno spazio living esterno?`
- `## 4. Tecnologia Verde` -> `## Quale tecnologia usare in giardino?`
- `## 5. Colori audaci` -> `## Quali colori scegliere per il giardino 2024?`

**Step 3: Update H2s in "piante-pendio"**

Change:
- `## Perche Scegliere Piante Adeguate` -> `## Perche e importante scegliere piante adeguate per i pendii?`
- `## Piante Consigliate` -> `## Quali sono le migliori piante per terreni in pendio?`
- `## Consigli di Installazione` -> `## Come piantare su un terreno in pendenza?`

**Step 4: Verify rendering**

Check that all blog posts render correctly with new H2 text.

**Step 5: Commit**

```bash
git add app/lib/blog.ts
git commit -m "feat(seo): restructure blog H2 headings to question format for featured snippets"
```

---

### Task C21: Optimize quick answers to 40-60 word sweet spot

**Files:**
- Modify: `app/blog/[slug]/page.tsx:37-44` (quickAnswers)
- Modify: `app/servizi/[slug]/page.tsx:88-322` (serviceContents quickAnswer)

**Step 1: Count and adjust blog quick answers**

Current word counts (Italian):
- autunno: ~48 words (OK)
- tendenze: ~42 words (OK)
- pendio: ~43 words (OK)

All are within 40-60 range. Verify and fine-tune if any are over/under.

**Step 2: Count and adjust service quick answers**

Check each `quickAnswer` in `serviceContents`. Trim to 40-60 words if needed. Current ones are approximately 40-50 words each — verify individually.

**Step 3: Commit**

```bash
git add app/blog/[slug]/page.tsx app/servizi/[slug]/page.tsx
git commit -m "feat(seo): optimize quick answers to 40-60 word sweet spot for paragraph snippets"
```

---

### Task C22: Add H2 question heading to service quick answer sections

**Files:**
- Modify: `app/servizi/[slug]/page.tsx:791-796` (quick answer section)

**Step 1: Create question heading map**

Add a `serviceQuestionH2` map:

```typescript
const serviceQuestionH2: Record<string, string> = {
  "progettazione-giardini-orti": "Quanto costa la progettazione di un giardino sostenibile?",
  "realizzazione-chiavi-in-mano": "Come funziona la realizzazione chiavi in mano di un giardino?",
  "manutenzione-sostenibile": "Quanto costa la manutenzione sostenibile del giardino?",
  "potatura-professionale": "Quando e come fare la potatura professionale?",
  "gestione-verde-biodinamica": "Cos'e la gestione biodinamica del verde?",
};
```

**Step 2: Replace generic "Risposta rapida" H2 with question**

In the quick answer section (line ~793), change:
```tsx
<h2 className="font-display text-2xl lg:text-3xl text-charcoal-800 mb-4">Risposta rapida</h2>
```
to:
```tsx
<h2 className="font-display text-2xl lg:text-3xl text-charcoal-800 mb-4">
  {serviceQuestionH2[slug] ?? "Risposta rapida"}
</h2>
```

**Step 3: Commit**

```bash
git add app/servizi/[slug]/page.tsx
git commit -m "feat(seo): add question-format H2 to service quick answers for featured snippets"
```

---

## Phase 5: Template Audit (Wave 4)

### Task C23: Systematic template audit — services

**Files:**
- Modify: various (fixes found during audit)

**Step 1: Audit each service page against checklist**

For each of the 5 services, verify:
- [ ] H1 unico e keyword-focused
- [ ] Quick answer <= 60 parole
- [ ] Almeno 1 H2 in formato domanda
- [ ] FAQ con schema FAQPage (already present)
- [ ] BreadcrumbList schema (added in C18)
- [ ] Liste con 5-8 items
- [ ] Meta description <= 160 char con keyword principale
- [ ] HowTo schema se contiene step (services have process steps)

**Step 2: Fix any issues found**

Document findings and fix each issue.

**Step 3: Commit**

```bash
git add -A
git commit -m "fix(seo): template audit fixes for service pages"
```

---

### Task C24: Systematic template audit — blog posts

**Files:**
- Modify: various (fixes found during audit)

**Step 1: Audit each blog post against checklist**

For each of the 3 blog posts, verify same checklist as C23.

**Step 2: Fix any issues found**

**Step 3: Commit**

```bash
git add -A
git commit -m "fix(seo): template audit fixes for blog posts"
```

---

### Task C25: Final build verification and cleanup

**Files:**
- All modified files

**Step 1: Run full build**

Run: `cd my-app && pnpm build`
Expected: Build succeeds with no errors

**Step 2: Run lint**

Run: `cd my-app && pnpm lint`
Expected: No lint errors

**Step 3: Verify all pages load**

Manually check:
- `/` (homepage with quiz section)
- `/quiz` (dedicated quiz page)
- `/servizi/progettazione-giardini-orti?template=1` (sidebar CTA)
- `/blog/come-mantenere-giardino-autunno` (mid + end article CTA)
- View page source for all JSON-LD schemas

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final build verification and cleanup"
```

---

## Task Dependency Graph

```
C10 (schema) ──┐
               ├── C11 (quiz component) ── C13 (quiz page) ──┐
C12 (CTA components) ────────────────────────────────────────┤
                                                              ├── C14 (homepage)
                                                              ├── C15 (service sidebar)
                                                              ├── C16 (blog CTAs)
                                                              │
C17 (global schemas) ─────────────────────────────────────────┤
C18 (breadcrumb schemas) ────────────────────────────────────┤
C19 (HowTo schema) ──────────────────────────────────────────┤
C20 (H2 restructuring) ──────────────────────────────────────┤
C21 (quick answer optimization) ─────────────────────────────┤
C22 (service H2 questions) ──────────────────────────────────┤
                                                              │
                                                              ├── C23 (audit services)
                                                              ├── C24 (audit blog)
                                                              └── C25 (final build)
```
