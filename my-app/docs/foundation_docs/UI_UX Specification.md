# 🎨 Specifiche UI/UX --- Visione Sostenibile (Versione Integrata)

**Designer:** Sally (UX Expert)

**Stato:** Design System Definitivo (Ready for Architect)

**Riferimento:** Brand Vision & PRD v1.1

## 1. Fondamenta del Design System

### 🎨 Palette Cromatica & Texture Materica

Non operiamo su colori piatti, ma su \"superfici\".

- **Layer 0 - Paper Canvas (#F2F0EC):** La base del sito.

  - *Texture:* Overlay CSS radial-gradient o un file SVG noise (3%
    opacità) per simulare la carta riciclata di pregio. Elimina il
    riflesso digitale e rende la lettura riposante.

- **Layer 1 - Deep Forest (#0B1E0E):** Il colore dell\'autorità.

  - *Utilizzo:* Sfondi di sezioni \"Visionary\", testi H1/H2, bottoni
    primari di navigazione.

- **Layer 2 - Leaf Green (#22582C / #4FA45A):** L\'energia botanica.

  - *Utilizzo:* #22582C per bordi di card e icone; #4FA45A (più
    luminoso) per stati hover e accenti di crescita.

- **Layer 3 - Sun Accent (#EAB831):** Il \"colore cinetico\".

  - *Utilizzo:* Esclusivamente per la conversione. Se un elemento è
    giallo, l\'utente *deve* cliccarlo.

### 🖋️ Tipografia: Walkway Family (Implementazione Strategica)

La tipografia deve bilanciare la fluidità organica del logo con una
griglia architettonica.

- **H1 Hero:** Walkway Extra Bold (64-80px). Line-height 1.1.
  Lettera-spacing: -0.02em.

- **H2 Sezioni:** Walkway Bold (48px). Line-height 1.2.

- **H3 Card:** Walkway Semi Bold (24px).

- **Body:** Walkway Regular (18px). Line-height 1.6 per massima
  leggibilità su Paper Canvas.

- **Micro-copy & Tags:** Walkway Oblique Black (12px, All Caps).

- **Enfasi Narrativa:** Walkway Oblique (Regular o Bold) per citazioni e
  concetti di \"Visione\". L\'inclinazione deve suggerire proiezione
  verso il futuro.

## 2. Micro-Interazioni & Feedback Visivo

### A. L\'Effetto \"Germoglio\" (Hover)

Ogni card o elemento interattivo non deve semplicemente cambiare colore,
ma \"fiorire\":

- **Card Hover:** Transizione fluida (400ms cubic-bezier) con un leggero
  spostamento verso l\'alto (4px) e l\'apparizione di un\'ombra morbida
  con tinta #22582C (opacità 10%).

- **Buttons:** Il pulsante *Sun Accent* si espande leggermente (scale
  1.05) con un bagliore interno che simula la luce solare.

### B. Header Sticky \"Chameleon\"

- **Trasparenza:** Inizialmente trasparente con logo in *Paper Canvas*.

- **Transizione:** Al superamento di 80px di scroll, l\'header diventa
  *Deep Forest* (se siamo su sezioni chiare) o viceversa, garantendo
  contrasto costante.

## 3. Strategia del Lead Magnet: Il Quiz \"Scorecard\"

Il questionario deve sembrare una conversazione professionale, non un
test clinico.

### UI del Quiz:

- **Input States:** Checkbox e Radio button sostituiti da \"Tiles\"
  materiche che utilizzano icone SVG minimaliste.

- **Progress Bar:** Una linea sottile *Leaf Green* che si riempie come
  una pianta che cresce, con il font Walkway Oblique che indica la
  percentuale.

- **Animazioni di Caricamento:** Durante la generazione della Scorecard,
  mostrare un\'animazione della \"S\" (germoglio) del logo che ruota o
  si espande dolcemente.

### Design del Deliverable (PDF):

- **Intestazione:** Logo *Visione Sostenibile* in alta risoluzione su
  sfondo *Paper Canvas*.

- **Griglia:** Layout a 2 colonne, stile editoriale.

- **Visualizzazione Dati:** Grafici a torta o barre che utilizzano
  esclusivamente la palette #22582C e #EAB831.

## 4. Gap colmati (Requisiti Tecnici per lo Sviluppo)

- **Z-Index:** Header (100), Modali Quiz (200), Tooltip (300).

- **Spaziature (Spacing System):** Basato su multipli di 8px (8, 16, 24,
  48, 64, 96).

- **SEO & Accessibilità:** Ogni immagine di \"progetto\" deve avere un
  alt descrittivo in Walkway Regular (nascosto ai lettori ma presente
  nel codice) per favorire i featured snippet.

- **Dark Mode:** Non prevista inizialmente, poiché il brand si basa
  sulla solarità di *Paper Canvas*. In caso di necessità, il \"Dark
  Mode\" sarà la versione *Deep Forest* dominante.

**Handoff per Winston (Architect):** Le specifiche sono ora complete e
integrate con l\'identità di brand. Winston, procedi con l\'architettura
tecnica focalizzandoti sul caricamento dei font Walkway, lo storage dei
dati del quiz su Convex e la funzione server-side per la generazione
PDF.
