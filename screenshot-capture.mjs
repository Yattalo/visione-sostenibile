/**
 * Visione Sostenibile — Full Site Screenshot Capture
 *
 * Captures ALL public routes + quiz interactive flow.
 * Desktop (1440x900) + Mobile (390x844) @2x retina.
 * Cookie consent pre-dismissed via localStorage.
 */

import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = "/Users/luckyluke/projects/active/visione_sostenibile/site-screenshots";

// ── DEVICE PRESETS ──────────────────────────────────────
const DEVICE_PRESETS = {
  desktop: {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  },
  mobile: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  },
};

// ── STATIC PAGES ──────────────────────────────────────
const STATIC_PAGES = [
  { route: "/", folder: "00-homepage" },
  { route: "/chi-siamo", folder: "01-chi-siamo" },
  { route: "/servizi", folder: "02-servizi" },
  { route: "/progetti", folder: "03-progetti" },
  { route: "/blog", folder: "04-blog" },
  { route: "/contatti", folder: "05-contatti" },
  { route: "/qualita", folder: "06-qualita" },
  { route: "/quiz", folder: "07-quiz-landing" },
  { route: "/privacy", folder: "08-privacy" },
  { route: "/termini", folder: "09-termini" },
];

// ── SERVICE DETAIL PAGES ──────────────────────────────
const SERVIZI = [
  "progettazione-giardini",
  "realizzazione-giardini",
  "scelta-piante",
  "trattamenti-piante",
  "impianti-irrigazione",
  "camminamenti-pietra",
  "illuminazione-esterni",
  "ingegneria-naturalistica",
  "arredamento-esterni",
  "potature",
  "rigenerazione-terreni",
  "manutenzioni",
];

// ── PROJECT DETAIL PAGES ──────────────────────────────
const PROGETTI = [
  "baveno-lago-maggiore",
  "castagneto-po-marta",
  "veronica",
  "maria-rosa-santhia",
  "agriturismo-durando-portacomaro",
  "portacomaro-ruta",
  "porto-val-travaglia",
  "cortemilia-silvio",
  "stefano-cortemilia",
  "chieri-paola",
  "castagneto-po-silvano",
];

// ── BLOG DETAIL PAGES ──────────────────────────────
const BLOG = [
  "come-mantenere-giardino-autunno",
  "tendenze-giardini-2026",
  "piante-pendio",
];

// ── QUIZ PROFILES & ANSWER PATHS ──────────────────────
const QUIZ_PROFILES = {
  contemplativo: ["contemplativo", "poco", "balcone", "fiori", "relax", "naturale"],
  sostenibile: ["sostenibile", "medio", "piccolo", "alberi", "intrattenere", "moderno"],
  familiare: ["familiare", "tanto", "medio", "orto", "giocare", "classico"],
  rappresentativo: ["rappresentativo", "varia", "grande", "arredamento", "lavorare", "rustico"],
};

// Per-question option labels (handles "medio" collision between Q2 and Q3)
const QUESTION_OPTIONS = [
  { contemplativo: "Un luogo di pace e contemplazione", sostenibile: "Un ecosistema sostenibile", familiare: "Uno spazio per la famiglia", rappresentativo: "Un biglietto da visita elegante" },
  { poco: "Il minimo indispensabile", medio: "Qualche ora qua e là", tanto: "Ci dedico molto tempo", varia: "Dipende dalle stagioni" },
  { balcone: "Un balcone o terrazzo", piccolo: "Un giardino piccolo", medio: "Un giardino di media dimensione", grande: "Un grande spazio verde" },
  { fiori: "Fiori colorati e profumati", alberi: "Alberi e piante autoctone", orto: "Un orto per la famiglia", arredamento: "Arredamento di design" },
  { relax: "Rilassarmi in tranquillità", intrattenere: "Accogliere amici e ospiti", giocare: "Far giocare i bambini", lavorare: "Coltivare e sperimentare" },
  { naturale: "Naturale e selvaggio", moderno: "Moderno e minimal", classico: "Classico ed elegante", rustico: "Rustico e accogliente" },
];

