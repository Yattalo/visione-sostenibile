import fs from "fs";
import path from "path";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.HF_TOKEN;
const CONSOLE_TOKEN = process.env.HF_TOKEN?.slice(0, 10) || "NOT FOUND";

console.log("🔍 Checking env vars...");
console.log("HF_TOKEN starts with:", CONSOLE_TOKEN);

if (!HF_TOKEN) {
  console.error("❌ HF_TOKEN not found. Add to .env.local: HF_TOKEN=hf_...");
  process.exit(1);
}

const client = new InferenceClient(HF_TOKEN);

const OUTPUT_DIR = path.join(process.cwd(), "public/images/blog");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const images = [
  // BLOG: COME MANTENERE IL GIARDINO IN AUTUNNO
  {
    name: "autunno-calendario",
    prompt: "Infografica calendario lavori autunno-inverno, 4 colonne SET-OTT-NOV-DIC, icone piante e attrezzi, colori terracotta e verde muschio, design italiano minimal"
  },
  {
    name: "autunno-protezione-piante",
    prompt: "Tabella illustrata piante sensibili al freddo, 6 piante con icona e metodo protezione telo paccipe vaso, sfondo crema, linee verde muschio, design italiano"
  },
  {
    name: "autunno-pacciamatura",
    prompt: "Close-up mani che applicano pacciamatura con corteccia, foglie secche, terra umida, stile fotografico rustico italiano, palette terra e verde"
  },
  {
    name: "autunno-bulbi",
    prompt: "Vaso con bulbi di tulipani e narcisi, terra in vista, sfondo sfocato giardino autunnale, stile still life italiano"
  },
  {
    name: "autunno-irrigazione",
    prompt: "Annaffiatoio su prato con gocce, stile minimalista italiano, luce soft, palette verde e blu"
  },

  // BLOG: TENDENZE GIARDINI 2026
  {
    name: "tendenze-irrigazione-smart",
    prompt: "Sistema irrigazione a goccia con sensore umidità, giardino moderno, luce naturale, stile tech lifestyle italiano, palette blu verde grigio"
  },
  {
    name: "tendenze-living-esterno",
    prompt: "Angolo giardino con divano outdoor, fire pit, luci calde, piante in vaso, atmosfera serale cozy, design italiano, palette terra legno amber"
  },
  {
    name: "tendenze-biodiversita",
    prompt: "Hotel per insetti in legno naturale con api farfalle coccinelle, giardino fiorito sullo sfondo, stile naturalistico italiano"
  },
  {
    name: "tendenze-infografica",
    prompt: "5 cerchi colorati collegati, icone per ogni tendenza foglia ape casa chip pennello, palette moss green e terracotta, design italiano minimal"
  },
  {
    name: "tendenze-app",
    prompt: "Smartphone con app giardinaggio che mostra pianta, sensore umidità sullo sfondo, stile tech italiano"
  },

  // BLOG: PIANTE PER TERRENI IN PENDIO
  {
    name: "pendio-geotessile",
    prompt: "Tutorial visivo 4 step installazione geotessile, sezioni progressive con frecce, colori terracotta e verde, design italiano chiaro"
  },
  {
    name: "pendio-lavanda",
    prompt: "Pendio soleggiato con lavanda in fiore, vista dall'alto, colori viola e verde argenteo, stile fotografico aereo italiano"
  },
  {
    name: "pendio-coprisuolo",
    prompt: "Tappeto di vinca minor con fiori blu, coprisuolo denso, texture verde intenso, stile close-up italiano"
  },
  {
    name: "pendio-irrigazione",
    prompt: "Tubazione gocciolante su pendio, acqua che fuoriesce, terra umida, stile tecnico italiano"
  },
  {
    name: "pendio-radici",
    prompt: "Schema radici profonde che stabilizzano terreno, sezione trasversale illustrata, palette verde e terra, design italiano"
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
  console.log("🚀 Generating BLOG images with Hugging Face Fal AI...\n");
  console.log(`📁 Output: ${OUTPUT_DIR}\n`);
  console.log(`📊 Total: ${images.length} images\n`);

  for (const item of images) {
    await generateImage(item);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log("✨ Done!");
}

main();
