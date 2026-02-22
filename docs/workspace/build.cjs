const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/luckyluke/.claude/plugins/cache/anthropic-agent-skills/example-skills/69c0b1a06741/skills/pptx/scripts/html2pptx.js');
const sharp = require('sharp');
const path = require('path');

const WS = path.join(__dirname, 'slides');

async function createGradient(filename, color1, color2, angle = '135') {
  const x2 = angle === '135' ? '100%' : '0%';
  const y2 = '100%';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="810">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="${x2}" y2="${y2}">
      <stop offset="0%" style="stop-color:${color1}"/>
      <stop offset="100%" style="stop-color:${color2}"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(WS, filename));
}

async function createAccentBar(filename, color, w, h) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="${color}" rx="4"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(WS, filename));
}

async function createCircle(filename, color, size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(WS, filename));
}

async function main() {
  // Pre-render assets
  await Promise.all([
    createGradient('bg-title.png', '#0B1E0E', '#153D1C'),
    createGradient('bg-dark.png', '#0B1E0E', '#1a3a20'),
    createGradient('bg-light.png', '#F2F0EC', '#E8E5DF'),
    createAccentBar('bar-sun.png', '#EAB831', 120, 6),
    createAccentBar('bar-leaf.png', '#4FA45A', 120, 6),
    createAccentBar('bar-forest.png', '#22582C', 80, 4),
    createCircle('circle-leaf.png', '#22582C', 80),
    createCircle('circle-sun.png', '#EAB831', 80),
    createCircle('circle-forest.png', '#0B1E0E', 80),
  ]);

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Luca — Visione Sostenibile';
  pptx.title = 'Visione Sostenibile — Allineamento Progetto';

  const slides = [
    'slide01-titolo.html',
    'slide02-progresso.html',
    'slide03-team.html',
    'slide04-design.html',
    'slide05-barbara.html',
    'slide06-quiz.html',
    'slide07-seo.html',
    'slide08-tech.html',
    'slide09-prossimi.html',
    'slide10-chiusura.html',
  ];

  for (const s of slides) {
    console.log(`Processing ${s}...`);
    await html2pptx(path.join(WS, s), pptx);
  }

  const outPath = '/Users/luckyluke/projects/active/visione_sostenibile/meeting-allineamento-vs.pptx';
  await pptx.writeFile({ fileName: outPath });
  console.log(`Saved: ${outPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
