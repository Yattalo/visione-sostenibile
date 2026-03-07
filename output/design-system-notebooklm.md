# Visione Sostenibile — Design System (for NotebookLM)

## 1) Contesto e Stack
- Framework: Next.js (App Router) con Tailwind CSS v4 (token via `@theme inline` in `app/globals.css`).
- UI base: shadcn/ui (config `components.json`, stile `new-york`, `cssVariables: true`).
- Motion: framer-motion per animazioni e micro‑interazioni.
- Icone: lucide.
- Font principale: **Walkway** (font locale via `next/font/local`, variabile `--font-walkway`).

File principali:
- `app/globals.css` → tokens, utility e stile globale.
- `app/layout.tsx` → font locale + app shell.
- `app/components/ui/*` → componenti UI base.
- `app/components/animations.tsx` → animazioni.

## 2) Tipografia
**Font family**
- Display / Sans / Body: tutti su Walkway (`--font-display`, `--font-sans`, `--font-body`).
- Varianti e pesi gestiti da `next/font/local`:
  - Normal: SemiBold 300/400/500/600, Bold 700, Black 800/900.
  - Italic: Oblique 300/400/500, Oblique Bold 600/700, Oblique Black 800/900.

**Stile globale body**
- `font-size: 18px`, `line-height: 1.6`, `letter-spacing: 0.008em`, `font-weight: 400`.

**Scale headings (BMAD)**
- `h1`: display strong, weight 900, line-height 1.1, letter-spacing -0.02em.
- `h2`: display, weight 700, line-height 1.2, letter-spacing -0.02em.
- `h3`: display, weight 600, line-height 1.3.
- `h4–h6`: display, weight 600, letter-spacing -0.02em.

**Utility tipografiche**
- `.font-display`, `.font-sans`, `.font-body`.
- `.text-micro`: uppercase, italic, 12px, weight 900, letter-spacing 0.05em.
- `.text-emphasis`: italic (enfasi soft).
- `.text-balance`: `text-wrap: balance`.

## 3) Colori
Palette “BMAD High‑Contrast Nature” + serie extra (cream, moss, terracotta, charcoal).

**Neutrali carta (paper)**
- `--color-paper-50` #FAF9F7
- `--color-paper-100` #F2F0EC
- `--color-paper-200` #E8E5DF
- `--color-paper-300` #D4CFC6
- `--color-paper-400` #B8B2A6
- `--color-paper-500` #9C958A
- `--color-paper-600` #7D776C
- `--color-paper-700` #615C53
- `--color-paper-800` #48443C
- `--color-paper-900` #31302A
- `--color-paper-950` #1D1C18

**Forest (testi forti/authority)**
- `--color-forest-50` #EEFAEF
- `--color-forest-100` #D8F3DA
- `--color-forest-200` #B4E5B8
- `--color-forest-300` #84D18C
- `--color-forest-400` #58B863
- `--color-forest-500` #3A9A47
- `--color-forest-600` #2B7C36
- `--color-forest-700` #22612C
- `--color-forest-800` #1B4D23
- `--color-forest-900` #153D1C
- `--color-forest-950` #0B1E0E

**Leaf (accenti botanici)**
- `--color-leaf-50` #F0FAF2
- `--color-leaf-100` #DCF2E0
- `--color-leaf-200` #BCE5C3
- `--color-leaf-300` #90D19B
- `--color-leaf-400` #65B873
- `--color-leaf-500` #4FA45A
- `--color-leaf-600` #3A8744
- `--color-leaf-700` #22582C
- `--color-leaf-800` #1F4A27
- `--color-leaf-900` #1A3D22
- `--color-leaf-950` #0E2414

**Sun (CTA only)**
- `--color-sun-50` #FEFCEE
- `--color-sun-100` #FDF6CE
- `--color-sun-200` #FBED9E
- `--color-sun-300` #F7DC65
- `--color-sun-400` #EAB831
- `--color-sun-500` #D49E1B
- `--color-sun-600` #B57B13
- `--color-sun-700` #915B13
- `--color-sun-800` #784917
- `--color-sun-900` #643D19
- `--color-sun-950` #3A200A

**Altre serie**
- Cream: `--color-cream-50..950`
- Moss: `--color-moss-50..950`
- Terracotta: `--color-terracotta-50..950`
- Charcoal: `--color-charcoal-50..950`

**Semantici (shadcn/css vars)**
Definiti in `:root` e in `.dark`:
- `--background`, `--foreground`, `--card`, `--card-foreground`, `--muted`, `--muted-foreground`, `--border`, `--input`, `--ring`, `--accent`, `--primary`, `--secondary`, `--destructive`, `--popover`, `--chart-*`, `--sidebar-*`.

## 4) Spaziature e Raggio
**Spacing (8px grid)**
- `--spacing-1: 8px`
- `--spacing-2: 16px`
- `--spacing-3: 24px`
- `--spacing-6: 48px`
- `--spacing-8: 64px`
- `--spacing-12: 96px`

