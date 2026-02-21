# Prompt per Claude Code — SEO Optimization Sprint

Copia e incolla questo prompt in Claude Code dalla root del progetto Visione Sostenibile.

---

```
Devo implementare tutte le ottimizzazioni SEO emerse da un audit completo del sito Visione Sostenibile (visione.yattalo.com). Lavoriamo in modo ordinato: crea un worktree separato, implementa tutto, e poi valutiamo il merge.

## SETUP INIZIALE

1. Crea un nuovo branch `seo/full-optimization` dal branch attuale
2. Crea un git worktree in `../visione-seo-worktree` su quel branch
3. Lavora ESCLUSIVAMENTE nel worktree per tutte le modifiche
4. Fai commit atomici e descrittivi per ogni gruppo di modifiche

## TASK SEO DA IMPLEMENTARE (in ordine di priorità)

### FASE 1 — Title Tag e Meta Description (CRITICO)
Cerca nel codebase tutti i tag <title> e le meta description. Il problema principale è che quasi tutte le pagine hanno lo stesso title "Visione Sostenibile - Il Verde che Vive".

Sostituisci con title unici e ottimizzati per ogni pagina:
- Homepage: "Giardini Biodinamici Torino | Progettazione e Manutenzione | Visione Sostenibile"
- Chi Siamo: "Chi Siamo — Andrea Giordano, Giardiniere Biodinamico | Visione Sostenibile"
- Servizi: "Servizi di Giardinaggio Sostenibile Torino e Piemonte | Visione Sostenibile"
- Progettazione Giardini: "Progettazione Giardini Torino | Design Biodinamico | Visione Sostenibile"
- Realizzazione Giardini: "Realizzazione Giardini Chiavi in Mano Torino | Visione Sostenibile"
- Potature: "Potatura Alberi e Tree Climbing Torino | Visione Sostenibile"
- Manutenzioni: "Manutenzione Giardini Torino | Metodo Biodinamico | Visione Sostenibile"
- Impianti Irrigazione: "Impianti Irrigazione Giardino Torino | Visione Sostenibile"
- Rigenerazione Terreni: "Rigenerazione Terreni e Suoli Torino | Visione Sostenibile"
- Camminamenti Pietra: "Camminamenti e Muretti in Pietra per Giardini | Visione Sostenibile"
- Illuminazione: "Illuminazione Giardino Esterno Torino | Visione Sostenibile"
- Arredamento Esterni: "Arredamento per Esterni e Outdoor Living | Visione Sostenibile"
- Ingegneria Naturalistica: "Ingegneria Naturalistica e Bioingegneria | Visione Sostenibile"
- Blog: "Blog Giardinaggio Sostenibile | Consigli e Guide | Visione Sostenibile"
- Qualità: "Qualità e Certificazioni Biodinamiche | Visione Sostenibile"
- Contatti: "Contatti e Preventivo Gratuito | Visione Sostenibile Torino"
- Progetti: "Progetti Realizzati | Portfolio Giardini | Visione Sostenibile"
- Quiz: "Quiz: Che Giardino Fa Per Te? | Visione Sostenibile"

Per ogni pagina, aggiungi anche una meta description unica (max 155 caratteri) con keyword target + CTA. Esempio homepage:
<meta name="description" content="Progettiamo, realizziamo e manteniamo giardini biodinamici a Torino e Piemonte. Un referente, zero chimica, impatto zero. Richiedi un sopralluogo gratuito.">

COMMIT: "seo: add unique title tags and meta descriptions for all pages"

### FASE 2 — Correzione Bug Critici
- Cerca nel codebase il numero di telefono placeholder `+39061234567` o `061234567` e sostituiscilo OVUNQUE con `+393714821825` (formato internazionale per i link tel:) e `+39 371 482 1825` (formato display)
- Cerca "Visione Sostenibile | Visione Sostenibile" (brand duplicato) nei title e correggi

COMMIT: "fix: replace placeholder phone number and fix duplicate brand in titles"

### FASE 3 — Keyword Locali negli H1/H2
Per le pagine servizio, aggiungi riferimenti geografici nei titoli principali:
- Progettazione: H1 o sottotitolo deve contenere "a Torino e Piemonte"
- Manutenzione: idem
- Potature: "Potatura Alberi a Torino" nell'H1 o H2
- Realizzazione: "Realizzazione Giardini a Torino" nell'H1 o H2
NON stravolgere il copy esistente — aggiungi in modo naturale, ad esempio nel sottotitolo o in un H2 secondario.

COMMIT: "seo: add local keywords (Torino, Piemonte) to service page headings"

### FASE 4 — Coerenza Zone Operative
Cerca nel codebase tutte le occorrenze di:
- "Piemonte e Trentino"
- "Piemonte e Lombardia"
- "Trentino Alto-Adige"
- "Piemonte e Trentino Alto-Adige"
E unifica TUTTO con il messaggio corretto: "Operativi in Piemonte e Trentino Alto-Adige. In espansione in Lombardia."
La versione breve (per badge/chip): "Piemonte · Trentino · Lombardia"

COMMIT: "fix: unify service area messaging across all pages"

### FASE 5 — Schema.org Structured Data
Aggiungi JSON-LD structured data. Cerca dove viene renderizzato il <head> globale (layout/template principale) e aggiungi:

1. **LocalBusiness** (nel layout globale o homepage):
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Visione Sostenibile",
  "description": "Progettazione, realizzazione e manutenzione di giardini biodinamici a impatto zero",
  "url": "https://www.visionesostenibile.it",
  "telephone": "+393714821825",
  "email": "visionesostenibile96@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via San Francesco D'Assisi, 14",
    "addressLocality": "Torino",
    "postalCode": "10122",
    "addressCountry": "IT"
  },
  "areaServed": ["Torino", "Piemonte", "Trentino Alto-Adige", "Lombardia"],
  "founder": {
    "@type": "Person",
    "name": "Andrea Giordano"
  },
  "foundingDate": "2009",
  "sameAs": [
    "https://www.instagram.com/visionesostenibile",
    "https://www.facebook.com/visionesostenibilegiardinieortisostenibili",
    "https://www.linkedin.com/in/andrea-giordano-16810626a",
    "https://www.youtube.com/@AndreaGiordano-vk8el"
  ]
}
```

