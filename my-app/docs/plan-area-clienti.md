# Piano Implementazione: Area Clienti

## Panoramica

Aggiungere un'**Area Clienti** al sito dove chi ha completato il quiz può:
1. Rivedere il proprio **report/scorecard** personalizzato
2. Visualizzare i **rendering del giardino** inviati dall'admin (Andrea)
3. **Caricare foto** del proprio giardino attuale
4. Il tutto presentato come **extra gratuito** per chi si iscrive

---

## 1. Autenticazione Client — Magic Link (Passwordless)

**Perché magic link**: il quiz già cattura l'email → nessuna password da ricordare → esperienza premium e frictionless.

### Nuove tabelle Convex

```
clientAccounts:
  - email (string, unique)
  - name (string)
  - phone (optional string)
  - crmContactId (optional, id → crmContacts)
  - leadId (optional, id → leads)
  - scorecardId (optional string)
  - isActive (boolean)
  - createdAt (number)
  - updatedAt (number)
  Index: by_email, by_crmContact

clientSessions:
  - accountId (id → clientAccounts)
  - token (string)
  - createdAt (number)
  - expiresAt (number)
  - isActive (boolean)
  Index: by_token, by_account

clientMagicLinks:
  - email (string)
  - token (string)
  - createdAt (number)
  - expiresAt (number)  // 30 minuti
  - usedAt (optional number)
  Index: by_token, by_email
```

### Nuovi file Convex

- `convex/clientAuth.ts` — Mutations: `requestMagicLink`, `verifyMagicLink`, `validateClientSession`, `logoutClient`. Usa lo stesso pattern di `adminAuth.ts` ma con magic link via email (Resend).

### Flow

