# Runbook Operativo — Sistema Email Visione Sostenibile

> **Ultimo aggiornamento**: 2026-03-10
> **Responsabile tecnico**: Andrea Giordano / Team VS
> **Provider email**: [Resend](https://resend.com)
> **Dashboard monitoraggio**: `/admin/email-status`

---

## 1. Architettura

### Flusso email (testo)

```
TRIGGER                    MUTATION (Convex)               INTERNAL ACTION            PROVIDER
──────────                 ──────────────────              ────────────────           ─────────
Form contatti (/contatti)
  └─> contacts.submit ──────> scheduler.runAfter(0) ──────> emails.sendContactFormNotifications
       │                                                        ├─> deliverTemplateEmail (admin x N)
       │                                                        └─> deliverTemplateEmail (cliente)
       │                                                              │
       │                                                              ├─> logQueued (emailDeliveries: "queued")
       │                                                              ├─> sendViaResend ──────> POST api.resend.com/emails
       │                                                              ├─> finalizeDelivery ("sent" | "failed" | "skipped")
       │                                                              └─> crm.logEmailActivity

Quiz lead (/quiz)
  └─> leads.submit ─────────> scheduler.runAfter(0) ──────> emails.sendQuizNotifications
       │                                                        ├─> deliverTemplateEmail (admin x N)
       │                                                        └─> deliverTemplateEmail (cliente)

Admin CRM (/admin/crm)
  ├─> emailDispatch.sendOneOff ────> scheduler.runAfter(0) ──> emails.deliverRaw
  └─> emailDispatch.sendWithTemplate ─> scheduler.runAfter(0) ──> emails.deliverTemplate
```

### Componenti principali

| File | Ruolo |
|------|-------|
| `convex/emails.ts` | Core: logQueued, finalizeDelivery, sendViaResend, deliverTemplate, deliverRaw, sendContactFormNotifications, sendQuizNotifications, query di monitoraggio |
| `convex/emailDispatch.ts` | Mutation admin: sendOneOff, sendWithTemplate (con requireAdmin + scheduler) |
| `convex/emailTemplates.ts` | CRUD template: ensureDefaults, list, upsert, toggleActive, remove |
| `convex/crm.ts` | logEmailActivity: registra invii nella timeline CRM |
| `convex/contacts.ts` | contacts.submit: trigger email da form contatti |
| `convex/leads.ts` | leads.submit: trigger email da quiz |
| `app/admin/email-status/page.tsx` | Dashboard monitoraggio: statistiche, filtri, log invii |
| `app/admin/crm/page.tsx` | Invio email manuale (one-shot e da template) |
| `app/contatti/page.tsx` | Form contatti pubblico |
| `app/quiz/page.tsx` | Quiz lead pubblico |

### Environment variables (Convex)

| Variabile | Dove si configura | Obbligatoria | Descrizione |
|-----------|-------------------|-------------|-------------|
| `RESEND_API_KEY` | Convex Dashboard > Settings > Environment Variables | Si (per inviare) | API key Resend (formato: `re_...`) |
| `EMAIL_FROM` | Convex Dashboard > Settings > Environment Variables | Si (per inviare) | Indirizzo mittente verificato su Resend (es. `info@visionesostenibile.it`) |
| `ADMIN_NOTIFICATION_EMAIL` | Convex Dashboard > Settings > Environment Variables | Consigliata | Destinatari notifiche admin, separati da virgola |
| `SITE_URL` / `NEXT_PUBLIC_SITE_URL` | Convex Dashboard | Opzionale | URL sito per link nelle email (default: `https://www.visionesostenibile.it`) |

### Template email preinstallati

| Chiave | Categoria | Quando si usa |
|--------|-----------|---------------|
| `transactional-contact-admin` | transactional | Notifica admin per nuovo contatto da form |
| `transactional-contact-customer` | transactional | Conferma al cliente dopo invio form |
| `transactional-quiz-admin` | transactional | Notifica admin per quiz completato |
| `transactional-quiz-customer` | transactional | Scorecard al cliente dopo quiz |
| `transactional-oneoff-standard` | transactional | Messaggio one-shot standard |
| `newsletter-standard` | newsletter | Newsletter base |

I template vengono creati automaticamente alla prima chiamata di `deliverTemplateEmail` tramite `emailTemplates.ensureDefaults`.

### Stati di una email delivery

```
queued ──> sent      (invio riuscito)
       └─> failed    (errore Resend: API key, dominio, rate limit)
       └─> skipped   (RESEND_API_KEY o EMAIL_FROM mancanti)
```

---

## 2. Incidenti Comuni

### INC-01: Email non inviate (0% success rate)

**Sintomi**:
- Dashboard `/admin/email-status`: tasso successo 0%
- Tutte le email risultano `skipped` o `failed`
- Banner rosso in `/admin/email-status` e `/admin/crm`: "Invio email disattivato"

**Root cause piu probabili**:
1. `RESEND_API_KEY` non configurata nelle environment variables Convex
2. `EMAIL_FROM` non configurata
3. Entrambe mancanti

**Diagnosi**:
1. Aprire `/admin/email-status` — il banner in alto mostra lo stato provider
2. Se il banner e rosso: verificare le env vars su Convex Dashboard
3. Filtrare le email per stato `skipped` — se tutte sono skipped, conferma env vars mancanti

**Risoluzione**:
1. Andare su [Convex Dashboard](https://dashboard.convex.dev) > il progetto VS > Settings > Environment Variables
2. Verificare che `RESEND_API_KEY` sia presente e inizi con `re_`
3. Verificare che `EMAIL_FROM` sia un indirizzo email valido, verificato su Resend
4. Dopo aver aggiornato le variabili, Convex le applica automaticamente (no redeploy necessario)
5. Verificare il fix inviando un'email di test da `/admin/crm`

**Prevenzione**:
- Annotare la scadenza della API key nel calendario (Resend non ha scadenza automatica, ma l'utente puo revocarle)
- Controllare il banner provider in `/admin/email-status` almeno settimanalmente

---

### INC-02: Alto tasso di fallimento (>20% email failed)

**Sintomi**:
- Dashboard `/admin/email-status`: tasso successo sotto 80%
- Presenza di email con stato `failed` con messaggi di errore

**Root cause piu probabili**:
1. Dominio mittente non verificato su Resend
2. Rate limit Resend superato
3. Indirizzi email destinatario non validi
4. API key con permessi insufficienti

**Diagnosi**:
1. Aprire `/admin/email-status` > filtrare per stato "Falliti"
2. Leggere il messaggio di errore nella colonna "Errore" (hover per testo completo su desktop)
3. Errori comuni:
   - `"validation_error"`: indirizzo destinatario malformato
   - `"rate_limit_exceeded"`: troppe email in poco tempo
   - `"not_found"` / dominio: il dominio mittente non e verificato
   - `status 403`: API key senza permessi di invio
   - `status 429`: rate limit

**Risoluzione per tipo di errore**:

| Errore | Azione |
|--------|--------|
| Rate limit (429) | Attendere 1 minuto, le email in coda verranno riprovate dal prossimo trigger. Se persistente, verificare il piano Resend |
| Dominio non verificato | Andare su [Resend Dashboard](https://resend.com/domains) > aggiungere/verificare il dominio `visionesostenibile.it` |
| Indirizzo non valido | Verificare l'indirizzo del destinatario nel CRM. Le email normalizzate sono lowercase + trim |
| API key 403 | Rigenerare la API key su Resend e aggiornare `RESEND_API_KEY` in Convex |

**Prevenzione**:
- Monitorare il tasso di successo settimanalmente
- Verificare che il dominio mittente abbia DNS records corretti (SPF, DKIM, DMARC) su Resend

---

### INC-03: Email in coda ma non inviate (stato "queued" persistente)

**Sintomi**:
- Dashboard `/admin/email-status`: contatore "In Coda" alto
- Email restano nello stato `queued` per piu di 5 minuti

**Root cause piu probabili**:
1. Lo scheduler Convex non ha eseguito l'action associata
2. L'action `deliverTemplate` o `deliverRaw` e fallita prima di raggiungere `finalizeDelivery`
3. Errore runtime nell'action (eccezione non gestita)

**Diagnosi**:
1. Aprire Convex Dashboard > Logs
2. Cercare errori nelle action `emails:deliverTemplate` o `emails:deliverRaw`
3. Verificare se ci sono errori `scheduler` nei log

**Risoluzione**:
1. Se l'action e fallita con un'eccezione, correggere la causa (es. template mancante, variabili non valide)
2. Le email in stato `queued` non vengono ritentate automaticamente — devono essere reinviate manualmente da `/admin/crm`
3. Se il problema e lo scheduler, verificare lo stato del deployment Convex

**Prevenzione**:
- Controllare i Convex Logs dopo ogni deployment
- Le email queued sono un segnale di allarme: non dovrebbero restare in questo stato per piu di pochi secondi

---

### INC-04: Template email sbagliato

**Sintomi**:
- Il cliente riceve un'email con contenuto inaspettato
- L'email di conferma contatto arriva con template admin o viceversa

**Root cause piu probabili**:
1. Template key errata passata alla funzione
2. Template modificato da admin con contenuto sbagliato
3. Template di sistema sovrascritto

**Diagnosi**:
1. Aprire `/admin/email-status` > trovare l'email specifica
2. Verificare la colonna templateKey — corrisponde al template atteso?
3. Da Convex Dashboard > Data > `emailTemplates`: verificare il contenuto del template con quella key

**Risoluzione**:
1. Se il template e stato modificato per errore: correggere da Convex Dashboard > `emailTemplates` > editare il record
2. Se il template di sistema e stato alterato: eliminare il record (se non e `isSystem: true`), poi il prossimo invio ricreera il default tramite `ensureDefaults`
3. I template `isSystem: true` non possono essere eliminati dalla UI — devono essere corretti editando il record direttamente

**Prevenzione**:
- Non modificare i template `isSystem: true` a meno che non sia strettamente necessario
- Usare `/admin/crm` > "Invia da template" per testare i template prima di modificarli in produzione

---

### INC-05: Form contatti non genera email

**Sintomi**:
- Un utente compila il form su `/contatti` ma nessuna email viene generata
- La submission appare in `/admin/contacts` ma senza email associate

**Root cause piu probabili**:
1. `ADMIN_NOTIFICATION_EMAIL` non configurata (nessun destinatario admin)
2. Lo scheduler Convex non ha eseguito `sendContactFormNotifications`
3. Il form ha avuto un errore lato client prima di completare la mutation

**Diagnosi**:
1. Verificare che la submission esista in Convex Dashboard > `contactSubmissions`
2. Se la submission esiste: controllare i Convex Logs per l'action `emails:sendContactFormNotifications`
3. Se nessuna email e stata loggata in `emailDeliveries` con `relatedType: "contactSubmission"` e il `relatedId` corrispondente: lo scheduler non ha eseguito l'action
4. Verificare `ADMIN_NOTIFICATION_EMAIL` nelle env vars Convex

**Risoluzione**:
1. Se `ADMIN_NOTIFICATION_EMAIL` manca: configurarla in Convex Dashboard (formato: `admin@esempio.it` o `admin1@esempio.it,admin2@esempio.it`)
2. Se lo scheduler ha fallito: l'email non verra ritentata automaticamente. Inviare manualmente da `/admin/crm`
3. Se il form ha errori client: controllare la console browser per errori JS

**Nota**: lo stesso flusso si applica al quiz (`/quiz` > `leads.submit` > `sendQuizNotifications`).

**Prevenzione**:
- Configurare sempre `ADMIN_NOTIFICATION_EMAIL` al primo setup
- Testare il form contatti dopo ogni deployment

---

### INC-06: API key Resend scaduta o invalidata

**Sintomi**:
- Email in stato `failed` con errore che menziona "invalid_api_key", "unauthorized", o status 401
- Le email funzionavano prima e hanno smesso improvvisamente

**Root cause piu probabili**:
1. API key revocata su Resend Dashboard
2. API key rigenerata ma non aggiornata in Convex
3. Account Resend sospeso (billing, violazione policy)

**Diagnosi**:
1. Aprire `/admin/email-status` > filtrare per "Falliti"
2. Verificare il messaggio di errore: se contiene "401" o "unauthorized" = API key invalida
3. Andare su [Resend Dashboard](https://resend.com/api-keys) > verificare lo stato della API key

**Risoluzione**:
1. Su Resend Dashboard: generare una nuova API key
2. Su Convex Dashboard > Settings > Environment Variables: aggiornare `RESEND_API_KEY` con la nuova key
3. Testare con un invio da `/admin/crm`

**Prevenzione**:
- Non condividere la API key
- Non revocare la API key di produzione senza averne una sostitutiva pronta
- Monitorare le email di billing di Resend

---

## 3. Checklist Monitoraggio

### Controllo giornaliero (2 minuti)

- [ ] Aprire `/admin/email-status`
- [ ] Verificare che il banner provider sia verde ("Provider Resend attivo")
- [ ] Controllare il tasso di successo (deve essere >= 90%)
- [ ] Verificare che non ci siano email in coda (`queued > 0` per piu di 5 minuti)

### Controllo settimanale (5 minuti)

- [ ] Filtrare per "Falliti": investigare ogni errore
- [ ] Verificare il contatore "Saltati": non dovrebbe crescere (indica env vars mancanti in momenti specifici)
- [ ] Controllare `/admin/contacts` per submission senza email associate
- [ ] Verificare su Resend Dashboard: email quota e delivery rate

### Soglie di allarme

| Metrica | Soglia OK | Soglia attenzione | Soglia critica |
|---------|-----------|-------------------|----------------|
| Tasso successo | >= 95% | 80-95% | < 80% |
| Email in coda | 0 | 1-5 (per pochi minuti) | > 5 per piu di 10 min |
| Email fallite (ultime 24h) | 0 | 1-2 | > 3 |
| Email saltate | 0 | Qualsiasi > 0 e critico | - |

### Dove guardare su Convex Dashboard

| Cosa cercare | Dove |
|-------------|------|
| Errori action email | Logs > filtra per `emails:deliverTemplate` o `emails:deliverRaw` |
| Record email delivery | Data > `emailDeliveries` > ordina per `createdAt` desc |
| Template attivi | Data > `emailTemplates` > verifica `isActive: true` |
| Scheduler falliti | Logs > filtra per "scheduler" o "action failed" |

---

## 4. Escalation

### Livello 1 — Risoluzione interna (team VS)

- Email in coda o fallite per env vars mancanti
- Template da correggere
- Email manuale da re-inviare da CRM
- Configurazione `ADMIN_NOTIFICATION_EMAIL`

### Livello 2 — Supporto tecnico (sviluppatore)

- Errori runtime nelle action Convex (eccezioni, crash scheduler)
- Modifiche al codice email (`convex/emails.ts`, `convex/emailTemplates.ts`)
- Problemi DNS dominio mittente
- Aggiunta nuovi template di sistema

### Livello 3 — Provider (Resend)

- Account sospeso o problemi billing
- Deliverability bassa (email che arrivano in spam)
- Rate limit inadeguati al volume

**Contatti**:
- Resend Dashboard: [https://resend.com/overview](https://resend.com/overview)
- Resend API docs: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: [https://resend.com/support](https://resend.com/support)
- Convex Dashboard: [https://dashboard.convex.dev](https://dashboard.convex.dev)
- Convex Docs: [https://docs.convex.dev](https://docs.convex.dev)

---

## 5. Riferimenti rapidi

### Comandi Convex per debug

```bash
# Vedere tutte le email delivery recenti (dalla directory my-app/)
npx convex run emails:listDeliveries '{}'

# Filtrare per stato
npx convex run emails:listDeliveries '{"status": "failed", "limit": 20}'

# Statistiche generali
npx convex run emails:getEmailStats '{}'

# Stato provider
npx convex run emails:getProviderStatus '{}'

# Elenco template attivi
npx convex run emailTemplates:list '{}'

# Forzare ricreazione template di default
npx convex run emailTemplates:ensureDefaults '{}'
```

### Struttura tabelle Convex

```
emailTemplates
  ├── key (string, unico) — es. "transactional-contact-admin"
  ├── name, category, subject, html, text
  ├── isSystem (bool) — protetto da cancellazione
  ├── isActive (bool) — se false, il template non viene usato
  └── indici: by_key, by_category, by_updated

emailDeliveries
  ├── to, subject, templateKey, html, text
  ├── status ("queued" | "sent" | "failed" | "skipped")
  ├── provider ("resend"), providerMessageId
  ├── error (string, presente solo se failed/skipped)
  ├── relatedType ("contactSubmission" | "lead" | "crmContact")
  ├── relatedId, createdBy, createdAt, sentAt
  └── indici: by_date, by_to_date, by_status_date
```
