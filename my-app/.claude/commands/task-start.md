---
name: /task start
description: Start working on a task - validates dependencies first
---

# Start Task

## Usage

```bash
/task start C1
npx convex run taskSystem/orchestrator:checkDependencies '{"taskId":"C1"}'
npx convex run taskSystem/tasks:changeStatus '{"taskId":"C1","newStatus":"in_progress","note":"Starting work","agent":"claude"}'
```

## Workflow

1. Check if dependencies are met
2. If blocked → show which tasks need completion
3. If ready → set status to `in_progress`
4. Log who started and when