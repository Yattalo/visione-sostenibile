#!/bin/bash
set -e
# ============================================================
# Session Summary - shows task progress when session ends
# ============================================================

# Read JSON input from stdin
INPUT=$(cat /dev/stdin)

# Get current working directory
PROJECT_DIR=$(echo "$INPUT" | jq -r '.cwd') || exit 0

cd "$PROJECT_DIR" 2>/dev/null || exit 0

# Check if task-system is initialized
if [ ! -f "task-system.config.ts" ]; then
  exit 0
fi

# Get task statistics
STATS=$(npx convex run taskSystem/orchestrator:getStats 2>/dev/null) || exit 0

if [ -n "$STATS" ] && [ "$STATS" != "null" ]; then
  TOTAL=$(echo "$STATS" | jq -r '.total // 0' 2>/dev/null)
  DONE=$(echo "$STATS" | jq -r '.byStatus.done // 0' 2>/dev/null)
  IN_PROGRESS=$(echo "$STATS" | jq -r '.byStatus.in_progress // 0' 2>/dev/null)
  BLOCKED=$(echo "$STATS" | jq -r '.byStatus.blocked // 0' 2>/dev/null)

  if [ "$IN_PROGRESS" -gt 0 ] 2>/dev/null || [ "$BLOCKED" -gt 0 ] 2>/dev/null; then
    SUMMARY="Task Progress: $DONE/$TOTAL done, $IN_PROGRESS in progress, $BLOCKED blocked"
    jq -n --arg summary "$SUMMARY" '{"additionalContext": $summary}'
  fi
fi

exit 0