// ── HELPERS ──────────────────────────────────────
async function wait(page, ms = 800) {
  await page.waitForTimeout(ms);
}

async function capture(page, folder, device) {
  const dir = `${OUTPUT_DIR}/${folder}`;
  mkdirSync(dir, { recursive: true });
  await page.screenshot({
    path: `${dir}/${device}.png`,
    fullPage: true,
  });
  console.log(`  ✓ ${folder}/${device}.png`);
}

/**
 * Scroll incrementally through the entire page to trigger lazy-loaded
 * images (IntersectionObserver) and Framer Motion scroll animations.
 * Then scroll back to top and wait for all images to finish loading.
 */
async function scrollToTriggerLazyLoad(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const scrollHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    let currentScroll = 0;

    // Scroll down in viewport-sized chunks
    while (currentScroll < scrollHeight) {
      currentScroll += viewportHeight * 0.7;
      window.scrollTo({ top: currentScroll, behavior: "instant" });
      await delay(150); // Give IntersectionObserver time to fire
    }

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "instant" });
    await delay(100);
  });
}

/**
 * Wait for all <img> elements on the page to finish loading.
 * Timeout after 8s to avoid hanging on broken images.
 */
async function waitForImages(page) {
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
          // Safety timeout per image
          setTimeout(resolve, 8000);
        });
      })
    );
  });
}

async function waitForContent(page) {
  // 1. Wait for initial DOM + network
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle").catch(() => {});

  // 2. Scroll through the page to trigger lazy loading
  await scrollToTriggerLazyLoad(page);

  // 3. Wait for all triggered images to finish loading
  await waitForImages(page);

  // 4. One more networkidle wait for any images triggered by scroll
  await page.waitForLoadState("networkidle").catch(() => {});

  // 5. Final pause for Framer Motion animations to settle
  await wait(page, 1200);
}

async function dismissCookieIfPresent(page) {
  try {
    const btn = page.locator('button:has-text("Solo necessari")');
    if (await btn.isVisible({ timeout: 500 })) {
      await btn.click();
      await wait(page, 300);
    }
  } catch {
    // No cookie banner — good
  }
}

// ── STATIC PAGE CAPTURE ──────────────────────────────
async function captureStaticPages(contexts) {
  console.log("\n═══ PAGINE STATICHE ═══");

  for (const { route, folder } of STATIC_PAGES) {
    console.log(`\n${folder}:`);
    for (const [device, ctx] of Object.entries(contexts)) {
      const page = await ctx.newPage();
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
      await waitForContent(page);
      await dismissCookieIfPresent(page);
      await capture(page, folder, device);
      await page.close();
    }
  }
}

// ── DETAIL PAGE CAPTURE ──────────────────────────────
async function captureDetailPages(contexts, prefix, basePath, slugs, startIndex) {
  console.log(`\n═══ ${prefix.toUpperCase()} DETTAGLIO ═══`);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const idx = String(startIndex + i).padStart(2, "0");
    const folder = `${idx}-${prefix}-${slug}`;

    console.log(`\n${folder}:`);
    for (const [device, ctx] of Object.entries(contexts)) {
      const page = await ctx.newPage();
      await page.goto(`${BASE_URL}${basePath}/${slug}`, { waitUntil: "domcontentloaded" });
      await waitForContent(page);
      await dismissCookieIfPresent(page);
      await capture(page, folder, device);
      await page.close();
    }
  }
}

