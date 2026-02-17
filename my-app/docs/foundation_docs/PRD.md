# 📋 Product Requirements Document (PRD) --- Visione Sostenibile

**Versione:** 1.2 (Approvato dal PO - Final)

**Stato:** Chiuso / Pronto per lo Sviluppo

**PM:** John (BMad Team)

## 1. Obiettivi del Prodotto (Product Goals)

L\'obiettivo è trasformare il sito esistente in una piattaforma di
acquisizione lead di alta gamma, basata sulla fiducia e sul valore
consulenziale immediato.

1.  **Lead Magnet Strategy:** Implementare un micro-funnel interattivo
    che generi una **Web-Scorecard** personalizzata e stampabile,
    eliminando la complessità dei PDF server-side (Approccio KISS).

2.  **Modernità Architettonica:** Adottare integralmente la **Walkway
    Family** per comunicare trasparenza e visione futura.

3.  **Infrastruttura Real-time:** Migrazione completa su **Convex** per
    la gestione dinamica dei contenuti con fallback statico (Approccio
    DRY).

4.  **Brand Authority:** Utilizzo rigoroso della palette *High-Contrast
    Nature* con texture materiche.

## 2. User Stories & Feature List

### A. Core Experience (User Facing)

- **US.1 - Micro-funnel & Web-Scorecard:** Come utente, voglio
  completare un test sulla salute del mio giardino per accedere a una
  pagina di report dedicata (Scorecard) con consigli pratici,
  visualizzata con lo stile grafico del brand e facilmente salvabile in
  PDF dal browser.

- **US.2 - Portfolio & Blog Dinamico:** Come utente, voglio esplorare
  progetti e articoli filtrati istantaneamente per categorie, caricati
  in real-time da Convex.

- **US.3 - Navigazione Chameleon:** Come utente, voglio un header che si
  adatti visivamente allo scroll per mantenere la leggibilità senza
  distrazioni.

### B. Admin & Backend (Management)

- **US.4 - Auth & Moderazione:** Come amministratore, voglio un accesso
  sicuro all\'area gestionale per approvare recensioni e aggiornare i
  contenuti del portfolio.

- **US.5 - Editor Asset Scorecard:** Come amministratore, voglio poter
  modificare i testi dei consigli della scorecard tramite dashboard,
  vedendo l\'anteprima istantanea di come appariranno nel report utente.

## 3. Requisiti Funzionali & Tecnici

- **Data Layer:** Schema Convex per projects, posts, leads (con ID
  scorecard univoci) e reviews.

- **Frontend:** Next.js 16 con Tailwind v4. Caricamento font Walkway
  locale (next/font/local).

- **Web-to-Print:** Implementazione di CSS Media Queries (@media print)
  per formattare la scorecard in formato A4 senza elementi di
  navigazione web.

- **Validazione:** Zod per schemi condivisi tra quiz e database.

## 4. Requisiti Non Funzionali

- **Performance:** Lighthouse score \> 90.

- **SEO:** JSON-LD strutturato per massimizzare la presenza nei featured
  snippet di Google.

- **Accessibilità:** WCAG 2.1 AA, garantendo contrasti elevati su Paper
  Canvas.

## 5. Roadmap Definitiva

1.  **Sprint 1:** Setup Architettura, Auth e Design Tokens (Walkway +
    Palette).

2.  **Sprint 2:** Migrazione dati statici su Convex e CRUD Admin.

3.  **Sprint 3:** Sviluppo Quiz interattivo e logica Web-Scorecard con
    CSS Print.

4.  **Sprint 4:** Ottimizzazioni SEO, test di usabilità e Go-Live.

**Approvazione Finale:** Validato dal PO in data 17/02/2026.
Documentazione pronta per l\'handoff tecnico.