1. Utente inserisce email → `requestMagicLink` mutation → genera token → invia email via Resend
2. Click sul link → `/area-clienti/verify?token=xxx` → `verifyMagicLink` mutation → crea session → redirect a dashboard
3. Session durata: 7 giorni (più lunga dell'admin, è un client portal)

---

## 2. Data Layer — Rendering e Foto

### Nuove tabelle Convex

```
gardenRenderings:
  - clientAccountId (id → clientAccounts)
  - title (string)
  - description (optional string)
  - storageId (id → _storage)
  - mimeType (string)
  - fileName (string)
  - sizeBytes (number)
  - uploadedBy (string)  // "admin"
  - createdAt (number)
  Index: by_client, by_date

gardenPhotos:
  - clientAccountId (id → clientAccounts)
  - caption (optional string)
  - storageId (id → _storage)
  - mimeType (string)
  - fileName (string)
  - sizeBytes (number)
  - uploadedBy (string)  // "client"
  - createdAt (number)
  Index: by_client, by_date
```

### Nuovi file Convex

- `convex/gardenMedia.ts` — Mutations/queries per rendering (admin) e foto (client). Usa lo stesso pattern upload di `media.ts` + `gallery.ts`.

---

## 3. Frontend — Rotte Area Clienti

### Nuove rotte

| Rotta | Scopo |
|-------|-------|
| `/area-clienti` | Landing page + form richiesta magic link |
| `/area-clienti/verify` | Verifica magic link token (searchParam) |
| `/area-clienti/dashboard` | Dashboard principale del client |
| `/area-clienti/report` | Scorecard completa (riuso logica esistente) |
| `/area-clienti/il-mio-giardino` | Rendering ricevuti + upload foto |

### Layout e Componenti

- `app/area-clienti/layout.tsx` — Layout con header semplice (logo + nome utente + logout). Auth guard: redirect a `/area-clienti` se non autenticato.
- `app/area-clienti/ClientAuthContext.tsx` — Context provider per sessione client (pattern simile a `AdminAuthContext.tsx`).
- `app/hooks/useClientAuth.ts` — Hook per gestione sessione client (localStorage `client_token`).

### Pagine dettaglio

**`/area-clienti` (landing/login)**
- Hero con messaggio "La tua Area Clienti Personale"
- Form: inserisci email → "Ti invieremo un link di accesso"
- Se già autenticato → redirect a dashboard
- Copy: "Scopri il tuo profilo verde, ricevi rendering personalizzati e condividi le foto del tuo giardino — tutto gratuitamente."

**`/area-clienti/dashboard`**
- Benvenuto con nome
- Card "Il Tuo Report" → link a /report (con preview profilo)
- Card "Il Tuo Giardino" → link a /il-mio-giardino (con contatore rendering + foto)
- Card "Contatta Andrea" → link a /contatti

**`/area-clienti/report`**
- Riusa la logica di `scorecard/[id]/page.tsx` ma dentro il layout area-clienti
- Aggiunge sezione CTA: "Vuoi un rendering del tuo giardino? È gratuito!"

**`/area-clienti/il-mio-giardino`**
- Sezione "Rendering" — gallery dei rendering ricevuti dall'admin (con title, description, immagini/file)
- Sezione "Le Tue Foto" — gallery delle foto caricate + bottone "Carica Foto"
- Upload: drag & drop o click, max 10MB per file, formati immagine
- Messaggio se nessun rendering: "Andrea sta preparando il tuo rendering personalizzato. Ti avviseremo quando sarà pronto!"

---

## 4. Admin CRM — Estensione

### Modifiche a `app/admin/crm/page.tsx`

Aggiungere una **tab "Area Clienti"** nel pannello dettaglio contatto (accanto a timeline, email, etc.):

- **Stato account**: badge "Attivo" / "Non registrato" / "Invita"
- **Bottone "Invia Invito"**: crea clientAccount (se non esiste) + invia magic link
- **Sezione "Rendering"**: upload files per il client (riusa pattern gallery upload). Admin carica rendering → appare nel portale del client.
- **Sezione "Foto Cliente"**: gallery delle foto caricate dal client (read-only per admin). Utile per Andrea per vedere lo stato attuale del giardino.
- **Notifica email**: quando admin carica un rendering, opzione di notificare il client via email ("Nuovo rendering disponibile nella tua Area Clienti")

### Nuova mutation CRM

- `convex/crm.ts` — Aggiungere `inviteToPortal` (internal mutation chiamata dall'admin)

---

## 5. Integrazione Quiz → Area Clienti

### Modifiche alla scorecard

In `app/scorecard/[id]/page.tsx`, aggiungere dopo la sezione CTA esistente:

```
╔══════════════════════════════════════════╗
║  🌿 Accedi alla tua Area Clienti        ║
║                                          ║
║  Rivedi il tuo report quando vuoi,       ║
║  ricevi rendering personalizzati e       ║
║  condividi le foto del tuo giardino.     ║
║                                          ║
║  [Accedi Gratis →]                       ║
╚══════════════════════════════════════════╝
```

Il bottone porta a `/area-clienti` con `?email=xxx` pre-compilato.

### Modifiche al flusso quiz (`convex/leads.ts`)

Dopo il submit del quiz, se l'utente accetta, creare automaticamente il `clientAccount` (status inactive finché non verifica via magic link). Collegamento `leadId` + `scorecardId`.

---

## 6. Email Templates

Nuovi template in `emailTemplates`:

1. **`client-magic-link`** — "Accedi alla tua Area Clienti" con link magic
2. **`client-rendering-ready`** — "Il tuo rendering è pronto!" notifica quando admin carica
3. **`client-welcome`** — "Benvenuto nella tua Area Clienti" (primo accesso)

---

## 7. Ordine di Implementazione (Step-by-step)

### Step 1: Schema + Auth backend
- Aggiungere le 5 nuove tabelle allo schema Convex
- Creare `convex/clientAuth.ts` (magic link + sessions)
- Creare template email `client-magic-link`

### Step 2: Portal frontend base
- Creare `app/area-clienti/` con layout, context, hook
- Pagina login (`/area-clienti`)
- Pagina verify (`/area-clienti/verify`)
- Pagina dashboard (`/area-clienti/dashboard`)

### Step 3: Report nel portal
- Pagina `/area-clienti/report` (riuso logica scorecard)
- Link dalla dashboard

### Step 4: Il Mio Giardino — Backend
- Creare `convex/gardenMedia.ts` (CRUD rendering + foto)
- Mutations per upload admin + upload client
- Queries per listare per client

### Step 5: Il Mio Giardino — Frontend
- Pagina `/area-clienti/il-mio-giardino`
- Gallery rendering (read-only per client)
- Upload foto client (drag & drop)

### Step 6: Admin CRM extension
- Tab "Area Clienti" nel dettaglio contatto CRM
- Upload rendering per client
- Visualizzazione foto client
- Bottone invito + invio magic link

### Step 7: Integrazione scorecard
- CTA nella scorecard per accedere all'Area Clienti
- Auto-creazione clientAccount dal quiz flow

### Step 8: Email notifications
- Template `client-rendering-ready`
- Template `client-welcome`
- Notifica automatica su upload rendering

---

## Note Tecniche

- **File upload**: riuso pattern `media.ts` `generateUploadUrl` + `fetch POST` + `storageId`
- **Auth pattern**: simile a `adminAuth.ts` ma con magic link invece di password
- **UI**: riuso componenti `ui/` esistenti (Card, Button, Badge, etc.) + animazioni da `animations.tsx`
- **Stile**: coerente con design system attuale (paper, forest, leaf, sun)
- **Mobile-first**: tutte le pagine responsive, upload foto deve funzionare bene da mobile
- **Nessun breaking change**: tutte le rotte e funzionalità esistenti rimangono invariate
