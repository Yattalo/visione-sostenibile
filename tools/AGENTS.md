# AGENTS.md — tools/

Script eseguibili per automazione e orchestrazione agenti.

## Contenuti

- `agent-ops/` — Script TypeScript per orchestrazione multi-agent
  - `runner.ts` — Runner principale per esecuzione task
  - `scheduler.ts` — Scheduler per task periodici
  - `git-isolation.ts` — Isolamento git per worktree
  - `pr-creator.ts` — Creazione automatica PR
  - `log-streamer.ts` — Streaming log in tempo reale
  - `config.ts` — Configurazione agent
- `quiz-screenshots.mjs` — Script Playwright per cattura screenshot quiz
- `screenshot-capture.mjs` — Script Playwright per cattura screenshot generica
- `auto-task-tracker.cjs` — Tracker automatico task

## Usage

```bash
# Esegui script agent-ops
cd tools/agent-ops
npx tsx runner.ts

# Esegui screenshot capture
node tools/quiz-screenshots.mjs
```

## Quando usare

- **agent-ops**: Per orchestrazione task multi-agent (🤖 agent-dispatch)
- **screenshot-*.mjs**: Per QA e documentazione visiva
- **auto-task-tracker.cjs**: Per tracking automatico task

## Attenzione

Questi script sono strumenti di automazione. Non modificare a meno che non serva estendere le funzionalità di orchestrazione.