2. **BreadcrumbList** — aggiungi breadcrumbs strutturati nelle pagine servizio e blog

3. **FAQPage** — nella pagina /servizi/progettazione-giardini che ha già delle FAQ, wrappa con schema FAQPage

4. **Service** — per ogni pagina servizio, aggiungi lo schema Service con name, description, provider, areaServed

COMMIT: "seo: add Schema.org structured data (LocalBusiness, FAQ, Service, Breadcrumb)"

### FASE 6 — Open Graph e Social Meta
Verifica che ogni pagina abbia:
- og:title (uguale al title tag)
- og:description (uguale alla meta description)
- og:image (immagine rappresentativa della pagina, o fallback al logo)
- og:type (website per homepage, article per blog)
- og:url (URL canonico della pagina)
- twitter:card = "summary_large_image"

COMMIT: "seo: add Open Graph and Twitter Card meta tags"

### FASE 7 — Internal Linking
Cerca i componenti dei blog post e aggiungi link contestuali ai servizi:
- L'articolo sulla manutenzione autunnale deve linkare a /servizi/manutenzioni
- L'articolo sulle tendenze 2026 deve linkare a /servizi/progettazione-giardini
- L'articolo sulle piante in pendio deve linkare a /servizi/rigenerazione-terreni
Nelle pagine servizio, aggiungi una sezione "Approfondisci nel blog" o "Articoli correlati" che linka ai blog post pertinenti.

COMMIT: "seo: improve internal cross-linking between blog posts and service pages"

### FASE 8 — Canonical Tags e Hreflang
- Aggiungi <link rel="canonical"> su ogni pagina che punta all'URL corretto su visionesostenibile.it (il dominio di produzione)
- Aggiungi <html lang="it"> se non presente
- Aggiungi <link rel="alternate" hreflang="it" href="...">

COMMIT: "seo: add canonical tags, lang attribute, and hreflang"

### FASE 9 — Sitemap e Robots
- Se non esiste, crea un file robots.txt con:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.visionesostenibile.it/sitemap.xml
  ```
- Se il framework supporta la generazione automatica di sitemap, configurala. Altrimenti crea un sitemap.xml statico con tutti gli URL del sito.

COMMIT: "seo: add robots.txt and XML sitemap"

## VERIFICA FINALE

Dopo aver completato tutte le fasi:
1. Fai un `git log --oneline` nel worktree per mostrarmi tutti i commit
2. Fai un `git diff main..seo/full-optimization --stat` per il riepilogo delle modifiche
3. Verifica che il sito builda/compili correttamente
4. Elencami eventuali problemi trovati durante l'implementazione

NON fare il merge automaticamente. Mostrami il riepilogo e aspetta la mia conferma.
```

---

## Note per l'uso

- **Prima di incollare**: assicurati di essere nella root del progetto git
- **Framework**: Claude Code rileverà automaticamente se usi Next.js, Nuxt, Astro, etc. e adatterà le modifiche
- **Worktree**: se hai modifiche non committate, fai prima un `git stash` o un commit
- **Review**: dopo l'esecuzione, puoi fare `cd ../visione-seo-worktree && git log --oneline` per vedere tutti i commit
- **Merge**: quando sei soddisfatto, torna al repo principale e fai `git merge seo/full-optimization`
- **Cleanup**: dopo il merge, `git worktree remove ../visione-seo-worktree`