// ── QUIZ FLOW CAPTURE ──────────────────────────────
async function captureQuizFlow(contexts) {
  console.log("\n═══ QUIZ INTERATTIVO ═══");

  let folderIndex = 50; // Start quiz at 50-xx to keep it separate

  // For the first profile, also capture all 6 questions
  const isFirstProfile = { value: true };

  for (const [profile, answers] of Object.entries(QUIZ_PROFILES)) {
    console.log(`\n--- Percorso: ${profile} ---`);

    for (const [device, ctx] of Object.entries(contexts)) {
      const page = await ctx.newPage();
      await page.goto(`${BASE_URL}/quiz`, { waitUntil: "domcontentloaded" });
      await waitForContent(page);
      await dismissCookieIfPresent(page);

      // Click "Inizia il Quiz"
      await page.click('button:has-text("Inizia il Quiz")');
      await wait(page, 600);

      // Answer all 6 questions
      for (let q = 0; q < 6; q++) {
        // Wait for question text to render
        await page.waitForSelector(`text=Domanda ${q + 1} di 6`, { timeout: 8000 });

        // Wait for step-card buttons to exist in DOM
        await page.waitForSelector("button.step-card", { timeout: 8000 });

        // StaggerContainer + StaggerItem use useInView (IntersectionObserver)
        // → elements start at opacity:0 and only animate when in viewport.
        // Force the buttons into view by scrolling to them, triggering the observer.
        await page.evaluate(() => {
          const cards = document.querySelectorAll("button.step-card");
          if (cards.length > 0) {
            cards[0].scrollIntoView({ behavior: "instant", block: "center" });
          }
        });
        await wait(page, 300);

        // Scroll up/down slightly to re-trigger IntersectionObserver on all cards
        await page.evaluate(() => {
          window.scrollBy(0, 50);
        });
        await wait(page, 200);
        await page.evaluate(() => {
          window.scrollBy(0, -50);
        });

        // Wait for stagger animation to fully complete (4 cards × 0.1s stagger + 0.5s duration)
        await wait(page, 1500);

        // Scroll back to top for a clean full-page screenshot
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await wait(page, 200);

        // Capture question only on first profile to avoid duplicates
        if (isFirstProfile.value) {
          const qIdx = String(50 + q).padStart(2, "0");
          await capture(page, `${qIdx}-quiz-domanda-${q + 1}`, device);
        }

        // Click the answer
        const label = QUESTION_OPTIONS[q][answers[q]];
        await page.click(`button.step-card:has-text("${label}")`);
        await wait(page, 500);
      }

      // Wait for result to render
      await page.waitForSelector("text=Il tuo profilo", { timeout: 8000 });
      await wait(page, 1200);

      const rIdx = String(56 + Object.keys(QUIZ_PROFILES).indexOf(profile)).padStart(2, "0");
      await capture(page, `${rIdx}-quiz-risultato-${profile}`, device);
      await page.close();
    }

    isFirstProfile.value = false;
  }
}

// ── MAIN ──────────────────────────────────────
async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  // Create contexts with cookie consent pre-dismissed
  const contexts = {};
  for (const [name, preset] of Object.entries(DEVICE_PRESETS)) {
    const ctx = await browser.newContext(preset);

    // Pre-set cookie consent in localStorage BEFORE any navigation
    // This prevents the cookie banner from ever appearing
    await ctx.addInitScript(() => {
      localStorage.setItem("cookie_consent", "accepted");
    });

    contexts[name] = ctx;
  }

  console.log("\n📸 Visione Sostenibile — Full Site Screenshot Capture");
  console.log(`   Output: ${OUTPUT_DIR}/`);
  console.log(`   Devices: desktop (1440x900) + mobile (390x844) @2x\n`);

  // 1. Static pages (10 pages × 2 devices = 20 screenshots)
  await captureStaticPages(contexts);

  // 2. Service detail pages (12 pages × 2 devices = 24 screenshots)
  await captureDetailPages(contexts, "servizio", "/servizi", SERVIZI, 10);

  // 3. Project detail pages (11 pages × 2 devices = 22 screenshots)
  await captureDetailPages(contexts, "progetto", "/progetti", PROGETTI, 22);

  // 4. Blog detail pages (3 pages × 2 devices = 6 screenshots)
  await captureDetailPages(contexts, "blog", "/blog", BLOG, 33);

  // 5. Quiz flow (6 questions + 4 results × 2 devices = 20 screenshots)
  await captureQuizFlow(contexts);

  // Cleanup
  for (const ctx of Object.values(contexts)) await ctx.close();
  await browser.close();

  console.log(`\n✅ All screenshots saved to: ${OUTPUT_DIR}/\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
