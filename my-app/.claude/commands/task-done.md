---
name: /task done
description: Mark a task as completed - auto-unblocks dependents
---

# Complete Task

## Usage

```bash
/task done C1
npx convex run taskSystem/tasks:changeStatus '{"taskId":"C1","newStatus":"done","note":"Completed","agent":"claude"}'
```

## Auto-Unblock

When a task is marked done, the orchestrator automatically:
1. Checks all blocked tasks
2. Unblocks tasks whose dependencies are now met
3. Moves them to `todo` status