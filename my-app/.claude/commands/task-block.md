---
name: /task block
description: Block a task with a reason - document why work cannot proceed
---

# Block Task

## Usage

```bash
/task block C1 "waiting on API specification"
npx convex run taskSystem/tasks:addBlocker '{"taskId":"C1","reason":"waiting on API specification","agent":"claude"}'
npx convex run taskSystem/tasks:changeStatus '{"taskId":"C1","newStatus":"blocked","note":"waiting on API specification","agent":"claude"}'
```

## Blocker Management

- Add blocker reason
- Set status to `blocked`
- Blockers are stored in Convex and displayed in kanban