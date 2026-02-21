/**
 * Quiz Screenshot Capture v2 — Per-Profile Paths with Highlighted Answers
 *
 * Output structure:
 *   00-landing/              desktop.png, mobile.png
 *   percorso-contemplativo/
 *     01-domanda-1/          desktop.png, mobile.png  (selected answer highlighted)
 *     ...
 *     07-risultato/          desktop.png, mobile.png
 *   percorso-sostenibile/    ...
 *   percorso-familiare/      ...
 *   percorso-rappresentativo/ ...
 *
 * Usage: node quiz-screenshots.mjs
 */

import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = "/Users/luckyluke/projects/active/visione_sostenibile/quiz-screenshots";

const PROFILE_PATHS = {
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

const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: "reduce" },
};

/**
 * IntersectionObserver override — injected BEFORE page loads.
 * Framer Motion's useInView/StaggerItem uses IO to trigger animations.
 * In headless Playwright, elements below the fold never enter viewport,
 * so IO never fires → elements stay at opacity:0.
 * This override reports ALL elements as immediately visible.
 */
const IO_OVERRIDE_SCRIPT = () => {
  window.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; }
    observe(element) {
      requestAnimationFrame(() => {
        this.callback([{
          isIntersecting: true,
          intersectionRatio: 1,
          target: element,
          boundingClientRect: element.getBoundingClientRect(),
          rootBounds: null,
          intersectionRect: element.getBoundingClientRect(),
          time: performance.now(),
        }], this);
      });
    }
    unobserve() {}
    disconnect() {}
  };
};

// ── Helpers ──────────────────────────────────────────────

async function wait(page, ms = 800) {
  await page.waitForTimeout(ms);
}

async function capture(page, folder, device, { fullPage = false } = {}) {
  const dir = `${OUTPUT_DIR}/${folder}`;
  mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: `${dir}/${device}.png`, fullPage });
  console.log(`  ✓ ${folder}/${device}.png`);
}

/** Remove cookie banner: click "Accetta" then hide any remaining banner element */
async function removeCookieBanner(page) {
  const clicked = await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")]
      .find((b) => /accetta/i.test(b.textContent));
    if (btn) { btn.click(); return true; }
    return false;
  });
  if (clicked) await wait(page, 500);
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el) => {
      if (el.children.length < 20 && el.textContent.includes("cookie") && el.offsetHeight > 30 && el.offsetHeight < 250) {
        const pos = window.getComputedStyle(el).position;
        if (pos === "fixed" || pos === "sticky" || pos === "absolute") {
          el.style.display = "none";
        }
      }
    });
  });
}

/** Inject a highlight ring on the button that will be selected */
async function highlightAnswer(page, label) {
  await page.evaluate((text) => {
    const buttons = document.querySelectorAll("button.step-card");
    for (const btn of buttons) {
      if (btn.textContent.includes(text)) {
        btn.style.outline = "4px solid #22582C";
        btn.style.outlineOffset = "2px";
        btn.style.boxShadow = "0 0 0 6px rgba(34, 88, 44, 0.2)";
        btn.style.transform = "scale(1.02)";
        btn.style.transition = "none";
        break;
      }
    }
  }, label);
  await wait(page, 200);
}

/** Prepare page: wait for load, remove cookie banner */
async function prepPage(page) {
  await page.waitForLoadState("networkidle");
  await wait(page, 500);
  await removeCookieBanner(page);
  await wait(page, 200);
}

/** Create a new page with IO override injected */
async function newPageWithOverrides(ctx) {
  const page = await ctx.newPage();
  await page.addInitScript(IO_OVERRIDE_SCRIPT);
  return page;
}

// ── Main ─────────────────────────────────────────────────

async function main() {
  const browser = await chromium.launch({ headless: true });

  const contexts = {};
  for (const [name, preset] of Object.entries(DEVICES)) {
    contexts[name] = await browser.newContext(preset);
  }

  console.log("\n📸 Quiz Screenshot Capture v2\n");

  // ── 1. LANDING ─────────────────────────────────────────
  console.log("Landing:");
  for (const [device, ctx] of Object.entries(contexts)) {
    const page = await newPageWithOverrides(ctx);
    await page.goto(`${BASE_URL}/quiz`);
    await prepPage(page);
    await capture(page, "00-landing", device, { fullPage: true });
    await page.close();
  }

  // ── 2. PROFILE PATHS ──────────────────────────────────
  for (const [profile, answers] of Object.entries(PROFILE_PATHS)) {
    const folderPrefix = `percorso-${profile}`;
    console.log(`\n${folderPrefix}:`);

    for (const [device, ctx] of Object.entries(contexts)) {
      const page = await newPageWithOverrides(ctx);
      await page.goto(`${BASE_URL}/quiz`);
      await prepPage(page);

      // Click "Inizia il Quiz"
      await page.click('button:has-text("Inizia il Quiz")', { timeout: 5000 });
      await wait(page, 2500);

      // Walk through all 6 questions
      for (let q = 0; q < 6; q++) {
        await page.waitForSelector(`text=Domanda ${q + 1} di 6`, { timeout: 8000 });
        await page.waitForSelector("button.step-card", { timeout: 8000 });
        await wait(page, 300);

        // Remove cookie banner if it reappeared
        await removeCookieBanner(page);
        await wait(page, 200);

        const optionId = answers[q];
        const label = QUESTION_OPTIONS[q][optionId];
        if (!label) throw new Error(`No label for "${optionId}" at Q${q + 1}`);

        await highlightAnswer(page, label);
        await capture(page, `${folderPrefix}/${String(q + 1).padStart(2, "0")}-domanda-${q + 1}`, device);

        // Click to proceed
        await page.click(`button.step-card:has-text("${label}")`, { timeout: 5000 });
        await wait(page, 500);
      }

      // Result page
      await page.waitForSelector("text=Il tuo profilo", { timeout: 8000 });
      await wait(page, 1000);
      await removeCookieBanner(page);
      await capture(page, `${folderPrefix}/07-risultato`, device, { fullPage: true });

      await page.close();
    }
  }

  for (const ctx of Object.values(contexts)) await ctx.close();
  await browser.close();
  console.log(`\n✅ All screenshots saved to: ${OUTPUT_DIR}/\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
