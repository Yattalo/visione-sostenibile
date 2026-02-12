# Prompt per l'agente che costruisce il sito – Sezione Portfolio

## Contesto

Sei l'agente che costruisce il sito web di **Visione Sostenibile**, azienda piemontese di progettazione e realizzazione giardini, parchi e spazi verdi. Devi integrare la sezione **Portfolio / Progetti** usando i dati strutturati nella cartella `portfolio_output/`.

## Struttura dati disponibile

```
portfolio_output/
├── portfolio-index.json          ← INDICE PRINCIPALE: leggi questo per primo
├── projects/                     ← 1 file Markdown per progetto (11 totali)
│   ├── baveno-lago-maggiore.md
│   ├── castagneto-po-marta.md
│   ├── veronica.md
│   ├── maria-rosa-santhia.md
│   ├── agriturismo-durando-portacomaro.md
│   ├── portacomaro-ruta.md
│   ├── porto-val-travaglia.md
│   ├── cortemilia-silvio.md       ← solo testo, nessuna foto
│   ├── stefano-cortemilia.md      ← solo testo, nessuna foto
│   ├── chieri-paola.md            ← solo testo, nessuna foto
│   └── castagneto-po-silvano.md   ← solo testo, nessuna foto
└── photos/                        ← foto processate, 1 sottocartella per progetto
    ├── baveno-lago-maggiore/
    │   ├── baveno-lago-maggiore_hero.jpg        (1920x1080, 16:9)
    │   ├── baveno-lago-maggiore_hero_thumb.jpg   (600x400, 3:2)
    │   ├── baveno-lago-maggiore_gallery-01.jpg   (1800x1200, 3:2)
    │   ├── baveno-lago-maggiore_gallery-01_thumb.jpg (600x400)
    │   └── ...
    ├── veronica/
    │   ├── veronica_hero.jpg
    │   ├── veronica_gallery-01.jpg
    │   ├── veronica_render-00.jpg   ← render/progetto (separati dalle foto)
    │   └── ...
    └── ...
```

## Come consumare i dati

### 1. Indice globale → `portfolio-index.json`

Contiene l'array `projects` con tutti gli 11 progetti. Per ogni progetto:

```json
{
  "slug": "baveno-lago-maggiore",        // URL-safe identifier
  "title": "Baveno – Lago Maggiore",     // titolo display
  "location": "Baveno, VB",              // luogo
  "region": "Piemonte",                  // regione
  "area_mq": 2800,                       // superficie (null se non nota)
  "type": "Realizzazione parco",         // tipologia intervento
  "tags": ["parco", "irrigazione", ...], // per filtri/categorie
  "photo_count": 4,                      // numero foto processate
  "render_count": 0,                     // numero render
  "has_photos": true,                    // boolean per condizionali
  "hero_image": "photos/baveno-lago-maggiore/baveno-lago-maggiore_hero.jpg",
  "thumbnail": "photos/baveno-lago-maggiore/baveno-lago-maggiore_hero_thumb.jpg",
  "markdown_file": "projects/baveno-lago-maggiore.md"
}
```

Usa `has_photos` per decidere se mostrare il progetto nella griglia visuale o in una lista testuale.

### 2. Dettaglio progetto → `projects/{slug}.md`

Ogni file Markdown ha un **frontmatter YAML** completo con tutti i metadati + il corpo testuale. Il frontmatter contiene:

- **Metadati base**: title, slug, location, region, area_mq, type, tags
- **Foto** (array `photos`): ogni elemento ha `src`, `thumb`, `alt`, `caption`, `type` ("hero" o "gallery"), `dimensions`
- **Render** (array `renders`, opzionale): stesso formato, `type: "render"`
- **Features** (array `features`): elenco caratteristiche principali del progetto
- **hero_image**, **hero_alt**, **thumbnail**: accesso rapido alla cover

Il corpo Markdown contiene la descrizione estesa, le features in lista, e i riferimenti alle immagini con alt text e caption già pronti.

### 3. Foto → `photos/{slug}/`

Tutte le foto sono già **standardizzate e pronte per il web**:

| Tipo | Dimensioni | Aspect Ratio | Naming |
|------|-----------|-------------|--------|
| Hero/Cover | 1920×1080 | 16:9 | `{slug}_hero.jpg` |
| Gallery | 1800×1200 | 3:2 | `{slug}_gallery-{NN}.jpg` |
| Thumbnail | 600×400 | 3:2 | `{slug}_{type}_thumb.jpg` |
| Render | 1800×1200 | 3:2 | `{slug}_render-{NN}.jpg` |

Color grading applicato in modo uniforme: normalizzazione esposizione, contrasto +8%, saturazione +6%, tonalità calda, sharpening leggero. Formato JPEG qualità 88.

## Istruzioni per l'integrazione nel sito

### Pagina Portfolio (lista progetti)

- Mostra una **griglia di card** con i progetti che hanno `has_photos: true` (7 progetti)
- Ogni card usa `thumbnail` come immagine, `title` come titolo, `location` e `type` come sotto-titoli
- Implementa **filtri per tag** — i tag sono già normalizzati e pronti (`tags` nel JSON)
- I 4 progetti senza foto possono apparire in una sezione secondaria "Altri progetti" con solo testo
- Link ogni card a `/portfolio/{slug}`

### Pagina singolo progetto

- **Hero section**: usa `hero_image` (16:9) a tutta larghezza con `hero_alt` come alt text
- **Info box**: location, region, area_mq (se presente), type
- **Descrizione**: prendi il testo dal body del Markdown (dopo il frontmatter)
- **Features**: mostra come lista o badge dal campo `features`
- **Galleria foto**: griglia con le foto di tipo "gallery", usa i `thumb` per il lazy loading e i `src` per il lightbox/fullscreen. Alt text e caption sono già pronti per ogni foto
- **Sezione Render** (se `has_renders: true`): mostra render/progetti separatamente dalla gallery, con label "Progetto e Render"
- **Tags**: mostra come chip/badge cliccabili per navigare progetti correlati

### SEO e Accessibilità

- Ogni foto ha già un **alt text descrittivo** nel formato: `"{Titolo Progetto} – Visione Sostenibile: {descrizione specifica}"`
- Le **caption** sono pronte per tag `<figcaption>`
- Usa il campo `description` dal frontmatter per i meta tag
- Gli slug sono URL-safe e SEO-friendly

### Note importanti

- I percorsi delle foto nel JSON/frontmatter sono **relativi** alla cartella `portfolio_output/`. Adattali al tuo sistema di asset (es. `/assets/portfolio/photos/...` o CDN)
- Il JSON include anche `photo_standards` con i parametri tecnici usati per il processing — utile per documentazione o per processare nuove foto in futuro con gli stessi standard
- 7 progetti su 11 hanno foto; 4 hanno solo descrizione testuale e features
- Il progetto "Veronica" ha sia foto che render; "Portacomaro Ruta" ha foto + 1 render di progetto
