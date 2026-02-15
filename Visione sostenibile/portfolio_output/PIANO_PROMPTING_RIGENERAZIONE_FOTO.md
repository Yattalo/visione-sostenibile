# Piano Prompting - Rigenerazione Foto Portfolio

## 1) Obiettivo

Rigenerare il set immagini dei progetti in modo:
- professionale (qualita editoriale, luci controllate, composizione pulita)
- fedele ai lavori reali (feature tecniche visibili e leggibili)
- coerente tra progetti (stesso linguaggio visivo e color science)
- pronto per web (hero 1920x1080, gallery 1800x1200, thumb 600x400)

Nota operativa: nel tuo ambiente `gemini` e disponibile; `antigravity` risulta CLI editor (non motore immagini). Quindi la pipeline consigliata e:
- Gemini CLI: generazione prompt pack + valutazione critica batch
- Nanobanana: generazione immagini
- Antigravity: revisione veloce dei file/output e iterazioni prompt

## 2) Regola di veridicita (fondamentale)

Per i 7 progetti con foto originali: fare **enhancement/regeneration fedele** (image-to-image con ancoraggio forte).

Per i 4 progetti senza foto: produrre immagini da brief, ma pubblicarle come:
- `render progettuale` oppure
- `visualizzazione concettuale`

Non presentarle come "foto reali del lavoro concluso" se non esistono riferimenti fotografici originali.

## 3) Struttura produzione

Crea questa struttura:

```text
portfolio_output/
  regen/
    briefs/
      <slug>.md
    prompts/
      <slug>.jsonl
    outputs/
      raw/<slug>/
      selected/<slug>/
      final/<slug>/
    qc/
      scorecards/<slug>.md
      master-tracker.csv
```

## 4) Formula prompt (template unico)

Ogni prompt deve avere 6 blocchi fissi:

1. `SCENA`
2. `FEATURE TECNICA`
3. `STILE FOTOGRAFICO`
4. `VINCOLI DI REALTA`
5. `NEGATIVE PROMPT`
6. `OUTPUT SPEC`

Template base:

```text
SCENA:
Giardino/progetto "{PROJECT_TITLE}" a {LOCATION}, inquadratura {SHOT_TYPE}, contesto reale italiano, composizione pulita, linee prospettiche coerenti.

FEATURE TECNICA DA MOSTRARE:
{FEATURE_1}; {FEATURE_2}; {FEATURE_3}.
Le feature devono essere chiaramente leggibili in foto, senza elementi inventati non presenti nel brief.

STILE FOTOGRAFICO:
Archviz-fotorealistico naturale, lente 24-35mm (hero) o 50-85mm (detail), luce morbida golden hour o cielo velato professionale, colori naturali, micro-contrasto controllato, materiale vegetale realistico.

VINCOLI DI REALTA:
Nessun look CGI, nessuna saturazione estrema, nessun prato plastico irreale, no geometrie impossibili, no prospettive distorte, no watermark, no testo in immagine.

NEGATIVE PROMPT:
cartoon, illustration, 3d render look, oversharpen, overprocessed HDR, neon colors, fake bokeh, duplicated plants, melted textures, artifacts, watermark, text overlay, logo overlay

OUTPUT SPEC:
Aspect ratio {AR}, risoluzione target {RESOLUTION}, qualita massima, nitidezza naturale, dettaglio fogliame realistico.
```

## 5) Prompt pack per tipo scatto

Per ogni progetto genera questi 6 scatti standard:
- `HERO_WIDE` (16:9) panoramica progetto
- `FEATURE_PRIMARY` (3:2) elemento distintivo principale
- `FEATURE_TECH` (3:2) irrigazione/robot/percorso/impianto
- `MATERIAL_DETAIL` (3:2) texture e finiture (pietra, lapillo, traversine, ecc.)
- `DEPTH_COMPOSITION` (3:2) stratificazione piante e volumetrie
- `THUMB_CROP_SAFE` (3:2) framing sicuro per miniatura

Per progetti con illuminazione, aggiungi:
- `BLUE_HOUR_LIGHTING` (3:2)

Per progetti con render richiesti:
- `CONCEPT_RENDER` (3:2), etichettato come render.

## 6) Strategia batch (quantita)

Per ogni shot:
- 8 varianti iniziali
- selezione top 2
- 1 pass di refinement finale

Volume consigliato:
- 6 shot x 8 varianti = 48 output/progetto (base)
- 11 progetti = 528 immagini grezze
- finali selezionate: 6-8 per progetto

## 7) Quality rubric (score 1-5)

Accetta solo immagini con punteggio totale >= 21/25:
- `Aderenza al brief tecnico` (1-5)
- `Realismo botanico/materiali` (1-5)
- `Composizione commerciale` (1-5)
- `Luce e color grading naturale` (1-5)
- `Pulizia tecnica (artifact, edge, texture)` (1-5)

Hard fail immediato se:
- feature principale non visibile
- look troppo sintetico/CGI
- errori strutturali evidenti (forme, ombre, prospettiva)

## 8) Piano progetti (shot priority)

### Progetti con foto reali (regen fedele)

1. `baveno-lago-maggiore`
- Focus: alto fusto, irrigazione, aiuole ortensie/azalee, robot
- Target: 1 hero + 5 gallery

2. `castagneto-po-marta`
- Focus: aiuola bassa manutenzione, Cynodon, irrigazione wifi, robot visivo
- Target: 1 hero + 5 gallery

3. `veronica`
- Focus: trifoglio basso, traversine certificate, acero japonico/camelie
- Target: 1 hero + 4 gallery + 3 render

4. `maria-rosa-santhia`
- Focus: dry garden, lapillo vulcanico, zona BBQ in pietra, irrigazione bluetooth
- Target: 1 hero + 4 gallery