**Radius**
- `--radius: 0.625rem`
- `--radius-sm/md/lg/xl/2xl/3xl/4xl` (calcolati da `--radius`).

## 5) Ombre
- `--shadow-soft`: 0 4px 20px -2px rgba(0,0,0,0.08)
- `--shadow-medium`: 0 8px 30px -4px rgba(0,0,0,0.12)
- `--shadow-deep`: 0 16px 50px -8px rgba(0,0,0,0.16)
- `--shadow-floating`: 0 25px 60px -12px rgba(92,70,50,0.15)

## 6) Gradienti e Texture
**Gradient utilities**
- `.bg-paper-gradient`: paper 50→100
- `.bg-forest-gradient`: forest 900→950
- `.bg-leaf-gradient`: leaf 600→800
- `.bg-sun-gradient`: sun 300→500
- `.bg-cream-gradient`, `.bg-moss-gradient`, `.bg-terracotta-gradient`

**Text gradients**
- `.text-gradient-warm`: terracotta 500 → moss 600
- `.text-gradient-earth`: charcoal 800 → moss 700
- `.text-gradient-nature`: leaf 700 → forest 800

**Texture**
- `.bg-organic-noise`: noise overlay (SVG data URI, opacity 0.03).
- `.bg-paper-canvas`: paper base + noise overlay.

## 7) Motion e Animazioni
**Keyframes**
- `float`: oscillazione verticale.
- `drift`: oscillazione orizzontale + rotazione.
- `shimmer`: background-position 200%.

**Utility animate**
- `--animate-float`, `--animate-pulse-slow`, `--animate-drift`, `--animate-shimmer`.

**Componenti motion (framer-motion)**
- `FadeIn`, `SlideUp`, `SlideDown`, `ScaleIn`, `StaggerContainer`, `StaggerItem`, `TypingText`, `Bounce`, `Glow`.
- Pattern: animazioni attivate on‑scroll con `useInView` e `useAnimation` per evitare “hidden content” SSR.

## 8) Utility UI e Patterns
**Sezioni & layout**
- `.section-padding`, `.section-padding-sm`, `.card-padding` con breakpoints 768/1024.
- Z‑index: `.z-header` 100, `.z-modal` 200, `.z-tooltip` 300.

**Hover e micro‑interazioni (F6)**
- `.hover-germoglio`: lift + shadow verde.
- `.hover-sun`: scale + inner glow giallo.
- `.hover-leaf-border`: bordo verde al hover.

**Navbar glass**
- `.glass-nav`: glassmorphism con blur + bordo e text‑shadow.

**Neumorphism / Card**
- `.shadow-neumorphic`, `.step-card`.

**FAQ / accordion**
- `.faq-card` + rimozione marker su `details > summary`.

**Scrollbar**
- Track `paper-200`, thumb `leaf-500/600`.

## 9) Componenti UI Base (app/components/ui)
**Button**
- Varianti: `primary`, `secondary`, `outline`, `ghost`.
- Stile: uppercase, tracking wide, rounded-full.
- Focus ring: `ring-sun-400` con offset `paper-50`.
- Motion hover/tap (scale).

**Card**
- Varianti: `default`, `elevated`, `outline`.
- Rounded `2xl`, padding 6, shadow `soft|floating`.
- Sub‑componenti: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

**Badge**
- Varianti: `default`, `primary`, `earth`, `success`, `warning`, `outline`, `eco`, `biodynamic`.
- Uppercase, tracking wide, rounded-full.

**Input / Textarea / Checkbox / RadioGroup / CheckboxGroup**
- Rounded `xl`, focus ring con `ring` token.
- Error state: `border-red-500` + `ring-red-500`.
- Checkbox/radio con stati selezionati su leaf/paper.

**Modal**
- Overlay: `bg-black/60` + blur.
- Panel: `bg-card` + shadow 2xl, rounded 2xl.
- Lock scroll body on open.

**Skeleton**
- Varianti di placeholder (card, text, avatar, button, input, badge, hero, stats, gallery, review, form).

## 10) Visual Brand Notes (implicite nel codice)
- Linguaggio naturale/organico: palette terra‑verde + texture carta.
- CTA gialle (“Sun”) usate solo per azioni primarie.
- Titoli display con peso alto e tracking leggermente negativo.
- Rounded ampi e ombre morbide per un look premium e caldo.

## 11) Font Assets
- Folder: `public/walkway/`.
- Favicon e asset SVG in `public/`.

## 12) Punti d’uso (esempi in pagine)
- `app/page.tsx`, `app/blog/*`, `app/progetti/*`, `app/privacy/*` per combinazioni reali di classi (tipografia + colori + layout).

---
Se serve, posso estrarre anche una mappa “componenti → classi” o un inventario delle classi Tailwind più usate.
