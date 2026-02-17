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
];
