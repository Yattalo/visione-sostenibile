---
name: /task kanban
description: Display Kanban board with tasks organized by status
---

# Kanban Board

## Usage

```bash
npx @yattalo/task-system kanban
npx @yattalo/task-system kanban --agent claude
npx convex run taskSystem/orchestrator:getKanban
```

## Board Columns

| Column | Description |
|--------|-------------|
| backlog | Not yet planned |
| todo | Ready to start |
| in_progress | Currently working |
| blocked | Waiting on dependency |
| review | Awaiting review |
| done | Completed |