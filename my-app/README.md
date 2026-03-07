# Visione Sostenibile - Next.js + Convex

Sito vetrina per azienda di giardinaggio (Roma) con frontend Next.js e backend Convex.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion
- Convex
- TypeScript

## Avvio rapido

```bash
cd my-app
pnpm install
npx convex dev
pnpm dev
```

Variabile richiesta:

- `NEXT_PUBLIC_CONVEX_URL` (generata da `npx convex dev`)

Variabile richiesta sul deployment Convex quando usi Clerk per autenticare le function:

- `CLERK_JWT_ISSUER_DOMAIN`

## Route pubbliche

- `/`
- `/chi-siamo`
- `/servizi`
- `/servizi/[slug]`
- `/galleria`
- `/recensioni`
- `/blog`
- `/blog/[slug]`
- `/qualita`
- `/contatti`
- `/privacy`
- `/termini`

## Route admin

- `/admin`
- `/admin/services`
- `/admin/gallery`
- `/admin/contacts`
- `/admin/reviews`
- `/admin/blog`
- `/admin/settings`

## Dati e backend

- Schema Convex: `convex/schema.ts`
- Moduli Convex: `convex/services.ts`, `convex/gallery.ts`, `convex/reviews.ts`, `convex/contacts.ts`, `convex/blog.ts`, `convex/pages.ts`
- Form contatti: submit su Convex (`api.contacts.submit`)

Nota: alcune sezioni frontend/admin utilizzano ancora dati statici/mock in attesa di completa integrazione Convex.

## Comandi utili

```bash
pnpm dev
pnpm lint
pnpm build
pnpm exec tsc --noEmit
pnpm exec convex codegen
npx convex dev
npx convex deploy
```

## Privacy e compliance

- Checklist operativa UE / Convex / analytics vendor: `docs/compliance/CONVEX_EU_PRIVACY_CHECKLIST.md`
- Procedura di cutover US -> EU per Convex: `docs/compliance/CONVEX_EU_CUTOVER_RUNBOOK.md`
- Consenso e preferenze cookie: `app/components/CookieConsent.tsx`, `app/components/CookiePreferences.tsx`
- Pagine pubbliche: `app/privacy/page.tsx`, `app/accessibilita/page.tsx`

## Deploy

Frontend: Vercel  
Backend: Convex Cloud

Prima del deploy verificare:

1. `pnpm lint`
2. `pnpm build`
3. `pnpm exec convex codegen`
4. Variabili ambiente su Vercel (`NEXT_PUBLIC_CONVEX_URL`)
5. Variabili ambiente su Convex (`CLERK_JWT_ISSUER_DOMAIN` e gli altri secret usati in produzione)
