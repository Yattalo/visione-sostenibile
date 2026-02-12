# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Visione Sostenibile" — showcase website for an Italian gardening company (Rome area). All UI copy is in Italian.

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
```

## Architecture

**Stack**: Next.js 16 (App Router) + Convex + Tailwind CSS v4 + Framer Motion + React 19 with React Compiler enabled.

**Package manager**: pnpm

**Monorepo note**: The actual Next.js app lives in `my-app/`, not the repo root.

### Data Layer — Dual Strategy

- **Convex** (`convex/`): Primary backend. Schema in `convex/schema.ts` with 7 tables: `pages`, `services`, `gallery`, `reviews`, `contactSubmissions`, `blogPosts`, `settings`. Each module (e.g. `convex/services.ts`) exports queries and mutations.
- **Static fallback** (`app/lib/static-data.ts`, `app/lib/blog.ts`): Hardcoded data used when Convex is not connected. Blog content currently lives entirely in `app/lib/blog.ts` as static data.

Seed initial services via Convex Dashboard: call `api.services.seed()`.

### Frontend Structure

- `app/` — Next.js App Router pages. Routes map to Italian paths (`/servizi`, `/chi-siamo`, `/contatti`, `/galleria`, `/recensioni`, `/privacy`, `/qualita`, `/blog`).
- `app/admin/` — Admin panel with its own layout (sidebar + header). Routes: `/admin/services`, `/admin/contacts`, `/admin/reviews`, `/admin/blog`.
- `app/components/` — Shared components: `Navbar`, `Footer`, `LoadingState`, `animations.tsx`.
- `app/components/ui/` — Primitives: `Button`, `Card`, `Badge`, `Input`, `Modal`, `Skeleton`.
- `app/template.tsx` — Framer Motion page transitions (fade + slide) wrapping every route.
- `app/ConvexClientProvider.tsx` — Client-side Convex provider. Requires `NEXT_PUBLIC_CONVEX_URL` env var.

### Design System

Tailwind v4 with `@theme` tokens in `globals.css`. Four custom color palettes:
- **cream** (warm beige backgrounds)
- **moss** (green accents, brand color `#4b562e`)
- **terracotta** (warm accent/CTA)
- **charcoal** (text/dark)

Custom CSS utilities: `.bg-cream-gradient`, `.bg-moss-gradient`, `.text-gradient-warm`, `.text-gradient-earth`, `.bg-organic-noise`.

Typography: `Cormorant Garamond` (display/body via `--font-display`, `--font-body`) and `Quicksand` (sans via `--font-sans`). Use `font-display`, `font-sans`, `font-body` classes.

`cn()` helper in `app/lib/utils.ts` (clsx + tailwind-merge).

### Animations

`app/components/animations.tsx` exports Framer Motion wrappers: `FadeIn`, `SlideUp`, `SlideDown`, `ScaleIn`, `StaggerContainer`, `StaggerItem`, `TypingText`, `Bounce`, `Glow`, and the `useScrollAnimation` hook. Use these instead of raw Framer Motion for consistency.

### Key Conventions

- Dynamic routes use slugs (e.g. `/servizi/[slug]`, `/blog/[slug]`)
- Convex queries use `withIndex()` for filtered reads (never `.filter()` alone on large tables)
- Admin mutations use upsert pattern (check existing by slug, patch or insert)
- Images served from Unsplash (`images.unsplash.com` allowed in `next.config.ts`)
- Icons from `lucide-react`
