---
name: /task
description: Task orchestration - list, status, update, start, done, block. Pattern: [CGX]\d{1,3}
---

# Task Orchestrator

Multi-agent task tracking using Convex table `agentTasks`.

## Available Commands

| Command | Description |
|--------|-------------|
| `/task list` | List all tasks with filters |
| `/task status` | Show task statistics |
| `/task kanban` | Kanban board view |
| `/task start <taskId>` | Start a task |
| `/task done <taskId>` | Complete a task |
| `/task block <taskId>` | Block a task |

## Agents

- **claude**: Claude Code
- **gemini**: Gemini CLI
- **codex**: Codex

## Task Pattern

`[CGX]\d{1,3}` (e.g., C1, G5, X10)

## Workflow

1. Check dependencies before starting: `/task start C1` → validates deps
2. Start work: `/task start <taskId>`
3. Complete: `/task done <taskId>`
4. Block if needed: `/task block <taskId> <reason>`