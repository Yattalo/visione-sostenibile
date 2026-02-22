# AGENTS.md — docs/

Documentazione del progetto. Non contiene codice eseguibile, solo riferimenti e guide.

## Contenuti

### `prompts/`
Prompt per generazione contenuti AI:
- `prompts-blog.md` — Prompt per generare articoli blog
- `prompts-servizi.md` — Prompt per generare descrizioni servizi

### `screenshot-baseline/`
Screenshot di riferimento per QA visiva. Organizzati per pagina:
- 00-homepage, 01-chi-siamo, 02-servizi, etc.
- Ogni cartella contiene desktop.png e mobile.png

### `quiz-screenshots/`
Screenshot specifici del quiz (stati intermedi):
- Landing, domande 1-6, risultati (4 profili)
- Per ogni stato: desktop e mobile

### `audit/`
Report di audit:
- `AUDIT_SUMMARY.txt` — Sommario audit
- `TASK_COMPLETION_AUDIT.md` — Audit completamento task

### `setup/`
- `PROJECT_SETUP.md` — Guida setup progetto

### `process/`
- `TASK_SYNC_INSTRUCTIONS.md` — Istruzioni sincronizzazione task

## Usage

```bash
# Leggi prompt per blog
cat docs/prompts/prompts-blog.md

# Leggi screenshot baseline
ls docs/screenshot-baseline/
```

## Quando usare

- **prompts/**: Per generare nuovi contenuti blog/servizi
- **screenshot-baseline/**: Per confronto QA prima/dopo modifiche
- **quiz-screenshots/**: Per testare modifiche al quiz
- **audit/**, **setup/**, **process/**: Per contesto e riferimento

## Attenzione

Documentazione di sola lettura. Non modificare i prompt esistenti senza coordinamento.
