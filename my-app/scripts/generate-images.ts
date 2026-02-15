import fs from "fs";
import path from "path";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
const CONSOLE_TOKEN = process.env.HF_TOKEN?.slice(0, 10) || "NOT FOUND";

console.log("🔍 Checking env vars...");
console.log("HF_TOKEN starts with:", CONSOLE_TOKEN);
console.log("All env keys:", Object.keys(process.env).filter(k => k.includes("HF")));

if (!HF_TOKEN) {
  console.error("❌ HF_TOKEN not found. Add to .env.local: HF_TOKEN=hf_...");
  process.exit(1);
}

const client = new InferenceClient(HF_TOKEN);

const OUTPUT_DIR = path.join(process.cwd(), "public/images/servizi");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const images = [
  // COVER (21:9)
  {
    name: "progettazione-giardini-cover",
    prompt: "Architetto che studia planimetria giardino con matita, tavolo da disegno con piante e materiali campione, luce naturale da grande vetrata, stile design italiano, verde muschio crema grafite, 21:9"
  },
  {
    name: "realizzazione-giardini-cover",
    prompt: "Giardino in fase di realizzazione, operai al lavoro piantando, piante appena messi a dimora, terra smossa, attrezzi da giardinaggio professionali, stile documentaristico italiano, terra bruciata verde vivo cielo azzurro, 21:9"
  },
  {
    name: "scelta-piante-cover",
    prompt: "Vivaio interno luminoso con file di piante in vaso, siepi alberi fiori colorati, clienti che scelgono, stile commerciale italiano elegante, luce naturale zenithale, verde intenso vasi terracotta crema, 21:9"
  },
  {
    name: "trattamenti-piante-cover",
    prompt: "Giardiniere che spruzza trattamento su pianta, pompa a spalla professionale, luce mattutina nel giardino, stile fotografico italiano, verde giallo protezione terra, 21:9"
  },
  {
    name: "impianti-irrigazione-cover",
    prompt: "Sistema irrigazione a goccia nel giardino, terreno bagnato vicino a piante, centralina smart con display, stile tech lifestyle italiano, blu acqua verde fresco grigio acciaio, 21:9"
  },
  {
    name: "camminamenti-pietra-cover",
    prompt: "Sentiero in pietra naturale romana che attraversa giardino, muretti in pietra, mix di materiali, stile giardino mediterraneo, luce dorata pomeridiana, pietra grigia verde muschio terra, 21:9"
  },
  {
    name: "illuminazione-esterni-cover",
    prompt: "Giardino al tramonto con illuminazione calda LED, faretti su alberi, luci su sentieri, atmosfera magica, stile lifestyle italiano, blu notte amber caldo verde scuro, 21:9"
  },
  {
    name: "ingegneria-naturalistica-cover",
    prompt: "Ripristino zona umida con piante autoctone, terreno ripido con tecniche ingegneria naturalistica, stecconi vimini vegetazione ripariale, stile naturalistico italiano, acqua verde palustre terra, 21:9"
  },
  {
    name: "arredamento-esterni-cover",
    prompt: "Terrazzo arredato con mobili design outdoor, divano tavolo piante in vaso ombrellone, stile lifestyle italiano contemporaneo, luce soleggiata, legno teak crema verde rigoglioso, 21:9"
  },
  {
    name: "potature-cover",
    prompt: "Giardiniere su piattaforma elevatrice per potatura alberi alto, cesoia professionale, sicurezza lavoro, stile documentaristico italiano, verde cielo arancione sicurezza, 21:9"
  },
  {
    name: "rigenerazione-terreni-cover",
    prompt: "Terreno degradato con piante che rinascono su suolo recuperato, stile fotografico confronto, marrone secco vs verde rigoglioso, 21:9"
  },
  {
    name: "manutenzioni-cover",
    prompt: "Giardino impeccabile con giardiniere che lavora, rasaerba attrezzi ordinati erba perfetta, stile fotografico italiano, verde intenso rosso attrezzi blu cielo, 21:9"
  },

  // THUMBNAIL (1:1)
  {
    name: "progettazione-giardini-thumb",
    prompt: "Miniature giardino contemporaneo su tavolo, piante in miniatura pietra legno, formato quadrato, luce soft, verde e terra, design italiano"
  },
  {
    name: "realizzazione-giardini-thumb",
    prompt: "Mani che piantano cespuglio con radici, terra umida, palette calda terra e verde, stile rustico italiano, formato quadrato"
  },
  {
    name: "scelta-piante-thumb",
    prompt: "Rack con vasi colorati piante fiorite, formato quadrato, verde e fiori, stile commerciale italiano"
  },
  {
    name: "trattamenti-piante-thumb",
    prompt: "Foglia sana vs foglia malata a confronto, sfondo verde, formato quadrato, stile illustrativo italiano"
  },
  {
    name: "impianti-irrigazione-thumb",
    prompt: "Irrigatore emergente con gocce acqua al tramonto, formato quadrato, blu e verde, stile tecnico italiano"
  },
  {
    name: "camminamenti-pietra-thumb",
    prompt: "Dettaglio pietra naturale con muschio, texture close-up, formato quadrato, pietra e verde, stile italiano"
  },
  {
    name: "illuminazione-esterni-thumb",
    prompt: "Lampada da giardino design, luce calda, formato quadrato, amber e verde scuro, stile lifestyle italiano"
  },
  {
    name: "ingegneria-naturalistica-thumb",
    prompt: "Radici stabilizzanti su pendio, piante autoctone, formato quadrato, verde e terra, stile naturalistico"
  },
  {
    name: "arredamento-esterni-thumb",
    prompt: "Poltrona design outdoor in vimini, formato quadrato, legno naturale e verde, stile italiano contemporaneo"
  },
  {
    name: "potature-thumb",
    prompt: "Cesoie affilate su ramo tagliato, formato quadrato, legno e verde, stile documentaristico italiano"
  },
  {
    name: "rigenerazione-terreni-thumb",
    prompt: "Piantina che nasce da terra riabilitata, formato quadrato, terra e verde tenero, stile italiano"
  },
  {
    name: "manutenzioni-thumb",
    prompt: "Guanti da giardinaggio e attrezzi su tovaglia verde, formato quadrato, verde e legno, stile italiano"
  },

  // INLINE (16:9)
  {
    name: "progettazione-inline",
    prompt: "Close-up planimetria colorata con pennarello verde, piantine posizionate, matite colorate, stile design italiano, sfondo legno chiaro"
  },
  {
    name: "realizzazione-inline",
    prompt: "Vanga che entra nella terra, radici di pianta appena posizionata, terra scura umida, stile fotografico rustico italiano"
  },
  {
    name: "scelta-piante-inline",
    prompt: "Fila di vasi con piante aromatiche rosmarino lavanda salvia, stile rustico italiano, vasi in terracotta, luce naturale"
  },
  {
    name: "trattamenti-inline",
    prompt: "Spruzzatore manuale su foglia, gocce prodotto fitosanitario, luce naturale, close-up italiano"
  },
  {
    name: "impianti-irrigazione-inline",
    prompt: "Tubazione con gocciolatori che escono acqua, terra bagnata scura, piante in vaso sullo sfondo, stile tecnico italiano"
  },
  {
    name: "camminamenti-inline",
    prompt: "Lastre di pietra irregulari che compongono sentiero, erba tra le pietre, stile giardino italiano"
  },
  {
    name: "illuminazione-inline",
    prompt: "Faretto incassato nel terreno che illumina pianta, luce calda al crepuscolo, ombra proiettata, stile italiano"
  },
  {
    name: "ingegneria-inline",
    prompt: "Stuoiature in vimini su terreno ripido, piante giovani che crescono, tecnica consolidamento, stile naturalistico"
  },
  {
    name: "arredamento-inline",
    prompt: "Tavolino in teak con vasi di piante, stile minimalista italiano, luce naturale"
  },
  {
    name: "potature-inline",
    prompt: "Ramo potato con taglio netto, segatura, cesoia professionale, stile documentaristico italiano"
  },
  {
    name: "rigenerazione-inline",
    prompt: "Terreno con nuova vegetazione, contrasto tra area recuperata e secca, stile documentaristico italiano"
  },
  {
    name: "manutenzioni-inline",
    prompt: "Rasaerba professionale su prato all'inglese, erba perfettamente tagliata, stile fotografico italiano"
  }
];

async function generateImage(item: { name: string; prompt: string }) {
  console.log(`🎨 Generating: ${item.name}...`);

  try {
    const result = await client.textToImage({
      provider: "fal-ai",
      model: "Tongyi-MAI/Z-Image-Turbo",
      inputs: item.prompt,
      parameters: { num_inference_steps: 5 },
    });

    let buffer: Buffer;
    const resultRaw = result as unknown;
    if (typeof resultRaw === "string") {
      const response = await fetch(resultRaw);
      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
    } else {
      const blob = resultRaw as Blob;
      buffer = Buffer.from(await blob.arrayBuffer());
    }
    
    const outputPath = path.join(OUTPUT_DIR, `${item.name}.png`);
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✅ Saved: ${outputPath}\n`);
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`❌ Error: ${err.message}\n`);
  }
}

async function main() {
  console.log("🚀 Generating images with Hugging Face Fal AI...\n");
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);
  console.log(`📊 Total: ${images.length} images\n`);

  for (const item of images) {
    await generateImage(item);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("✨ Done!");
}

main();
