# INITIAL.md - Visione Sostenibile Design Refactoring

## FEATURE
Implementing a series of design improvements and refactoring across the "Visione Sostenibile" website. The goal is to uniform the "Above the Fold" (ATF) sections, improve the navigation/footer, update the team section, and implement a more advanced contact questionnaire with B2B/B2C branching.

The tasks are detailed in `artifacts/tmp/VS-DESIGN-TASKS.md` and include:
1. **VS-D1: Homepage ATF** - Slimming the hero section to 50vh/70vh, keeping only the title and one CTA.
2. **VS-D2: Footer** - Adding "Call Now" and "Write Us" buttons with aligned icons, increasing logo size.
3. **VS-D3: Chi Siamo & Team** - Aligning team member roles, adding Andrea Giordano's card, and adjusting ATF.
4. **VS-D4: Servizi [slug]** - Uniforming the single service page design, adjusting margins for reviews, and adjusting ATF.
5. **VS-D5: Progetti [slug]** - Dynamic hero background from project image, removing full-width photo section, fixing horizontal scroll.
6. **VS-D6: Qualità** - Adding certification download buttons, detailed descriptions, and adjusting ATF.
7. **VS-D7: Questionario** - Implementing a multi-step B2B/B2C branched questionnaire with professional assignment logic.

## EXAMPLES
- `my-app/app/page.tsx` for the current hero implementation.
- `my-app/app/components/ProfileCard.tsx` (if it exists) for team cards.
- `my-app/app/components/ReviewsWidget.tsx` for review sections.

## DOCUMENTATION
- Tailwind CSS v4 documentation (project uses v4).
- Framer Motion documentation for animations.
- Convex documentation for the contact form submission.

## OTHER CONSIDERATIONS
- **ATF Guidelines**: All heros should be `h-[70vh] md:h-[50vh]`, have 20% reduced overlay opacity, and centered text.
- **Design System**: Colors: paper (#F2F0EC), forest (#0B1E0E), leaf (#22582C/#4FA45A), sun (#EAB831).
- **Font**: Walkway family.
- **Responsive**: Ensure all changes work well on mobile and desktop.
