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
npx convex dev
npx convex deploy
```

## Deploy

Frontend: Vercel  
Backend: Convex Cloud

Prima del deploy verificare:

1. `pnpm lint`
2. `pnpm build`
3. Variabili ambiente su Vercel (`NEXT_PUBLIC_CONVEX_URL`)
