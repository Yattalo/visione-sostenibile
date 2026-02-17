#!/bin/bash
# ============================================================
# Task System CLI Aliases
# Source this file or add to ~/.bashrc / ~/.zshrc:
#   source /path/to/scripts/task-aliases.sh
#
# Or install globally:
#   cp scripts/task-aliases.sh /usr/local/bin/t
#   chmod +x /usr/local/bin/t
# ============================================================

# Detect if we're in the project directory
detect_project() {
  if [ -f "task-system.config.ts" ]; then
    echo "$(pwd)"
  elif [ -f "../task-system.config.ts" ]; then
    echo "$(pwd)/.."
  else
    echo ""
  fi
}

# Main task-system command
t() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  npx --yes @yattalo/task-system "$@" --dir "$PROJECT_DIR"
}

# Alias: ts = task-system status (terminal stats)
ts() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  npx --yes @yattalo/task-system status --dir "$PROJECT_DIR"
}

# Alias: tl = list all tasks via Convex query
tl() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  npx convex run taskSystem/orchestrator:list --dir "$PROJECT_DIR"
}

# Alias: tkb = task-system kanban
tkb() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  npx --yes @yattalo/task-system kanban --dir "$PROJECT_DIR" "$@"
}

# Alias: td = task-system dashboard
td() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  local PORT="${1:-3456}"
  npx --yes @yattalo/task-system dashboard --dir "$PROJECT_DIR" --port "$PORT"
}

# Alias: treport = task-system report (avoids shadowing Unix tr)
treport() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  npx --yes @yattalo/task-system report --dir "$PROJECT_DIR" "$@"
}

# Alias: tseed = task-system seed
tseed() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  npx --yes @yattalo/task-system seed --dir "$PROJECT_DIR"
}

# Quick task update: tup C1 in_progress "optional note"
tup() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  local TASK_ID="$1"
  local STATUS="$2"
  if [ -z "$TASK_ID" ] || [ -z "$STATUS" ]; then
    echo "Usage: tup <taskId> <status> [note]" >&2
    echo "Example: tup C1 in_progress" >&2
    return 1
  fi
  local NOTE="${3:-}"
  local AGENT="${AGENT_NAME:-claude}"
  local JSON
  if [ -n "$NOTE" ]; then
    JSON=$(jq -n --arg tid "$TASK_ID" --arg st "$STATUS" --arg note "$NOTE" --arg ag "$AGENT" \
      '{taskId: $tid, newStatus: $st, note: $note, agent: $ag}')
  else
    JSON=$(jq -n --arg tid "$TASK_ID" --arg st "$STATUS" --arg ag "$AGENT" \
      '{taskId: $tid, newStatus: $st, agent: $ag}')
  fi
  npx convex run taskSystem/tasks:changeStatus "$JSON" --dir "$PROJECT_DIR"
}

# Quick task info: tinfo C1
tinfo() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  local TASK_ID="$1"
  if [ -z "$TASK_ID" ]; then
    echo "Usage: tinfo <taskId>" >&2
    return 1
  fi
  local JSON=$(jq -n --arg tid "$TASK_ID" '{taskId: $tid}')
  npx convex run taskSystem/orchestrator:get "$JSON" --dir "$PROJECT_DIR"
}

# List tasks by agent: tmy [agent]
tmy() {
  PROJECT_DIR=$(detect_project)
  if [ -z "$PROJECT_DIR" ]; then
    echo "Error: Not in a task-system project" >&2
    return 1
  fi
  local AGENT="${1:-${AGENT_NAME:-claude}}"
  local JSON=$(jq -n --arg ag "$AGENT" '{agent: $ag}')
  npx convex run taskSystem/orchestrator:getByAgent "$JSON" --dir "$PROJECT_DIR"
}

# Tab completion (optional)
_t_completions() {
  local -a COMMANDS
  COMMANDS=("status" "kanban" "dashboard" "report" "seed" "list")
  COMPREPLY=($(compgen -W "${COMMANDS[*]}" -- "${COMP_WORDS[$COMP_CWORD]}"))
}

# Uncomment to enable tab completion:
# complete -F _t_completions t ts tl tkb td treport tseed tup tinfo tmy

# Export functions if sourced
if [[ -n "$BASH_VERSION" || -n "$ZSH_VERSION" ]]; then
  if [ -n "$BASH_VERSION" ]; then
    export -f t ts tl tkb td treport tseed tup tinfo tmy 2>/dev/null
  fi
fi