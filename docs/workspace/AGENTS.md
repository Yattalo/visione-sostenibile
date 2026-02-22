# AGENTS.md — docs/workspace/

Ambiente di produzione PowerPoint.

## Contenuti

- `enrich-pptx.py` — Script Python per arricchimento PPTX
- `meeting-allineamento-vs.pptx` — File sorgente presentazione
- `meeting-enriched.pptx` — File arricchito
- `meeting-prep-playground.html` — Playground per preparazione meeting
- `pptx-unpacked/` — PPTX scompattato (XML + media)
- `slides/` — Slide singole in formato immagine/HTML

## Usage

```bash
# Arricchisci PPTX
python docs/workspace/enrich-pptx.py

# Lavora su slide specifiche
ls docs/workspace/slides/
```

## Quando usare

- Modificare/aggiornare presentazioni aziendali
- Estrarre slide singole per altri usi

## Attenzione

File di documentazione - non sono eseguibili. Per modifiche sostanziali, usa PowerPoint o strumenti compatibili.
