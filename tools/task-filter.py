#!/usr/bin/env python3
"""Task filter for orchestrator cycles.

Reads task JSON from stdin (piped from `npx convex run taskSystem/tasks:list`).
Outputs structured, agent-consumable results.

Usage:
  just task-list | python3 tools/task-filter.py actionable
  just task-list | python3 tools/task-filter.py stats
  just task-list | python3 tools/task-filter.py detail VS-31
  just task-list | python3 tools/task-filter.py blocked
  just task-list | python3 tools/task-filter.py inprogress
"""
import json
import os
import sys


CACHE_FILE = "/tmp/vs-tasks.json"


def load_tasks():
    """Load tasks from cache file. Use `just task-fetch` to refresh."""
    if not os.path.exists(CACHE_FILE):
        print(f"ERROR: {CACHE_FILE} not found. Run: just task-fetch", file=sys.stderr)
        sys.exit(1)

    with open(CACHE_FILE) as f:
        raw = f.read()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Handle truncated JSON: find last complete task object
        # Tasks are top-level array elements ending with }
        # We need to find the last } that closes a task (depth 1), not a nested object
        depth = 0
        last_valid = -1
        in_string = False
        escape_next = False

        for i, ch in enumerate(raw):
            if escape_next:
                escape_next = False
                continue
            if ch == "\\":
                escape_next = True
                continue
            if ch == '"':
                in_string = not in_string
                continue
            if in_string:
                continue
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 1:  # closing a top-level array element
                    last_valid = i

        if last_valid == -1:
            print("ERROR: No complete task objects found", file=sys.stderr)
            sys.exit(1)

        trimmed = raw[: last_valid + 1].rstrip().rstrip(",") + "\n]"
        start = trimmed.find("[")
        return json.loads(trimmed[start:])


PRIORITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3}


def cmd_stats(tasks):
    statuses = {}
    for t in tasks:
        s = t.get("status", "unknown")
        statuses[s] = statuses.get(s, 0) + 1
    total = len(tasks)
    done = statuses.get("done", 0)
    pct = round(done / total * 100) if total else 0
    print(f"TOTAL: {total}  DONE: {done} ({pct}%)")
    for s, c in sorted(statuses.items(), key=lambda x: -x[1]):
        print(f"  {s}: {c}")


def cmd_actionable(tasks):
    done_ids = {t["taskId"] for t in tasks if t.get("status") == "done"}
    actionable = []
    for t in tasks:
        if t.get("status") != "todo":
            continue
        if t.get("agent") == "human":
            continue
        deps = set(t.get("dependencies", []))
        if deps and not deps.issubset(done_ids):
            continue
        actionable.append(t)

    actionable.sort(key=lambda x: PRIORITY_ORDER.get(x.get("priority", "low"), 3))

    if not actionable:
        print("NO ACTIONABLE TASKS — backlog vuoto o bloccato")
        return

    print(f"ACTIONABLE: {len(actionable)} tasks\n")
    for t in actionable:
        tid = t.get("taskId", "?")
        title = t.get("title", "?")
        prio = t.get("priority", "?")
        agent = t.get("agent", "?")
        cat = t.get("category", "?")
        files = t.get("filesExpected", [])
        desc = t.get("description", "")[:150]
        criteria = t.get("acceptanceCriteria", [])
        print(f"[{tid}] {title}")
        print(f"  priority={prio}  agent={agent}  cat={cat}")
        if files:
            print(f"  files={files}")
        if criteria:
            print(f"  criteria={criteria[:3]}")
        print(f"  desc: {desc}")
        print()


def cmd_detail(tasks, task_id):
    for t in tasks:
        if t.get("taskId") == task_id:
            print(json.dumps(t, indent=2, ensure_ascii=False))
            return
    print(f"Task {task_id} not found", file=sys.stderr)
    sys.exit(1)


def cmd_blocked(tasks):
    blocked = [t for t in tasks if t.get("status") == "blocked"]
    if not blocked:
        print("No blocked tasks")
        return
    print(f"BLOCKED: {len(blocked)} tasks\n")
    for t in blocked:
        print(f"[{t['taskId']}] {t.get('title', '?')}  deps={t.get('dependencies', [])}")


def cmd_inprogress(tasks):
    wip = [t for t in tasks if t.get("status") == "in_progress"]
    if not wip:
        print("No in-progress tasks")
        return
    print(f"IN PROGRESS: {len(wip)} tasks\n")
    for t in wip:
        print(f"[{t['taskId']}] {t.get('title', '?')}  agent={t.get('agent', '?')}")


def cmd_human(tasks):
    human = [
        t
        for t in tasks
        if t.get("agent") == "human"
        and t.get("status") in ("todo", "in_progress", "blocked")
    ]
    if not human:
        print("No human tasks pending")
        return
    print(f"HUMAN TASKS: {len(human)}\n")
    for t in human:
        print(f"[{t['taskId']}] {t.get('title', '?')}  status={t.get('status')}")


COMMANDS = {
    "stats": lambda t, _: cmd_stats(t),
    "actionable": lambda t, _: cmd_actionable(t),
    "blocked": lambda t, _: cmd_blocked(t),
    "inprogress": lambda t, _: cmd_inprogress(t),
    "human": lambda t, _: cmd_human(t),
    "detail": lambda t, a: cmd_detail(t, a),
}


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print("Usage: task-filter.py <command> [args]")
        print(f"Commands: {', '.join(COMMANDS.keys())}")
        sys.exit(0)

    cmd = sys.argv[1]
    arg = sys.argv[2] if len(sys.argv) > 2 else None

    if cmd not in COMMANDS:
        print(f"Unknown command: {cmd}. Available: {', '.join(COMMANDS.keys())}")
        sys.exit(1)

    tasks = load_tasks()
    COMMANDS[cmd](tasks, arg)


if __name__ == "__main__":
    main()