5. `agriturismo-durando-portacomaro`
- Focus: parco 1800 mq, officinali, anti-zanzare, robot GPS, solare
- Target: 1 hero + 6 gallery

6. `portacomaro-ruta`
- Focus: giardino Monferrato, impostazione progettuale pulita
- Target: 1 hero + 4 gallery + 1 render

7. `porto-val-travaglia`
- Focus: pergola 20m, ortensie, aiuola rialzata, pietra locale, illuminazione solare
- Target: 1 hero + 13 gallery

### Progetti senza foto (render da brief, dichiarati come tali)

8. `cortemilia-silvio`
- Focus: prato sintetico professionale 350 mq + effetto roccioso naturale
- Target iniziale: 1 hero + 5 gallery concept

9. `stefano-cortemilia`
- Focus: giardino storico, ulivi secolari in terracotta, siepe sinuosa, irrigazione terrazzi
- Target iniziale: 1 hero + 5 gallery concept

10. `chieri-paola`
- Focus: 450 mq, terrazzamenti, ulivo secolare + verbena, robot GPS multi-zona
- Target iniziale: 1 hero + 5 gallery concept

11. `castagneto-po-silvano`
- Focus: dry garden su 2 lati, pietra naturale, irrigazione wifi, robot visivo
- Target iniziale: 1 hero + 5 gallery concept

## 9) Esempi prompt pronti (copia/incolla)

### A) Hero realistico (progetto con foto)

```text
Giardino realizzato "Baveno - Lago Maggiore", vista hero ampia 16:9, composizione professionale da portfolio landscaping.
Mostrare chiaramente: alberi alto fusto (faggio e liquidambar), aiuole ortensie/azalee, prato curato, segni discreti di automazione irrigua.
Stile fotografico naturale premium, lente 24-28mm, luce golden hour morbida, contrasto moderato, colori realistici, texture fogliame nitida ma naturale.
Vincoli: nessun look CGI, nessuna saturazione spinta, no elementi inventati fuori brief, no watermark, no testo.
Negative prompt: cartoon, 3d render look, artificial grass plastic look, overprocessed hdr, warped geometry, duplicated plants, artifacts.
Output: 1920x1080, quality max, editorial landscaping photo.
```

### B) Dettaglio tecnico

```text
Dettaglio tecnico progetto "Castagneto Po - Progetto Marta": irrigazione smart a basso consumo integrata in aiuola bassa manutenzione, prato macroterme Cynodon in primo piano.
Inquadratura 3:2, stile fotografia professionale outdoor, lente 50mm, profondita realistica, materiali autentici, luce diffusa.
Vincoli di realta: componenti coerenti con impianto reale, nessun design futuristico irreale, nessun elemento grafico sovrapposto.
Negative prompt: cgi, glossy plastic, fake reflections, oversharpen, text, watermark.
Output: 1800x1200.
```

### C) Concept render dichiarato

```text
Render progettuale fotorealistico (non foto reale) per "Chieri - Paola", giardino villa 450 mq con terrazzamenti, ulivo secolare con verbena ibrida, irrigazione smart e robot GPS multi-zona.
Composizione 3:2 da brochure premium, luce naturale pomeridiana, palette vegetale mediterranea controllata, materiali realistici.
Etichetta interna workflow: concept render.
Negative prompt: fantasy garden, surreal plants, neon colors, impossible architecture, text overlays.
Output: 1800x1200.
```

## 10) Runbook Gemini CLI + Nanobanana

### Step 1 - Genera prompt pack da brief

```bash
gemini -p "Leggi /Users/luckyluke/projects/active/visione_sostenibile/Visione sostenibile/portfolio_output/projects/<slug>.md e produci un file JSONL con 6 prompt (hero, feature_primary, feature_tech, material_detail, depth_composition, thumb_crop_safe) seguendo il template del piano prompting. Non inventare feature oltre il brief."
```

Salva il risultato in:
`portfolio_output/regen/prompts/<slug>.jsonl`

### Step 2 - Generazione immagini (Nanobanana)

Usa il tuo comando Nanobanana standard su ogni record JSONL.
Pattern raccomandato:

```bash
nanobanana generate \
  --input-jsonl "portfolio_output/regen/prompts/<slug>.jsonl" \
  --num-variants 8 \
  --out "portfolio_output/regen/outputs/raw/<slug>/"
```

### Step 3 - Valutazione automatica con Gemini

```bash
gemini -p "Valuta le immagini in portfolio_output/regen/outputs/raw/<slug>/ con rubric 25 punti (aderenza brief, realismo botanico/materiali, composizione, luce/color, pulizia tecnica). Restituisci top 2 per shot e motivazione sintetica."
```

### Step 4 - Refinement finale

Prendi le top selezionate e rigenera con prompt di refinement:
- "mantieni composizione"
- "riduci look sintetico"
- "aumenta leggibilita feature tecnica"

## 11) Naming finale coerente sito

Output finali per progetto:
- `<slug>_hero.jpg` (1920x1080)
- `<slug>_hero_thumb.jpg` (600x400)
- `<slug>_gallery-01.jpg` ... `<slug>_gallery-NN.jpg` (1800x1200)
- `<slug>_gallery-01_thumb.jpg` ... (600x400)
- `<slug>_render-00.jpg` (solo se concept render)

## 12) Ordine esecuzione consigliato

1. Calibrazione stile su 2 progetti: `baveno-lago-maggiore`, `porto-val-travaglia`
2. Rollout sui 5 progetti con foto restanti
3. Produzione concept render per i 4 senza foto reali
4. QA finale + sostituzione asset

Se vuoi, nel prossimo step posso generare direttamente:
- `regen/briefs/*.md`
- `regen/prompts/*.jsonl` iniziali per tutti gli 11 slug.

