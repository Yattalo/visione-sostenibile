# Deployment - Visione Sostenibile

## Vercel (Consigliato)

```bash
# 1. Install Vercel CLI
pnpm add -g vercel

# 2. Login
vercel login

# 3. Deploy (first time)
cd my-app
vercel

# 4. For subsequent deployments
vercel --prod
```

Oppure connetti il repository GitHub su https://vercel.com

## Convex Deployment

```bash
# Deploy Convex functions
npx convex deploy

# Seed initial data
npx convex run db:seed
```

## Environment Variables

Copia `.env.example` e configura le variabili nel dashboard Vercel:

```
CONVEX_URL=your-convex-url
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

## Post-Deployment

1. **Convex**: Configura il database su https://dashboard.convex.dev
2. **Analytics**: Aggiungi Google Analytics ID se necessario
3. **SEO**: Verifica sitemap e robots.txt
4. **Forms**: Testa il form contatti

## Performance

- Build ottimizzato: 19 pagine
- SSG per contenuti statici
- Immagini ottimizzate con next/image
- Code splitting automatico

## Troubleshooting

```bash
# Clear cache and rebuild
rm -rf .next
pnpm build

# Check Convex status
npx convex info
```
