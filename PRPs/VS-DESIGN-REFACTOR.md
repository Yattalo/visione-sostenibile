# PRP: Design Refactoring for Visione Sostenibile

## 1. Context & Objectives
Implement 7 specific design tasks to improve consistency, user experience, and lead generation quality.
- **Project**: Visione Sostenibile
- **Stack**: Next.js 16 (App Router), Tailwind v4, Framer Motion, Convex.
- **Design Tokens**: 
  - `forest`: Primary backgrounds/text.
  - `paper`: Secondary backgrounds.
  - `leaf`: Success/nature accents.
  - `sun`: CTA accents.

## 2. Implementation Plan

### Step 1: VS-D1 - Homepage ATF (`app/page.tsx`)
- Modify lines 78–189.
- Set height to `h-[70vh] md:h-[50vh]`.
- Centered content.
- Reduce overlay opacity by 20%.
- Keep only "Visualizza i Servizi" CTA.
- Remove badges, trust bar, and scroll indicator.
- **Validation**: Check visual appearance on `/`.

### Step 2: VS-D2 - Footer (`components/Footer.tsx`)
- Increase logo height from `h-12` to `h-20`.
- Add "Chiama Ora" (`Phone`) and "Scrivici" (`Mail`) buttons.
- Align icons and text with `flex items-center gap-2`.
- **Validation**: Check footer on any page.

### Step 3: VS-D3 - Team Section & Chi Siamo ATF
- **`components/TeamSection.tsx`**: Add Andrea Giordano card at the start. Align role texts using `min-h-[4.5rem]` or flex alignment.
- **`chi-siamo/page.tsx`**: Adjust ATF height and overlay opacity.
- **Validation**: Check `/chi-siamo`.

### Step 4: VS-D4 - Servizi Single Pages (`servizi/[slug]/page.tsx`)
- Adjust ATF: `h-[70vh] md:h-[50vh]`, centered content, reduced overlay.
- Add/Fix `ReviewsWidget` with `max-w-5xl mx-auto px-6`.
- Ensure consistent padding and max-widths.
- **Validation**: Check a service page (e.g., `/servizi/progettazione`).

### Step 5: VS-D5 - Progetti Single Pages (`progetti/[slug]/page.tsx`)
- Remove the full-width image section.
- Use project image as ATF background with increased opacity (`opacity-40`) and reduced overlay.
- Adjust ATF height and center text.
- Fix horizontal scroll using `overflow-x-hidden`.
- **Validation**: Check a project page.

### Step 6: VS-D6 - Qualità (`qualita/page.tsx`)
- Add "Scarica Certificato" button to each card.
- Add "Richiedi Documentazione" CTA.
- Enrich descriptions for the three certifications.
- Adjust ATF height and center text.
- **Validation**: Check `/qualita`.

### Step 7: VS-D7 - Questionario (`contatti/page.tsx`)
- Implement Step 0: B2B/B2C selection.
- Implement branched logic (B2C path vs B2B path).
- Implement professional assignment logic based on selected services.
- Update UI to 5 steps.
- Show assigned professional in the summary step.
- Update ATF for the contact page.
- **Validation**: Test the full questionnaire flow on `/contatti`.

## 3. Success Criteria
- All 7 tasks implemented according to `VS-DESIGN-TASKS.md`.
- No regression in styling or functionality.
- Professional assignment logic works correctly.
- Mobile and desktop layouts are optimized.

## 4. Commit Messages
Follow the suggested messages in `VS-DESIGN-TASKS.md` for each task or group of tasks.
