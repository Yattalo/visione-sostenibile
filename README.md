# Visione Sostenibile - Convex + Next.js

Sito vetrina per azienda di giardinaggio realizzato con **Convex** (backend/database) e **Next.js** (frontend).

## 🗂️ Struttura del Sito

| Pagina | Route | Descrizione |
|--------|-------|-------------|
| Home | `/` | Hero, servizi in evidenza, recensioni |
| Chi Siamo | `/chi-siamo` | Storia azienda e valori |
| Servizi | `/servizi` | Lista 12 servizi |
| Dettaglio Servizio | `/servizi/[slug]` | Pagina singolo servizio |
| Galleria | `/galleria` | Foto lavori con filtri |
| Recensioni | `/recensioni` | Testimonianze + form |
| Contatti | `/contatti` | Form contatto + info |
| Privacy | `/privacy` | Privacy policy |

## 🚀 Quick Start

### 1. Configurazione Convex

```bash
cd my-app
npx convex dev
```

Questo comando:
- Fa login con GitHub
- Crea un progetto Convex
- Genera `.env.local` con `NEXT_PUBLIC_CONVEX_URL`
- Crea la cartella `convex/` con le API

### 2. Seed Dati Iniziali

Nel **Convex Dashboard** (si apre automaticamente), vai nella sezione "Functions" e chiama:

```javascript
api.services.seed()
```

Questo popola i 12 servizi di default.

### 3. Avvia Next.js

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Tabelle Convex:

| Tabella | Scopo |
|---------|-------|
| `pages` | Contenuto pagine statiche (Home, Chi siamo, etc) |
| `services` | 12 servizi di giardinaggio |
| `gallery` | Immagini galleria |
| `reviews` | Recensioni clienti (con moderazione) |
| `contactSubmissions` | Richieste dal form contatti |
| `settings` | Configurazioni sito |

## 📁 File Importanti

```
convex/
├── schema.ts          # Definizione database
├── services.ts        # Query/Mutation servizi
├── pages.ts           # Query pagine statiche
├── gallery.ts         # Query galleria
├── reviews.ts         # Query/Mutation recensioni
└── contacts.ts        # Mutation form contatti

app/
├── page.tsx           # Homepage
├── layout.tsx         # Root layout + ConvexProvider
├── servizi/
│   ├── page.tsx       # Lista servizi
│   └── [slug]/        # Dettaglio servizio dinamico
├── galleria/
├── recensioni/
├── contatti/
├── chi-siamo/
├── privacy/
└── components/        # Navbar, Footer
```

## 🛠️ Comandi Utili

```bash
# Sviluppo
npm run dev              # Next.js dev server
npx convex dev           # Convex dev (altro terminale)

# Database
npx convex dashboard     # Apri dashboard Convex

# Deploy
npx convex deploy        # Deploy backend
npm run build          # Build Next.js
```

## 📝 Popolare Contenuti

### Aggiungere una recensione (via Dashboard):
```javascript
api.reviews.submit({
  authorName: "Mario Rossi",
  authorLocation: "Roma",
  rating: 5,
  text: "Ottimo servizio, giardino meraviglioso!"
})
```

### Approvare recensione:
```javascript
api.reviews.approve({ reviewId: "your-review-id" })
```

### Aggiungere immagine galleria:
```javascript
api.gallery.add({
  title: "Giardino Moderno",
  imageUrl: "https://...",
  category: "giardini",
  order: 1
})
```

## 🎨 Personalizzazione

- Colori: modifica Tailwind in `app/globals.css`
- Logo: sostituisci testo in `app/components/Navbar.tsx`
- Contatti: aggiorna `app/components/Footer.tsx` e `app/contatti/page.tsx`

## 📚 Documentazione

- [Convex Docs](https://docs.convex.dev)
- [Next.js Docs](https://nextjs.org/docs)
