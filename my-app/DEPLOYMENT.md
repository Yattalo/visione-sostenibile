# Deployment - Visione Sostenibile

## Prerequisiti

- Progetto Convex attivo
- `NEXT_PUBLIC_CONVEX_URL` configurata
- Build locale pulita (`pnpm lint` e `pnpm build`)

## Backend (Convex)

```bash
cd my-app
npx convex deploy
```

## Frontend (Vercel)

```bash
cd my-app
vercel --prod
```

Oppure collegare il repository su [Vercel](https://vercel.com).

## Environment Variables (Vercel)

- `NEXT_PUBLIC_CONVEX_URL`

## Checklist post deploy

1. Verifica form contatti su `/contatti`
2. Verifica pagine principali (`/`, `/servizi`, `/blog`, `/galleria`, `/recensioni`)
3. Verifica area admin (`/admin` e sezioni)
4. Verifica headers di sicurezza da `vercel.json`
