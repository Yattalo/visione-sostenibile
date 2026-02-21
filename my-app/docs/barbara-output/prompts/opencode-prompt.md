# Task VS-B3: Rewrite 4 Pages with Barbara Anti-Rhetoric Copy

## Context
You are working on Visione Sostenibile, an Italian gardening company website.
Stack: Next.js 16 + Convex + Tailwind CSS v4 + Framer Motion + React 19.
Company: based in Torino, Piemonte. Founded by Andrea Giordano. Biodinamico approach.
Brand: "contractor del verde" — one reference, modular team.

Working directory: my-app/

## Your Task
Rewrite the copy on 4 pages using the Barbara storytelling document as source.
Read: "Visione Sostenibile_struttura storytelling.md" (at the my-app/ level)

## CRITICAL: What to Change and What to Preserve
- CHANGE: All Italian text strings (headlines, descriptions, CTAs, labels, microcopy)
- PRESERVE: All imports, component structure, Convex queries, TypeScript types, JSX structure
- PRESERVE: All className attributes (Tailwind classes, font-display, font-body, etc.)
- PRESERVE: All Framer Motion animations
- You are ONLY changing text content, not code structure

## Font Requirements
The site uses Walkway font exclusively. CSS classes to use:
- font-display = Walkway (for headings)
- font-body = Walkway (for body text)
- font-sans = Walkway (for UI elements)
These are already set in globals.css. Just make sure you do NOT introduce any other font.

## Page 1: Homepage (app/page.tsx)
Source: "LP" and "Website Struttura" sections of storytelling doc.
Key changes:
- Hero H1: "Il tuo giardino sostenibile, senza coordinare 5 fornitori."
- Hero subtitle: from "Con Visione Sostenibile hai un unico interlocutore..."
- CTA 1: "Richiedi un sopralluogo" (primary, Sun Accent)
- CTA 2: "Sono un'azienda/condominio" (secondary)
- Micro: "Operativi in Piemonte e Trentino. In espansione in Lombardia."
- Three value cards: "Un referente", "Sostenibile vero", "Team modulare" (from storytelling doc "Tre card di valore")
- Manifesto section: use the "Micro-manifesto" version
- Replace any generic Italian copy with Barbara concrete messaging
- "Perche funziona" section with the 3 cards from storytelling doc

## Page 2: Chi Siamo (app/chi-siamo/page.tsx)
Source: "Andrea Giordano" section (Versione 1 "Umano")
Key changes:
- H1: "Andrea Giordano: il giardiniere che ti spiega il perche."
- Bio text: use Versione 1 (calda, narrativa) from storytelling doc
- Add manifesto section (Versione "Manifesto" from doc)
- Values: from "Sostenibile non e una moda" section
- Micro-CTA: "Guarda Andrea in 2 minuti" | "Richiedi un sopralluogo"

## Page 3: Servizi (app/servizi/page.tsx)
Source: "Servizi" and "Box Servizi Plus" sections
Key changes:
- H1: "Cosa possiamo fare per te"
- Organize by 3 levels: Verde sostenibile (core), Outdoor living (comfort), Acqua e benessere (premium)
- Each service: title + what client gets (not what we do)
- Microcopy: "Non vendiamo pezzi. Progettiamo sistemi."
- CTA: "Richiedi un sopralluogo"
NOTE: The servizi page is currently minimal (428 bytes). You may need to build it out with a proper listing of services using the existing ServiceCard component if available, or create a structured grid.

## Page 4: Contatti (app/contatti/page.tsx)
Source: "CTA forte" section and "Footer" section
Key changes:
- H1: "Parliamone: ti diciamo cosa serve davvero."
- Subtitle: "Che tu stia partendo da zero o che tu voglia riqualificare..."
- CTA: "Richiedi un sopralluogo" + "Richiedi una call (aziende/condomini)"
- Micro-rassicurazione: "Rispondiamo entro 48 ore lavorative."
- Geography: "Operativi in Piemonte e Trentino Alto-Adige. In espansione in Lombardia."

## Tone Rules
- Italian ONLY
- Anti-rhetoric: concrete and specific, no buzzwords
- Every claim has a "perche" (why)
- Andrea voice: passionate but grounded
- "sostenibile" only when backed by specifics (what it means, not just the word)
- "Non facciamo giardini Instagram. Facciamo giardini che superano agosto."

## IMPORTANT
- Modify ONLY these 4 files: app/page.tsx, app/chi-siamo/page.tsx, app/servizi/page.tsx, app/contatti/page.tsx
- Do NOT modify any other files
- After changes, run: npx tsc --noEmit to verify TypeScript
- Commit with message "feat(VS-B3): rewrite pages with Barbara anti-rhetoric copy"
