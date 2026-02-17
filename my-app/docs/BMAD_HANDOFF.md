# BMAD Method Handoff — Visione Sostenibile

> Documento generato il 17 febbraio 2026
> Scopo: fornire al team di agenti BMAD tutto il contesto tecnico e strategico per produrre Project Brief, PRD, UI/UX Spec, Architettura e Checklist PO.

---

## PARTE 1: CONTESTO PROGETTO

### Chi e il cliente
**Visione Sostenibile** — azienda italiana di giardinaggio sostenibile con approccio biodinamico. Zona: Piemonte (sede a Torino, progetti in Piemonte/Lombardia). Il fondatore e Andrea Giordano.

### Stato attuale
Il sito e **gia online e funzionante**. Non si parte da zero: si tratta di una **evoluzione/formalizzazione** di un progetto esistente. Il redesign deve essere evolutivo, non rivoluzionario.

### Posizionamento brand
- **Biodinamico a impatto zero** — non e un'azienda di giardinaggio generica
- **Tono**: editoriale, naturale, autorevole ma accessibile
- **Palette identitaria**: moss (verde #4b562e), terracotta (arancio caldo), cream (beige), charcoal (testo)
- **Typography**: Playfair Display (display/body) + Quicksand (sans/labels)
- **Riferimento stilistico**: https://www.truegreenecolandscaping.com/ (ispirazione, non copia)

### Contatti e social
- Email: visionesostenibile96@gmail.com
- Telefono: +39 371 482 1825
- Indirizzo: Via San Francesco D'Assisi, 14, 10122 Torino (TO)
- Instagram: https://www.instagram.com/visionesostenibile
- Facebook: https://www.facebook.com/visionesostenibilegiardinieortisostenibili
- LinkedIn: https://www.linkedin.com/in/andrea-giordano-16810626a
- YouTube: https://www.youtube.com/@AndreaGiordano-vk8el

---

## PARTE 2: ARCHITETTURA E TECH STACK

### Framework e versioni principali

| Tecnologia | Versione | Ruolo |
|------------|---------|-------|
| **Next.js** | 16.1.6 | Framework frontend (App Router) |
| **React** | 19.2.3 | UI library (con React Compiler attivo) |
| **Convex** | 1.31.7 | Backend real-time (database + serverless functions) |
| **Tailwind CSS** | 4 | Styling (v4 con @theme tokens in globals.css) |
| **Framer Motion** | 12.34.0 | Animazioni e transizioni |
| **TypeScript** | 5 | Tipizzazione statica (strict mode) |
| **Zod** | 4.3.6 | Validazione runtime |
| **Lucide React** | 0.563.0 | Iconografia |

### Package Manager
**pnpm** — il progetto vive in `my-app/` (non nella root del repo).

### State Management
- **Primario**: Convex (real-time queries + mutations)
- **Fallback statico**: file in `app/lib/` quando Convex non e disponibile
- **Nessun Redux/Zustand/Context API** — lo stato e gestito da Convex hooks (`useQuery`, `useMutation`)

### Database / Backend
**Convex** e l'unico backend. Non ci sono API REST custom. La comunicazione avviene tramite:
- `useQuery(api.modulo.funzione)` — lettura real-time
- `useMutation(api.modulo.funzione)` — scrittura

### Deploy
- **Frontend**: Vercel (regione mil1 - Milano)
- **Backend**: Convex Cloud (auto-deploy con `npx convex deploy`)
- **Build**: `pnpm build` (Next.js con webpack)
- **Security headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection configurati in vercel.json
- **Caching immagini**: 1 anno immutable per .jpg/.png

### Variabili d'ambiente
- `NEXT_PUBLIC_CONVEX_URL` — URL del deployment Convex (unica variabile richiesta lato frontend)

---

## PARTE 3: MAPPA ROTTE E PAGINE

### Rotte pubbliche (12)

| Rotta | Scopo | Componenti chiave |
|-------|-------|-------------------|
| `/` | Homepage | Hero video, Filosofia 4 elementi, Servizi featured, ReviewsWidget, CTA finale |
| `/chi-siamo` | Chi siamo | Storia aziendale, valori, bio del fondatore |
| `/servizi` | Lista servizi | Grid 12 ServiceCard, percorso "ascolto-progetto-realizzazione" |
| `/servizi/[slug]` | Dettaglio servizio | Template dinamico con FAQ, gallery, features, CTA |
| `/progetti` | Portfolio progetti | Grid con filtri, card progetto con localita/tipo |
| `/progetti/[slug]` | Dettaglio progetto | Galleria foto/render, features, descrizione |
| `/blog` | Lista articoli | Post in evidenza + grid, metadata (data, tempo lettura, categoria) |
| `/blog/[slug]` | Articolo blog | Contenuto completo, articoli correlati |
| `/contatti` | Form contatto | Form multi-step (nome, email, telefono, servizio, messaggio) |
| `/qualita` | Certificazioni | Certificazioni, standard operativi, garanzie |
| `/privacy` | Privacy policy | Testo legale |
| `/termini` | Termini e condizioni | Testo legale |

### Rotte admin (7) — sotto `/admin`

| Rotta | Funzionalita |
|-------|-------------|
| `/admin` | Dashboard: stats (servizi, immagini, recensioni, messaggi), contatti recenti, review da moderare |
| `/admin/services` | CRUD servizi: lista, ricerca, riordino, toggle attivo/inattivo |
| `/admin/gallery` | Gestione immagini: ricerca, filtro per categoria, eliminazione |
| `/admin/contacts` | Messaggi ricevuti: filtro (tutti/non letti/risposte), segna come letto |
| `/admin/reviews` | Moderazione recensioni: filtro (tutti/pending/approvate), approva/rifiuta |
| `/admin/blog` | Gestione blog: filtro (tutti/pubblicati/bozze), CRUD post |
| `/admin/settings` | Impostazioni sito: nome, email, telefono, testo hero homepage |

**Nota critica**: l'admin panel NON ha autenticazione/autorizzazione implementata.

---

## PARTE 4: COMPONENT LIBRARY E DESIGN SYSTEM

### Componenti UI primitivi (`app/components/ui/`)

| Componente | Varianti | Note |
|------------|---------|------|
| **Button** | primary, secondary, outline, ghost + 3 size (sm, md, lg) | Motion-enabled con Framer Motion |
| **Card** | default, elevated, outline, glass | Composabile: CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Badge** | default, primary, earth, success, warning, outline, eco, biodynamic | 8 varianti tematiche |
| **Input** | Input + Textarea | Con supporto validazione |
| **Modal** | — | Usa React Portal (`createPortal` su `document.body`) |
| **Skeleton** | SkeletonCard, SkeletonHero, SkeletonStats, SkeletonGallery, SkeletonReview, SkeletonForm | Loading states |

### Componenti composti (`app/components/`)

| Componente | Scopo |
|------------|-------|
| **Navbar** | Nav fissa con scroll-aware styling, menu mobile hamburger |
| **Footer** | Links, social, contatti, copyright |
| **ServiceCard** | Card servizio con hover effects |
| **ReviewsWidget** | Widget recensioni (grid/carousel) |
| **PhilosophySection** | Sezione filosofia con 4 elementi biodinamici |
| **TiltedCard** | Card con effetto tilt 3D |
| **LoadingState / PageLoader** | Skeleton loading states composite |
| **animations.tsx** | FadeIn, SlideUp, SlideDown, ScaleIn, StaggerContainer, StaggerItem, TypingText, Bounce, Glow, useScrollAnimation |

### Palette colori (Tailwind v4 @theme tokens)

| Palette | Gamma | Colore chiave | Uso |
|---------|-------|--------------|-----|
| **cream** | 50-950 | #fdfcf8 (50) | Sfondi, aree chiare |
| **moss** | 50-950 | #4b562e (600-800) | Brand color, accenti verdi |
| **terracotta** | 50-950 | #cb6a56 (500) | CTA, accento caldo |
| **charcoal** | 50-950 | #0f0f0f (950) | Testo, aree scure |

### Gradienti e utility custom

```css
.bg-cream-gradient    /* 180deg cream-50 → cream-100 */
.bg-moss-gradient     /* 135deg moss-700 → moss-900 */
.bg-terracotta-gradient /* 135deg terracotta-500 → terracotta-700 */
.text-gradient-warm   /* 135deg terracotta-500 → moss-600 */
.text-gradient-earth  /* 180deg charcoal-800 → moss-700 */
.bg-organic-noise     /* SVG noise overlay, opacity 0.03 */
```

### Shadow system

```css
--shadow-soft:     0 4px 20px -2px rgba(0,0,0,0.08)
--shadow-medium:   0 8px 30px -4px rgba(0,0,0,0.12)
--shadow-deep:     0 16px 50px -8px rgba(0,0,0,0.16)
--shadow-floating: 0 25px 60px -12px rgba(92,70,50,0.15)
```

### Typography

| Classe | Font | Uso |
|--------|------|-----|
| `font-display` | Playfair Display | Titoli, heading grandi |
| `font-body` | Playfair Display | Corpo del testo |
| `font-sans` | Quicksand | Label, bottoni, testo secondario |

---

## PARTE 5: SCHEMA DATI (CONVEX)

### 9 tabelle nel database

#### `services`
```typescript
{
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  icon: string
  image: string
  gallery: string[]
  features: string[]
  order: number
  isActive: boolean
  metaTitle: string
  metaDescription: string
  updatedAt: number
}
// Indexes: by_slug, by_active_order
```

#### `projects`
```typescript
{
  slug: string
  title: string
  location: string
  region: string
  area_mq: number
  type: string
  tags: string[]
  has_photos: boolean
  has_renders: boolean
  photo_count: number
  render_count: number
  hero_image: string
  photos: Array<{ src, thumb, alt, caption, type, dimensions? }>
  renders: Array<{ src, thumb, alt, caption, type, dimensions? }>
  features: string[]
  description: string
  order: number
  isActive: boolean
  updatedAt: number
}
// Indexes: by_slug, by_active_order, by_tag
```

#### `blogPosts`
```typescript
{
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  isPublished: boolean
  updatedAt: number
}
// Indexes: by_slug, by_category, by_published
```

#### `reviews`
```typescript
{
  authorName: string
  authorLocation: string
  authorPhoto: string
  rating: number  // 1-5
  text: string
  date: string
  isApproved: boolean
  order: number
  createdAt: number
}
// Indexes: by_approved, by_rating
```

#### `contactSubmissions`
```typescript
{
  name: string
  email: string
  phone: string
  subject: string
  message: string
  serviceInterest: string
  isRead: boolean
  isReplied: boolean
  createdAt: number
}
// Indexes: by_date, by_read
```

#### `gallery`
```typescript
{
  title: string
  description: string
  imageUrl: string
  category: string
  serviceId: Id<"services">  // riferimento
  order: number
  isActive: boolean
  createdAt: number
}
// Indexes: by_category, by_service, by_active
```

#### `pages`
```typescript
{
  slug: string
  title: string
  content: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  metaDescription: string
  order: number
  isActive: boolean
  updatedAt: number
}
// Indexes: by_slug, by_active
```

#### `shareEvents`
```typescript
{
  eventName: "share_clicked" | "share_landing"
  serviceSlug: string
  channel: string
  pagePath: string
  createdAt: number
}
// Indexes: by_date, by_event_date, by_service_date
```

#### `settings`
```typescript
{
  key: string
  value: any
  updatedAt: number
}
// Indexes: by_key
```

### API disponibili (Convex Functions)

| Modulo | Query | Mutation |
|--------|-------|----------|
| services | getAll, getBySlug, getFeatured | upsert, seed |
| blog | getAll, getByCategory, getBySlug, getRelated, getAllAdmin | create, update, togglePublish, remove, seed |
| projects | getAll, getBySlug, getWithPhotos, getFeatured | upsert, seed |
| reviews | getApproved, getFeatured, getAll | submit, approve |
| contacts | getAll | submit, markAsRead |
| gallery | getAll, getByCategory, getByService | add |
| pages | getBySlug, getAll | upsert |
| shareEvents | getRecent | track |

---

## PARTE 6: LOGICA DI BUSINESS

### Dove risiede

| Area | Posizione | Dettaglio |
|------|-----------|----------|
| **CRUD backend** | `convex/*.ts` | Tutte le query e mutation |
| **Form contatto** | `app/contatti/page.tsx` | Multi-step form con validazione client-side (useState) |
| **Dettaglio servizio** | `app/servizi/[slug]/page.tsx` | Template dinamico con varianti, FAQ, gallery |
| **Admin dashboard** | `app/admin/page.tsx` | Aggregazione stats da tutte le tabelle |
| **Animazioni** | `app/components/animations.tsx` | Wrapper Framer Motion + hook useScrollAnimation |
| **Utility** | `app/lib/utils.ts` | `cn()` = clsx + tailwind-merge |
| **Dati statici** | `app/lib/static-data.ts`, `app/lib/blog.ts`, `app/lib/progetti-data.ts` | Fallback quando Convex non disponibile |

### Strategia dati duale
- **Convex** (primario): services, reviews, contacts, gallery, shareEvents
- **File statici** (fallback): blog posts, progetti, services iniziali
- Le tabelle Convex per blog e progetti ESISTONO nello schema ma i dati vivono ancora (anche) in file statici

### Pattern architetturali chiave
1. **Upsert pattern**: admin mutations controllano per slug esistente, poi patch o insert
2. **Index-first queries**: tutte le query Convex usano `.withIndex()`, mai `.filter()` su tabelle grandi
3. **Seed functions**: ogni modulo ha `seed()` per popolare dati iniziali
4. **Slug-based routing**: tutte le pagine dettaglio usano `[slug]` dinamici

---

## PARTE 7: ASSET E MEDIA

### Immagini
- **Unsplash**: dominio `images.unsplash.com` configurato in next.config.ts
- **Locali**: `/public/images/blog/` (20+ immagini), `/public/images/servizi/`
- **Progetti**: `/public/progetti/` (12 cartelle progetto con foto)
- **Generazione AI**: prompt per immagini servizi e blog in `prompts-servizi.md` e `prompts-blog.md`

### Video (7 file MP4 in `/public/videos/`)
- 4 video elementi biodinamici (acqua, aria, fuoco, terra)
- 1 hero video timelapse giardino
- 2 video nature/fiori

### Servizi offerti (12)
1. Progettazione Giardini e Orti
2. Realizzazione Giardini (Chiavi in Mano)
3. Ampia Scelta di Piante
4. Trattamenti Curativi e Nutrizionali
5. Impianti di Irrigazione
6. Posa Camminamenti e Muretti in Pietra
7. Illuminazione per Esterni
8. Ingegneria Naturalistica
9. Arredamento per Esterni
10. Potature e Abbattimenti in Quota
11. Rigenerazione dei Terreni
12. Manutenzioni (Sostenibili)

### Progetti portfolio (12)
Baveno Lago Maggiore, Agriturismo Durando Portacomaro, Chieri Paola, Maria Rosa Santhia, Veronica, Porto Val Travaglia, Stefano Cortemilia, Castagneto Po Silvano, Castagneto Po Marta, Cortemilia Silvio, Portacomaro Ruta (+ altri)

---

## PARTE 8: PROBLEMI NOTI E DESIGN REVIEW IN CORSO

### Esiste gia un DESIGN_REVIEW_CHECKLIST.md (12 feb 2026)

#### Must (priorita alta)
- Header pattern unico (trasparente su hero + bianco sticky)
- CTA header persistente e coerente
- Standardizzazione bottoni con stati hover/focus/disabled
- Card servizi/progetti/reviews uniformi
- Spaziatura verticale sezioni con scala unica
- Struttura hero uniforme per pagine interne

#### Should
- Ridurre decorazioni ridondanti (blob, linee, overlay)
- Numeri trust come componente ricorrente
- Microcopy CTA outcome-oriented
- Griglia layout prevedibile (40/60 o 50/50)

#### Lacune note
- Admin panel senza autenticazione
- Molte azioni admin disabilitate (cursor-not-allowed)
- Blog e Progetti usano dati statici come fonte primaria (tabelle Convex pronte ma non migrate)
- Certificazioni nella pagina Qualita sono ancora placeholder

### Ordine esecuzione suggerito nel checklist
1. Header + bottoni + card system (fondazione)
2. Home + Servizi (impatto conversione)
3. Progetti + Contatti (proof + lead capture)
4. Chi siamo + Qualita + Blog (allineamento brand e trust)
5. QA responsive/accessibilita

### Breakpoint responsive da testare
375px, 768px, 1024px, 1440px

---

## PARTE 9: SEO E METADATA

```typescript
// layout.tsx metadata
title: { template: "%s | Visione Sostenibile", default: "Visione Sostenibile - Il Verde che Vive" }
description: "Progettazione e realizzazione di giardini straordinari..."
keywords: ["giardini", "progettazione paesaggistica", "design verde", "realizzazione giardini", "Roma"]
openGraph: { locale: "it_IT", url: "https://www.visionesostenibile.it", siteName: "Visione Sostenibile" }
themeColor: "#4b562e"
```

---

## PARTE 10: HANDOFF PROMPT PER IL TEAM BMAD

---

### PROMPT DA COPIARE E INCOLLARE NELLA CHAT WEB

```
Ciao team! Stiamo applicando il BMAD Method a un progetto ESISTENTE e GIA ONLINE.

## PROGETTO: Visione Sostenibile
Sito vetrina per azienda italiana di giardinaggio sostenibile/biodinamico (Torino, Piemonte).
Sito live: https://www.visionesostenibile.it
Riferimento stilistico: https://www.truegreenecolandscaping.com/

## STATO ATTUALE (non si parte da zero!)
- Sito funzionante con Next.js 16 + React 19 + Convex backend + Tailwind v4 + Framer Motion
- 12 pagine pubbliche + 7 pagine admin
- 12 servizi, 12 progetti portfolio, 3 articoli blog
- Design system con palette (moss/terracotta/cream/charcoal), typography (Playfair Display + Quicksand), componenti UI (Button, Card, Badge, Input, Modal, Skeleton)
- Backend Convex con 9 tabelle (services, projects, blogPosts, reviews, contactSubmissions, gallery, pages, shareEvents, settings)
- Deploy: Vercel (frontend) + Convex Cloud (backend)

## COSA VOGLIAMO OTTENERE
Formalizzare la documentazione BMAD per guidare l'EVOLUZIONE del sito (non un redesign da zero). Obiettivi:
1. Migliorare conversione (piu lead da form contatto)
2. Standardizzare UI/UX (design review in corso con checklist Must/Should/Could)
3. Completare funzionalita mancanti (autenticazione admin, migrazione blog/progetti da statico a Convex)
4. Migliorare SEO e performance
5. Mantenere identita brand biodinamico

## GUARDRAIL (da NON rompere)
- Non cambiare linguaggio visuale (no look corporate freddo)
- Non sostituire palette principale — ottimizzare contrasti e gerarchie
- Non introdurre pattern diversi pagina per pagina: un unico sistema
- Non basare leggibilita su hover (mobile-first)
- Approccio evolutivo, non rivoluzionario

## DOCUMENTI DA PRODURRE (in ordine)

### 1. Mary (Analyst) — Project Brief
Analizza lo stato corrente e definisci:
- Obiettivi strategici (conversione, trust, brand consistency)
- Cosa funziona e va mantenuto (palette, tono, struttura base)
- Cosa va migliorato (vedi sezione "Design Review Must" sotto)
- Target audience: proprietari di case/ville/agriturismi in Piemonte che cercano giardinaggio di qualita
- Competitor analysis: True Green Eco Landscaping come benchmark estetico

### 2. John (Product Manager) — PRD
Partendo dal brief, definisci:
- Feature list con priorita (Must/Should/Could gia esistente nel checklist)
- MVP: cosa rilasciare per primo (header + bottoni + card system → Home + Servizi)
- Feature mancanti: autenticazione admin, migrazione dati da statico a Convex, filtri avanzati portfolio
- Metriche successo: conversion rate form contatto, bounce rate, tempo su pagina servizi

### 3. Sally (UX Expert) — UI/UX Specification
Traduci il PRD in:
- Wireframe dei flussi principali (homepage → servizio → contatto)
- Standardizzazione componenti: un unico header pattern, card system uniforme, CTA coerenti
- Accessibilita: contrasto AA, focus keyboard, heading order
- Responsive: 375px, 768px, 1024px, 1440px
- Puoi generare prompt per v0/Lovable basandoti sul design system esistente (palette, font, componenti)

### 4. Winston (Architect) — Architettura Fullstack
Lo stack e GIA scelto (Next.js 16 + Convex + Tailwind v4). Concentrati su:
- Piano migrazione blog/progetti da file statici a Convex (le tabelle esistono gia!)
- Autenticazione admin (suggerimento: Convex Auth o Clerk)
- Ottimizzazione performance (React Compiler gia attivo, analizza bundle)
- Piano per analytics (shareEvents gia implementato, espandere)
- Strategia SEO tecnica (metadata, sitemap, structured data)
- Pattern architetturali da standardizzare (upsert, index-first queries)

### 5. Sarah (Product Owner) — Validazione e Sharding
Valida coerenza tra tutti i documenti e:
- Applica po-master-checklist
- Suddividi in epic/story gestibili per lo sviluppo in IDE
- Definisci acceptance criteria per ogni story
- Prioritizza: fondazione (design system) → conversione (home+servizi) → proof (progetti+contatti) → trust (chi-siamo+qualita+blog) → QA

## CONTESTO TECNICO DETTAGLIATO

### Servizi (12 totali)
1. Progettazione Giardini e Orti
2. Realizzazione Giardini (Chiavi in Mano)
3. Ampia Scelta di Piante
4. Trattamenti Curativi e Nutrizionali
5. Impianti di Irrigazione
6. Posa Camminamenti e Muretti in Pietra
7. Illuminazione per Esterni
8. Ingegneria Naturalistica
9. Arredamento per Esterni
10. Potature e Abbattimenti in Quota
11. Rigenerazione dei Terreni
12. Manutenzioni (Sostenibili)

### Database Convex (9 tabelle)
services, projects, blogPosts, reviews, contactSubmissions, gallery, pages, shareEvents, settings
(Tutti gli schemi dettagliati sono nel documento di contesto tecnico)

### Componenti UI esistenti
Button (4 varianti), Card (4 varianti), Badge (8 varianti), Input, Textarea, Modal (Portal), Skeleton (6 varianti)
Animazioni: FadeIn, SlideUp, SlideDown, ScaleIn, StaggerContainer, StaggerItem, TypingText, Bounce, Glow

### Design Review MUST (gia identificati)
- Header pattern unico (trasparente su hero + bianco sticky)
- CTA header persistente ("Richiedi preventivo")
- Bottoni standardizzati con stati hover/focus/disabled
- Card uniformi (servizi/progetti/reviews)
- Spaziatura verticale con scala unica (24/32/48/72/96)
- Hero uniforme per pagine interne (eyebrow, H1, intro, CTA)
- Hero homepage: semplificare a 1 messaggio + 2 CTA prioritizzate
- Sezione servizi: card informative con titolo + benefit + azione
- Contatti: form multi-step con meno attrito
- Qualita: sostituire placeholder con certificazioni reali

### Lacune critiche
- NO autenticazione admin
- Blog/Progetti ancora su file statici (tabelle Convex pronte ma non migrate)
- Molte azioni admin disabilitate
- Certificazioni pagina Qualita sono placeholder

Iniziate con Mary che produce il Project Brief, poi proseguite in sequenza.
Per qualsiasi domanda sul codice o l'architettura, chiedete pure — ho estratto tutto il contesto dal repository.
```

---

## NOTE PER L'OPERATORE

1. **Copia il prompt della PARTE 10** nella chat web con il team di agenti BMAD
2. Se un agente chiede dettagli su un componente specifico, consulta le PARTI 2-8 di questo documento
3. Lo schema Convex (PARTE 5) e il cuore dei dati — condividilo con Winston (Architect) se chiede dettagli
4. La DESIGN_REVIEW_CHECKLIST.md gia presente nel repo e complementare — condividila con Sally (UX) e Sarah (PO)
5. I file `prompts-servizi.md` e `prompts-blog.md` contengono prompt per generazione immagini AI — utili per Sally se vuole generare mockup
