---
name: /task list
description: List all tasks with optional filters by agent, status, or category
---

# Task List

## Usage

```bash
# All tasks
npx convex run taskSystem/orchestrator:list

# By agent
npx convex run taskSystem/orchestrator:getByAgent '{"agent":"claude"}'

# By status
npx convex run taskSystem/tasks:query '{"filter":{"status":{"$eq":"in_progress"}}}'

# By category
npx convex run taskSystem/tasks:query '{"filter":{"category":{"$eq":"backend"}}}'
```

## Filters

- **Agent**: claude, gemini, codex
- **Status**: backlog, todo, in_progress, blocked, review, done
- **Category**: backend, frontend, uiux, devops, review...