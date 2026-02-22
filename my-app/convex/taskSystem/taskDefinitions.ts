// ============================================================
// Task Definitions — Visione Sostenibile BMAD Evolution
// Generated from BMAD foundation docs (17 Feb 2026)
// Run `npx convex run taskSystem/orchestrator:seed '{}'` to import
// ============================================================

export interface TaskDefinition {
  taskId: string;
  agent: string;
  title: string;
  description: string;
  status: "backlog" | "todo" | "in_progress" | "blocked" | "in_review" | "done";
  priority: "critical" | "high" | "medium" | "low";
  category: string;
  phaseId: string;
  wave: number;
  estimatedHours?: number;
  dependencies?: string[];
  tags?: string[];
  acceptanceCriteria?: string[];
  filesExpected?: string[];
}

export const TASK_DEFINITIONS: TaskDefinition[] = [
  // ═══════════════════════════════════════════════════════════
  // PHASE: FOUNDATION (Sprint 1) — Design System + Architecture
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "F1",
    agent: "claude",
    title: "Migrate Tailwind palette to High-Contrast Nature",
    description:
      "Replace current cream/moss/terracotta/charcoal palette in globals.css @theme with BMAD High-Contrast Nature palette: Paper Canvas (#F2F0EC), Deep Forest (#0B1E0E), Leaf Green (#22582C/#4FA45A), Sun Accent (#EAB831). Generate full scale (50-950) for each. Update CSS custom properties (:root), gradients, and utility classes. Ensure all existing component references still compile.",
    status: "todo",
    priority: "critical",
    category: "uiux",
    phaseId: "foundation",
    wave: 1,
    estimatedHours: 4,
    dependencies: [],
    tags: ["design-system", "palette", "tailwind"],
    acceptanceCriteria: [
      "globals.css uses Paper Canvas, Deep Forest, Leaf Green, Sun Accent scales",
      "All gradient utilities updated (.bg-paper-gradient, .bg-forest-gradient, etc.)",
      ":root variables reference new palette",
      "pnpm build passes without errors",
      "No visual regression on existing pages (components reference Tailwind classes)",
    ],
    filesExpected: ["app/globals.css"],
  },

  {
    taskId: "F2",
    agent: "claude",
    title: "Configure Walkway font family via next/font/local",
    description:
      "Replace Playfair Display + Quicksand with Walkway Family. Font files already in public/walkway/. Configure next/font/local in layout.tsx with all Walkway variants (Regular, Bold, SemiBold, ExtraBold, Oblique, Oblique Bold, Oblique Black). Update CSS variables (--font-walkway) and Tailwind @theme tokens. Update globals.css typography rules per BMAD spec: H1 64-80px ExtraBold, H2 48px Bold, H3 24px SemiBold, Body 18px Regular, Micro-copy 12px Oblique Black ALL CAPS.",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "foundation",
    wave: 1,
    estimatedHours: 3,
    dependencies: [],
    tags: ["design-system", "typography", "walkway"],
    acceptanceCriteria: [
      "next/font/local loads all Walkway variants with correct weights",
      "--font-walkway CSS variable available globally",
      "Tailwind classes font-display and font-sans use Walkway",
      "Typography scale matches BMAD spec (H1-H3, Body, Micro-copy)",
      "pnpm build passes, fonts render on localhost:3000",
    ],
    filesExpected: [
      "app/layout.tsx",
      "app/globals.css",
    ],
  },

  {
    taskId: "F3",
    agent: "claude",
    title: "Add leads table to Convex schema",
    description:
      "Add 'leads' table to convex/schema.ts for the micro-funnel scorecard feature. Fields: quizAnswers (array of objects with questionId, answer, score), totalScore (number), scorecardId (string, unique), name (string), email (string), phone (optional string), createdAt (number), isContacted (boolean). Indexes: by_scorecardId, by_email, by_date. Create convex/leads.ts with basic CRUD queries/mutations.",
    status: "todo",
    priority: "high",
    category: "backend",
    phaseId: "foundation",
    wave: 1,
    estimatedHours: 2,
    dependencies: [],
    tags: ["convex", "schema", "leads", "scorecard"],
    acceptanceCriteria: [
      "leads table added to convex/schema.ts with proper indexes",
      "convex/leads.ts exports submit, getByScorecard, getAll queries/mutations",
      "Zod validation schema for quiz answers",
      "npx convex dev deploys successfully",
    ],
    filesExpected: [
      "convex/schema.ts",
      "convex/leads.ts",
    ],
  },

  {
    taskId: "F4",
    agent: "claude",
    title: "Implement Paper Canvas texture utility",
    description:
      "Create .bg-paper-canvas CSS utility in globals.css that applies #F2F0EC background with an SVG noise overlay at 3% opacity (simulating recycled paper). Replace existing .bg-organic-noise with the new approach. Add .print-only utility class (display:none by default, visible in @media print). Update :root --background to reference Paper Canvas.",
    status: "todo",
    priority: "high",
    category: "uiux",
    phaseId: "foundation",
    wave: 2,
    estimatedHours: 1,
    dependencies: ["F1"],
    tags: ["design-system", "texture", "css"],
    acceptanceCriteria: [
      ".bg-paper-canvas renders Paper Canvas with noise texture",
      ".print-only visible only in print media",
      "Body background uses Paper Canvas",
      "Noise overlay is subtle (3% opacity) and non-intrusive",
    ],
    filesExpected: ["app/globals.css"],
  },

  {
    taskId: "F5",
    agent: "claude",
    title: "Implement Convex Auth for admin panel",
    description:
      "Implement authentication for the admin panel using Convex Auth. Protect all /admin/* routes. Create login page at /admin/login. Admin users stored in Convex (email/password). Middleware or layout-level auth check redirects unauthenticated users. Session management with Convex. Follow Next.js 16 App Router patterns.",
    status: "todo",
    priority: "critical",
    category: "backend",
    phaseId: "foundation",
    wave: 2,
    estimatedHours: 6,
    dependencies: [],
    tags: ["auth", "convex", "admin", "security"],
    acceptanceCriteria: [
      "Admin login page renders at /admin/login",
      "Unauthenticated access to /admin/* redirects to login",
      "Successful login grants access to admin dashboard",
      "Session persists across page refreshes",
      "Logout functionality works",
      "Auth state does not affect public pages",
    ],
    filesExpected: [
      "app/admin/login/page.tsx",
      "app/admin/layout.tsx",
      "convex/auth.ts",
    ],
  },

  {
    taskId: "F6",
    agent: "claude",
    title: "Update CSS micro-interaction utilities (Germoglio effect)",
    description:
      "Implement the 'Germoglio' (sprout) hover effect system per BMAD UI/UX spec. Card hover: translateY(-4px) + box-shadow with Leaf Green (#22582C) at 10% opacity, 400ms cubic-bezier transition. Sun Accent buttons: scale(1.05) + inner glow simulating sunlight. Create reusable Tailwind utilities or CSS classes for these effects. Update z-index system: Header(100), Quiz Modals(200), Tooltip(300).",
    status: "todo",
    priority: "high",
    category: "uiux",
    phaseId: "foundation",
    wave: 2,
    estimatedHours: 2,
    dependencies: ["F1"],
    tags: ["design-system", "animations", "hover", "germoglio"],
    acceptanceCriteria: [
      "Card hover effect matches BMAD spec (translate + shadow)",
      "Button CTA hover matches spec (scale + glow)",
      "Transitions are 400ms cubic-bezier, smooth on mobile",
      "Z-index system documented and applied",
      "No hover-dependent readability (mobile-first)",
    ],
    filesExpected: [
      "app/globals.css",
      "app/components/ui/Card.tsx",
      "app/components/ui/Button.tsx",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE: CORE (Sprint 1-2) — Component Standardization
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "C1",
    agent: "claude",
    title: "Build Chameleon Header component",
    description:
      "Redesign Navbar component as the BMAD 'Chameleon Header'. Initially transparent with Paper Canvas logo. After 80px scroll: transitions to Deep Forest background (on light sections) or Paper Canvas (on dark sections). Always shows persistent CTA button 'Richiedi Preventivo' in Sun Accent. Menu items use Walkway SemiBold. Mobile hamburger menu preserved. Use Framer Motion for smooth transitions.",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "core",
    wave: 3,
    estimatedHours: 5,
    dependencies: ["F1", "F2", "F4"],
    tags: ["header", "navbar", "chameleon", "sticky"],
    acceptanceCriteria: [
      "Header is transparent over hero sections",
      "Header transitions to solid after 80px scroll",
      "CTA 'Richiedi Preventivo' always visible in Sun Accent",
      "Color adapts based on section contrast",
      "Mobile menu works correctly",
      "Consistent across all pages",
      "Framer Motion transitions are smooth",
    ],
    filesExpected: [
      "app/components/Navbar.tsx",
    ],
  },

  {
    taskId: "C2",
    agent: "claude",
    title: "Standardize Button component with Sun Accent CTA",
    description:
      "Refactor Button component per BMAD spec. Primary CTA uses Sun Accent (#EAB831) with Deep Forest text. Secondary uses Deep Forest bg with Paper Canvas text. Ghost and outline variants updated. All buttons use Walkway SemiBold. Add Germoglio hover effect (scale 1.05 + inner glow on primary). Standardize states: hover, focus (visible ring), disabled (opacity), active (scale down). Ensure consistent sizing (sm/md/lg) across entire site.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "core",
    wave: 3,
    estimatedHours: 3,
    dependencies: ["F1", "F2", "F6"],
    tags: ["button", "cta", "component", "standardization"],
    acceptanceCriteria: [
      "Primary Button is Sun Accent with Germoglio hover",
      "All 4 variants (primary, secondary, outline, ghost) updated",
      "Focus ring visible for keyboard navigation",
      "Disabled state is clear (opacity + cursor)",
      "Walkway SemiBold for all button text",
      "Consistent use across all pages",
    ],
    filesExpected: [
      "app/components/ui/Button.tsx",
    ],
  },

  {
    taskId: "C3",
    agent: "claude",
    title: "Standardize Card component with Germoglio hover",
    description:
      "Refactor Card component per BMAD spec. Apply Germoglio hover effect to all interactive cards (translateY -4px, Leaf Green shadow). Card backgrounds on Paper Canvas base. Border: 1px Leaf Green (#22582C). Heading uses Walkway Bold, body uses Walkway Regular. Ensure consistent card layout for services, projects, blog, and reviews. Remove redundant card variants, keep: default, elevated, outline.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "core",
    wave: 3,
    estimatedHours: 3,
    dependencies: ["F1", "F2", "F6"],
    tags: ["card", "component", "standardization", "germoglio"],
    acceptanceCriteria: [
      "All cards use Germoglio hover effect",
      "Leaf Green border on cards",
      "Typography uses Walkway per hierarchy",
      "ServiceCard, project cards, blog cards, review cards all consistent",
      "Glass variant removed (not in BMAD spec)",
    ],
    filesExpected: [
      "app/components/ui/Card.tsx",
      "app/components/ServiceCard.tsx",
    ],
  },

  {
    taskId: "C4",
    agent: "claude",
    title: "Implement spacing system (8px grid)",
    description:
      "Standardize vertical and horizontal spacing across the site using 8px multiples: 8, 16, 24, 48, 64, 96 per BMAD spec. Create Tailwind spacing tokens if not already matching. Audit and update section padding (py-24 or py-16 consistently), card gaps (gap-6 or gap-8), and content margins. Create a spacing reference in globals.css or as Tailwind config.",
    status: "todo",
    priority: "medium",
    category: "uiux",
    phaseId: "core",
    wave: 3,
    estimatedHours: 2,
    dependencies: ["F1"],
    tags: ["spacing", "design-system", "grid"],
    acceptanceCriteria: [
      "All section padding uses 8px-multiple values",
      "Consistent gap between cards and grid items",
      "No arbitrary spacing values outside the 8px system",
      "Visual rhythm is predictable across pages",
    ],
    filesExpected: [
      "app/globals.css",
    ],
  },

  {
    taskId: "C5",
    agent: "claude",
    title: "Uniform Hero sections for internal pages",
    description:
      "Create a reusable PageHero component for all internal pages (servizi, progetti, blog, chi-siamo, contatti, qualita). Structure: eyebrow text (Walkway Oblique Black, 12px, ALL CAPS, Leaf Green), H1 (Walkway ExtraBold, 48-64px, Deep Forest), intro paragraph (Walkway Regular, 18px), optional CTA button. Background: Paper Canvas with optional subtle gradient. Consistent height and responsive behavior.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "core",
    wave: 4,
    estimatedHours: 4,
    dependencies: ["C1", "C2"],
    tags: ["hero", "component", "page-layout"],
    acceptanceCriteria: [
      "PageHero component created with eyebrow/h1/intro/CTA slots",
      "Applied to all internal pages consistently",
      "Responsive at 375px, 768px, 1024px, 1440px",
      "Typography matches BMAD spec",
      "Eyebrow uses Walkway Oblique Black ALL CAPS",
    ],
    filesExpected: [
      "app/components/PageHero.tsx",
    ],
  },

  {
    taskId: "C6",
    agent: "claude",
    title: "Redesign Footer with new design system",
    description:
      "Update Footer component with BMAD palette and typography. Background: Deep Forest. Text: Paper Canvas. Social links, contact info (Via San Francesco D'Assisi 14, Torino), navigation links. CTA section with Sun Accent button. Walkway font throughout. Ensure responsive grid layout.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "core",
    wave: 4,
    estimatedHours: 2,
    dependencies: ["C1", "C2"],
    tags: ["footer", "component"],
    acceptanceCriteria: [
      "Footer uses Deep Forest background",
      "Text in Paper Canvas color",
      "Contact info up to date (Torino address)",
      "Social links functional",
      "Responsive at all breakpoints",
    ],
    filesExpected: [
      "app/components/Footer.tsx",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE: FEATURES (Sprint 2-3) — Data Migration + New Features
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "FE1",
    agent: "claude",
    title: "Migrate blog data from static files to Convex",
    description:
      "Move all blog post content from app/lib/blog.ts into Convex blogPosts table. Create a seed script (convex/blog.ts seed mutation) that imports all existing static posts. Update blog listing page and blog/[slug] to read exclusively from Convex (useQuery). Remove static blog data dependency. Preserve all existing content, metadata, categories, and cover images.",
    status: "todo",
    priority: "high",
    category: "backend",
    phaseId: "features",
    wave: 5,
    estimatedHours: 4,
    dependencies: ["F5"],
    tags: ["migration", "convex", "blog", "data"],
    acceptanceCriteria: [
      "All blog posts seeded into Convex blogPosts table",
      "Blog listing page reads from Convex",
      "Blog detail page reads from Convex",
      "Static blog.ts can be removed or marked as deprecated fallback",
      "All content, images, and metadata preserved",
      "Admin blog CRUD works with Convex data",
    ],
    filesExpected: [
      "convex/blog.ts",
      "app/blog/page.tsx",
      "app/blog/[slug]/page.tsx",
    ],
  },

  {
    taskId: "FE2",
    agent: "claude",
    title: "Migrate projects data from static files to Convex",
    description:
      "Move all projects data from app/lib/progetti-data.ts into Convex projects table. Create a seed script that imports all 12 projects with photos, renders, location, features. Update /progetti and /progetti/[slug] pages to read exclusively from Convex. Preserve all photo references (local /public/progetti/ paths).",
    status: "todo",
    priority: "high",
    category: "backend",
    phaseId: "features",
    wave: 5,
    estimatedHours: 4,
    dependencies: ["F5"],
    tags: ["migration", "convex", "projects", "data"],
    acceptanceCriteria: [
      "All 12 projects seeded into Convex projects table",
      "Projects listing page reads from Convex",
      "Project detail page reads from Convex with photos/renders",
      "Static progetti-data.ts can be deprecated",
      "All photo paths preserved and functional",
      "Admin can manage projects via Convex",
    ],
    filesExpected: [
      "convex/projects.ts",
      "app/progetti/page.tsx",
      "app/progetti/[slug]/page.tsx",
    ],
  },

  {
    taskId: "FE3",
    agent: "claude",
    title: "Enable and fix admin CRUD operations",
    description:
      "Audit all admin pages and enable disabled functionality (currently many actions show cursor-not-allowed). Ensure admin/services, admin/blog, admin/reviews, admin/contacts, admin/gallery, admin/settings all have working CRUD operations connected to Convex mutations. Fix any broken mutation calls. Requires auth to be in place first.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "features",
    wave: 5,
    estimatedHours: 5,
    dependencies: ["F5"],
    tags: ["admin", "crud", "fix"],
    acceptanceCriteria: [
      "All admin CRUD operations functional (no disabled buttons)",
      "Services: create, edit, toggle active, reorder",
      "Blog: create, edit, publish/unpublish, delete",
      "Reviews: approve, reject",
      "Contacts: mark as read, reply status",
      "Gallery: add, delete",
      "Settings: update site settings",
    ],
    filesExpected: [
      "app/admin/services/page.tsx",
      "app/admin/blog/page.tsx",
      "app/admin/reviews/page.tsx",
      "app/admin/contacts/page.tsx",
      "app/admin/gallery/page.tsx",
      "app/admin/settings/page.tsx",
    ],
  },

  {
    taskId: "FE4",
    agent: "claude",
    title: "Redesign Homepage with BMAD vision",
    description:
      "Redesign the homepage per BMAD spec: simplified hero with 1 clear message + 2 prioritized CTAs (primary: Sun Accent 'Scopri il Tuo Giardino' quiz CTA, secondary: 'I Nostri Servizi'). Outcome-focused service cards (not just 'what we do' but 'what the client gets'). Trust numbers section as recurring component. Philosophy section with 4 biodinamico elements. Reviews widget. Final CTA section. All with new palette + Walkway typography.",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 8,
    dependencies: ["C5", "C3", "C2"],
    tags: ["homepage", "redesign", "conversion"],
    acceptanceCriteria: [
      "Hero section: 1 message + 2 CTAs (quiz + services)",
      "Service cards are outcome-focused with benefit text",
      "Trust numbers component displays real metrics",
      "Philosophy section with 4 biodinamico elements",
      "Reviews widget with approved reviews from Convex",
      "Final CTA section drives to quiz or contact",
      "All using BMAD palette + Walkway typography",
      "Responsive at all 4 breakpoints",
    ],
    filesExpected: [
      "app/page.tsx",
      "app/components/TrustNumbers.tsx",
    ],
  },

  {
    taskId: "FE5",
    agent: "claude",
    title: "Redesign Services pages with benefit-driven cards",
    description:
      "Update /servizi listing with benefit-driven service cards: each card shows title (Walkway Bold), outcome text (what client gets), and Sun Accent CTA. Update /servizi/[slug] detail pages with rich content: hero, features list, gallery, FAQ section, related services, and prominent CTA. All 12 services should render correctly from Convex data.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 6,
    dependencies: ["C5", "C3", "C2"],
    tags: ["services", "redesign", "conversion"],
    acceptanceCriteria: [
      "Service listing shows all 12 services as benefit-driven cards",
      "Each card has title, outcome text, and Sun Accent CTA",
      "Detail page has hero, features, gallery, FAQ, related services",
      "Data loads from Convex",
      "Responsive at all breakpoints",
    ],
    filesExpected: [
      "app/servizi/page.tsx",
      "app/servizi/[slug]/page.tsx",
    ],
  },

  {
    taskId: "FE6",
    agent: "claude",
    title: "Redesign Projects portfolio with filters",
    description:
      "Update /progetti listing with filterable grid. Filters by region, type, tags. Use Convex indexes (by_tag, by_active_order). Card shows hero image, title, location, type. Detail page /progetti/[slug] with photo gallery, render gallery, features, description. Data from Convex after FE2 migration.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 5,
    dependencies: ["FE2", "C5", "C3"],
    tags: ["projects", "portfolio", "filters"],
    acceptanceCriteria: [
      "Projects listing with instant client-side filters",
      "Filter by region, type, or tag",
      "Project cards show hero image, title, location",
      "Detail page shows full photo/render gallery",
      "Data from Convex",
      "Responsive grid layout",
    ],
    filesExpected: [
      "app/progetti/page.tsx",
      "app/progetti/[slug]/page.tsx",
    ],
  },

  {
    taskId: "FE7",
    agent: "claude",
    title: "Redesign Blog page with category filters",
    description:
      "Update /blog listing with featured post at top, then grid with category filters. Categories loaded from Convex. Blog cards show cover image, title, excerpt, category badge, date, read time. Detail page /blog/[slug] with full content, related posts, share buttons. Data from Convex after FE1 migration.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 4,
    dependencies: ["FE1", "C5", "C3"],
    tags: ["blog", "redesign", "filters"],
    acceptanceCriteria: [
      "Blog listing with featured post + grid",
      "Category filter works instantly",
      "Blog cards with cover, title, excerpt, badge, date",
      "Detail page with full content and related posts",
      "Data from Convex",
    ],
    filesExpected: [
      "app/blog/page.tsx",
      "app/blog/[slug]/page.tsx",
    ],
  },

  {
    taskId: "FE8",
    agent: "claude",
    title: "Build Quiz micro-funnel (Scorecard lead magnet)",
    description:
      "Implement the interactive quiz per BMAD spec. Multi-step form with 'Tile' inputs (material-styled clickable tiles replacing radio/checkbox). Progress bar: thin Leaf Green line filling like growing plant, with Walkway Oblique percentage. Client-side state machine (useState). Submit answers to Convex leads table at final step only. Loading animation: 'S' germoglio rotating. Generate unique scorecardId. Zod validation for answers.",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "features",
    wave: 7,
    estimatedHours: 10,
    dependencies: ["F3", "F1", "F2", "C2"],
    tags: ["quiz", "funnel", "scorecard", "lead-magnet"],
    acceptanceCriteria: [
      "Quiz renders with material Tile inputs (not standard radio/checkbox)",
      "Progress bar shows Leaf Green plant-growth animation",
      "State machine manages step transitions with Framer Motion",
      "Answers submitted to Convex leads table at completion",
      "Unique scorecardId generated",
      "Loading animation during submission",
      "Zod validates all quiz answers",
      "Mobile-first design, touch-friendly tiles",
    ],
    filesExpected: [
      "app/scorecard/quiz/page.tsx",
      "app/components/QuizTile.tsx",
      "app/components/QuizProgress.tsx",
      "app/lib/quiz-schema.ts",
    ],
  },

  {
    taskId: "FE9",
    agent: "claude",
    title: "Build Web-Scorecard dynamic report page",
    description:
      "Create /scorecard/[id] dynamic route that renders the personalized scorecard report. Loads lead data from Convex by scorecardId. Reuses site UI components (Card, typography, palette). Layout: 2-column editorial grid. Data visualization using Leaf Green + Sun Accent only. Header with VS logo on Paper Canvas. Sections: score summary, detailed analysis per answer, personalized tips, CTA to contact. Print-ready via CSS @media print.",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "features",
    wave: 8,
    estimatedHours: 8,
    dependencies: ["FE8", "F3"],
    tags: ["scorecard", "report", "web-to-print"],
    acceptanceCriteria: [
      "/scorecard/[id] route renders personalized report",
      "Data loaded from Convex leads table",
      "2-column editorial layout",
      "Charts use only Leaf Green + Sun Accent",
      "Print CSS formats as A4 without nav elements",
      "Browser 'Save as PDF' produces clean document",
      "CTA to contact form included",
      "Responsive (mobile: single column)",
    ],
    filesExpected: [
      "app/scorecard/[id]/page.tsx",
      "app/scorecard/[id]/print.css",
    ],
  },

  {
    taskId: "FE10",
    agent: "claude",
    title: "Admin Scorecard editor with live preview",
    description:
      "Create admin interface for editing scorecard advice texts. Admin can modify the tips/advice content that appears in the scorecard report per score range. Live preview shows how changes will look in the actual scorecard layout. Store advice data in Convex settings or a new scorecard_config table. Requires auth.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "features",
    wave: 8,
    estimatedHours: 5,
    dependencies: ["FE9", "F5"],
    tags: ["admin", "scorecard", "editor"],
    acceptanceCriteria: [
      "Admin page for editing scorecard advice texts",
      "Live preview matches actual scorecard rendering",
      "Changes saved to Convex",
      "Protected by auth",
    ],
    filesExpected: [
      "app/admin/scorecard/page.tsx",
    ],
  },

  {
    taskId: "FE11",
    agent: "claude",
    title: "Email notification for new leads (Resend)",
    description:
      "When a new lead completes the quiz, send two emails via Resend: (1) to the lead with their scorecard link, (2) to admin notification that a new lead arrived. Use Convex HTTP action or scheduled function. Email templates styled with Walkway-like web fonts and brand colors. Include scorecard URL in lead email.",
    status: "todo",
    priority: "medium",
    category: "backend",
    phaseId: "features",
    wave: 8,
    estimatedHours: 4,
    dependencies: ["FE8", "F3"],
    tags: ["email", "resend", "notifications", "leads"],
    acceptanceCriteria: [
      "Lead receives email with scorecard link after quiz completion",
      "Admin receives notification email for new leads",
      "Emails use brand styling",
      "Resend integration works in production",
      "Error handling for failed sends",
    ],
    filesExpected: [
      "convex/emails.ts",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE: POLISH (Sprint 3-4) — Trust, Brand, SEO
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "P1",
    agent: "claude",
    title: "Optimize Contatti form (multi-step, less friction)",
    description:
      "Redesign /contatti form per BMAD spec. Multi-step approach: Step 1 (name + email), Step 2 (phone + service interest), Step 3 (message). Framer Motion transitions between steps (germoglio growth effect). Zod validation per step. Submit to Convex contactSubmissions. Success state with confirmation and estimated response time. Use Walkway typography and Sun Accent submit button.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 5,
    dependencies: ["C2", "C5"],
    tags: ["form", "contatti", "conversion", "multi-step"],
    acceptanceCriteria: [
      "Form is multi-step with smooth transitions",
      "Each step validates independently (Zod)",
      "Submission goes to Convex",
      "Success confirmation with estimated response time",
      "Sun Accent submit button",
      "Mobile-friendly, touch-optimized inputs",
    ],
    filesExpected: [
      "app/contatti/page.tsx",
    ],
  },

  {
    taskId: "P2",
    agent: "claude",
    title: "Align Chi Siamo page with BMAD brand",
    description:
      "Update /chi-siamo page with BMAD design system. Feature Andrea Giordano's bio with professional photo. Story of Visione Sostenibile (biodinamico approach). Values section with 4 pillars. Use PageHero, Walkway typography, Paper Canvas backgrounds, Leaf Green accents. Outcome-focused copy: what clients gain from the team's philosophy.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 3,
    dependencies: ["C5"],
    tags: ["chi-siamo", "brand", "about"],
    acceptanceCriteria: [
      "Page uses PageHero component",
      "Founder bio section with photo",
      "Company story with biodinamico emphasis",
      "Values/pillars section",
      "BMAD palette and Walkway typography throughout",
    ],
    filesExpected: [
      "app/chi-siamo/page.tsx",
    ],
  },

  {
    taskId: "P3",
    agent: "claude",
    title: "Replace placeholder content on Qualita page",
    description:
      "Update /qualita page with real certifications and operational standards. Replace placeholder certification data with actual content (or realistic content approved by client). Sections: quality standards, environmental certifications, operational guarantees, methodology. Use trust-building design patterns: numbers, badges, guarantees with Leaf Green checkmarks.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 3,
    dependencies: ["C5"],
    tags: ["qualita", "trust", "certifications"],
    acceptanceCriteria: [
      "No placeholder content remaining",
      "Real or approved certification content displayed",
      "Trust badges with Leaf Green checkmarks",
      "Operational guarantees section",
      "Uses PageHero and BMAD design system",
    ],
    filesExpected: [
      "app/qualita/page.tsx",
    ],
  },

  {
    taskId: "P4",
    agent: "claude",
    title: "Implement JSON-LD structured data",
    description:
      "Add JSON-LD structured data for SEO across key pages. Homepage: Organization + LocalBusiness. Blog posts: Article. Services: Service. Projects: CreativeWork. Reviews: AggregateRating. Contact: ContactPage. Implement as reusable component or head metadata in layout/page files. Follow Google structured data guidelines for featured snippets.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "polish",
    wave: 10,
    estimatedHours: 4,
    dependencies: ["FE4", "FE5"],
    tags: ["seo", "json-ld", "structured-data"],
    acceptanceCriteria: [
      "JSON-LD renders in <head> for all key pages",
      "Validates with Google Rich Results Test",
      "LocalBusiness schema includes Torino address",
      "Blog articles have Article schema",
      "Services have Service schema",
      "Reviews have AggregateRating schema",
    ],
    filesExpected: [
      "app/components/JsonLd.tsx",
      "app/layout.tsx",
    ],
  },

  {
    taskId: "P5",
    agent: "claude",
    title: "CSS Print media queries for Scorecard",
    description:
      "Implement comprehensive @media print styles for the scorecard page. Hide navigation, footer, interactive elements. Format as A4. Ensure Walkway fonts render in print. Optimize chart colors for CMYK-friendly output. Add page breaks between sections. Header/footer with logo and URL.",
    status: "todo",
    priority: "medium",
    category: "uiux",
    phaseId: "polish",
    wave: 10,
    estimatedHours: 2,
    dependencies: ["FE9"],
    tags: ["print", "css", "scorecard", "web-to-print"],
    acceptanceCriteria: [
      "Print output is clean A4 format",
      "No nav/footer/interactive elements in print",
      "Walkway fonts render correctly",
      "Charts visible in print",
      "Page breaks between major sections",
      "Logo and URL in print header/footer",
    ],
    filesExpected: [
      "app/scorecard/[id]/print.css",
    ],
  },

  {
    taskId: "P6",
    agent: "claude",
    title: "SEO metadata and sitemap generation",
    description:
      "Ensure all pages have proper meta titles, descriptions, and Open Graph tags. Update layout.tsx metadata: fix keywords (remove Roma, add Piemonte/Torino), correct locale. Generate dynamic sitemap.xml with all public routes including dynamic slugs. Add robots.txt. Ensure canonical URLs are set.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "polish",
    wave: 10,
    estimatedHours: 3,
    dependencies: ["FE4"],
    tags: ["seo", "metadata", "sitemap"],
    acceptanceCriteria: [
      "All pages have unique meta title and description",
      "Open Graph tags with images for social sharing",
      "Dynamic sitemap.xml includes all routes",
      "robots.txt allows crawling of public pages",
      "Keywords reference Piemonte/Torino, not Roma",
      "Canonical URLs set",
    ],
    filesExpected: [
      "app/layout.tsx",
      "app/sitemap.ts",
      "app/robots.ts",
    ],
  },

  {
    taskId: "P7",
    agent: "claude",
    title: "Optimize images with next/image and Leaf Green placeholders",
    description:
      "Audit all images across the site. Ensure all use next/image component with proper width/height/alt. Implement blur placeholder using Leaf Green dominant color (#22582C at low opacity). Optimize portfolio photos with appropriate sizes. Ensure Unsplash images use proper next/image remotePatterns. Remove any raw <img> tags.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 10,
    estimatedHours: 3,
    dependencies: ["FE4", "FE6"],
    tags: ["images", "performance", "next-image"],
    acceptanceCriteria: [
      "All images use next/image component",
      "Proper width/height/alt on every image",
      "Blur placeholder with Leaf Green tint",
      "No raw <img> tags remaining",
      "Portfolio images optimized for web",
    ],
    filesExpected: [
      "next.config.ts",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE: DEPLOY (Sprint 4) — QA + Go-Live
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "D1",
    agent: "claude",
    title: "Responsive QA at all breakpoints",
    description:
      "Comprehensive responsive testing at 375px, 768px, 1024px, 1440px. Test every public page and admin page. Check: typography scaling, image sizing, grid layouts, touch targets, header behavior, form usability. Document and fix any issues. Use browser dev tools to simulate devices.",
    status: "todo",
    priority: "high",
    category: "testing",
    phaseId: "deploy",
    wave: 11,
    estimatedHours: 6,
    dependencies: ["P1", "P2", "P3", "P4", "P6"],
    tags: ["responsive", "qa", "testing"],
    acceptanceCriteria: [
      "All pages tested at 375px, 768px, 1024px, 1440px",
      "No overflow or cut-off content",
      "Touch targets minimum 44px on mobile",
      "Header collapses to hamburger correctly",
      "Forms usable on all devices",
      "Images scale appropriately",
    ],
    filesExpected: [],
  },

  {
    taskId: "D2",
    agent: "claude",
    title: "Accessibility audit (WCAG 2.1 AA)",
    description:
      "Run accessibility audit per WCAG 2.1 AA. Check: color contrast ratios (especially on Paper Canvas), keyboard navigation, screen reader compatibility, heading hierarchy, alt texts, focus indicators, ARIA labels. Fix all issues found. Use axe-core or Lighthouse accessibility audit.",
    status: "todo",
    priority: "high",
    category: "testing",
    phaseId: "deploy",
    wave: 11,
    estimatedHours: 4,
    dependencies: ["P1", "P2", "P3"],
    tags: ["accessibility", "wcag", "a11y"],
    acceptanceCriteria: [
      "All color contrast ratios meet AA standard (4.5:1 for text)",
      "Keyboard navigation works on all interactive elements",
      "Heading hierarchy is correct (no skipped levels)",
      "All images have descriptive alt text",
      "Focus indicators visible on all interactive elements",
      "No accessibility errors in Lighthouse",
    ],
    filesExpected: [],
  },

  {
    taskId: "D3",
    agent: "claude",
    title: "Lighthouse performance optimization (>90)",
    description:
      "Achieve Lighthouse performance score >90 on all key pages. Optimize: LCP (hero images), FID/INP (interaction handling), CLS (layout shifts). Check bundle size, code splitting, font loading strategy. Ensure Convex queries don't block rendering. Lazy-load below-fold content. Tree-shake unused Framer Motion features.",
    status: "todo",
    priority: "high",
    category: "testing",
    phaseId: "deploy",
    wave: 11,
    estimatedHours: 5,
    dependencies: ["P7", "D1"],
    tags: ["performance", "lighthouse", "optimization"],
    acceptanceCriteria: [
      "Lighthouse Performance >90 on homepage",
      "Lighthouse Performance >90 on services page",
      "LCP under 2.5s",
      "CLS under 0.1",
      "INP under 200ms",
      "Font loading doesn't cause FOUT/FOIT",
    ],
    filesExpected: [],
  },

  {
    taskId: "D4",
    agent: "claude",
    title: "Final build, deploy, and smoke test",
    description:
      "Run final pnpm build to verify no errors. Deploy Convex backend (npx convex deploy). Deploy frontend to Vercel (vercel --prod). Smoke test all public pages on production URL. Verify: Convex connection, form submissions work, quiz flow completes, scorecard renders, admin login works, images load, SEO meta tags present.",
    status: "todo",
    priority: "critical",
    category: "devops",
    phaseId: "deploy",
    wave: 12,
    estimatedHours: 3,
    dependencies: ["D1", "D2", "D3"],
    tags: ["deploy", "production", "smoke-test"],
    acceptanceCriteria: [
      "pnpm build succeeds with zero errors",
      "Convex deployed to cloud",
      "Vercel deployment successful",
      "All public pages load on production URL",
      "Quiz flow works end-to-end",
      "Scorecard renders with data",
      "Admin login and CRUD works",
      "Contact form submits successfully",
      "SEO meta tags visible in page source",
    ],
    filesExpected: [],
  },

  // ═══════════════════════════════════════════════════════════
  // LEAD MAGNETS & FEATURED SNIPPETS (from 2026-02-13 plan)
  // Phase 1: Quiz Foundation
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "C10",
    agent: "claude",
    title: "Add quizSubmissions table to Convex schema",
    description:
      "Add 'quizSubmissions' table to convex/schema.ts (separate from 'leads' table). Fields: answers (array of {questionId, answer}), resultProfile (string), email (optional), phone (optional), source (string: homepage|servizi|blog), createdAt (number). Indexes: by_date, by_profile. Create convex/quiz.ts with submit mutation and list query.",
    status: "todo",
    priority: "high",
    category: "backend",
    phaseId: "features",
    wave: 7,
    estimatedHours: 2,
    dependencies: [],
    tags: ["convex", "schema", "quiz", "lead-magnet"],
    acceptanceCriteria: [
      "quizSubmissions table added to convex/schema.ts with by_date and by_profile indexes",
      "convex/quiz.ts exports submit mutation and list query",
      "npx convex dev --once deploys without errors",
    ],
    filesExpected: [
      "convex/schema.ts",
      "convex/quiz.ts",
    ],
  },

  {
    taskId: "C11",
    agent: "claude",
    title: "Create QuizGiardino multi-step quiz component",
    description:
      "Build QuizGiardino.tsx: 6 questions with questionId/label/options, 4 result profiles (Contemplativo, Sostenibile, Familiare, Rappresentativo) with scoring logic. Multi-step form using Framer Motion AnimatePresence. Progress bar with Leaf Green. Result screen with profile name, description, recommended services. Email capture post-result. Convex mutation call via api.quiz.submit. Props: source (homepage|servizi|blog), onComplete?. Use BMAD palette (Leaf Green progress, Paper Canvas bg, Sun Accent CTA).",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "features",
    wave: 7,
    estimatedHours: 8,
    dependencies: ["C10"],
    tags: ["quiz", "component", "framer-motion", "lead-magnet"],
    acceptanceCriteria: [
      "6 questions render as clickable option cards (tile-style)",
      "AnimatePresence transitions between steps",
      "Progress bar fills with Leaf Green",
      "4 result profiles computed from answers",
      "Result screen shows profile + recommended services",
      "Email capture form submits to Convex",
      "Mobile-first, touch-friendly tiles",
    ],
    filesExpected: [
      "app/components/QuizGiardino.tsx",
    ],
  },

  {
    taskId: "C12",
    agent: "claude",
    title: "Create QuizCTA and QuizMiniPreview components",
    description:
      "QuizCTA.tsx: banner/card component linking to /quiz with 3 variants (sidebar: vertical card with Sprout icon; inline: horizontal full-width banner; compact: minimal text + link). Uses BMAD Button and Card components. QuizMiniPreview.tsx: embedded homepage teaser showing first quiz question as clickable tiles. On click redirects to /quiz?start=2. Paper Canvas bg with Leaf Green accents.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "features",
    wave: 7,
    estimatedHours: 3,
    dependencies: [],
    tags: ["quiz", "cta", "component", "lead-magnet"],
    acceptanceCriteria: [
      "QuizCTA renders in sidebar, inline, and compact variants",
      "QuizMiniPreview shows first question as teaser",
      "Click on MiniPreview redirects to /quiz?start=2",
      "Uses BMAD palette and Walkway typography",
      "All variants link to /quiz",
    ],
    filesExpected: [
      "app/components/QuizCTA.tsx",
      "app/components/QuizMiniPreview.tsx",
    ],
  },

  {
    taskId: "C13",
    agent: "claude",
    title: "Create /quiz dedicated page route",
    description:
      "Server component wrapper at app/quiz/page.tsx. Exports metadata (title: 'Che Giardino Fa Per Te? | Quiz'). Renders QuizGiardino component with source='quiz-page' in a centered layout. Deep Forest header with title + subtitle, Paper Canvas body. Back link to homepage.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "features",
    wave: 7,
    estimatedHours: 1,
    dependencies: ["C11"],
    tags: ["quiz", "page", "route"],
    acceptanceCriteria: [
      "/quiz route renders the quiz component",
      "Metadata includes title and description",
      "Quiz questions advance and result shows",
      "Responsive layout at all breakpoints",
    ],
    filesExpected: [
      "app/quiz/page.tsx",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 2: Quiz Integration
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "C14",
    agent: "claude",
    title: "Integrate quiz section into homepage",
    description:
      "Add QuizMiniPreview section to homepage (app/page.tsx) between services section and stats. New section with Paper Canvas bg, eyebrow 'Scopri il tuo stile', H2 'Che giardino fa per te?', intro paragraph, and QuizMiniPreview component. Use Framer Motion for scroll-in animation.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "features",
    wave: 8,
    estimatedHours: 2,
    dependencies: ["C13", "C12"],
    tags: ["quiz", "homepage", "integration"],
    acceptanceCriteria: [
      "Quiz section visible on homepage between services and stats",
      "QuizMiniPreview renders with scroll-in animation",
      "Clicking option redirects to /quiz",
      "Section responsive at all breakpoints",
    ],
    filesExpected: [
      "app/page.tsx",
    ],
  },

  {
    taskId: "C15",
    agent: "claude",
    title: "Add QuizCTA sidebar to service detail pages",
    description:
      "Add <QuizCTA variant='sidebar' /> to the service detail page sidebar (app/servizi/[slug]/page.tsx), after existing contact card and video card in the aside section.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "features",
    wave: 8,
    estimatedHours: 1,
    dependencies: ["C12", "C13"],
    tags: ["quiz", "servizi", "integration", "cta"],
    acceptanceCriteria: [
      "QuizCTA card visible in service page sidebar",
      "Links to /quiz correctly",
      "Does not break existing sidebar layout",
    ],
    filesExpected: [
      "app/servizi/[slug]/page.tsx",
    ],
  },

  {
    taskId: "C16",
    agent: "claude",
    title: "Add quiz CTAs to blog posts (mid + end article)",
    description:
      "Add QuizCTA to blog detail page (app/blog/[slug]/page.tsx). Mid-article: inline variant after quick answer section. End-article: section with Paper Canvas bg, H3 'Prossimo passo', CTA button linking to /quiz. Import QuizCTA component.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "features",
    wave: 8,
    estimatedHours: 1,
    dependencies: ["C12", "C13"],
    tags: ["quiz", "blog", "integration", "cta"],
    acceptanceCriteria: [
      "Mid-article QuizCTA renders inline after quick answer",
      "End-article CTA section renders before related posts",
      "Both CTAs link to /quiz",
      "Does not break existing blog layout",
    ],
    filesExpected: [
      "app/blog/[slug]/page.tsx",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 3: Featured Snippets — Schema
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "C17",
    agent: "claude",
    title: "Add Organization, LocalBusiness, WebSite JSON-LD to layout",
    description:
      "Add three <script type='application/ld+json'> blocks to app/layout.tsx: Organization (name, url, logo, foundingDate:2009, areaServed:[Piemonte,Lombardia], contactPoint), LocalBusiness (telephone, email, priceRange, knowsAbout), WebSite (name, url). All data for Visione Sostenibile, Torino.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 2,
    dependencies: [],
    tags: ["seo", "json-ld", "structured-data", "featured-snippets"],
    acceptanceCriteria: [
      "Organization JSON-LD in layout <head>",
      "LocalBusiness JSON-LD with Torino address",
      "WebSite JSON-LD present",
      "Valid JSON-LD in page source",
    ],
    filesExpected: [
      "app/layout.tsx",
    ],
  },

  {
    taskId: "C18",
    agent: "claude",
    title: "Add BreadcrumbList JSON-LD to service and blog pages",
    description:
      "Add BreadcrumbList structured data to app/servizi/[slug]/page.tsx (Home > Servizi > Service Title) and app/blog/[slug]/page.tsx (Home > Blog > Post Title). Use SITE_URL constant. Add <script type='application/ld+json'> blocks near existing JSON-LD.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 1,
    dependencies: [],
    tags: ["seo", "json-ld", "breadcrumbs", "featured-snippets"],
    acceptanceCriteria: [
      "BreadcrumbList schema on all service detail pages",
      "BreadcrumbList schema on all blog detail pages",
      "Validates with Google Rich Results Test",
    ],
    filesExpected: [
      "app/servizi/[slug]/page.tsx",
      "app/blog/[slug]/page.tsx",
    ],
  },

  {
    taskId: "C19",
    agent: "claude",
    title: "Add HowTo JSON-LD schema to blog posts",
    description:
      "Generate HowTo structured data from existing articleSteps in blog posts. Create conditional <script type='application/ld+json'> block: only render when steps.length > 0. Fields: name (post.title), description (post.excerpt), step[] with position and text.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 1,
    dependencies: [],
    tags: ["seo", "json-ld", "howto", "featured-snippets"],
    acceptanceCriteria: [
      "HowTo schema renders for blog posts with steps",
      "No HowTo schema for posts without steps",
      "Valid JSON-LD in page source",
    ],
    filesExpected: [
      "app/blog/[slug]/page.tsx",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 4: Featured Snippets — Content Optimization
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "C20",
    agent: "claude",
    title: "Restructure blog H2 headings to question format",
    description:
      "Update H2 headings in app/lib/blog.ts to question format for featured snippets. Examples: 'Pulizia e Manutenzione' → 'Come fare la pulizia del giardino in autunno?', 'Protezione dal Freddo' → 'Come proteggere le piante dal freddo invernale?'. Apply to all 3 blog posts (autunno, tendenze-2024, piante-pendio).",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 1,
    dependencies: [],
    tags: ["seo", "content", "h2", "featured-snippets"],
    acceptanceCriteria: [
      "All blog H2s are in Italian question format",
      "Blog posts render correctly with new H2 text",
      "Questions are natural and keyword-rich",
    ],
    filesExpected: [
      "app/lib/blog.ts",
    ],
  },

  {
    taskId: "C21",
    agent: "claude",
    title: "Optimize quick answers to 40-60 word sweet spot",
    description:
      "Verify and adjust quick answer lengths in blog and service pages. Target: 40-60 Italian words per quick answer (sweet spot for Google paragraph snippets). Check blog quickAnswers in app/blog/[slug]/page.tsx and service quickAnswers in app/servizi/[slug]/page.tsx. Trim or expand as needed.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 1,
    dependencies: [],
    tags: ["seo", "content", "featured-snippets"],
    acceptanceCriteria: [
      "All quick answers are 40-60 words",
      "Content still reads naturally in Italian",
      "No broken formatting after edits",
    ],
    filesExpected: [
      "app/blog/[slug]/page.tsx",
      "app/servizi/[slug]/page.tsx",
    ],
  },

  {
    taskId: "C22",
    agent: "claude",
    title: "Add question-format H2 to service quick answer sections",
    description:
      "Replace generic 'Risposta rapida' H2 in service pages with slug-specific question H2s. Create serviceQuestionH2 map: e.g. 'progettazione-giardini-orti' → 'Quanto costa la progettazione di un giardino sostenibile?'. Fallback to 'Risposta rapida' for unmapped slugs.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "polish",
    wave: 9,
    estimatedHours: 1,
    dependencies: [],
    tags: ["seo", "content", "services", "featured-snippets"],
    acceptanceCriteria: [
      "Each service page has a unique question H2",
      "Fallback works for unmapped slugs",
      "Questions are natural Italian search queries",
    ],
    filesExpected: [
      "app/servizi/[slug]/page.tsx",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // Phase 5: Template Audit & Final Verification
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "C23",
    agent: "claude",
    title: "Systematic template audit — service pages",
    description:
      "Audit each service page against SEO checklist: H1 unique and keyword-focused, quick answer ≤60 words, at least 1 H2 in question format, FAQPage schema present, BreadcrumbList schema present, lists with 5-8 items, meta description ≤160 chars with keyword, HowTo schema if contains steps. Fix any issues found.",
    status: "todo",
    priority: "high",
    category: "review",
    phaseId: "deploy",
    wave: 10,
    estimatedHours: 3,
    dependencies: ["C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21", "C22"],
    tags: ["audit", "seo", "services", "qa"],
    acceptanceCriteria: [
      "All service pages pass the SEO checklist",
      "No missing H1, H2 question, or schema",
      "Quick answers within word limit",
      "Meta descriptions optimized",
    ],
    filesExpected: [],
  },

  {
    taskId: "C24",
    agent: "claude",
    title: "Systematic template audit — blog posts",
    description:
      "Audit each blog post against same SEO checklist as C23. Verify: H1 unique, quick answer ≤60 words, H2s in question format, FAQPage schema, BreadcrumbList schema, HowTo schema for step-based posts, meta descriptions. Fix any issues found.",
    status: "todo",
    priority: "high",
    category: "review",
    phaseId: "deploy",
    wave: 10,
    estimatedHours: 2,
    dependencies: ["C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21", "C22"],
    tags: ["audit", "seo", "blog", "qa"],
    acceptanceCriteria: [
      "All blog posts pass the SEO checklist",
      "H2s are in question format",
      "HowTo schema present where applicable",
      "Meta descriptions optimized",
    ],
    filesExpected: [],
  },

  {
    taskId: "C25",
    agent: "claude",
    title: "Final build verification for lead magnets & snippets",
    description:
      "Run pnpm build + pnpm lint. Verify all pages load: / (homepage with quiz section), /quiz (dedicated quiz page), /servizi/[slug] (sidebar CTA), /blog/[slug] (mid + end CTAs). View page source for all JSON-LD schemas. Check no regressions introduced.",
    status: "todo",
    priority: "critical",
    category: "devops",
    phaseId: "deploy",
    wave: 10,
    estimatedHours: 2,
    dependencies: ["C23", "C24"],
    tags: ["build", "verification", "qa", "lead-magnet"],
    acceptanceCriteria: [
      "pnpm build succeeds with zero errors",
      "pnpm lint passes",
      "Homepage quiz section renders",
      "/quiz page works end-to-end",
      "Service sidebar CTA visible",
      "Blog CTAs render correctly",
      "All JSON-LD schemas valid in page source",
    ],
    filesExpected: [],
  },

  // ═══════════════════════════════════════════════════════════
  // STITCH DESIGN ALIGNMENT (from Stitch project 3153873536110529222)
  // Reference: docs/design-refs/stitch-blog-template.html
  // Service page template → propagate across entire site
  // ═══════════════════════════════════════════════════════════

  // --- SD Phase 1: Design Tokens & Foundation ---

  {
    taskId: "SD1",
    agent: "claude",
    title: "Extract Stitch design tokens and merge into globals.css",
    description:
      "Extract design tokens from Stitch template and merge into existing BMAD globals.css. Add: (1) .glass-nav utility (bg rgba(255,255,255,0.15), backdrop-filter blur(12px), border rgba(255,255,255,0.1), box-shadow), (2) .shadow-neumorphic token (10px 10px 20px rgba(0,0,0,0.05), -5px -5px 15px rgba(255,255,255,0.8)), (3) .rounded-carousel (border-radius: 30px), (4) extend tracking scale for headings (tracking-[0.16em] pattern), (5) .text-stitch-heading utility (uppercase, font-light, tracking-wide, leading-[0.9]). Map Stitch colors to BMAD palette: Stitch primary #2D5A27 → Leaf Green #22582C, Stitch accent #D4A373 → Sun Accent #EAB831. Do NOT replace existing tokens, ADD new utilities alongside.",
    status: "todo",
    priority: "critical",
    category: "uiux",
    phaseId: "core",
    wave: 4,
    estimatedHours: 2,
    dependencies: [],
    tags: ["stitch", "design-tokens", "glass-morphism", "neumorphic"],
    acceptanceCriteria: [
      ".glass-nav utility renders frosted glass effect",
      ".shadow-neumorphic produces inset-light shadow on cards",
      ".rounded-carousel applies 30px border-radius",
      ".text-stitch-heading produces uppercase font-light tracking-wide text",
      "Existing BMAD tokens unaffected (no regressions)",
      "pnpm build passes",
    ],
    filesExpected: [
      "app/globals.css",
    ],
  },

  // --- SD Phase 2: New Stitch Components ---

  {
    taskId: "SD2",
    agent: "claude",
    title: "Build ServiceHero full-bleed component from Stitch design",
    description:
      "Create app/components/ServiceHero.tsx based on Stitch template hero pattern. Full-bleed image covering 85-95vh. Gradient overlay: bg-gradient-to-t from-black/60 via-black/20 to-black/30. Content positioned bottom-left (pb-32). H1: uppercase, font-light Walkway, text-5xl md:text-7xl, with <span> accent word (font-normal or italic). Accepts props: image (string), title (string), accentWord (string), breadcrumbs? (array). Use Framer Motion for fade-in entrance. Glassmorphism nav must overlay correctly (z-index coordination).",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "core",
    wave: 4,
    estimatedHours: 3,
    dependencies: ["SD1"],
    tags: ["stitch", "hero", "full-bleed", "component"],
    acceptanceCriteria: [
      "Hero covers 85-95vh with full-bleed image",
      "Gradient overlay from bottom creates readable text zone",
      "H1 positioned bottom-left, uppercase with accent word",
      "Responsive: scales gracefully at 375px-1440px",
      "Nav floats over hero without z-index conflict",
      "Framer Motion entrance animation works",
    ],
    filesExpected: [
      "app/components/ServiceHero.tsx",
    ],
  },

  {
    taskId: "SD3",
    agent: "claude",
    title: "Build ImageCarousel 3-card depth component",
    description:
      "Create app/components/ImageCarousel.tsx based on Stitch carousel pattern. 3 visible cards: center card elevated (z-20, larger, shadow-2xl), side cards dimmed (brightness-75 or opacity-60, smaller). All images use rounded-[30px]. Dot pagination below (accent color active, 40% opacity inactive). Props: images (array of {src, alt}), autoPlay? (boolean). Use Framer Motion for transitions. Center card slightly translated up (-translate-y-4). Container uses perspective: 1000px for depth.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "core",
    wave: 5,
    estimatedHours: 4,
    dependencies: ["SD1"],
    tags: ["stitch", "carousel", "gallery", "component"],
    acceptanceCriteria: [
      "3-card layout with center card elevated and sides dimmed",
      "30px rounded corners on all image cards",
      "Dot pagination reflects current slide",
      "Swipe/click navigation works",
      "Responsive: stacks on mobile, 3-card on desktop",
      "Smooth Framer Motion transitions",
    ],
    filesExpected: [
      "app/components/ImageCarousel.tsx",
    ],
  },

  {
    taskId: "SD4",
    agent: "claude",
    title: "Build ProcessSteps numbered card grid component",
    description:
      "Create app/components/ProcessSteps.tsx based on Stitch '4 Fasi' pattern. Layout: 12-col grid, title section (col-span-5) with H2 uppercase font-light + accent subtitle (tracking-widest xs uppercase Leaf Green), steps grid (col-span-7) as 2x2 sm:grid-cols-2. Each step card: white bg, rounded-md/xl, neumorphic shadow (.shadow-neumorphic or .step-card), oversized number (text-7xl font-display text-[#D1D1D1] font-medium), title (font-normal text-sm), description (text-xs text-slate-500 font-light). Props: title, accentSubtitle, steps[] (number, title, description). Max 4 steps per grid.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "core",
    wave: 5,
    estimatedHours: 3,
    dependencies: ["SD1"],
    tags: ["stitch", "process", "steps", "component"],
    acceptanceCriteria: [
      "12-col grid: title left (5), cards right (7)",
      "Oversized numbers (7xl+) in light gray",
      "Neumorphic card shadows",
      "Responsive: stacks on mobile",
      "Accepts dynamic steps array",
      "Typography matches Stitch spec",
    ],
    filesExpected: [
      "app/components/ProcessSteps.tsx",
    ],
  },

  {
    taskId: "SD5",
    agent: "claude",
    title: "Build VideoShowcase play-button overlay component",
    description:
      "Create app/components/VideoShowcase.tsx based on Stitch 'Che cosa Aspettarsi' pattern. Full-width container with rounded-[30px], image or video background covering h-[450-500px]. Dark overlay (bg-black/20-30). Centered content: H2 uppercase tracking-wide font-light with <strong> accent word, play button (white/90 backdrop-blur-sm rounded-full w-20 h-20, play_arrow icon). Group hover: image scale-105 transition 700ms, play button scale-110. Props: title, accentWord, backgroundImage, videoUrl?. If videoUrl provided, clicking play opens video in modal or inline.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "core",
    wave: 5,
    estimatedHours: 3,
    dependencies: ["SD1"],
    tags: ["stitch", "video", "play-button", "component"],
    acceptanceCriteria: [
      "Full-width rounded container with background image",
      "Play button centered with glass-morphism effect",
      "Hover: image zooms 105%, button scales 110%",
      "H2 with uppercase accent word",
      "Video plays on click (modal or inline)",
      "Responsive at all breakpoints",
    ],
    filesExpected: [
      "app/components/VideoShowcase.tsx",
    ],
  },

  {
    taskId: "SD6",
    agent: "claude",
    title: "Build AccordionFAQ styled component from Stitch design",
    description:
      "Create app/components/AccordionFAQ.tsx based on Stitch FAQ pattern. Uses HTML <details>/<summary> for no-JS progressive enhancement. Each item: bg-[#F5F5F5] or white, rounded-lg, shadow-lg/sm, p-6 px-8. Summary: flex between, text in primary green (Leaf Green), font-medium text-lg tracking-wide. Expand icon: material-icons expand_more (or lucide ChevronDown), rotate-180 on open via group-open. Content: px-8 pb-8 text-sm text-slate-500. Hover: translateY(-2px) with 300ms ease. Props: items[] ({question, answer}), title? (string, e.g. 'FAQ'). Title: centered uppercase font-light tracking-wide text-5xl.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "core",
    wave: 5,
    estimatedHours: 2,
    dependencies: ["SD1"],
    tags: ["stitch", "faq", "accordion", "component"],
    acceptanceCriteria: [
      "Accordion items expand/collapse with smooth animation",
      "Chevron rotates 180° on open",
      "Hover lift effect (translateY -2px)",
      "Question text in Leaf Green, answer in neutral gray",
      "Progressive enhancement: works without JS",
      "Accepts dynamic items array",
    ],
    filesExpected: [
      "app/components/AccordionFAQ.tsx",
    ],
  },

  // --- SD Phase 2b: Align Existing Components ---

  {
    taskId: "SD8",
    agent: "claude",
    title: "Align Navbar with Stitch glass-morphism floating pattern",
    description:
      "Update app/components/Navbar.tsx to match Stitch floating nav pattern. When over hero (dark background): apply .glass-nav (frosted glass with backdrop-blur-12px, rounded-lg or rounded-full, bg rgba(255,255,255,0.15), border rgba(255,255,255,0.1)). Navbar should float with top-8 and max-w-[1200px] margin auto, not full-width stuck to top. Nav links: text-[11px] font-medium uppercase tracking-widest. Keep existing scroll-based transition for non-hero pages. CTA button: keep Sun Accent. Mobile: preserve hamburger behavior. Logo: simplify to 'V' bold tracking-tighter when in glass mode.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "core",
    wave: 5,
    estimatedHours: 4,
    dependencies: ["SD1"],
    tags: ["stitch", "navbar", "glass-morphism", "alignment"],
    acceptanceCriteria: [
      "Nav floats with glass-morphism on hero pages",
      "Rounded container (not full-width) with frosted glass",
      "Links are uppercase tracking-widest xs size",
      "Transitions smoothly to solid on scroll",
      "Mobile hamburger still works",
      "No z-index conflicts with hero content",
    ],
    filesExpected: [
      "app/components/Navbar.tsx",
    ],
  },

  {
    taskId: "SD9",
    agent: "claude",
    title: "Align Footer with Stitch centered minimal pattern",
    description:
      "Update app/components/Footer.tsx to match Stitch footer pattern. Replace current 4-column grid with centered layout. Structure: (1) Centered 'Visione' logo (text-4xl font-bold tracking-tighter italic font-serif/display), (2) Tagline paragraph (text-white/50 text-xs max-w-md mx-auto, font-light tracking-wide), (3) Social icons as small rounded circles (w-8 h-8 rounded bg-white/5, hover bg-white/20), (4) Copyright in uppercase tracking-widest text-[10px] text-white/30 with border-top separator. Background: bg-[#2C3E33] or bg-forest-950. Keep existing link destinations but simplify visual structure.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "core",
    wave: 5,
    estimatedHours: 2,
    dependencies: ["SD1"],
    tags: ["stitch", "footer", "alignment", "minimal"],
    acceptanceCriteria: [
      "Footer is centered (not multi-column grid)",
      "'Visione' italic logo centered prominently",
      "Social icons as small rounded circles",
      "Copyright uppercase tracking-widest at bottom",
      "Dark green/forest background maintained",
      "Responsive centered layout",
    ],
    filesExpected: [
      "app/components/Footer.tsx",
    ],
  },

  // --- SD Phase 3: Page Assembly ---

  {
    taskId: "SD7",
    agent: "claude",
    title: "Compose Stitch service detail page template",
    description:
      "Redesign app/servizi/[slug]/page.tsx using all new Stitch components. Replace current 3-template system with unified Stitch layout. Section order: (1) ServiceHero full-bleed with service image + title, (2) 2-column content section (H2 with italic accent left, body text right, subtitle in Leaf Green tracking-widest), (3) ImageCarousel with service gallery images, (4) ProcessSteps with service-specific 4-step process, (5) VideoShowcase 'Che cosa aspettarsi' section, (6) AccordionFAQ with service-specific questions, (7) Service navigation (prev/next), (8) CTA section. Keep existing Convex data loading, JSON-LD, and SEO metadata. Each service loads its data dynamically.",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 8,
    dependencies: ["SD2", "SD3", "SD4", "SD5", "SD6"],
    tags: ["stitch", "service-page", "redesign", "composition"],
    acceptanceCriteria: [
      "All service pages render with unified Stitch layout",
      "ServiceHero renders full-bleed with service image",
      "Content section uses 2-column split (title/body)",
      "ImageCarousel shows service gallery",
      "ProcessSteps shows 4-step process per service",
      "VideoShowcase section with play button",
      "AccordionFAQ replaces old FAQ section",
      "Convex data loading unchanged",
      "JSON-LD structured data preserved",
      "Responsive at 375px, 768px, 1024px, 1440px",
    ],
    filesExpected: [
      "app/servizi/[slug]/page.tsx",
    ],
  },

  {
    taskId: "SD10",
    agent: "claude",
    title: "Align homepage with Stitch design language",
    description:
      "Update app/page.tsx to adopt Stitch visual language while preserving existing content. Changes: (1) Hero: adjust to h-[85vh] or h-[95vh], position title bottom-left with uppercase font-light + italic accent, (2) Section headings: adopt uppercase font-light tracking-wide pattern with italic accent word (replace current italic-only style), (3) Services grid: ensure ServiceCards use consistent Card + Germoglio pattern, (4) Process section: use ProcessSteps component, (5) Any image sections: apply rounded-[30px] treatment. Do NOT restructure homepage sections or remove content — only align typography and visual patterns.",
    status: "todo",
    priority: "high",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 4,
    dependencies: ["SD7", "SD8", "SD9"],
    tags: ["stitch", "homepage", "alignment", "typography"],
    acceptanceCriteria: [
      "Hero uses h-[85-95vh] with bottom-left title positioning",
      "All section headings use Stitch uppercase + italic accent pattern",
      "Process section uses ProcessSteps component",
      "Image treatments use rounded-[30px]",
      "No content removed or restructured",
      "Glass-morphism nav overlays hero correctly",
    ],
    filesExpected: [
      "app/page.tsx",
    ],
  },

  {
    taskId: "SD11",
    agent: "claude",
    title: "Align blog pages with Stitch design language",
    description:
      "Update app/blog/page.tsx and app/blog/[slug]/page.tsx to adopt Stitch patterns. Blog listing: apply Stitch hero pattern (full-bleed or simplified), uppercase headings with italic accent. Blog detail: (1) full-bleed hero with post cover image, (2) 2-column content layout where applicable, (3) replace FAQ section with AccordionFAQ component, (4) consistent rounded image treatments. Preserve all existing content, SEO metadata, and JSON-LD schemas.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 3,
    dependencies: ["SD7", "SD8", "SD9"],
    tags: ["stitch", "blog", "alignment"],
    acceptanceCriteria: [
      "Blog listing uses consistent Stitch heading style",
      "Blog detail has full-bleed hero with cover image",
      "AccordionFAQ replaces old FAQ rendering",
      "Images use rounded treatments",
      "JSON-LD and SEO metadata preserved",
    ],
    filesExpected: [
      "app/blog/page.tsx",
      "app/blog/[slug]/page.tsx",
    ],
  },

  {
    taskId: "SD12",
    agent: "claude",
    title: "Align remaining pages with Stitch design language",
    description:
      "Update remaining public pages to adopt Stitch patterns: app/chi-siamo/page.tsx, app/contatti/page.tsx, app/qualita/page.tsx, app/progetti/page.tsx, app/progetti/[slug]/page.tsx. For each: (1) apply ServiceHero or simplified full-bleed hero with page-appropriate image, (2) section headings use Stitch uppercase font-light + italic accent, (3) consistent spacing (py-24/py-32), (4) rounded image treatments. /progetti/[slug] should use ImageCarousel for photo galleries. Preserve all existing content.",
    status: "todo",
    priority: "medium",
    category: "frontend",
    phaseId: "features",
    wave: 6,
    estimatedHours: 5,
    dependencies: ["SD7", "SD8", "SD9"],
    tags: ["stitch", "pages", "alignment", "site-wide"],
    acceptanceCriteria: [
      "Chi Siamo page uses Stitch hero + heading patterns",
      "Contatti page uses consistent design language",
      "Qualita page uses consistent design language",
      "Progetti listing uses consistent design language",
      "Progetti detail uses ImageCarousel for galleries",
      "All pages responsive at 375-1440px",
    ],
    filesExpected: [
      "app/chi-siamo/page.tsx",
      "app/contatti/page.tsx",
      "app/qualita/page.tsx",
      "app/progetti/page.tsx",
      "app/progetti/[slug]/page.tsx",
    ],
  },

  // --- SD Phase 4: Verification ---

  {
    taskId: "SD13",
    agent: "claude",
    title: "Stitch design alignment — visual regression test",
    description:
      "Comprehensive verification after Stitch design alignment. Run pnpm build + pnpm lint. Manually test all public pages at 375px, 768px, 1024px, 1440px. Verify: (1) Glass-morphism nav works on all pages with heroes, (2) ServiceHero renders correctly for all services, (3) ImageCarousel works with real images, (4) ProcessSteps renders in all contexts, (5) AccordionFAQ expands/collapses correctly, (6) Footer centered layout consistent, (7) No typography regressions (Walkway fonts load), (8) No broken images or layout shifts. Compare visual output against Stitch reference screenshots in docs/design-refs/.",
    status: "todo",
    priority: "high",
    category: "testing",
    phaseId: "deploy",
    wave: 7,
    estimatedHours: 4,
    dependencies: ["SD10", "SD11", "SD12"],
    tags: ["stitch", "testing", "visual-regression", "qa"],
    acceptanceCriteria: [
      "pnpm build succeeds with zero errors",
      "pnpm lint passes",
      "All 12 public routes render without errors",
      "Glass-morphism nav consistent across pages",
      "All Stitch components render correctly",
      "Responsive at all 4 breakpoints",
      "No layout shifts or broken images",
      "Visual output matches Stitch reference screenshots",
    ],
    filesExpected: [],
  },

  // ═══════════════════════════════════════════════════════════
  // BARBARA TRIFECTA — Narrative + Copy + Content Seeding
  // Parallel dispatch: Gemini (narrative), Codex (seed), OpenCode (copy)
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "VS-B0",
    agent: "claude",
    title: "Setup Barbara directories + Walkway font audit",
    description:
      "Create docs/barbara-output/narrative/ directory. Audit Walkway font usage across all components to ensure no hardcoded font-family overrides exist. Verify all --font-* tokens point to Walkway.",
    status: "done",
    priority: "high",
    category: "devops",
    phaseId: "foundation",
    wave: 13,
    estimatedHours: 0.5,
    dependencies: [],
    tags: ["barbara", "setup", "font-audit"],
    acceptanceCriteria: [
      "docs/barbara-output/narrative/ directory exists",
      "No hardcoded font-family overrides in app/ (except OG image)",
      "All --font-* tokens reference Walkway",
    ],
    filesExpected: [],
  },

  {
    taskId: "VS-B1",
    agent: "gemini",
    title: "Generate 8 Barbara narrative files",
    description:
      "Using the storytelling document as input, generate 8 structured narrative files in docs/barbara-output/narrative/: positioning.md, metodo.md, servizi.md, pacchetti-b2c.md, pacchetti-b2b.md, faq.md, case-study.md, struttura-sito.md. Expand and structure the raw content into production-ready narrative architecture with Barbara anti-rhetoric tone.",
    status: "todo",
    priority: "critical",
    category: "documentation",
    phaseId: "features",
    wave: 13,
    estimatedHours: 3,
    dependencies: ["VS-B0"],
    tags: ["barbara", "narrative", "gemini", "storytelling"],
    acceptanceCriteria: [
      "8 .md files created in docs/barbara-output/narrative/",
      "Each file has clear structure (H1/H2/sections)",
      "Anti-rhetoric tone: concrete, no buzzwords",
      "B2C and B2B messaging clearly differentiated",
      "Italian language throughout",
    ],
    filesExpected: [
      "docs/barbara-output/narrative/positioning.md",
      "docs/barbara-output/narrative/metodo.md",
      "docs/barbara-output/narrative/servizi.md",
      "docs/barbara-output/narrative/pacchetti-b2c.md",
      "docs/barbara-output/narrative/pacchetti-b2b.md",
      "docs/barbara-output/narrative/faq.md",
      "docs/barbara-output/narrative/case-study.md",
      "docs/barbara-output/narrative/struttura-sito.md",
    ],
  },

  {
    taskId: "VS-B2",
    agent: "codex",
    title: "Create Barbara seed content files",
    description:
      "Create TypeScript data files for Barbara content seeding: barbara-reviews.ts (8 reviews with author, text, rating, source), barbara-blog.ts (4 blog post objects with title, slug, excerpt, content sections, SEO), barbara-servizi.ts (12 complete service cards with title, slug, description, benefits, pricing-hint, icon), barbara-scorecard.ts (scorecard advice content per profile). Plus a Convex seed script. All in app/lib/.",
    status: "todo",
    priority: "critical",
    category: "backend",
    phaseId: "features",
    wave: 13,
    estimatedHours: 4,
    dependencies: ["VS-B0"],
    tags: ["barbara", "content", "codex", "seed"],
    acceptanceCriteria: [
      "app/lib/barbara-reviews.ts exports 8 review objects",
      "app/lib/barbara-blog.ts exports 4 blog post objects",
      "app/lib/barbara-servizi.ts exports 12 service card objects",
      "app/lib/barbara-scorecard.ts exports scorecard advice",
      "All content in Italian, anti-rhetoric Barbara tone",
      "TypeScript types correct, no `any`",
    ],
    filesExpected: [
      "app/lib/barbara-reviews.ts",
      "app/lib/barbara-blog.ts",
      "app/lib/barbara-servizi.ts",
      "app/lib/barbara-scorecard.ts",
    ],
  },

  {
    taskId: "VS-B3",
    agent: "opencode",
    title: "Rewrite 4 pages with Barbara anti-rhetoric copy",
    description:
      "Rewrite 4 main pages with Barbara storytelling copy: homepage (app/page.tsx), chi-siamo (app/chi-siamo/page.tsx), servizi (app/servizi/page.tsx), contatti (app/contatti/page.tsx). Use the storytelling document as source. Maintain existing component structure, Convex data loading, and BMAD design system. Replace placeholder/generic copy with Barbara's concrete, anti-rhetoric Italian. Font must be Walkway throughout (use font-display, font-body CSS classes).",
    status: "todo",
    priority: "critical",
    category: "frontend",
    phaseId: "features",
    wave: 13,
    estimatedHours: 6,
    dependencies: ["VS-B0"],
    tags: ["barbara", "copy", "opencode", "rewrite"],
    acceptanceCriteria: [
      "Homepage hero uses Barbara positioning copy",
      "Chi-siamo has Andrea Giordano bio (human version)",
      "Servizi page uses benefit-driven copy per service",
      "Contatti has Barbara CTA copy and reassurance text",
      "All pages use Walkway font tokens (font-display, font-body)",
      "No Playfair/Quicksand references",
      "Existing Convex queries and component imports preserved",
      "pnpm build passes",
    ],
    filesExpected: [
      "app/page.tsx",
      "app/chi-siamo/page.tsx",
      "app/servizi/page.tsx",
      "app/contatti/page.tsx",
    ],
  },

  {
    taskId: "VS-B4",
    agent: "claude",
    title: "Post-dispatch verification (tsc + build)",
    description:
      "After all 3 Barbara agents complete: run tsc --noEmit, pnpm build, verify no type errors or build failures. Fix any issues introduced by agents.",
    status: "todo",
    priority: "critical",
    category: "testing",
    phaseId: "deploy",
    wave: 14,
    estimatedHours: 2,
    dependencies: ["VS-B1", "VS-B2", "VS-B3"],
    tags: ["barbara", "verification", "build"],
    acceptanceCriteria: [
      "tsc --noEmit passes with zero errors",
      "pnpm build succeeds",
      "No runtime errors on localhost:3000",
    ],
    filesExpected: [],
  },

  {
    taskId: "VS-B5",
    agent: "claude",
    title: "Walkway font consistency pass",
    description:
      "Final pass to ensure Walkway font is visually consistent across the entire site after Barbara rewrites. Check all components use font-display/font-body/font-sans classes. Verify heading weights map correctly (Black=900 for H1, Bold=700 for H2, SemiBold=600 for H3). Visual coherence with the full Visione Sostenibile logo.",
    status: "todo",
    priority: "high",
    category: "review",
    phaseId: "deploy",
    wave: 14,
    estimatedHours: 1,
    dependencies: ["VS-B4"],
    tags: ["barbara", "font", "walkway", "consistency"],
    acceptanceCriteria: [
      "All pages use Walkway font exclusively",
      "H1-H3 weight hierarchy correct per BMAD spec",
      "No system font fallbacks visible on load",
      "Visual coherence with Visione Sostenibile logo",
    ],
    filesExpected: [],
  },

  // ═══════════════════════════════════════════════════════════
  // PHASE: DEPLOY — Pre-production checklist
  // ═══════════════════════════════════════════════════════════

  {
    taskId: "VS-PROD1",
    agent: "claude",
    title: "Aggiornare env vars Convex/Dokploy per produzione",
    description:
      "Prima del go-live, aggiornare tutte le environment variables che puntano a staging/dev. Convex: SITE_URL (da visione.yattalo.com a dominio prod), EMAIL_FROM (verificare dominio mittente), ADMIN_NOTIFICATION_EMAIL (confermare destinatari con Andrea). Dokploy: NEXT_PUBLIC_CONVEX_URL (deployment prod), NEXT_PUBLIC_SITE_URL (dominio prod). Se il dominio prod è diverso da visione.yattalo.com, ri-verificare dominio su Resend e aggiungere nuovi record DNS (DKIM, SPF, MX, DMARC).",
    status: "backlog",
    priority: "high",
    category: "devops",
    phaseId: "deploy",
    wave: 15,
    estimatedHours: 1,
    dependencies: [],
    tags: ["env", "production", "resend", "dns", "dokploy", "convex"],
    acceptanceCriteria: [
      "SITE_URL punta al dominio produzione",
      "EMAIL_FROM usa dominio verificato su Resend",
      "ADMIN_NOTIFICATION_EMAIL confermato con Andrea",
      "NEXT_PUBLIC_CONVEX_URL punta a deployment prod",
      "npx convex run emails:getProviderStatus '{}' restituisce canSend: true",
      "Email di test inviata e ricevuta correttamente",
    ],
    filesExpected: [],
  },
];
