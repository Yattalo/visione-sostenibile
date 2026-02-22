# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Visione Sostenibile" — showcase website for an Italian gardening company based in **Torino, Piemonte** (projects in Piemonte/Lombardia). Founded by Andrea Giordano. Biodinamico approach. All UI copy is in Italian.

**Evolution status**: The site is live and functional. Current phase is **BMAD-guided evolution** (not a rebuild) toward a premium lead-acquisition platform. See `my-app/docs/foundation_docs/CLAUDE.md` for the full BMAD vision.

## Commands

All commands run from `my-app/`:

```bash
# Development (two terminals)
pnpm dev              # Next.js on localhost:3000
npx convex dev        # Convex backend in watch mode

# Build & lint
pnpm build
pnpm lint             # ESLint (next/core-web-vitals + typescript)

# Deploy
npx convex deploy     # Backend to Convex cloud
vercel --prod         # Frontend to Vercel (mil1 region)

# Database
npx convex dashboard  # Open Convex web dashboard

# Task System (UCA Orchestration)
npx convex run taskSystem/tasks:list '{}'
npx convex run taskSystem/orchestrator:getStats '{}'
npx convex run taskSystem/orchestrator:getKanban '{}'
npx convex run taskSystem/orchestrator:updateStatus '{"taskId":"F1","newStatus":"in_progress","agent":"claude"}'
```

## Architecture

**Stack**: Next.js 16 (App Router) + Convex + Tailwind CSS v4 + Framer Motion + React 19 with React Compiler enabled.

**Package manager**: pnpm

**Monorepo note**: The actual Next.js app lives in `my-app/`, not the repo root.

### Data Layer — Dual Strategy

- **Convex** (`convex/`): Primary backend. Schema in `convex/schema.ts` with **9 domain tables**: `pages`, `services`, `gallery`, `reviews`, `contactSubmissions`, `blogPosts`, `projects`, `shareEvents`, `settings`. Plus task system tables via `...taskSystemTables`.
- **Static fallback** (`app/lib/static-data.ts`, `app/lib/blog.ts`, `app/lib/progetti-data.ts`): Hardcoded data used when Convex is not connected. **Migration target**: move blog and projects data entirely to Convex (tables exist, data doesn't yet).

Seed initial services via Convex Dashboard: call `api.services.seed()`.

### Frontend Structure

- `app/` — Next.js App Router pages.
- `app/admin/` — Admin panel with its own layout (sidebar + header). **No auth implemented yet.**

#### Public Routes (12)
`/` (homepage), `/chi-siamo`, `/servizi`, `/servizi/[slug]`, `/progetti`, `/progetti/[slug]`, `/blog`, `/blog/[slug]`, `/contatti`, `/qualita`, `/privacy`, `/termini`

#### Admin Routes (7)
`/admin` (dashboard), `/admin/services`, `/admin/gallery`, `/admin/contacts`, `/admin/reviews`, `/admin/blog`, `/admin/settings`

### Component Library

- `app/components/` — Shared: `Navbar`, `Footer`, `LoadingState`, `ServiceCard`, `ReviewsWidget`, `PhilosophySection`, `TiltedCard`, `animations.tsx`.
- `app/components/ui/` — Primitives: `Button` (4 variants), `Card` (4 variants), `Badge` (8 variants), `Input`, `Modal` (Portal), `Skeleton` (6 variants).
- `app/template.tsx` — Framer Motion page transitions (fade + slide).
- `app/ConvexClientProvider.tsx` — Client-side Convex provider. Requires `NEXT_PUBLIC_CONVEX_URL`.

### Design System

Tailwind v4 with `@theme` tokens in `globals.css`.

**Current palette** (in code):
- **cream** (warm beige backgrounds, base `#fdfcf8`)
- **moss** (green accents, brand `#4b562e`)
- **terracotta** (warm accent/CTA `#cb6a56`)
- **charcoal** (text/dark `#0f0f0f`)

**Target palette** (BMAD "High-Contrast Nature"):
- **Paper Canvas** `#F2F0EC` — base with noise texture
- **Deep Forest** `#0B1E0E` — authority, bold typography
- **Leaf Green** `#22582C` / `#4FA45A` — botanical accents
- **Sun Accent** `#EAB831` — CTA only (if yellow, user must click)

**Current typography**: `Playfair Display` (display/body via `--font-display`, `--font-body`) + `Quicksand` (sans via `--font-sans`).

**Target typography** (BMAD): `Walkway Family` (font files in `public/walkway/`).

Custom CSS utilities: `.bg-cream-gradient`, `.bg-moss-gradient`, `.text-gradient-warm`, `.text-gradient-earth`, `.bg-organic-noise`.

`cn()` helper in `app/lib/utils.ts` (clsx + tailwind-merge).

### Animations

`app/components/animations.tsx` exports Framer Motion wrappers: `FadeIn`, `SlideUp`, `SlideDown`, `ScaleIn`, `StaggerContainer`, `StaggerItem`, `TypingText`, `Bounce`, `Glow`, and the `useScrollAnimation` hook. Use these instead of raw Framer Motion for consistency.

### Key Conventions

- Dynamic routes use slugs (e.g. `/servizi/[slug]`, `/blog/[slug]`, `/progetti/[slug]`)
- Convex queries use `withIndex()` for filtered reads (never `.filter()` alone on large tables)
- Admin mutations use upsert pattern (check existing by slug, patch or insert)
- Images served from Unsplash (`images.unsplash.com` allowed in `next.config.ts`) + local `/public/images/`, `/public/progetti/`
- Icons from `lucide-react`
- Mobile-first: readability must not depend on hover

### Task System

`@yattalo/task-system` v0.5.0 for UCA orchestration. Schema integrated in `convex/schema.ts`. Task definitions in `convex/taskSystem/taskDefinitions.ts`. Dashboard: `task-system dashboard` (bundled React SPA).

## BMAD Evolution Reference

For full BMAD context (palette, typography, micro-funnel, scorecard, roadmap), see:
`my-app/docs/foundation_docs/CLAUDE.md`

## Repository Structure

```
root/
├── my-app/              ← Progetto Next.js principale (usa questo per 开发)
├── .claude/             ← Claude Code: settings + skills
├── tools/               ← Script eseguibili (node/python)
├── docs/                ← Documentazione (prompt, audit, setup, screenshot baseline)
├── artifacts/           ← Output di lavoro (ignorato da git)
└── social-content/      ← Workspace generazione contenuti social (ignorato da git)
```

### Cartelle Speciali (Progressive Disclosure)

**Solo se devi lavorare su quello specifico dominio:**

- `tools/agent-ops/` — Script per orchestrazione agenti (🤖 agent-dispatch)
- `docs/workspace/` — PowerPoint production e slide template
- `docs/prompts/` — Prompt per generazione contenuti blog/servizi
- `docs/screenshot-baseline/` — Reference visivo QA (legilo se fai screenshot testing)
- `docs/quiz-screenshots/` — Screenshot quiz per reference
- `artifacts/workspace/` — Ambiente PowerPoint production
- `artifacts/video/` — Video generati (Sora)
- `artifacts/pdf/` — PDF generati
- `social-content/` — Workspace Instagram posts (💡 contenuti social)

**Non toccare a meno che non ti venga chiesto esplicitamente:**
- `artifacts/tmp/` — Work in progress temporaneo
- `artifacts/stitching/` — Immagini stitched per preview
