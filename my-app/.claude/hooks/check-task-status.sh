#!/bin/bash
set -e
# ============================================================
# Post-commit Task Check - validates task references in commits
# ============================================================

TASK_PATTERN="[CGX][0-9]{1,3}"

# Read JSON input from stdin
INPUT=$(cat /dev/stdin)

# Only run on Bash tool (git commands)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name') || exit 0
if [ "$TOOL_NAME" != "Bash" ]; then
  exit 0
fi

# Extract command
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command' 2>/dev/null) || exit 0

# Only check git commit commands
if ! echo "$COMMAND" | grep -qE "(git commit|git push)"; then
  exit 0
fi

# Get the commit message (PostToolUse: commit already happened)
MSG=$(git log -1 --pretty=%B 2>/dev/null) || exit 0

# Extract task IDs
TASK_IDS=$(echo "$MSG" | grep -oE "$TASK_PATTERN" | sort -u) || exit 0

if [ -z "$TASK_IDS" ]; then
  exit 0
fi

# Check each task ID
for TASK_ID in $TASK_IDS; do
  EXISTS=$(npx convex run taskSystem/tasks:get '{"taskId":"'"$TASK_ID"'"}' 2>/dev/null | jq -r '.taskId // empty' 2>/dev/null) || true
  if [ -z "$EXISTS" ]; then
    echo "Warning: $TASK_ID not found in agentTasks" >&2
  fi
done

exit 0